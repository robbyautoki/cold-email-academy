import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'

// Lazy initialization to avoid build-time errors when API key is not available
let openai: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }
  return openai
}

// =============================================================================
// PHASE PROMPTS - Jede Phase hat ihren eigenen System-Prompt
// =============================================================================

const PHASE_PROMPTS: Record<string, string> = {
  phase1_analysis: `Du analysierst einen Cold Email Prompt.

Extrahiere und erkläre:
- Wer ist die Zielgruppe?
- Was wird angeboten?
- Gibt es einen No-Brainer?
- Was sind besondere Wünsche/Anforderungen?

Sei konkret und beziehe dich auf den Prompt. Schreibe auf Deutsch. Kurz und prägnant (max 100 Wörter).`,

  phase2_target: `Du tauchst tief in die Psyche dieser Zielgruppe ein.

Beantworte diese Fragen emotional und spezifisch:
- Was raubt dieser Zielgruppe den Schlaf?
- Welche Ängste haben sie, die sie niemandem zugeben würden?
- Was frustriert sie jeden Tag aufs Neue?
- Welchen Druck spüren sie von Kunden, Chef, Familie?
- Worüber machen sie sich Sorgen wenn sie abends im Bett liegen?
- Was haben sie schon versucht das nicht funktioniert hat?
- Wann fühlen sie sich überfordert oder hilflos?
- Was würden sie sofort ändern wenn sie könnten?

Sei spezifisch und emotional. Schreibe auf Deutsch. (max 150 Wörter)`,

  phase3_offer: `Du analysierst das Angebot im Kontext der emotionalen Situation der Zielgruppe.

Basierend auf den Pain Points und Ängsten:
- Welches konkrete Problem löst dieses Angebot?
- Wie fühlt sich die Zielgruppe NACH der Lösung?
- Welche Last fällt von ihren Schultern?
- Warum ist JETZT der richtige Zeitpunkt?

Schreibe auf Deutsch. Kurz und prägnant (max 100 Wörter).`,

  phase4_framework: `Du wählst das beste Cold Email Framework.

Verfügbare Frameworks:
1. Quick Question: Für unklare Ansprechpartner, fragt nach dem richtigen Kontakt
2. Third Party: Über Mitarbeiter an Entscheider kommen
3. PAS: Problem emotional aufzeigen, Schmerz verstärken, Lösung als Erlösung
4. AIDA: Aufmerksamkeit durch Hook, Interesse wecken, Verlangen erzeugen, Aktion
5. Straight to Business: Direkt, effizient, respektiert die Zeit des Empfängers
6. Paint a Picture: Emotionale Zukunftsvision malen, Kontrast zu heute
7. Something Useful: Beziehungsaufbau durch hilfreiche Tipps ohne Gegenleistung

Basierend auf Zielgruppe und emotionaler Situation:
- Welches Framework passt am besten? (NUR EINS wählen!)
- WARUM genau dieses Framework für diese emotionale Lage?

Nenne das Framework explizit beim Namen. Schreibe auf Deutsch. (max 100 Wörter).`,

  phase5_nobrainer: `Du entwickelst die No-Brainer Strategie.

WICHTIG: Nutze NIEMALS diese Spam-Wörter:
- kostenlos, gratis, umsonst, geschenkt
- Angebot, Rabatt, sparen
- jetzt, sofort, dringend

Stattdessen formuliere unverbindlich und wertvoll:
- "Ich zeige dir 3 Dinge die du sofort umsetzen kannst"
- "Lass uns kurz telefonieren, dann weißt du mehr"
- "Ich schau mir das unverbindlich an"
- "Wenn es nicht passt, kein Problem"

Basierend auf allem Vorherigen:
- Welcher No-Brainer senkt die Hemmschwelle ohne Spam-Wörter?
- Wie formulierst du ihn natürlich und menschlich?

Schreibe auf Deutsch. (max 80 Wörter).`,

  phase6_composition: `Du planst die Email-Komposition.

HOOK-TYPEN (wähle einen passenden):
- Observation Hook: "Mir ist aufgefallen, dass..."
- Question Hook: "Kurze Frage: ..."
- Compliment Hook: "Ich hab mir [Website] angeschaut..."
- Pain Hook: Direkt auf den größten Schmerz eingehen

PSYCHOLOGISCHE TRIGGER einbauen:
- Social Proof: "Andere [Zielgruppe] haben..."
- Authority: Expertise zeigen ohne anzugeben
- Scarcity: "Diese Woche hab ich noch Zeit für..."

Basierend auf Framework und Erkenntnissen:
- Welcher Hook passt am besten?
- Welche 1-2 Trigger sollten rein?
- Wie klingt ein guter Betreff? (2 Vorschläge)

Schreibe auf Deutsch. (max 120 Wörter).`
}

