import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

interface EmailResponse {
  subject: string
  body: string
  signature: string
}

type StyleType = 'direct' | 'professional' | 'personal' | 'aida'
type CTAType = 'call' | 'demo' | 'reply' | 'link'
type LengthType = 'short' | 'medium' | 'long'

// Style Templates
const styleTemplates: Record<StyleType, {
  greeting: string
  closing: string
  structure: string
  tone: string
}> = {
  direct: {
    greeting: 'Hi',
    closing: 'Kurz und knapp',
    structure: 'straight-to-point',
    tone: 'direkt und klar'
  },
  professional: {
    greeting: 'Sehr geehrte/r',
    closing: 'Mit freundlichen Grüßen',
    structure: 'formal',
    tone: 'professionell und respektvoll'
  },
  personal: {
    greeting: 'Hey',
    closing: 'Liebe Grüße',
    structure: 'conversational',
    tone: 'warm und persönlich'
  },
  aida: {
    greeting: 'Hallo',
    closing: 'Gespannt auf deine Antwort',
    structure: 'attention-interest-desire-action',
    tone: 'überzeugend und fesselnd'
  }
}

// CTA Templates
const ctaTemplates: Record<CTAType, string> = {
  call: 'Hast du diese Woche 15 Minuten für einen kurzen Call? Ich würde dir gerne zeigen, wie das konkret aussehen könnte.',
  demo: 'Darf ich dir eine kurze Demo zeigen? Dauert nur 10 Minuten und du siehst sofort, ob es für dich passt.',
  reply: 'Was denkst du? Ich freue mich auf deine Rückmeldung.',
  link: 'Schau dir gerne mal [unsere Seite/Case Study/Video] an – ich bin gespannt auf dein Feedback.'
}

// Social Proof Examples
const socialProofExamples = [
  'P.S. Wir haben bereits über 50 Unternehmen aus deiner Branche dabei geholfen, ihre Ergebnisse um durchschnittlich 40% zu steigern.',
  'P.S. Letzte Woche hat einer meiner Kunden gesagt: "Das war die beste Investition, die wir je gemacht haben."',
  'P.S. Fun Fact: 87% unserer Kunden empfehlen uns weiter. Ich würde dir gerne zeigen, warum.',
  'P.S. Ein ähnliches Unternehmen wie deines konnte mit unserer Hilfe in nur 3 Monaten [konkretes Ergebnis] erreichen.'
]

