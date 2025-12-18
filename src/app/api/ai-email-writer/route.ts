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

  phase2_target: `Du analysierst die Zielgruppe sachlich.

Beantworte kurz und praktisch:
- Welche konkreten Probleme hat diese Zielgruppe im Alltag?
- Was nervt sie bei ihrer aktuellen Lösung?
- Was würden sie gerne verbessern?
- Welche Ziele haben sie?

WICHTIG: Sachlich bleiben! Keine dramatischen Wörter wie "Angst", "Stress", "Schlaf rauben", "Frustration".
Schreibe auf Deutsch. (max 100 Wörter)`,

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

PERSONALISIERTER HOOK (KRITISCH!):
Die Variable {{VAR:...}} muss grammatikalisch in den Satz passen!
Der Satz + Variable = vollständiger deutscher Satz.

ERLAUBTE HOOK-MUSTER (wähle eines):

1. TECH STACK: "ich hab gesehen, dass ihr {{VAR:HubSpot}} nutzt..."
   → Variable = Software-Name (Clay: tech_stack)

2. HIRING: "ich hab gesehen, dass ihr gerade {{VAR:neue Marketing-Leute sucht}}..."
   → Variable = Job-Beschreibung (Clay: job_openings)

3. GROWTH: "Glückwunsch zu {{VAR:eurem Wachstum auf 50 Mitarbeiter}}..."
   → Variable = Firmenwachstum (Clay: company_size, funding)

4. WEBSITE: "ich hab mir {{VAR:eure Landingpage}} angeschaut..."
   → Variable = Website-Element (Clay: website_analysis)

5. ADS: "ich hab mir {{VAR:eure Facebook Ads}} angeschaut..."
   → Variable = Ad-Typ (Clay: ads_library)

6. SERVICE: "mir ist aufgefallen, dass ihr {{VAR:SEO Services}} anbietet..."
   → Variable = Dienstleistung (Clay: website_services)

WICHTIG - Der Satz muss VOLLSTÄNDIG sein:
- FALSCH: "mir ist aufgefallen, dass {{VAR:eure letzten Kampagnen}}" (unvollständig!)
- RICHTIG: "ich hab mir {{VAR:eure letzten Kampagnen}} angeschaut" (vollständig!)

Welcher Hook-Typ passt am besten zum Angebot? (max 80 Wörter).`,

  phase7_cta: `Du entwickelst die perfekte CTA-Strategie.

WICHTIG: Wir nutzen Permission-Based CTAs!
Statt "Lass uns telefonieren" fragst du um Erlaubnis etwas Wertvolles zu schicken.

WÄHLE EINEN CTA-TYP:

1. VIDEO CTA (am besten für komplexe Angebote)
   - "Ich hab ein 2-Min Video vorbereitet das zeigt wie [Nutzen]. Soll ich es dir schicken?"

2. DOKUMENT CTA (für datengetriebene Zielgruppen)
   - "Ich hab eine Analyse zu [Thema] erstellt. Interesse?"

3. AUDIT CTA (für Service-Anbieter)
   - "Ich könnte mir eure [Website/Ads] anschauen und dir 3 Quick-Wins zeigen. Interesse?"

4. CASE STUDY CTA (wenn du Erfolge hast)
   - "Wir haben einem ähnlichen Unternehmen geholfen [Ergebnis]. Soll ich dir zeigen wie?"

5. QUICK WIN CTA (für skeptische Zielgruppen)
   - "Ich hab 3 Tipps die du sofort umsetzen kannst. Interesse?"

Basierend auf Zielgruppe und Angebot:
- Welcher CTA-Typ passt am besten und WARUM?
- Formuliere 2 konkrete CTA-Beispiele

Der CTA muss eine JA/NEIN Frage sein! KEINE Terminanfrage!
Schreibe auf Deutsch. (max 100 Wörter)`
}

// =============================================================================
// FRAMEWORK STRUCTURES - Konkrete Email-Strukturen für jedes Framework
// =============================================================================

const FRAMEWORK_STRUCTURES: Record<FrameworkType, string> = {
  'quick-question': `STRUKTUR (50-100 Wörter):
1. Anrede + HOOK mit {{VAR:personalisierte Info}}
2. Kurze Frage wer der richtige Ansprechpartner ist
3. Was du anbieten kannst (1 Satz)
4. PERMISSION CTA: Frag um Erlaubnis etwas zu schicken`,

  'third-party': `STRUKTUR (50-100 Wörter):
1. Anrede + HOOK mit {{VAR:personalisierte Info}}
2. Beziehe dich auf jemanden aus dem Unternehmen
3. Was du anbieten kannst
4. PERMISSION CTA: Frag um Erlaubnis etwas zu schicken`,

  'pas': `STRUKTUR (50-100 Wörter):
1. Anrede + HOOK mit {{VAR:personalisierte Info}}
2. PROBLEM: Verbinde das mit einem konkreten Problem (1 Satz)
3. SOLVE: Wie du helfen kannst (1 Satz)
4. PERMISSION CTA: Frag um Erlaubnis etwas zu schicken`,

  'aida': `STRUKTUR (50-100 Wörter):
