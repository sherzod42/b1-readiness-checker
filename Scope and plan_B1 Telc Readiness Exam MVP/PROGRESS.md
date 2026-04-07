# B1 Readiness Checker — Build Progress Log

> Last updated: 2026-04-07
> Status: Phase 5 complete — full end-to-end flow working. Phase 6 (Polish + Launch) is next.

---

## Setup Checklist — DONE ✅

| Step | Description | Status |
|---|---|---|
| 1 | Node.js installed (v20+) | ✅ |
| 2 | Git installed | ✅ |
| 3 | GitHub repo created: github.com/sherzod42/b1-readiness-checker | ✅ |
| 4 | Vercel account created, connected to GitHub | ✅ |
| 5 | Supabase project created: arqwklabxatjsmarvwtr.supabase.co | ✅ |
| 6 | API keys collected (OpenAI, Anthropic, Resend) | ✅ |
| 7 | Next.js 16.2.2 scaffolded (App Router, Tailwind v4, TypeScript) | ✅ |
| 8 | Dependencies installed: @supabase/supabase-js, openai, resend | ✅ |
| 9 | .env.local created with all 6 keys | ✅ |
| 10 | Pushed to GitHub (PAT auth configured) | ✅ |
| 11 | Deployed to Vercel (auto-deploy on push enabled) | ✅ |
| 12 | Supabase `attempts` table + RLS policies created (done via SQL Editor) | ✅ |
| 13 | npm run dev verified, localhost:3000 working | ✅ |

---

## Implementation Phases

### Phase 1: Skeleton — DONE ✅
- [x] Landing page (`/`) — hero, CTA, section breakdown
- [x] Test shell (`/test`) — progress bar, section dots, placeholder content
- [x] Report page (`/report/[id]`) — score bars, study plan placeholder, demo mode at `/report/demo`
- [x] Supabase client utility (`lib/supabase.ts`) — browser + server-side clients
- [x] Layout metadata updated

**Key files:**
- `app/page.tsx` — landing page
- `app/test/page.tsx` — test shell
- `app/report/[id]/page.tsx` — report page
- `lib/supabase.ts` — Supabase client

---

### Phase 2: Reading + Grammar Sections — DONE ✅

- [x] Question data structure (`data/questions.ts`) — typed, exportable
- [x] `components/QuestionCard.tsx` — handles MC and cloze variants
- [x] Lesen section — B1 community garden passage (~150 words) + 5 MC questions
- [x] Sprachbausteine section — 6 cloze items (prepositions, conjunctions, verb forms)
- [x] Progress bar wired to real section state (5-section dots, locked indicator)
- [x] Answers saved to Supabase on section complete, scores calculated

**Key files:**
- `data/questions.ts` — all question content and types
- `components/QuestionCard.tsx` — MC + cloze renderer
- `app/test/page.tsx` — full test flow with state + Supabase saves

---

### Phase 3: Listening Section — DONE ✅

- [x] 2 audio clips recorded via ElevenLabs — `public/clip1.mp3`, `public/clip2.mp3`
- [x] `components/AudioPlayer.tsx` — play/pause, progress bar, 3-play limit per clip
- [x] Hören section — 4 MC questions across 2 clips
- [x] Clip-by-clip progression within section, score saved to Supabase

**Key files:**
- `components/AudioPlayer.tsx` — audio player with play limit
- `data/questions.ts` — HoerenSection + HoerenClip types added
- `public/clip1.mp3`, `public/clip2.mp3` — audio assets

---

### Phase 4a: Writing Section — DONE ✅

- [x] `SchreibenSection` type + Anna email writing prompt in `data/questions.ts`
- [x] Textarea UI with live word count (gray <80 / green 80-100 / orange >100)
- [x] `app/api/evaluate/route.ts` — Claude Haiku (`claude-haiku-4-5-20251001`) evaluation endpoint
- [x] Saves `writing_text`, `writing_evaluation`, `score_schreiben` to Supabase
- [x] "Evaluating..." loading state during AI call
- [x] **Bug fix:** textarea auto-expands via `scrollHeight` — fixes word count stuck + hidden text issue

**Key files:**
- `app/api/evaluate/route.ts` — handles both writing and speaking; returns `{ score, grammar, vocabulary, taskCompletion, coherence|fluency, strengths[], weaknesses[], recommendation }`
- `data/questions.ts` — SchreibenSection added