// =============================================================================
// FRAMEWORK STRUCTURES - Konkrete Email-Strukturen für jedes Framework
// =============================================================================

const FRAMEWORK_STRUCTURES: Record<FrameworkType, string> = {
  'quick-question': `STRUKTUR (Quick Question):
1. Kurze Frage wer der richtige Ansprechpartner ist (1 Satz)
2. Kontext warum du fragst (1-2 Sätze)
3. Was du anbieten kannst (1 Satz)
4. Bitte um Weiterleitung oder Antwort (1 Satz)`,

  'third-party': `STRUKTUR (Third Party):
1. Beziehe dich auf einen Mitarbeiter oder Abteilung (1 Satz)
2. Erkläre warum du den Entscheider suchst (1-2 Sätze)
3. Kurz was du anbieten kannst (1 Satz)
4. Frage ob er/sie der richtige Kontakt ist (1 Satz)`,

  'pas': `STRUKTUR (PAS):
1. PROBLEM (2 Sätze): Beschreibe das Problem so dass der Leser denkt "Ja genau das kenne ich!"
2. AGITATE (2 Sätze): Verschärfe das Unbehagen. Was passiert wenn nichts getan wird? Welche Konsequenzen?
3. SOLVE (2 Sätze): Deine Lösung als Ausweg aus dem Schmerz. Wie fühlt sich das Leben danach an?
4. CTA (1 Satz): Kleine konkrete nächste Aktion ohne Druck.`,

  'aida': `STRUKTUR (AIDA):
1. ATTENTION (1 Satz): Hook mit überraschender Beobachtung, Zahl oder Frage
2. INTEREST (2 Sätze): Warum das für DIESE Person relevant ist, beziehe dich auf ihre Situation
3. DESIRE (2 Sätze): Male ein Bild wie es sein könnte, emotionale Vorstellung des besseren Zustands
4. ACTION (1 Satz): Konkrete kleine nächste Aktion, unverbindlich formuliert`,

  'straight-business': `STRUKTUR (Straight to Business):
1. Direkt auf den Punkt (1 Satz): Was du anbietest und warum du schreibst
2. Relevanz (1-2 Sätze): Warum das für den Empfänger interessant sein könnte
3. Social Proof oder Ergebnis (1 Satz): Kurzer Beweis dass es funktioniert
4. CTA (1 Satz): Klare nächste Aktion, respektiert die Zeit des Empfängers`,

  'paint-picture': `STRUKTUR (Paint a Picture):
1. Zukunftsvision (2-3 Sätze): Male ein emotionales Bild wie es sein könnte. Nutze sensorische Sprache.
2. Kontrast zu heute (1-2 Sätze): Wie fühlt sich die aktuelle Situation an?
3. Brücke (1 Satz): Wie kommst du von hier nach dort?
4. CTA (1 Satz): Einladung den ersten Schritt zu machen`,

  'something-useful': `STRUKTUR (Something Useful):
1. Wertvoller Tipp (2-3 Sätze): Gib einen konkreten Tipp den der Empfänger sofort umsetzen kann
2. Warum du das teilst (1 Satz): Zeige dass du helfen willst ohne Gegenleistung
3. Angebot für mehr (1-2 Sätze): Falls Interesse besteht, kannst du mehr zeigen
4. Kein Druck (1 Satz): Unverbindlich, freundlich`
}