1. Anrede + ATTENTION mit {{VAR:personalisierte Info}}
2. INTEREST: Warum relevant für diese Person (1 Satz)
3. DESIRE: Wie es besser sein könnte (1 Satz)
4. PERMISSION CTA: Frag um Erlaubnis etwas zu schicken`,

  'straight-business': `STRUKTUR (50-100 Wörter):
1. Anrede + HOOK mit {{VAR:personalisierte Info}}
2. Direkt auf den Punkt: Was du anbietest und warum relevant
3. PERMISSION CTA: Frag um Erlaubnis etwas zu schicken`,

  'paint-picture': `STRUKTUR (50-100 Wörter):
1. Anrede + HOOK mit {{VAR:personalisierte Info}}
2. Kurze Vision wie es sein könnte (1-2 Sätze)
3. PERMISSION CTA: Frag um Erlaubnis etwas zu schicken`,

  'something-useful': `STRUKTUR (50-100 Wörter):
1. Anrede + HOOK mit {{VAR:personalisierte Info}}
2. Ein konkreter Tipp den der Empfänger umsetzen kann (1-2 Sätze)
3. PERMISSION CTA: Frag um Erlaubnis mehr zu schicken`
}

// Email Generation Prompt - bekommt das komplette Reasoning und Framework als Input
function getEmailGenerationPrompt(formal: boolean, framework: FrameworkType): string {
  const anrede = formal
    ? '"Sehr geehrter Herr [Name]," oder "Sehr geehrte Frau [Name],"'
    : '"Lieber Herr [Name]," oder "Liebe Frau [Name],"'

  const frameworkStructure = FRAMEWORK_STRUCTURES[framework]

  return `Du schreibst eine Cold Email die konvertiert. Schreibe wie ein Kollege der einen hilfreichen Tipp gibt.

${frameworkStructure}

GOLDENE REGELN:
1. 50-100 Wörter Body (nicht mehr!)
2. PERSONALISIERTER HOOK am Anfang mit {{VAR:...}} Markup
3. PERMISSION-BASED CTA am Ende (aus dem Reasoning übernehmen!)
4. Der CTA ist eine JA/NEIN Frage
5. KEINE Terminanfrage im ersten Kontakt!

VARIABLEN-MARKUP (KRITISCH!):
- Markiere personalisierte Infos mit: {{VAR:Beispieltext}}
- Die Variable MUSS grammatikalisch in den Satz passen!
- Der Satz + Variable = vollständiger deutscher Satz

PLATZHALTER:
- [Name] - Name des Empfängers
- {{VAR:...}} - Personalisierte Info (Clay-recherchierbar)

CLAY-KOMPATIBLE BEISPIELE (nutze diese Muster!):
- "ich hab gesehen, dass ihr {{VAR:HubSpot}} nutzt..." ✓
- "ich hab mir {{VAR:eure Facebook Ads}} angeschaut..." ✓
- "Glückwunsch zu {{VAR:eurem neuen Office in Berlin}}..." ✓
- "mir ist aufgefallen, dass ihr {{VAR:Google Ads Management}} anbietet..." ✓

VERBOTEN (unvollständige Sätze):
- "mir ist aufgefallen, dass {{VAR:eure letzten Kampagnen}}..." ✗ (fehlt Verb!)
- "ich hab gesehen, dass {{VAR:ihr viel Wert auf Qualität legt}}..." ✗ (kein Objekt!)

TON:
- Sachlich und freundlich
- Wie ein Kollege, NICHT wie ein Therapeut oder Verkäufer
- Kurze Sätze, einfache Worte
- ${formal ? 'Sie' : 'Du'}-Form verwenden
- Anrede: ${anrede}
- Nach dem Komma der Anrede IMMER klein weiterschreiben!

VERBOTEN:
- kostenlos, gratis (Spam!)
- Angst, Stress, Frustration (zu dramatisch)
- Gedankenstriche
- Listen im Email-Body
- "Hast du Zeit für ein Gespräch?" (zu früh!)

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

