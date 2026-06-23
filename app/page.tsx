import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";

const sectionCards = [
  {
    label: "Lesen",
    sub: "Reading",
    desc: "Comprehension of everyday texts and notices.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5a9 9 0 0 1 9 0 9 9 0 0 1 9 0v13a9 9 0 0 0-9 0 9 9 0 0 0-9 0z"/>
        <path d="M12 5v13"/>
      </svg>
    ),
  },
  {
    label: "Grammatik",
    sub: "Grammar",
    desc: "Structures, cases and verb forms in context.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14 4 6 6M3 21l4-1 11-11-3-3L4 17z"/>
      </svg>
    ),
  },
  {
    label: "Hören",
    sub: "Listening",
    desc: "Understanding announcements and conversations.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10v4M7 7v10M11 4v16M15 8v8M19 11v2"/>
      </svg>
    ),
  },
  {
    label: "Schreiben",
    sub: "Writing",
    desc: "A short message — AI-graded on task and accuracy.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>
      </svg>
    ),
  },
  {
    label: "Sprechen",
    sub: "Speaking",
    desc: "Speak a response — AI-graded on fluency and range.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.5 8.5 0 0 1-12 7.7L3 21l1.8-6A8.5 8.5 0 1 1 21 11.5z"/>
      </svg>
    ),
  },
];

