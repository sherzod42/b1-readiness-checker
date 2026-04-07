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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Badge */}
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
            Free · 20 minutes · No registration needed
          </span>

          {/* Headline */}
          <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            How ready are you for{" "}
            <span className="text-blue-600">TELC B1</span>?
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-500 leading-relaxed max-w-lg mx-auto">
            Take our 20-minute diagnostic across all 5 exam sections — Reading,
            Grammar, Listening, Writing, and Speaking. Get a personalized
            readiness report instantly.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/test"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Start the Test →
            </Link>
            <span className="text-sm text-gray-400">
              No account required
            </span>
          </div>

          {/* Section breakdown */}
          <div className="pt-8 grid grid-cols-5 gap-3 max-w-xl mx-auto">
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
                <span className="text-xs text-gray-400">{s.sub}</span>
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
