# B1 TELC Readiness Checker — MVP Plan

## 1. What We're Building

A web app where German learners take a **~20-minute mini-diagnostic** that mirrors all 5 subsections of the real TELC B1 exam. At the end, they enter their email and receive a personalized readiness report showing their score per section, weaknesses, and a study plan.

---

## 2. The Real Exam vs. Our Diagnostic

The actual TELC B1 is ~3 hours and 300 points. We're sampling each section to estimate readiness — not replicating the full thing.

| Real Exam Section | Pts | Time | Our MVP Version | Est. Time |
|---|---|---|---|---|
| **Lesen** (Reading) — 3 parts: global, detailed, selective | 75 | 65 min | 1 text + 5 MC questions | 5 min |
| **Sprachbausteine** (Language Elements) — grammar/vocab cloze | 30 | 15 min | 6 fill-in-the-blank (3 options each) | 3 min |
| **Hören** (Listening) — 3 parts: global, detailed, selective | 75 | 25 min | 2 audio clips + 4 questions | 4 min |
| **Schreiben** (Writing) — semi-formal letter/email | 45 | 30 min | 1 short email reply (80-100 words) | 5 min |
| **Sprechen** (Speaking) — intro, topic, joint planning | 75 | 15 min | 1 picture description prompt (60-90 sec recording) | 3 min |
| **Total** | **300** | **~3 hrs** | **~18 questions + 1 writing + 1 speaking** | **~20 min** |

### Why This Sampling Works
Each section maps 1:1 to the real exam subsection. We test the same competencies (global vs. detailed comprehension, grammar accuracy, written expression, spoken fluency) — just with fewer items. The AI-evaluated sections (Schreiben + Sprechen) are what make this genuinely useful vs. a generic quiz.

---

## 3. User Flow

```
Landing Page → Start Test → Lesen → Sprachbausteine → Hören → Schreiben → Sprechen → Email Gate → Report Page
```

**Step by step:**

1. **Landing page** — "How ready are you for TELC B1? Find out in 20 minutes." CTA button.
2. **Test flow** — One section at a time, progress bar at top. Clean, focused UI — one question per screen or one section per screen.
3. **Lesen** — Read a passage, answer 5 MC questions.
4. **Sprachbausteine** — 6 cloze/fill-in-the-blank items with 3 options each.
5. **Hören** — Play audio clip(s), answer 4 questions (MC or true/false).
6. **Schreiben** — Show a prompt (e.g., "Reply to this email about rescheduling an appointment"). Textarea, 80-100 word target. Live word count.
7. **Sprechen** — Show a picture + prompt ("Describe this picture in German"). Record button → records 60-90 seconds of audio.
8. **Email gate** — "Enter your email to see your personalized report." Single field + submit.
9. **Report page** — Scores per section, overall readiness %, weaknesses, personalized study recommendations. Accessible via unique URL (`/report/[id]`).
10. **Email delivery** — User receives email with link to their report (+ optionally a PDF attachment later).

---

## 4. Tech Stack

Optimized for vibe coding with Cursor/Claude Code — minimal config, maximum leverage.

### Core App
| Layer | Choice | Why |
|---|---|---|
| **Framework** | **Next.js 14** (App Router) | Full-stack in one project. Huge ecosystem, tons of AI coding examples. |
| **Language** | **TypeScript** | Cursor autocomplete is 10x better with types. |
| **Styling** | **Tailwind CSS + shadcn/ui** | Copy-paste components, looks professional fast. |
| **Database** | **Supabase** (Postgres + free tier) | DB + file storage in one. Dead simple SDK. |
| **Deployment** | **Vercel** | One-click deploy from GitHub. Free tier is plenty. |

### AI / Media
| Need | Choice | Why |
|---|---|---|
| **Speech-to-text** | **OpenAI Whisper API** | Best German transcription. ~$0.006/min. |
| **Writing + Speaking evaluation** | **Claude API (Haiku for speed)** | Send the writing text or Whisper transcript → get structured scores + feedback. Cheaper and faster than GPT-4 for evaluation tasks. |
| **Audio for Hören** | **Pre-recorded MP3s** in Supabase Storage | Record them yourself or use TTS. Stored as static assets. |

