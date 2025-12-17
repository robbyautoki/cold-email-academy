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

// Zielgruppen-Insights für Extended Reasoning
const targetInsights: Record<string, string> = {
  'Entrümpelungsdienste': `• Typische Probleme: Saisonalität, lokale Konkurrenz, Preisvergleiche
• Entscheidungsträger: Inhaber (meist Einzelunternehmer oder kleine Teams)
• Pain Points: Unregelmäßige Aufträge, Abhängigkeit von Empfehlungen, Preisdruck
• Was sie wollen: Stetige Aufträge, bessere Kunden die fair zahlen, Planbarkeit`,
  'Restaurants': `• Typische Probleme: Hohe Konkurrenz, Abhängigkeit von Bewertungen, Fachkräftemangel
• Entscheidungsträger: Inhaber, Geschäftsführer
• Pain Points: Schwankende Auslastung, hohe Fixkosten, Sichtbarkeit
• Was sie wollen: Volle Tische, treue Stammgäste, gute Online-Präsenz`,
  'Immobilienmakler': `• Typische Probleme: Akquise-Druck, Provision unter Beschuss, viele Mitbewerber
• Entscheidungsträger: Makler selbst oder Büroinhaber
• Pain Points: Zu wenig Objekte, Verkäufer-Leads teuer, lange Verkaufszyklen
• Was sie wollen: Exklusive Objekte, qualifizierte Leads, kürzere Abschlusszeiten`,
  'Handwerker': `• Typische Probleme: Fachkräftemangel, Terminplanung, Preisdruck
• Entscheidungsträger: Meister, Inhaber
• Pain Points: Unzuverlässige Anfragen, Preisverhandlungen, keine Zeit für Marketing
• Was sie wollen: Qualitätsaufträge, faire Preise, voller Terminkalender`,
  'Agenturen': `• Typische Probleme: Kundenakquise, Projektabhängigkeit, Preisdruck bei Pitches
• Entscheidungsträger: Geschäftsführer, Head of Marketing/Sales
• Pain Points: Zu wenig Leads, hoher Pitch-Aufwand, schwankende Auslastung
• Was sie wollen: Planbare Neukunden, höhere Margen, langfristige Retainer`,
  'Software-Unternehmen': `• Typische Probleme: Lange Sales-Cycles, technische Erklärungsnot, Konkurrenz
• Entscheidungsträger: CEO, CTO, Head of Sales
• Pain Points: Hohe CAC, schwierige Demo-Buchungen, Churn
• Was sie wollen: Qualifizierte Leads, kürzere Sales-Cycles, mehr MRR`,
  'E-Commerce': `• Typische Probleme: Hohe Werbekosten, Amazon-Konkurrenz, Margen-Druck
• Entscheidungsträger: Shop-Inhaber, E-Commerce Manager
• Pain Points: Hohe CPA, niedrige Conversion, Warenkorbabbrüche
• Was sie wollen: Profitables Wachstum, Stammkunden, bessere ROAS`,
  'Coaches': `• Typische Probleme: Positionierung, Vertrauensaufbau, Preisdurchsetzung
• Entscheidungsträger: Coach selbst
• Pain Points: Kaltakquise funktioniert nicht, zu wenig Anfragen, Preisdiskussionen
• Was sie wollen: Premium-Klienten, Autorität, stabiles Einkommen`,
  'Ärzte/Praxen': `• Typische Probleme: Patientenakquise für IGeL, Online-Bewertungen, Konkurrenz
• Entscheidungsträger: Praxisinhaber, Praxismanager
• Pain Points: Zu wenig Privatpatienten, schlechte Google-Sichtbarkeit
• Was sie wollen: Mehr Privatpatienten, bessere Bewertungen, volle Terminbücher`,
  'Anwälte': `• Typische Probleme: Mandantenakquise, Spezialisierung kommunizieren
• Entscheidungsträger: Partner, Kanzleiinhaber
• Pain Points: Zu generische Anfragen, Preisvergleiche, Online-Sichtbarkeit
• Was sie wollen: Passende Mandate, faire Honorare, Reputation`,
  'Steuerberater': `• Typische Probleme: Saisonalität, Digitalisierung, Mandantenbindung
• Entscheidungsträger: Kanzleiinhaber, Partner
• Pain Points: Hoher Aufwand pro Mandat, schwierige Neukunden-Akquise
• Was sie wollen: Rentable Mandate, weniger Kleinarbeit, Wachstum`,
  'Fitnessstudios': `• Typische Probleme: Hohe Fluktuation, Konkurrenz, Mitgliederbindung
• Entscheidungsträger: Studio-Inhaber, Manager
• Pain Points: Kündigungen, schwache Neukunden-Gewinnung, Auslastung
• Was sie wollen: Mehr Mitglieder, bessere Bindung, höhere Umsätze`,
  'Fotografen': `• Typische Probleme: Preisdruck, Konkurrenz durch Smartphones, Akquise
• Entscheidungsträger: Fotograf selbst
• Pain Points: Zu wenig hochwertige Aufträge, Preisverhandlungen
• Was sie wollen: Premium-Kunden, faire Preise, voller Kalender`,
  'Friseure': `• Typische Probleme: Fachkräftemangel, Konkurrenz, Kundenbindung
• Entscheidungsträger: Salon-Inhaber
• Pain Points: Leere Stühle, Stammkunden verlieren, Online-Buchungen
• Was sie wollen: Volle Auslastung, treue Kunden, gute Mitarbeiter`,
  'Autohäuser': `• Typische Probleme: Online-Konkurrenz, lange Entscheidungszyklen
• Entscheidungsträger: Geschäftsführer, Verkaufsleiter
• Pain Points: Zu wenig Probefahrten, Online-Anfragen konvertieren schlecht
• Was sie wollen: Mehr Leads, bessere Conversion, höhere Margen`,
  'default': `• Analysiere typische Herausforderungen der Branche
• Identifiziere die relevanten Entscheidungsträger
• Verstehe die größten Pain Points und Wünsche
• Entwickle passende Ansprache-Strategie`
}

