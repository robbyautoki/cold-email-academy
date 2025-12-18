import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// =============================================================================
// PHASE PROMPTS - Jede Phase hat ihren eigenen System-Prompt
// =============================================================================

const PHASE_PROMPTS: Record<string, string> = {
  phase1_analysis: `Du analysierst einen Cold Email Prompt.

Extrahiere und erkläre:
• Wer ist die Zielgruppe?
• Was wird angeboten?
• Gibt es einen No-Brainer?
• Was sind besondere Wünsche/Anforderungen?

Sei konkret und beziehe dich auf den Prompt. Schreibe auf Deutsch. Kurz und prägnant (max 100 Wörter).`,

  phase2_target: `Du bist Experte für die genannte Zielgruppe.

Basierend auf der vorherigen Analyse, erkläre:
• Was sind die typischen Probleme dieser Branche?
• Wer sind die Entscheidungsträger?
• Was sind ihre größten Pain Points?
• Was wollen sie wirklich erreichen?

Sei spezifisch für DIESE Zielgruppe. Schreibe auf Deutsch. Kurz und prägnant (max 120 Wörter).`,

  phase3_offer: `Du analysierst das Angebot im Kontext der Zielgruppe.

Basierend auf den vorherigen Erkenntnissen:
• Warum passt dieses Angebot perfekt?
• Welche konkreten Vorteile hat die Zielgruppe?
• Welche USPs sollten betont werden?
• Welche Einwände könnten kommen?

Schreibe auf Deutsch. Kurz und prägnant (max 100 Wörter).`,

  phase4_framework: `Du wählst das beste Cold Email Framework.

Verfügbare Frameworks:
1. Quick Question - Für unklare Ansprechpartner, fragt nach dem richtigen Kontakt
2. Third-Party - Über Mitarbeiter an Entscheider kommen
3. PAS - Problem aufzeigen, Schmerz verstärken, Lösung präsentieren
4. AIDA - Aufmerksamkeit durch konkrete Zahlen und Erfolge
5. Straight to Business - Direkt, effizient, keine Zeit verschwenden
6. Paint a Picture - Emotionale Zukunftsvision malen
7. Something Useful - Beziehungsaufbau durch hilfreiche Tipps

Basierend auf Zielgruppe + Angebot:
• Welches Framework passt am besten? (NUR EINS wählen!)
• WARUM genau dieses Framework?
• Wie sollte es angewendet werden?

Nenne das Framework explizit beim Namen. Schreibe auf Deutsch. (max 100 Wörter).`,

  phase5_nobrainer: `Du entwickelst die No-Brainer Strategie.

Basierend auf allem Vorherigen:
• Welches unwiderstehliche Angebot senkt die Hemmschwelle?
• Warum funktioniert es bei dieser Zielgruppe?
• Wie sollte es formuliert werden?
• Welches Risiko nimmt es dem Empfänger?

Falls der User keinen No-Brainer genannt hat, schlage einen passenden vor.
Schreibe auf Deutsch. Kurz und prägnant (max 80 Wörter).`,

  phase6_composition: `Du planst die Email-Komposition.

Basierend auf dem gewählten Framework und allen Erkenntnissen:
• Wie sollte der Betreff lauten? (2-3 konkrete Vorschläge)
• Welcher emotionale Hook funktioniert am Anfang?
• Wie wird der CTA formuliert?
• Welcher Ton passt zur Zielgruppe?

Schreibe auf Deutsch. Kurz und prägnant (max 100 Wörter).`
}

// Email Generation Prompt - bekommt das komplette Reasoning als Input
function getEmailGenerationPrompt(formal: boolean): string {
  return `Du bist ein Cold Email Copywriter. Schreibe basierend auf dem Reasoning eine KOMPLETT NEUE Cold Email.

WICHTIGE REGELN:
- Nutze [Name] als EINZIGEN Platzhalter
- Schreibe im ${formal ? 'Sie' : 'Du'}-Stil (${formal ? 'formell' : 'informell'})
- Die Email MUSS einzigartig sein - KEINE Templates!
- Wende das gewählte Framework korrekt an
- Baue den No-Brainer natürlich ein
- Halte die Email KURZ (max 120 Wörter Body)
- Deutscher Text, natürlich klingend
- Kein Bullshit, direkt auf den Punkt

Antworte NUR im folgenden JSON-Format (keine Markdown-Codeblöcke, nur raw JSON):
{"subject": "Der Betreff hier", "body": "Der komplette Email-Text hier mit Zeilenumbrüchen als \\n"}`
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

interface ReasoningPhase {
  name: string
  content: string
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

// No-Brainer Vorschläge für Suggestions
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
  'default': [
    'Kostenloses Erstgespräch',
    'Unverbindliche Analyse',
    'Test-Angebot ohne Risiko'
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
          const email = await generateEmailWithAI(fullReasoning, formal)

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
    { key: 'phase1_analysis', name: '🔍 ANALYSE DER ANFRAGE' },
    { key: 'phase2_target', name: '👥 ZIELGRUPPEN-DEEP-DIVE' },
    { key: 'phase3_offer', name: '🎯 WARUM DIESES ANGEBOT PASST' },
    { key: 'phase4_framework', name: '📧 FRAMEWORK-AUSWAHL' },
    { key: 'phase5_nobrainer', name: '💎 NO-BRAINER STRATEGIE' },
    { key: 'phase6_composition', name: '✍️ EMAIL-KOMPOSITION' }
  ]

  let fullReasoning = ''
  let detectedFramework: FrameworkType = 'straight-business'

  for (const phase of phaseConfig) {
    // Header für diese Phase
    const header = `\n${phase.name}\n${'━'.repeat(30)}\n`
    fullReasoning += header
    await sendChunk({ type: 'reasoning', content: fullReasoning }, 0)

    // OpenAI Call für diese Phase
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: PHASE_PROMPTS[phase.key] },
        { role: 'user', content: context }
      ],
      temperature: 0.7,
      max_tokens: 300
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
// EMAIL GENERATION
// =============================================================================

async function generateEmailWithAI(
  reasoningContext: string,
  formal: boolean
): Promise<{ subject: string; body: string }> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: getEmailGenerationPrompt(formal) },
      { role: 'user', content: `Hier ist das komplette Reasoning:\n\n${reasoningContext}\n\nGeneriere jetzt die Cold Email basierend auf diesem Reasoning.` }
    ],
    temperature: 0.8,
    max_tokens: 600
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
