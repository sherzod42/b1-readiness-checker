"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes — the full 20-minute diagnostic and your readiness report are completely free, with no account or payment required.",
  },
  {
    q: "How accurate is the AI evaluation?",
    a: "Your Writing and Speaking responses are graded against the same competencies a real telc examiner assesses — task fulfilment, accuracy, range and coherence. It's a strong indicator of readiness, though not an official result.",
  },
  {
    q: "How long does it take?",
    a: "About 20 minutes for all five sections. You'll get your report immediately after the last task.",
  },
  {
    q: "Is this the official telc exam?",
    a: "No. This is an independent practice diagnostic built to mirror the official telc B1 format. It is not affiliated with or endorsed by telc gGmbH.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number>(-1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: "1px solid #ece9e3",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              padding: "20px 22px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "var(--font-hanken), system-ui, sans-serif",
              fontSize: "16.5px",
              fontWeight: 600,
              color: "#1a2030",
            }}
          >
            {faq.q}
            <span style={{ color: "#3a4fd6", fontSize: "22px", lineHeight: 1, flex: "none" }}>
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div
              style={{
                padding: "0 22px 22px",
                fontSize: "15px",
                lineHeight: 1.65,
                color: "#5b6478",
              }}
            >
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