### Email + Report
| Need | Choice | Why |
|---|---|---|
| **Email delivery** | **Resend** | 100 emails/day free. 3 lines of code to send. |
| **Report** | **In-app HTML page** (`/report/[id]`) | Styled React page = your report. No PDF generation needed for MVP. User can print-to-PDF from browser. |

### Why NOT Make.com + Google Docs for MVP
Make.com is great for automation, but for MVP it adds: webhook coordination, Google API auth setup, template management, and debugging across 3 systems. For v1, keeping the report in-app means one codebase, instant load, and you can always add Make.com + PDF export in v2.

---

## 5. Data Model (Supabase)

```sql
-- A test attempt
CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  email TEXT,                          -- captured at the end
  status TEXT DEFAULT 'in_progress',   -- in_progress | completed

  -- Section scores (0-100 normalized)
  score_lesen INT,
  score_sprachbausteine INT,
  score_hoeren INT,
  score_schreiben INT,
  score_sprechen INT,
  score_overall INT,

  -- Raw data
  answers JSONB,          -- all MC/cloze answers
  writing_text TEXT,      -- Schreiben response
  speaking_transcript TEXT,-- Whisper transcription
  speaking_audio_url TEXT, -- Supabase Storage URL

  -- AI evaluation results
  writing_evaluation JSONB,  -- structured feedback from Claude
  speaking_evaluation JSONB, -- structured feedback from Claude
  study_plan JSONB           -- generated recommendations
);
```

That's it. One table. For MVP, this is all you need.

---

## 6. Key Technical Decisions

### Audio Recording (Sprechen)
Use the **Web MediaRecorder API** — works in all modern browsers. Record as WebM, send to your Next.js API route, which forwards to Whisper API for transcription.

```
Browser (MediaRecorder) → API Route /api/transcribe → OpenAI Whisper → transcript back
```

### AI Evaluation (Schreiben + Sprechen)
Single API route `/api/evaluate` that sends the text to Claude with a structured prompt:

```
"Evaluate this TELC B1 German writing/speaking sample. Score on:
- Grammar accuracy (0-25)
- Vocabulary range (0-25)
- Task completion (0-25)
- Coherence (0-25)
Also provide: 3 specific weaknesses, 2 strengths, and a 1-paragraph recommendation."
```

Returns structured JSON → stored in the attempt record → rendered on report page.

### Listening Audio (Hören)
For MVP: use **pre-recorded audio files**. Options:
- Record them yourself (most authentic)
- Use a German TTS service (ElevenLabs, Google TTS) to generate from scripts
- Store MP3s in Supabase Storage or just in `/public` folder

### Email Gate Strategy
Capture email AFTER the test (not before). This is intentional:
- Higher completion rate — they've invested 20 min, they want their results
- The "value exchange" is clear: email → report
- Store email in the `attempts` table, trigger email send via Resend

---

## 7. Implementation Phases

### Phase 1: Skeleton (Day 1-2)
- [ ] `npx create-next-app` with TypeScript + Tailwind
- [ ] Set up Supabase project + create `attempts` table
- [ ] Build basic page routing: landing → test flow → email → report
- [ ] Set up shadcn/ui components
- [ ] Deploy to Vercel (deploy early, deploy often)

### Phase 2: Reading + Grammar Sections (Day 3-4)
- [ ] Create question data structure (JSON files for now)
- [ ] Build `<QuestionCard>` component (MC + cloze variations)
- [ ] Build Lesen section (text + 5 questions)
- [ ] Build Sprachbausteine section (6 cloze items)
- [ ] Progress bar + section navigation
- [ ] Store answers in local state → save to Supabase on section complete

