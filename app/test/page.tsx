'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { sections } from '@/data/questions'
import type { MCQuestion, ClozeQuestion } from '@/data/questions'
import QuestionCard from '@/components/QuestionCard'

// All 5 exam sections for the progress bar (only first 2 are active in Phase 2)
const ALL_SECTIONS = [
  { id: 'lesen', label: 'Lesen' },
  { id: 'sprachbausteine', label: 'Sprachbausteine' },
  { id: 'hoeren', label: 'Hören' },
  { id: 'schreiben', label: 'Schreiben' },
  { id: 'sprechen', label: 'Sprechen' },
]

function calculateScore(
  answers: Record<string, number>,
  questions: (MCQuestion | ClozeQuestion)[]
): number {
  const correct = questions.filter((q) => answers[q.id] === q.correct).length
  return Math.round((correct / questions.length) * 100)
}

export default function TestPage() {
  const router = useRouter()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [passageCollapsed, setPassageCollapsed] = useState(false)

  // Create a new attempt row in Supabase on mount
  useEffect(() => {
    async function createAttempt() {
      try {
        const { data } = await supabase
          .from('attempts')
          .insert({ status: 'in_progress' })
          .select('id')
          .single()
        if (data?.id) setAttemptId(data.id)
      } catch {
        // Non-blocking — test still works without Supabase in dev
      }
    }
    createAttempt()
  }, [])

  const currentSection = sections[currentSectionIndex]
  const currentQuestions = currentSection.questions as (MCQuestion | ClozeQuestion)[]
  const currentQuestion = currentQuestions[currentQuestionIndex]
  const selectedAnswer = answers[currentQuestion.id] ?? null

  const isLastQuestionInSection = currentQuestionIndex === currentQuestions.length - 1
  const isLastActiveSection = currentSectionIndex === sections.length - 1

  // Save lesen answers to Supabase when section completes
  async function saveLesenAnswers(lesenAnswers: Record<string, number>) {
    if (!attemptId) return
    const lesenSection = sections[0]
    const lesenQuestions = lesenSection.questions as (MCQuestion | ClozeQuestion)[]
    const score = calculateScore(lesenAnswers, lesenQuestions)
    try {
      await supabase
        .from('attempts')
        .update({
          answers: { lesen: lesenAnswers },
          score_lesen: score,
        })
        .eq('id', attemptId)
    } catch {
      // Non-blocking
    }
  }

  // Save sprachbausteine answers to Supabase when section completes
  async function saveSprachbausteineAnswers(
    lesenAnswers: Record<string, number>,
    sprachAnswers: Record<string, number>
  ) {
    if (!attemptId) return
    const sprachSection = sections[1]
    const sprachQuestions = sprachSection.questions as (MCQuestion | ClozeQuestion)[]
    const score = calculateScore(sprachAnswers, sprachQuestions)
    try {
      await supabase
        .from('attempts')
        .update({
          answers: { lesen: lesenAnswers, sprachbausteine: sprachAnswers },
          score_sprachbausteine: score,
          status: 'complete',
        })
        .eq('id', attemptId)
    } catch {
      // Non-blocking
    }
  }

  function handleAnswer(index: number) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: index }))
  }

  async function handleNext() {
    if (!isLastQuestionInSection) {
      // Move to the next question in the same section
      setCurrentQuestionIndex((i) => i + 1)
      return
    }

    // End of a section
    if (currentSectionIndex === 0) {
      // Finished Lesen — gather lesen-only answers and save
      const lesenQuestions = sections[0].questions as (MCQuestion | ClozeQuestion)[]
      const lesenAnswers: Record<string, number> = {}
      for (const q of lesenQuestions) {
        if (answers[q.id] !== undefined) lesenAnswers[q.id] = answers[q.id]
      }
      await saveLesenAnswers(lesenAnswers)
    }

    if (isLastActiveSection) {
      // Finished Sprachbausteine — save everything and navigate
      const lesenQuestions = sections[0].questions as (MCQuestion | ClozeQuestion)[]
      const sprachQuestions = sections[1].questions as (MCQuestion | ClozeQuestion)[]
      const lesenAnswers: Record<string, number> = {}
      const sprachAnswers: Record<string, number> = {}
      for (const q of lesenQuestions) {
        if (answers[q.id] !== undefined) lesenAnswers[q.id] = answers[q.id]
      }
      for (const q of sprachQuestions) {
        if (answers[q.id] !== undefined) sprachAnswers[q.id] = answers[q.id]
      }
      await saveSprachbausteineAnswers(lesenAnswers, sprachAnswers)
      router.push('/report/demo')
      return
    }

    // Move to next section
    setCurrentSectionIndex((i) => i + 1)
    setCurrentQuestionIndex(0)
    setPassageCollapsed(false)
  }

  // Derive next button label
  let nextLabel = 'Next →'
  if (isLastQuestionInSection && !isLastActiveSection) nextLabel = 'Next Section →'
  if (isLastQuestionInSection && isLastActiveSection) nextLabel = 'Continue →'

  // Progress bar: percentage through active sections
  const totalActiveQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0)
  const answeredCount = Object.keys(answers).length
  const progressPct = Math.round((answeredCount / totalActiveQuestions) * 100)

  const isLesenSection = currentSection.id === 'lesen'

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/* Top progress bar                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Section {currentSectionIndex + 1} of {ALL_SECTIONS.length}
            </span>
            <span className="text-sm text-gray-400">
              {currentSection.label}
            </span>
          </div>

          {/* Progress fill */}
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div
              className="h-1.5 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Section dots */}
          <div className="flex justify-between mt-3">
            {ALL_SECTIONS.map((s, i) => {
              const isActive = i === currentSectionIndex
              const isCompleted = i < currentSectionIndex
              const isLocked = i > sections.length - 1 // phases 3-5 not yet built

              return (
                <div key={s.id} className="flex flex-col items-center gap-1">
                  <div
                    className={[
                      'w-2.5 h-2.5 rounded-full',
                      isActive
                        ? 'bg-blue-600'
                        : isCompleted
                        ? 'bg-blue-300'
                        : isLocked
                        ? 'bg-gray-200'
                        : 'bg-gray-300',
                    ].join(' ')}
                  />
                  <span
                    className={[
                      'text-xs hidden sm:block',
                      isActive ? 'text-blue-600 font-medium' : 'text-gray-400',
                      isLocked ? 'opacity-50' : '',
                    ].join(' ')}
                  >
                    {s.label}
                    {isLocked && ' 🔒'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="max-w-2xl w-full mx-auto space-y-6">

          {/* Section badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
              {currentSection.label}
            </span>
            <span className="text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </span>
          </div>

          {/* Reading passage (Lesen only) */}
          {isLesenSection && currentSection.id === 'lesen' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <button
                onClick={() => setPassageCollapsed((c) => !c)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-semibold text-gray-900">
                  {currentSection.passageTitle}
                </span>
                <span className="text-xs text-gray-400 ml-4 shrink-0">
                  {passageCollapsed ? 'Show text ▼' : 'Hide text ▲'}
                </span>
              </button>
              {!passageCollapsed && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-gray-100 mb-4" />
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {currentSection.passage}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Question card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentQuestions.length}
            />
          </div>

          {/* Next button */}
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={[
                'inline-flex items-center justify-center font-semibold px-8 py-3 rounded-xl transition-colors text-sm',
                selectedAnswer !== null
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed',
              ].join(' ')}
            >
              {nextLabel}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
