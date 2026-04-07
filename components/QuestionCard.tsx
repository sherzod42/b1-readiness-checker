'use client'

import type { MCQuestion, ClozeQuestion } from '@/data/questions'

type Props = {
  question: MCQuestion | ClozeQuestion
  selectedAnswer: number | null
  onAnswer: (index: number) => void
  questionNumber: number
  totalQuestions: number
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Question counter */}
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        Question {questionNumber} of {totalQuestions}
      </p>

      {/* Question text / cloze display */}
      {question.type === 'mc' ? (
        <p className="text-lg font-semibold text-gray-900 leading-snug">
          {question.question}
        </p>
      ) : (
        <p className="text-lg font-semibold text-gray-900 leading-snug">
          {question.beforeBlank}{' '}
          <span className="inline-block border-b-2 border-blue-400 px-6 mx-1 text-blue-400 font-bold">
            ?
          </span>{' '}
          {question.afterBlank}
        </p>
      )}

      {/* Answer options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          return (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className={[
                'w-full text-left px-5 py-4 rounded-xl border-2 transition-colors font-medium text-sm',
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50',
              ].join(' ')}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
