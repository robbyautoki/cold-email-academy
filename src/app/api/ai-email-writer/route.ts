import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

type FrameworkType =
  | 'quick-question'
  | 'third-party'
  | 'pas'
  | 'aida'
  | 'straight-business'
  | 'paint-picture'
  | 'something-useful'

interface EmailResponse {
  subject: string
  body: string
  signature: string
  framework: string
  rewritten?: string
}

const frameworkNames: Record<FrameworkType, string> = {
  'quick-question': 'Quick Question',
  'third-party': 'Third-Party Connection',
  'pas': 'PAS (Problem-Agitate-Solve)',
  'aida': 'AIDA',
  'straight-business': 'Straight to Business',
  'paint-picture': 'Paint a Picture',
  'something-useful': 'Something Useful'
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

    // Framework erkennen und E-Mail generieren
    const framework = detectFramework(prompt)
    const email = generateEmailByFramework(prompt, formal, framework)

    return NextResponse.json(email)
  } catch (error) {
    console.error('Fehler beim Generieren der E-Mail:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

// Framework basierend auf Prompt-Inhalt erkennen
function detectFramework(prompt: string): FrameworkType {
  const lower = prompt.toLowerCase()

  // Quick Question - unsicher über Ansprechpartner
  if (
    lower.includes('wer ist zuständig') ||
    lower.includes('richtiger ansprechpartner') ||
    lower.includes('wer entscheidet') ||
    lower.includes('kontaktperson') ||
    lower.includes('verantwortlich')
  ) {
    return 'quick-question'
  }

  // Third-Party - über Mitarbeiter erreichen
  if (
    (lower.includes('über') && lower.includes('erreichen')) ||
    lower.includes('linkedin') ||
    lower.includes('profil gefunden') ||
    lower.includes('mitarbeiter')
  ) {
    return 'third-party'
  }

  // PAS - Problem erkannt
  if (
    lower.includes('problem') ||
    lower.includes('schlechte bewertungen') ||
    lower.includes('negative') ||
    lower.includes('frustrier') ||
    lower.includes('schwierigkeiten') ||
    lower.includes('herausforderung')
  ) {
    return 'pas'
  }

  // AIDA - Daten/Zahlen vorhanden
  if (
    lower.match(/\d+\s*%/) ||
    lower.includes('ergebnis') ||
    lower.includes('case study') ||
    lower.includes('erfolg') ||
    lower.includes('gesteigert') ||
    lower.includes('verdoppelt')
  ) {
    return 'aida'
  }

  // Something Useful - Beziehungsaufbau
  if (
    lower.includes('artikel') ||
    lower.includes('post') ||
    lower.includes('beitrag') ||
    lower.includes('podcast') ||
    lower.includes('video') ||
    lower.includes('interessant')
  ) {
    return 'something-useful'
  }

  // Paint a Picture - Visualisierung
  if (
    lower.includes('stell dir vor') ||
    lower.includes('imagine') ||
    lower.includes('vision') ||
    lower.includes('wäre es nicht') ||
    lower.includes('traum')
  ) {
    return 'paint-picture'
  }

  // Default: Straight to Business
  return 'straight-business'
}

// E-Mail nach Framework generieren
function generateEmailByFramework(
  prompt: string,
  formal: boolean,
  framework: FrameworkType
): EmailResponse {
  const you = formal ? 'Sie' : 'du'
  const your = formal ? 'Ihr' : 'dein'
  const youHave = formal ? 'haben Sie' : 'hast du'
  const greeting = formal ? 'Guten Tag' : 'Hi'
  const closing = formal ? 'Mit freundlichen Grüßen' : 'Beste Grüße'

  let subject = ''
  let body = ''

  switch (framework) {
    case 'quick-question':
      subject = 'Kurze Frage'
      body = `${greeting} [Name],

mein Name ist [Dein Name] und ich vertrete [Dein Unternehmen].

${prompt}

Könnten ${you} mir sagen, wer in ${formal ? 'Ihrem' : 'eurem'} Unternehmen für diesen Bereich zuständig ist und wie ich diese Person am besten erreichen kann?

Vielen Dank im Voraus für ${your}e Hilfe.`
      break

    case 'third-party':
      subject = 'Könnten Sie mir weiterhelfen?'
      body = `${greeting} [Name],

ich bin auf ${your} Profil gestoßen und hoffe, ${you} ${formal ? 'können' : 'kannst'} mir kurz weiterhelfen.

${prompt}

Wer wäre die richtige Person, um diese Möglichkeit zu besprechen, und wie kann ich sie am besten erreichen?

Ich schätze ${your}e Zeit sehr.`
      break

    case 'pas':
      subject = 'Lösung für [Problem]'
      body = `${greeting} [Name],

${prompt}

Das kann unglaublich frustrierend sein – verlorene Kunden, ineffiziente Prozesse und unnötige Kosten.

Ich habe eine Lösung, die genau dieses Problem adressiert und ${formal ? 'Ihnen' : 'dir'} helfen kann, das zu ändern.

${formal ? 'Hätten Sie' : 'Hättest du'} Interesse zu erfahren, wie das konkret funktioniert?`
      break

    case 'aida':
      subject = 'Was wäre, wenn...'
      body = `${greeting} [Name],

was wäre, wenn ${you} [Problem] in den nächsten 30 Tagen lösen ${formal ? 'könnten' : 'könntest'}?

${prompt}

Zusätzlich konnten wir die Effizienz steigern, Kosten senken und die Kundenzufriedenheit deutlich verbessern.

${youHave} diese Woche Zeit für ein kurzes Gespräch, um zu sehen, ob das auch für ${you} funktionieren könnte?`
      break

    case 'straight-business':
      subject = 'Direkte Anfrage'
      body = `${greeting} [Name],

${prompt}

Wir haben Unternehmen wie ${formal ? 'Ihrem' : 'deinem'} bereits geholfen, messbare Ergebnisse zu erzielen – und das in weniger als einem Jahr.

Alles was wir gemacht haben: Eine effiziente Lösung implementiert, die sofort funktioniert.

${youHave} diese Woche Zeit für ein kurzes Gespräch?`
      break

    case 'paint-picture':
      subject = 'Stell dir vor...'
      body = `${greeting} [Name],

nichts ist frustrierender als [Pain Point].

Stell ${you} ${formal ? 'sich' : 'dir'} eine Welt vor, in der all das kein Problem mehr ist. ${prompt}

Genau das ermöglichen wir.

${youHave} Zeit für eine kurze Demo, um zu sehen, wie das funktioniert?`
      break

    case 'something-useful':
      subject = 'Dein Beitrag zu [Thema]'
      body = `${greeting} [Name],

ich bin auf ${your}en Beitrag zu [Thema] gestoßen und fand ${your}e Punkte wirklich treffend!

${prompt}

Ich dachte, das könnte ${you} auch interessieren: [Relevante Ressource]

Würde mich freuen, ${formal ? 'Ihre' : 'deine'} Gedanken dazu zu hören.`
      break
  }

  const signature = `${closing},
[Dein Name]
[Deine Position]

[email@beispiel.de]
[+49 123 456789]`

  return {
    subject,
    body,
    signature,
    framework: frameworkNames[framework]
  }
}

function rewriteText(text: string, formal: boolean): string {
  const match = text.match(/"([^"]+)"/)
  const originalText = match ? match[1] : text

  const variations = [
    originalText,
    `${originalText} Ich bin überzeugt, dass wir hier einen echten Mehrwert schaffen können.`,
    `Kurz gesagt: ${originalText}`,
    `Um es direkt zu sagen - ${originalText.toLowerCase()}`
  ]

  let result = variations[Math.floor(Math.random() * variations.length)]

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
