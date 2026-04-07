import { sections } from '@/data/questions'
import type { LesenSection, SprachbausteineSection, HoerenSection, MCQuestion, ClozeQuestion } from '@/data/questions'

type WritingEvaluation = {
  grammar: number
  vocabulary: number
  taskCompletion: number
  coherence: number
  strengths: string[]
  weaknesses: string[]
  recommendation: string
}

type SpeakingEvaluation = {
  grammar: number
  vocabulary: number
  taskCompletion: number
  fluency: number
  strengths: string[]
  weaknesses: string[]
  recommendation: string
}

export type Attempt = {
  id: string
  email: string | null
  score_lesen: number
  score_sprachbausteine: number
  score_hoeren: number
  score_schreiben: number
  score_sprechen: number
  answers: {
    lesen?: Record<string, number>
    sprachbausteine?: Record<string, number>
    hoeren?: Record<string, number>
  } | null
  writing_text: string | null
  writing_evaluation: WritingEvaluation | null
  speaking_transcript: string | null
  speaking_evaluation: SpeakingEvaluation | null
}

type Props = {
  attempt: Attempt
  blurred?: boolean
}

function scoreColor(pct: number): string {
  if (pct >= 70) return 'bg-green-500'
  if (pct >= 50) return 'bg-yellow-400'
  return 'bg-red-400'
}

function scoreBadge(pct: number): { label: string; className: string } {
  if (pct >= 70) return { label: '✓ Gut', className: 'text-green-700 bg-green-50' }
  if (pct >= 50) return { label: '⚠ Üben', className: 'text-yellow-700 bg-yellow-50' }
  return { label: '✗ Schwach', className: 'text-red-700 bg-red-50' }
}

function getPriorityActions(
  attempt: Attempt,
  scores: Record<string, number>
): string[] {
  const actions: string[] = []

  const sorted = Object.entries(scores).sort((a, b) => a[1] - b[1])

  for (const [section] of sorted) {
    if (actions.length >= 3) break

    if (section === 'schreiben' && attempt.writing_evaluation?.weaknesses?.[0]) {
      actions.push(`Schreiben: ${attempt.writing_evaluation.weaknesses[0]}`)
    } else if (section === 'sprechen' && attempt.speaking_evaluation?.weaknesses?.[0]) {
      actions.push(`Sprechen: ${attempt.speaking_evaluation.weaknesses[0]}`)
    } else if (section === 'sprachbausteine') {
      actions.push(
        'Sprachbausteine: Üben Sie Präpositionen mit Genitiv (wegen, trotz, während) und Konjunktionen (obwohl, damit, falls) gezielt.'
      )
    } else if (section === 'lesen') {
      actions.push(
        'Lesen: Lesen Sie täglich einen deutschen Zeitungsartikel auf B1-Niveau (z.B. Nachrichtenleicht.de) und fassen Sie ihn in 3 Sätzen zusammen.'
      )
    } else if (section === 'hoeren') {
      actions.push(
        'Hören: Hören Sie täglich 10-15 Minuten deutschsprachige Podcasts (z.B. „Slow German" von Annik Rubens) und notieren Sie Schlüsselwörter.'
      )
    }
  }

  const fallbacks = [
    'Machen Sie täglich 15 Minuten gezielte Grammatikübungen auf Deutsch B1-Niveau.',
    'Üben Sie das Sprechen mit einem Tandempartner oder über italki.',
    'Lösen Sie wöchentlich einen kompletten TELC B1 Übungstest unter Prüfungsbedingungen.',
  ]
  while (actions.length < 3) actions.push(fallbacks[actions.length])

  return actions
}