// Email Generation Prompt - bekommt das komplette Reasoning und Framework als Input
function getEmailGenerationPrompt(formal: boolean, framework: FrameworkType): string {
  const anrede = formal
    ? '"Sehr geehrter Herr [Name]," oder "Sehr geehrte Frau [Name],"'
    : '"Lieber Herr [Name]," oder "Liebe Frau [Name],"'

  const frameworkStructure = FRAMEWORK_STRUCTURES[framework]

  return `Du schreibst eine Cold Email. Schreibe wie ein Freund der hilft.

${frameworkStructure}

SCHREIBSTIL:
- ${formal ? 'Sie' : 'Du'}-Form verwenden
- Anrede: ${anrede}
- Nach dem Komma der Anrede IMMER klein weiterschreiben!
- Sei direkt und ehrlich
- Zeige echtes Interesse an der Person
- Kurze Sätze, einfache Worte
- KEINE Gedankenstriche verwenden
- Fließender Text, keine Aufzählungen oder Listen in der Email
- Menschlich und natürlich, kein Verkäufer-Sprech
- Max 150 Wörter Body

VERBOTEN (Spam-Trigger, NIEMALS benutzen!):
kostenlos, gratis, umsonst, geschenkt, Angebot, Rabatt, sparen, jetzt, sofort, dringend, garantiert, versprochen, exklusiv, limitiert

PLATZHALTER:
- Nutze [Name] als EINZIGEN Platzhalter

Antworte NUR als JSON (keine Markdown-Codeblöcke):
{"subject": "Betreff hier", "body": "Email-Text mit Zeilenumbrüchen als \\n"}`
}

// Regenerate Prompt - für kontextuelle Text-Ersetzung
function getRegeneratePrompt(formal: boolean): string {
  return `Du ersetzt einen markierten Textabschnitt in einer Cold Email.

REGELN:
1. Schreibe einen NEUEN Text der den markierten ersetzt
2. Der neue Text MUSS nahtlos zum Text davor und danach passen
3. Ähnliche Länge wie der Original-Text
4. Gleicher Stil und Ton wie der Rest der Email
5. KEINE Spam-Wörter (kostenlos, gratis, Angebot, jetzt, sofort, dringend, etc.)
6. KEINE Gedankenstriche verwenden
7. ${formal ? 'Sie' : 'Du'}-Form beibehalten
8. Nach Komma immer klein weiterschreiben
9. Menschlich und natürlich klingen, wie ein Freund der hilft

Antworte NUR mit dem Ersatztext, nichts anderes. Keine Anführungszeichen, keine Erklärungen.`
}

// =============================================================================
// TYPES
// =============================================================================

type FrameworkType =
  | 'quick-question'
  | 'third-party'
  | 'pas'
  | 'aida'
  | 'straight-business'
  | 'paint-picture'
  | 'something-useful'

interface StreamChunk {
  type: 'reasoning' | 'subject' | 'body' | 'signature' | 'framework' | 'suggestions' | 'question' | 'done' | 'regenerated'
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

interface ReasoningPhase {
  name: string
  content: string
}

interface RegenerateRequest {
  mode: 'regenerate'
  textBefore: string
  selectedText: string
  textAfter: string
  formal: boolean
}

// =============================================================================
// CONSTANTS
// =============================================================================

const frameworkNames: Record<FrameworkType, string> = {
  'quick-question': 'Quick Question',
  'third-party': 'Third-Party Connection',
  'pas': 'PAS (Problem-Agitate-Solve)',
  'aida': 'AIDA',
  'straight-business': 'Straight to Business',
  'paint-picture': 'Paint a Picture',
  'something-useful': 'Something Useful'
}

// Zielgruppen-Keywords für initiale Erkennung
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

// No-Brainer Keywords
const noBrainerKeywords = [
  'kostenlos', 'gratis', 'umsonst', 'geschenkt', 'bonus',
  'test', 'probe', 'trial', 'unverbindlich', 'risikofrei',
  'erstgespräch', 'erstberatung', 'analyse'
]

// No-Brainer Vorschläge für Suggestions (OHNE Spam-Wörter!)
const noBrainerOffers: Record<string, string[]> = {
  'Google Ads': [
    'Ich zeige dir 3 Optimierungen die du sofort umsetzen kannst',
    'Kurzes Telefonat, dann weißt du wo du stehst',
    'Ich schau mir deine Kampagnen unverbindlich an'
  ],
  'Facebook/Meta Ads': [
    'Ich check deinen Account und sag dir was ich sehe',
    'Ein Blick auf deine Zielgruppen, ob da Potenzial liegt',
    'Kurzes Gespräch, dann weißt du mehr'
  ],
  'SEO': [
    'Ich schau mir deine Seite an und geb dir 3 Quick-Wins',
    'Kurzer Blick auf deine Rankings, dann reden wir',
    'Unverbindlicher Website-Check'
  ],
  'Webdesign': [
    'Ich schau mir deine Seite an und zeig dir Verbesserungen',
    'Kurzes Konzept wie deine neue Seite aussehen könnte',
    'Unverbindlicher Blick auf deine aktuelle Website'
  ],
  'default': [
    'Kurzes Kennenlernen, dann sehen wir weiter',
    'Unverbindlicher Blick auf deine Situation',
    'Wenn es nicht passt, kein Problem'
  ]
}

// =============================================================================
// MAIN POST HANDLER
// =============================================================================

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
    const { prompt, formal = false, mode, textBefore, selectedText, textAfter } = reqBody