// POST - Generate Cold Email
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    const reqBody = await request.json()
    const {
      targetAudience,
      context,
      style = 'professional',
      cta = 'call',
      length = 'medium',
      includeSocialProof = false
    } = reqBody

    if (!targetAudience || !context) {
      return NextResponse.json(
        { error: 'Zielgruppe und Kontext sind erforderlich' },
        { status: 400 }
      )
    }

    // TODO: Hier später OpenAI/Claude API Integration
    // Für jetzt: Intelligente Template-basierte Response

    const email = generateEmail(
      targetAudience,
      context,
      style as StyleType,
      cta as CTAType,
      length as LengthType,
      includeSocialProof
    )

    return NextResponse.json(email)
  } catch (error) {
    console.error('Fehler beim Generieren der E-Mail:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

function generateEmail(
  targetAudience: string,
  context: string,
  style: StyleType,
  cta: CTAType,
  length: LengthType,
  includeSocialProof: boolean
): EmailResponse {
  const styleConfig = styleTemplates[style] || styleTemplates.professional
  const ctaText = ctaTemplates[cta] || ctaTemplates.call
  const socialProof = includeSocialProof
    ? socialProofExamples[Math.floor(Math.random() * socialProofExamples.length)]
    : ''

  // Subject Lines basierend auf Style
  const subjectLines: Record<StyleType, string[]> = {
    direct: [
      `Kurze Frage, ${targetAudience}`,
      `${targetAudience} - schnelle Idee für dich`,
      `Hey ${targetAudience} - 2 Minuten?`
    ],
    professional: [
      `Geschäftliche Anfrage: Zusammenarbeit mit ${targetAudience}`,
      `Vorstellung: Mehrwert für ${targetAudience}`,
      `Strategische Partnerschaft für ${targetAudience}`
    ],
    personal: [
      `Hey! Kurz connecten als ${targetAudience}?`,
      `Von einem Fan deiner Arbeit, ${targetAudience}`,
      `Dachte an dich, ${targetAudience}`
    ],
    aida: [
      `${targetAudience}: Das übersehen 90% deiner Konkurrenz`,
      `Wie ${targetAudience} ihre Ergebnisse verdoppeln`,
      `Die eine Sache, die top ${targetAudience} anders machen`
    ]
  }

  const subject = subjectLines[style][Math.floor(Math.random() * subjectLines[style].length)]

  // Body generieren basierend auf Style und Length
  let body = ''

  if (style === 'direct') {
    body = generateDirectEmail(targetAudience, context, ctaText, length)
  } else if (style === 'professional') {
    body = generateProfessionalEmail(targetAudience, context, ctaText, length, styleConfig)
  } else if (style === 'personal') {
    body = generatePersonalEmail(targetAudience, context, ctaText, length)
  } else if (style === 'aida') {
    body = generateAIDAEmail(targetAudience, context, ctaText, length)
  }

  // Social Proof hinzufügen
  if (socialProof) {
    body += `\n\n${socialProof}`
  }

  // Signature generieren
  const signature = generateSignature(styleConfig.closing)

  return { subject, body, signature }
}

function generateDirectEmail(
  targetAudience: string,
  context: string,
  cta: string,
  length: LengthType
): string {
  const intro = `Hi,\n\nich sehe, dass du als ${targetAudience} arbeitest.`

  if (length === 'short') {
    return `${intro}\n\n${context}\n\n${cta}`
  }

  if (length === 'medium') {
    return `${intro}\n\nKurz und knapp:\n${context}\n\nKein Bullshit, kein Zeitverschwendung.\n\n${cta}`
  }

  return `${intro}\n\nIch halte mich kurz:\n\n${context}\n\nWarum ich dir schreibe? Weil ich denke, dass wir beide davon profitieren können. Kein Schnickschnack, keine endlosen Meetings.\n\n${cta}\n\nFalls nicht interessant, auch kein Problem – ein kurzes "Nein danke" reicht völlig.`
}

function generateProfessionalEmail(
  targetAudience: string,
  context: string,
  cta: string,
  length: LengthType,
  styleConfig: typeof styleTemplates.professional
): string {
  const intro = `${styleConfig.greeting} [Name],\n\nmit großem Interesse habe ich Ihre Arbeit als ${targetAudience} verfolgt.`

  if (length === 'short') {
    return `${intro}\n\n${context}\n\n${cta}`
  }

  if (length === 'medium') {
    return `${intro}\n\nIch wende mich an Sie, da ich überzeugt bin, dass eine Zusammenarbeit für beide Seiten wertvoll sein könnte.\n\n${context}\n\n${cta}\n\nIch freue mich auf Ihre Rückmeldung.`
  }

  return `${intro}\n\nGerne möchte ich die Gelegenheit nutzen, mich und mein Unternehmen kurz vorzustellen.\n\n${context}\n\nWir haben bereits zahlreichen Unternehmen in Ihrer Branche dabei geholfen, messbare Ergebnisse zu erzielen. Ich bin überzeugt, dass wir auch für Sie einen echten Mehrwert schaffen können.\n\n${cta}\n\nSollten Sie aktuell keine Kapazitäten haben, verstehe ich das selbstverständlich. Ich würde mich dennoch freuen, in Kontakt zu bleiben.`
}

function generatePersonalEmail(
  targetAudience: string,
  context: string,
  cta: string,
  length: LengthType
): string {
  const intro = `Hey!\n\nIch hoffe, du hattest einen guten Start in die Woche!`

  if (length === 'short') {
    return `${intro}\n\nAls ${targetAudience} dachte ich, das könnte dich interessieren:\n\n${context}\n\n${cta}`
  }

  if (length === 'medium') {
    return `${intro}\n\nIch bin über dein Profil gestolpert und fand deine Arbeit als ${targetAudience} echt spannend.\n\n${context}\n\nIch würde mich mega freuen, wenn wir uns mal austauschen könnten!\n\n${cta}`
  }

  return `${intro}\n\nOkay, ich geb's zu – ich hab ein bisschen gestalkt (auf die professionelle Art natürlich 😄). Als ${targetAudience} machst du echt coole Sachen!\n\n${context}\n\nIch hab das Gefühl, wir könnten gut zusammenpassen. Nicht im Dating-Sinne, aber du weißt was ich meine 😉\n\n${cta}\n\nKein Druck übrigens – wenn's gerade nicht passt, versteh ich das total. Aber ich würde mich echt freuen!`
}

function generateAIDAEmail(
  targetAudience: string,
  context: string,
  cta: string,
  length: LengthType
): string {
  // AIDA: Attention - Interest - Desire - Action

  const attention = `Hallo,\n\nWusstest du, dass 73% aller ${targetAudience} diesen einen Fehler machen?`

  if (length === 'short') {
    return `${attention}\n\n${context}\n\n${cta}`
  }

  const interest = `Ich spreche aus Erfahrung – wir haben mit über 50 ${targetAudience} zusammengearbeitet und immer wieder dasselbe Muster gesehen.`

  const desire = `Stell dir vor, du könntest in den nächsten 30 Tagen deine Ergebnisse verdoppeln – ohne mehr Zeit zu investieren. Klingt zu gut um wahr zu sein? Das dachten unsere Kunden auch, bis sie es selbst erlebt haben.`

  if (length === 'medium') {
    return `${attention}\n\n${interest}\n\n${context}\n\n${cta}`
  }

  return `${attention}\n\n${interest}\n\n${context}\n\n${desire}\n\nDas Beste daran? Du musst nichts riskieren. Wenn es nicht funktioniert, hast du nur 15 Minuten deiner Zeit investiert. Wenn es funktioniert, könnte es alles verändern.\n\n${cta}\n\nDie Frage ist nicht, ob du es dir leisten kannst – die Frage ist, ob du es dir leisten kannst, es nicht zu versuchen.`
}

function generateSignature(closing: string): string {
  return `${closing},
[Dein Name]
[Deine Position] bei [Dein Unternehmen]

📧 [email@beispiel.de]
📱 [+49 123 456789]
🔗 [calendly.com/dein-link]
💼 [linkedin.com/in/dein-profil]`
}
