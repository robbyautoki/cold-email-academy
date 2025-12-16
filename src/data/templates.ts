export interface EmailTemplate {
  id: string
  slug: string
  category: TemplateCategory
  title: string
  description: string
  whenToUse: string
  subjectLines: string[]
  body: string
  placeholders: TemplatePlaceholder[]
  tips?: string[]
  stats?: {
    openRate?: string
    replyRate?: string
  }
}

export interface TemplatePlaceholder {
  placeholder: string
  description: string
  example: string
}

export type TemplateCategory = 'erstkontakt' | 'follow-up' | 'meeting-request' | 'spezial'

export interface TemplateCategoryInfo {
  id: TemplateCategory
  title: string
  description: string
  color: string
  bgColor: string
}

export const templateCategories: TemplateCategoryInfo[] = [
  {
    id: 'erstkontakt',
    title: 'Erstkontakt',
    description: 'Perfekte erste Nachricht für kalte Kontakte',
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20'
  },
  {
    id: 'follow-up',
    title: 'Follow-Up',
    description: 'Nachfass-Emails die konvertieren',
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20'
  },
  {
    id: 'meeting-request',
    title: 'Meeting Request',
    description: 'Termine effektiv vereinbaren',
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20'
  },
  {
    id: 'spezial',
    title: 'Spezial',
    description: 'Referrals, Re-Engagement & mehr',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted'
  }
]

