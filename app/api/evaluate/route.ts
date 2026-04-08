import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const systemPrompt =
  'You are an expert TELC B1 German exam evaluator. Evaluate the provided German writing or speaking sample strictly as a B1-level examiner would. Return ONLY valid JSON with no other text.'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text, type } = body as { text: string; type: string }

    if (!text || (type !== 'writing' && type !== 'speaking')) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const userPrompt =
      type === 'writing'
        ? `Evaluate this B1 German writing sample. The task was: reply to a friend's email about meeting on Saturday (80-100 words target).

Text: ${text}

Return JSON with exactly these fields:
{
  "grammar": <0-25>,
  "vocabulary": <0-25>,
  "taskCompletion": <0-25>,
  "coherence": <0-25>,
  "strengths": ["...", "..."],
  "weaknesses": ["...", "...", "..."],
  "recommendation": "..."
}`
        : `Evaluate this B1 German speaking sample (auto-transcribed). The task was: describe a picture of a city park (people playing chess, jogging, children playing).

Transcript: ${text}

Return JSON with exactly these fields:
{
  "grammar": <0-25>,
  "vocabulary": <0-25>,
  "taskCompletion": <0-25>,
  "fluency": <0-25>,
  "strengths": ["...", "..."],
  "weaknesses": ["...", "...", "..."],
  "recommendation": "..."
}`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const rawText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    type WritingParsed = {
      grammar: number
      vocabulary: number
      taskCompletion: number
      coherence: number
      fluency?: never
      strengths: string[]
      weaknesses: string[]
      recommendation: string
    }

    type SpeakingParsed = {
      grammar: number
      vocabulary: number
      taskCompletion: number
      fluency: number
      coherence?: never
      strengths: string[]
      weaknesses: string[]
      recommendation: string
    }

    type ParsedResult = WritingParsed | SpeakingParsed

    let parsed: ParsedResult

    try {
      // Strip markdown code fences if the model wraps the JSON
      const jsonText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
      parsed = JSON.parse(jsonText) as ParsedResult
    } catch {
      return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 })
    }

    const fourthScore =
      'fluency' in parsed && parsed.fluency !== undefined
        ? parsed.fluency
        : 'coherence' in parsed && parsed.coherence !== undefined
        ? parsed.coherence
        : 0

    const score =
      (parsed.grammar ?? 0) +
      (parsed.vocabulary ?? 0) +
      (parsed.taskCompletion ?? 0) +
      fourthScore

    const response: Record<string, unknown> = {
      score,
      grammar: parsed.grammar,
      vocabulary: parsed.vocabulary,
      taskCompletion: parsed.taskCompletion,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      recommendation: parsed.recommendation,
    }

    if ('fluency' in parsed && parsed.fluency !== undefined) {
      response.fluency = parsed.fluency
    } else if ('coherence' in parsed && parsed.coherence !== undefined) {
      response.coherence = parsed.coherence
    }

    return NextResponse.json(response)
  } catch {
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 })
  }
}