### Phase 3: Listening Section (Day 5)
- [ ] Create/source 2 audio clips with German dialogue
- [ ] Build audio player component (play/pause, replay limit optional)
- [ ] Build Hören question UI (4 questions)
- [ ] Upload audio to Supabase Storage or `/public`

### Phase 4: Writing + Speaking Sections (Day 6-8)
- [ ] Build Schreiben section (prompt + textarea + word counter)
- [ ] Build Sprechen section (prompt + record button + timer + playback)
- [ ] Implement MediaRecorder for audio capture
- [ ] Build `/api/transcribe` route (Whisper integration)
- [ ] Build `/api/evaluate` route (Claude integration for both writing + speaking)
- [ ] Test end-to-end: record → transcribe → evaluate → store

### Phase 5: Email + Report (Day 9-10)
- [ ] Build email gate screen (simple form)
- [ ] Set up Resend + build `/api/send-report` route
- [ ] Build report page `/report/[id]` with:
  - Overall readiness score (% and pass/fail indicator)
  - Per-section breakdown with visual bars
  - Strengths and weaknesses
  - Personalized study plan
- [ ] Style the report page to look professional (this IS your product)

### Phase 6: Polish + Launch (Day 11-12)
- [ ] Landing page copy and design
- [ ] Mobile responsiveness
- [ ] Error handling (what if recording fails? what if API is slow?)
- [ ] Loading states during AI evaluation ("Analyzing your German...")
- [ ] Basic analytics (Vercel Analytics or Plausible — free)
- [ ] Test with 3-5 real users
- [ ] Launch! Share on relevant communities

---

## 8. Question Content Strategy

You need actual test content. Options for MVP:

1. **Write them yourself** based on TELC B1 practice materials (fastest, most control)
2. **Use Claude/GPT to generate** B1-level reading passages, cloze tests, and prompts — then review for accuracy
3. **Source from public TELC practice tests** (telc.net has free sample papers)

Recommended: Use option 3 as reference for format/difficulty, then option 2 to generate your own original content (avoids copyright issues).

For Hören audio: start with 2 simple dialogues. Record them with native speakers or use ElevenLabs German voices.

---

## 9. Cost Estimate (MVP)

| Service | Monthly Cost |
|---|---|
| Vercel | Free (hobby tier) |
| Supabase | Free (up to 500MB DB, 1GB storage) |
| OpenAI Whisper | ~$0.006/min × est. 200 users × 1.5 min = **~$1.80** |
| Claude API (Haiku) | ~$0.001/evaluation × 200 users × 2 evals = **~$0.40** |
| Resend | Free (100 emails/day) |
| **Total** | **< $5/month** for first 200 users |

---

## 10. V2 Ideas (After MVP Validated)

- **PDF report** — generate with Puppeteer or `react-pdf` and attach to email
- **Make.com integration** — auto-add leads to a CRM or Google Sheet
- **More question sets** — randomized pools so repeat takers get fresh questions
- **Detailed Hören** — more audio variety, different accents, speeds
- **Timer per section** — simulate real exam pressure
- **HeyLama integration** — "Weak in Schreiben? Start a writing lesson now" → funnel into your tutoring platform
- **A/B test the email gate** — before vs. after, or partial results vs. full results
- **Google Docs report** via Make.com — if you want a more "official" feel
- **Stripe paywall** — charge for detailed report, keep basic score free

---

## 11. Vibe Coding Tips

Since you're using this to learn:

1. **Start with Cursor or Claude Code.** Describe what you want in plain English. Let it scaffold.
2. **Deploy on day 1.** Even if it's just "Hello World" on Vercel. Removing the deployment mystery early is huge.
3. **One section at a time.** Get Lesen working end-to-end before touching Hören.
4. **Use `console.log` liberally.** When AI-generated code doesn't work, logs are your best friend.
5. **Commit after every working feature.** Git is your undo button.
6. **Don't optimize early.** Hardcoded questions in a JSON file > a fancy CMS. Inline styles > a design system. Ship first.

---

*Generated: April 7, 2026*
