export default function TestPage() {
  const sections = [
    { id: "lesen", label: "Lesen", sub: "Reading", time: "5 min" },
    { id: "sprachbausteine", label: "Sprachbausteine", sub: "Grammar", time: "3 min" },
    { id: "hoeren", label: "Hören", sub: "Listening", time: "4 min" },
    { id: "schreiben", label: "Schreiben", sub: "Writing", time: "5 min" },
    { id: "sprechen", label: "Sprechen", sub: "Speaking", time: "3 min" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Section 1 of 5</span>
            <span className="text-sm text-gray-400">~18 min remaining</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: "0%" }} />
          </div>
          {/* Section dots */}
          <div className="flex justify-between mt-3">
            {sections.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    i === 0 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
                <span className="text-xs text-gray-400 hidden sm:block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
            <span>Lesen</span>
            <span className="text-blue-400">·</span>
            <span>Reading</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Test questions coming soon
          </h2>

          <p className="text-gray-500">
            This section will contain a reading passage with 5 multiple-choice
            questions. The full test content is being added in Phase 2.
          </p>

          <div className="pt-4">
            <a
              href="/report/demo"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Preview Report Page →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
