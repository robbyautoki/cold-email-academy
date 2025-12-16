export interface PlaybookStep {
  id: string
  title: string
  description: string
  content?: string  // Ausführlicher erklärender Text - das "Warum" und "Wie"
  duration: string
  checklist: string[]
  resources?: PlaybookResource[]
  tips?: string[]
}

export interface PlaybookResource {
  title: string
  type: 'link' | 'template' | 'tool' | 'guide'
  href: string
}

export interface Playbook {
  id: string
  slug: string
  title: string
  description: string
  duration: string
  difficulty: 'anfaenger' | 'fortgeschritten' | 'experte'
  steps: PlaybookStep[]
  outcome: string
  tags: string[]
}

export const difficultyConfig = {
  anfaenger: {
    label: 'Anfänger',
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20'
  },
  fortgeschritten: {
    label: 'Fortgeschritten',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted'
  },
  experte: {
    label: 'Experte',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted'
  }
}

export const playbooks: Playbook[] = [
  {
    id: '1',
    slug: 'erste-kampagne-30-tage',
    title: 'Erste Kampagne in 30 Tagen',
    description: 'Der ultimative Fahrplan für deine erste professionelle Cold Email Kampagne. Von der Domain-Strategie über Warmup bis zur Skalierung - jeder einzelne Schritt detailliert erklärt mit allen Tools und Best Practices.',
    duration: '30 Tage',
    difficulty: 'anfaenger',
    outcome: 'Eine voll funktionierende, skalierbare Cold Email Infrastruktur mit laufenden Kampagnen, die Replies und Meetings generiert.',
    tags: ['Einsteiger', 'Komplett-Setup', 'Skalierung', 'Best Practices'],
    steps: [
      // PHASE 1: INFRASTRUCTURE (Tag 1-5)
      {
        id: '1-1',
        title: 'Tag 1: Domain-Strategie & Kauf',
        description: 'Die Grundlage jeder erfolgreichen Cold Email Kampagne ist eine durchdachte Domain-Strategie. Deine Hauptdomain ist dein wertvollstes Asset - schütze sie! In diesem Schritt lernst du, wie du die richtigen Domains auswählst, warum du mehrere brauchst, und wie du sie für Skalierung vorbereitest.',
        content: `**Warum ist eine separate Domain-Strategie so wichtig?** Deine Hauptdomain (z.B. deinefirma.de) hat über Jahre **Reputation** aufgebaut. Diese Reputation ist wertvoll - bei Kunden, bei Google, und bei Email-Providern. Wenn du Cold Emails von deiner Hauptdomain sendest und etwas schiefgeht (zu viele Bounces, Spam-Markierungen), wird deine **gesamte Email-Reputation beschädigt**. Das bedeutet: Auch deine normalen Business-Emails an bestehende Kunden könnten plötzlich im Spam landen.

**Die Lösung ist einfach aber entscheidend:** Nutze **separate Domains** für Cold Outreach. Diese Domains sind "Opfer-Domains" - wenn eine davon Reputation verliert, ist das ärgerlich aber nicht geschäftskritisch. **Deine Hauptdomain bleibt geschützt.**

**Wie wählst du die richtigen Domain-Namen?** Deine Cold Email Domains sollten deiner Hauptdomain ähnlich sein, damit sie glaubwürdig wirken. Wenn dein Unternehmen "Musterfirma GmbH" heißt, könnten gute Optionen sein: musterfirma-team.de, getmusterfirma.de, trymusterfirma.de, musterfirmahq.de. **Vermeide** Zahlen (musterfirma123.de), übermäßige Bindestriche (muster-firma-gmbh.de), oder exotische Endungen (.xyz, .io für DACH-Markt).

**Warum brauchst du mehrere Domains?** Eine einzelne Domain kann realistisch **50-80 Emails pro Tag** senden, ohne dass es verdächtig wird. Wenn du mehr Volumen brauchst, skalierst du über mehrere Domains. Für den Start empfehle ich **3-5 Domains**. Das gibt dir Spielraum für 150-400 Emails pro Tag - mehr als genug für den Anfang.

**Was ist Domain-Aging und warum ist es wichtig?** Email-Provider sind misstrauisch gegenüber brandneuen Domains. Eine Domain, die gerade erst registriert wurde und sofort anfängt, hunderte Emails zu versenden, ist ein typisches Spam-Muster. Deshalb ist es schlau, Domains **einige Wochen vor dem geplanten Start** zu kaufen. Noch besser: **"Aged Domains"** kaufen - also Domains, die schon seit Jahren existieren. Diese haben bereits eine gewisse Grundreputation.`,
        duration: '2-3 Stunden',
        checklist: [
          'Verstanden: Warum NIEMALS die Hauptdomain für Cold Email nutzen',
          '3-5 separate Domains bei Namecheap oder Cloudflare kaufen',
          'Domain-Varianten erstellen: firmahq.de, getfirma.de, tryfirma.de, firma-team.de',
          '.de und .com Domains bevorzugen für DACH-Region',
          'Keine Zahlen, Bindestriche oder ungewöhnliche TLDs verwenden',
          'Domain-Aging verstanden: Neue Domains brauchen Zeit für Reputation',
          'Alle Domains in einem Spreadsheet dokumentiert mit Kaufdatum',
          'WHOIS Privacy aktiviert für alle Domains'
        ],
        resources: [
          { title: 'Namecheap Domain Registrar', type: 'link', href: 'https://namecheap.com' },
          { title: 'Cloudflare Registrar', type: 'link', href: 'https://cloudflare.com' },
          { title: 'Domain Naming Best Practices', type: 'guide', href: '/knowledge-base/domain-setup' }
        ],
        tips: [
          'Pro Tipp: Kaufe 3-5 Domains gleichzeitig - du wirst sie für Skalierung brauchen',
          'Eine Domain kann realistisch 50-80 Emails pro Tag senden ohne Probleme',
          'Domain-Alter spielt eine Rolle: Je älter, desto besser für Reputation',
          'Tipp für Fortgeschrittene: Kaufe "aged domains" auf Marketplaces für schnelleren Start',
          'Halte deine Domain-Namen kurz und leicht zu merken'
        ]
      },
      {
        id: '1-2',
        title: 'Tag 2-3: Mailbox-Setup mit Redundanz',
        description: 'Der größte Fehler, den Anfänger machen: Alle Eier in einen Korb legen. Wenn du nur Google oder nur Microsoft nutzt und einer der Provider dich blockt, ist dein gesamtes Outreach tot. Die Lösung: Split-Strategie mit beiden Providern für maximale Redundanz und Deliverability.',
        content: `Stell dir vor: Du hast 10 Mailboxen aufgebaut, alle bei Google Workspace. Deine Kampagnen laufen super. Dann, eines Morgens: **Google suspendiert alle deine Accounts** wegen "Verstoß gegen die Nutzungsbedingungen". Dein gesamtes Outreach ist tot. Innerhalb von Minuten. **Das passiert häufiger als du denkst.**

**Die Lösung ist die Split-Strategie:** Verteile deine Mailboxen auf **mindestens zwei Email-Provider**. Die gängigste Kombination ist **Google Workspace + Microsoft 365**. Wenn einer der Provider Probleme macht, hast du immer noch 50% deiner Infrastruktur am Laufen. Das ist keine Paranoia - das ist **professionelles Risk Management**.

**Wie viele Mailboxen pro Domain?** Die Faustregel ist **2-3 Mailboxen pro Domain**. Warum? Jede Mailbox hat ein "natürliches" Sendelimit von etwa **20-40 Emails pro Tag**, bevor es verdächtig wird. Mit 3 Mailboxen pro Domain kommst du auf 60-120 Emails pro Domain pro Tag. Bei 3 Domains sind das schon 180-360 Emails täglich.

**Welche Email-Adressen solltest du erstellen?** Nutze **echte Namen**, keine generischen Adressen. "max@deinedomain.de" wirkt vertrauenswürdiger als "sales@deinedomain.de" oder "info@deinedomain.de". Variiere die Formate: vorname@domain.de, v.nachname@domain.de, vorname.nachname@domain.de. Das wirkt natürlicher und verschiedene Formate performen bei verschiedenen Zielgruppen unterschiedlich gut.

**Warum App-Passwörter?** Dein Outreach-Tool braucht Zugriff auf deine Mailboxen via **SMTP/IMAP**. Die sicherste Methode dafür sind **App-Passwörter** - spezielle Passwörter nur für Drittanbieter-Apps. So musst du nie dein echtes Passwort teilen, und du kannst den Zugriff jederzeit einzeln widerrufen.

**Was ist mit Email-Signaturen?** Eine professionelle Signatur ist nicht nur höflich, sie ist auch ein **Deliverability-Signal**. Emails mit echter Signatur (Name, Firma, Position, evtl. Telefon) wirken weniger wie Spam. Halte sie **kurz und clean** - keine Banner, keine Links, keine Bilder. **Plain Text funktioniert am besten.**`,
        duration: '3-4 Stunden',
        checklist: [
          'Google Workspace Account erstellen für 50% deiner Domains',
          'Microsoft 365 Business Basic Account für die anderen 50%',
          '2-3 Mailboxen pro Domain erstellen',
          'Mailbox-Naming: vorname@domain.de, vorname.nachname@domain.de',
          'Professionelle Namen verwenden (keine info@ oder sales@)',
          'Backup-Mailboxen für den Notfall eingerichtet',
          'IMAP/SMTP Einstellungen dokumentiert für jede Mailbox',
          'App-Passwörter generiert für Drittanbieter-Tools',
          'Professionelle Email-Signaturen für alle Mailboxen erstellt',
          '2-Faktor-Authentifizierung aktiviert für alle Accounts'
        ],
        resources: [
          { title: 'Google Workspace Admin', type: 'link', href: 'https://admin.google.com' },
          { title: 'Microsoft 365 Admin', type: 'link', href: 'https://admin.microsoft.com' },
          { title: 'Email Signatur Generator', type: 'tool', href: '/tools/email-signatur' }
        ],
        tips: [
          'Google ist generell besser für B2B Cold Email in den USA, Microsoft in Europa',
          'Verwende echte Namen, nicht generische Adressen - das baut Vertrauen auf',
          'Backup-Accounts sind deine Versicherung wenn ein Provider Probleme macht',
          'Kosten: ~6€/Mailbox/Monat bei Google, ~5€ bei Microsoft - investiere hier!',
          'Tipp: Erstelle eine Tabelle mit allen Mailboxen, Passwörtern und App-Passwörtern'
        ]
      },
      {
        id: '1-3',
        title: 'Tag 4: DNS Records Setup',
        description: 'DNS Records sind das Fundament deiner Email-Deliverability. SPF, DKIM und DMARC sind nicht optional - sie sind Pflicht. Ohne diese Records landen deine Emails garantiert im Spam. Hier lernst du genau, was jeder Record macht und wie du sie korrekt einrichtest.',
        content: `DNS Records klingen technisch und einschüchternd, aber sie sind eigentlich einfach zu verstehen. Stell dir vor, **DNS Records sind wie ein Ausweis für deine Domain**. Sie beweisen gegenüber Email-Providern wie Gmail und Outlook: "Ja, diese Person ist wirklich berechtigt, Emails von dieser Domain zu senden."

**Was ist SPF und warum brauchst du es?** SPF (Sender Policy Framework) ist eine Liste aller Server, die berechtigt sind, Emails von deiner Domain zu senden. Wenn du Google Workspace nutzt, sagst du mit dem SPF Record: "Nur Google's Server dürfen Emails von meiner Domain senden." Wenn jemand versucht, deine Domain zu fälschen (**Spoofing**), wird die Email als verdächtig markiert. Der SPF Record ist ein **TXT Record** in deinen DNS Einstellungen und sieht z.B. so aus: **v=spf1 include:_spf.google.com ~all**

**Was ist DKIM und wie funktioniert es?** DKIM (DomainKeys Identified Mail) ist wie eine **digitale Unterschrift** für jede Email, die du sendest. Dein Email-Provider signiert jede ausgehende Email mit einem kryptografischen Schlüssel. Der Empfänger kann dann prüfen, ob die Email wirklich von dir kommt und unterwegs nicht verändert wurde. DKIM muss im **Admin-Panel** deines Email-Providers aktiviert werden, dann wird automatisch ein DNS Record generiert, den du bei deinem Domain-Registrar eintragen musst.

**Was ist DMARC und wofür braucht man es?** DMARC (Domain-based Message Authentication) baut auf SPF und DKIM auf. Es sagt Email-Providern, was sie tun sollen, wenn eine Email die SPF- oder DKIM-Prüfung nicht besteht. Für den Start empfehle ich **p=none** - das bedeutet "nur beobachten, nichts blockieren". So kannst du erstmal Daten sammeln, ohne versehentlich legitime Emails zu blockieren. Der DMARC Record sieht so aus: **v=DMARC1; p=none; rua=mailto:dmarc@deinedomain.de**

**Wichtig: DNS Propagation braucht Zeit.** Nachdem du DNS Records geändert hast, kann es **24-48 Stunden** dauern, bis diese Änderungen weltweit sichtbar sind. Plane das ein. Nutze Tools wie **DNS Checker** oder **MXToolbox**, um zu verifizieren, dass deine Records korrekt gesetzt sind.`,
        duration: '1-2 Stunden',
        checklist: [
          'SPF Record erstellt: v=spf1 include:_spf.google.com ~all (für Google)',
          'SPF Record erstellt: v=spf1 include:spf.protection.outlook.com ~all (für Microsoft)',
          'DKIM aktiviert im Google/Microsoft Admin Panel',
          'DKIM DNS Record korrekt eingetragen',
          'DMARC Record hinzugefügt: v=DMARC1; p=none; rua=mailto:dmarc@domain.de',
          'MX Records verifiziert (sollten automatisch gesetzt sein)',
          'TTL-Werte verstanden (3600 Sekunden = 1 Stunde ist Standard)',
          'Alle DNS Records mit DNS Checker Tool verifiziert',
          '24-48 Stunden Propagation Zeit eingeplant',
          'DNS Records für ALLE Domains eingerichtet, nicht nur eine'
        ],
        resources: [
          { title: 'SPF Generator', type: 'tool', href: '/tools/spf-generator' },
          { title: 'DNS Checker', type: 'tool', href: '/tools/dns-checker' },
          { title: 'MX Record Check', type: 'tool', href: '/tools/mx-record-check' },
          { title: 'DMARC Analyzer', type: 'link', href: 'https://dmarcanalyzer.com' }
        ],
        tips: [
          'SPF: Nur EIN SPF Record pro Domain erlaubt - mehrere werden ignoriert!',
          'DKIM: Bei Google automatisch, bei Microsoft muss es manuell aktiviert werden',
          'DMARC: Starte immer mit p=none (Monitoring), wechsle später zu p=quarantine',
          'Prüfe nach 48h nochmal alle Records - DNS Propagation kann dauern',
          'Pro Tipp: Nutze Cloudflare als DNS Provider für schnellere Propagation'
        ]
      },
      {
        id: '1-4',
        title: 'Tag 5: Custom Tracking Domain (Optional)',
        description: 'Eine Custom Tracking Domain ersetzt die generischen Tracking-Links deines Outreach-Tools durch deine eigene Domain. Das kann die Deliverability verbessern - aber Achtung: Es gibt auch Nachteile. Hier erfährst du, wann es Sinn macht und wann nicht.',
        content: `**Was ist eine Custom Tracking Domain überhaupt?** Wenn du Links in deinen Emails trackst (für Open- und Click-Tracking), werden diese Links normalerweise durch Links deines Outreach-Tools ersetzt. Statt "deinefirma.de/angebot" steht da plötzlich "track.instantly.ai/abc123". Email-Provider sehen diese Tracking-Domains - und sie werden von **tausenden anderen Nutzern geteilt**. Wenn andere Nutzer Spam senden, leidet die Reputation der Tracking-Domain.

Mit einer Custom Tracking Domain ersetzt du "track.instantly.ai" durch "**link.deinedomain.de**". Jetzt nutzt nur noch DU diese Tracking-Domain. Du hast die **volle Kontrolle über die Reputation**. Klingt erstmal super, oder?

**Warum ist dieses Thema umstritten?** In der Cold Email Community gibt es zwei Lager. Die einen schwören auf Custom Tracking Domains für bessere Deliverability. Die anderen sagen: Wenn deine eigene Tracking-Domain auf einer **Blacklist** landet, hast du ein größeres Problem als vorher. Bei shared Tracking Domains kümmert sich der Tool-Anbieter (Instantly, Smartlead etc.) um die Reputation und rotiert Domains bei Problemen.

**Meine Empfehlung für Anfänger:** Überspringe Custom Tracking Domains erstmal komplett. Die Standard-Tracking-Domains der großen Tools funktionieren gut genug. **Konzentriere dich auf die wichtigeren Faktoren:** Gute Copy, saubere Lead-Listen, korrektes Warmup. Wenn du später merkst, dass Tracking-Links ein Problem sind (was selten ist), kannst du immer noch wechseln.

**Falls du es doch einrichten willst:** Du erstellst einen **CNAME Record** in deinen DNS Einstellungen, der eine Subdomain (z.B. link.deinedomain.de) auf die Tracking-Server deines Tools zeigt. Das Tool generiert dann Links mit deiner Subdomain. **Wichtig: SSL muss funktionieren**, sonst sind die Links als "nicht sicher" markiert.`,
        duration: '30-60 Minuten',
        checklist: [
          'Verstanden: Was eine Custom Tracking Domain ist und macht',
          'Abgewogen: Vorteile vs. Nachteile für deine Situation',
          'Subdomain erstellt (z.B. track.deinedomain.de oder link.deinedomain.de)',
          'CNAME Record im DNS eingetragen (Anleitung von deinem Tool)',
          'SSL Zertifikat verifiziert (muss HTTPS unterstützen)',
          'Tracking Domain in deinem Outreach Tool hinterlegt',
          'Test-Email gesendet und Links verifiziert'
        ],
        resources: [
          { title: 'Instantly Tracking Setup', type: 'link', href: 'https://help.instantly.ai' },
          { title: 'DNS Checker', type: 'tool', href: '/tools/dns-checker' }
        ],
        tips: [
          'WICHTIG: Custom Tracking Domains sind aktuell umstritten in der Community',
          'Vorteil: Keine geteilte Domain-Reputation mit anderen Nutzern',
          'Nachteil: Wenn DEINE Domain schlecht wird, hast du ein Problem',
          'Empfehlung für Anfänger: Überspringe diesen Schritt erstmal',
          'Für Fortgeschrittene: Teste mit und ohne, vergleiche Deliverability'
        ]
      },
      // PHASE 2: WARMUP (Tag 6-20)
      {
        id: '1-5',
        title: 'Tag 6: Warmup Tool Setup',
        description: 'Neue Email-Accounts haben KEINE Reputation. Email Provider wie Gmail und Outlook sind misstrauisch gegenüber neuen Absendern. Ohne Warmup landen 80%+ deiner Emails im Spam. Das Warmup simuliert echte Email-Konversationen, um Vertrauen aufzubauen.',
        content: `**Warum landen Emails von neuen Accounts im Spam?** Email-Provider wie Gmail, Outlook und Yahoo nutzen ausgefeilte Algorithmen, um Spam zu erkennen. Einer der wichtigsten Faktoren ist die **Absender-Reputation**. Eine neue Email-Adresse hat keine Historie - **keine Reputation**. Aus Sicht des Spam-Filters ist das verdächtig: Ein neuer Account, der plötzlich viele Emails sendet, ist ein klassisches **Spam-Muster**.

**Was ist Warmup und wie funktioniert es?** Warmup-Tools simulieren **echte Email-Konversationen**. Deine Mailboxen tauschen automatisch Emails mit anderen Mailboxen im "Warmup-Pool" aus. Diese Emails werden geöffnet, beantwortet, aus dem Spam-Ordner geholt und als "wichtig" markiert. Das signalisiert Email-Providern: "Diese Person sendet legitime Emails, die Menschen lesen und beantworten wollen."

**Der Warmup-Pool ist entscheidend.** Je größer der Pool, desto natürlicher wirken die Interaktionen. Große Pools haben Mailboxen bei verschiedenen Providern weltweit. Das simuliert echte globale Kommunikation. Kleine Pools können auffallen, wenn immer dieselben Accounts miteinander kommunizieren.

**Wie lange muss ich aufwärmen?** Minimum **2 Wochen**, idealerweise **3-4 Wochen** für brandneue Domains. **Geduld ist hier wirklich der Schlüssel.** Viele Anfänger werden ungeduldig und starten Kampagnen zu früh - das endet fast immer mit Deliverability-Problemen. Die gute Nachricht: Während du aufwärmst, kannst du parallel an deiner Lead-Recherche und Copy arbeiten.

**Wichtig: Warmup nie komplett abschalten!** Auch wenn deine Kampagnen laufen, sollte Warmup im Hintergrund weiterlaufen (reduziert auf etwa **10-20 Emails/Tag**). Das stabilisiert deine Reputation kontinuierlich und kann kleine Schwankungen in der Deliverability ausgleichen.`,
        duration: '1 Stunde',
        checklist: [
          'Warmup Tool ausgewählt: Instantly (inklusive), Lemwarm, oder Warmup Inbox',
          'Account erstellt und Zahlungsmethode hinterlegt',
          'ALLE Mailboxen mit dem Warmup Tool verbunden',
          'IMAP/SMTP oder OAuth Verbindung hergestellt',
          'Initiale Settings: 5-10 Warmup-Emails pro Tag pro Mailbox',
          'Reply Rate auf "Natürlich" gestellt (variabel, nicht 100%)',
          'Warmup Pool verstanden: Deine Emails gehen an andere Warmup-Nutzer',
          'Tägliche Monitoring-Routine eingerichtet',
          'Kalender-Reminder für 2 Wochen Warmup gesetzt'
        ],
        resources: [
          { title: 'Instantly (inkl. Warmup)', type: 'link', href: 'https://instantly.ai' },
          { title: 'Lemwarm', type: 'link', href: 'https://lemwarm.com' },
          { title: 'Warmup Inbox', type: 'link', href: 'https://warmupinbox.com' },
          { title: 'Warmup Masterplan Playbook', type: 'guide', href: '/playbooks/domain-warmup-masterplan' }
        ],
        tips: [
          'Instantly hat Warmup inklusive - bester Preis-Leistungs-Verhältnis',
          'Starte IMMER konservativ: Lieber 5 Emails/Tag als 20',
          'Der Warmup Pool ist entscheidend: Größer = besser für Reputation',
          'Kosten: Instantly ~$30/Monat, Lemwarm ~$29/Monat, Warmup Inbox ~$15/Monat',
          'NIE Warmup komplett abschalten - auch nach Kampagnenstart weiterlaufen lassen!'
        ]
      },
      {
        id: '1-6',
        title: 'Tag 6-20: Warmup Phase (2 Wochen)',
        description: 'Die nächsten 2 Wochen sind kritisch. Deine Mailboxen bauen langsam Reputation auf. Hier ist dein detaillierter Tag-für-Tag Plan plus die parallel laufenden Aufgaben für Lead-Recherche und Kampagnenplanung.',
        content: `**Die Warmup-Phase ist ein Marathon, kein Sprint.** Dein Ziel ist es, die **Inbox Placement Rate** (der Prozentsatz deiner Emails, die in der Inbox statt im Spam landen) auf **über 95%** zu bringen. Alles **unter 90%** ist problematisch und muss adressiert werden.

**Der detaillierte Fahrplan:** In der **ersten Woche (Tag 6-12)** bist du sehr konservativ. Du startest mit **5-10 Warmup-Emails pro Tag** pro Mailbox. Das klingt nach wenig, aber es ist der sichere Weg. Gegen Ende der ersten Woche erhöhst du auf **10-15 Emails**. Beobachte dabei **täglich** deine Inbox Placement Rate im Dashboard deines Warmup-Tools.

In der **zweiten Woche (Tag 13-20)** beschleunigst du vorsichtig. Du gehst auf **15-20 Emails**, dann **20-25**, und am Ende auf **25-30 Warmup-Emails pro Tag**. Diese Progression muss **organisch wirken**. Zu schnelle Steigerung triggert Spam-Filter. Wenn du irgendwann einen Drop in der Inbox Placement siehst (unter 90%), **gehe sofort einen Schritt zurück**.

**Was tun, wenn die Inbox Placement Rate fällt?** Erstens: **Keine Panik.** Schwankungen sind normal. Zweitens: **Reduziere sofort das Volumen** um 30-50%. Drittens: Warte 2-3 Tage und beobachte. Viertens: Wenn es nicht besser wird, prüfe deine DNS Records nochmal. Fünftens: Checke ob deine Domain auf einer **Blacklist** steht.

**Nutze diese 2 Wochen produktiv!** Während deine Mailboxen aufwärmen, solltest du nicht untätig rumsitzen. Das ist die perfekte Zeit, um: Deinen **ICP (Ideal Customer Profile)** zu definieren, **Lead-Listen** aufzubauen, deine **Email-Copy** zu schreiben, und dein **Outreach-Tool** einzurichten. All das läuft **parallel zum Warmup**.

**Der tägliche Routine-Check:** Jeden Tag (oder mindestens jeden zweiten Tag) solltest du **5-10 Minuten** ins Warmup-Dashboard schauen. Checke: **Inbox Placement Rate** (sollte >90% sein), **Spam Placement** (sollte <10% sein), ob alle Mailboxen aktiv sind, ob es Warnungen oder Probleme gibt.`,
        duration: '2 Wochen (täglich 10-15 Min Monitoring)',
        checklist: [
          'Tag 6-8: 5-10 Warmup Emails/Tag - Inbox Rate sollte >85% sein',
          'Tag 9-11: 10-15 Warmup Emails/Tag - Inbox Rate sollte >90% sein',
          'Tag 12-14: 15-20 Warmup Emails/Tag - Inbox Rate sollte >92% sein',
          'Tag 15-17: 20-25 Warmup Emails/Tag - Inbox Rate sollte >95% sein',
          'Tag 18-20: 25-30 Warmup Emails/Tag - Inbox Rate MUSS >95% sein',
          'Täglich: Warmup Dashboard checken, Inbox Placement Rate notieren',
          'Bei Problemen (Inbox Rate <90%): Volumen sofort reduzieren',
          'Parallel: ICP definieren und Leads recherchieren (nächste Steps)',
          'Blacklist Check durchgeführt für alle Domains',
          'Test-Emails an eigene Gmail/Outlook Accounts gesendet'
        ],
        resources: [
          { title: 'Blacklist Prüfer', type: 'tool', href: '/tools/blacklist-pruefer' },
          { title: 'Mail-Tester', type: 'link', href: 'https://mail-tester.com' }
        ],
        tips: [
          'GEDULD ist der Schlüssel - überstürze nichts!',
          'Wenn Inbox Rate unter 90% fällt: Stoppe und analysiere das Problem',
          'Sende Test-Emails an Freunde mit Gmail und Outlook um zu prüfen wo sie landen',
          'Nutze mail-tester.com für einen Spam-Score deiner Emails',
          'Die 2 Wochen Warmup sind nicht verhandelbar - Shortcuts zerstören deine Reputation'
        ]
      },
      // PHASE 3: OUTREACH TOOL SETUP (Tag 10-12)
      {
        id: '1-7',
        title: 'Tag 10-12: Outreach Tool Setup',
        description: 'Während deine Mailboxen aufwärmen, richtest du parallel dein Outreach-Tool ein. Instantly und Smartlead sind die aktuellen Marktführer für Cold Email. Hier erfährst du, welches Tool für dich passt und wie du es optimal konfigurierst.',
        content: `**Ein Outreach-Tool ist die Kommandozentrale** für deine Cold Email Kampagnen. Es übernimmt die schwere Arbeit: Emails senden, Follow-ups automatisieren, Replies tracken, und deine Kampagnen-Performance analysieren. Ohne ein gutes Tool wärst du damit beschäftigt, händisch hunderte Emails zu senden - **das ist nicht skalierbar**.

**Welches Tool solltest du wählen?** Die drei Marktführer 2024 sind **Instantly**, **Smartlead** und **Lemlist**. Hier ist meine ehrliche Einschätzung: **Instantly ist für die meisten der beste Startpunkt.** Es ist erschwinglich (~$30/Monat), hat Warmup inklusive, eine intuitive Oberfläche, und alle Features die du brauchst. **Smartlead** ist mächtiger und besser für Agencies mit mehreren Kunden, aber auch komplexer und teurer. **Lemlist** ist toll für kombiniertes LinkedIn + Email Outreach, aber pro Mailbox teurer.

**Die Verbindung deiner Mailboxen:** Du verbindest deine Mailboxen entweder per **OAuth** (Ein-Klick-Autorisierung bei Google/Microsoft) oder per **SMTP/IMAP** (manuell mit App-Passwörtern). OAuth ist einfacher, aber manchmal eingeschränkter. SMTP/IMAP gibt dir mehr Kontrolle. Probiere erstmal OAuth - wenn es funktioniert, super. Wenn nicht, wechsle zu SMTP/IMAP.

**Sending Schedule optimal konfigurieren:** Die besten Zeiten für B2B Cold Emails sind typischerweise **8-10 Uhr morgens** und **14-16 Uhr nachmittags**, **Dienstag bis Donnerstag**. Montage sind oft hektisch (Meetings), Freitage entspannt (kurze Aufmerksamkeitsspanne). Wochenenden sind für B2B meist schlechter, aber teste es für deine Zielgruppe.

**Tägliche Sendelimits setzen:** Starte konservativ mit **30 Emails pro Mailbox pro Tag**. Nach 2-3 Wochen erfolgreicher Kampagnen kannst du auf 40-50 erhöhen. **Nie mehr als 50-60 pro Mailbox** - das triggert Spam-Filter. Wenn du mehr Volumen brauchst, **füge mehr Mailboxen hinzu**, nicht mehr Emails pro Mailbox.

**Die Unified Inbox ist dein bester Freund.** Statt zwischen 10 verschiedenen Email-Accounts zu wechseln, siehst du alle eingehenden Replies an **einem Ort**. Du kannst direkt aus dem Tool antworten. Das spart enorm Zeit und verhindert, dass du Replies verpasst.`,
        duration: '2-3 Stunden',
        checklist: [
          'Tool-Entscheidung getroffen: Instantly, Smartlead, oder Lemlist',
          'Account erstellt und Plan ausgewählt',
          'Alle Mailboxen verbunden (SMTP/IMAP oder OAuth)',
          'Sending Schedule konfiguriert: 8-10 Uhr und 14-16 Uhr (beste Zeiten)',
          'Tägliches Sending Limit: 30 Emails/Mailbox am Anfang',
          'Wochenenden ausgeschlossen (optional, je nach Zielgruppe)',
          'Reply Detection aktiviert und getestet',
          'Bounce Handling konfiguriert (automatisch entfernen)',
          'Blacklist Monitoring aktiviert',
          'Unified Inbox eingerichtet für alle Replies',
          'Email Accounts Health Score verstanden und im Blick'
        ],
        resources: [
          { title: 'Instantly', type: 'link', href: 'https://instantly.ai' },
          { title: 'Smartlead', type: 'link', href: 'https://smartlead.ai' },
          { title: 'Lemlist', type: 'link', href: 'https://lemlist.com' }
        ],
        tips: [
          'Instantly: Bestes Preis-Leistungs-Verhältnis, Warmup inklusive, einfache UI',
          'Smartlead: Mehr Features für Agencies, Multi-Client Support, teurer',
          'Lemlist: Gut für LinkedIn + Email Kombination, teurer pro Mailbox',
          'Starte mit 30 Emails/Mailbox/Tag - skaliere erst nach 2+ Wochen guter Performance',
          'Die Unified Inbox ist Gold wert - alle Replies an einem Ort!'
        ]
      },
      // PHASE 4: LEAD GENERATION (Tag 13-20)
      {
        id: '1-8',
        title: 'Tag 13: Lead-Quellen verstehen',
        description: 'Es gibt dutzende Möglichkeiten, Leads zu finden. Die Kunst ist zu wissen, welche Quelle für welchen Anwendungsfall die beste ist. Hier bekommst du den kompletten Überblick über alle relevanten Tools und wann du welches nutzen solltest.',
        content: `**Die Lead-Recherche ist oft der unterschätzte Teil** von Cold Email. Viele konzentrieren sich auf Copy und Deliverability, aber **die Qualität deiner Leads bestimmt 50% deines Erfolgs**. Eine perfekte Email an die falsche Person ist wertlos.

**Apollo.io - Der Allrounder und Startpunkt für 80% der Fälle:** Apollo ist wie eine riesige Datenbank mit Firmenkontakten. Du kannst nach **Branche, Firmengröße, Position, Region** und dutzenden anderen Kriterien filtern. Der **kostenlose Plan** gibt dir 50 Credits pro Monat - genug um das Tool zu testen. Die Datenqualität ist gut, besonders für den US-Markt. Für **DACH-Zielgruppen** ist die Coverage etwas geringer.

**LinkedIn Sales Navigator - Für Premium-Leads und spezifische Suchen:** Sales Navigator ist LinkedIn's Pro-Tool für Vertriebsprofis. Die Stärke: Du siehst, was die Person postet, welche Gruppen sie in ist, wer gemeinsame Kontakte sind. **Das ist Gold für Personalisierung.** Die Schwäche: Du bekommst **keine Email-Adressen direkt**, dafür brauchst du zusätzlich Hunter.io oder Snov.io.

**Hunter.io, Snov.io, RocketReach - Für Email-Findung:** Diese Tools spezialisieren sich darauf, Email-Adressen zu finden wenn du den Namen und die Firma kennst. Sie sind **perfekte Ergänzungen** zu Sales Navigator oder wenn Apollo keine Email hat.

**Clay.com - Für Fortgeschrittene und Automatisierung:** Clay ist ein mächtiges Tool, das **"Waterfall Enrichment"** ermöglicht - es probiert automatisch mehrere Datenquellen nacheinander durch. Es ist fantastisch, aber auch komplex und teuer. **Für den Anfang übertrieben**, aber merke es dir für später.

**Google Maps Scraping - Für lokale B2B Zielgruppen:** Wenn du lokale Dienstleister ansprichst (Handwerker, Ärzte, Restaurants, lokale Agenturen), ist **Google Maps oft die beste Quelle**. Du siehst Bewertungen, Größe, Standort. Es gibt Tools die das automatisch scrapen können.

**Mein Rat für Anfänger:** Starte **nur mit Apollo.io**. Mache dich damit vertraut. Erst wenn du die Grenzen spürst, erweitere auf andere Tools. **Zu viele Tools am Anfang verwirren nur.**`,
        duration: '2 Stunden (Lesen + Account Setup)',
        checklist: [
          'Apollo.io Account erstellt (kostenlos für Start, 50 Credits/Monat)',
          'LinkedIn Sales Navigator verstanden (optional, ~80€/Monat)',
          'Hunter.io Account für Email-Findung',
          'Snov.io als Alternative zu Hunter',
          'Google Maps Scraping für lokale Businesses verstanden',
          'Serpa Dev für Google Suchergebnis-Scraping kennengelernt',
          'Clay.com für Waterfall Enrichment bookmarkt',
          'n8n für Automatisierung auf dem Radar',
          'Entschieden: Welche 2-3 Tools du für den Start nutzt'
        ],
        resources: [
          { title: 'Apollo.io', type: 'link', href: 'https://apollo.io' },
          { title: 'Hunter.io', type: 'link', href: 'https://hunter.io' },
          { title: 'Clay.com', type: 'link', href: 'https://clay.com' },
          { title: 'Snov.io', type: 'link', href: 'https://snov.io' }
        ],
        tips: [
          'Für 80% der Fälle reicht Apollo.io als Hauptquelle komplett aus',
          'Sales Navigator lohnt sich erst ab einem gewissen Volumen',
          'Clay.com ist mächtig aber komplex - für Anfänger optional',
          'Google Maps Scraping ist perfekt für lokale Dienstleister als Zielgruppe',
          'Starte einfach mit Apollo, erweitere später wenn nötig'
        ]
      },
      {
        id: '1-9',
        title: 'Tag 14: ICP Definition & Segmentierung',
        description: 'Der Ideal Customer Profile (ICP) ist das Fundament deiner gesamten Outreach-Strategie. Je präziser du definierst, WEN du erreichen willst, desto höher werden deine Reply Rates. Dieser Schritt wird oft unterschätzt - mache ihn gründlich!',
        content: `**"Wenn du an alle verkaufst, verkaufst du an niemanden."** Dieser Satz fasst zusammen, warum ein präziser ICP so wichtig ist. Je genauer du weißt, wen du ansprichst, desto relevanter wird deine Nachricht, desto höher die Response-Rate.

**Was ist ein Ideal Customer Profile (ICP)?** Der ICP beschreibt deinen **perfekten Kunden auf Unternehmensebene**. Es geht nicht um eine einzelne Person, sondern um den Typ von Unternehmen, der am meisten von deinem Angebot profitiert. Dieser Typ Unternehmen hat den **höchsten Bedarf**, die **kürzeste Sales-Cycle**, und die **höchste Lifetime Value**.

**Wie definierst du deinen ICP?** Schau dir deine besten bisherigen Kunden an. Was haben sie gemeinsam? Welche Branche? Welche Größe (Mitarbeiter, Umsatz)? Welche Region? Welche technologischen Tools nutzen sie? Welches Problem haben sie, das du löst? **Warum haben SIE gekauft und andere nicht?**

**Die Buyer Persona ist der Mensch innerhalb des Unternehmens.** Der ICP sagt dir **WELCHES Unternehmen** du ansprichst. Die Buyer Persona sagt dir **WEN im Unternehmen**. Typische Personas sind: **Der Entscheider** (CEO, Geschäftsführer), **der Budget-Holder** (CFO, Head of), **der User** (die Person die dein Produkt täglich nutzen würde), **der Influencer** (die Person die den Entscheider beeinflusst).

**Segmentierung: A-Tier, B-Tier, C-Tier.** Nicht alle Leads sind gleich wertvoll. **A-Tier** sind Perfect Fits - sie matchen deinen ICP zu 100%. Diese verdienen **maximale Personalisierung** und Aufmerksamkeit. **B-Tier** sind gute Fits - sie matchen 70-80% und bekommen solide Personalisierung. **C-Tier** sind potentielle Fits - sie bekommen Template-Ansprache mit minimaler Personalisierung.

**Pain Points und Trigger Events:** Ein **Pain Point** ist ein Problem, das dein Zielkunde hat. Ein **Trigger Event** ist ein Moment, in dem dieses Problem besonders akut wird. Beispiele für Trigger Events: **Funding-Runde erhalten** (haben jetzt Budget), **neuer Mitarbeiter** in bestimmter Rolle (Veränderung steht an), **Produktlaunch** (brauchen Support), **negative Presse** (suchen Lösungen). **Cold Emails mit Bezug zu Trigger Events performen 3-5x besser.**`,
        duration: '2-3 Stunden',
        checklist: [
          'Analyse: Wer sind deine besten bisherigen Kunden? Was haben sie gemeinsam?',
          'Branche/Industrie klar definiert (z.B. SaaS, E-Commerce, Agenturen)',
          'Unternehmensgröße festgelegt (Mitarbeiteranzahl UND/ODER Umsatz)',
          'Region/Geografie bestimmt (DACH, nur Deutschland, International)',
          'Entscheider-Rollen identifiziert (CEO, Marketing Lead, Sales Director)',
          'Pain Points dokumentiert: Welche Probleme löst dein Angebot?',
          'Trigger Events definiert: Wann ist der beste Zeitpunkt für Kontakt?',
          'ICP in einem Dokument zusammengefasst (max. 1 Seite)',
          '3 verschiedene Segmente erstellt (A-Tier, B-Tier, C-Tier)',
          'Für jedes Segment: Ansprache-Strategie überlegt'
        ],
        tips: [
          'A-Tier: Perfekter Fit, höchste Priorität, maximale Personalisierung',
          'B-Tier: Guter Fit, Standard-Personalisierung',
          'C-Tier: Potentieller Fit, Template-Ansprache',
          'Lieber zu eng starten und später erweitern als zu breit',
          'Frage dich: "Würde ich für dieses Unternehmen 30 Min meiner Zeit investieren?"',
          'Trigger Events können sein: Funding, Neuer Job, Expansion, Produktlaunch'
        ]
      },
      {
        id: '1-10',
        title: 'Tag 15-17: Waterfall Enrichment & Lead-Recherche',
        description: 'Waterfall Enrichment ist der Prozess, bei dem du mehrere Datenquellen nacheinander nutzt, um möglichst viele valide Email-Adressen zu finden. Single-Source reicht nicht - du brauchst eine Kaskade für maximale Coverage. Plus: JEDE Email muss validiert werden!',
        content: `Stell dir vor, du hast **1000 perfekte Leads** identifiziert - Unternehmen die genau zu deinem ICP passen. Aber nur für 600 hast du eine Email-Adresse. Die anderen 400 sind **"verlorene" Chancen**. **Waterfall Enrichment** löst dieses Problem, indem es mehrere Datenquellen nacheinander durchprobiert.

**Was ist Waterfall Enrichment genau?** Der Name kommt von der Vorstellung eines Wasserfalls, der durch mehrere Ebenen fließt. Du fängst mit deiner **Hauptquelle** an (z.B. Apollo). Für alle Leads, bei denen Apollo keine Email gefunden hat, probierst du die **nächste Quelle** (z.B. Hunter.io). Dann Snov.io. Dann RocketReach. Mit jedem Schritt findest du mehr Emails, bis du eine **Coverage von 80-90%** erreichst.

**Die typische Waterfall-Reihenfolge:** 1) **Apollo.io** (deckt ca. 60-70% ab), 2) **Hunter.io** (findet weitere 10-15%), 3) **Snov.io** (weitere 5-10%), 4) **RocketReach** (weitere 5%). Am Ende hast du für **85-95% deiner Leads** eine Email.

**Warum ist Email-Validierung NICHT verhandelbar?** Nur weil ein Tool dir eine Email gibt, heißt das nicht, dass sie funktioniert. Tools raten manchmal Email-Formate basierend auf Mustern (vorname.nachname@firma.de). Wenn sie falsch raten, **bouncet deine Email**. Eine **Bounce-Rate über 3%** schadet deiner Domain-Reputation erheblich. Deshalb: **Nach JEDEM Enrichment-Schritt validieren**, nicht erst am Ende.

**Wie funktioniert Email-Validierung?** Validierungs-Tools wie **NeverBounce, ZeroBounce oder Debounce** prüfen, ob eine Email-Adresse wirklich existiert. Sie kategorisieren Emails als: **"Valid"** (existiert definitiv - nutzen!), **"Invalid"** (existiert nicht - löschen!), **"Catch-All"** (Vorsicht - die Domain akzeptiert alles, kann trotzdem bouncen), **"Unknown"** (kann nicht verifiziert werden - eher nicht nutzen).

**Catch-All Emails sind tricky.** Eine "Catch-All" Domain akzeptiert **ALLE eingehenden Emails**, egal ob die spezifische Adresse existiert oder nicht. Das heißt, info@catchall-firma.de und asdfasdf@catchall-firma.de werden beide akzeptiert. Die Email landet aber vielleicht nirgendwo. **Empfehlung:** Catch-All Emails in ein separates Segment packen und mit **niedrigerem Volumen** testen.`,
        duration: '1-2 Tage',
        checklist: [
          'In Apollo: Suchfilter basierend auf ICP erstellt',
          'Erste 500 Leads aus Apollo exportiert',
          'Für Leads ohne Email: Hunter.io probiert',
          'Noch immer keine Email: Snov.io als Backup',
          'Optional: RocketReach für schwierige Fälle',
          'WICHTIG: Nach JEDEM Enrichment-Schritt Emails validiert',
          'Email Validation Tool genutzt (NeverBounce, ZeroBounce, oder in Apollo)',
          'Nur "valid" Emails behalten, "catch-all" markiert, "invalid" gelöscht',
          'Bounce Rate Ziel: Unter 3% - nicht verhandelbar!',
          '500+ verifizierte Leads in einer sauberen Liste'
        ],
        resources: [
          { title: 'Apollo.io', type: 'link', href: 'https://apollo.io' },
          { title: 'Hunter.io', type: 'link', href: 'https://hunter.io' },
          { title: 'NeverBounce', type: 'link', href: 'https://neverbounce.com' },
          { title: 'Email Verifizierung Tool', type: 'tool', href: '/tools/email-verifizierung' }
        ],
        tips: [
          'Waterfall Reihenfolge: Apollo → Hunter → Snov → RocketReach',
          'Nach JEDEM Schritt validieren - nicht erst am Ende!',
          'Catch-All Emails mit Vorsicht: Sie werden akzeptiert aber können bouncen',
          'Lieber 400 valide Emails als 500 mit 5% Bounce Rate',
          'Für Fortgeschrittene: Clay.com automatisiert den gesamten Waterfall-Prozess'
        ]
      },
      // PHASE 5: COPY & TESTING (Tag 21-27)
      {
        id: '1-11',
        title: 'Tag 21-22: Copywriting BEVOR du Variablen sammelst',
        description: 'Ein fataler Fehler: Erst Leads sammeln, dann überlegen was man schreibt. Richtig ist: Erst die Emails schreiben, DANN entscheiden welche Personalisierungs-Variablen du brauchst, und DANN diese Daten für deine Leads sammeln.',
        content: `**Die meisten Anfänger machen es falsch herum:** Sie sammeln erstmal Leads mit allen möglichen Datenpunkten, und überlegen sich DANN, was sie schreiben wollen. Das Ergebnis: Sie haben Daten, die sie nicht brauchen, und ihnen fehlen Daten, die sie bräuchten.

**Der richtige Workflow ist Copy-First:** Schreibe zuerst deine Email. Dann identifiziere die Variablen, die du für Personalisierung brauchst. Dann sammle **genau diese Daten** für deine Leads. Das spart Zeit und sorgt für bessere Personalisierung.

**Wie schreibt man gute Cold Email Copy?** Die wichtigste Regel: **Schreibe wie ein Mensch, nicht wie ein Marketer.** Keine Buzzwords, kein Sales-Speak, keine Übertreibungen. Stell dir vor, du schreibst einem Bekannten eine SMS über ein interessantes Angebot.

**Die Struktur einer guten Cold Email:** 1) **Hook** - Eine personalisierte Eröffnung, die zeigt dass du dich mit dem Empfänger beschäftigt hast. 2) **Pain** - Ansprechen eines Problems, das der Empfänger hat. 3) **Solution** - Wie du helfen kannst (kurz!). 4) **CTA** - Eine einfache Frage als Call-to-Action.

**Email-Länge: 50-125 Wörter, nicht mehr.** Menschen sind beschäftigt. Niemand liest eine 500-Wörter Email von einem Fremden. Dein erstes Email sollte **Interesse wecken, nicht verkaufen**. Der Verkauf passiert im Gespräch.

**Die erste Email sollte PLAIN TEXT sein.** Keine HTML-Formatierung, keine Bilder, keine Logos. Warum? HTML-Emails werden häufiger als Spam markiert. Sie wirken wie Marketing-Mails, nicht wie persönliche Kommunikation. **Plain Text wirkt authentischer** und hat bessere Deliverability.

**Keine Links im ersten Email!** Links sind ein **Spam-Signal**. Besonders Tracking-Links. Deine erste Email sollte nur Text sein und eine Frage enthalten. Links kannst du im Follow-up einbauen, nachdem du eine Beziehung aufgebaut hast.

**Betreffzeilen sind 50% des Erfolgs.** Wenn niemand deine Email öffnet, ist der beste Content wertlos. Gute Betreffzeilen sind **kurz** (unter 50 Zeichen), **persönlich** (mit Namen oder Firma), und **machen neugierig** ohne zu übertreiben.`,
        duration: '3-4 Stunden',
        checklist: [
          'Verstanden: Copy kommt VOR Variable-Collection',
          'Erstkontakt-Email geschrieben (Version A)',
          'Erstkontakt-Email geschrieben (Version B - anderer Angle)',
          'Erstkontakt-Email geschrieben (Version C - anderes Angebot)',
          'Personalisierungs-Variablen identifiziert: {firstName}, {company}, {painPoint}, {trigger}',
          '3 verschiedene Betreffzeilen pro Email-Version',
          'Follow-up 1: Sanfter Reminder (3 Tage nach Initial)',
          'Follow-up 2: Mehrwert/Case Study (5 Tage nach FU1)',
          'Follow-up 3: Alternative/Breakup (7 Tage nach FU2)',
          'Email-Länge geprüft: 50-125 Wörter, nicht mehr!',
          'Nur EIN CTA pro Email',
          'Alle Emails von jemand anderem gegenlesen lassen'
        ],
        resources: [],
        tips: [
          'Schreibe wie du einer Einzelperson schreibst, nicht wie ein Marketer',
          'Keine HTML, keine Bilder, keine Links im ersten Email - Plain Text!',
          'Die Betreffzeile ist 50% des Erfolgs - teste verschiedene Varianten',
          'Personalisierung muss ECHT wirken, nicht generisch',
          'Dein CTA sollte eine Frage sein, kein Befehl'
        ]
      },
      {
        id: '1-12',
        title: 'Tag 23-24: Personalisierte Segmente erstellen',
        description: 'Jetzt weißt du, welche Variablen du in deinen Emails nutzt. Zeit, diese Daten für deine Leads zu sammeln und deine Liste in sinnvolle Segmente aufzuteilen. Je besser die Personalisierung, desto höher die Reply Rate.',
        content: `**Personalisierung ist der Unterschied** zwischen einer **2% Reply Rate** und einer **15% Reply Rate**. Aber Personalisierung bedeutet nicht nur {firstName} und {company} einzufügen. **Echte Personalisierung** zeigt dem Empfänger: "Ich habe mich wirklich mit dir und deiner Situation beschäftigt."

**Arten von Personalisierung, von low-effort bis high-effort:** **Basis-Personalisierung** (automatisch): {firstName}, {company}, {jobTitle}. Das ist das Minimum, das jeder macht. Es fällt auf, wenn es FEHLT, aber es beeindruckt niemanden. **Mittlere Personalisierung** (semi-automatisch): {industry}, {companySize}, {recentNews}. Das zeigt mehr Relevanz und kann oft aus Tools wie Apollo gezogen werden. **Premium-Personalisierung** (manuell): Bezug auf LinkedIn Posts, Podcast-Auftritte, spezifische Aussagen, gemeinsame Kontakte. **Das ist der Goldstandard** und erfordert echte Recherche.

**Wie viel Zeit solltest du in Personalisierung investieren?** Das hängt vom Tier ab. **A-Tier Leads** (perfekter ICP-Match): **10-15 Minuten Recherche** pro Lead. Lies ihre letzten LinkedIn Posts, schau ihre Website an, google ihren Namen. Finde etwas Spezifisches, das du erwähnen kannst. **B-Tier Leads** (guter Match): **3-5 Minuten**. Schneller LinkedIn-Check, Company-News, Branchenspezifische Schmerzpunkte. **C-Tier Leads** (potentieller Match): **0 Minuten individuell**. Nutze Segment-Personalisierung (alle SaaS-Gründer bekommen die gleiche Pain-Point-Ansprache).

**Quellen für Personalisierung:** **LinkedIn ist die Goldgrube.** Was posten sie? Welche Artikel teilen sie? Welchen Gruppen sind sie beigetreten? Welche Ausbildung haben sie? **Company Websites** zeigen dir: Neue Produktlaunches, "Über uns" Seiten, Blog-Posts, Pressemitteilungen. **Google News** kann aktuelle Erwähnungen der Person oder Firma aufzeigen. **Twitter/X** ist besonders wertvoll bei Tech-Gründern.

**Segment-basierte Personalisierung für Skalierung:** Du kannst nicht 500 Leads manuell recherchieren. Deshalb gruppierst du sie in **Segmente mit gemeinsamen Eigenschaften** und erstellst für jedes Segment eine angepasste Email-Version. Beispiel: Ein Segment "SaaS-Gründer mit 10-50 Mitarbeitern" bekommt eine Version, "E-Commerce Manager bei Enterprise-Unternehmen" eine andere.`,
        duration: '4-6 Stunden',
        checklist: [
          'Lead-Liste nach Segmenten aufgeteilt (A/B/C Tier oder nach Branche)',
          'Personalisierungs-Spalten zur Liste hinzugefügt',
          'Für A-Tier Leads: Manuelle Recherche für {painPoint} und {trigger}',
          'Für B-Tier: Semi-automatische Personalisierung',
          'Für C-Tier: Template-basiert mit Basic-Variablen',
          'LinkedIn Aktivität gecheckt für Personalisierungs-Punkte',
          'Company News durchsucht für aktuelle Trigger',
          'Alle Personalisierungs-Felder ausgefüllt - keine leeren Variablen!',
          'Qualitätskontrolle: 10 zufällige Leads manuell geprüft',
          'Segmente in Outreach Tool importiert'
        ],
        tips: [
          'A-Tier Leads verdienen 10-15 Minuten Recherche pro Lead',
          'LinkedIn Posts, Podcasts, Blog-Artikel sind Gold für Personalisierung',
          'Company News: Funding, neue Produkte, Expansion, Stellenausschreibungen',
          'Bei C-Tier: Lieber keine Personalisierung als schlechte',
          'Für Fortgeschrittene: Clay.com kann vieles davon automatisieren'
        ]
      },
      {
        id: '1-13',
        title: 'Tag 25-26: A/B Testing Setup',
        description: 'Bevor du mit vollem Volumen loslegst, testest du deine verschiedenen Email-Versionen mit einer kleinen Gruppe. So findest du heraus, welches Angebot, welche Betreffzeile und welcher Angle am besten funktioniert.',
        content: `**Selbst die erfahrensten Cold Email Profis** können nicht vorhersagen, welche Email-Version besser performen wird. Deshalb testen wir. **A/B Testing** bedeutet, verschiedene Versionen an kleine Gruppen zu senden und zu messen, welche besser funktioniert.

**Warum testen wir vor dem großen Launch?** Stell dir vor, du sendest 500 Emails mit einer schlechten Betreffzeile. Open Rate: 5%. Das sind **475 verbrannte Leads**, die du wahrscheinlich nie wieder ansprechen kannst. Besser: **Erst 50-100 Leads testen**, die beste Version finden, und DANN skalieren.

**Was solltest du testen?** 1) **Betreffzeilen** - Der größte Hebel. Eine gute vs. schlechte Betreffzeile kann den Unterschied zwischen 10% und 50% Open Rate machen. 2) **Der erste Satz** - Der Preview-Text nach der Betreffzeile. Oft unterschätzt, aber wichtig für die Öffnungsrate. 3) **Das Angebot/Angle** - Sprichst du Problem A oder Problem B an? Bietest du einen Call oder eine Demo an? 4) **Die Länge** - Kurz und knackig vs. ausführlicher mit mehr Context.

**Die goldene Regel: Teste nur EINE Variable gleichzeitig.** Wenn du Betreffzeile UND Email-Body änderst, weißt du nicht, welche Änderung den Unterschied gemacht hat. Erst Betreffzeile A vs. B testen. Gewinner nehmen. Dann Body A vs. B testen. So baust du **Schritt für Schritt die optimale Email**.

**Wie viele Leads pro Variante?** Minimum **50 Leads pro Variante** für halbwegs aussagekräftige Daten. Ideal sind **100+**. Bei kleineren Samples können Zufallsschwankungen die Ergebnisse verzerren.

**Welche Metriken tracken?** **Open Rate** (Ziel: >50%): Sagt dir wie gut deine Betreffzeile ist. **Reply Rate** (Ziel: >5%): Sagt dir wie relevant dein Content ist. **Positive Reply Rate** (Ziel: >2%): Sagt dir wie gut dein Angebot ist. **Bounce Rate** (Muss: <3%): Sagt dir wie sauber deine Lead-Liste ist.

**Wie lange testen?** Warte mindestens **3-5 Tage** bevor du Schlüsse ziehst. Viele Leute antworten nicht sofort. Manche öffnen am Wochenende. **Ein Tag Daten reicht nicht** für eine Entscheidung.`,
        duration: '1-2 Stunden Setup + Monitoring',
        checklist: [
          'Test-Kampagne in Outreach Tool erstellt',
          'Kleines Volumen: 50-100 Leads pro Variante',
          'A/B Test für Betreffzeilen aktiviert',
          'Verschiedene Email-Versionen als Varianten eingerichtet',
          'Metriken definiert: Open Rate, Reply Rate, Positive Reply Rate',
          'Tracking eingerichtet für alle relevanten KPIs',
          'Test-Kampagne gestartet mit Warmup weiterhin aktiv',
          'Tägliches Monitoring der Ergebnisse',
          '3-5 Tage Laufzeit für aussagekräftige Daten'
        ],
        tips: [
          'Teste nur EINE Variable gleichzeitig für klare Ergebnisse',
          'Mindestens 50 Leads pro Variante für statistische Relevanz',
          'Open Rate Ziel: >50%, Reply Rate Ziel: >5%, Positive Reply Ziel: >2%',
          'Bounce Rate MUSS unter 3% bleiben - sonst sofort stoppen',
          'Die Ergebnisse dieser Phase bestimmen deine Skalierungs-Strategie'
        ]
      },
      // PHASE 6: LAUNCH & SCALE (Tag 27-30)
      {
        id: '1-14',
        title: 'Tag 27-28: Launch mit Best Performer',
        description: 'Die Testphase hat dir gezeigt, was funktioniert. Jetzt nimmst du die Gewinner-Kombination und skalierst das Volumen hoch. Aber Achtung: Skalierung muss langsam und kontrolliert passieren.',
        content: `**Der große Moment ist da.** Du hast deine Infrastruktur aufgebaut, deine Mailboxen aufgewärmt, deine Leads recherchiert, deine Copy geschrieben und getestet. Jetzt geht es darum, **die Gewinner zu nehmen und professionell zu skalieren**.

**Wie identifizierst du den Gewinner?** Schau dir die Metriken deiner Testvarianten an. Der Gewinner ist die Version mit der **besten Positive Reply Rate**, NICHT die mit der besten Open Rate. Open Rate zeigt nur, dass Leute deine Email öffnen. **Positive Replies zeigen, dass sie interessiert sind.** Das ist der Unterschied zwischen Vanity Metrics und echten Ergebnissen.

**Was wenn keine Version gut performt?** Dann ist jetzt **NICHT die Zeit zu skalieren**. Geh zurück zum Reißbrett. Analysiere: Ist dein ICP richtig definiert? Ist dein Angebot relevant? Ist deine Copy zu lang/kurz? Teste neue Versionen. **Skalieren mit schlechter Performance verbrennt nur Leads.**

**Der kontrollierte Launch:** Erhöhe dein Volumen nicht von 100 auf 500 über Nacht. Das triggert Spam-Filter und überfordert dein Reply-Management. Besser: **100 → 150 → 200 → 300** über 1-2 Wochen.

**Reply-Management ist jetzt KRITISCH.** Jede Reply muss **innerhalb von 24 Stunden** beantwortet werden, idealerweise **innerhalb von 4 Stunden** während Geschäftszeiten. Schnelle Antworten zeigen Professionalität und erhöhen die Conversion. **Positive Replies sollten innerhalb von Stunden einen Kalender-Link bekommen.**

**Was tun mit negativen Replies?** Auch negative Replies sind wertvoll. Sie zeigen Engagement. Manchmal kann ein höflicher "Danke für die Rückmeldung" in der Zukunft zu einer Chance führen. **Analysiere die Gründe für Absagen** - sie können auf Probleme in deinem Targeting oder Messaging hinweisen.

**Monitoring während des Launches:** Checke täglich: **Bounce Rate** (sofort stoppen wenn >3%), **Spam Complaints** (sofort stoppen wenn >0.3%), **Inbox Placement** im Warmup Tool (sollte >90% bleiben), **Reply Rate** (Baseline im Vergleich zu Tests).`,
        duration: '2-3 Stunden',
        checklist: [
          'Test-Ergebnisse analysiert: Welche Version hat gewonnen?',
          'Gewinner-Email als Haupt-Template festgelegt',
          'Gewinner-Betreffzeile(n) identifiziert',
          'Haupt-Kampagne erstellt mit optimierter Sequenz',
          'Volumen erhöht: 100-200 Leads für den Start',
          'Monitoring Dashboard eingerichtet',
          'Tägliche Checks: Bounce Rate, Spam Complaints, Inbox Placement',
          'Reply-Management: Innerhalb von 24h auf JEDEN Reply antworten',
          'Positive Replies sofort in CRM/Pipeline überführt',
          'Negative Replies analysiert für Learnings'
        ],
        tips: [
          'Der beste Indikator ist die Positive Reply Rate, nicht die Open Rate',
          'Wenn Bounce Rate über 3% steigt: Sofort stoppen und Lead-Qualität prüfen',
          'Antworte auf JEDE Reply - auch negative zeigen Engagement',
          'Positive Replies sollten innerhalb von 4 Stunden einen Kalender-Link bekommen',
          'Dokumentiere alles: Was funktioniert, was nicht, warum'
        ]
      },
      {
        id: '1-15',
        title: 'Tag 29-30: Skalierung & Optimierung',
        description: 'Du hast eine funktionierende Kampagne. Jetzt geht es darum, systematisch zu skalieren ohne die Deliverability zu gefährden. Plus: Der Plan für die nächsten 30 Tage und darüber hinaus.',
        content: `**Du hast es geschafft.** Nach 30 Tagen hast du eine **funktionierende Cold Email Maschine**. Jetzt beginnt die eigentliche Arbeit: **Kontinuierliche Optimierung und kontrollierte Skalierung.**

**Das Prinzip der Skalierung: "Double Down on Winners, Cut Losers".** Was funktioniert, bekommt mehr Ressourcen. Was nicht funktioniert, wird gestoppt oder überarbeitet. Klingt simpel, aber viele machen den Fehler, nicht-performende Kampagnen weiterlaufen zu lassen in der Hoffnung, dass sie "schon noch anlaufen".

**Wie skalierst du sicher?** Die Faustregel: **Nie mehr als 20-30% Volumen-Erhöhung pro Woche.** Also wenn du bei 100 Emails/Tag bist, gehe auf 120-130 in Woche 2, dann 150-170 in Woche 3. **Plötzliche Sprünge triggen Spam-Filter.**

**Wenn du MEHR Volumen brauchst** als deine aktuellen Mailboxen hergeben: Füge **nicht mehr Emails pro Mailbox** hinzu (max 50-60 ist die Grenze). Stattdessen: **Füge mehr Mailboxen hinzu. Füge mehr Domains hinzu.** Mit 5 Domains x 3 Mailboxen x 40 Emails = **600 Emails/Tag** - das ist schon ordentlich Volumen.

**Neue Domains hinzufügen - der Prozess wiederholt sich:** Für neue Domains durchläufst du wieder den gleichen Prozess. Domain kaufen, DNS einrichten, Mailboxen aufsetzen, **2 Wochen aufwärmen**. Plane voraus - **kaufe Domains 3-4 Wochen** bevor du sie brauchst.

**Kontinuierliches Testing stoppt nie.** Auch wenn du eine gut performende Kampagne hast, solltest du weiter testen. Neue Betreffzeilen, neue Angles, neue Angebote. **Märkte ändern sich**, was gestern funktioniert hat, muss morgen nicht funktionieren.

**Conversion Tracking - der wahre Erfolgsmaßstab:** Reply Rate ist schön, aber **der echte KPI ist:** Wie viele Meetings werden gebucht? Wie viele davon werden zu Opportunities? Wie viele zu Deals? Tracke die **komplette Pipeline**, nicht nur die Email-Metriken. Am Ende zählt **ROI:** Kosten (Tools, Zeit) vs. generierter Pipeline-Wert.

**Der Blick nach vorn - die nächsten 30 Tage:** Optimiere deine bestehenden Kampagnen basierend auf Daten. Erweitere auf neue Segmente oder ICPs. Baue weitere Domains und Mailboxen auf für Skalierung. Experimentiere mit neuen Kanälen (LinkedIn parallel zu Email?). **Automatisiere repetitive Aufgaben** mit Tools wie Clay oder n8n.`,
        duration: 'Ongoing',
        checklist: [
          'Erfolgreiche Email-Varianten identifiziert und Volumen verdoppelt',
          'Nicht-performende Kampagnen gestoppt oder optimiert',
          'Volumen schrittweise erhöht (max +20-30% pro Woche)',
          'Zusätzliche Domains aktiviert bei Bedarf',
          'Weitere Mailboxen hinzugefügt für mehr Kapazität',
          'A/B Testing kontinuierlich fortgesetzt',
          'Neue Segmente und Angles getestet',
          'Conversion Tracking eingerichtet (Meetings → Opportunities → Deals)',
          'ROI berechnet und dokumentiert (Kosten vs. Pipeline-Wert)',
          'Skalierungsplan für nächsten Monat erstellt',
          'Langfrist-Ziel definiert (z.B. 1000+ Emails/Woche)'
        ],
        tips: [
          'Skaliere langsam: 100 Emails/Tag → 130 → 170 → 200 über Wochen',
          'Pro Domain nicht mehr als 50-80 Emails/Tag, lieber mehr Domains',
          'Warmup NIEMALS abschalten - immer parallel laufen lassen',
          'Dokumentiere deine Learnings - Cold Email ist iterativ',
          'Nächstes Level: Automatisierung mit Clay/n8n für Lead-Recherche'
        ]
      }
    ]
  },
  {
    id: '2',
    slug: 'domain-warmup-masterplan',
    title: 'Domain Warmup Masterplan',
    description: 'Der ultimative Guide zum Domain Warmup mit Instantly.ai und Smartlead. Konkrete Zahlen, Tag-für-Tag Anleitung, und die goldene Regel für Warmup + Kampagnen-Balance.',
    duration: '4 Wochen',
    difficulty: 'anfaenger',
    outcome: 'Eine perfekt aufgewärmte Domain mit >95% Inbox Placement Rate, bereit für skaliertes Cold Email Outreach.',
    tags: ['Deliverability', 'Warmup', 'Instantly', 'Smartlead', 'Domain'],
    steps: [
      {
        id: '2-1',
        title: 'Warum Warmup der Schlüssel zu allem ist',
        description: 'Bevor wir starten, musst du verstehen WARUM Warmup so kritisch ist. Ohne dieses Verständnis wirst du Fehler machen, die deine Domain-Reputation zerstören können.',
        content: `**Email Provider sind wie misstrauische Türsteher.** Wenn du neu bist (neue Domain, neue IP), lassen sie dich nicht einfach rein. Du musst erstmal beweisen, dass du legitim bist. **Das ist Warmup.**

**Was passiert technisch?** Gmail, Outlook, Yahoo und andere Provider haben komplexe Algorithmen, die jeden Absender bewerten. Sie schauen auf: **Wie alt ist die Domain?** Neue Domains sind verdächtig. **Wie viele Emails sendest du?** Plötzlich hohe Volumen = Spam-Signal. **Werden deine Emails geöffnet?** Hohe Öffnungsraten = gutes Signal. **Werden sie beantwortet?** Replies = starkes Vertrauenssignal. **Landen sie im Spam und werden rausgeholt?** Das ist Gold wert für deine Reputation.

**Die "Trust Score" Metapher:** Stell dir vor, jede Domain hat einen unsichtbaren **Trust Score von 0-100**. Eine brandneue Domain startet bei etwa **20-30**. Ab einem Score von **70** landen die meisten Emails in der Inbox. Ab **85** bist du im "VIP-Bereich" mit exzellenter Deliverability. **Warmup ist der Prozess, diesen Score systematisch aufzubauen.**

**Domain Reputation vs. IP Reputation:** Früher war die **IP-Adresse** der Hauptfaktor. Heute ist die **Domain-Reputation** wichtiger. Warum? Weil du bei Cloud-Providern wie Google Workspace oder Microsoft 365 die IP mit tausenden anderen Nutzern teilst. Die Provider können nicht jeden einzeln tracken. Stattdessen tracken sie deine **Domain** - die ist einzigartig und gehört nur dir.

**Ohne Warmup passiert folgendes:** Du kaufst eine neue Domain, erstellst Mailboxen, und sendest sofort 100 Cold Emails. Die Provider sehen: Neue Domain + hohes Volumen = **klassisches Spam-Muster**. Ergebnis: **80-95% deiner Emails landen im Spam**. Noch schlimmer: Deine Domain wird als "Spam-Domain" markiert, und diese Reputation ist **extrem schwer wieder loszuwerden**.

**Die gute Nachricht:** Mit richtigem Warmup kannst du in **3-4 Wochen** eine perfekte Reputation aufbauen. Du musst nur geduldig und systematisch vorgehen. Dieser Guide zeigt dir genau wie.`,
        duration: '15 Minuten Lesen',
        checklist: [
          'Verstanden: Warum Email Provider neue Domains misstrauisch behandeln',
          'Trust Score Konzept verinnerlicht (0-100 Skala)',
          'Domain vs. IP Reputation verstanden',
          'Risiken ohne Warmup erkannt (80%+ Spam)',
          'Zeitrahmen verstanden: 3-4 Wochen für solide Reputation',
          'Mental vorbereitet: Ich werde GEDULDIG sein!'
        ],
        tips: [
          'Geduld ist die wichtigste Eigenschaft beim Warmup - Shortcuts zerstören Reputation',
          'Eine verbrannte Domain ist schlimmer als keine Domain - nimm dir die Zeit',
          'Warmup ist nicht optional, es ist die Grundvoraussetzung für alles andere'
        ]
      },
      {
        id: '2-2',
        title: 'Die richtige Warmup-Strategie wählen',
        description: 'Es gibt verschiedene Warmup-Optionen: In Outreach-Tools integriert (Instantly, Smartlead) oder dedizierte Warmup-Tools. Hier erfährst du die Vor- und Nachteile jeder Option.',
        content: `**Du hast grundsätzlich drei Optionen für Warmup:** Integriertes Warmup in deinem Outreach-Tool, dedizierte Warmup-Tools, oder manuelles Warmup. Spoiler: **Option 3 ist keine echte Option** - niemand hat Zeit, manuell hunderte Emails zu schreiben und zu beantworten.

**Option 1: Instantly.ai Warmup (Empfohlen für die meisten)**

Instantly hat **Warmup im Preis inklusive** - das ist ein großer Vorteil. Du zahlst ~$30/Monat und bekommst Outreach-Tool + Warmup in einem. Der Warmup-Pool ist groß (über **200.000 aktive Mailboxen**), was für natürliche Interaktionen sorgt.

**Instantly Warmup Features:** Automatisches Öffnen und Beantworten von Warmup-Emails, Emails aus dem Spam-Ordner holen (wichtig!), Natürliche Reply-Patterns (nicht 100% Reply-Rate, das wäre verdächtig), Inbox Placement Tracking im Dashboard.

**Empfohlene Instantly Settings zum Start:** Daily Warmup Limit: **5-10 Emails/Tag**, Reply Rate: **30-40%** (nicht höher!), Ramp-up: **Aktiviert** (automatische Steigerung), Read Emulation: **Aktiviert**.

**Option 2: Smartlead Warmup**

Smartlead funktioniert ähnlich wie Instantly, hat aber **einen eigenen, separaten Warmup-Pool**. Der Pool ist etwas kleiner, aber immer noch ausreichend groß. Smartlead berechnet Warmup **extra** - das ist ein Nachteil gegenüber Instantly.

**Smartlead Warmup Settings:** Ähnlich wie Instantly. Daily Limit: **5-10 zum Start**, Reply Rate: **30-40%**, Warmup aktiviert mit automatischem Ramp-up.

**Option 3: Dedizierte Warmup-Tools (Lemwarm, Warmup Inbox)**

**Wann macht ein separates Tool Sinn?** Wenn du ein Outreach-Tool ohne integriertes Warmup nutzt (z.B. Lemlist ohne Lemwarm-Addon), oder wenn du **zusätzlichen Warmup** zu deinem integrierten Warmup willst. Manche schwören darauf, **zwei Warmup-Quellen** parallel zu nutzen für noch natürlichere Patterns.

**Lemwarm:** ~$29/Monat pro Mailbox, großer Pool, gute Reputation. **Warmup Inbox:** ~$15/Monat pro Mailbox, günstigste Option, kleinerer Pool aber funktioniert.

**Meine Empfehlung:** Starte mit **Instantly** wenn du noch kein Tool hast - du bekommst Warmup + Outreach in einem. Wenn du Smartlead bevorzugst (z.B. für Agency-Features), nutze deren integriertes Warmup. **Dedizierte Tools sind optional** und eher für Fortgeschrittene.`,
        duration: '20 Minuten',
        checklist: [
          'Warmup-Strategie entschieden: Integriert vs. Dediziert',
          'Wenn Instantly: Warmup ist inklusive - nichts extra zu kaufen',
          'Wenn Smartlead: Warmup-Addon aktiviert',
          'Wenn dediziert: Lemwarm oder Warmup Inbox Account erstellt',
          'Verstanden: Pool-Size ist wichtig für natürliche Interaktionen',
          'Budget eingeplant: Warmup-Kosten in Gesamtkalkulation'
        ],
        resources: [
          { title: 'Instantly.ai', type: 'link', href: 'https://instantly.ai' },
          { title: 'Smartlead', type: 'link', href: 'https://smartlead.ai' },
          { title: 'Lemwarm', type: 'link', href: 'https://lemwarm.com' },
          { title: 'Warmup Inbox', type: 'link', href: 'https://warmupinbox.com' }
        ],
        tips: [
          'Instantly ist das beste Preis-Leistungs-Verhältnis für Einsteiger',
          'Ein großer Warmup-Pool (100k+ Mailboxen) ist wichtiger als fancy Features',
          'Spare nicht beim Warmup - es ist die Grundlage für alles andere'
        ]
      },
      {
        id: '2-3',
        title: 'Mailbox-Verbindung & initiales Setup',
        description: 'Jetzt wird es praktisch: Du verbindest deine Mailboxen mit dem Warmup-Tool. SMTP/IMAP vs. OAuth, App-Passwörter erstellen, und die ersten Settings konfigurieren.',
        content: `**Es gibt zwei Wege, deine Mailboxen zu verbinden:** OAuth (Ein-Klick-Autorisierung) oder SMTP/IMAP (manuell mit App-Passwörtern). Beide funktionieren, aber es gibt wichtige Unterschiede.

**OAuth Verbindung (der einfache Weg)**

Bei **Google Workspace** und **Microsoft 365** kannst du dich einfach mit deinem Account einloggen und die Verbindung autorisieren. Das Tool bekommt dann Zugriff auf deine Mailbox, ohne dass du Passwörter eingeben musst. **Vorteil:** Einfach, schnell, keine technischen Kenntnisse nötig. **Nachteil:** Manchmal instabil, manche Features funktionieren nicht.

**SMTP/IMAP Verbindung (der robuste Weg)**

SMTP (Simple Mail Transfer Protocol) ist für das **Senden** von Emails. IMAP (Internet Message Access Protocol) ist für das **Empfangen**. Bei dieser Methode erstellst du **App-Passwörter** - spezielle Passwörter nur für Drittanbieter-Apps.

**App-Passwort bei Google erstellen:** 1) Gehe zu myaccount.google.com → Sicherheit 2) Aktiviere **2-Faktor-Authentifizierung** (Pflicht!) 3) Unter "Anmeldung bei Google" → **App-Passwörter** 4) Erstelle ein App-Passwort für "Mail" auf "Windows Computer" (oder andere Auswahl) 5) Kopiere das 16-stellige Passwort - **du siehst es nur einmal!**

**App-Passwort bei Microsoft erstellen:** 1) Gehe zu account.microsoft.com → Sicherheit 2) Unter "Zusätzliche Sicherheitsoptionen" → **App-Passwörter** 3) Erstelle ein neues App-Passwort 4) Kopiere und speichere es sicher

**SMTP/IMAP Settings für Google:** SMTP Server: smtp.gmail.com, Port: 587 (TLS) oder 465 (SSL), IMAP Server: imap.gmail.com, Port: 993 (SSL)

**SMTP/IMAP Settings für Microsoft:** SMTP Server: smtp.office365.com, Port: 587 (TLS), IMAP Server: outlook.office365.com, Port: 993 (SSL)

**Initiale Warmup-Einstellungen in Instantly:**

Nachdem die Mailbox verbunden ist, konfiguriere das Warmup: **Daily Warmup Limit: 5-10** (NICHT höher zum Start!), **Reply Rate: 30-40%** (natürliches Verhalten), **Increase per day: 1-2** (langsames Ramp-up), **Warmup Enabled: Yes**

**Initiale Warmup-Einstellungen in Smartlead:**

Sehr ähnlich zu Instantly: **Emails per day: 5-10**, **Reply rate: 30-40%**, **Auto Warmup: Enabled**, **Ramp-up: Enabled**

**WICHTIG: Starte KONSERVATIV!** Du kannst später immer erhöhen. Zu aggressiv starten kann deine Reputation von Anfang an beschädigen.`,
        duration: '30-45 Minuten',
        checklist: [
          'Verbindungsmethode gewählt: OAuth oder SMTP/IMAP',
          'Bei SMTP: 2-Faktor-Authentifizierung aktiviert',
          'App-Passwörter erstellt und sicher gespeichert',
          'ALLE Mailboxen mit Warmup-Tool verbunden',
          'Verbindung getestet: Test-Email erfolgreich gesendet',
          'Daily Warmup Limit: 5-10 (nicht höher!)',
          'Reply Rate: 30-40%',
          'Ramp-up aktiviert',
          'Warmup Status: Enabled für alle Mailboxen'
        ],
        tips: [
          'SMTP/IMAP ist robuster als OAuth - nimm dir die extra 5 Minuten',
          'Speichere App-Passwörter in einem Passwort-Manager - du brauchst sie später wieder',
          'Teste die Verbindung immer mit einer Test-Email bevor du Warmup startest'
        ]
      },
      {
        id: '2-4',
        title: 'Woche 1: Der kritische Start (Tag 1-7)',
        description: 'Die erste Woche ist die kritischste. Hier legst du das Fundament für alles, was kommt. Zu schnell = kaputte Reputation. Zu langsam = verschwendete Zeit. Hier ist der perfekte Mittelweg.',
        content: `**Die erste Woche entscheidet über Erfolg oder Misserfolg.** Email Provider beobachten neue Absender besonders genau in den ersten Tagen. Jeder Fehler hier kann wochenlange Aufbauarbeit zerstören.

**Der Tag-für-Tag Fahrplan für Woche 1:**

**Tag 1-2: Ultra-konservativer Start**
Warmup-Emails pro Tag: **3-5 pro Mailbox**
Kampagnen-Emails: **KEINE** (noch nicht!)
Ziel Inbox Placement: **>80%** (alles über 80% ist okay in den ersten Tagen)

Was du tun solltest: Täglich 2 Minuten ins Dashboard schauen. Prüfe ob alle Mailboxen aktiv sind. Keine Panik wenn Inbox Rate noch nicht perfekt ist.

**Tag 3-4: Erste Steigerung**
Warmup-Emails pro Tag: **5-8 pro Mailbox**
Kampagnen-Emails: **Immer noch KEINE!**
Ziel Inbox Placement: **>85%**

Das Warmup-Tool erhöht automatisch wenn Ramp-up aktiviert ist. Falls du manuell erhöhst: Nur um 2-3 Emails pro Schritt.

**Tag 5-7: Stabilisierung**
Warmup-Emails pro Tag: **8-12 pro Mailbox**
Kampagnen-Emails: **Immer noch KEINE!** (Ja, wirklich!)
Ziel Inbox Placement: **>85%** stabil

**Das tägliche 5-Minuten Monitoring-Ritual:**

1) **Inbox Placement Rate checken:** In Instantly unter "Warmup" → Dashboard sichtbar. In Smartlead unter "Email Accounts" → Warmup Stats.

2) **Rote Flaggen erkennen:** Inbox Rate unter 80%? → Sofort Volumen reduzieren! Mailbox "Paused" oder "Error"? → Verbindung prüfen. Bounce-Warnungen? → DNS Records checken.

3) **Notizen machen:** Schreibe dir täglich kurz auf: Datum, Inbox Rate, Volumen. Das hilft bei Troubleshooting später.

**Was tun wenn die Inbox Rate unter 80% fällt?**

**Schritt 1: Keine Panik.** Schwankungen in den ersten Tagen sind normal. **Schritt 2: Volumen um 50% reduzieren.** Von 8 auf 4 Emails pro Tag. **Schritt 3: 2-3 Tage warten** und beobachten. **Schritt 4: Wenn keine Besserung:** DNS Records überprüfen (SPF, DKIM, DMARC). **Schritt 5: Wenn immer noch keine Besserung:** Blacklist-Check durchführen.

**Warum noch KEINE Kampagnen in Woche 1?**

Ich weiß, es ist verlockend. Du willst loslegen. Aber: Kampagnen-Emails haben **viel höhere Bounce-Raten** als Warmup-Emails (weil du an fremde Adressen sendest). Ein einziger Tag mit 5% Bounce Rate in Woche 1 kann deine gesamte Reputation zerstören. **Geduld zahlt sich aus.**`,
        duration: '7 Tage (täglich 5 Min Check)',
        checklist: [
          'Tag 1-2: 3-5 Warmup-Emails/Tag pro Mailbox',
          'Tag 3-4: 5-8 Warmup-Emails/Tag pro Mailbox',
          'Tag 5-7: 8-12 Warmup-Emails/Tag pro Mailbox',
          'Täglich Inbox Placement Rate gecheckt',
          'Keine Kampagnen in Woche 1 gestartet (wichtig!)',
          'Bei Inbox Rate <80%: Volumen reduziert',
          'Alle Mailboxen aktiv und ohne Fehler',
          'Notizen gemacht: Datum, Rate, Volumen'
        ],
        tips: [
          'Die erste Woche ist ein Marathon, kein Sprint - Geduld!',
          'Wenn du denkst "das geht zu langsam" - du machst es richtig',
          'Eine Woche Geduld spart Monate an Reputation-Reparatur'
        ]
      },
      {
        id: '2-5',
        title: 'Woche 2: Aufbauphase (Tag 8-14)',
        description: 'In der zweiten Woche beschleunigen wir. Das Volumen steigt, die Inbox Placement Rate sollte sich stabilisieren. Am Ende der Woche kannst du erste Test-Emails an echte Adressen senden.',
        content: `**Woche 2 ist die Aufbauphase.** Deine Domain hat jetzt erste Reputation aufgebaut. Die Provider sehen: "Diese Domain sendet seit einer Woche Emails, die geöffnet und beantwortet werden." Das ist gut. Jetzt erhöhen wir vorsichtig.

**Der Tag-für-Tag Fahrplan für Woche 2:**

**Tag 8-10: Beschleunigung**
Warmup-Emails pro Tag: **12-18 pro Mailbox**
Kampagnen-Emails: **Noch keine** (fast da!)
Ziel Inbox Placement: **>88%**

Das Warmup-Tool sollte automatisch hochskalieren. Falls du manuell arbeitest: Erhöhe um maximal 3-5 Emails pro Tag.

**Tag 11-14: Konsolidierung**
Warmup-Emails pro Tag: **18-25 pro Mailbox**
Kampagnen-Emails: **Immer noch warten** (ich weiß, es ist hart!)
Ziel Inbox Placement: **>90%** (das ist jetzt der Standard)

**Erste manuelle Test-Emails senden:**

Ab Tag 10 kannst du **manuelle Test-Emails** an echte Adressen senden - aber nicht über das Outreach-Tool, sondern **direkt aus deinem Email-Client** (Gmail, Outlook).

**Sende Test-Emails an:** Deine persönliche Gmail-Adresse, Deine persönliche Outlook-Adresse, Email-Adressen von Freunden/Kollegen (frage vorher!), Mailboxen bei verschiedenen Providern (Yahoo, iCloud, etc.)

**Was du prüfen solltest:** Landet die Email im Primary Tab oder in Promotions/Spam? Wird der Absender korrekt angezeigt? Sind Links klickbar (falls du welche hast)?

**Die goldene Regel: Warmup + Kampagnen = Total Limit**

Diese Regel ist **KRITISCH** und viele ignorieren sie. Deine Domain hat ein "natürliches" Tageslimit, das sie senden kann ohne verdächtig zu wirken. Dieses Limit gilt für **ALLES** - Warmup UND Kampagnen zusammen.

**Beispiel für eine Mailbox:** Maximales Tageslimit: **50 Emails** (das ist das absolute Maximum für eine etablierte Mailbox). Wenn du 25 Warmup-Emails sendest, bleiben nur 25 für Kampagnen. Wenn du 40 Warmup-Emails sendest, bleiben nur 10 für Kampagnen.

**In Woche 2 bist du noch nicht bei 50.** Du bist bei etwa 25-30 Total. Da du noch keine Kampagnen fährst, gehen alle 25-30 ins Warmup.

**Wann kann ich ENDLICH mit Kampagnen starten?**

Frühestens **Ende Woche 2**, und nur wenn: Inbox Placement Rate stabil **>90%**, Keine Bounces oder Spam Complaints, Warmup läuft problemlos.

Aber ehrlich: **Woche 3 ist der sichere Zeitpunkt.** Wenn du bis hierhin geduldig warst, halte noch eine Woche durch. Es lohnt sich.`,
        duration: '7 Tage (täglich 5 Min Check)',
        checklist: [
          'Tag 8-10: 12-18 Warmup-Emails/Tag pro Mailbox',
          'Tag 11-14: 18-25 Warmup-Emails/Tag pro Mailbox',
          'Inbox Placement Rate stabil >90%',
          'Manuelle Test-Emails an Gmail gesendet - in Primary gelandet',
          'Manuelle Test-Emails an Outlook gesendet - in Inbox gelandet',
          'Goldene Regel verstanden: Warmup + Kampagnen = Total',
          'Keine Kampagnen vor Ende Woche 2 gestartet',
          'Weiterhin tägliches Monitoring'
        ],
        tips: [
          'Test-Emails an verschiedene Provider senden - Gmail, Outlook, Yahoo',
          'Wenn Test-Emails im Spam landen: Noch nicht bereit für Kampagnen',
          'Die goldene Regel ist nicht verhandelbar - halte dich daran'
        ]
      },
      {
        id: '2-6',
        title: 'Woche 3: Erste Kampagnen starten (Tag 15-21)',
        description: 'Der große Moment! Du startest deine ersten echten Cold Email Kampagnen. Aber Achtung: Konservativ starten, eng monitoren, und bei Problemen sofort reagieren.',
        content: `**Endlich! Woche 3 ist Kampagnen-Zeit.** Aber bevor du loslegst: Deine Domain ist jetzt wie ein Teenager - hat erste Erfahrungen, ist aber noch nicht erwachsen. Behandle sie entsprechend vorsichtig.

**Die Balance: Warmup vs. Kampagnen in Woche 3**

Das ist der wichtigste Teil dieses ganzen Playbooks. **Merke dir diese Zahlen:**

**Für Instantly:**
Warmup-Emails pro Tag: **20-25 pro Mailbox**
Kampagnen-Emails pro Tag: **10-15 pro Mailbox**
**Total: 30-40 pro Mailbox** (nicht mehr!)

**Für Smartlead:**
Warmup-Emails pro Tag: **20-25 pro Mailbox**
Kampagnen-Emails pro Tag: **10-15 pro Mailbox**
**Total: 30-40 pro Mailbox** (identisch)

**Warum diese Aufteilung?** Warmup-Emails haben **positive Engagement-Signale** (Öffnungen, Replies, aus Spam geholt). Das gleicht die **negativen Signale** von Cold Emails aus (manche werden nicht geöffnet, manche bouncen). Du brauchst mehr positive als negative Signale.

**So konfigurierst du es in Instantly:**

1) **Warmup Settings:** Daily Limit: 20-25, Reply Rate: 30-40%, Warmup: Enabled

2) **Kampagnen Settings:** Unter "Campaigns" → "Sending Settings", Daily Limit per Email Account: **10-15**, Sending Window: 8-10 Uhr und 14-16 Uhr, Timezone: Europe/Berlin (oder deine Zone)

**So konfigurierst du es in Smartlead:**

1) **Email Account Settings:** Daily Email Limit: **30-40** (das ist das TOTAL Limit!), Warmup Emails per Day: **20-25**, Das lässt ~10-15 für Kampagnen übrig

2) **Campaign Settings:** Sending kann automatisch oder manuell begrenzt werden, Empfehlung: Manuell auf 10-15 pro Account begrenzen

**Die ersten Kampagnen-Emails:**

Starte nicht mit 15 Emails am ersten Tag. **Ramp-up auch bei Kampagnen:**

Tag 15-16: **5 Kampagnen-Emails/Tag** pro Mailbox
Tag 17-18: **8 Kampagnen-Emails/Tag** pro Mailbox
Tag 19-21: **10-15 Kampagnen-Emails/Tag** pro Mailbox

**Was du SOFORT monitoren musst:**

**Bounce Rate:** Muss unter **3%** bleiben. Bei über 3%: **Kampagne sofort pausieren!** Deine Lead-Liste hat schlechte Daten.

**Spam Complaints:** Muss unter **0.3%** bleiben (3 Complaints pro 1000 Emails). Bei mehr: **Kampagne pausieren**, Copy überarbeiten.

**Inbox Placement:** Sollte über **90%** bleiben. Wenn es unter 85% fällt: Kampagnen-Volumen reduzieren, Warmup erhöhen.

**Reply Rate:** Ist erstmal egal für Deliverability. Aber wenn **niemand** antwortet, stimmt was mit deiner Copy oder Zielgruppe nicht.`,
        duration: '7 Tage (täglich 10 Min Check)',
        checklist: [
          'Warmup bei 20-25 Emails/Tag stabilisiert',
          'Kampagnen-Limit auf 10-15/Tag pro Mailbox gesetzt',
          'Total nicht über 40/Tag pro Mailbox',
          'Ramp-up: Tag 15-16 mit 5 Kampagnen gestartet',
          'Tag 17-18: Auf 8 Kampagnen erhöht',
          'Tag 19-21: Auf 10-15 Kampagnen erhöht',
          'Bounce Rate gecheckt: Unter 3%',
          'Spam Complaints gecheckt: Unter 0.3%',
          'Inbox Placement stabil: Über 90%'
        ],
        resources: [
          { title: 'Blacklist Prüfer', type: 'tool', href: '/tools/blacklist-pruefer' }
        ],
        tips: [
          'Bounce Rate über 3%? Sofort stoppen und Lead-Liste prüfen!',
          'Warmup NIEMALS reduzieren nur weil Kampagnen laufen',
          'Die ersten Kampagnen-Tage sind kritisch - täglich checken'
        ]
      },
      {
        id: '2-7',
        title: 'Woche 4: Vollbetrieb erreichen (Tag 22-28)',
        description: 'In der letzten Woche des initialen Warmups erreichst du Vollbetrieb. Deine Domain ist jetzt "erwachsen" und kann das volle Volumen handeln - wenn du alles richtig gemacht hast.',
        content: `**Woche 4 ist Graduation Time.** Deine Domain hat jetzt fast einen Monat Reputation aufgebaut. Die Provider vertrauen dir. Jetzt geht es darum, das Maximum rauszuholen - ohne es zu übertreiben.

**Die Zahlen für Woche 4:**

**Warmup-Emails pro Tag:** 25-30 pro Mailbox
**Kampagnen-Emails pro Tag:** 20-25 pro Mailbox
**Total pro Mailbox:** 45-55 Emails/Tag

**Das ist das Maximum!** Mehr als 50-60 Emails pro Mailbox pro Tag solltest du **niemals** senden, egal wie gut deine Reputation ist. Email Provider sehen das als unnatürlich.

**Die 50/50 Regel für etablierte Mailboxen:**

Ab Woche 4 kannst du zur **50/50 Regel** übergehen: 50% Warmup, 50% Kampagnen. Bei 50 Emails Total bedeutet das: 25 Warmup + 25 Kampagnen.

**Manche gehen sogar auf 40/60** (40% Warmup, 60% Kampagnen). Das ist okay, aber **niemals unter 30% Warmup**. Warmup läuft immer weiter.

**In Instantly anpassen:**

1) **Warmup Settings:** Daily Limit: 25-30 (Maximum), Reply Rate: 30-40% (bleibt gleich)

2) **Campaign Settings:** Daily Limit per Email Account: 20-25, Sending Window: wie gehabt

**In Smartlead anpassen:**

1) **Email Account Settings:** Daily Email Limit: 50-55 (Maximum Total), Warmup Emails per Day: 25-30

**Finale Checks vor der Skalierung:**

Bevor du sagst "Ich bin fertig mit Warmup", mache diese finale Prüfung:

**DNS Records Check:** Gehe zum DNS Checker Tool, Prüfe SPF, DKIM, DMARC nochmal, Alles grün? Weiter. Etwas rot? Sofort fixen.

**Blacklist Check:** Nutze den Blacklist Prüfer, Domain und IP checken, Auf keiner Liste? Perfekt. Auf einer Liste? Sofort handeln (siehe Troubleshooting).

**Inbox Placement Check:** Rate sollte stabil **>95%** sein, Wenn unter 95%: Noch nicht skalieren, Wenn über 95%: Du bist bereit.

**Was bedeutet "Vollbetrieb"?**

**Pro Mailbox:** 45-55 Emails/Tag (Maximum)
**Pro Domain (mit 3 Mailboxen):** 135-165 Emails/Tag
**Pro Setup (mit 3 Domains x 3 Mailboxen):** 400-500 Emails/Tag

Das ist **ernsthaftes Volumen**. Wenn du mehr brauchst, fügst du nicht mehr Emails pro Mailbox hinzu, sondern **mehr Mailboxen und Domains**.

**Du hast es geschafft!** Nach 4 Wochen hast du eine voll funktionsfähige, skalierbare Email-Infrastruktur. Aber die Arbeit hört hier nicht auf - Warmup ist ein **kontinuierlicher Prozess**.`,
        duration: '7 Tage (täglich 10 Min Check)',
        checklist: [
          'Warmup bei 25-30/Tag stabilisiert',
          'Kampagnen bei 20-25/Tag',
          'Total pro Mailbox: 45-55 (nicht mehr!)',
          'DNS Records final gecheckt - alles grün',
          'Blacklist Check durchgeführt - keine Einträge',
          'Inbox Placement stabil >95%',
          'Bounce Rate unter 3%',
          'Spam Complaints unter 0.3%',
          'Bereit für Skalierung!'
        ],
        resources: [
          { title: 'DNS Checker', type: 'tool', href: '/tools/dns-checker' },
          { title: 'Blacklist Prüfer', type: 'tool', href: '/tools/blacklist-pruefer' }
        ],
        tips: [
          '50 Emails pro Mailbox ist das Maximum - niemals überschreiten',
          'Für mehr Volumen: Mehr Mailboxen hinzufügen, nicht mehr Emails pro Mailbox',
          '95%+ Inbox Placement ist dein Ziel - darunter noch nicht skalieren'
        ]
      },
      {
        id: '2-8',
        title: 'Langfristige Warmup-Strategie',
        description: 'Warmup ist kein einmaliges Projekt, sondern ein kontinuierlicher Prozess. Hier erfährst du, wie du langfristig deine Reputation erhältst und bei Bedarf neue Domains hinzufügst.',
        content: `**Der größte Fehler nach dem initialen Warmup:** Warmup abschalten. **TU DAS NIEMALS.** Deine Reputation ist wie ein Muskel - wenn du aufhörst zu trainieren, baut sie ab.

**Warmup im laufenden Betrieb:**

Nach dem 4-Wochen Setup reduzierst du Warmup **leicht**, aber schaltest es niemals ab.

**Empfohlene Aufteilung für laufenden Betrieb:**
Warmup: **15-20 Emails/Tag** (30-40% des Totals)
Kampagnen: **25-35 Emails/Tag** (60-70% des Totals)
Total: **40-50 Emails/Tag** pro Mailbox

**Warum weiterhin Warmup?**

1) **Reputation-Stabilisierung:** Warmup-Emails haben garantiert positive Signale (Öffnungen, Replies). Diese gleichen negative Kampagnen-Signale aus.

2) **Algorithmus-Freundlichkeit:** Email Provider mögen konsistente Patterns. Reines Kampagnen-Volumen ohne positive Engagement-Signale ist verdächtig.

3) **Recovery-Puffer:** Wenn mal eine Kampagne schlecht performt, hält das Warmup deine Reputation oben.

**Wann neue Domains/Mailboxen hinzufügen?**

Du brauchst mehr Kapazität wenn: Deine aktuellen Mailboxen konstant am Limit sind (50/Tag), Du mehr als 500 Emails/Tag senden willst, Du neue Segmente mit separaten Domains ansprechen willst.

**Neue Domain hinzufügen - Der Prozess:**

**Wichtig:** Jede neue Domain startet wieder bei 0. Du musst den **kompletten 4-Wochen Warmup** wiederholen. Es gibt keine Abkürzung.

**Plane voraus:** Kaufe neue Domains **3-4 Wochen** bevor du sie brauchst. So sind sie ready wenn du skalieren willst.

**Saisonale Anpassungen:**

**Q4 (Oktober-Dezember):** Vorsichtiger sein! Viel Konkurrenz, Provider sind strenger. Warmup-Anteil erhöhen auf 40-50%.

**Januar:** "Inbox Zero" Mentalität - Menschen räumen auf. Guter Zeitpunkt für Cold Email, aber auch viel Spam. Normal bleiben.

**Sommer (Juli-August):** Weniger Email-Aktivität generell. Volumen reduzieren macht Sinn (nicht wegen Deliverability, sondern wegen Erreichbarkeit).

**Die Rotations-Strategie:**

Wenn du mehrere Domains hast, rotiere sie intelligent: Woche 1-2: Domain A führt, Domain B + C supporten. Woche 3-4: Domain B führt, Domain A + C supporten. Etc.

Das verteilt die Last und verhindert, dass eine Domain "ausbrennt".`,
        duration: 'Ongoing',
        checklist: [
          'Verstanden: Warmup NIEMALS komplett abschalten',
          'Langfristige Aufteilung: 30-40% Warmup, 60-70% Kampagnen',
          'Neue Domains 3-4 Wochen im Voraus kaufen',
          'Jede neue Domain: Komplettes 4-Wochen Warmup',
          'Q4 vorsichtiger: Warmup-Anteil erhöhen',
          'Bei mehreren Domains: Rotations-Strategie nutzen',
          'Regelmäßige Checks: Wöchentlich Inbox Rate, Monthly Blacklist'
        ],
        tips: [
          'Warmup ist wie Fitness - aufhören bedeutet Rückschritt',
          'Neue Domains immer im Voraus kaufen und aufwärmen',
          'In Q4 besonders vorsichtig sein - Provider sind strenger'
        ]
      },
      {
        id: '2-9',
        title: 'Instantly vs. Smartlead: Der direkte Vergleich',
        description: 'Beide Tools sind exzellent für Cold Email. Aber sie haben unterschiedliche Stärken. Hier ist der ehrliche Vergleich, damit du die richtige Entscheidung für deine Situation treffen kannst.',
        content: `**Instantly und Smartlead sind die beiden Marktführer** für Cold Email Outreach. Beide funktionieren, beide haben Warmup integriert, aber sie haben unterschiedliche Stärken.

**Instantly.ai - Der Allrounder**

**Preis:** Ab ~$30/Monat (Growth Plan)
**Warmup:** Inklusive, großer Pool (200k+ Mailboxen)
**Mailbox-Limit:** Unlimited Mailboxen (ab Growth Plan)

**Stärken:**
- **Einfachheit:** Intuitive Oberfläche, schnell eingerichtet
- **Warmup inklusive:** Kein extra Tool oder Kosten nötig
- **Großer Pool:** 200k+ Mailboxen für natürliche Warmup-Patterns
- **Lead Database:** Eingebaute Lead-Suche (B2B Lead Finder)
- **Preis-Leistung:** Beste Option für Einzelpersonen und kleine Teams

**Schwächen:**
- **Agency-Features:** Nicht ideal für Agenturen mit vielen Kunden
- **Reporting:** Basis-Reports, nicht so detailliert wie Smartlead
- **API:** Vorhanden, aber nicht so umfangreich

**Smartlead - Der Agency-Champion**

**Preis:** Ab ~$39/Monat (Basic Plan), Warmup oft extra
**Warmup:** Integriert, separater Pool
**Mailbox-Limit:** Begrenzt je nach Plan

**Stärken:**
- **Agency-Features:** White-Label, Client Management, Sub-Accounts
- **Detailliertes Reporting:** Granulare Analysen und Exports
- **Master Inbox:** Alle Replies zentral, sehr übersichtlich
- **API & Integrationen:** Umfangreicher als Instantly
- **Skalierung:** Besser für große Volumen und Teams

**Schwächen:**
- **Komplexität:** Steilere Lernkurve
- **Preis:** Teurer, besonders mit Warmup-Addon
- **Warmup-Pool:** Kleiner als Instantly

**Warmup-Vergleich im Detail:**

| Feature | Instantly | Smartlead |
|---------|-----------|-----------|
| Pool-Size | 200k+ | ~50k |
| Im Preis inklusive | Ja | Manchmal extra |
| Reply Rate Setting | 30-40% | 30-40% |
| Ramp-up | Automatisch | Automatisch |
| Aus Spam holen | Ja | Ja |

**Kampagnen-Limits Vergleich:**

| Feature | Instantly | Smartlead |
|---------|-----------|-----------|
| Empfehlung/Mailbox | 40-50/Tag | 40-50/Tag |
| Absolutes Max | 50-60/Tag | 50-60/Tag |
| Sending Windows | Flexibel | Flexibel |
| Timezone Support | Ja | Ja |

**Meine Empfehlung:**

**Wähle Instantly wenn:** Du Einzelperson oder kleines Team bist, Du ein einfaches Setup willst, Budget ein Faktor ist, Du keine Agency-Features brauchst.

**Wähle Smartlead wenn:** Du eine Agency mit mehreren Kunden bist, Du detaillierte Reports brauchst, Du größere Teams koordinierst, Budget kein Hauptfaktor ist.

**Für dieses Playbook:** Beide Tools funktionieren identisch für Warmup. Die Zahlen und Empfehlungen gelten für beide.`,
        duration: '15 Minuten Lesen',
        checklist: [
          'Instantly vs. Smartlead Unterschiede verstanden',
          'Pool-Size Unterschied verstanden (Instantly größer)',
          'Agency-Features bei Smartlead notiert',
          'Preis-Leistung verglichen',
          'Entscheidung getroffen: Instantly oder Smartlead',
          'Tool-Account erstellt'
        ],
        resources: [
          { title: 'Instantly.ai', type: 'link', href: 'https://instantly.ai' },
          { title: 'Smartlead', type: 'link', href: 'https://smartlead.ai' }
        ],
        tips: [
          'Für die meisten Einzelpersonen: Instantly ist die bessere Wahl',
          'Für Agencies: Smartlead hat die besseren Management-Features',
          'Die Warmup-Zahlen in diesem Guide gelten für beide Tools identisch'
        ]
      },
      {
        id: '2-10',
        title: 'Troubleshooting & Recovery',
        description: 'Was tun wenn etwas schiefgeht? Inbox Rate fällt, Domain auf Blacklist, plötzliche Bounces - hier sind die Lösungen für die häufigsten Probleme.',
        content: `**Probleme werden passieren.** Auch wenn du alles richtig machst, können externe Faktoren deine Deliverability beeinflussen. Hier ist dein Troubleshooting-Handbuch.

**Problem 1: Inbox Placement Rate fällt unter 80%**

**Symptom:** Dashboard zeigt plötzlich niedrige Inbox Rate (unter 80%).

**Sofort-Maßnahmen:**
1) **Kampagnen pausieren** - Sofort, keine Ausnahme
2) **Warmup-Volumen reduzieren** um 50% (z.B. von 25 auf 12)
3) **DNS Records checken** - Ist SPF/DKIM/DMARC noch korrekt?
4) **Blacklist Check** durchführen

**Nach 2-3 Tagen:**
5) Wenn Rate sich erholt (>85%): Langsam wieder hochskalieren
6) Wenn keine Besserung: Weiter zu Problem 4 (Blacklist)

**Problem 2: Bounce Rate über 3%**

**Symptom:** Viele Emails bouncen zurück (Hard Bounces).

**Ursache:** Fast immer **schlechte Lead-Daten**. Die Email-Adressen existieren nicht oder sind falsch.

**Sofort-Maßnahmen:**
1) **Kampagne sofort stoppen**
2) Lead-Liste prüfen: Woher kamen die Daten?
3) **Alle Leads durch Email-Validierung** laufen lassen (NeverBounce, ZeroBounce)
4) Nur "Valid" Emails behalten, "Invalid" und "Unknown" löschen
5) "Catch-All" Emails in separate Liste - mit Vorsicht nutzen

**Langfristig:**
- Immer Email-Validierung VOR dem Senden
- Niemals Listen kaufen ohne Validierung
- Bei eigener Recherche: Double-Check Email-Format

**Problem 3: Spam Complaints über 0.3%**

**Symptom:** Empfänger markieren deine Email als Spam.

**Ursache:** Meistens **schlechte Copy** oder **falsche Zielgruppe**. Die Menschen fühlen sich belästigt.

**Sofort-Maßnahmen:**
1) **Kampagne pausieren**
2) Copy analysieren: Ist sie zu "salesy"? Zu lang? Zu viele Links?
3) Zielgruppe prüfen: Passen die Empfänger zu deinem Angebot?
4) Unsubscribe-Link hinzufügen (falls nicht vorhanden)

**Copy-Fixes:**
- Kürzer (50-125 Wörter)
- Persönlicher (weniger "wir", mehr "du")
- Keine Links im ersten Email
- Frage als CTA statt Forderung

**Problem 4: Domain auf Blacklist**

**Symptom:** Blacklist-Check zeigt Einträge.

**Das ist ernst, aber nicht das Ende.** Die meisten Blacklists sind temporär und haben Delisting-Prozesse.

**Sofort-Maßnahmen:**
1) **ALLE Kampagnen sofort stoppen**
2) **Warmup weiterlaufen lassen** (nur Warmup!)
3) Identifiziere welche Blacklist(s) betroffen sind
4) Gehe auf die Website der Blacklist
5) Finde den "Delisting" oder "Removal" Prozess
6) Beantrage Delisting (oft kostenlos, manchmal Wartezeit)

**Die wichtigsten Blacklists und Delisting:**
- **Spamhaus:** Sehr ernst, Delisting komplex
- **Barracuda:** Delisting-Formular auf der Website
- **SORBS:** Oft automatisches Delisting nach Zeit
- **SpamCop:** Manuelles Delisting möglich

**Nach Delisting:**
- 1-2 Wochen nur Warmup, keine Kampagnen
- Dann sehr langsam wieder starten (5 Emails/Tag)
- Eng monitoren

**Problem 5: Alles war gut, plötzlich Probleme**

**Symptom:** Wochen ohne Probleme, dann plötzlich Deliverability-Drop.

**Mögliche Ursachen:**
- Provider-Algorithmus Update (passiert öfter als man denkt)
- Andere Nutzer auf geteilter IP haben Probleme (bei Google/Microsoft)
- Saisonale Schwankungen (Q4 ist härter)
- DNS-Änderungen die du vergessen hast

**Vorgehen:**
1) DNS Records checken - hat sich was geändert?
2) Blacklist Check
3) Wenn beides okay: Volumen temporär reduzieren
4) 1 Woche beobachten
5) Oft erholt es sich von selbst

**Wann eine Domain aufgeben?**

**Versuche Recovery wenn:** Einmaliger Vorfall, Domain weniger als 3 Monate alt, Auf nur 1-2 kleineren Blacklists.

**Erwäge neue Domain wenn:** Wiederholt auf Blacklists trotz Fixes, Auf Spamhaus oder anderen großen Listen, Recovery nach 4 Wochen erfolglos, Domain-Reputation permanent beschädigt.

**Eine neue Domain kostet ~10€. Deine Zeit und verbrannte Leads sind mehr wert.** Manchmal ist Aufgeben die richtige Strategie.`,
        duration: 'Referenz bei Problemen',
        checklist: [
          'Troubleshooting-Guide gelesen und verstanden',
          'Weiß was zu tun bei: Inbox Rate Drop',
          'Weiß was zu tun bei: Bounce Rate über 3%',
          'Weiß was zu tun bei: Spam Complaints',
          'Weiß was zu tun bei: Blacklist-Eintrag',
          'Delisting-Prozesse der wichtigsten Blacklists bekannt',
          'Kriterien für Domain-Aufgabe verstanden'
        ],
        resources: [
          { title: 'DNS Checker', type: 'tool', href: '/tools/dns-checker' },
          { title: 'Blacklist Prüfer', type: 'tool', href: '/tools/blacklist-pruefer' },
          { title: 'Spamhaus Lookup', type: 'link', href: 'https://check.spamhaus.org/' },
          { title: 'MXToolbox Blacklist Check', type: 'link', href: 'https://mxtoolbox.com/blacklists.aspx' }
        ],
        tips: [
          'Bei Problemen: Erst Kampagnen stoppen, dann analysieren',
          'Warmup nie stoppen, auch bei Problemen - es hilft bei der Recovery',
          'Manchmal ist eine neue Domain besser als wochenlange Recovery-Versuche'
        ]
      }
    ]
  }
]

export function getPlaybookBySlug(slug: string): Playbook | undefined {
  return playbooks.find(p => p.slug === slug)
}
