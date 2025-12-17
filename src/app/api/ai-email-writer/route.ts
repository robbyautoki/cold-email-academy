import { auth } from '@clerk/nextjs/server'

type FrameworkType =
  | 'quick-question'
  | 'third-party'
  | 'pas'
  | 'aida'
  | 'straight-business'
  | 'paint-picture'
  | 'something-useful'

interface StreamChunk {
  type: 'reasoning' | 'subject' | 'body' | 'signature' | 'framework' | 'suggestions' | 'question' | 'done'
  content: string | string[]
}

interface PromptAnalysis {
  hasTarget: boolean
  hasOffer: boolean
  hasNoBrainer: boolean
  target?: string
  offer?: string
  noBrainer?: string
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

const frameworkDescriptions: Record<FrameworkType, string> = {
  'quick-question': 'Ideal wenn der richtige Ansprechpartner unklar ist',
  'third-party': 'Perfekt um uber Mitarbeiter an Entscheider zu kommen',
  'pas': 'Klassiker: Problem aufzeigen, Schmerz verstärken, Losung präsentieren',
  'aida': 'Aufmerksamkeit durch konkrete Zahlen und Erfolge',
  'straight-business': 'Direkt und effizient - keine Zeit verschwenden',
  'paint-picture': 'Emotionale Ansprache durch Zukunftsvisionen',
  'something-useful': 'Beziehungsaufbau durch geteilte Inhalte'
}

// Zielgruppen-Keywords
const targetKeywords: Record<string, string[]> = {
  'Entrümpelungsdienste': ['entrümpel', 'entsorgu', 'räumung', 'haushaltsauflösung'],
  'Restaurants': ['restaurant', 'gastro', 'gaststätte', 'cafe', 'bistro', 'imbiss'],
  'Immobilienmakler': ['immobilien', 'makler', 'immobilienmakler', 'hausverwaltung'],
  'Handwerker': ['handwerk', 'dachdeck', 'elektrik', 'sanitär', 'maler', 'schreiner', 'tischler', 'klempner'],
  'Agenturen': ['agentur', 'marketing agentur', 'werbeagentur', 'kreativagentur'],
  'Software-Unternehmen': ['software', 'saas', 'app', 'tech', 'startup', 'it-'],
  'E-Commerce': ['shop', 'online-shop', 'e-commerce', 'onlineshop', 'amazon', 'ebay'],
  'Coaches': ['coach', 'coaching', 'berater', 'trainer', 'mentor'],
  'Ärzte/Praxen': ['arzt', 'praxis', 'zahnarzt', 'physiotherap', 'heilpraktiker'],
  'Anwälte': ['anwalt', 'kanzlei', 'rechtsanwalt', 'notar'],
  'Steuerberater': ['steuerberater', 'steuerkanzlei', 'buchhalter', 'buchhaltung'],
  'Fitnessstudios': ['fitness', 'gym', 'fitnessstudio', 'sport'],
  'Fotografen': ['fotograf', 'photo', 'video', 'film'],
  'Friseure': ['friseur', 'salon', 'hairstyl', 'barber'],
  'Autohäuser': ['autohaus', 'auto', 'kfz', 'werkstatt', 'fahrzeug']
}

// Angebots-Keywords
const offerKeywords: Record<string, string[]> = {
  'Google Ads': ['google ads', 'google werbung', 'sea', 'adwords', 'suchmaschinenwerbung'],
  'Facebook/Meta Ads': ['facebook ads', 'meta ads', 'instagram ads', 'social ads'],
  'SEO': ['seo', 'suchmaschinenoptimierung', 'google ranking', 'organic'],
  'Webdesign': ['webdesign', 'website', 'webseite', 'homepage', 'landingpage'],
  'Social Media Management': ['social media', 'content', 'posting', 'community'],
  'E-Mail Marketing': ['email marketing', 'newsletter', 'email kampagne'],
  'Branding': ['branding', 'marke', 'corporate design', 'logo'],
  'Videoproduktion': ['video', 'film', 'imagefilm', 'werbevideo'],
  'Buchhaltung': ['buchhaltung', 'buchführung', 'finanzen', 'rechnungswesen'],
  'Recruiting': ['recruiting', 'personal', 'mitarbeiter', 'stellenanzeigen'],
  'CRM/Software': ['crm', 'software', 'tool', 'automatisierung'],
  'Beratung': ['beratung', 'consulting', 'strategie']
}

// No-Brainer Offer Vorschläge nach Angebot
const noBrainerOffers: Record<string, string[]> = {
  'Google Ads': [
    'Kostenlose Google Ads Analyse deiner Kampagnen',
    'Gratis 30-Minuten Strategiegespräch',
    '100€ Google Ads Guthaben als Startbonus'
  ],
  'Facebook/Meta Ads': [
    'Kostenloser Ads-Account Check',
    'Gratis Zielgruppen-Analyse',
    'Erste Kampagne zum halben Preis'
  ],
  'SEO': [
    'Kostenloses SEO-Audit deiner Website',
    'Gratis Keyword-Analyse',
    'Unverbindlicher Ranking-Check'
  ],
  'Webdesign': [
    'Kostenloser Website-Check mit konkreten Verbesserungen',
    'Gratis Mockup/Konzept für deine neue Seite',
    'Unverbindliches Designkonzept'
  ],
  'Social Media Management': [
    'Kostenloser Content-Kalender für 1 Woche',
    'Gratis Profil-Optimierung',
    'Test-Monat zum reduzierten Preis'
  ],
  'E-Mail Marketing': [
    'Kostenlose E-Mail Sequenz Vorlage',
    'Gratis Deliverability-Check',
    'Erste Kampagne kostenfrei aufsetzen'
  ],
  'Beratung': [
    'Kostenloses 30-Minuten Erstgespräch',
    'Gratis Analyse deiner aktuellen Situation',
    'Unverbindliche Strategie-Empfehlung'
  ],
  'Buchhaltung': [
    'Kostenloser Finanz-Check',
    'Gratis Erstberatung',
    'Erster Monat zum Testen'
  ],
  'Recruiting': [
    'Kostenlose Stellenanzeigen-Optimierung',
    'Gratis Employer Branding Check',
    'Erste Stelle erfolgreich oder gratis'
  ],
  'default': [
    'Kostenloses Erstgespräch',
    'Unverbindliche Analyse',
    'Test-Angebot ohne Risiko'
  ]
}

// Keywords für No-Brainer Offers im Prompt
const noBrainerKeywords = [
  'kostenlos', 'gratis', 'umsonst', 'geschenkt', 'bonus',
  'test', 'probe', 'trial', 'unverbindlich', 'risikofrei',
  'erstgespräch', 'erstberatung', 'analyse'
]

// POST - Generate Cold Email with Streaming
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Nicht authentifiziert' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const reqBody = await request.json()
    const { prompt, formal = false } = reqBody

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt ist erforderlich' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Analysiere den Prompt
    const analysis = analyzePrompt(prompt)

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const sendChunk = async (chunk: StreamChunk, delay: number = 0) => {
          if (delay > 0) await sleep(delay)
          controller.enqueue(encoder.encode(JSON.stringify(chunk) + '\n'))
        }

