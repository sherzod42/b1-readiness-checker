'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type Props = {
  maxSeconds: number
  onSubmit: (audioBlob: Blob) => void
  onPrepComplete?: () => void
}

type Phase = 'prep' | 'recording' | 'review'

const PREP_SECONDS = 30
const CIRCUMFERENCE = 2 * Math.PI * 52 // r=52 → ≈326.73

export default function SpeakingRecorder({ maxSeconds, onSubmit, onPrepComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('prep')
  const [secondsLeft, setSecondsLeft] = useState(PREP_SECONDS)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const urlRef = useRef<string | null>(null)

  // Clear any running timer
  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Start the actual MediaRecorder
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType })
        const url = URL.createObjectURL(blob)
        urlRef.current = url
        setAudioBlob(blob)
        setAudioUrl(url)
        stream.getTracks().forEach((t) => t.stop())
        setPhase('review')
      }

      recorder.start()
      recorderRef.current = recorder
      setMediaRecorder(recorder)
      setPhase('recording')
      setSecondsLeft(maxSeconds)

      // Start recording countdown
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearTimer()
            if (recorderRef.current && recorderRef.current.state === 'recording') {
              recorderRef.current.stop()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch {
      // Microphone access denied or unavailable — silently handle
    }
  }, [maxSeconds])

  // Prep countdown effect
  useEffect(() => {
    if (phase !== 'prep') return

    setSecondsLeft(PREP_SECONDS)
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer()
          onPrepComplete?.()
          startRecording()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === 'prep'])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer()
      if (recorderRef.current && recorderRef.current.state === 'recording') {
        recorderRef.current.stop()
      }
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current)
      }
    }
  }, [])

  function stopRecordingEarly() {
    clearTimer()
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop()
    }
  }

  function handleReRecord() {
    // Revoke old URL
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current)
      urlRef.current = null
    }
    setAudioBlob(null)
    setAudioUrl(null)
    setIsPlaying(false)
    setMediaRecorder(null)
    recorderRef.current = null
    setPhase('prep')
  }

  function handleSubmit() {
    if (audioBlob) onSubmit(audioBlob)
  }

  function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  // Compute ring stroke-dashoffset
  const totalSeconds = phase === 'prep' ? PREP_SECONDS : maxSeconds
  const dashOffset = CIRCUMFERENCE * (1 - secondsLeft / totalSeconds)
  const ringColor = phase === 'prep' ? '#4f46e5' : '#e11d48' // indigo-600 / rose-600

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
      {/* ---- PREP PHASE ---- */}
      {phase === 'prep' && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm text-gray-500 text-center">
            Bereiten Sie sich vor. Die Aufnahme startet automatisch.
          </p>

          {/* Circular countdown ring */}
          <div className="relative inline-flex items-center justify-center">
            <svg width="120" height="120" className="-rotate-90">
              {/* Background track */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Progress arc */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={ringColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <span className="absolute text-2xl font-bold text-indigo-600">
              {secondsLeft}
            </span>
          </div>

          <p className="text-base font-semibold text-gray-700">
            Vorbereitung: {secondsLeft}s
          </p>
        </div>
      )}

      {/* ---- RECORDING PHASE ---- */}
      {phase === 'recording' && (
        <div className="flex flex-col items-center gap-6">
          {/* Pulsing red dot */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600" />
            </span>
            <span className="text-sm font-semibold text-rose-600">Aufnahme läuft</span>
          </div>

          {/* Circular countdown ring */}
          <div className="relative inline-flex items-center justify-center">
            <svg width="120" height="120" className="-rotate-90">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={ringColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <span className="absolute text-2xl font-bold text-rose-600">
              {secondsLeft}
            </span>
          </div>

          {/* Stop button */}
          <button
            onClick={stopRecordingEarly}
            className="inline-flex items-center gap-2 bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-rose-700 transition-colors shadow-sm"
          >
            {/* Square stop icon */}
            <span className="w-4 h-4 bg-white rounded-sm inline-block shrink-0" />
            Aufnahme stoppen
          </button>
        </div>
      )}

      {/* ---- REVIEW PHASE ---- */}
      {phase === 'review' && audioUrl && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-medium text-gray-600">Ihre Aufnahme:</p>

          {/* Hidden HTML audio element */}
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          {/* Custom play/pause button */}
          <button
            onClick={togglePlayback}
            className="inline-flex items-center gap-3 bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? (
              <>
                {/* Pause icon */}
                <span className="flex gap-1">
                  <span className="w-1.5 h-5 bg-gray-700 rounded-sm" />
                  <span className="w-1.5 h-5 bg-gray-700 rounded-sm" />
                </span>
                Pause
              </>
            ) : (
              <>
                {/* Play icon */}
                <span className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-t-transparent border-b-transparent border-l-gray-700" />
                Abspielen
              </>
            )}
          </button>

          {/* Action buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={handleReRecord}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
            >
              Nochmal aufnehmen
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm"
            >
              Antwort absenden
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
