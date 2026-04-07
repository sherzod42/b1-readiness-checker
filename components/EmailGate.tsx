'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  attemptId: string
}

export default function EmailGate({ attemptId }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, email }),
      })
      if (!res.ok) {
        setError('Fehler. Bitte versuchen Sie es erneut.')
        return
      }
      router.refresh()
    } catch {
      setError('Fehler. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/80 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 max-w-sm w-full space-y-5">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Ihr Bericht ist bereit</h2>
          <p className="text-sm text-gray-500">
            Geben Sie Ihre E-Mail ein, um Ihren Bericht zu sehen. Wir senden Ihnen auch eine Kopie zu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ihre@email.de"
            required
            disabled={isSubmitting}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className={[
              'w-full font-semibold px-6 py-3 rounded-xl transition-colors text-sm',
              !isSubmitting && email
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed',
            ].join(' ')}
          >
            {isSubmitting ? 'Bitte warten...' : 'Bericht anzeigen →'}
          </button>
        </form>
      </div>
    </div>
  )
}