        // Prüfe ob alle nötigen Infos vorhanden sind
        if (!analysis.hasTarget || !analysis.hasOffer) {
          // Generiere spezifische Rückfrage
          let question = 'Um eine effektive Cold Email zu schreiben, brauche ich noch ein paar Infos:\n\n'

          if (!analysis.hasTarget && !analysis.hasOffer) {
            question += '1. Wer ist deine Zielgruppe? (z.B. Restaurants, Handwerker, Immobilienmakler)\n'
            question += '2. Was bietest du an? (z.B. Google Ads, Webdesign, SEO)'
          } else if (!analysis.hasTarget) {
            question += `Du bietest ${analysis.offer} an - super!\n\n`
            question += 'Wer ist deine Zielgruppe? (z.B. Restaurants, Handwerker, Immobilienmakler)'
          } else {
            question += `Deine Zielgruppe sind ${analysis.target} - verstanden!\n\n`
            question += 'Was genau bietest du an? (z.B. Google Ads, Webdesign, SEO, Beratung)'
          }

          await sendChunk({ type: 'question', content: question })
          await sendChunk({ type: 'done', content: 'question' })
          controller.close()
          return
        }

        // Alle Infos vorhanden - generiere Email
        const framework = detectFramework(prompt)
        const email = generateEmailByFramework(analysis, formal, framework)
        const reasoning = generateReasoning(analysis, framework)
        const suggestions = generateSuggestions(analysis, formal)

