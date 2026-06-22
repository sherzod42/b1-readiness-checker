import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
          B1 Readiness Checker
        </span>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Badge */}
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
            Free · 20 minutes · No registration needed
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            How ready are you for{" "}
            <span className="text-blue-600">TELC B1</span>?
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-lg mx-auto">
            Take a 20-minute diagnostic across all 5 exam sections — including
            AI-evaluated Writing and Speaking. Get a personalized readiness
            report instantly.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link
              href="/test"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto"
            >
              Start the Test →
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            Based on the official TELC B1 exam format · No account required
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium text-center mb-8">
            How it works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Take the test",
                desc: "20-minute diagnostic across all 5 TELC B1 sections — Reading, Grammar, Listening, Writing, and Speaking.",
              },
              {
                step: "2",
                title: "AI evaluation",
                desc: "Your writing and speaking responses are scored by AI — the same competencies a real examiner would assess.",
              },
              {
                step: "3",
                title: "Your personal report",
                desc: "See your score per section, identify your weak areas, and get concrete study recommendations.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col gap-3 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mx-auto">
                  {item.step}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section breakdown */}
      <div className="border-t border-gray-100 px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium text-center mb-6">
            All 5 exam sections covered
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { label: "Lesen", sub: "Reading" },
              { label: "Grammatik", sub: "Grammar" },
              { label: "Hören", sub: "Listening" },
              { label: "Schreiben", sub: "Writing" },
              { label: "Sprechen", sub: "Speaking" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 bg-gray-50 rounded-lg p-3"
              >
                <span className="text-xs font-semibold text-gray-700">
                  {s.label}
                </span>
                <span className="text-xs text-gray-400 text-center">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-4 text-center">
        <p className="text-xs text-gray-400">
          Based on the official TELC B1 exam format
        </p>
      </footer>
    </main>
  );
}