---

### Phase 4b: Speaking Section — DONE ✅

- [x] `SprechenSection` type + park picture prompt in `data/questions.ts`
- [x] `components/SpeakingRecorder.tsx` — idle → record (60s ring) → review flow; manual start button, re-record allowed
- [x] `app/api/transcribe/route.ts` — OpenAI Whisper endpoint (language: de)
- [x] `app/api/evaluate/route.ts` extended for `type: 'speaking'` (fluency subscore instead of coherence)
- [x] Sprechen section in `app/test/page.tsx` — picture image + task + recorder
- [x] Saves `speaking_transcript`, `speaking_evaluation`, `score_sprechen` to Supabase
- [x] Picture: `public/park.jpeg` — AI-generated park scene (ElevenLabs prompt provided by assistant)

**Key files:**
- `components/SpeakingRecorder.tsx` — MediaRecorder, SVG countdown ring, playback
- `app/api/transcribe/route.ts` — Whisper transcription
- `public/park.jpeg` — speaking prompt image

---

### Phase 5: Email + Report — DONE ✅

- [x] `components/EmailGate.tsx` — blur overlay, email form, calls `/api/send-report`, then `router.refresh()`
- [x] `app/api/send-report/route.ts` — saves email to Supabase, sends summary email via Resend (`onboarding@resend.dev`)
- [x] `app/report/[id]/page.tsx` — server component, fetches real Supabase data; shows EmailGate if no email yet
- [x] `components/ReportContent.tsx` — full report UI:
  - Overall % verdict with TELC B1 pass mark (60%)
  - Per-section breakdown with traffic-light bars
  - Wrong-answer drill-down for Lesen / Sprachbausteine / Hören
  - Writing feedback: subscores + strengths/weaknesses/recommendation
  - Speaking feedback: transcript + subscores + strengths/weaknesses/recommendation
  - 3 data-driven priority actions derived from actual weak areas
- [x] Test page redirects to `/report/[attemptId]` (not hardcoded demo)
- [x] **Bug fix:** `insert({})` instead of `insert({ status: 'in_progress' })` — status column didn't exist
- [x] **Bug fix:** subscore rendering handles `undefined` gracefully (shows `—/25`)

**Key files:**
- `components/EmailGate.tsx` — email capture overlay
- `components/ReportContent.tsx` — full report UI
- `app/api/send-report/route.ts` — Resend email + Supabase email save
- `app/report/[id]/page.tsx` — server component report page

**Supabase `attempts` table columns:**
`id, created_at, email, answers, score_lesen, score_sprachbausteine, score_hoeren, score_schreiben, score_sprechen, writing_text, writing_evaluation, speaking_transcript, speaking_evaluation`

---

### Phase 6: Polish + Launch — PENDING (next)

- [ ] Mobile responsiveness
- [ ] Error handling + loading states
- [ ] Landing page copy/design polish
- [ ] Full end-to-end test with real data (all 5 sections)
- [ ] Test with 3-5 real users
- [ ] Launch

---

## Tech Notes

- **Framework:** Next.js 16.2.2, App Router, no `src/` directory — files live in `app/`
- **Styling:** Tailwind v4 — uses `@import "tailwindcss"` syntax (not v3 config)
- **Auth:** No user auth — attempts tracked by UUID, email captured at end of test
- **AI eval:** Claude Haiku (`claude-haiku-4-5-20251001`) via Anthropic SDK for writing + speaking scoring
- **Transcription:** OpenAI Whisper (`whisper-1`) for speaking → text
- **Email:** Resend with `onboarding@resend.dev` sender (no domain verification needed for testing)
- **Supabase table:** `attempts` — one row per test session, JSONB for answers/evals; created via SQL Editor
- **Git auth:** PAT embedded in remote URL (already configured) — do NOT reset remote URL
- **Vercel:** Auto-deploys on every push to `main`
- **Dev panel:** Jump-to-section panel in `/test` guarded by `process.env.NODE_ENV === 'development'` — invisible on Vercel
- **Report page:** Next.js 16 async params pattern — `params: Promise<{ id: string }>` with `await params`
- **Private hobby project** — not connected to any other product or platform
