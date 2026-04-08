import { createServiceClient } from '@/lib/supabase'
import EmailGate from '@/components/EmailGate'
import ReportContent from '@/components/ReportContent'
import type { Attempt } from '@/components/ReportContent'

type Props = {
  params: Promise<{ id: string }>
}

const demoAttempt: Attempt = {
  id: 'demo',
  email: 'demo@example.com',
  score_lesen: 60,
  score_sprachbausteine: 67,
  score_hoeren: 75,
  score_schreiben: 65,
  score_sprechen: 70,
  answers: {
    lesen: {
      'lesen-q1': 1,
      'lesen-q2': 1,
      'lesen-q3': 1,
      'lesen-q4': 2,
      'lesen-q5': 1,
    },
    sprachbausteine: {
      'sprach-q1': 0,
      'sprach-q2': 1,
      'sprach-q3': 0,
      'sprach-q4': 1,
      'sprach-q5': 1,
      'sprach-q6': 2,
    },
    hoeren: {
      'hoeren-q1': 1,
      'hoeren-q2': 0,
      'hoeren-q3': 2,
      'hoeren-q4': 1,
    },
  },
  writing_text: 'Liebe Anna, vielen Dank für deine Nachricht! Ja, am Samstag habe ich Zeit. Ich würde gerne das neue Café besuchen, weil ich schon viel Gutes darüber gehört habe. Wie wäre es um 15 Uhr? Das wäre perfekt für mich. Ich freue mich sehr auf unser Treffen! Viele Grüße',
  writing_evaluation: {
    grammar: 19,
    vocabulary: 17,
    taskCompletion: 21,
    coherence: 18,
    strengths: ['Klare Struktur', 'Alle Aufgaben erfüllt'],
    weaknesses: ['Wortschatz könnte vielfältiger sein', 'Einige Grammatikfehler bei Konjunktionen'],
    recommendation: 'Üben Sie mehr Konjunktionen und erweitern Sie Ihren aktiven Wortschatz durch tägliches Lesen.',
  },
  speaking_transcript: 'Ich sehe ein Bild von einem Park. Es gibt viele Menschen. Einige Leute spielen Schach und andere joggen. Das Wetter ist schön und ich denke es ist Sommer weil die Leute leichte Kleidung tragen.',
  speaking_evaluation: {
    grammar: 17,
    vocabulary: 16,
    taskCompletion: 20,
    fluency: 15,
    strengths: ['Gute Beschreibung der Aktivitäten', 'Logische Schlussfolgerung zur Jahreszeit'],
    weaknesses: ['Flüssigkeit kann verbessert werden', 'Wenig komplexe Satzkonstruktionen'],
    recommendation: 'Üben Sie das freie Sprechen täglich, z.B. indem Sie Bilder beschreiben oder Ereignisse des Tages erzählen.',
  },
}

export default async function ReportPage({ params }: Props) {
  const { id } = await params

  // Demo mode — always works without Supabase
  if (id === 'demo') {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-100 px-6 py-4">
          <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
            B1 Readiness Checker · Ihr Bericht
          </span>
        </header>
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 text-center">
          <p className="text-sm text-blue-700">
            Dies ist ein Demo-Bericht mit Beispieldaten. Echte Berichte werden nach Abschluss des vollständigen Tests erstellt.
          </p>
        </div>
        <ReportContent attempt={demoAttempt} blurred={false} />
      </main>
    )
  }

  // Real attempt — fetch from Supabase
  const supabase = createServiceClient()
  const { data: attempt } = await supabase
    .from('attempts')
    .select('*')
    .eq('id', id)
    .single()

  if (!attempt) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-xl font-bold text-gray-900">Bericht nicht gefunden</h1>
          <p className="text-sm text-gray-500">Der angeforderte Bericht existiert nicht oder ist abgelaufen.</p>
          <a
            href="/"
            className="inline-block mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            ← Zur Startseite
          </a>
        </div>
      </main>
    )
  }

  const typedAttempt = attempt as Attempt

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
          B1 Readiness Checker · Ihr Bericht
        </span>
      </header>

      {/* Email gate: shown when email not yet captured */}
      {!typedAttempt.email && (
        <>
          <EmailGate attemptId={id} />
          <ReportContent attempt={demoAttempt} blurred={true} />
        </>
      )}

      {/* Full report: shown once email is captured */}
      {typedAttempt.email && (
        <ReportContent attempt={typedAttempt} blurred={false} />
      )}
    </main>
  )
}
