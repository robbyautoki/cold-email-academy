// Kurs-Datenstruktur für die Cold Email Academy

export interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'quiz' | 'practice'
  duration: string
  content: string
  videoUrl?: string
  quizQuestions?: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Module {
  id: string
  number: number
  title: string
  description: string
  icon: string
  lessons: Lesson[]
  requiredModuleId?: string
}

export interface Course {
  id: string
  title: string
  description: string
  icon: string
  thumbnail: string
  totalDuration: string
  totalLessons: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  modules: Module[]
}

export interface CourseProgress {
  courseId: string
  completedLessons: string[]
  currentModuleId: string
  currentLessonId: string
  quizScores: { [quizId: string]: number }
  startedAt: string
  lastAccessedAt: string
  completed: boolean
}

// Cold Email Masterclass - Der Hauptkurs
export const coldEmailMasterclass: Course = {
  id: 'cold-email-masterclass',
  title: 'Cold Email Masterclass',
  description: 'Lerne von Grund auf, wie du erfolgreiche Cold Email Kampagnen erstellst, die Antworten generieren.',
  icon: 'Mail',
  thumbnail: '/courses/cold-email-thumb.jpg',
  totalDuration: '4+ Stunden',
  totalLessons: 24,
  difficulty: 'beginner',
  modules: [
    // MODUL 1: Fundament
    {
      id: 'modul-1-fundament',
      number: 1,
      title: 'Fundament - Die Grundlagen',
      description: 'Verstehe die Basics von Cold Email und warum es so effektiv ist.',
      icon: 'BookOpen',
      lessons: [
        {
          id: 'l1-1-was-ist-cold-email',
          title: 'Was ist Cold Email & warum funktioniert es?',
          type: 'text',
          duration: '8 min',
          content: `# Was ist Cold Email?

Cold Email ist eine Methode der direkten Kommunikation, bei der du potenzielle Kunden oder Geschäftspartner per E-Mail kontaktierst – ohne vorherige Beziehung.

## Warum Cold Email?

**1. Direkte Ansprache**
Du erreichst Entscheidungsträger direkt in ihrem Posteingang – ohne Umwege über Gatekeeper.

**2. Skalierbarkeit**
Mit den richtigen Tools kannst du hunderte personalisierte E-Mails pro Tag versenden.

**3. Messbarkeit**
Jede Metrik ist trackbar: Öffnungsraten, Klickraten, Antworten.

**4. Kosteneffizienz**
Im Vergleich zu anderen Akquise-Methoden extrem günstig.

## Die Zahlen sprechen für sich

- 📧 **21%** durchschnittliche Öffnungsrate
- 💬 **1-5%** typische Antwortrate
- 🎯 **8x** höherer ROI als andere Kanäle

## Wann Cold Email NICHT funktioniert

- Spam-artige Massen-Mails ohne Personalisierung
- Keine klare Value Proposition
- Technisches Setup ist mangelhaft
- Keine Follow-Up Strategie

> **Merke:** Cold Email ist kein Spam! Es geht um relevante, wertvolle Kommunikation mit den richtigen Menschen.`
        },
        {
          id: 'l1-2-psychologie',
          title: 'Die Psychologie hinter erfolgreichen Emails',
          type: 'text',
          duration: '10 min',
          content: `# Die Psychologie erfolgreicher Cold Emails

Menschen treffen Entscheidungen emotional – und rechtfertigen sie rational. Deine E-Mail muss beides ansprechen.

## Die 6 Prinzipien der Überzeugung (Cialdini)

### 1. Reziprozität
Gib zuerst Wert, bevor du etwas verlangst.

**Beispiel:** "Ich habe mir eure Website angeschaut und 3 Quick-Wins gefunden, die eure Conversion um 15% steigern könnten..."

### 2. Social Proof
Zeige, dass andere dir vertrauen.

**Beispiel:** "Wir helfen bereits 50+ SaaS-Unternehmen wie [Bekannter Name]..."

### 3. Autorität
Positioniere dich als Experte.

**Beispiel:** "Nach 500+ Audits haben wir ein Muster erkannt..."

### 4. Sympathie
Sei menschlich, nicht roboterhaft.

**Beispiel:** "Ich bin auf LinkedIn über deinen Post zu [Thema] gestolpert – da musste ich dir einfach schreiben."

### 5. Knappheit
Erzeuge (echte) Dringlichkeit.

**Beispiel:** "Wir nehmen nur 3 neue Kunden pro Monat auf..."

### 6. Konsistenz
Kleine Zusagen führen zu größeren.

**Beispiel:** "Wäre ein 15-minütiges Gespräch nächste Woche möglich?"

## Das AIDA-Prinzip in Emails

| Phase | Ziel | Element |
|-------|------|---------|
| **A**ttention | Öffnung | Betreffzeile |
| **I**nterest | Weiterlesen | Erster Satz |
| **D**esire | Wollen | Value Proposition |
| **A**ction | Handeln | CTA |

## Die magische Zahl: 3 Sekunden

Du hast **3 Sekunden**, um den Leser zu überzeugen weiterzulesen.

Das bedeutet:
- Betreffzeile muss neugierig machen
- Erster Satz muss relevant sein
- Keine langen Einleitungen`
        },
        {
          id: 'l1-3-rechtliche-grundlagen',
          title: 'Rechtliche Grundlagen (DSGVO, CAN-SPAM)',
          type: 'text',
          duration: '12 min',
          content: `# Rechtliche Grundlagen für Cold Email

**Wichtig:** Diese Lektion ist keine Rechtsberatung. Konsultiere einen Anwalt für rechtliche Fragen.

## Deutschland / EU: DSGVO & UWG

### Was du darfst (B2B):
✅ Geschäftliche E-Mails an Unternehmen senden
✅ Öffentlich verfügbare Kontaktdaten nutzen
✅ Berechtigtes Interesse als Grundlage

### Was du NICHT darfst:
❌ Private E-Mail-Adressen ohne Einwilligung
❌ Irreführende Betreffzeilen
❌ Versteckte Absenderidentität

### Pflichtangaben in jeder E-Mail:
- Vollständiges Impressum
- Opt-Out Möglichkeit
- Klare Absenderidentität

## USA: CAN-SPAM Act

### Die 7 Regeln:
1. Keine falschen Header-Informationen
2. Keine irreführenden Betreffzeilen
3. E-Mail als Werbung kennzeichnen (wenn zutreffend)
4. Physische Adresse angeben
5. Opt-Out Möglichkeit bieten
6. Opt-Out innerhalb 10 Tagen umsetzen
7. Verantwortung auch bei Dritten

## Best Practices für rechtssicheres Cold Emailing

### 1. Dokumentation
- Speichere die Quelle jedes Leads
- Dokumentiere dein berechtigtes Interesse
- Halte Opt-Outs sofort fest

### 2. Transparenz
- Sei ehrlich über den Grund deiner E-Mail
- Verstecke nicht, dass es eine Akquise-Mail ist
- Gib immer eine einfache Opt-Out Möglichkeit

### 3. Relevanz
- Kontaktiere nur relevante Personen
- Personalisiere deine Nachrichten
- Biete echten Mehrwert

## Checkliste vor dem Versand

- [ ] Impressum/Signatur vollständig?
- [ ] Opt-Out Link funktioniert?
- [ ] Keine privaten E-Mail-Adressen?
- [ ] Berechtigtes Interesse dokumentiert?
- [ ] Betreffzeile nicht irreführend?`
        },
        {
          id: 'l1-4-outreach-plan',
          title: 'Dein erster Outreach-Plan',
          type: 'text',
          duration: '15 min',
          content: `# Dein erster Outreach-Plan

Bevor du die erste E-Mail schreibst, brauchst du einen klaren Plan.

## Die 5 Säulen eines erfolgreichen Outreach-Plans

### 1. Ziel definieren
Was willst du erreichen?

- [ ] Leads generieren
- [ ] Meetings buchen
- [ ] Partnerschaften aufbauen
- [ ] Feedback einholen

**Dein konkretes Ziel:** _______________________

### 2. Ideales Kundenprofil (ICP)

| Kriterium | Dein ICP |
|-----------|----------|
| Branche | |
| Unternehmensgröße | |
| Entscheidungsträger-Rolle | |
| Problem/Pain Point | |
| Budget-Bereich | |

### 3. Value Proposition

Beantworte diese Frage in 2 Sätzen:
> "Warum sollte der Empfänger auf meine E-Mail antworten?"

**Formel:** Wir helfen [ICP] dabei, [Problem zu lösen], sodass sie [Ergebnis erzielen].

### 4. Sequenz-Strategie

**Empfohlene Sequenz:**

| Email | Timing | Fokus |
|-------|--------|-------|
| Email 1 | Tag 0 | Value + Soft CTA |
| Email 2 | Tag 3 | Follow-Up + Social Proof |
| Email 3 | Tag 7 | Neuer Angle + Case Study |
| Email 4 | Tag 14 | Break-Up Email |

### 5. KPIs festlegen

**Ziel-Metriken:**
- Öffnungsrate: > 50%
- Antwortrate: > 5%
- Positive Antwortrate: > 2%
- Meeting-Rate: > 1%

## Dein 30-Tage Action Plan

### Woche 1: Vorbereitung
- [ ] Domain kaufen & einrichten
- [ ] E-Mail-Account erstellen
- [ ] SPF, DKIM, DMARC konfigurieren
- [ ] Warm-Up starten

### Woche 2: Research
- [ ] 100 Leads identifizieren
- [ ] Leads verifizieren
- [ ] Personalisierungs-Daten sammeln

### Woche 3: Content
- [ ] Email-Sequenz schreiben
- [ ] A/B Test Varianten erstellen
- [ ] Review mit Kollegen

### Woche 4: Launch
- [ ] Erste Kampagne starten (25 Leads)
- [ ] Metriken täglich prüfen
- [ ] Optimieren basierend auf Daten

## Nächste Schritte

Nach dieser Lektion solltest du:
1. Dein konkretes Ziel definiert haben
2. Ein grobes ICP skizziert haben
3. Eine erste Value Proposition formuliert haben

> **Aufgabe:** Fülle das ICP-Template oben aus, bevor du zur nächsten Lektion gehst.`
        },
        {
          id: 'l1-5-quiz',
          title: 'Modul 1 Quiz',
          type: 'quiz',
          duration: '5 min',
          content: 'Teste dein Wissen aus Modul 1',
          quizQuestions: [
            {
              id: 'q1-1',
              question: 'Was ist der Hauptunterschied zwischen Cold Email und Spam?',
              options: [
                'Cold Email ist immer kostenlos',
                'Cold Email ist relevant, personalisiert und bietet Mehrwert',
                'Bei Cold Email braucht man kein Opt-Out',
                'Spam wird öfter geöffnet'
              ],
              correctAnswer: 1,
              explanation: 'Cold Email unterscheidet sich von Spam durch Relevanz, Personalisierung und echten Mehrwert für den Empfänger.'
            },
            {
              id: 'q1-2',
              question: 'Wie lange hast du typischerweise, um einen Leser zu überzeugen weiterzulesen?',
              options: [
                '30 Sekunden',
                '10 Sekunden',
                '3 Sekunden',
                '1 Minute'
              ],
              correctAnswer: 2,
              explanation: 'Du hast nur etwa 3 Sekunden, um mit deiner Betreffzeile und dem ersten Satz zu überzeugen.'
            },
            {
              id: 'q1-3',
              question: 'Welches Cialdini-Prinzip nutzt du, wenn du zuerst Wert gibst?',
              options: [
                'Knappheit',
                'Autorität',
                'Reziprozität',
                'Social Proof'
              ],
              correctAnswer: 2,
              explanation: 'Reziprozität bedeutet: Wer gibt, der empfängt. Gib zuerst Wert, bevor du etwas verlangst.'
            },
            {
              id: 'q1-4',
              question: 'Was muss laut DSGVO/UWG in jeder B2B Cold Email enthalten sein?',
              options: [
                'Ein Rabatt-Code',
                'Impressum und Opt-Out Möglichkeit',
                'Mindestens 3 Links',
                'Ein Bild'
              ],
              correctAnswer: 1,
              explanation: 'Jede E-Mail muss ein vollständiges Impressum und eine Opt-Out Möglichkeit enthalten.'
            },
            {
              id: 'q1-5',
              question: 'Wie viele Follow-Up Emails sollte eine typische Sequenz haben?',
              options: [
                '1 Email reicht',
                '2-3 Emails',
                '3-4 Emails',
                '10+ Emails'
              ],
              correctAnswer: 2,
              explanation: 'Eine typische Sequenz hat 3-4 Emails über 2-3 Wochen verteilt.'
            }
          ]
        }
      ]
    },

    // MODUL 2: Technisches Setup
    {
      id: 'modul-2-technik',
      number: 2,
      title: 'Technisches Setup',
      description: 'Richte deine Email-Infrastruktur professionell ein für maximale Zustellbarkeit.',
      icon: 'Settings',
      requiredModuleId: 'modul-1-fundament',
      lessons: [
        {
          id: 'l2-1-domain-strategie',
          title: 'Domain-Strategie',
          type: 'text',
          duration: '10 min',
          content: `# Domain-Strategie für Cold Email

Deine Haupt-Domain sollte NIEMALS für Cold Email verwendet werden. Hier erfährst du warum und wie du es richtig machst.

## Warum separate Domains?

### Das Risiko
Wenn deine Cold-Email-Domain auf Blacklists landet, ist nur diese betroffen – nicht deine Haupt-Domain.

### Die Lösung: Outreach-Domains

**Beispiel:**
- Haupt-Domain: firma.de
- Outreach-Domains: firma-mail.de, getfirma.de, tryfirma.de

## Domain-Auswahl Best Practices

### Do's ✅
- Ähnlich zur Haupt-Domain
- Vertrauenswürdig klingend
- .com, .de, .io bevorzugen
- Kurz und merkbar

### Don'ts ❌
- Spam-typische Wörter (free, deal, offer)
- Zu viele Zahlen
- Seltsame TLDs (.xyz, .biz)
- Zu lange Domains

## Wie viele Domains brauchst du?

| Volumen/Tag | Domains | Mailboxen/Domain |
|-------------|---------|------------------|
| 50 Emails | 1 | 2-3 |
| 100 Emails | 2 | 2-3 |
| 200 Emails | 3-4 | 2-3 |
| 500+ Emails | 5+ | 3-5 |

## Domain-Kauf Checkliste

- [ ] Domain ist nicht geblacklisted (mxtoolbox.com prüfen)
- [ ] Keine negative History (archive.org prüfen)
- [ ] Bei seriösem Registrar kaufen
- [ ] WHOIS Privacy aktivieren
- [ ] Mindestens 2 Wochen vor Start kaufen`
        },
        {
          id: 'l2-2-email-provider',
          title: 'Email-Provider wählen',
          type: 'text',
          duration: '8 min',
          content: `# Den richtigen Email-Provider wählen

Der Provider ist die Basis deiner Email-Infrastruktur. Wähle weise.

## Die Top-Optionen im Vergleich

### Google Workspace
**Preis:** ~6€/User/Monat

✅ Beste Zustellbarkeit
✅ Einfaches Setup
✅ Bekannte Reputation
❌ Strenge Limits (500/Tag)
❌ Schnelle Sperrung bei Beschwerden

### Microsoft 365
**Preis:** ~5€/User/Monat

✅ Gute Zustellbarkeit
✅ Höhere Limits
❌ Komplexeres Setup
❌ Weniger Cold-Email-freundlich

### Zoho Mail
**Preis:** ~1€/User/Monat

✅ Sehr günstig
✅ Cold-Email-freundlich
❌ Etwas niedrigere Zustellbarkeit
❌ Weniger bekannt

## Empfehlung nach Use-Case

| Use-Case | Empfehlung |
|----------|------------|
| Kleine Volumen (< 50/Tag) | Google Workspace |
| Mittlere Volumen (50-200/Tag) | Mix aus Google + Zoho |
| Hohe Volumen (200+/Tag) | Dedicated Server + mehrere Provider |

## Setup-Reihenfolge

1. Provider-Account erstellen
2. Domain verbinden (MX Records)
3. SPF, DKIM, DMARC einrichten
4. Test-Emails senden
5. Warm-Up starten

## Wichtige Limits beachten

| Provider | Sending Limit/Tag | Empfänger/Email |
|----------|-------------------|-----------------|
| Google | 500 (neu), 2000 (etabliert) | 500 |
| Microsoft | 10.000 | 500 |
| Zoho | 750 | 100 |`
        },
        {
          id: 'l2-3-spf-dkim-dmarc',
          title: 'SPF, DKIM & DMARC einrichten',
          type: 'text',
          duration: '15 min',
          content: `# SPF, DKIM & DMARC – Die Email-Authentifizierung

Diese drei Protokolle sind PFLICHT für professionelles Cold Emailing.

## Was macht was?

### SPF (Sender Policy Framework)
**Funktion:** Definiert, welche Server Emails von deiner Domain senden dürfen.

**Beispiel-Eintrag:**
\`\`\`
v=spf1 include:_spf.google.com ~all
\`\`\`

### DKIM (DomainKeys Identified Mail)
**Funktion:** Digitale Signatur, die beweist, dass die Email nicht verändert wurde.

**Wichtig:** Der DKIM-Key wird vom Provider generiert und als DNS-Record eingetragen.

### DMARC (Domain-based Message Authentication)
**Funktion:** Sagt Empfänger-Servern, was mit Emails passieren soll, die SPF/DKIM nicht bestehen.

**Beispiel-Eintrag:**
\`\`\`
v=DMARC1; p=none; rua=mailto:dmarc@deinedomain.de
\`\`\`

## Setup-Anleitung (Google Workspace)

### Schritt 1: SPF einrichten
1. Gehe zu deinem DNS-Provider
2. Erstelle einen TXT-Record
3. Host: @ oder leer
4. Wert: \`v=spf1 include:_spf.google.com ~all\`

### Schritt 2: DKIM aktivieren
1. Google Admin Console öffnen
2. Apps → Google Workspace → Gmail
3. Authentifizierung → DKIM
4. "Neuen Record generieren"
5. DNS-Record eintragen

### Schritt 3: DMARC einrichten
1. TXT-Record erstellen
2. Host: _dmarc
3. Wert: \`v=DMARC1; p=none; rua=mailto:dmarc@deinedomain.de\`

## Überprüfung

Nutze diese Tools zur Überprüfung:
- **MXToolbox:** mxtoolbox.com
- **Mail-Tester:** mail-tester.com
- **Google Postmaster:** postmaster.google.com

## Häufige Fehler

❌ SPF zu permissiv (\`+all\` statt \`~all\`)
❌ DKIM nicht aktiviert
❌ DMARC auf \`reject\` bevor alles getestet ist
❌ Zu viele SPF-Lookups (max. 10 erlaubt)`
        },
        {
          id: 'l2-4-warmup',
          title: 'Warm-Up Strategien',
          type: 'text',
          duration: '12 min',
          content: `# Email Warm-Up – Baue Reputation auf

Ein neuer Email-Account hat keine Reputation. Ohne Warm-Up landest du im Spam.

## Was ist Warm-Up?

Warm-Up ist der Prozess, bei dem du:
1. Langsam das Sendevolumen steigerst
2. Positive Signale generierst (Öffnungen, Antworten)
3. Reputation bei Email-Providern aufbaust

## Die zwei Warm-Up Methoden

### 1. Manuelles Warm-Up
Du sendest selbst Emails an Freunde/Kollegen, die antworten.

**Vorteil:** Kostenlos
**Nachteil:** Zeitaufwändig, nicht skalierbar

### 2. Automatisiertes Warm-Up (Empfohlen)
Tools senden automatisch Emails zwischen echten Accounts.

**Beliebte Tools:**
- Lemwarm
- Warmbox
- Instantly Warm-Up
- Mailwarm

## Der ideale Warm-Up Plan

### Woche 1-2: Basis
- 5-10 Emails/Tag
- Nur Warm-Up Tool
- Keine Cold Emails

### Woche 3: Start
- 10-20 Emails/Tag
- Mix aus Warm-Up + erste Cold Emails
- Beobachte Zustellbarkeit

### Woche 4+: Skalierung
- Steigere um 10-20% pro Woche
- Warm-Up Tool weiterlaufen lassen
- Maximal 50 Cold Emails/Mailbox/Tag

## Warm-Up Signale die zählen

| Signal | Gewicht |
|--------|---------|
| Email wird geöffnet | ★★ |
| Email wird beantwortet | ★★★★★ |
| Aus Spam verschoben | ★★★★ |
| Als wichtig markiert | ★★★ |
| Weitergeleitet | ★★★ |

## Warnsignale beachten

🚨 **Stoppe sofort wenn:**
- Bounce-Rate > 5%
- Spam-Beschwerden
- Account-Warnung vom Provider
- Plötzlicher Abfall der Öffnungsrate`
        },
        {
          id: 'l2-5-deliverability',
          title: 'Deliverability testen & optimieren',
          type: 'text',
          duration: '10 min',
          content: `# Deliverability – Der Schlüssel zum Erfolg

Die beste Email nützt nichts, wenn sie im Spam landet.

## Deliverability-Score verstehen

**Ziel:** 9+ von 10 bei Mail-Tester

### Was beeinflusst den Score?

| Faktor | Gewicht |
|--------|---------|
| SPF/DKIM/DMARC | 30% |
| Blacklist-Status | 25% |
| Content-Qualität | 20% |
| Domain-Reputation | 15% |
| Engagement-Historie | 10% |

## Tägliche Checks

### 1. Mail-Tester.com
Sende eine Test-Email und erhalte einen detaillierten Report.

### 2. MXToolbox Blacklist Check
Prüfe ob deine Domain/IP auf Blacklists steht.

### 3. Google Postmaster Tools
Zeigt Reputation und Spam-Rate bei Gmail.

## Content-Optimierung

### Spam-Trigger vermeiden:
❌ GROSSBUCHSTABEN
❌ Zu viele Links
❌ Spam-Wörter (FREE!!!, 100% garantiert)
❌ Nur Bilder, kein Text
❌ Zu kurze Emails (< 50 Wörter)

### Best Practices:
✅ Text-to-Link Ratio: Maximal 1 Link pro 100 Wörter
✅ Persönliche Ansprache
✅ Keine HTML-Formatierung (außer Signatur)
✅ Plain Text bevorzugen

## Wenn Emails im Spam landen

### Sofort-Maßnahmen:
1. Sending pausieren
2. Mail-Tester Score prüfen
3. Blacklist-Check durchführen
4. Content überprüfen
5. Warm-Up intensivieren

### Langfristige Lösung:
- Sending-Volumen reduzieren
- Bessere Personalisierung
- Nur hochwertige Leads kontaktieren
- Warm-Up Tool 24/7 laufen lassen`
        },
        {
          id: 'l2-6-praxis',
          title: 'Praxis: Eigene Domain einrichten',
          type: 'practice',
          duration: '30 min',
          content: `# Praxis-Aufgabe: Deine Domain einrichten

Zeit, das Gelernte umzusetzen! Folge dieser Checkliste.

## Deine Aufgabe

Richte eine vollständige Email-Infrastruktur ein.

## Checkliste

### Phase 1: Domain (10 Min)
- [ ] Outreach-Domain kaufen (z.B. bei Namecheap)
- [ ] Domain bei MXToolbox auf Blacklists prüfen
- [ ] WHOIS Privacy aktivieren

### Phase 2: Email-Provider (10 Min)
- [ ] Google Workspace Account erstellen
- [ ] Domain verifizieren
- [ ] Erste Mailbox anlegen (vorname@domain.de)

### Phase 3: DNS-Records (10 Min)
- [ ] MX-Records eintragen
- [ ] SPF-Record eintragen
- [ ] DKIM aktivieren und eintragen
- [ ] DMARC-Record eintragen

### Phase 4: Verifizierung
- [ ] Test-Email an mail-tester.com senden
- [ ] Score sollte 9+ sein
- [ ] Alle DNS-Records bei MXToolbox prüfen

## Erwartetes Ergebnis

Nach dieser Übung hast du:
✅ Eine einsatzbereite Outreach-Domain
✅ Einen konfigurierten Email-Account
✅ Vollständige Email-Authentifizierung
✅ Einen Mail-Tester Score von 9+

## Nächster Schritt

Starte JETZT dein Warm-Up! Die Domain braucht 2-3 Wochen, bevor du Cold Emails sendest.

> **Tipp:** Nutze die Tools aus dem Dashboard (SPF Generator, DNS Checker) für diese Aufgabe!`
        }
      ]
    },

    // MODUL 3: Zielgruppen-Research
    {
      id: 'modul-3-research',
      number: 3,
      title: 'Zielgruppen-Research',
      description: 'Finde die richtigen Leads und sammle Daten für maximale Personalisierung.',
      icon: 'Search',
      requiredModuleId: 'modul-2-technik',
      lessons: [
        {
          id: 'l3-1-icp',
          title: 'Ideales Kundenprofil (ICP) definieren',
          type: 'text',
          duration: '12 min',
          content: `# Das Ideale Kundenprofil (ICP)

Bevor du einen Lead kontaktierst, musst du wissen, wen du suchst.

## Was ist ein ICP?

Das Ideal Customer Profile (ICP) beschreibt das perfekte Unternehmen für dein Angebot.

## Die ICP-Matrix

### Firmographics (Unternehmensdaten)

| Kriterium | Beispiel |
|-----------|----------|
| Branche | SaaS, E-Commerce |
| Größe | 10-50 Mitarbeiter |
| Umsatz | 1-10 Mio € |
| Standort | DACH-Region |
| Technologie | Shopify, HubSpot |

### Psychographics (Verhalten)

| Kriterium | Beispiel |
|-----------|----------|
| Pain Points | Zu wenig Leads |
| Ziele | Wachstum um 50% |
| Trigger Events | Neue Finanzierung |
| Kaufverhalten | Schnelle Entscheidungen |

### Persona (Entscheidungsträger)

| Kriterium | Beispiel |
|-----------|----------|
| Jobtitel | Head of Marketing |
| Verantwortung | Lead Generation |
| Alter | 30-45 |
| LinkedIn-Aktivität | Hoch |

## ICP-Validierung

### Fragen zur Selbstprüfung:
1. Haben wir bereits Kunden, die diesem Profil entsprechen?
2. Können wir echten Mehrwert für diesen ICP bieten?
3. Ist dieser Markt groß genug?
4. Können wir diese Leads überhaupt erreichen?

## Dein ICP-Template

\`\`\`
MEIN IDEALES KUNDENPROFIL

Branche: _______________
Größe: _____ - _____ Mitarbeiter
Standort: _______________
Technologie: _______________

Hauptproblem: _______________
Ziel: _______________
Trigger Event: _______________

Entscheidungsträger: _______________
Titel: _______________
\`\`\`

> **Aufgabe:** Fülle dieses Template aus, bevor du zur nächsten Lektion gehst.`
        },
        {
          id: 'l3-2-lead-quellen',
          title: 'Lead-Quellen: LinkedIn, Apollo, Hunter.io',
          type: 'text',
          duration: '15 min',
          content: `# Die besten Lead-Quellen

Wo findest du die Kontaktdaten deiner Zielgruppe?

## Top Lead-Quellen im Überblick

### 1. LinkedIn Sales Navigator
**Beste für:** B2B, genaue Filterung

✅ Extrem präzise Filter
✅ Aktuelle Daten
✅ Direkter Kontakt möglich
❌ Keine Emails direkt
❌ Teuer (~80€/Monat)

**Power-Filter:**
- Jobtitel + Senioritätsstufe
- Unternehmensgröße
- Branche
- Kürzlich Jobwechsel
- Content-Aktivität

### 2. Apollo.io
**Beste für:** Volumen, Email-Adressen

✅ Große Datenbank (265M+ Kontakte)
✅ Verifizierte Emails
✅ Integrierte Sequenzen
❌ Datenqualität variiert

**Kosten:** Free-Tier verfügbar, Pro ab ~49$/Monat

### 3. Hunter.io
**Beste für:** Domain-Suche

✅ Findet alle Emails einer Domain
✅ Email-Verifizierung
✅ Einfache API
❌ Weniger Filter

**Kosten:** Free-Tier (25 Suchen/Monat)

### 4. Lusha
**Beste für:** Direktdaten

✅ Telefonnummern
✅ Persönliche Emails
❌ Begrenzte Credits

### 5. ZoomInfo
**Beste für:** Enterprise

✅ Höchste Datenqualität
✅ Intent Data
❌ Sehr teuer

## Meine Tool-Empfehlung

| Budget | Empfehlung |
|--------|------------|
| < 50€/Monat | Apollo Free + Hunter Free |
| 50-150€ | Apollo Pro |
| 150-300€ | LinkedIn Sales Nav + Apollo |
| 300€+ | LinkedIn + Apollo + Lusha |

## Export-Workflow

1. **Suche in LinkedIn Sales Navigator**
2. **Export mit Browser-Extension** (Evaboot, Phantombuster)
3. **Anreichern mit Apollo/Hunter**
4. **Verifizieren mit Email-Verifier**
5. **Import in CRM/Sequenz-Tool**`
        },
        {
          id: 'l3-3-listen-aufbauen',
          title: 'Lead-Listen aufbauen & verifizieren',
          type: 'text',
          duration: '10 min',
          content: `# Lead-Listen professionell aufbauen

Eine schlechte Liste = schlechte Ergebnisse. So machst du es richtig.

## Die perfekte Lead-Liste

### Pflichtfelder:
- First Name
- Last Name
- Company
- Email (verifiziert!)
- Job Title

### Optionale Felder (für Personalisierung):
- LinkedIn URL
- Company Website
- Industry
- Company Size
- Recent News/Trigger

## Verifizierung – NICHT ÜBERSPRINGEN!

### Warum verifizieren?
- Bounce Rate unter 2% halten
- Domain-Reputation schützen
- Blacklists vermeiden

### Beste Verifizierungs-Tools:
1. **NeverBounce** – Genau & günstig
2. **ZeroBounce** – Premium-Qualität
3. **Hunter Verifier** – Schnell
4. **Eigenes Tool** – Nutze unseren Email-Verifier!

### Verifizierungs-Status verstehen:

| Status | Bedeutung | Action |
|--------|-----------|--------|
| Valid | Email existiert sicher | ✅ Senden |
| Invalid | Email existiert nicht | ❌ Löschen |
| Catch-All | Server akzeptiert alles | ⚠️ Vorsicht |
| Unknown | Nicht prüfbar | ⚠️ Kleines Risiko |

## Hygiene-Regeln

### Vor dem Senden:
- [ ] Alle Emails verifiziert
- [ ] Duplikate entfernt
- [ ] Opt-Outs geprüft
- [ ] Competitors ausgeschlossen
- [ ] Bereits kontaktierte entfernt

### Regelmäßig:
- Listen alle 3 Monate neu verifizieren
- Bounces sofort entfernen
- Opt-Outs dokumentieren

## Listen-Größe planen

| Ziel | Listen-Größe | Bei 5% Reply |
|------|--------------|--------------|
| 5 Meetings | 100 Leads | ~5 Replies |
| 20 Meetings | 400 Leads | ~20 Replies |
| 50 Meetings | 1000 Leads | ~50 Replies |`
        },
        {
          id: 'l3-4-personalisierung',
          title: 'Personalisierungs-Daten sammeln',
          type: 'text',
          duration: '12 min',
          content: `# Personalisierung die konvertiert

"Hi {FirstName}" ist KEINE Personalisierung. So geht es richtig.

## Die Personalisierungs-Pyramide

### Level 1: Basis (Minimum)
- Name
- Company
- Jobtitel

### Level 2: Kontext
- Branche/Industrie
- Unternehmensgröße
- Standort

### Level 3: Relevanz
- Kürzliche News
- LinkedIn Post
- Podcast-Auftritt
- Stellenausschreibung

### Level 4: Insight (Gold!)
- Spezifisches Problem
- Konkurrenzsituation
- Wachstumspläne

## Wo findest du Personalisierungs-Daten?

### LinkedIn
- Aktuelle Posts
- Artikel
- Jobwechsel
- Beförderungen
- Interessen

### Unternehmenswebsite
- Blog-Artikel
- Pressemitteilungen
- Team-Seite
- Karriereseite (Hiring = Wachstum!)

### Google News
- Finanzierungsrunden
- Produktlaunches
- Auszeichnungen

### Tools
- Crunchbase (Finanzierung)
- BuiltWith (Technologie)
- SimilarWeb (Traffic)

## Personalisierungs-Formeln

### Die Kompliment-Formel:
> "Ich habe deinen Post zu [THEMA] gelesen – [SPEZIFISCHER KOMMENTAR]."

### Die Relevanz-Formel:
> "Ich habe gesehen, dass [UNTERNEHMEN] gerade [NEWS/EVENT] – da musste ich an [RELEVANTES ANGEBOT] denken."

### Die Insight-Formel:
> "Bei [BRANCHE] Unternehmen eurer Größe sehen wir oft [PROBLEM] – wie geht ihr damit um?"

## Skalierbare Personalisierung

Für hohe Volumen:
1. **Segmentiere** nach ICP-Kriterien
2. **Erstelle Templates** pro Segment
3. **Füge 1-2 individuelle Zeilen** hinzu

Beispiel-Segmente:
- "SaaS + Finanzierung + 50-100 MA"
- "E-Commerce + Shopify + DACH"
- "Agentur + neu gegründet"`
        },
        {
          id: 'l3-5-praxis',
          title: 'Praxis: 50 qualifizierte Leads finden',
          type: 'practice',
          duration: '45 min',
          content: `# Praxis: Deine erste Lead-Liste

Zeit für die Praxis! Erstelle eine Liste mit 50 qualifizierten Leads.

## Deine Aufgabe

Finde und verifiziere 50 Leads, die deinem ICP entsprechen.

## Schritt-für-Schritt

### Phase 1: Tool-Setup (5 Min)
- [ ] Apollo.io Free Account erstellen
- [ ] LinkedIn (optional: Sales Navigator Trial)

### Phase 2: Search (20 Min)
- [ ] ICP-Filter in Apollo/LinkedIn einstellen
- [ ] 50-100 potenzielle Leads identifizieren
- [ ] In Spreadsheet exportieren

### Phase 3: Anreichern (10 Min)
- [ ] Fehlende Emails finden (Hunter.io)
- [ ] LinkedIn-Profile prüfen
- [ ] Firmendaten ergänzen

### Phase 4: Verifizieren (10 Min)
- [ ] Alle Emails verifizieren
- [ ] Invalid/Risky entfernen
- [ ] Finale Liste: 50 verifizierte Leads

## Dein Spreadsheet-Template

| Spalte | Beispiel |
|--------|----------|
| First Name | Max |
| Last Name | Mustermann |
| Email | max@firma.de |
| Company | Firma GmbH |
| Title | Head of Marketing |
| LinkedIn | linkedin.com/in/max |
| Personalisierung | "Post über Growth Hacking" |

## Qualitäts-Check

Deine Liste ist gut, wenn:
- [ ] 0% Invalid Emails
- [ ] 100% entsprechen deinem ICP
- [ ] Mindestens 1 Personalisierungs-Info pro Lead
- [ ] Keine Duplikate
- [ ] Keine Competitors

## Nächster Schritt

Mit dieser Liste bist du bereit für Modul 4: Copywriting!

> **Tipp:** Speichere deine Liste sicher – du wirst sie für deine erste Kampagne brauchen.`
        }
      ]
    },

    // MODUL 4: Copywriting
    {
      id: 'modul-4-copywriting',
      number: 4,
      title: 'Copywriting-Mastery',
      description: 'Schreibe Emails die geöffnet, gelesen und beantwortet werden.',
      icon: 'PenTool',
      requiredModuleId: 'modul-3-research',
      lessons: [
        {
          id: 'l4-1-betreffzeilen',
          title: 'Die perfekte Betreffzeile',
          type: 'text',
          duration: '12 min',
          content: `# Die perfekte Betreffzeile

Die Betreffzeile entscheidet, ob deine Email geöffnet wird. 47% aller Empfänger entscheiden allein aufgrund der Betreffzeile.

## Die 5 Betreffzeilen-Typen

### 1. Die Frage
> "Kurze Frage zu [Thema], {FirstName}"

✅ Erzeugt Neugier
✅ Niedrige Hürde
❌ Kann generisch wirken

### 2. Der Nutzen
> "[Ergebnis] in [Zeitraum]?"

Beispiel: "15% mehr Leads diesen Monat?"

### 3. Die Personalisierung
> "{FirstName}, nach deinem Post zu [Thema]..."

✅ Zeigt Recherche
✅ Fällt auf

### 4. Die Referenz
> "[Gemeinsamer Kontakt] meinte, ich soll mich melden"

✅ Social Proof
✅ Hohe Öffnungsrate

### 5. Der Cliffhanger
> "Idee für {Company}..."

✅ Macht neugierig
❌ Muss im Body eingelöst werden

## Best Practices

### Do's ✅
- 3-7 Wörter optimal
- Kleinbuchstaben (natürlicher)
- Name einbauen
- Keine Clickbait-Versprechen

### Don'ts ❌
- GROSSBUCHSTABEN
- Zu viele Emojis
- "Kostenlos", "Garantiert"
- Reißerische Versprechen
- [Brackets] um alles

## A/B Test Framework

Teste immer 2 Betreffzeilen gegeneinander:

| Version A | Version B |
|-----------|-----------|
| Frage | Statement |
| Mit Name | Ohne Name |
| Kurz (3 Wörter) | Länger (6 Wörter) |

## Top 10 Betreffzeilen-Templates

1. "Kurze Frage, {FirstName}"
2. "{FirstName} – Idee für {Company}"
3. "Nach deinem LinkedIn Post..."
4. "[Gemeinsamer Kontakt] meinte..."
5. "Feedback zu {Company}?"
6. "{Company} + [Dein Unternehmen]"
7. "Gedanke zu [Relevantes Thema]"
8. "Re: [Vorheriges Thema]" (nur bei echtem Follow-Up!)
9. "[Zahl]% mehr [Ergebnis]?"
10. "Kann ich helfen mit [Problem]?"`
        },
        {
          id: 'l4-2-opener',
          title: 'Opener die Aufmerksamkeit gewinnen',
          type: 'text',
          duration: '10 min',
          content: `# Der perfekte Opener

Der erste Satz entscheidet, ob weitergelesen wird.

## Die goldene Regel

> Mach den ersten Satz über den EMPFÄNGER, nicht über dich.

### ❌ Schlecht:
"Mein Name ist Max und ich arbeite bei Firma GmbH..."

### ✅ Gut:
"Ich habe gesehen, dass {Company} gerade expandiert..."

## Die 5 Opener-Formeln

### 1. Der Kompliment-Opener
> "Ich habe deinen [Post/Artikel/Podcast] zu [Thema] gesehen – [spezifischer Kommentar]."

Beispiel:
> "Dein LinkedIn-Post über Remote-Work-Kultur hat mich beeindruckt. Besonders der Punkt über asynchrone Kommunikation."

### 2. Der Relevanz-Opener
> "Ich habe gesehen, dass {Company} [News/Event] – da musste ich an euch denken."

Beispiel:
> "Glückwunsch zur Series-A! Bei dem Wachstum wird Lead-Gen sicher gerade ein heißes Thema."

### 3. Der Problem-Opener
> "Viele [ICPs] kämpfen gerade mit [Problem] – seid ihr davon auch betroffen?"

### 4. Der Trigger-Opener
> "Ich habe eure Stellenausschreibung für [Position] gesehen – das bedeutet ihr wachst gerade im [Bereich]?"

### 5. Der Mutual-Connection-Opener
> "[Name] meinte, wir sollten uns unbedingt kennenlernen."

## Opener-Länge

**Ideal:** 1-2 kurze Sätze (20-40 Wörter)

Der Opener soll:
- Neugier wecken
- Relevanz zeigen
- Zum Weiterlesen animieren

## Was danach kommt

Nach dem Opener:
1. Kurze Überleitung
2. Value Proposition (nächste Lektion)
3. CTA`
        },
        {
          id: 'l4-3-value-proposition',
          title: 'Value Proposition in 2 Sätzen',
          type: 'text',
          duration: '10 min',
          content: `# Die Value Proposition

Warum sollte der Empfänger antworten? Beantworte das in 2 Sätzen.

## Die Value-Prop Formel

> "Wir helfen [ICP] dabei, [Problem zu lösen/Ziel zu erreichen], sodass [Konkretes Ergebnis mit Zahlen]."

## Beispiele nach Branche

### SaaS
> "Wir helfen B2B-SaaS-Unternehmen, ihre Demo-Buchungen um 40% zu steigern, ohne mehr für Ads auszugeben."

### Agentur
> "Wir übernehmen das komplette Cold-Email-Setup, sodass dein Team sich auf das Closing konzentrieren kann."

### Beratung
> "Unsere Kunden reduzieren ihre Sales-Cycle-Zeit im Schnitt um 30% – bei höheren Deal-Werten."

## Die 3 Elemente einer starken Value Prop

### 1. Spezifisch
❌ "Wir helfen beim Wachstum"
✅ "Wir generieren 20 qualifizierte Meetings pro Monat"

### 2. Ergebnisorientiert
❌ "Wir haben ein tolles Tool"
✅ "Das Tool spart 10 Stunden pro Woche"

### 3. Glaubwürdig
❌ "Wir sind die Besten"
✅ "In den letzten 12 Monaten haben wir für 50+ Kunden..."

## Framework: Feature → Benefit → Outcome

| Feature | Benefit | Outcome |
|---------|---------|---------|
| KI-Personalisierung | Spart Zeit | 50% weniger Research-Aufwand |
| A/B Testing | Bessere Performance | 2x höhere Reply-Rate |
| Warm-Up Tool | Bessere Zustellbarkeit | 95%+ Inbox-Rate |

## Platzierung in der Email

\`\`\`
[Opener – 1-2 Sätze über Empfänger]

[Überleitung – 1 Satz]

[Value Proposition – 2 Sätze]

[CTA – 1 Satz]

[Signatur]
\`\`\``
        },
        {
          id: 'l4-4-ctas',
          title: 'Call-to-Actions die konvertieren',
          type: 'text',
          duration: '8 min',
          content: `# Call-to-Actions die konvertieren

Der CTA ist der wichtigste Satz deiner Email. Er bestimmt, was als Nächstes passiert.

## Die 3 CTA-Typen

### 1. Der Soft-CTA (Empfohlen für Email 1)
> "Wäre das grundsätzlich interessant für euch?"

✅ Niedrige Hürde
✅ Erlaubt einfaches "Ja/Nein"
✅ Weniger Commitment

### 2. Der Direct-CTA
> "Hast du nächste Woche 15 Minuten Zeit für ein kurzes Gespräch?"

✅ Klare Aktion
❌ Höhere Hürde

### 3. Der Calendar-CTA
> "Hier kannst du dir direkt einen Slot buchen: [Link]"

✅ Minimale Friction
❌ Kann pushy wirken

## CTA Best Practices

### Do's ✅
- Eine klare Aktion pro Email
- Kurz und konkret
- Zeitangabe ("15 Minuten", "kurzes Gespräch")
- Frageform (leichter zu beantworten)

### Don'ts ❌
- Mehrere CTAs
- Zu viel Commitment ("1-stündige Demo")
- Passive Formulierung
- Zu vage ("Lass uns connecten")

## CTA-Formeln die funktionieren

### Die Frage-Formel
> "Wäre [Ergebnis] etwas, woran ihr arbeitet?"

### Die Zeit-Formel
> "Hast du [Zeit] diese Woche für ein kurzes Gespräch?"

### Die Ja/Nein-Formel
> "Macht es Sinn, dass ich mehr Details schicke?"

### Die Permission-Formel
> "Darf ich dir zeigen, wie das für euch aussehen könnte?"

## CTA nach Email-Position

| Email | CTA-Typ | Beispiel |
|-------|---------|----------|
| Email 1 | Soft | "Interessant?" |
| Email 2 | Soft + Konkret | "Soll ich mehr schicken?" |
| Email 3 | Direct | "15 Min nächste Woche?" |
| Email 4 | Break-Up | "Soll ich aufhören zu schreiben?" |`
        },
        {
          id: 'l4-5-followups',
          title: 'Follow-Up Sequenzen (3-5-7 Strategie)',
          type: 'text',
          duration: '12 min',
          content: `# Die perfekte Follow-Up Sequenz

80% aller Deals werden nach dem 5. Kontakt abgeschlossen. Die meisten geben nach dem 1. auf.

## Die 3-5-7 Strategie

### Email 1 – Tag 0
**Fokus:** Value + Soft CTA
- Starker Opener
- Klare Value Proposition
- Soft CTA

### Email 2 – Tag 3
**Fokus:** Follow-Up + Neuer Wert
- "Wollte sichergehen, dass meine Email nicht untergegangen ist"
- Zusätzlicher Mehrwert (Artikel, Case Study)
- Soft CTA

### Email 3 – Tag 7
**Fokus:** Social Proof
- "Falls hilfreich..."
- Case Study oder Ergebnis
- Direkterer CTA

### Email 4 – Tag 14
**Fokus:** Break-Up
- "Ich schreibe nicht noch mal..."
- Letzte Chance
- Oft höchste Reply-Rate!

## Follow-Up Templates

### Template: Bump
> "Wollte nur kurz nachfragen – hast du meine letzte Email gesehen?
>
> [Ursprüngliche Email unten]"

### Template: Neuer Angle
> "Ich hatte noch einen Gedanken...
>
> [Neuer Mehrwert oder Perspektive]
>
> Wäre das relevant?"

### Template: Social Proof
> "Falls hilfreich: Wir haben gerade für [Ähnliches Unternehmen] [Ergebnis] erreicht.
>
> Dachte, das könnte auch für euch interessant sein?"

### Template: Break-Up
> "Hey {FirstName},
>
> Ich will dich nicht nerven – scheint gerade kein Thema zu sein.
>
> Falls sich das ändert: Ich bin hier.
>
> Alles Gute!"

## Timing-Regeln

| Zwischen | Warte |
|----------|-------|
| Email 1 → 2 | 3 Tage |
| Email 2 → 3 | 4 Tage |
| Email 3 → 4 | 7 Tage |

## Variationen

**Je nach Reaktion:**
- Geöffnet, nicht geantwortet → Kürzerer Abstand
- Nicht geöffnet → Andere Betreffzeile testen
- Reply → Sofort antworten!

> **Pro-Tipp:** Die Break-Up Email hat oft die höchste Antwortrate. Menschen antworten, wenn sie merken, dass die Chance vorbei ist.`
        },
        {
          id: 'l4-6-templates',
          title: 'Templates: 10 bewährte Email-Vorlagen',
          type: 'text',
          duration: '15 min',
          content: `# 10 bewährte Email-Templates

Kopiere, anpassen, versenden. Diese Templates sind battle-tested.

---

## Template 1: Der Klassiker

**Betreff:** Kurze Frage, {FirstName}

> Hey {FirstName},
>
> ich habe gesehen, dass {Company} gerade {Trigger/News} – da dachte ich an euch.
>
> Wir helfen {ICP} dabei, {Value Proposition}.
>
> Wäre das grundsätzlich interessant für euch?
>
> Beste Grüße,
> {Dein Name}

---

## Template 2: Der Kompliment-Opener

**Betreff:** Nach deinem Post zu {Thema}...

> Hey {FirstName},
>
> ich habe deinen LinkedIn-Post zu {Thema} gelesen – besonders {spezifisches Detail} hat mich beeindruckt.
>
> Da wir genau in dem Bereich arbeiten, wollte ich kurz fragen:
>
> Arbeitet ihr gerade aktiv an {verwandtes Thema}?
>
> Beste Grüße,
> {Dein Name}

---

## Template 3: Der Case-Study-Hook

**Betreff:** Wie {Ähnliches Unternehmen} {Ergebnis} erreicht hat

> Hey {FirstName},
>
> wir haben gerade mit {Ähnliches Unternehmen} {konkretes Ergebnis} erreicht.
>
> Da {Company} in einer ähnlichen Situation ist, dachte ich, das könnte interessant sein.
>
> Darf ich dir zeigen, wie das für euch aussehen könnte?
>
> Beste Grüße,
> {Dein Name}

---

## Template 4: Der Problem-Aware

**Betreff:** {Problem} bei {Company}?

> Hey {FirstName},
>
> viele {ICPs} kämpfen gerade mit {Problem}.
>
> Wir haben einen Ansatz entwickelt, der {Lösung} ermöglicht – ohne {übliches Hindernis}.
>
> Ist {Problem} auch bei euch gerade ein Thema?
>
> Beste Grüße,
> {Dein Name}

---

## Template 5: Der Trigger-Event

**Betreff:** Glückwunsch zur {Finanzierung/News}!

> Hey {FirstName},
>
> Glückwunsch zur {News}! Bei dem Wachstum wird {Thema} sicher gerade wichtig.
>
> Wir helfen {ICPs} dabei, {Value Prop} – gerade in solchen Wachstumsphasen.
>
> Hättest du nächste Woche 15 Minuten für einen kurzen Austausch?
>
> Beste Grüße,
> {Dein Name}

---

## Template 6-10: Siehe Download

Die restlichen 5 Templates findest du als Download in deinem Dashboard:
- Template 6: Der Referral
- Template 7: Der Experte
- Template 8: Der Quick-Win
- Template 9: Der Vergleich
- Template 10: Der Break-Up

---

## Nutzungshinweise

1. **Niemals 1:1 kopieren** – immer personalisieren
2. **Variablen ersetzen** – {Platzhalter} mit echten Daten
3. **Testen** – was für andere funktioniert, muss für dich nicht funktionieren
4. **Iterieren** – basierend auf Metriken anpassen`
        }
      ]
    },

    // MODUL 5: Kampagnen & Skalierung
    {
      id: 'modul-5-skalierung',
      number: 5,
      title: 'Kampagnen & Skalierung',
      description: 'Optimiere deine Kampagnen und skaliere von 50 auf 500+ Emails pro Tag.',
      icon: 'TrendingUp',
      requiredModuleId: 'modul-4-copywriting',
      lessons: [
        {
          id: 'l5-1-ab-testing',
          title: 'A/B Testing systematisch durchführen',
          type: 'text',
          duration: '10 min',
          content: `# A/B Testing für Cold Email

Ohne Testen weißt du nicht, was funktioniert.

## Was testen?

### Priorität 1: Betreffzeile
Größter Impact auf Öffnungsrate

**Test-Ideen:**
- Frage vs. Statement
- Mit Name vs. ohne Name
- Kurz vs. lang
- Mit Emoji vs. ohne

### Priorität 2: CTA
Größter Impact auf Reply-Rate

**Test-Ideen:**
- Soft vs. Direct
- Frage vs. Aussage
- Mit Zeitangabe vs. ohne

### Priorität 3: Opener
Impact auf Weiterlesen

### Priorität 4: Value Prop
Impact auf Interesse

## Testing-Framework

### Schritt 1: Hypothese
> "Eine Betreffzeile mit Frage wird mehr geöffnet als eine mit Statement."

### Schritt 2: Setup
- Version A: 50% der Liste
- Version B: 50% der Liste
- Gleiche Liste, gleiche Zeit

### Schritt 3: Laufen lassen
- Mindestens 100 Emails pro Version
- Mindestens 3 Tage warten

### Schritt 4: Auswerten
| Version | Öffnungsrate | Reply-Rate |
|---------|--------------|------------|
| A (Frage) | 45% | 3.2% |
| B (Statement) | 38% | 2.8% |

### Schritt 5: Implementieren
Gewinner wird neuer Standard.

## Statistische Signifikanz

**Faustregel:**
- < 100 Emails: Nicht aussagekräftig
- 100-250: Tendenz erkennbar
- 250+: Statistisch relevant

## Was NICHT testen

❌ Zu viele Variablen gleichzeitig
❌ Zu kleine Samples
❌ Verschiedene Zielgruppen vergleichen
❌ Zu kurze Testdauer`
        },
        {
          id: 'l5-2-metriken',
          title: 'Metriken verstehen',
          type: 'text',
          duration: '12 min',
          content: `# Die wichtigsten Cold Email Metriken

Was du misst, kannst du verbessern.

## Der Metrics-Funnel

\`\`\`
Gesendet (100%)
    ↓
Zugestellt (95%+)
    ↓
Geöffnet (40-60%)
    ↓
Geklickt (optional)
    ↓
Geantwortet (2-10%)
    ↓
Positiv (30-50% der Antworten)
    ↓
Meeting (50%+ der positiven)
\`\`\`

## Benchmark-Werte

| Metrik | Schlecht | OK | Gut | Sehr gut |
|--------|----------|-----|-----|----------|
| Zustellrate | < 90% | 90-95% | 95-98% | 98%+ |
| Öffnungsrate | < 30% | 30-40% | 40-60% | 60%+ |
| Reply-Rate | < 1% | 1-3% | 3-7% | 7%+ |
| Bounce-Rate | > 5% | 3-5% | 1-3% | < 1% |

## Was die Metriken dir sagen

### Niedrige Zustellrate (< 95%)
**Problem:** Technisches Setup oder Blacklist
**Lösung:** SPF/DKIM prüfen, Warm-Up verstärken

### Niedrige Öffnungsrate (< 30%)
**Problem:** Betreffzeile oder Absender
**Lösung:** Betreffzeilen A/B testen

### Niedrige Reply-Rate (< 1%)
**Problem:** Content, Value Prop oder Zielgruppe
**Lösung:** Email-Copy überarbeiten, ICP prüfen

### Hohe Bounce-Rate (> 5%)
**Problem:** Schlechte Datenqualität
**Lösung:** Leads vor Versand verifizieren

## Tracking-Setup

### Was du brauchst:
1. **Email-Tool mit Tracking** (Instantly, Lemlist, Apollo)
2. **Custom Tracking Domain** (für bessere Zustellbarkeit)
3. **Spreadsheet für Analyse**

### Tracking-Pixel Warnung

⚠️ Tracking-Pixel können Spam-Filter triggern!

**Best Practice:**
- Nur Öffnungen der ersten Email tracken
- Follow-Ups ohne Tracking
- Custom Tracking Domain nutzen

## Wöchentlicher Review

Jeden Montag prüfen:
- [ ] Zustellrate letzte Woche
- [ ] Öffnungsrate pro Kampagne
- [ ] Reply-Rate pro Kampagne
- [ ] Bounces analysiert und entfernt?
- [ ] Top-Performer identifiziert?`
        },
        {
          id: 'l5-3-automatisierung',
          title: 'Automatisierung mit Tools',
          type: 'text',
          duration: '15 min',
          content: `# Cold Email Tools & Automatisierung

Die richtigen Tools multiplizieren deine Effizienz.

## Tool-Kategorien

### 1. Sequenz-Tools (Must-Have)
Automatisieren das Senden und Follow-Ups.

**Top-Optionen:**
| Tool | Preis | Besonderheit |
|------|-------|--------------|
| Instantly | ab $37/m | Unlimited Warmup |
| Lemlist | ab $59/m | Beste Personalisierung |
| Apollo | ab $49/m | CRM + Sequenzen |
| Smartlead | ab $39/m | Multi-Inbox |

### 2. Warm-Up Tools
| Tool | Preis |
|------|-------|
| Instantly (inkl.) | - |
| Lemwarm | ab $29/m |
| Warmbox | ab $15/m |

### 3. Lead-Enrichment
| Tool | Preis |
|------|-------|
| Apollo | Free - $49/m |
| Hunter | Free - $49/m |
| Lusha | ab $29/m |

### 4. Email-Verifikation
| Tool | Preis |
|------|-------|
| NeverBounce | $0.008/Email |
| ZeroBounce | $0.007/Email |
| Hunter Verifier | $0.01/Email |

## Mein empfohlener Stack

### Budget (< €100/Monat)
- Apollo Free (Leads + Sequenzen)
- Warmbox (Warm-Up)
- Hunter Free (Verifikation)

### Standard (€100-200/Monat)
- Instantly Hypergrowth (Sequenzen + Warmup)
- Apollo (Leads)
- NeverBounce (Verifikation)

### Premium (€300+/Monat)
- Instantly + Smartlead (Multi-Sending)
- Apollo + LinkedIn Sales Nav (Leads)
- ZeroBounce (Verifikation)

## Automatisierungs-Workflow

\`\`\`
1. Leads in Apollo finden
        ↓
2. Export + Anreicherung
        ↓
3. Verifikation (NeverBounce)
        ↓
4. Import in Instantly
        ↓
5. Sequenz startet automatisch
        ↓
6. Replies landen im Inbox
        ↓
7. CRM-Update (manuell oder Zapier)
\`\`\`

## Zapier-Integrationen

Nützliche Automationen:
- Neue Reply → Slack-Notification
- Positive Reply → CRM-Deal erstellen
- Bounce → Lead aus Liste entfernen
- Meeting gebucht → Kalender-Event + Reminder`
        },
        {
          id: 'l5-4-skalieren',
          title: 'Von 50 auf 500 Emails/Tag skalieren',
          type: 'text',
          duration: '12 min',
          content: `# Skalierung: Von 50 auf 500+ Emails/Tag

Mehr Volumen = Mehr Meetings. Aber nur mit dem richtigen Setup.

## Die Skalierungs-Formel

\`\`\`
Tägliches Volumen = Domains × Mailboxen × Emails/Mailbox

Beispiel:
3 Domains × 3 Mailboxen × 50 Emails = 450 Emails/Tag
\`\`\`

## Skalierungs-Stufen

### Stufe 1: Starter (50/Tag)
- 1 Domain
- 2 Mailboxen
- 25 Emails/Mailbox

### Stufe 2: Growth (150/Tag)
- 2 Domains
- 3 Mailboxen/Domain
- 25 Emails/Mailbox

### Stufe 3: Scale (500/Tag)
- 4 Domains
- 3-4 Mailboxen/Domain
- 30-40 Emails/Mailbox

### Stufe 4: Enterprise (1000+/Tag)
- 8+ Domains
- 4-5 Mailboxen/Domain
- 30-40 Emails/Mailbox
- Dedicated IPs

## Skalierungs-Checkliste

### Vor dem Skalieren prüfen:
- [ ] Aktuelle Zustellrate > 95%?
- [ ] Reply-Rate > 2%?
- [ ] Bounce-Rate < 2%?
- [ ] Keine Blacklist-Einträge?
- [ ] Warm-Up mindestens 3 Wochen?

### Beim Skalieren:
- [ ] Neue Domains 2 Wochen vor Start kaufen
- [ ] Jede Mailbox einzeln warmen
- [ ] Volumen um max. 20%/Woche steigern
- [ ] Metriken täglich überwachen

## Risiken beim Skalieren

### Problem: Zustellrate sinkt
**Lösung:**
- Volumen reduzieren
- Warm-Up verstärken
- Content prüfen

### Problem: Bounce-Rate steigt
**Lösung:**
- Listen-Qualität prüfen
- Verifikation vor Versand

### Problem: Account-Sperrung
**Lösung:**
- Volumen zu hoch → reduzieren
- Provider wechseln
- Mehr Domains nutzen

## Die 10-20-30 Regel

**Pro Mailbox und Tag:**
- Woche 1-2: 10 Emails
- Woche 3-4: 20 Emails
- Woche 5+: 30-50 Emails

Niemals mehr als 50 Cold Emails pro Mailbox pro Tag!`
        },
        {
          id: 'l5-5-inbox-management',
          title: 'Inbox Management & Response-Handling',
          type: 'text',
          duration: '10 min',
          content: `# Inbox Management & Response-Handling

Replies sind der Anfang, nicht das Ende.

## Reply-Typen

### 1. Positive Reply (20-30%)
> "Klingt interessant, erzähl mir mehr."

**Action:** Sofort antworten! (< 1 Stunde)

### 2. Frage-Reply (20-30%)
> "Wie funktioniert das genau?"

**Action:** Kurz und präzise beantworten, dann CTA

### 3. Timing-Reply (15-25%)
> "Gerade kein Thema, vielleicht später."

**Action:** In CRM vermerken, Follow-Up in 3 Monaten

### 4. Negative Reply (15-25%)
> "Kein Interesse." / "Bitte nicht mehr kontaktieren."

**Action:** Entschuldigen, Opt-Out, aus Liste entfernen

### 5. OOO / Auto-Reply (10-15%)
**Action:** Datum notieren, dann erneut kontaktieren

## Response-Templates

### Positive Reply → Meeting buchen
> Hey {Name},
>
> Freut mich! Lass uns kurz sprechen.
>
> Passt dir [Tag] um [Zeit]? Alternativ hier mein Kalender: [Link]
>
> Beste Grüße

### Frage-Reply → Beantworten + CTA
> Hey {Name},
>
> Gute Frage! [Kurze Antwort in 2-3 Sätzen]
>
> Sollen wir kurz telefonieren? Dann kann ich dir mehr zeigen.
>
> Beste Grüße

### Timing-Reply → Notieren
> Verstehe, {Name}!
>
> Ich melde mich in ein paar Monaten nochmal.
>
> Bis dahin alles Gute!

### Negative Reply → Graceful Exit
> Verstehe, {Name}. Danke für die Rückmeldung.
>
> Ich nehme dich aus der Liste.
>
> Falls sich was ändert, melde dich gerne!

## Inbox-Organisation

### Labels/Ordner:
- 📥 Neue Replies
- ⏳ Warte auf Antwort
- 📅 Meeting gebucht
- ❌ Kein Interesse
- 🔄 Follow-Up später

### Tägliche Routine (15 Min):
1. Alle neuen Replies prüfen
2. Positive sofort beantworten
3. Fragen beantworten
4. Negative aus Liste entfernen
5. Labels vergeben

## Metriken tracken

| Metrik | Wie oft | Ziel |
|--------|---------|------|
| Reply-to-Meeting Rate | Wöchentlich | > 30% |
| Ø Response Time | Täglich | < 2 Stunden |
| Opt-Out Rate | Monatlich | < 1% |`
        },
        {
          id: 'l5-6-abschluss',
          title: 'Abschluss & Zertifikat',
          type: 'text',
          duration: '5 min',
          content: `# Glückwunsch – Du hast es geschafft! 🎉

Du hast die Cold Email Masterclass abgeschlossen.

## Was du gelernt hast

### Modul 1: Fundament
✅ Was Cold Email ist und warum es funktioniert
✅ Die Psychologie hinter erfolgreichen Emails
✅ Rechtliche Grundlagen (DSGVO, CAN-SPAM)

### Modul 2: Technik
✅ Domain-Strategie für Outreach
✅ Email-Provider Setup
✅ SPF, DKIM, DMARC Authentifizierung
✅ Warm-Up Best Practices

### Modul 3: Research
✅ ICP definieren
✅ Lead-Quellen nutzen
✅ Listen aufbauen und verifizieren
✅ Personalisierungs-Daten sammeln

### Modul 4: Copywriting
✅ Betreffzeilen die geöffnet werden
✅ Opener die Aufmerksamkeit gewinnen
✅ Value Propositions die überzeugen
✅ CTAs die konvertieren
✅ Follow-Up Sequenzen

### Modul 5: Skalierung
✅ A/B Testing
✅ Metriken verstehen
✅ Automatisierung mit Tools
✅ Von 50 auf 500 Emails skalieren

## Dein Zertifikat

Du erhältst dein Zertifikat, sobald du:
- ✅ Alle Module abgeschlossen hast
- ✅ Alle Quizze mit mindestens 80% bestanden hast

## Nächste Schritte

### 1. Implementieren
Wende das Gelernte JETZT an. Wissen ohne Aktion ist wertlos.

### 2. Community
Tritt unserer Community bei und tausche dich mit anderen aus.

### 3. Weiterlernen
Weitere Kurse kommen bald:
- Advanced Copywriting
- LinkedIn Outreach
- Multi-Channel Sequencing

## Feedback

Wie fandest du den Kurs? Dein Feedback hilft uns, besser zu werden.

[Feedback geben]

---

> "Der beste Zeitpunkt zu starten war gestern. Der zweitbeste ist jetzt."

Viel Erfolg bei deinen Cold Email Kampagnen!

– Das Academy Team`
        }
      ]
    }
  ]
}

