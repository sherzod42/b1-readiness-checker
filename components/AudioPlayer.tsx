'use client'

import { useRef, useState, useEffect } from 'react'

type Props = {
  src: string
  clipNumber: number
  onComplete?: () => void
}

const MAX_PLAYS = 3

export default function AudioPlayer({ src, clipNumber, onComplete }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playsRemaining, setPlaysRemaining] = useState(MAX_PLAYS)

  // Reset state when src changes (new clip)
  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setPlaysRemaining(MAX_PLAYS)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [src])

  function handlePlayPause() {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (playsRemaining <= 0) return
      // Only decrement on a fresh play from the start (or resumed mid-play)
      // Decrement each time the user hits play
      setPlaysRemaining((prev) => prev - 1)
      audio.play()
      setIsPlaying(true)
    }
  }

  function handleTimeUpdate() {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress(audio.currentTime / audio.duration)
  }

  function handleEnded() {
    setIsPlaying(false)
    setProgress(1)
    onComplete?.()
  }

  const canPlay = playsRemaining > 0

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Clip {clipNumber}
        </span>
        <span
          className={[
            'text-xs font-medium px-3 py-1 rounded-full',
            playsRemaining > 0
              ? 'bg-blue-50 text-blue-600'
              : 'bg-red-50 text-red-500',
          ].join(' ')}
        >
          {playsRemaining > 0
            ? `Plays remaining: ${playsRemaining}`
            : 'No more plays'}
        </span>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-4">
        {/* Play / Pause button */}
        <button
          onClick={handlePlayPause}
          disabled={!canPlay && !isPlaying}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className={[
            'w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors',
            canPlay || isPlaying
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed',
          ].join(' ')}
        >
          {isPlaying ? (
            /* Pause icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            /* Play icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 ml-0.5"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-100"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
