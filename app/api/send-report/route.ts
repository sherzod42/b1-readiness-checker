import { createServiceClient } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json() as { attemptId: string; email: string }
    const { attemptId, email } = body

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }
    if (!attemptId) {
      return Response.json({ error: 'Fehlende attemptId.' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Save email to the attempt row
    await supabase.from('attempts').update({ email }).eq('id', attemptId)

    // Fetch scores
    const { data: attempt } = await supabase
      .from('attempts')
      .select('score_lesen, score_sprachbausteine, score_hoeren, score_schreiben, score_sprechen')
      .eq('id', attemptId)
      .single()

    if (!attempt) {
      return Response.json({ error: 'Versuch nicht gefunden.' }, { status: 404 })
    }

    // Compute percentages
    const lesenPct = Math.round(((attempt.score_lesen ?? 0) / 5) * 100)
    const sprachPct = Math.round(((attempt.score_sprachbausteine ?? 0) / 6) * 100)
    const hoerenPct = Math.round(((attempt.score_hoeren ?? 0) / 4) * 100)
    const schreibenPct = attempt.score_schreiben ?? 0
    const sprechenPct = attempt.score_sprechen ?? 0
    const overall = Math.round((lesenPct + sprachPct + hoerenPct + schreibenPct + sprechenPct) / 5)

    const readinessLabel =
      overall >= 75 ? 'Bereit' : overall >= 55 ? 'Fast bereit' : 'Mehr Übung nötig'

    // Send email — wrapped in try/catch so email failure doesn't block report access
    try {
      await resend.emails.send({
        from: 'B1 Readiness Checker <onboarding@resend.dev>',
        to: email,
        subject: `Ihr B1-Testergebnis: ${overall}% — ${readinessLabel}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <h1 style="font-size: 24px; color: #111;">Ihr B1 Readiness Bericht</h1>
            <p style="color: #555;">Hier ist eine Zusammenfassung Ihrer Ergebnisse:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
              <tr><td style="padding: 8px 0; color: #555;">Lesen</td><td style="text-align: right; font-weight: bold;">${lesenPct}%</td></tr>
              <tr><td style="padding: 8px 0; color: #555;">Sprachbausteine</td><td style="text-align: right; font-weight: bold;">${sprachPct}%</td></tr>
              <tr><td style="padding: 8px 0; color: #555;">Hören</td><td style="text-align: right; font-weight: bold;">${hoerenPct}%</td></tr>
              <tr><td style="padding: 8px 0; color: #555;">Schreiben</td><td style="text-align: right; font-weight: bold;">${schreibenPct}%</td></tr>
              <tr><td style="padding: 8px 0; color: #555;">Sprechen</td><td style="text-align: right; font-weight: bold;">${sprechenPct}%</td></tr>
              <tr style="border-top: 2px solid #111;"><td style="padding: 12px 0; font-weight: bold;">Gesamt</td><td style="text-align: right; font-weight: bold; font-size: 18px;">${overall}%</td></tr>
            </table>
            <a href="https://b1-readiness-checker.vercel.app/report/${attemptId}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Vollständigen Bericht ansehen →</a>
            <p style="color: #888; font-size: 12px; margin-top: 32px;">B1 Readiness Checker</p>
          </div>
        `,
      })
    } catch (emailErr) {
      // Email failure is non-blocking — the email was saved, report is still accessible
      console.error('Resend error:', emailErr)
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('send-report error:', err)
    return Response.json({ error: 'Interner Serverfehler.' }, { status: 500 })
  }
}
