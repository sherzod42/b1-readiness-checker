type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: Props) {
  const { id } = await params;

  const sections = [
    { label: "Lesen", sub: "Reading", score: 72 },
    { label: "Sprachbausteine", sub: "Grammar", score: 58 },
    { label: "Hören", sub: "Listening", score: 80 },
    { label: "Schreiben", sub: "Writing", score: 65 },
    { label: "Sprechen", sub: "Speaking", score: 70 },
  ];

  const overall = Math.round(
    sections.reduce((sum, s) => sum + s.score, 0) / sections.length
  );

  const readinessLabel =
    overall >= 75 ? "Likely Ready" : overall >= 55 ? "Almost Ready" : "Needs Work";

  const readinessColor =
    overall >= 75
      ? "text-green-600 bg-green-50"
      : overall >= 55
      ? "text-yellow-600 bg-yellow-50"
      : "text-red-600 bg-red-50";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
          B1 Readiness Checker · Your Report
        </span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        {/* Overall score */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-4">
          <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
            Overall Readiness
          </p>
          <div className="text-7xl font-bold text-gray-900">{overall}%</div>
          <span
            className={`inline-block text-sm font-semibold px-4 py-1.5 rounded-full ${readinessColor}`}
          >
            {readinessLabel}
          </span>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            {overall >= 75
              ? "You're well prepared for the TELC B1 exam. Keep practicing to stay sharp."
              : overall >= 55
              ? "You're close! A few weeks of focused practice and you'll be ready."
              : "You need more preparation before taking the TELC B1 exam."}
          </p>
        </div>

        {/* Section breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          <h2 className="font-bold text-gray-900 text-lg">Section Breakdown</h2>
          {sections.map((s) => (
            <div key={s.label} className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-semibold text-gray-800">{s.label}</span>
                  <span className="text-xs text-gray-400 ml-2">{s.sub}</span>
                </div>
                <span className="text-sm font-bold text-gray-700">{s.score}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    s.score >= 75
                      ? "bg-green-500"
                      : s.score >= 55
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${s.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Study plan placeholder */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg">Your Study Plan</h2>
          <p className="text-sm text-gray-500">
            AI-generated study recommendations will appear here after you complete the
            full test. They will be tailored to your weakest sections.
          </p>
          <div className="space-y-3">
            {["Focus on Sprachbausteine (Grammar) — your weakest section", "Practice writing semi-formal emails", "Listen to German podcasts daily for 15 min"].map(
              (tip) => (
                <div key={tip} className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">→</span>
                  <span className="text-sm text-gray-700">{tip}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Demo note */}
        {id === "demo" && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-6 py-4 text-sm text-blue-700 text-center">
            This is a demo report with placeholder scores. Real reports are generated after completing the full test.
          </div>
        )}
      </div>
    </main>
  );
}