    // =================================================================
    // REGENERATE MODE - Inline Text Replacement
    // =================================================================
    if (mode === 'regenerate') {
      if (!selectedText) {
        return new Response(JSON.stringify({ error: 'selectedText ist erforderlich' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      const regeneratedText = await regenerateSelectedText(
        textBefore || '',
        selectedText,
        textAfter || '',
        formal
      )

      return new Response(JSON.stringify({
        success: true,
        regeneratedText
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // =================================================================
    // NORMAL MODE - Full Email Generation
    // =================================================================
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

        try {
          // =================================================================
          // CHAIN-OF-THOUGHT REASONING
          // =================================================================
          const { phases, framework, fullReasoning } = await chainOfThoughtReasoning(
            prompt,
            analysis,
            formal,
            sendChunk
          )

          // =================================================================
          // DYNAMIC EMAIL GENERATION
          // =================================================================
          const email = await generateEmailWithAI(fullReasoning, formal, framework)

          await sleep(300)
          await sendChunk({ type: 'framework', content: frameworkNames[framework] })
          await sleep(200)

          // Stream subject
          for (let i = 0; i <= email.subject.length; i++) {
            await sendChunk({ type: 'subject', content: email.subject.slice(0, i) }, 25)
          }

          await sleep(200)

          // Stream body word by word
          const bodyWords = email.body.split(' ')
          for (let i = 0; i <= bodyWords.length; i++) {
            await sendChunk({ type: 'body', content: bodyWords.slice(0, i).join(' ') }, 35)
          }

          await sleep(200)

          // Signature
          const signature = `${formal ? 'Mit freundlichen Grüßen' : 'Beste Grüße'},
[Dein Name]
[Deine Position]

[email@beispiel.de]
[+49 123 456789]`
          await sendChunk({ type: 'signature', content: signature })

          await sleep(300)

          // Suggestions
          const suggestions = generateSuggestions(analysis, formal)
          await sendChunk({ type: 'suggestions', content: suggestions })
          await sendChunk({ type: 'done', content: 'complete' })

        } catch (error) {
          console.error('Generation Error:', error)
          await sendChunk({ type: 'question', content: 'Es gab einen Fehler bei der Generierung. Bitte versuche es erneut.' })
          await sendChunk({ type: 'done', content: 'error' })
        }

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

// =============================================================================
// CHAIN-OF-THOUGHT REASONING
// =============================================================================

async function chainOfThoughtReasoning(
  prompt: string,
  analysis: PromptAnalysis,
  formal: boolean,
  sendChunk: (chunk: StreamChunk, delay?: number) => Promise<void>
): Promise<{ phases: ReasoningPhase[], framework: FrameworkType, fullReasoning: string }> {
  const phases: ReasoningPhase[] = []

  // Initial context für Phase 1
  let context = `User Prompt: "${prompt}"
Erkannte Zielgruppe: ${analysis.target || 'nicht spezifiziert'}
Erkanntes Angebot: ${analysis.offer || 'nicht spezifiziert'}
No-Brainer: ${analysis.noBrainer || 'nicht angegeben'}
Anrede-Stil: ${formal ? 'Sie (formell)' : 'Du (informell)'}`

  const phaseConfig = [
    { key: 'phase1_analysis', name: 'ANALYSE DER ANFRAGE' },
    { key: 'phase2_target', name: 'ZIELGRUPPEN DEEP-DIVE' },
    { key: 'phase3_offer', name: 'WARUM DIESES ANGEBOT PASST' },
    { key: 'phase4_framework', name: 'FRAMEWORK-AUSWAHL' },
    { key: 'phase5_nobrainer', name: 'NO-BRAINER STRATEGIE' },
    { key: 'phase6_composition', name: 'EMAIL-KOMPOSITION' }
  ]

  let fullReasoning = ''
  let detectedFramework: FrameworkType = 'straight-business'

  for (const phase of phaseConfig) {
    // Header für diese Phase
    const header = `\n${phase.name}\n${'━'.repeat(30)}\n`
    fullReasoning += header
    await sendChunk({ type: 'reasoning', content: fullReasoning }, 0)

    // OpenAI Call für diese Phase
    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: PHASE_PROMPTS[phase.key] },
        { role: 'user', content: context }
      ],
      temperature: 0.85,
      max_tokens: 400
    })

    const phaseContent = response.choices[0]?.message?.content || ''

    // Content Zeichen für Zeichen streamen (Typing-Effekt)
    for (let i = 0; i < phaseContent.length; i += 3) {
      const chunk = phaseContent.slice(0, i + 3)
      await sendChunk({ type: 'reasoning', content: fullReasoning + chunk }, 12)
    }

    fullReasoning += phaseContent + '\n'

    // Phase speichern
    phases.push({ name: phase.name, content: phaseContent })

    // Context für nächste Phase erweitern (Chain-of-Thought!)
    context += `\n\n--- ${phase.name} ---\n${phaseContent}`

    // Framework aus Phase 4 extrahieren
    if (phase.key === 'phase4_framework') {
      detectedFramework = extractFrameworkFromResponse(phaseContent)
    }

    // Kleine Pause zwischen Phasen
    await sleep(100)
  }

  return { phases, framework: detectedFramework, fullReasoning }
}

// =============================================================================
// REGENERATE SELECTED TEXT
// =============================================================================

async function regenerateSelectedText(
  textBefore: string,
  selectedText: string,
  textAfter: string,
  formal: boolean
): Promise<string> {
  const contextPrompt = `KONTEXT DER EMAIL:
Text VOR der Auswahl: "${textBefore}"
AUSGEWÄHLTER TEXT (zu ersetzen): "${selectedText}"
Text NACH der Auswahl: "${textAfter}"`

  const response = await getOpenAI().chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: getRegeneratePrompt(formal) },
      { role: 'user', content: contextPrompt }
    ],
    temperature: 0.8,
    max_tokens: 200
  })

  const result = response.choices[0]?.message?.content || selectedText

  // Clean up: Remove quotes if the model wrapped the text
  return result.replace(/^["']|["']$/g, '').trim()
}

// =============================================================================
// EMAIL GENERATION
// =============================================================================

async function generateEmailWithAI(
  reasoningContext: string,
  formal: boolean,
  framework: FrameworkType
): Promise<{ subject: string; body: string }> {
  const response = await getOpenAI().chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: getEmailGenerationPrompt(formal, framework) },
      { role: 'user', content: `Hier ist das komplette Reasoning:\n\n${reasoningContext}\n\nGeneriere jetzt die Cold Email basierend auf diesem Reasoning. Wende das ${frameworkNames[framework]} Framework korrekt an.` }
    ],
    temperature: 0.9,
    max_tokens: 800
  })

  const content = response.choices[0]?.message?.content || ''

  try {
    // JSON parsen (mit oder ohne Markdown-Codeblock)
    let jsonString = content
    const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1]
    }

    const jsonMatch = jsonString.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        subject: parsed.subject || 'Kurze Anfrage',
        body: (parsed.body || '').replace(/\\n/g, '\n')
      }
    }
  } catch (e) {
    console.error('JSON Parse Error:', e)
  }

  // Fallback wenn JSON nicht geparst werden kann
  return {
    subject: 'Kurze Anfrage',
    body: content
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
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

function extractFrameworkFromResponse(text: string): FrameworkType {
  const lower = text.toLowerCase()
  if (lower.includes('quick question')) return 'quick-question'
  if (lower.includes('third-party') || lower.includes('third party')) return 'third-party'
  if (lower.includes('pas') || lower.includes('problem-agitate') || lower.includes('problem agitate')) return 'pas'
  if (lower.includes('aida')) return 'aida'
  if (lower.includes('paint a picture') || lower.includes('paint-picture')) return 'paint-picture'
  if (lower.includes('something useful')) return 'something-useful'
  return 'straight-business'
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