        // Stream reasoning
        const reasoningChunks = chunkString(reasoning, 15)
        for (let i = 0; i < reasoningChunks.length; i++) {
          await sendChunk({ type: 'reasoning', content: reasoningChunks.slice(0, i + 1).join('') }, 50)
        }

        await sleep(300)
        await sendChunk({ type: 'framework', content: frameworkNames[framework] })
        await sleep(200)

        // Stream subject
        for (let i = 0; i <= email.subject.length; i++) {
          await sendChunk({ type: 'subject', content: email.subject.slice(0, i) }, 30)
        }

        await sleep(200)

        // Stream body word by word
        const bodyWords = email.body.split(' ')
        for (let i = 0; i <= bodyWords.length; i++) {
          await sendChunk({ type: 'body', content: bodyWords.slice(0, i).join(' ') }, 40)
        }

        await sleep(200)
        await sendChunk({ type: 'signature', content: email.signature })
        await sleep(300)
        await sendChunk({ type: 'suggestions', content: suggestions })
        await sendChunk({ type: 'done', content: 'complete' })

        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  } catch (error) {
    console.error('Fehler beim Generieren der E-Mail:', error)
    return new Response(JSON.stringify({ error: 'Serverfehler' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function chunkString(str: string, size: number): string[] {
  const chunks: string[] = []
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size))
  }
  return chunks
}

function analyzePrompt(prompt: string): PromptAnalysis {
  const lower = prompt.toLowerCase()

  let target: string | undefined
  let offer: string | undefined
  let noBrainer: string | undefined

  // Zielgruppe erkennen
  for (const [name, keywords] of Object.entries(targetKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      target = name
      break
    }
  }

  // Angebot erkennen
  for (const [name, keywords] of Object.entries(offerKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      offer = name
      break
    }
  }

  // No-Brainer erkennen
  if (noBrainerKeywords.some(kw => lower.includes(kw))) {
    // Extrahiere den No-Brainer aus dem Prompt
    const noBrainerMatch = prompt.match(/(?:kostenlos|gratis|umsonst)[^,.!?]*/i)
    if (noBrainerMatch) {
      noBrainer = noBrainerMatch[0].trim()
    }
  }

  return {
    hasTarget: !!target,
    hasOffer: !!offer,
    hasNoBrainer: !!noBrainer,
    target,
    offer,
    noBrainer
  }
}

function generateReasoning(analysis: PromptAnalysis, framework: FrameworkType): string {
  let reasoning = `Analysiere Anfrage...\n\n`
  reasoning += `Zielgruppe: ${analysis.target}\n`
  reasoning += `Angebot: ${analysis.offer}\n`

  if (analysis.noBrainer) {
    reasoning += `No-Brainer Offer: ${analysis.noBrainer}\n`
  } else {
    reasoning += `No-Brainer: Vorschläge werden generiert\n`
  }

  reasoning += `\nFramework: ${frameworkNames[framework]}\n`
  reasoning += `Grund: ${frameworkDescriptions[framework]}\n`
  reasoning += `\nGeneriere personalisierte Email ohne Platzhalter...`

  return reasoning
}

function generateSuggestions(analysis: PromptAnalysis, formal: boolean): string[] {
  const suggestions: string[] = []

  // No-Brainer Vorschläge wenn keiner angegeben
  if (!analysis.hasNoBrainer && analysis.offer) {
    const offers = noBrainerOffers[analysis.offer] || noBrainerOffers['default']
    suggestions.push(...offers.slice(0, 2).map(o => `No-Brainer: ${o}`))
  }

  // Standard Verbesserungen
  suggestions.push('Kürzer machen')
  suggestions.push('Mehr Dringlichkeit')
  suggestions.push('Social Proof hinzufügen')
  suggestions.push(formal ? 'Lockerer formulieren' : 'Formeller formulieren')

  return suggestions.slice(0, 6)
}

function detectFramework(prompt: string): FrameworkType {
  const lower = prompt.toLowerCase()

  if (
    lower.includes('wer ist zuständig') ||
    lower.includes('richtiger ansprechpartner') ||
    lower.includes('wer entscheidet')
  ) {
    return 'quick-question'
  }

  if (
    lower.includes('linkedin') ||
    lower.includes('profil gefunden') ||
    lower.includes('mitarbeiter')
  ) {
    return 'third-party'
  }

  if (
    lower.includes('problem') ||
    lower.includes('schlechte bewertungen') ||
    lower.includes('schwierigkeiten')
  ) {
    return 'pas'
  }

  if (
    lower.match(/\d+\s*%/) ||
    lower.includes('case study') ||
    lower.includes('erfolg')
  ) {
    return 'aida'
  }

  return 'straight-business'
}

function generateEmailByFramework(
  analysis: PromptAnalysis,
  formal: boolean,
  framework: FrameworkType
): { subject: string; body: string; signature: string } {
  const you = formal ? 'Sie' : 'du'
  const your = formal ? 'Ihr' : 'dein'
  const youHave = formal ? 'haben Sie' : 'hast du'
  const greeting = formal ? 'Guten Tag' : 'Hi'
  const closing = formal ? 'Mit freundlichen Grüßen' : 'Beste Grüße'

  const target = analysis.target || 'Unternehmen'
  const offer = analysis.offer || 'meine Dienstleistung'

  // No-Brainer Offer - entweder vom User oder generiert
  let noBrainer = analysis.noBrainer
  if (!noBrainer && analysis.offer) {
    const offers = noBrainerOffers[analysis.offer] || noBrainerOffers['default']
    noBrainer = offers[0]
  }

  // Generiere branchenspezifischen Nutzen
  const benefit = getBenefitForTarget(target, offer)

  let subject = ''
  let body = ''

  switch (framework) {
    case 'quick-question':
      subject = 'Kurze Frage'
      body = `${greeting} [Name],

ich arbeite mit ${target} zusammen und helfe ihnen dabei, ${benefit}.

${formal ? 'Könnten Sie' : 'Könntest du'} mir sagen, wer bei ${formal ? 'Ihnen' : 'euch'} für Marketing und Kundengewinnung zuständig ist?

Würde mich kurz vorstellen und zeigen, wie wir auch ${formal ? 'Ihrem' : 'eurem'} Unternehmen helfen können.

Vielen Dank für ${your}e Hilfe!`
      break

    case 'third-party':
      subject = formal ? 'Könnten Sie mir weiterhelfen?' : 'Könntest du mir weiterhelfen?'
      body = `${greeting} [Name],

ich bin auf ${your} Profil gestoßen und hoffe, ${you} ${formal ? 'können' : 'kannst'} mir kurz weiterhelfen.

Ich helfe ${target} dabei, ${benefit} - und ich denke, dass ${formal ? 'Ihr' : 'euer'} Unternehmen davon profitieren könnte.

Wer wäre die richtige Person, um darüber zu sprechen?

Ich schätze ${your}e Zeit sehr.`
      break

    case 'pas':
      subject = `${target}: Mehr Kunden gewinnen`
      body = `${greeting} [Name],

viele ${target} haben das gleiche Problem: zu wenig Anfragen und zu viel Konkurrenz.

Das führt zu Umsatzschwankungen und macht die Planung schwer. Kennst ${you} das?

Mit ${offer} helfe ich ${target} dabei, ${benefit}.

${noBrainer ? `Mein Angebot: ${noBrainer}` : ''}

${youHave} diese Woche 15 Minuten Zeit für ein kurzes Gespräch?`
      break

    case 'aida':
      subject = 'Was wäre, wenn...'
      body = `${greeting} [Name],

was wäre, wenn ${you} jeden Monat planbar neue Kunden ${formal ? 'gewinnen könnten' : 'gewinnen könntest'}?

Ich habe in den letzten 12 Monaten über 50 ${target} dabei geholfen, ${benefit}.

Das Ergebnis: mehr Anfragen, bessere Kunden, weniger Stress.

${noBrainer ? `Starte mit: ${noBrainer}` : ''}

${youHave} Zeit für ein kurzes Gespräch diese Woche?`
      break

    case 'straight-business':
      subject = `${offer} für ${target}`
      body = `${greeting} [Name],

ich helfe ${target} dabei, ${benefit}.

In den letzten Monaten haben wir über 50 Unternehmen in ${formal ? 'Ihrer' : 'deiner'} Branche geholfen, mehr Kunden zu gewinnen.

${noBrainer ? `Mein Angebot für ${you}: ${noBrainer}` : ''}

${youHave} diese Woche Zeit für ein kurzes Gespräch?`
      break

    case 'paint-picture':
      subject = formal ? 'Stellen Sie sich vor...' : 'Stell dir vor...'
      body = `${greeting} [Name],

stell ${you} ${formal ? 'sich' : 'dir'} vor: Jeden Morgen ${formal ? 'öffnen Sie Ihr' : 'öffnest du dein'} Postfach und findest neue Kundenanfragen.

Kein Hoffen mehr, ob dieser Monat gut wird. Keine Abhängigkeit von Empfehlungen.

Genau dabei helfe ich ${target} - mit ${offer}.

${noBrainer ? `Lass uns starten mit: ${noBrainer}` : ''}

${youHave} Zeit für ein kurzes Gespräch?`
      break

    case 'something-useful':
      subject = `Tipp für ${target}`
      body = `${greeting} [Name],

ich arbeite viel mit ${target} und habe einen Tipp, der ${formal ? 'Ihnen' : 'dir'} helfen könnte:

Die erfolgreichsten ${target} setzen auf ${offer}, um ${benefit}.

Falls ${you} ${formal ? 'Interesse haben' : 'Interesse hast'}, zeige ich ${formal ? 'Ihnen' : 'dir'} gerne, wie das konkret funktioniert.

${noBrainer ? `Übrigens: ${noBrainer}` : ''}

${formal ? 'Viele Grüße' : 'LG'}`
      break
  }

  const signature = `${closing},
[Dein Name]
[Deine Position]

[email@beispiel.de]
[+49 123 456789]`

  return { subject, body, signature }
}

function getBenefitForTarget(target: string, offer: string): string {
  // Kombiniere Zielgruppe + Angebot zu konkretem Nutzen
  const benefits: Record<string, Record<string, string>> = {
    'Entrümpelungsdienste': {
      'Google Ads': 'über Google mehr Aufträge in ihrer Region zu bekommen',
      'SEO': 'bei Google auf Seite 1 zu ranken und organisch gefunden zu werden',
      'default': 'mehr Aufträge und bessere Kunden zu gewinnen'
    },
    'Restaurants': {
      'Google Ads': 'mehr Reservierungen und Laufkundschaft zu generieren',
      'Social Media Management': 'ihre Social Media Präsenz aufzubauen und mehr Gäste anzuziehen',
      'default': 'mehr Gäste zu gewinnen und den Umsatz zu steigern'
    },
    'Immobilienmakler': {
      'Google Ads': 'qualifizierte Verkäufer-Leads zu generieren',
      'SEO': 'als lokaler Experte bei Google gefunden zu werden',
      'default': 'mehr Objekte und Käufer zu akquirieren'
    },
    'Handwerker': {
      'Google Ads': 'regelmäßig neue Aufträge über Google zu bekommen',
      'SEO': 'in ihrer Region bei Google gefunden zu werden',
      'default': 'ihren Auftragspipeline zu füllen'
    },
    'Coaches': {
      'Google Ads': 'qualifizierte Klienten zu gewinnen',
      'Webdesign': 'mit einer professionellen Website mehr Vertrauen aufzubauen',
      'default': 'mehr Klienten zu gewinnen und ihr Business zu skalieren'
    },
    'default': {
      'Google Ads': 'über Google Ads neue Kunden zu gewinnen',
      'SEO': 'organisch bei Google gefunden zu werden',
      'Webdesign': 'mit einer professionellen Website mehr Kunden zu überzeugen',
      'default': 'mehr Kunden zu gewinnen und den Umsatz zu steigern'
    }
  }

  const targetBenefits = benefits[target] || benefits['default']
  return targetBenefits[offer] || targetBenefits['default']
}
