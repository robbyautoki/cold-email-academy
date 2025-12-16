import { MailIcon, ShieldCheckIcon, RepeatIcon } from 'lucide-react'

export interface ChecklistItem {
  id: string
  label: string
}

export interface Checklist {
  slug: string
  title: string
  description: string
  icon: string // Icon name as string for serialization
  items: ChecklistItem[]
}

export const checklists: Checklist[] = [
  {
    slug: 'cold-email',
    title: 'Cold Email Kampagnen',
    description: 'Alles was du für erfolgreiche Cold Email Kampagnen brauchst - von der Zielgruppendefinition bis zum A/B Testing.',
    icon: 'mail',
    items: [
      { id: 'ce-1', label: 'Zielgruppe definiert (ICP)' },
      { id: 'ce-2', label: 'Email-Liste verifiziert' },
      { id: 'ce-3', label: 'Domain aufgewärmt (min. 2 Wochen)' },
      { id: 'ce-4', label: 'SPF, DKIM, DMARC konfiguriert' },
      { id: 'ce-5', label: 'Personalisierte Betreffzeile' },
      { id: 'ce-6', label: 'Max. 150 Wörter pro Email' },
      { id: 'ce-7', label: 'Klarer CTA (nur einer)' },
      { id: 'ce-8', label: 'Follow-up Sequenz geplant (3-5 Emails)' },
      { id: 'ce-9', label: 'Tracking eingerichtet' },
      { id: 'ce-10', label: 'A/B Test vorbereitet' }
    ]
  },
  {
    slug: 'deliverability',
    title: 'Email Deliverability',
    description: 'Stelle sicher, dass deine Emails im Posteingang landen und nicht im Spam-Ordner verschwinden.',
    icon: 'shield',
    items: [
      { id: 'dl-1', label: 'Dedizierte Domain für Outreach' },
      { id: 'dl-2', label: 'SPF Record eingerichtet' },
      { id: 'dl-3', label: 'DKIM signiert' },
      { id: 'dl-4', label: 'DMARC Policy aktiv' },
      { id: 'dl-5', label: 'Blacklist-Status geprüft' },
      { id: 'dl-6', label: 'Bounce-Rate unter 2%' },
      { id: 'dl-7', label: 'Spam-Score getestet' },
      { id: 'dl-8', label: 'Sending Limit eingehalten (30-50/Tag)' },
      { id: 'dl-9', label: 'Email-Validierung durchgeführt' },
      { id: 'dl-10', label: 'Warmup-Tool aktiv' }
    ]
  },
  {
    slug: 'follow-up',
    title: 'Follow-Up Sequenz',
    description: 'Optimiere deine Follow-Up Strategie für maximale Antwortquoten und bessere Konversionen.',
    icon: 'repeat',
    items: [
      { id: 'fu-1', label: 'Timing festgelegt (2-3 Tage Abstand)' },
      { id: 'fu-2', label: 'Jede Email bietet neuen Wert' },
      { id: 'fu-3', label: 'Verschiedene Ansätze (Pain Point, Social Proof, Case Study)' },
      { id: 'fu-4', label: 'Betreffzeilen variieren' },
      { id: 'fu-5', label: 'Breakup-Email als letzte' },
      { id: 'fu-6', label: 'Automatisierung eingerichtet' },
      { id: 'fu-7', label: 'Reply-Detection aktiv' },
      { id: 'fu-8', label: 'Opt-out respektiert' },
      { id: 'fu-9', label: 'Performance-Tracking' },
      { id: 'fu-10', label: 'Learnings dokumentiert' }
    ]
  }
]

export function getChecklistBySlug(slug: string): Checklist | undefined {
  return checklists.find(c => c.slug === slug)
}
