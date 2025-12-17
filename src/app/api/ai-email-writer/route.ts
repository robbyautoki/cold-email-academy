import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// POST - Generate Cold Email
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    const body = await request.json()
    const { targetAudience, context } = body

    if (!targetAudience || !context) {
      return NextResponse.json(
        { error: 'Zielgruppe und Kontext sind erforderlich' },
        { status: 400 }
      )
    }

    // TODO: Hier später OpenAI/Claude API Integration
    // Für jetzt: Placeholder Response mit Template

    const email = generatePlaceholderEmail(targetAudience, context)

    return NextResponse.json({ email })
  } catch (error) {
    console.error('Fehler beim Generieren der E-Mail:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

function generatePlaceholderEmail(targetAudience: string, context: string): string {
  return `Betreff: Kurze Frage zu [Thema]

Hallo [Name],

ich hoffe, diese E-Mail erreicht dich gut.

Ich habe gesehen, dass du als ${targetAudience} tätig bist, und wollte mich kurz vorstellen.

${context}

Wäre es möglich, diese Woche einen kurzen 15-minütigen Call zu vereinbaren? Ich würde dir gerne zeigen, wie wir [Unternehmen wie deines] dabei helfen können, [konkreter Nutzen].

Hier ist mein Calendly-Link: [LINK]

Falls das Timing gerade nicht passt, kein Problem – lass es mich einfach wissen.

Beste Grüße,
[Dein Name]

P.S. [Optionaler Social Proof oder relevante Statistik]

---
Diese E-Mail wurde mit dem AI E-Mail Writer generiert.
Bitte personalisiere sie vor dem Versand!`
}
