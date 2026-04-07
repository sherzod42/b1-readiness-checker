# B1 Readiness Checker — Setup Plan

## Context
Building a TELC B1 German exam readiness checker web app. User wants step-by-step guided setup following `B1-Checker-Setup-Checklist.md`. This plan tracks progress through the 13-step checklist.

## Current Environment Status
- Git: ✅ installed (v2.50.1)
- Node.js / npm: ❌ NOT installed → start here
- Project folder: /Users/sherzod/Documents/Claude Cowork/B1 Telc Readiness Exam MVP/

## Setup Steps (from checklist)

- [ ] **Step 1:** Install Node.js (LTS v20 or v22) → https://nodejs.org
- [ ] **Step 2:** Git ✅ already installed
- [ ] **Step 3:** Create GitHub account + repo `b1-readiness-checker` (public)
- [ ] **Step 4:** Create Vercel account (sign up with GitHub)
- [ ] **Step 5:** Create Supabase project `b1-checker` — collect Project URL, anon key, service_role key
- [ ] **Step 6:** Get API keys — OpenAI (Whisper), Anthropic (Claude), Resend
- [ ] **Step 7:** Scaffold project with `npx create-next-app@latest b1-readiness-checker`
  - TypeScript: Yes, ESLint: Yes, Tailwind: Yes, src/ dir: Yes, App Router: Yes, Import alias: default
- [ ] **Step 8:** Install dependencies: `@supabase/supabase-js resend openai` + shadcn/ui
- [ ] **Step 9:** Create `.env.local` with all API keys
- [ ] **Step 10:** `git init` + push to GitHub
- [ ] **Step 11:** Deploy to Vercel (import repo, add env vars, deploy)
- [ ] **Step 12:** Create `attempts` table in Supabase SQL Editor
- [ ] **Step 13:** Run `npm run dev`, verify localhost:3000, test first Claude prompt

## Approach
- Guide user through each step interactively
- Verify each step completed before moving to the next
- Run verification commands after each install/config step
- After setup complete → begin Phase 1 of MVP implementation (skeleton)

## Critical Files (post-setup)
- `b1-readiness-checker/src/app/page.tsx` — landing page
- `b1-readiness-checker/.env.local` — all API keys
- `b1-readiness-checker/src/app/api/` — API routes (transcribe, evaluate, send-report)
- Supabase: `attempts` table schema in `B1-Readiness-Checker-MVP-Plan.md` section 5