// No-Brainer Vorschläge für Suggestions - Permission-Based CTAs!
const noBrainerOffers: Record<string, string[]> = {
  'Google Ads': [
    'Video CTA: "Ich hab ein 2-Min Video zu euren Ads. Soll ich es schicken?"',
    'Audit CTA: "Ich zeig dir 3 Quick-Wins für eure Kampagnen. Interesse?"',
    'Quick Win CTA: "3 Optimierungen die ihr sofort umsetzen könnt. Soll ich sie dir schicken?"'
  ],
  'Facebook/Meta Ads': [
    'Video CTA: "Ich hab ein kurzes Video zu euren Zielgruppen vorbereitet."',
    'Audit CTA: "Ich schau mir eure Ads an und zeig dir wo Potenzial liegt."',
    'Dokument CTA: "Ich hab eine Analyse erstellt. Interesse?"'
  ],
  'SEO': [
    'Video CTA: "2-Min Video zu euren Rankings. Soll ich es schicken?"',
    'Dokument CTA: "Ich hab eine SEO-Analyse eurer Seite erstellt."',
    'Quick Win CTA: "3 SEO-Fehler die ich gefunden hab. Soll ich sie dir zeigen?"'
  ],
  'Webdesign': [
    'Video CTA: "Ich hab ein Konzept-Video für eure neue Seite."',
    'Dokument CTA: "Ich hab Verbesserungsvorschläge zusammengestellt."',
    'Audit CTA: "Ich zeig dir 3 Dinge die eure Seite besser machen."'
  ],
  'default': [
    'Video CTA: "Ich hab ein kurzes Video vorbereitet. Soll ich es schicken?"',
    'Quick Win CTA: "Ich hab 3 Tipps die du sofort umsetzen kannst."',
    'Dokument CTA: "Ich hab was vorbereitet. Interesse?"'
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

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const sendChunk = async (chunk: StreamChunk, delay: number = 0) => {
          if (delay > 0) await sleep(delay)
          controller.enqueue(encoder.encode(JSON.stringify(chunk) + '\n'))
        }

        // Analysiere den Prompt mit AI (erkennt JEDE Zielgruppe und JEDES Angebot)
        const analysis = await analyzePromptWithAI(prompt)

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
    { key: 'phase2_target', name: 'ZIELGRUPPEN-ANALYSE' },
    { key: 'phase3_offer', name: 'ANGEBOTS-FIT' },
    { key: 'phase4_framework', name: 'FRAMEWORK-AUSWAHL' },
    { key: 'phase5_nobrainer', name: 'NO-BRAINER STRATEGIE' },
    { key: 'phase6_composition', name: 'EMAIL-KOMPOSITION' },
    { key: 'phase7_cta', name: 'CTA STRATEGIE' }
  ]

  let fullReasoning = ''
  let detectedFramework: FrameworkType = 'straight-business'

  for (const phase of phaseConfig) {
    // Header für diese Phase
    const header = `\n${phase.name}\n${'━'.repeat(30)}\n`
    fullReasoning += header
    await sendChunk({ type: 'reasoning', content: fullReasoning }, 0)

    // OpenAI Call für diese Phase
    // Phase 2 bekommt weniger Tokens um Dramatik zu begrenzen
    const maxTokens = phase.key === 'phase2_target' ? 250 : 400

    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: PHASE_PROMPTS[phase.key] },
        { role: 'user', content: context }
      ],
      temperature: 0.85,
      max_tokens: maxTokens
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

// AI-basierte Prompt-Analyse - erkennt JEDE Zielgruppe und JEDES Angebot
async function analyzePromptWithAI(prompt: string): Promise<PromptAnalysis> {
  try {
    const openai = getOpenAI()
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'system',
        content: `Analysiere diesen Cold Email Prompt und extrahiere:
1. ZIELGRUPPE: An wen soll die Email gehen? (z.B. "Restaurants", "Yoga-Studios", "SaaS-Gründer", "Handwerker")
2. ANGEBOT: Was wird angeboten/verkauft? (z.B. "Google Ads", "Webdesign", "Buchungssoftware", "SEO")

WICHTIG:
- hasTarget = true wenn eine Zielgruppe erkennbar ist
- hasOffer = true wenn ein Angebot/Service/Produkt erkennbar ist
- Sei großzügig bei der Erkennung - lieber true als false

Antworte NUR als JSON (keine Markdown-Codeblöcke):
{"hasTarget": true/false, "hasOffer": true/false, "target": "erkannte Zielgruppe oder null", "offer": "erkanntes Angebot oder null"}`
      }, {
        role: 'user',
        content: prompt
      }],
      temperature: 0,
      max_tokens: 150
    })

    const content = response.choices[0].message.content || '{}'
    const parsed = JSON.parse(content)

    // No-Brainer weiterhin mit Keyword-Matching (bleibt gleich)
    const lower = prompt.toLowerCase()
    let noBrainer: string | undefined
    if (noBrainerKeywords.some(kw => lower.includes(kw))) {
      const noBrainerMatch = prompt.match(/(?:kostenlos|gratis|umsonst)[^,.!?]*/i)
      if (noBrainerMatch) {
        noBrainer = noBrainerMatch[0].trim()
      }
    }

    return {
      hasTarget: parsed.hasTarget === true,
      hasOffer: parsed.hasOffer === true,
      hasNoBrainer: !!noBrainer,
      target: parsed.target || undefined,
      offer: parsed.offer || undefined,
      noBrainer
    }
  } catch (error) {
    console.error('AI Prompt Analysis Error:', error)
    // Fallback: Wenn AI fehlschlägt, nutze altes Keyword-Matching
    return analyzePromptFallback(prompt)
  }
}

// Fallback-Funktion mit Keyword-Matching (für den Fall dass AI fehlschlägt)
function analyzePromptFallback(prompt: string): PromptAnalysis {
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
