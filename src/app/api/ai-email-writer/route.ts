import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

interface EmailResponse {
  subject: string
  body: string
  signature: string
  rewritten?: string
}

// POST - Generate Cold Email
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    const reqBody = await request.json()
    const { prompt, formal = false, rewriteOnly = false } = reqBody

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt ist erforderlich' },
        { status: 400 }
      )
    }

    // Wenn nur Text umgeschrieben werden soll
    if (rewriteOnly) {
      const rewritten = rewriteText(prompt, formal)
      return NextResponse.json({ rewritten })
    }

    // TODO: Hier später OpenAI/Claude API Integration
    // Für jetzt: Template-basierte Response
    const email = generateEmail(prompt, formal)

    return NextResponse.json(email)
  } catch (error) {
    console.error('Fehler beim Generieren der E-Mail:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

function generateEmail(prompt: string, formal: boolean): EmailResponse {
  // Extrahiere Infos aus dem Prompt
  const greeting = formal ? 'Sehr geehrte/r' : 'Hi'
  const closing = formal ? 'Mit freundlichen Grüßen' : 'Beste Grüße'
  const youForm = formal ? 'Sie' : 'du'
  const yourForm = formal ? 'Ihr' : 'dein'

  // Simple Subject basierend auf Prompt
  const subject = generateSubject(prompt)

  // Body generieren
  const body = `${greeting} [Name],

${formal ? 'ich' : 'Ich'} hoffe, diese Nachricht erreicht ${youForm} gut.

${prompt}

Hätten ${youForm} Zeit für ein kurzes Gespräch diese Woche? ${formal ? 'Ich würde Ihnen' : 'Ich würde dir'} gerne zeigen, wie das konkret aussehen könnte.

Falls ${yourForm} Timing gerade nicht passt, kein Problem – lass es mich einfach wissen.`

  const signature = `${closing},
[Dein Name]
[Deine Position]

[email@beispiel.de]
[+49 123 456789]`

  return { subject, body, signature }
}

function generateSubject(prompt: string): string {
  // Versuche einen relevanten Betreff aus dem Prompt zu extrahieren
  const words = prompt.split(' ').slice(0, 5).join(' ')

  const subjects = [
    `Kurze Frage`,
    `Idee für ${words.slice(0, 30)}...`,
    `Zusammenarbeit?`,
    `Schnelle Frage zu ${words.slice(0, 20)}...`
  ]

  return subjects[Math.floor(Math.random() * subjects.length)]
}

function rewriteText(text: string, formal: boolean): string {
  // Extrahiere den eigentlichen Text aus dem Prompt
  const match = text.match(/"([^"]+)"/)
  const originalText = match ? match[1] : text

  // Einfaches Umschreiben - in Zukunft durch AI ersetzen
  const variations = [
    originalText,
    `${originalText} Ich bin überzeugt, dass wir hier einen echten Mehrwert schaffen können.`,
    `Kurz gesagt: ${originalText}`,
    `Um es direkt zu sagen - ${originalText.toLowerCase()}`
  ]

  let result = variations[Math.floor(Math.random() * variations.length)]

  // Formalität anpassen
  if (formal) {
    result = result
      .replace(/\bdu\b/gi, 'Sie')
      .replace(/\bdein\b/gi, 'Ihr')
      .replace(/\bdeine\b/gi, 'Ihre')
  } else {
    result = result
      .replace(/\bSie\b/g, 'du')
      .replace(/\bIhr\b/g, 'dein')
      .replace(/\bIhre\b/g, 'deine')
  }

  return result
}