// Export der Kursliste
export const courses: Course[] = [coldEmailMasterclass]

// Hilfsfunktionen
export const getCourseById = (courseId: string): Course | undefined => {
  return courses.find(course => course.id === courseId)
}

export const getModuleById = (courseId: string, moduleId: string): Module | undefined => {
  const course = getCourseById(courseId)
  return course?.modules.find(module => module.id === moduleId)
}

export const getLessonById = (courseId: string, moduleId: string, lessonId: string): Lesson | undefined => {
  const module = getModuleById(courseId, moduleId)
  return module?.lessons.find(lesson => lesson.id === lessonId)
}

export const isModuleUnlocked = (
  courseId: string,
  moduleId: string,
  progress: CourseProgress | null
): boolean => {
  const course = getCourseById(courseId)
  const module = course?.modules.find(m => m.id === moduleId)

  if (!module) return false

  // Erstes Modul ist immer offen
  if (!module.requiredModuleId) return true

  // Wenn kein Progress, nur erstes Modul offen
  if (!progress) return false

  const requiredModule = course?.modules.find(m => m.id === module.requiredModuleId)
  if (!requiredModule) return true

  // Alle Lektionen des required Moduls abgeschlossen?
  const allLessonsCompleted = requiredModule.lessons.every(
    lesson => progress.completedLessons.includes(lesson.id)
  )

  // Quiz-Score prüfen falls vorhanden
  const quiz = requiredModule.lessons.find(l => l.type === 'quiz')
  if (quiz) {
    const quizScore = progress.quizScores[quiz.id] || 0
    return allLessonsCompleted && quizScore >= 80
  }

  return allLessonsCompleted
}

export const calculateModuleProgress = (
  module: Module,
  completedLessons: string[]
): number => {
  if (module.lessons.length === 0) return 0
  const completed = module.lessons.filter(l => completedLessons.includes(l.id)).length
  return Math.round((completed / module.lessons.length) * 100)
}

export const calculateCourseProgress = (
  course: Course,
  completedLessons: string[]
): number => {
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  if (totalLessons === 0) return 0

  const completed = course.modules.reduce((acc, m) => {
    return acc + m.lessons.filter(l => completedLessons.includes(l.id)).length
  }, 0)

  return Math.round((completed / totalLessons) * 100)
}