// Framework-Begründungen für Extended Reasoning
const frameworkReasonings: Record<FrameworkType, string> = {
  'quick-question': `Warum dieses Framework?
→ Kurze Fragen haben hohe Antwortquoten
→ Der Empfänger muss sich nicht festlegen
→ Öffnet Tür für Follow-up ohne Druck
→ Perfekt wenn Ansprechpartner unklar ist`,
  'third-party': `Warum dieses Framework?
→ Nutzt soziale Dynamik im Unternehmen
→ Mitarbeiter helfen gerne weiter
→ Umgeht Gatekeeper elegant
→ Wirkt weniger wie Kaltakquise`,
  'pas': `Warum dieses Framework?
→ Problem-Agitate-Solve ist bewährt
→ Spricht Schmerz direkt an
→ Zeigt Verständnis für Situation
→ Positioniert dich als Problemlöser`,
  'aida': `Warum dieses Framework?
→ Attention durch konkrete Zahlen
→ Interest durch relevante Ergebnisse
→ Desire durch Erfolgsgeschichten
→ Action durch klaren CTA`,
  'straight-business': `Warum dieses Framework?
→ Respektiert die Zeit des Empfängers
→ Kein Drumherum, direkt zum Punkt
→ Zeigt Professionalität
→ Ideal für beschäftigte Entscheider`,
  'paint-picture': `Warum dieses Framework?
→ Emotionale Ansprache wirkt
→ Vision schlägt Features
→ Empfänger sieht sich im Erfolg
→ Differenziert von Standard-Mails`,
  'something-useful': `Warum dieses Framework?
→ Gibt bevor es nimmt
→ Baut Vertrauen auf
→ Zeigt Expertise
→ Weniger aggressiv, mehr hilfreich`
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
  const target = analysis.target || 'Unternehmen'
  const offer = analysis.offer || 'Service'

  let reasoning = `🔍 ANALYSE DEINER ANFRAGE\n`
  reasoning += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`

  // Phase 1: Prompt verstehen
  reasoning += `📋 WAS ICH VERSTANDEN HABE:\n`
  reasoning += `• Zielgruppe: ${target}\n`
  reasoning += `• Dein Angebot: ${offer}\n`
  if (analysis.noBrainer) {
    reasoning += `• No-Brainer: ${analysis.noBrainer}\n`
  }
  reasoning += `\n`

  // Phase 2: Zielgruppen-Analyse
  reasoning += `👥 ZIELGRUPPEN-ANALYSE: ${target.toUpperCase()}\n`
  reasoning += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  reasoning += (targetInsights[target] || targetInsights['default']) + `\n\n`

  // Phase 3: Angebots-Fit
  reasoning += `🎯 WARUM ${offer.toUpperCase()} FÜR ${target.toUpperCase()}?\n`
  reasoning += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  reasoning += getOfferFit(target, offer) + `\n\n`

  // Phase 4: Framework-Entscheidung
  reasoning += `📧 FRAMEWORK-AUSWAHL: ${frameworkNames[framework].toUpperCase()}\n`
  reasoning += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  reasoning += frameworkReasonings[framework] + `\n\n`

  // Phase 5: No-Brainer Strategie
  reasoning += `💎 NO-BRAINER STRATEGIE\n`
  reasoning += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  reasoning += getNoBrainerStrategy(analysis, target, offer) + `\n\n`

  // Phase 6: Email wird gebaut
  reasoning += `✍️ GENERIERE EMAIL...\n`
  reasoning += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  reasoning += `Baue personalisierte Email mit:\n`
  reasoning += `• Konkreten Werten statt Platzhaltern\n`
  reasoning += `• Branchenspezifischem Nutzenversprechen\n`
  reasoning += `• Passendem No-Brainer Offer\n`
  reasoning += `• Klarem Call-to-Action`

  return reasoning
}

function getOfferFit(target: string, offer: string): string {
  const fits: Record<string, Record<string, string>> = {
    'Entrümpelungsdienste': {
      'Google Ads': `${target} suchen aktiv auf Google nach Entrümpelungsdiensten.
→ Hohe Kaufabsicht bei Google-Suchen ("Entrümpelung [Stadt]")
→ Lokale Kampagnen mit geringem Streuverlust möglich
→ Sofortige Sichtbarkeit bei relevanten Suchanfragen`,
      'SEO': `Organische Suche ist Hauptkanal für ${target}.
→ Langfristig kostengünstige Leads
→ Vertrauensvorsprung durch Top-Rankings
→ Lokales SEO besonders effektiv`,
      'default': `Passende Lösung für die Herausforderungen von ${target}.
→ Adressiert die Kernprobleme der Branche
→ Nachweisbare Ergebnisse möglich
→ Klarer ROI für den Kunden`
    },
    'Agenturen': {
      'Google Ads': `${target} können ihren Kunden Google Ads als Service anbieten.
→ Zusätzliche Einnahmequelle durch Ads-Management
→ Bessere Kundenbindung durch mehr Services
→ Höhere Retainer durch Performance-Marketing`,
      'default': `Unterstützt ${target} bei ihren Kernherausforderungen.
→ Hilft bei der Kundenakquise
→ Stärkt die Wettbewerbsposition
→ Ermöglicht planbares Wachstum`
    },
    'default': {
      'Google Ads': `${offer} ist perfekt für ${target}:
→ Erreicht Kunden genau wenn sie suchen
→ Messbare Ergebnisse und klarer ROI
→ Skalierbar je nach Budget und Kapazität
→ Schnelle Resultate innerhalb von Tagen`,
      'SEO': `${offer} ist ideal für ${target}:
→ Langfristig kostengünstige Kundengewinnung
→ Baut Vertrauen und Autorität auf
→ Nachhaltiger Traffic ohne laufende Werbekosten
→ Lokale Sichtbarkeit bei relevanten Suchen`,
      'Webdesign': `${offer} ist wichtig für ${target}:
→ Erste Eindruck entscheidet über Vertrauen
→ Professionelle Website = mehr Conversions
→ Mobile Optimierung heute unverzichtbar
→ Differenzierung vom Wettbewerb`,
      'default': `${offer} passt zu ${target}:
→ Löst konkrete Probleme der Branche
→ Nachweisbarer Mehrwert möglich
→ Unterstützt die Geschäftsziele
→ Gutes Preis-Leistungs-Verhältnis`
    }
  }

  const targetFits = fits[target] || fits['default']
  return targetFits[offer] || targetFits['default']
}

function getNoBrainerStrategy(analysis: PromptAnalysis, target: string, offer: string): string {
  if (analysis.noBrainer) {
    return `User hat No-Brainer angegeben: "${analysis.noBrainer}"
→ Nutze diesen direkt in der Email
→ Betone den risikofreien Einstieg
→ Mache es dem Empfänger leicht zu antworten`
  }

  const offerList = noBrainerOffers[offer] || noBrainerOffers['default']
  return `Kein No-Brainer angegeben - generiere passenden:

Empfohlene No-Brainer für ${offer}:
${offerList.map((o, i) => `${i + 1}. ${o}`).join('\n')}

→ Wähle Option 1 für die Email
→ Zeige weitere als Suggestions
→ No-Brainer senkt die Hemmschwelle zur Antwort`
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

// Dynamische Varianten für Email-Teile
function randomVariant<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateEmailByFramework(
  analysis: PromptAnalysis,
  formal: boolean,
  framework: FrameworkType
): { subject: string; body: string; signature: string } {
  const you = formal ? 'Sie' : 'du'
  const youAccusative = formal ? 'Sie' : 'dich' // Akkusativ für "für dich/Sie"
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

  // Dynamische CTA-Varianten
  const ctaVariants = formal ? [
    `Haben Sie diese Woche Zeit für ein kurzes Gespräch?`,
    `Wann passt es Ihnen diese Woche für 15 Minuten?`,
    `Hätten Sie Zeit für ein kurzes Telefonat?`,
    `Ich freue mich auf Ihre Rückmeldung.`,
    `Passt Ihnen diese oder nächste Woche für ein kurzes Gespräch?`
  ] : [
    `Hast du diese Woche Zeit für ein kurzes Gespräch?`,
    `Wann passt es dir diese Woche für 15 Minuten?`,
    `Hättest du Zeit für ein kurzes Telefonat?`,
    `Lass uns kurz sprechen - wann passt es dir?`,
    `Passt dir diese oder nächste Woche für einen kurzen Call?`
  ]

  // Dynamische Social Proof Varianten
  const socialProofVariants = formal ? [
    `In den letzten Monaten haben wir über 50 Unternehmen in Ihrer Branche geholfen, bessere Ergebnisse zu erzielen.`,
    `Wir arbeiten bereits erfolgreich mit dutzenden ${target} zusammen.`,
    `Unsere Kunden aus Ihrer Branche erzielen regelmäßig beeindruckende Resultate.`,
    `Ich habe in den letzten 12 Monaten zahlreichen ${target} geholfen, ${benefit}.`
  ] : [
    `In den letzten Monaten haben wir über 50 Unternehmen in deiner Branche geholfen, bessere Ergebnisse zu erzielen.`,
    `Wir arbeiten bereits erfolgreich mit dutzenden ${target} zusammen.`,
    `Unsere Kunden aus deiner Branche erzielen regelmäßig beeindruckende Resultate.`,
    `Ich habe in den letzten 12 Monaten zahlreichen ${target} geholfen, ${benefit}.`
  ]

  // Dynamische Opening Varianten pro Framework
  const openingVariants: Record<FrameworkType, string[]> = {
    'quick-question': formal ? [
      `ich arbeite mit ${target} zusammen und unterstütze sie dabei, ${benefit}.`,
      `ich helfe ${target} dabei, ${benefit}.`,
      `mein Schwerpunkt liegt auf der Zusammenarbeit mit ${target}, um ${benefit}.`
    ] : [
      `ich arbeite mit ${target} zusammen und helfe ihnen dabei, ${benefit}.`,
      `ich unterstütze ${target} dabei, ${benefit}.`,
      `mein Fokus: ${target} dabei helfen, ${benefit}.`
    ],
    'third-party': formal ? [
      `ich bin auf Ihr Profil gestoßen und hoffe, Sie können mir kurz weiterhelfen.`,
      `ich habe Ihr Unternehmen entdeckt und wollte fragen, ob Sie mir kurz helfen könnten.`,
      `bei meiner Recherche bin ich auf Sie gestoßen.`
    ] : [
      `ich bin auf dein Profil gestoßen und hoffe, du kannst mir kurz weiterhelfen.`,
      `ich habe euer Unternehmen entdeckt und wollte fragen, ob du mir kurz helfen könntest.`,
      `bei meiner Recherche bin ich auf dich gestoßen.`
    ],
    'pas': formal ? [
      `viele ${target} kämpfen mit dem gleichen Problem: zu wenig Anfragen bei zu viel Konkurrenz.`,
      `kennen Sie das? Zu wenig planbare Aufträge, zu viel Abhängigkeit vom Zufall.`,
      `${target} berichten mir oft vom selben Problem: unregelmäßige Auftragslage und Preisdruck.`
    ] : [
      `viele ${target} haben das gleiche Problem: zu wenig Anfragen und zu viel Konkurrenz.`,
      `kennst du das? Zu wenig planbare Aufträge, zu viel Abhängigkeit vom Zufall.`,
      `${target} erzählen mir oft vom selben Problem: unregelmäßige Auftragslage und Preisdruck.`
    ],
    'aida': formal ? [
      `was wäre, wenn Sie jeden Monat planbar neue Kunden gewinnen könnten?`,
      `stellen Sie sich vor: Jeden Monat kommen zuverlässig neue Anfragen rein.`,
      `was würde es für Ihr Business bedeuten, wenn Sie sich keine Sorgen mehr um Neukunden machen müssten?`
    ] : [
      `was wäre, wenn du jeden Monat planbar neue Kunden gewinnen könntest?`,
      `stell dir vor: Jeden Monat kommen zuverlässig neue Anfragen rein.`,
      `was würde es für dein Business bedeuten, wenn du dir keine Sorgen mehr um Neukunden machen müsstest?`
    ],
    'straight-business': formal ? [
      `ich helfe ${target} dabei, ${benefit}.`,
      `ich unterstütze ${target} mit ${offer}, um ${benefit}.`,
      `mein Angebot für ${target}: ${benefit}.`
    ] : [
      `ich helfe ${target} dabei, ${benefit}.`,
      `ich unterstütze ${target} mit ${offer}, um ${benefit}.`,
      `kurz und knapp: Ich helfe ${target}, ${benefit}.`
    ],
    'paint-picture': formal ? [
      `stellen Sie sich vor: Jeden Morgen öffnen Sie Ihr Postfach und finden neue Kundenanfragen.`,
      `wie würde es sich anfühlen, jeden Monat planbar neue Kunden zu gewinnen?`,
      `stellen Sie sich vor: Keine Sorgen mehr, ob dieser Monat gut wird.`
    ] : [
      `stell dir vor: Jeden Morgen öffnest du dein Postfach und findest neue Kundenanfragen.`,
      `wie würde es sich anfühlen, jeden Monat planbar neue Kunden zu gewinnen?`,
      `stell dir vor: Keine Sorgen mehr, ob dieser Monat gut wird.`
    ],
    'something-useful': formal ? [
      `ich arbeite viel mit ${target} und habe einen Tipp, der Ihnen helfen könnte.`,
      `bei der Arbeit mit ${target} habe ich etwas Interessantes entdeckt.`,
      `ich möchte eine Beobachtung mit Ihnen teilen, die für ${target} relevant ist.`
    ] : [
      `ich arbeite viel mit ${target} und habe einen Tipp, der dir helfen könnte.`,
      `bei der Arbeit mit ${target} habe ich etwas Interessantes entdeckt.`,
      `ich möchte eine Beobachtung mit dir teilen, die für ${target} relevant ist.`
    ]
  }

  // No-Brainer Einleitung Varianten
  const noBrainerIntros = formal ? [
    `Mein Angebot für Sie:`,
    `Zum Einstieg biete ich Ihnen:`,
    `Unverbindlich für Sie:`,
    `Mein Vorschlag:`
  ] : [
    `Mein Angebot für dich:`,
    `Zum Einstieg biete ich dir:`,
    `Unverbindlich für dich:`,
    `Mein Vorschlag:`
  ]

  let subject = ''
  let body = ''
  const cta = randomVariant(ctaVariants)
  const socialProof = randomVariant(socialProofVariants)
  const opening = randomVariant(openingVariants[framework])
  const noBrainerIntro = randomVariant(noBrainerIntros)

  switch (framework) {
    case 'quick-question':
      subject = randomVariant(['Kurze Frage', 'Eine Frage', 'Schnelle Frage'])
      body = `${greeting} [Name],

${opening}

${formal ? 'Könnten Sie' : 'Könntest du'} mir sagen, wer bei ${formal ? 'Ihnen' : 'euch'} für Marketing und Kundengewinnung zuständig ist?

Würde mich kurz vorstellen und zeigen, wie wir auch ${formal ? 'Ihrem' : 'eurem'} Unternehmen helfen können.

Vielen Dank für ${your}e Hilfe!`
      break

    case 'third-party':
      subject = formal
        ? randomVariant(['Könnten Sie mir weiterhelfen?', 'Kurze Frage', 'Weiterleitung?'])
        : randomVariant(['Könntest du mir weiterhelfen?', 'Kurze Frage', 'Weiterleitung?'])
      body = `${greeting} [Name],

${opening}

Ich helfe ${target} dabei, ${benefit} - und ich denke, dass ${formal ? 'Ihr' : 'euer'} Unternehmen davon profitieren könnte.

Wer wäre die richtige Person, um darüber zu sprechen?

Ich schätze ${your}e Zeit sehr.`
      break

    case 'pas':
      subject = randomVariant([
        `${target}: Mehr Kunden gewinnen`,
        `Für ${target}`,
        `${target} & ${offer}`
      ])
      body = `${greeting} [Name],

${opening}

Das führt zu Umsatzschwankungen und macht die Planung schwer.

Mit ${offer} helfe ich ${target} dabei, ${benefit}.

${noBrainer ? `${noBrainerIntro} ${noBrainer}` : ''}

${cta}`
      break

    case 'aida':
      subject = randomVariant(['Was wäre, wenn...', 'Eine Idee für dich', 'Kurze Frage'])
      body = `${greeting} [Name],

${opening}

${socialProof}

Das Ergebnis: mehr Anfragen, bessere Kunden, weniger Stress.

${noBrainer ? `${noBrainerIntro} ${noBrainer}` : ''}

${cta}`
      break

    case 'straight-business':
      subject = randomVariant([
        `${offer} für ${target}`,
        `Anfrage: ${offer}`,
        `${offer} - kurze Vorstellung`
      ])
      body = `${greeting} [Name],

${opening}

${socialProof}

${noBrainer ? `${noBrainerIntro} ${noBrainer}` : ''}

${cta}`
      break

    case 'paint-picture':
      subject = formal
        ? randomVariant(['Stellen Sie sich vor...', 'Eine Vision', 'Was wäre wenn...'])
        : randomVariant(['Stell dir vor...', 'Eine Vision', 'Was wäre wenn...'])
      body = `${greeting} [Name],

${opening}

Kein Hoffen mehr, ob dieser Monat gut wird. Keine Abhängigkeit von Empfehlungen.

Genau dabei helfe ich ${target} - mit ${offer}.

${noBrainer ? `${noBrainerIntro} ${noBrainer}` : ''}

${cta}`
      break

    case 'something-useful':
      subject = randomVariant([
        `Tipp für ${target}`,
        `Interessant für ${target}`,
        `Kurzer Hinweis`
      ])
      body = `${greeting} [Name],

${opening}

Die erfolgreichsten ${target} setzen auf ${offer}, um ${benefit}.

Falls ${you} ${formal ? 'Interesse haben' : 'Interesse hast'}, zeige ich ${formal ? 'Ihnen' : 'dir'} gerne, wie das konkret funktioniert.

${noBrainer ? `${noBrainerIntro} ${noBrainer}` : ''}

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