export default function ReportContent({ attempt, blurred = false }: Props) {
  const lesenPct = Math.round(((attempt.score_lesen ?? 0) / 5) * 100)
  const sprachPct = Math.round(((attempt.score_sprachbausteine ?? 0) / 6) * 100)
  const hoerenPct = Math.round(((attempt.score_hoeren ?? 0) / 4) * 100)
  const schreibenPct = attempt.score_schreiben ?? 0
  const sprechenPct = attempt.score_sprechen ?? 0
  const overall = Math.round((lesenPct + sprachPct + hoerenPct + schreibenPct + sprechenPct) / 5)

  const sectionScores: Record<string, number> = {
    lesen: lesenPct,
    sprachbausteine: sprachPct,
    hoeren: hoerenPct,
    schreiben: schreibenPct,
    sprechen: sprechenPct,
  }

  const sectionLabels: Record<string, string> = {
    lesen: 'Lesen',
    sprachbausteine: 'Sprachbausteine',
    hoeren: 'Hören',
    schreiben: 'Schreiben',
    sprechen: 'Sprechen',
  }

  const sortedSections = Object.entries(sectionScores).sort((a, b) => a[1] - b[1])
  const weakestSection = { key: sortedSections[0][0], label: sectionLabels[sortedSections[0][0]], score: sortedSections[0][1] }
  const bottom2 = sortedSections.slice(0, 2).map((s) => sectionLabels[s[0]]).join(' und ')

  const overallVerdict =
    overall >= 75
      ? { label: 'Bereit für B1', className: 'text-green-700 bg-green-50', subtext: 'Sie erfüllen die Anforderungen für das TELC B1 Examen. Üben Sie weiter, um Ihr Niveau zu halten.' }
      : overall >= 55
      ? { label: 'Fast bereit', className: 'text-yellow-700 bg-yellow-50', subtext: `Sie sind nah dran. ${weakestSection.label} zieht Ihren Gesamtscore herunter — konzentrieren Sie sich darauf.` }
      : { label: 'Noch nicht bereit', className: 'text-red-700 bg-red-50', subtext: `Sie brauchen noch Vorbereitung. Ihre schwächsten Bereiche sind ${bottom2}.` }

  const displaySections = [
    { key: 'lesen', label: 'Lesen', sub: 'Leseverständnis', pct: lesenPct },
    { key: 'sprachbausteine', label: 'Sprachbausteine', sub: 'Grammatik', pct: sprachPct },
    { key: 'hoeren', label: 'Hören', sub: 'Hörverstehen', pct: hoerenPct },
    { key: 'schreiben', label: 'Schreiben', sub: 'Schriftlicher Ausdruck', pct: schreibenPct },
    { key: 'sprechen', label: 'Sprechen', sub: 'Mündlicher Ausdruck', pct: sprechenPct },
  ]

  // Build wrong-answer lists for MC/cloze sections
  const lesenSection = sections.find((s) => s.id === 'lesen') as LesenSection | undefined
  const sprachSection = sections.find((s) => s.id === 'sprachbausteine') as SprachbausteineSection | undefined
  const hoerenSection = sections.find((s) => s.id === 'hoeren') as HoerenSection | undefined

  const lesenAnswers = attempt.answers?.lesen ?? {}
  const sprachAnswers = attempt.answers?.sprachbausteine ?? {}
  const hoerenAnswers = attempt.answers?.hoeren ?? {}

  type WrongAnswer = {
    id: string
    display: string
    userAnswerText: string
    correctAnswerText: string
  }

  function getWrongAnswers(
    questions: (MCQuestion | ClozeQuestion)[],
    userAnswers: Record<string, number>
  ): WrongAnswer[] {
    return questions
      .filter((q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correct)
      .map((q) => {
        const userIdx = userAnswers[q.id]
        if (q.type === 'mc') {
          return {
            id: q.id,
            display: q.question,
            userAnswerText: q.options[userIdx] ?? '–',
            correctAnswerText: q.options[q.correct],
          }
        } else {
          // cloze
          const userText = `${q.beforeBlank} [${q.options[userIdx] ?? '–'}] ${q.afterBlank}`
          const correctText = `${q.beforeBlank} [${q.options[q.correct]}] ${q.afterBlank}`
          return {
            id: q.id,
            display: userText,
            userAnswerText: q.options[userIdx] ?? '–',
            correctAnswerText: q.options[q.correct],
          }
        }
      })
  }

  const lesenWrong = lesenSection ? getWrongAnswers(lesenSection.questions as (MCQuestion | ClozeQuestion)[], lesenAnswers) : []
  const sprachWrong = sprachSection ? getWrongAnswers(sprachSection.questions as (MCQuestion | ClozeQuestion)[], sprachAnswers) : []
  const hoerenAllQuestions: (MCQuestion | ClozeQuestion)[] = hoerenSection
    ? hoerenSection.clips.flatMap((c) => c.questions)
    : []
  const hoerenWrong = getWrongAnswers(hoerenAllQuestions, hoerenAnswers)

  const priorityActions = getPriorityActions(attempt, sectionScores)

  const content = (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      {/* Section 1: Overall verdict */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 text-center space-y-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Gesamtergebnis</p>
        <div className="text-7xl font-bold text-gray-900">{overall}%</div>
        <span className={`inline-block text-sm font-semibold px-4 py-1.5 rounded-full ${overallVerdict.className}`}>
          {overallVerdict.label}
        </span>
        <p className="text-sm text-gray-600 max-w-xs mx-auto">{overallVerdict.subtext}</p>
        <p className="text-xs text-gray-400">TELC B1 Bestehensgrenze: 60%</p>
      </div>

      {/* Section 2: Section breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Ergebnisse nach Bereich</h2>
        {displaySections.map((s) => {
          const badge = scoreBadge(s.pct)
          const barColor = scoreColor(s.pct)
          const isDanger = s.pct < 45
          return (
            <div key={s.key} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{s.label}</span>
                  <span className="text-xs text-gray-400">{s.sub}</span>
                  {isDanger && (
                    <span className="text-xs text-red-600 font-medium">⚠ Gefahrenzone</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.className}`}>{badge.label}</span>
                  <span className="text-sm font-bold text-gray-700">{s.pct}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all ${barColor}`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Section 3: Wrong answers */}
      {(lesenWrong.length > 0 || sprachWrong.length > 0 || hoerenWrong.length > 0 ||
        Object.keys(lesenAnswers).length > 0 || Object.keys(sprachAnswers).length > 0 || Object.keys(hoerenAnswers).length > 0) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Falsche Antworten</h2>

          {/* Lesen */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Lesen</h3>
            {lesenWrong.length === 0 ? (
              <p className="text-sm text-green-600">✓ Alle Antworten richtig!</p>
            ) : (
              <div className="space-y-3">
                {lesenWrong.map((w) => (
                  <div key={w.id} className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
                    <p className="text-gray-700 font-medium">{w.display}</p>
                    <p className="text-red-600">Ihre Antwort: {w.userAnswerText}</p>
                    <p className="text-green-600">Richtige Antwort: {w.correctAnswerText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sprachbausteine */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Sprachbausteine</h3>
            {sprachWrong.length === 0 ? (
              <p className="text-sm text-green-600">✓ Alle Antworten richtig!</p>
            ) : (
              <div className="space-y-3">
                {sprachWrong.map((w) => {
                  const q = sprachSection?.questions.find((q) => q.id === w.id)
                  if (!q || q.type !== 'cloze') return null
                  const userIdx = sprachAnswers[q.id]
                  return (
                    <div key={w.id} className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
                      <p className="text-red-500 line-through">
                        {q.beforeBlank} <span className="font-medium">[{q.options[userIdx] ?? '–'}]</span> {q.afterBlank}
                      </p>
                      <p className="text-green-600">
                        {q.beforeBlank} <span className="font-medium">[{q.options[q.correct]}]</span> {q.afterBlank}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Hören */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Hören</h3>
            {hoerenWrong.length === 0 ? (
              <p className="text-sm text-green-600">✓ Alle Antworten richtig!</p>
            ) : (
              <div className="space-y-3">
                {hoerenWrong.map((w) => (
                  <div key={w.id} className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
                    <p className="text-gray-700 font-medium">{w.display}</p>
                    <p className="text-red-600">Ihre Antwort: {w.userAnswerText}</p>
                    <p className="text-green-600">Richtige Antwort: {w.correctAnswerText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 4: Writing feedback */}
      {attempt.writing_evaluation && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Schreiben — Feedback</h2>

          {attempt.writing_text && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Ihr Text</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{attempt.writing_text}</p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Teilbewertungen</p>
            {[
              { label: 'Grammatik', score: attempt.writing_evaluation.grammar },
              { label: 'Wortschatz', score: attempt.writing_evaluation.vocabulary },
              { label: 'Aufgabenerfüllung', score: attempt.writing_evaluation.taskCompletion },
              { label: 'Kohärenz', score: attempt.writing_evaluation.coherence },
            ].map((sub) => (
              <div key={sub.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{sub.label}</span>
                  <span className="font-semibold text-gray-900">{sub.score ?? '—'}/25</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div
                    className={`h-1.5 rounded-full ${scoreColor(Math.round(((sub.score ?? 0) / 25) * 100))}`}
                    style={{ width: `${Math.round(((sub.score ?? 0) / 25) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {attempt.writing_evaluation.strengths?.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Stärken</p>
              <ul className="space-y-1">
                {attempt.writing_evaluation.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {attempt.writing_evaluation.weaknesses?.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Verbesserungsbereiche</p>
              <ul className="space-y-1">
                {attempt.writing_evaluation.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {attempt.writing_evaluation.recommendation && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <p className="text-sm text-blue-800">{attempt.writing_evaluation.recommendation}</p>
            </div>
          )}
        </div>
      )}

      {/* Section 5: Speaking feedback */}
      {attempt.speaking_evaluation && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Sprechen — Feedback</h2>

          {attempt.speaking_transcript && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Ihre Antwort (transkribiert):</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{attempt.speaking_transcript}</p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Teilbewertungen</p>
            {[
              { label: 'Grammatik', score: attempt.speaking_evaluation.grammar },
              { label: 'Wortschatz', score: attempt.speaking_evaluation.vocabulary },
              { label: 'Aufgabenerfüllung', score: attempt.speaking_evaluation.taskCompletion },
              { label: 'Flüssigkeit', score: attempt.speaking_evaluation.fluency },
            ].map((sub) => (
              <div key={sub.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{sub.label}</span>
                  <span className="font-semibold text-gray-900">{sub.score ?? '—'}/25</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div
                    className={`h-1.5 rounded-full ${scoreColor(Math.round(((sub.score ?? 0) / 25) * 100))}`}
                    style={{ width: `${Math.round(((sub.score ?? 0) / 25) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {attempt.speaking_evaluation.strengths?.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Stärken</p>
              <ul className="space-y-1">
                {attempt.speaking_evaluation.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {attempt.speaking_evaluation.weaknesses?.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Verbesserungsbereiche</p>
              <ul className="space-y-1">
                {attempt.speaking_evaluation.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {attempt.speaking_evaluation.recommendation && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <p className="text-sm text-blue-800">{attempt.speaking_evaluation.recommendation}</p>
            </div>
          )}
        </div>
      )}

      {/* Section 6: Priority actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-4">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Ihre 3 Prioritätsmaßnahmen</h2>
        <div className="space-y-3">
          {priorityActions.map((action, i) => {
            const [boldPart, ...rest] = action.split(':')
            const restText = rest.join(':').trim()
            return (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <span className="text-blue-600 font-bold text-lg shrink-0">{i + 1}.</span>
                <p className="text-sm text-gray-700">
                  {restText ? (
                    <>
                      <span className="font-semibold text-gray-900">{boldPart}: </span>
                      {restText}
                    </>
                  ) : (
                    action
                  )}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  if (blurred) {
    return (
      <div className="blur-sm pointer-events-none select-none">
        {content}
      </div>
    )
  }

  return content
}