const scoreBars = [
  { label: "Lesen",     pct: "85%", score: "85", color: "#3a4fd6" },
  { label: "Grammatik", pct: "72%", score: "72", color: "#3a4fd6" },
  { label: "Hören",     pct: "61%", score: "61", color: "#e08a2e" },
  { label: "Schreiben", pct: "80%", score: "80", color: "#3a4fd6" },
  { label: "Sprechen",  pct: "75%", score: "75", color: "#3a4fd6" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#faf9f7", fontFamily: "var(--font-hanken), system-ui, sans-serif", color: "#1a2030" }}>

      {/* ── HEADER ── */}
      <header style={{ borderBottom: "1px solid #ece9e3" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1120px", margin: "0 auto", padding: "22px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#3a4fd6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "16px" }}>
              B1
            </div>
            <span style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, fontSize: "16px", letterSpacing: "-0.01em", color: "#1a2030" }}>
              Readiness Checker
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a href="#how" className="hidden sm:inline" style={{ textDecoration: "none", color: "#5b6478", fontSize: "15px", fontWeight: 500 }}>How it works</a>
            <a href="#sections" className="hidden sm:inline" style={{ textDecoration: "none", color: "#5b6478", fontSize: "15px", fontWeight: 500 }}>What&apos;s tested</a>
            <Link href="/test" style={{ textDecoration: "none", color: "#fff", background: "#3a4fd6", fontSize: "14px", fontWeight: 600, padding: "9px 16px", borderRadius: "9px" }}>
              Start test
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "48px 32px 72px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          {/* Left */}
          <div className="animate-floatup">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#edf0fd", color: "#3a4fd6", fontSize: "13px", fontWeight: 600, padding: "7px 14px", borderRadius: "999px", letterSpacing: "0.01em", marginBottom: "24px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "999px", background: "#3a4fd6" }}></span>
              Free · 20 minutes · No sign-up
            </div>
            <h1 style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "clamp(38px, 5vw, 54px)", lineHeight: 1.04, letterSpacing: "-0.025em", margin: "0 0 20px", color: "#15192a" }}>
              How ready are you for{" "}
              <span style={{ color: "#3a4fd6" }}>telc B1</span>?
            </h1>
            <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#5b6478", margin: "0 0 32px", maxWidth: "480px" }}>
              Take a 20-minute diagnostic across all 5 exam sections — including AI-evaluated Writing and Speaking. Get a personalized readiness report in seconds.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/test"
                style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#3a4fd6", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "17px", padding: "15px 28px", borderRadius: "12px", boxShadow: "0 8px 24px -8px rgba(58,79,214,0.55)" }}
              >
                Start the free test <span style={{ fontSize: "18px" }}>→</span>
              </Link>
              <Link href="/report/demo" style={{ color: "#3a4fd6", textDecoration: "none", fontWeight: 600, fontSize: "16px" }}>
                See a sample report
              </Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", marginTop: "28px", color: "#8a93a6", fontSize: "13.5px", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Official telc B1 format
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                No account needed
              </span>
            </div>
          </div>

          {/* Right — report preview mockup */}
          <div id="report" className="animate-floatup-slow" style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "-14px", background: "radial-gradient(120% 120% at 70% 10%, #e9ecfd 0%, rgba(250,249,247,0) 60%)", borderRadius: "32px", zIndex: 0 }}></div>
            <div style={{ position: "relative", zIndex: 1, background: "#fff", border: "1px solid #ebe8e2", borderRadius: "20px", boxShadow: "0 30px 60px -28px rgba(26,32,48,0.28)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid #f0ede7" }}>
                <span style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, fontSize: "15px" }}>Your Readiness Report</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#2e9e6b", background: "#e6f6ee", padding: "5px 10px", borderRadius: "999px" }}>Likely ready</span>
              </div>
              <div style={{ padding: "24px 22px", display: "flex", alignItems: "center", gap: "22px", borderBottom: "1px solid #f0ede7" }}>
                <div style={{ position: "relative", width: "132px", height: "78px", flex: "none" }}>
                  <svg width="132" height="84" viewBox="0 0 160 96">
                    <path d="M14 86 A66 66 0 0 1 146 86" fill="none" stroke="#eceae4" strokeWidth="14" strokeLinecap="round"/>
                    <path d="M14 86 A66 66 0 0 1 146 86" fill="none" stroke="#3a4fd6" strokeWidth="14" strokeLinecap="round" strokeDasharray="161.7 207.3"/>
                  </svg>
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: 1, color: "#15192a" }}>
                      78<span style={{ fontSize: "16px", color: "#8a93a6" }}>%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a2030", marginBottom: "4px" }}>Overall readiness</div>
                  <div style={{ fontSize: "13.5px", lineHeight: 1.5, color: "#5b6478" }}>
                    You&apos;re close. Focus on <strong style={{ color: "#1a2030" }}>Hören</strong> to cross the pass line confidently.
                  </div>
                </div>
              </div>
              <div style={{ padding: "18px 22px 22px", display: "flex", flexDirection: "column", gap: "13px" }}>
                {scoreBars.map((s) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: "76px", fontSize: "13px", color: "#5b6478", flex: "none" }}>{s.label}</span>
                    <span style={{ flex: 1, height: "7px", background: "#eceae4", borderRadius: "999px", overflow: "hidden" }}>
                      <span style={{ display: "block", height: "100%", width: s.pct, background: s.color, borderRadius: "999px" }}></span>
                    </span>
                    <span style={{ width: "30px", textAlign: "right", fontSize: "12.5px", fontWeight: 600, color: s.color }}>{s.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ background: "#f4f2ee", borderTop: "1px solid #ece9e3", borderBottom: "1px solid #ece9e3" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "72px 32px" }}>
          <div style={{ textAlign: "center", fontSize: "13px", fontWeight: 600, letterSpacing: "0.12em", color: "#9a93d6", textTransform: "uppercase", marginBottom: "12px" }}>
            How it works
          </div>
          <h2 style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "34px", textAlign: "center", letterSpacing: "-0.02em", margin: "0 0 48px", color: "#15192a" }}>
            From test to plan in three steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "Take the diagnostic",
                desc: "20 minutes across all 5 telc B1 sections — Reading, Grammar, Listening, Writing and Speaking.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16M4 12h16M4 19h10"/></svg>,
              },
              {
                n: "02",
                title: "AI evaluation",
                desc: "Your Writing and Speaking are graded on the same competencies a real telc examiner uses — instantly.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3.2"/></svg>,
              },
              {
                n: "03",
                title: "Your personal report",
                desc: "A score per section, your weak areas flagged, and concrete recommendations on what to study next.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3a4fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h14v16l-7-3-7 3z"/><path d="M9 9h6M9 13h4"/></svg>,
              },
            ].map((step) => (
              <div key={step.n} style={{ background: "#fff", border: "1px solid #ece9e3", borderRadius: "16px", padding: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#edf0fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {step.icon}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#3a4fd6" }}>{step.n}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, fontSize: "19px", margin: "0 0 8px", color: "#15192a" }}>{step.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#5b6478", margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 EXAM SECTIONS ── */}
      <section id="sections" style={{ maxWidth: "1120px", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ textAlign: "center", fontSize: "13px", fontWeight: 600, letterSpacing: "0.12em", color: "#9a93d6", textTransform: "uppercase", marginBottom: "12px" }}>
          All 5 exam sections covered
        </div>
        <h2 style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "34px", textAlign: "center", letterSpacing: "-0.02em", margin: "0 0 48px", color: "#15192a" }}>
          Tested exactly like the real exam
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sectionCards.map((s) => (
            <div
              key={s.label}
              className="section-card"
              style={{ background: "#fff", border: "1px solid #ece9e3", borderRadius: "14px", padding: "22px 18px", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "#edf0fd", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, fontSize: "17px", color: "#15192a" }}>{s.label}</div>
              <div style={{ fontSize: "13px", color: "#8a93a6", marginBottom: "8px" }}>{s.sub}</div>
              <div style={{ fontSize: "13px", lineHeight: 1.5, color: "#5b6478" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT YOU GET (dark) ── */}
      <section style={{ background: "#15192a", color: "#fff" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "80px 32px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.12em", color: "#8a93e8", textTransform: "uppercase", marginBottom: "14px" }}>
                What you get
              </div>
              <h2 style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "34px", letterSpacing: "-0.02em", margin: "0 0 28px", lineHeight: 1.1 }}>
                A report that tells you what to do next — not just a number
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {[
                  { title: "A score for every section", body: "See exactly where you stand against the B1 pass line, section by section." },
                  { title: "Weak areas flagged", body: "Know which competencies are pulling your score down before exam day." },
                  { title: "Concrete study recommendations", body: "Specific next steps tailored to your results — not generic advice." },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: "14px" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a93e8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "2px" }}><path d="M20 6 9 17l-5-5"/></svg>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "16px", marginBottom: "3px" }}>{item.title}</div>
                      <div style={{ fontSize: "14.5px", lineHeight: 1.55, color: "#a7adc4" }}>{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, fontSize: "15px" }}>Recommended next steps</span>
                <span style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", color: "#6f76a0" }}>AUTO-GENERATED</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ background: "rgba(224,138,46,0.12)", border: "1px solid rgba(224,138,46,0.3)", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#e0a865", marginBottom: "5px" }}>PRIORITY · HÖREN</div>
                  <div style={{ fontSize: "14.5px", lineHeight: 1.5, color: "#e7e9f3" }}>Practice timed listening with everyday announcements — your weakest section at 61.</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#8a93e8", marginBottom: "5px" }}>REVIEW · GRAMMATIK</div>
                  <div style={{ fontSize: "14.5px", lineHeight: 1.5, color: "#c4c8da" }}>Tighten up case endings — a handful of recurring errors cost you points.</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#6ad29a", marginBottom: "5px" }}>ON TRACK · LESEN</div>
                  <div style={{ fontSize: "14.5px", lineHeight: 1.5, color: "#c4c8da" }}>Strong at 85 — keep light reading practice to maintain.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 32px" }}>
        <h2 style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "32px", textAlign: "center", letterSpacing: "-0.02em", margin: "0 0 40px", color: "#15192a" }}>
          Common questions
        </h2>
        <FaqAccordion />
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ maxWidth: "1120px", margin: "0 auto 80px", padding: "0 32px" }}>
        <div style={{ background: "#3a4fd6", borderRadius: "24px", padding: "56px 40px", textAlign: "center", backgroundImage: "radial-gradient(140% 120% at 80% 0%, #5468f0 0%, rgba(58,79,214,0) 55%)" }}>
          <h2 style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "36px", letterSpacing: "-0.02em", margin: "0 0 14px", color: "#fff" }}>
            Find out where you stand in 20 minutes
          </h2>
          <p style={{ fontSize: "17px", color: "#dfe3fb", margin: "0 0 28px" }}>
            Free, no sign-up, and your report is ready the moment you finish.
          </p>
          <Link
            href="/test"
            style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", color: "#3a4fd6", textDecoration: "none", fontWeight: 700, fontSize: "17px", padding: "15px 30px", borderRadius: "12px" }}
          >
            Start the free test <span style={{ fontSize: "18px" }}>→</span>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #ece9e3" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#3a4fd6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: "13px" }}>
              B1
            </div>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a2030" }}>Readiness Checker</span>
          </div>
          <p style={{ fontSize: "12.5px", color: "#a39e95", margin: 0, maxWidth: "520px", textAlign: "right" }}>
            Based on the official telc B1 exam format. Independent practice tool — not affiliated with or endorsed by telc gGmbH.
          </p>
        </div>
      </footer>

    </div>
  );
}
