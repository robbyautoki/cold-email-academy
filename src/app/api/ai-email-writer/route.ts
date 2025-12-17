import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

interface EmailResponse {
  subject: string
  body: string
  signature: string
}

// POST - Generate Cold Email
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    const reqBody = await request.json()
    const { targetAudience, context, tone = 'professional' } = reqBody

    if (!targetAudience || !context) {
      return NextResponse.json(
        { error: 'Zielgruppe und Kontext sind erforderlich' },
        { status: 400 }
      )
    }

    // TODO: Hier später OpenAI/Claude API Integration
    // Für jetzt: Placeholder Response mit Template

    const email = generatePlaceholderEmail(targetAudience, context, tone)

    return NextResponse.json(email)
  } catch (error) {
    console.error('Fehler beim Generieren der E-Mail:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

function generatePlaceholderEmail(
  targetAudience: string,
  context: string,
  tone: string
): EmailResponse {
  // Ton-spezifische Anpassungen
  const toneStyles: Record<string, { greeting: string; closing: string; style: string }> = {
    professional: {
      greeting: 'Sehr geehrte/r',
      closing: 'Mit freundlichen Grüßen',
      style: 'formell'
    },
    casual: {
      greeting: 'Hey',
      closing: 'Viele Grüße',
      style: 'locker'
    },
    direct: {
      greeting: 'Hi',
      closing: 'Beste Grüße',
      style: 'direkt'
    },
    curious: {
      greeting: 'Hallo',
      closing: 'Gespannt auf deine Antwort',
      style: 'neugierig'
    }
  }

  const style = toneStyles[tone] || toneStyles.professional

  return {
    subject: `Kurze Frage an ${targetAudience}`,
    body: `${style.greeting} [Name],

ich habe gesehen, dass du als ${targetAudience} tätig bist, und wollte mich kurz vorstellen.

${context}

Wäre es möglich, diese Woche einen kurzen 15-minütigen Call zu vereinbaren? Ich würde dir gerne zeigen, wie wir Unternehmen wie deines dabei helfen können, [konkreter Nutzen zu erreichen].

Falls das Timing gerade nicht passt, kein Problem – lass es mich einfach wissen.

P.S. [Optionaler Social Proof oder relevante Statistik]`,
    signature: `${style.closing},
[Dein Name]
[Deine Position]
[Dein Unternehmen]

📧 [email@beispiel.de]
📱 [+49 123 456789]
🔗 [calendly.com/dein-link]`
  }
}
