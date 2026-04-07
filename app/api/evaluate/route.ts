import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text, type } = body as { text: string; type: string }

    if (!text || type !== 'writing') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system:
        'You are an expert TELC B1 German exam evaluator. Evaluate the provided German writing sample strictly as a B1-level examiner would. Return ONLY valid JSON with no other text.',
      messages: [
        {
          role: 'user',
          content: `Evaluate this B1 German writing sample. The task was: reply to a friend's email about meeting on Saturday (80-100 words target).

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
}`,
        },
      ],
    })

    const rawText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    let parsed: {
      grammar: number
      vocabulary: number
      taskCompletion: number
      coherence: number
      strengths: string[]
      weaknesses: string[]
      recommendation: string
    }

    try {
      parsed = JSON.parse(rawText)
    } catch {
      return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 })
    }

    const score =
      (parsed.grammar ?? 0) +
      (parsed.vocabulary ?? 0) +
      (parsed.taskCompletion ?? 0) +
      (parsed.coherence ?? 0)

    return NextResponse.json({
      score,
      grammar: parsed.grammar,
      vocabulary: parsed.vocabulary,
      taskCompletion: parsed.taskCompletion,
      coherence: parsed.coherence,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      recommendation: parsed.recommendation,
    })
  } catch {
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 })
  }
}