export const templates: EmailTemplate[] = [
  // ==================== ERSTKONTAKT (8 Templates) ====================
  {
    id: '1',
    slug: 'der-direkte-ansatz',
    category: 'erstkontakt',
    title: 'Der Direkte Ansatz',
    description: 'Komm direkt zum Punkt und zeige, dass du ihre Zeit respektierst.',
    whenToUse: 'Wenn du busy Entscheider kontaktierst, die keine Zeit für Smalltalk haben.',
    subjectLines: [
      'Kurze Frage zu {{company}}',
      '{{firstName}}, schnelle Idee für {{company}}',
      '15 Sek. Frage'
    ],
    body: `Hallo {{firstName}},

ich komme direkt zum Punkt: {{company}} könnte mit {{solution}} {{benefit}} erreichen.

Wir haben das für {{similar_company}} umgesetzt - Ergebnis: {{result}}.

Lohnt sich ein 15-minütiger Call diese Woche?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname des Empfängers', example: 'Max' },
      { placeholder: '{{company}}', description: 'Firmenname', example: 'Muster GmbH' },
      { placeholder: '{{solution}}', description: 'Deine Lösung/Produkt', example: 'automatisiertem Outreach' },
      { placeholder: '{{benefit}}', description: 'Konkreter Nutzen', example: '30% mehr Meetings' },
      { placeholder: '{{similar_company}}', description: 'Ähnliche Referenz', example: 'TechStart AG' },
      { placeholder: '{{result}}', description: 'Erreichtes Ergebnis', example: '45 neue Enterprise-Kunden in 3 Monaten' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Anna' }
    ],
    tips: [
      'Halte die Email unter 100 Wörtern',
      'Nutze einen konkreten Social Proof',
      'Stelle nur EINE Frage am Ende'
    ],
    stats: { replyRate: '12%' }
  },
  {
    id: '2',
    slug: 'der-wert-zuerst-ansatz',
    category: 'erstkontakt',
    title: 'Der Wert-zuerst Ansatz',
    description: 'Liefere sofort Mehrwert, bevor du etwas verlangst.',
    whenToUse: 'Wenn du eine wertvolle Insight oder Ressource hast, die relevant ist.',
    subjectLines: [
      'Idee für {{company}} (kein Pitch)',
      '{{firstName}}, das könnte dir helfen',
      'Fand das bei der Recherche zu {{company}}'
    ],
    body: `Hallo {{firstName}},

ich habe mich mit {{company}} beschäftigt und mir ist aufgefallen, dass {{observation}}.

Hier ist ein konkreter Tipp: {{value_tip}}

Falls das hilfreich war - ich helfe Teams wie deinem dabei, {{outcome}} zu erreichen. Hätte aber erstmal keine Erwartung an ein Gespräch.

Viel Erfolg!
{{your_name}}

PS: {{additional_value}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Lisa' },
      { placeholder: '{{company}}', description: 'Firmenname', example: 'Digital Solutions' },
      { placeholder: '{{observation}}', description: 'Was dir aufgefallen ist', example: 'eure Landing Page könnte mehr Conversions erzielen' },
      { placeholder: '{{value_tip}}', description: 'Konkreter Tipp', example: 'Ein A/B Test der Headline könnte 20%+ Uplift bringen' },
      { placeholder: '{{outcome}}', description: 'Was du ermöglichst', example: 'ihre Conversion Rate zu verdoppeln' },
      { placeholder: '{{additional_value}}', description: 'Extra-Mehrwert', example: 'Hier ist ein Guide zu dem Thema: [Link]' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Max' }
    ],
    tips: [
      'Der Tipp muss wirklich wertvoll sein - keine leeren Versprechen',
      'Recherchiere gründlich vor dem Versand',
      'Das PS ist optional aber erhöht oft die Response'
    ],
    stats: { replyRate: '15%' }
  },
  {
    id: '3',
    slug: 'der-personalisierte',
    category: 'erstkontakt',
    title: 'Der Personalisierte',
    description: 'Zeige, dass du dich wirklich mit der Person beschäftigt hast.',
    whenToUse: 'Für High-Value Prospects bei denen sich intensive Recherche lohnt.',
    subjectLines: [
      'Zu deinem Post über {{topic}}',
      '{{firstName}}, Glückwunsch zu {{achievement}}',
      'Dein Talk bei {{event}} war super'
    ],
    body: `Hallo {{firstName}},

{{personalized_opener}}

Das hat mich zum Nachdenken gebracht: {{connection_to_your_offer}}

Ich arbeite mit {{target_audience}} zusammen, die ähnliche Herausforderungen haben. {{brief_value_prop}}.

Wäre es interessant, sich mal darüber auszutauschen?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Sarah' },
      { placeholder: '{{personalized_opener}}', description: 'Persönlicher Einstieg', example: 'Dein LinkedIn Post über Remote-Führung hat mich beeindruckt - besonders der Punkt zu asynchroner Kommunikation.' },
      { placeholder: '{{connection_to_your_offer}}', description: 'Verbindung zu deinem Angebot', example: 'Wie geht ihr mit der Messung von Remote-Produktivität um?' },
      { placeholder: '{{target_audience}}', description: 'Deine Zielgruppe', example: 'Remote-First Unternehmen' },
      { placeholder: '{{brief_value_prop}}', description: 'Kurzes Wertversprechen', example: 'Wir helfen ihnen, die Team-Performance um 40% zu steigern' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Tim' }
    ],
    tips: [
      'Mindestens 10 Minuten pro Prospect recherchieren',
      'LinkedIn, Twitter und Blogposts sind goldwerte Quellen',
      'Der Opener muss authentisch sein - kein Fake-Lob'
    ],
    stats: { replyRate: '18%' }
  },
  {
    id: '4',
    slug: 'der-problem-loeser',
    category: 'erstkontakt',
    title: 'Der Problem-Löser',
    description: 'Sprich ein konkretes Problem an, das du lösen kannst.',
    whenToUse: 'Wenn du ein spezifisches Problem identifiziert hast.',
    subjectLines: [
      '{{problem}} bei {{company}}?',
      'Lösung für {{pain_point}}',
      'Das haben andere {{industry}} Unternehmen gemacht'
    ],
    body: `Hallo {{firstName}},

viele {{role}} in {{industry}} kämpfen mit {{problem}}.

Das führt oft zu {{negative_consequence}}.

Wir haben einen Ansatz entwickelt, der {{solution_preview}}.

{{case_study_teaser}}

Interessiert dich, wie das funktioniert?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Julia' },
      { placeholder: '{{role}}', description: 'Rolle/Position', example: 'Sales Leader' },
      { placeholder: '{{industry}}', description: 'Branche', example: 'SaaS' },
      { placeholder: '{{problem}}', description: 'Das Problem', example: 'zu wenig qualifizierte Leads' },
      { placeholder: '{{negative_consequence}}', description: 'Negative Folge', example: 'verpasste Revenue-Ziele und Frustration im Team' },
      { placeholder: '{{solution_preview}}', description: 'Lösungsvorschau', example: 'die Lead-Qualität um 60% verbessert' },
      { placeholder: '{{case_study_teaser}}', description: 'Fallstudie Teaser', example: 'Ein ähnliches Unternehmen hat damit 150 neue Enterprise-Deals gewonnen.' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Michael' }
    ],
    tips: [
      'Das Problem muss echt und relevant sein',
      'Nutze Zahlen wo möglich',
      'Der Case Study Teaser macht neugierig'
    ],
    stats: { replyRate: '11%' }
  },
  {
    id: '5',
    slug: 'der-social-proof',
    category: 'erstkontakt',
    title: 'Der Social Proof',
    description: 'Nutze die Kraft von Referenzen und bekannten Namen.',
    whenToUse: 'Wenn du starke Case Studies oder bekannte Kunden hast.',
    subjectLines: [
      'Wie {{known_company}} {{result}} erreicht hat',
      '{{company}} + {{your_company}}?',
      'Das hat bei {{industry_leader}} funktioniert'
    ],
    body: `Hallo {{firstName}},

{{known_company}} stand vor der gleichen Herausforderung wie {{company}}: {{challenge}}.

Mit unserem Ansatz haben sie {{result}} erreicht.

Ich denke, das könnte auch für euch funktionieren, weil {{specific_reason}}.

Sollen wir kurz sprechen, ob das Sinn ergibt?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Daniel' },
      { placeholder: '{{known_company}}', description: 'Bekannte Referenz', example: 'Zalando' },
      { placeholder: '{{company}}', description: 'Empfänger-Firma', example: 'ModePlus' },
      { placeholder: '{{challenge}}', description: 'Die Herausforderung', example: 'Kundenbindung im E-Commerce zu verbessern' },
      { placeholder: '{{result}}', description: 'Erreichtes Ergebnis', example: '+35% Customer Lifetime Value in 6 Monaten' },
      { placeholder: '{{specific_reason}}', description: 'Warum es passt', example: 'ihr seid in einer ähnlichen Wachstumsphase' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Laura' }
    ],
    tips: [
      'Nutze nur echte, überprüfbare Referenzen',
      'Die Referenz sollte relevant für den Empfänger sein',
      'Zu viel Name-Dropping wirkt arrogant'
    ],
    stats: { replyRate: '14%' }
  },
  {
    id: '6',
    slug: 'der-frage-opener',
    category: 'erstkontakt',
    title: 'Der Frage-Opener',
    description: 'Starte mit einer Frage, die zum Nachdenken anregt.',
    whenToUse: 'Wenn du Engagement und Interaktion fördern willst.',
    subjectLines: [
      'Kurze Frage, {{firstName}}',
      'Macht ihr das auch so?',
      'Wie geht {{company}} mit {{topic}} um?'
    ],
    body: `Hallo {{firstName}},

{{provocative_question}}

Ich frage, weil {{reason_for_question}}.

Die meisten {{target_group}} sagen uns, dass {{common_answer}}.

Falls das bei euch ähnlich ist - ich hätte eine Idee, wie {{benefit}}.

Wie ist eure Situation?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Markus' },
      { placeholder: '{{provocative_question}}', description: 'Interessante Frage', example: 'Wie viele Leads gehen bei euch zwischen Marketing und Sales verloren?' },
      { placeholder: '{{reason_for_question}}', description: 'Warum du fragst', example: 'wir sehen das oft bei B2B SaaS Unternehmen eurer Größe' },
      { placeholder: '{{target_group}}', description: 'Zielgruppe', example: 'B2B Marketing Teams' },
      { placeholder: '{{common_answer}}', description: 'Typische Antwort', example: 'bis zu 40% der Leads fallen durch' },
      { placeholder: '{{benefit}}', description: 'Dein Benefit', example: 'man das auf unter 10% reduzieren kann' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Stefan' }
    ],
    tips: [
      'Die Frage sollte nicht mit Ja/Nein beantwortbar sein',
      'Sie sollte einen Pain Point antriggern',
      'Vermeide aggressive oder anklagende Fragen'
    ],
    stats: { replyRate: '13%' }
  },
  {
    id: '7',
    slug: 'der-trigger-event',
    category: 'erstkontakt',
    title: 'Der Trigger-Event',
    description: 'Nutze aktuelle Events als natürlichen Gesprächsanlass.',
    whenToUse: 'Bei Funding, Expansion, neuen Hires oder anderen News.',
    subjectLines: [
      'Glückwunsch zur Series {{funding_round}}!',
      'Zu eurer Expansion nach {{market}}',
      'Sah gerade: {{news}}'
    ],
    body: `Hallo {{firstName}},

Glückwunsch zu {{trigger_event}}! {{positive_comment}}

Das bringt sicher auch neue Herausforderungen mit sich, besonders {{related_challenge}}.

Ich arbeite genau in diesem Bereich und helfe {{similar_companies}} dabei, {{outcome}}.

Macht es Sinn, kurz zu sprechen wie das bei euch aussieht?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Christina' },
      { placeholder: '{{trigger_event}}', description: 'Das Event', example: 'eurer Series B' },
      { placeholder: '{{positive_comment}}', description: 'Positiver Kommentar', example: '15 Millionen ist beeindruckend - das Vertrauen der Investoren spricht für sich.' },
      { placeholder: '{{related_challenge}}', description: 'Verwandte Herausforderung', example: 'beim schnellen Skalieren des Sales Teams' },
      { placeholder: '{{similar_companies}}', description: 'Ähnliche Unternehmen', example: 'Post-Series-B Startups' },
      { placeholder: '{{outcome}}', description: 'Ergebnis', example: 'in 90 Tagen von 5 auf 20 Sales Reps zu skalieren' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Felix' }
    ],
    tips: [
      'Timing ist alles - innerhalb von 48h nach dem Event',
      'Google Alerts und LinkedIn sind deine Freunde',
      'Die Verbindung zum Event muss logisch sein'
    ],
    stats: { replyRate: '16%' }
  },
  {
    id: '8',
    slug: 'der-compliment-opener',
    category: 'erstkontakt',
    title: 'Der Compliment-Opener',
    description: 'Starte mit einem authentischen Kompliment.',
    whenToUse: 'Wenn du wirklich beeindruckt bist von etwas.',
    subjectLines: [
      'Wow, {{achievement}}!',
      '{{firstName}}, das hat mich inspiriert',
      'Respekt für {{accomplishment}}'
    ],
    body: `Hallo {{firstName}},

ich wollte dir kurz sagen: {{genuine_compliment}}

Das zeigt {{what_it_demonstrates}}.

Ich beschäftige mich beruflich mit {{your_area}} und bin neugierig: {{related_question}}

Würde mich über einen Austausch freuen - ganz ohne Hintergedanken.

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Nina' },
      { placeholder: '{{genuine_compliment}}', description: 'Echtes Kompliment', example: 'Eure neue Produktseite ist brillant. Die Art wie ihr komplexe Features simpel erklärt - Chapeau.' },
      { placeholder: '{{what_it_demonstrates}}', description: 'Was es zeigt', example: 'dass ihr eure Kunden wirklich versteht' },
      { placeholder: '{{your_area}}', description: 'Dein Bereich', example: 'Conversion Optimierung' },
      { placeholder: '{{related_question}}', description: 'Verwandte Frage', example: 'Habt ihr die Änderung A/B getestet oder war das ein kompletter Relaunch?' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Tom' }
    ],
    tips: [
      'Das Kompliment MUSS echt sein - Fake ist sofort erkennbar',
      'Sei spezifisch - nicht "tolle Website" sondern konkret was',
      'Nicht übertreiben - subtil ist besser'
    ],
    stats: { replyRate: '10%' }
  },

  // ==================== FOLLOW-UP (8 Templates) ====================
  {
    id: '9',
    slug: 'der-sanfte-reminder',
    category: 'follow-up',
    title: 'Der sanfte Reminder',
    description: 'Höfliche Erinnerung ohne aufdringlich zu sein.',
    whenToUse: '3-4 Tage nach der ersten Email ohne Antwort.',
    subjectLines: [
      'Re: {{original_subject}}',
      'Kurzer Check-in',
      '{{firstName}}, noch aktuell?'
    ],
    body: `Hallo {{firstName}},

ich wollte nur kurz nachfragen, ob du meine letzte Nachricht gesehen hast?

Ich verstehe, dass du viel um die Ohren hast. Falls das Thema {{topic}} gerade nicht relevant ist - kein Problem, lass es mich einfach wissen.

Falls doch: {{value_reminder}}

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Alex' },
      { placeholder: '{{original_subject}}', description: 'Ursprünglicher Betreff', example: 'Kurze Frage zu TechCorp' },
      { placeholder: '{{topic}}', description: 'Das Thema', example: 'Lead Generation' },
      { placeholder: '{{value_reminder}}', description: 'Erinnerung an Mehrwert', example: 'Wir könnten euch helfen, 50% mehr qualifizierte Leads zu generieren.' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Paul' }
    ],
    tips: [
      'Kein Schuldgefühl erzeugen',
      'Biete einen einfachen Ausweg an',
      'Halte es kurz'
    ]
  },
  {
    id: '10',
    slug: 'der-mehrwert-follow-up',
    category: 'follow-up',
    title: 'Der Mehrwert-Follow-Up',
    description: 'Liefere zusätzlichen Wert statt nur nachzufragen.',
    whenToUse: 'Wenn du etwas Neues und Relevantes teilen kannst.',
    subjectLines: [
      'Fand das für dich',
      '{{firstName}}, das könnte relevant sein',
      'Passend zu unserem Thema'
    ],
    body: `Hallo {{firstName}},

ich bin über {{valuable_content}} gestolpert und musste an unser Gespräch denken.

{{why_its_relevant}}

Hier der Link: {{link}}

Falls du Fragen dazu hast oder das Thema {{topic}} doch interessant wird - melde dich gerne.

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Sabine' },
      { placeholder: '{{valuable_content}}', description: 'Wertvoller Content', example: 'diese Studie zu B2B Buying Behavior 2024' },
      { placeholder: '{{why_its_relevant}}', description: 'Warum relevant', example: 'Besonders Seite 12 zeigt, warum Personalisierung so wichtig ist.' },
      { placeholder: '{{link}}', description: 'Link zum Content', example: '[Link zur Studie]' },
      { placeholder: '{{topic}}', description: 'Euer Thema', example: 'personalisiertes Outreach' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Maria' }
    ],
    tips: [
      'Der Content muss wirklich wertvoll sein',
      'Erkläre kurz warum es relevant ist',
      'Kein Pitch - nur Mehrwert'
    ]
  },
  {
    id: '11',
    slug: 'der-ich-hab-was-gefunden',
    category: 'follow-up',
    title: 'Der "Ich hab was gefunden"',
    description: 'Teile eine spezifische Insight über ihr Unternehmen.',
    whenToUse: 'Wenn du etwas Konkretes gefunden hast.',
    subjectLines: [
      'Fiel mir auf bei {{company}}',
      '{{firstName}}, Idee zu {{topic}}',
      'Sah das auf eurer Website'
    ],
    body: `Hallo {{firstName}},

ich habe mir {{company}} nochmal angeschaut und mir ist aufgefallen: {{specific_insight}}

Das ist relevant, weil {{why_it_matters}}.

Hier ist was andere in der Situation machen: {{solution_hint}}

Macht das Sinn für einen kurzen Austausch?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Jan' },
      { placeholder: '{{company}}', description: 'Firmenname', example: 'DataFlow' },
      { placeholder: '{{specific_insight}}', description: 'Spezifische Beobachtung', example: 'Eure Karriereseite zeigt 5 offene Sales-Stellen - ihr skaliert gerade das Team.' },
      { placeholder: '{{why_it_matters}}', description: 'Warum es relevant ist', example: 'In dieser Phase verlieren viele Unternehmen Momentum weil das Onboarding nicht skaliert' },
      { placeholder: '{{solution_hint}}', description: 'Lösungshinweis', example: 'Ein strukturiertes Sales Playbook verkürzt die Ramp-Up Zeit um 40%' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Lena' }
    ],
    tips: [
      'Die Insight muss echt sein - nicht erfunden',
      'Zeige dass du recherchiert hast',
      'Verbinde es mit deinem Angebot'
    ]
  },
  {
    id: '12',
    slug: 'der-zeitdruck',
    category: 'follow-up',
    title: 'Der Zeitdruck',
    description: 'Schaffe einen legitimen Grund für zeitnahe Entscheidung.',
    whenToUse: 'Wenn es einen echten zeitlichen Grund gibt.',
    subjectLines: [
      'Noch bis {{deadline}}',
      '{{firstName}}, bevor es losgeht',
      'Diese Woche noch möglich'
    ],
    body: `Hallo {{firstName}},

ich wollte mich nochmal melden, weil {{legitimate_reason_for_urgency}}.

{{what_they_would_miss}}

Falls {{topic}} gerade nicht passt, verstehe ich das völlig. Ich wollte nur sichergehen, dass es nicht am Timing scheitert.

Kann ich dir bei der Entscheidung irgendwie helfen?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Robert' },
      { placeholder: '{{legitimate_reason_for_urgency}}', description: 'Echter Zeitgrund', example: 'wir nächste Woche unsere Preise anpassen' },
      { placeholder: '{{what_they_would_miss}}', description: 'Was sie verpassen', example: 'Bis Freitag könntest du noch zum aktuellen Preis einsteigen - spart dir etwa 2.000€ im Jahr.' },
      { placeholder: '{{topic}}', description: 'Das Thema', example: 'unser Enterprise Plan' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Marco' }
    ],
    tips: [
      'NUR verwenden wenn der Zeitdruck echt ist',
      'Fake-Urgency zerstört Vertrauen',
      'Biete Hilfe bei der Entscheidung an'
    ]
  },
  {
    id: '13',
    slug: 'der-alternative-angebot',
    category: 'follow-up',
    title: 'Der Alternative Angebot',
    description: 'Biete eine leichtere Alternative an.',
    whenToUse: 'Wenn der ursprüngliche Ask vielleicht zu groß war.',
    subjectLines: [
      'Andere Idee',
      '{{firstName}}, alternativ...',
      'Vielleicht passt das besser'
    ],
    body: `Hallo {{firstName}},

ich habe nochmal nachgedacht. Vielleicht war {{original_ask}} zu viel auf einmal.

Wie wäre es stattdessen mit {{lighter_alternative}}?

{{why_alternative_makes_sense}}

Klingt das machbarer?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Katharina' },
      { placeholder: '{{original_ask}}', description: 'Ursprüngliche Anfrage', example: 'ein 30-minütiges Demo-Meeting' },
      { placeholder: '{{lighter_alternative}}', description: 'Leichtere Alternative', example: 'einem 5-minütigen Loom Video, das ich dir schicke' },
      { placeholder: '{{why_alternative_makes_sense}}', description: 'Warum die Alternative passt', example: 'So kannst du in deinem Tempo schauen, ob es Sinn ergibt - ohne Kalender-Tetris.' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Sven' }
    ],
    tips: [
      'Die Alternative sollte wirklich einfacher sein',
      'Zeige Verständnis für ihre Zeit',
      'Loom Videos funktionieren sehr gut'
    ]
  },
  {
    id: '14',
    slug: 'der-case-study',
    category: 'follow-up',
    title: 'Der Case Study',
    description: 'Teile eine relevante Erfolgsgeschichte.',
    whenToUse: 'Wenn du eine passende Case Study hast.',
    subjectLines: [
      'Wie {{similar_company}} das gelöst hat',
      'Fall-Beispiel für dich',
      '{{industry}} Case Study'
    ],
    body: `Hallo {{firstName}},

ich dachte, diese Geschichte könnte interessant sein:

{{case_study_summary}}

Das Ergebnis: {{results}}

{{company}} ist in einer ähnlichen Situation - ich glaube, das könnte auch bei euch funktionieren.

Soll ich dir mehr Details schicken?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Thomas' },
      { placeholder: '{{similar_company}}', description: 'Ähnliche Firma aus Case Study', example: 'CloudTech' },
      { placeholder: '{{case_study_summary}}', description: 'Zusammenfassung', example: 'CloudTech hatte das gleiche Problem mit zu langen Sales Cycles. Sie haben unseren Ansatz getestet und...' },
      { placeholder: '{{results}}', description: 'Ergebnisse', example: '45% kürzere Sales Cycles und 2x mehr Abschlüsse pro Quartal' },
      { placeholder: '{{company}}', description: 'Empfänger-Firma', example: 'DataSolutions' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Sandra' }
    ],
    tips: [
      'Die Case Study muss relevant sein',
      'Fokus auf Ergebnisse, nicht Features',
      'Biete mehr Details an statt alles zu erzählen'
    ]
  },
  {
    id: '15',
    slug: 'der-bin-ich-richtig',
    category: 'follow-up',
    title: 'Der "Bin ich richtig?"',
    description: 'Frage ob du die richtige Person kontaktierst.',
    whenToUse: 'Nach mehreren Follow-ups ohne Antwort.',
    subjectLines: [
      'Falscher Ansprechpartner?',
      '{{firstName}}, kurze Frage',
      'Soll ich jemand anderen fragen?'
    ],
    body: `Hallo {{firstName}},

ich habe mich ein paar Mal gemeldet, aber keine Antwort bekommen.

Ich möchte nicht nerven - vielleicht bist du einfach nicht die richtige Person für {{topic}}?

Falls ja: An wen sollte ich mich wenden?
Falls nein: Ist das Thema gerade einfach nicht relevant?

Beides ist völlig okay - ich wüsste nur gerne, woran ich bin.

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Andreas' },
      { placeholder: '{{topic}}', description: 'Das Thema', example: 'Sales Enablement' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Eva' }
    ],
    tips: [
      'Sei respektvoll und nicht passiv-aggressiv',
      'Gib ihnen einen einfachen Ausweg',
      'Oft bekommst du hier endlich eine Antwort'
    ]
  },
  {
    id: '16',
    slug: 'der-breakup',
    category: 'follow-up',
    title: 'Der Breakup (letzter Versuch)',
    description: 'Die letzte Email in der Sequenz.',
    whenToUse: 'Als finale Email nach 4-5 Versuchen.',
    subjectLines: [
      'Schließe das hier ab',
      '{{firstName}}, letzte Nachricht',
      'Soll ich aufhören zu schreiben?'
    ],
    body: `Hallo {{firstName}},

ich habe mich jetzt ein paar Mal gemeldet und werde dich nicht weiter belästigen.

Falls {{topic}} in Zukunft mal relevant wird, weißt du wo du mich findest.

Bis dahin - alles Gute!

{{your_name}}

PS: Falls ich irgendwas falsch gemacht habe oder du Feedback hast - ich höre gerne zu.`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Petra' },
      { placeholder: '{{topic}}', description: 'Das Thema', example: 'Outbound Marketing' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Chris' }
    ],
    tips: [
      'Kein Schuldgefühl erzeugen',
      'Lass die Tür offen für die Zukunft',
      'Das PS funktioniert oft erstaunlich gut'
    ]
  },

  // ==================== MEETING REQUEST (5 Templates) ====================
  {
    id: '17',
    slug: 'der-15-minuten-call',
    category: 'meeting-request',
    title: 'Der 15-Minuten-Call',
    description: 'Kurzes, fokussiertes Meeting anbieten.',
    whenToUse: 'Standardansatz für Meeting-Requests.',
    subjectLines: [
      '15 Min. diese Woche?',
      'Kurzer Call, {{firstName}}?',
      'Quick Sync zu {{topic}}'
    ],
    body: `Hallo {{firstName}},

hättest du diese Woche 15 Minuten für einen kurzen Call?

Ich würde gerne {{meeting_purpose}}.

Keine Vorbereitung nötig - nur ein informeller Austausch.

{{availability}}

Passt dir einer der Slots?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Michelle' },
      { placeholder: '{{meeting_purpose}}', description: 'Zweck des Meetings', example: 'verstehen, wie ihr aktuell Leads generiert und ob unser Ansatz helfen könnte' },
      { placeholder: '{{availability}}', description: 'Deine Verfügbarkeit', example: 'Ich hätte Zeit am Dienstag 10 Uhr, Mittwoch 14 Uhr oder Donnerstag 11 Uhr.' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'David' }
    ],
    tips: [
      '15 Minuten ist der Sweet Spot',
      'Biete 2-3 konkrete Zeiten an',
      'Betone dass es informell ist'
    ]
  },
  {
    id: '18',
    slug: 'der-kalender-link',
    category: 'meeting-request',
    title: 'Der Kalender-Link',
    description: 'Mach es ihnen super einfach zu buchen.',
    whenToUse: 'Wenn du bereits Interesse etabliert hast.',
    subjectLines: [
      'Dein Slot wartet',
      'Hier buchen',
      'Wähle deinen Termin'
    ],
    body: `Hallo {{firstName}},

damit wir nicht ewig Kalender-Tetris spielen:

Hier kannst du dir direkt einen Slot aussuchen: {{calendar_link}}

Ich freue mich auf unser Gespräch!

Beste Grüße
{{your_name}}

PS: Falls keiner der Zeiten passt, schreib mir einfach - ich mache es möglich.`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Lukas' },
      { placeholder: '{{calendar_link}}', description: 'Calendly/Cal.com Link', example: '[Zum Kalender]' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Anna' }
    ],
    tips: [
      'Nutze Tools wie Calendly oder Cal.com',
      'Zeige verfügbare Zeiten für nächste 2 Wochen',
      'Das PS zeigt Flexibilität'
    ]
  },
  {
    id: '19',
    slug: 'der-flexible',
    category: 'meeting-request',
    title: 'Der Flexible',
    description: 'Zeige maximale Flexibilität bei der Terminwahl.',
    whenToUse: 'Für sehr beschäftigte Entscheider.',
    subjectLines: [
      'Wann passt es dir?',
      '{{firstName}}, dein Termin',
      'Flexibel für dich'
    ],
    body: `Hallo {{firstName}},

ich möchte dir keine Termine aufzwängen - du hast sicher einen vollen Kalender.

Wann hätte ein kurzer Austausch zu {{topic}} am besten Platz?

- Diese Woche?
- Nächste Woche?
- In 2 Wochen?

Morgens, mittags oder abends - ich richte mich nach dir.

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Silke' },
      { placeholder: '{{topic}}', description: 'Das Thema', example: 'eurer Sales-Strategie' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Oliver' }
    ],
    tips: [
      'Zeigt Respekt für ihre Zeit',
      'Die Optionen machen es einfach zu antworten',
      'Funktioniert gut bei C-Level'
    ]
  },
  {
    id: '20',
    slug: 'der-konkrete-termin',
    category: 'meeting-request',
    title: 'Der Konkrete Termin',
    description: 'Schlage einen spezifischen Termin vor.',
    whenToUse: 'Wenn du schnell eine Entscheidung brauchst.',
    subjectLines: [
      'Dienstag, 10 Uhr?',
      'Meeting am {{date}}',
      'Termin: {{day}}'
    ],
    body: `Hallo {{firstName}},

wie wäre es mit {{specific_date_time}}?

Agenda:
- {{agenda_point_1}}
- {{agenda_point_2}}
- Nächste Schritte (falls es Sinn ergibt)

30 Minuten max - ich halte mich dran.

Passt dir das?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Bernd' },
      { placeholder: '{{specific_date_time}}', description: 'Konkreter Termin', example: 'Donnerstag, 14. März um 11:00 Uhr' },
      { placeholder: '{{agenda_point_1}}', description: 'Agenda Punkt 1', example: 'Eure aktuelle Situation verstehen' },
      { placeholder: '{{agenda_point_2}}', description: 'Agenda Punkt 2', example: 'Zeigen wie wir ähnlichen Teams geholfen haben' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Johanna' }
    ],
    tips: [
      'Eine klare Agenda zeigt Professionalität',
      'Das Zeitversprechen ist wichtig',
      'Mache es einfach Ja oder Nein zu sagen'
    ]
  },
  {
    id: '21',
    slug: 'der-video-call-pitch',
    category: 'meeting-request',
    title: 'Der Video-Call Pitch',
    description: 'Biete einen Video-Call mit klarem Mehrwert.',
    whenToUse: 'Wenn du etwas Visuelles zeigen möchtest.',
    subjectLines: [
      'Kurze Demo?',
      '{{firstName}}, zeige dir was',
      '15 Min. Video-Call'
    ],
    body: `Hallo {{firstName}},

ich würde dir gerne etwas zeigen, das {{benefit}}.

In 15 Minuten per Video-Call kann ich dir demonstrieren, wie {{what_you_show}}.

Keine Verpflichtung danach - aber ich bin sicher, du nimmst mindestens eine gute Idee mit.

Hast du Zeit für einen kurzen Zoom/Meet Call?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Heike' },
      { placeholder: '{{benefit}}', description: 'Der Benefit', example: 'deine Conversion Rate verdoppeln könnte' },
      { placeholder: '{{what_you_show}}', description: 'Was du zeigst', example: 'andere B2B SaaS Unternehmen ihre Trial-to-Paid Rate um 40% gesteigert haben' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Patrick' }
    ],
    tips: [
      'Demo > Pitch',
      'Halte das Versprechen einer guten Idee',
      'Video-Calls sind persönlicher'
    ]
  },

  // ==================== SPEZIAL (4 Templates) ====================
  {
    id: '22',
    slug: 'referral-request',
    category: 'spezial',
    title: 'Referral Request',
    description: 'Bitte um Weiterempfehlung oder Intro.',
    whenToUse: 'Nach positiver Interaktion oder bei falscher Person.',
    subjectLines: [
      'Kennst du jemanden?',
      '{{firstName}}, eine Bitte',
      'Intro-Anfrage'
    ],
    body: `Hallo {{firstName}},

ich hoffe, es ist okay dass ich frage:

Kennst du jemanden, der {{target_description}}?

Ich suche nach {{what_you_are_looking_for}} und du kamst mir als jemand in den Sinn, der gut vernetzt ist.

Falls dir jemand einfällt, wäre eine kurze Intro super. Falls nicht - absolut kein Problem!

Danke dir,
{{your_name}}

PS: {{incentive_if_any}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Martin' },
      { placeholder: '{{target_description}}', description: 'Wen du suchst', example: 'aktuell das Sales Team skaliert' },
      { placeholder: '{{what_you_are_looking_for}}', description: 'Was du suchst', example: 'B2B SaaS Unternehmen in der Wachstumsphase' },
      { placeholder: '{{incentive_if_any}}', description: 'Anreiz falls vorhanden', example: 'Für jede erfolgreiche Intro gibt es einen 50€ Amazon Gutschein als Dankeschön.' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Claudia' }
    ],
    tips: [
      'Mach es ihnen einfach - beschreibe genau wen du suchst',
      'Biete einen Anreiz wenn möglich',
      'Frag nur Leute die dich kennen und mögen'
    ]
  },
  {
    id: '23',
    slug: 're-engagement',
    category: 'spezial',
    title: 'Re-Engagement (alte Leads)',
    description: 'Kontaktiere Leads die eingeschlafen sind.',
    whenToUse: 'Nach 3-6 Monaten Stille.',
    subjectLines: [
      'Lange her, {{firstName}}',
      'Seitdem hat sich was getan',
      'Update von mir'
    ],
    body: `Hallo {{firstName}},

wir hatten vor einiger Zeit Kontakt wegen {{original_topic}}.

Seitdem ist viel passiert - bei uns: {{your_update}}

Ich wollte mal nachhaken, wie es bei euch läuft. Ist {{topic}} inzwischen relevant geworden?

Falls ja, würde ich gerne zeigen, was sich bei uns getan hat.
Falls nein, freue ich mich trotzdem von dir zu hören!

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Viktor' },
      { placeholder: '{{original_topic}}', description: 'Ursprüngliches Thema', example: 'eurer Outbound-Strategie' },
      { placeholder: '{{your_update}}', description: 'Dein Update', example: 'Wir haben ein neues Feature gelauncht, das die Reply-Rate um 35% steigert.' },
      { placeholder: '{{topic}}', description: 'Das Thema', example: 'Cold Email Outreach' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Ines' }
    ],
    tips: [
      'Bring echte News mit',
      'Erinnere kurz an den Kontext',
      'Mach keinen Druck'
    ]
  },
  {
    id: '24',
    slug: 'event-basiert',
    category: 'spezial',
    title: 'Event-basiert',
    description: 'Nutze Events als Gesprächsanlass.',
    whenToUse: 'Vor/nach Messen, Konferenzen, Webinaren.',
    subjectLines: [
      'Sehen wir uns bei {{event}}?',
      'Nach {{event}} - Austausch?',
      '{{event}} - Let\'s connect'
    ],
    body: `Hallo {{firstName}},

ich habe gesehen, dass du auch bei {{event}} bist/warst.

{{event_connection}}

Ich beschäftige mich mit {{your_area}} - und da gibt es sicher Überschneidungen mit {{their_area}}.

Hättest du Lust auf {{suggested_activity}}?

Beste Grüße
{{your_name}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Thorsten' },
      { placeholder: '{{event}}', description: 'Das Event', example: 'der OMR' },
      { placeholder: '{{event_connection}}', description: 'Verbindung zum Event', example: 'Der Talk zu B2B Marketing war super - besonders der Punkt zu Account-Based Marketing hat mich angesprochen.' },
      { placeholder: '{{your_area}}', description: 'Dein Bereich', example: 'ABM Tools und Strategien' },
      { placeholder: '{{their_area}}', description: 'Ihr Bereich', example: 'eurer Marketing-Strategie' },
      { placeholder: '{{suggested_activity}}', description: 'Vorgeschlagene Aktivität', example: 'einen Kaffee vor Ort oder einen Call danach' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Rebecca' }
    ],
    tips: [
      'Events sind natürliche Gesprächsanlässe',
      'Vor dem Event kontaktieren ist oft besser',
      'Face-to-Face Meetings sind Gold wert'
    ]
  },
  {
    id: '25',
    slug: 'seasonal-zeitbezogen',
    category: 'spezial',
    title: 'Seasonal/Zeitbezogen',
    description: 'Nutze saisonale Anlässe für Outreach.',
    whenToUse: 'Zu Jahresanfang, Q-Ends, Feiertagen.',
    subjectLines: [
      'Pläne für {{time_period}}?',
      '{{time_period}} steht an',
      'Bevor {{time_period}} losgeht'
    ],
    body: `Hallo {{firstName}},

{{seasonal_opener}}

Viele {{target_group}} nutzen diese Zeit um {{relevant_activity}}.

Wir helfen dabei mit {{your_solution}}.

Interessiert dich, wie andere {{similar_companies}} das machen?

Beste Grüße
{{your_name}}

PS: {{seasonal_closer}}`,
    placeholders: [
      { placeholder: '{{firstName}}', description: 'Vorname', example: 'Kerstin' },
      { placeholder: '{{time_period}}', description: 'Zeitraum', example: 'Q1 2024' },
      { placeholder: '{{seasonal_opener}}', description: 'Saisonaler Einstieg', example: 'Das neue Jahr hat begonnen - Zeit für frische Sales-Ziele?' },
      { placeholder: '{{target_group}}', description: 'Zielgruppe', example: 'Sales Leader' },
      { placeholder: '{{relevant_activity}}', description: 'Relevante Aktivität', example: 'ihre Outbound-Strategie zu überdenken' },
      { placeholder: '{{your_solution}}', description: 'Deine Lösung', example: 'datengetriebenen Lead-Listen und Sequenz-Optimierung' },
      { placeholder: '{{similar_companies}}', description: 'Ähnliche Unternehmen', example: 'B2B SaaS Scale-Ups' },
      { placeholder: '{{seasonal_closer}}', description: 'Saisonaler Abschluss', example: 'Frohe neue Ziele!' },
      { placeholder: '{{your_name}}', description: 'Dein Name', example: 'Florian' }
    ],
    tips: [
      'Timing ist wichtig - nicht zu früh oder spät',
      'Verbinde den Anlass mit echtem Mehrwert',
      'Funktioniert gut für Budget-Gespräche zu Jahresanfang'
    ]
  }
]

export function getTemplatesByCategory(category: TemplateCategory): EmailTemplate[] {
  return templates.filter(t => t.category === category)
}

export function getTemplateBySlug(slug: string): EmailTemplate | undefined {
  return templates.find(t => t.slug === slug)
}

export function getCategoryInfo(categoryId: TemplateCategory): TemplateCategoryInfo | undefined {
  return templateCategories.find(c => c.id === categoryId)
}
