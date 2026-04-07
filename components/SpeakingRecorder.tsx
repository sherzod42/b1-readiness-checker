'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type Props = {
  maxSeconds: number
  onSubmit: (audioBlob: Blob) => void
}

type Phase = 'idle' | 'recording' | 'review'

const CIRCUMFERENCE = 2 * Math.PI * 52 // r=52 → ≈326.73

export default function SpeakingRecorder({ maxSeconds, onSubmit }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [secondsLeft, setSecondsLeft] = useState(maxSeconds)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const urlRef = useRef<string | null>(null)

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

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
      setPhase('recording')
      setSecondsLeft(maxSeconds)

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
      // Microphone access denied or unavailable
    }
  }, [maxSeconds])

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
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current)
      urlRef.current = null
    }
    setAudioBlob(null)
    setAudioUrl(null)
    setIsPlaying(false)
    recorderRef.current = null
    setPhase('idle')
    setSecondsLeft(maxSeconds)
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

  const dashOffset = CIRCUMFERENCE * (1 - secondsLeft / maxSeconds)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">

      {/* ---- IDLE PHASE ---- */}
      {phase === 'idle' && (
        <div className="flex flex-col items-center gap-5">
          <p className="text-sm text-gray-500 text-center">
            Lesen Sie das Bild und die Aufgabe. Wenn Sie bereit sind, starten Sie die Aufnahme.
          </p>
          <p className="text-xs text-gray-400 text-center">
            Maximale Aufnahmedauer: {maxSeconds} Sekunden
          </p>
          <button
            onClick={startRecording}
            className="inline-flex items-center gap-3 bg-rose-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-rose-700 transition-colors shadow-sm text-base"
          >
            {/* Circle record icon */}
            <span className="w-4 h-4 rounded-full bg-white inline-block shrink-0" />
            Aufnahme starten
          </button>
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
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#e11d48"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <span className="absolute text-2xl font-bold text-rose-600">{secondsLeft}</span>
          </div>

          {/* Stop button */}
          <button
            onClick={stopRecordingEarly}
            className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors shadow-sm"
          >
            <span className="w-4 h-4 bg-white rounded-sm inline-block shrink-0" />
            Aufnahme stoppen
          </button>
        </div>
      )}

      {/* ---- REVIEW PHASE ---- */}
      {phase === 'review' && audioUrl && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-medium text-gray-600">Ihre Aufnahme:</p>

          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          <button
            onClick={togglePlayback}
            className="inline-flex items-center gap-3 bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? (
              <>
                <span className="flex gap-1">
                  <span className="w-1.5 h-5 bg-gray-700 rounded-sm" />
                  <span className="w-1.5 h-5 bg-gray-700 rounded-sm" />
                </span>
                Pause
              </>
            ) : (
              <>
                <span className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-t-transparent border-b-transparent border-l-gray-700" />
                Abspielen
              </>
            )}
          </button>

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
