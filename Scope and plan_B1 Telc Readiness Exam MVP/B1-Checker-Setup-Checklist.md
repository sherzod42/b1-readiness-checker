# B1 Readiness Checker — Local Setup Checklist

Follow these steps in order. Each one should take 5-10 minutes.

---

## Step 1: Install Node.js

You need Node.js to run Next.js. Check if you already have it:

```bash
node --version
```

If it shows `v18` or higher, you're good. If not:
- Go to https://nodejs.org
- Download the **LTS version** (v20 or v22)
- Install it, then restart your terminal and verify with `node --version`

---

## Step 2: Install Git (if not already)

```bash
git --version
```

If it's not installed:
- **Mac:** It'll prompt you to install Xcode Command Line Tools — say yes
- **Windows:** Download from https://git-scm.com

---

## Step 3: Create a GitHub account + repo

1. Go to https://github.com and sign up (or log in)
2. Create a new repository called `b1-readiness-checker`
3. Set it to **Public** (needed for free Vercel deploys)
4. Don't add a README yet — we'll push from local

---

## Step 4: Set up your Vercel account

1. Go to https://vercel.com
2. Sign up with your GitHub account (this links them automatically)
3. That's it for now — we'll connect the repo later

---

## Step 5: Set up Supabase

1. Go to https://supabase.com and sign up (GitHub login works)
2. Click **New Project**
3. Name it `b1-checker`, pick a strong DB password, choose the region closest to your users (EU if targeting German learners)
4. Once created, go to **Settings → API** and note down:
   - `Project URL` (looks like `https://xxxxx.supabase.co`)
   - `anon public` key
   - `service_role` key (keep this secret — only for server-side)

---

## Step 6: Get your API keys

### OpenAI (for Whisper speech-to-text)
1. Go to https://platform.openai.com
2. Sign up or log in
3. Go to **API Keys** → Create a new key
4. Add $5 credits (prepaid — you'll use maybe $2/month)
5. Save the key somewhere safe

### Anthropic (for Claude — writing/speaking evaluation)
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Go to **API Keys** → Create a new key
4. Add $5 credits
5. Save the key somewhere safe

### Resend (for sending emails)
1. Go to https://resend.com and sign up
2. Go to **API Keys** → Create a key
3. Free tier = 100 emails/day (plenty for MVP)
4. You'll also need to verify a domain later, but for testing you can send from `onboarding@resend.dev`

---

## Step 7: Scaffold the project

Open your terminal (or VS Code terminal) and run:

```bash
npx create-next-app@latest b1-readiness-checker
```

When prompted, choose:
- **TypeScript?** → Yes
- **ESLint?** → Yes
- **Tailwind CSS?** → Yes
- **`src/` directory?** → Yes
- **App Router?** → Yes
- **Import alias?** → Keep default (@/*)

Then:

```bash
cd b1-readiness-checker
```

---

## Step 8: Install dependencies

```bash
npm install @supabase/supabase-js resend openai
```

Optional but recommended (UI components):

```bash
npx shadcn@latest init
```

When prompted, pick the defaults. Then add components as needed:

```bash
npx shadcn@latest add button card input progress
```

---

## Step 9: Set up environment variables

Create a file called `.env.local` in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI (Whisper)
OPENAI_API_KEY=sk-your-openai-key

# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# Resend
RESEND_API_KEY=re_your-resend-key
```

**Important:** This file is auto-ignored by `.gitignore` (Next.js does this by default). Never commit API keys.

---

## Step 10: Connect Git + push to GitHub

```bash
git init
git add .
git commit -m "initial scaffold"
git remote add origin https://github.com/YOUR_USERNAME/b1-readiness-checker.git
git branch -M main
git push -u origin main
```

---

## Step 11: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your `b1-readiness-checker` GitHub repo
3. Add your environment variables (same ones from `.env.local` — paste each one)
4. Click **Deploy**
5. In ~60 seconds you'll have a live URL like `b1-readiness-checker.vercel.app`

**Bookmark this URL.** Every time you push to `main`, Vercel auto-deploys.

---

## Step 12: Create the Supabase table

Go to your Supabase dashboard → **SQL Editor** → paste and run:

```sql
CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  email TEXT,
  status TEXT DEFAULT 'in_progress',

  score_lesen INT,
  score_sprachbausteine INT,
  score_hoeren INT,
  score_schreiben INT,
  score_sprechen INT,
  score_overall INT,

  answers JSONB,
  writing_text TEXT,
  speaking_transcript TEXT,
  speaking_audio_url TEXT,

  writing_evaluation JSONB,
  speaking_evaluation JSONB,
  study_plan JSONB
);

-- Enable Row Level Security (required by Supabase)
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the client (anon key)
CREATE POLICY "Allow anonymous inserts"
  ON attempts FOR INSERT
  WITH CHECK (true);

-- Allow reading own attempt by ID (for the report page)
CREATE POLICY "Allow reading by ID"
  ON attempts FOR SELECT
  USING (true);
```

---

## Step 13: Verify everything works

Open VS Code, open the project folder, and run:

```bash
npm run dev
```

Visit `http://localhost:3000` — you should see the Next.js starter page.

Now open the Claude extension in VS Code and try your first prompt:

> "Replace the default Next.js home page with a simple landing page that says 'B1 Readiness Checker — How ready are you for TELC B1? Find out in 20 minutes.' with a 'Start Test' button. Use Tailwind for styling."

If Claude writes the code, you see it update in the browser, and you can commit + push to see it deploy on Vercel — **you're ready to build.**

---

## Quick reference: your accounts

| Service | Dashboard URL | What it's for |
|---|---|---|
| GitHub | github.com | Code hosting |
| Vercel | vercel.com/dashboard | Deployment |
| Supabase | supabase.com/dashboard | Database + storage |
| OpenAI | platform.openai.com | Whisper (speech-to-text) |
| Anthropic | console.anthropic.com | Claude (AI evaluation) |
| Resend | resend.com | Email delivery |

---

*You'll spend maybe 30-45 minutes on this setup, then you're coding.*
