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
  type: 'reasoning' | 'subject' | 'body' | 'signature' | 'framework' | 'suggestions' | 'done'
  content: string | string[]
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
    const { prompt, formal = false, previousEmail = null, improvement = null } = reqBody

    if (!prompt && !improvement) {
      return new Response(JSON.stringify({ error: 'Prompt ist erforderlich' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Framework erkennen
    const framework = detectFramework(prompt || improvement)
    const email = generateEmailByFramework(prompt, formal, framework, previousEmail, improvement)

    // Generate reasoning based on prompt
    const reasoning = generateReasoning(prompt || improvement, framework, previousEmail, improvement)

    // Generate suggestions based on framework and content
    const suggestions = generateSuggestions(framework, formal)

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        // Helper to send chunks with delay
        const sendChunk = async (chunk: StreamChunk, delay: number = 0) => {
          if (delay > 0) await sleep(delay)
          controller.enqueue(encoder.encode(JSON.stringify(chunk) + '\n'))
        }

        // Stream reasoning first (character by character simulation)
        const reasoningChunks = chunkString(reasoning, 15)
        for (let i = 0; i < reasoningChunks.length; i++) {
          await sendChunk({ type: 'reasoning', content: reasoningChunks.slice(0, i + 1).join('') }, 50)
        }

        await sleep(300)

        // Stream framework
        await sendChunk({ type: 'framework', content: frameworkNames[framework] })

        await sleep(200)

        // Stream subject (character by character)
        for (let i = 0; i <= email.subject.length; i++) {
          await sendChunk({ type: 'subject', content: email.subject.slice(0, i) }, 30)
        }

        await sleep(200)

        // Stream body (word by word for smoother experience)
        const bodyWords = email.body.split(' ')
        for (let i = 0; i <= bodyWords.length; i++) {
          await sendChunk({ type: 'body', content: bodyWords.slice(0, i).join(' ') }, 40)
        }

        await sleep(200)

        // Stream signature
        await sendChunk({ type: 'signature', content: email.signature })

        await sleep(300)

        // Stream suggestions
        await sendChunk({ type: 'suggestions', content: suggestions })

        // Done
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

function generateReasoning(
  prompt: string,
  framework: FrameworkType,
  previousEmail: string | null,
  improvement: string | null
): string {
  const lower = prompt.toLowerCase()

  let reasoning = ''

  if (improvement && previousEmail) {
    reasoning = `Verbesserung angefordert: "${improvement}"\n\n`
    reasoning += `Analysiere bestehende E-Mail und wende Änderungen an...\n`
  } else {
    reasoning = `Analysiere Anfrage: "${prompt.slice(0, 100)}${prompt.length > 100 ? '...' : ''}"\n\n`
  }

  // Analyze target industry/company
  if (lower.includes('entrumpel') || lower.includes('entsorgu')) {
    reasoning += `Branche erkannt: Entrümpelungsdienst/Entsorgung\n`
  } else if (lower.includes('restaurant') || lower.includes('gastro')) {
    reasoning += `Branche erkannt: Gastronomie\n`
  } else if (lower.includes('immobilien') || lower.includes('makler')) {
    reasoning += `Branche erkannt: Immobilien\n`
  } else if (lower.includes('handwerk') || lower.includes('dachdeck') || lower.includes('elektrik')) {
    reasoning += `Branche erkannt: Handwerk\n`
  } else if (lower.includes('agentur') || lower.includes('marketing')) {
    reasoning += `Branche erkannt: Marketing/Agentur\n`
  } else if (lower.includes('software') || lower.includes('saas') || lower.includes('app')) {
    reasoning += `Branche erkannt: Software/Tech\n`
  } else {
    reasoning += `Branche: Allgemein B2B\n`
  }

  reasoning += `\nFramework-Auswahl: ${frameworkNames[framework]}\n`
  reasoning += `Grund: ${frameworkDescriptions[framework]}\n`

  // Add personalization hints
  reasoning += `\nPersonalisierungs-Tipps:\n`
  reasoning += `- Ersetze [Name] durch den echten Namen\n`
  reasoning += `- Füge spezifische Details zum Unternehmen ein\n`
  reasoning += `- Passe den Betreff an die Situation an`

  return reasoning
}

function generateSuggestions(framework: FrameworkType, formal: boolean): string[] {
  const baseSuggestions = [
    'Kurzer machen',
    'Mehr Dringlichkeit',
    'Social Proof hinzufugen',
    'Call-to-Action verstärken',
    'Persönlicher gestalten'
  ]

  // Add framework-specific suggestions
  switch (framework) {
    case 'quick-question':
      baseSuggestions.push('Konkretere Frage stellen')
      break
    case 'pas':
      baseSuggestions.push('Problem starker betonen')
      break
    case 'aida':
      baseSuggestions.push('Mehr Zahlen/Statistiken')
      break
    case 'paint-picture':
      baseSuggestions.push('Vision lebhafter beschreiben')
      break
    case 'something-useful':
      baseSuggestions.push('Relevantere Ressource erwähnen')
      break
  }

  // Add formal/informal toggle suggestion
  baseSuggestions.push(formal ? 'Lockerer formulieren' : 'Formeller formulieren')

  return baseSuggestions.slice(0, 6)
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
  framework: FrameworkType,
  previousEmail: string | null,
  improvement: string | null
): { subject: string; body: string; signature: string } {
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

Könnten ${you} mir sagen, wer in ${formal ? 'Ihrem' : 'eurem'} Unternehmen für [BEREICH] zuständig ist und wie ich diese Person am besten erreichen kann?

Vielen Dank im Voraus für ${your}e Hilfe.`
      break

    case 'third-party':
      subject = 'Könnten Sie mir weiterhelfen?'
      body = `${greeting} [Name],

ich bin auf ${your} Profil gestoßen und hoffe, ${you} ${formal ? 'können' : 'kannst'} mir kurz weiterhelfen.

Ich habe eine Lösung für [PROBLEM/BEREICH], von der ich denke, dass [UNTERNEHMEN] wirklich profitieren könnte – aber ich habe Schwierigkeiten, den richtigen Ansprechpartner zu finden.

Wer wäre die richtige Person, um diese Möglichkeit zu besprechen, und wie kann ich sie am besten erreichen?

Ich schätze ${your}e Zeit sehr.`
      break

    case 'pas':
      subject = 'Lösung für [PROBLEM]'
      body = `${greeting} [Name],

mir ist aufgefallen, dass [UNTERNEHMEN] mit [KONKRETES PROBLEM] zu kämpfen hat.

Das kann unglaublich frustrierend sein – verlorene Kunden, ineffiziente Prozesse und unnötige Kosten.

[DEIN PRODUKT/SERVICE] löst genau dieses Problem, indem es [KONKRETER NUTZEN].

${formal ? 'Hätten Sie' : 'Hättest du'} Interesse zu erfahren, wie das konkret funktioniert?`
      break

    case 'aida':
      subject = 'Was wäre, wenn...'
      body = `${greeting} [Name],

was wäre, wenn [DEIN PRODUKT/SERVICE] ${formal ? 'Ihnen' : 'dir'} helfen könnte, [PROBLEM] zu lösen?

In einem Jahr haben wir [KUNDENNAME] geholfen, [X% VERBESSERUNG] zu erreichen.

Zusätzlich konnten wir die Effizienz steigern, Kosten senken und die Kundenzufriedenheit deutlich verbessern.

${youHave} diese Woche Zeit für ein kurzes Gespräch, um zu sehen, ob das auch für ${you} funktionieren könnte?`
      break

    case 'straight-business':
      subject = 'Kurze Anfrage'
      body = `${greeting} [Name],

ich biete [DEIN ANGEBOT] für Unternehmen wie ${formal ? 'Ihres' : 'deines'} an.

Wir haben bereits [ANZAHL] Unternehmen geholfen, [KONKRETES ERGEBNIS] zu erreichen – und das in weniger als [ZEITRAUM].

${youHave} diese Woche Zeit für ein kurzes Gespräch?`
      break

    case 'paint-picture':
      subject = formal ? 'Stellen Sie sich vor...' : 'Stell dir vor...'
      body = `${greeting} [Name],

nichts ist frustrierender als [PAIN POINT].

Stell ${you} ${formal ? 'sich' : 'dir'} eine Welt vor, in der all das kein Problem mehr ist – [IDEALES SZENARIO].

Genau das ermöglichen wir mit [DEIN PRODUKT/SERVICE].

${youHave} Zeit für eine kurze Demo, um zu sehen, wie das funktioniert?`
      break

    case 'something-useful':
      subject = formal ? 'Ihr Beitrag zu [THEMA]' : 'Dein Beitrag zu [THEMA]'
      body = `${greeting} [Name],

ich bin auf ${your}en Beitrag zu [THEMA] gestoßen und fand ${your}e Punkte wirklich treffend!

Besonders [SPEZIFISCHER PUNKT] hat mich zum Nachdenken gebracht.

Ich dachte, das könnte ${you} auch interessieren: [RELEVANTE RESSOURCE/ARTIKEL]

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
    signature
  }
}
