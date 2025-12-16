'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRightIcon,
  BookMarkedIcon,
  FileTextIcon,
  GraduationCapIcon,
  CalendarIcon,
  SparklesIcon,
  TrendingUpIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { BorderBeam } from '@/components/ui/border-beam'

interface RecommendationItem {
  type: 'playbook' | 'template' | 'course' | 'call'
  title: string
  description: string
  href: string
  reason: string
  highlight?: boolean
}

const recommendations: RecommendationItem[] = [
  {
    type: 'playbook',
    title: 'Erste Kampagne in 7 Tagen',
    description: 'Starte deine erste Cold Email Kampagne mit diesem Schritt-für-Schritt Guide.',
    href: '/playbooks/erste-kampagne',
    reason: 'Perfekt für den Einstieg'
  },
  {
    type: 'template',
    title: 'Der Direkte Ansatz',
    description: 'Unser erfolgreichstes Template für den Erstkontakt.',
    href: '/templates/erstkontakt',
    reason: '12% Reply Rate'
  },
  {
    type: 'call',
    title: 'Discovery Call buchen',
    description: 'Lass uns dein Setup gemeinsam planen – kostenlos und unverbindlich.',
    href: '/beratung',
    reason: '15 Min. gratis',
    highlight: true
  }
]

const typeConfig = {
  playbook: {
    icon: BookMarkedIcon,
    label: 'Playbook'
  },
  template: {
    icon: FileTextIcon,
    label: 'Template'
  },
  course: {
    icon: GraduationCapIcon,
    label: 'Kurs'
  },
  call: {
    icon: CalendarIcon,
    label: 'Beratung'
  }
}

function RecommendationCard({ item, index }: { item: RecommendationItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const config = typeConfig[item.type]
  const Icon = config.icon

  return (
    <MotionPreset fade blur delay={0.25 + index * 0.03}>
      <Link
        href={item.href}
        className="group block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className={`
          relative h-full overflow-hidden transition-all duration-300
          hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
          hover:scale-[1.02]
          ${item.highlight
            ? 'border-secondary/50 dark:border-secondary/30 bg-secondary/5'
            : 'border-zinc-200 dark:border-zinc-800'
          }
        `}>
          {/* BorderBeam for highlighted items or on hover */}
          {(item.highlight || isHovered) && (
            <BorderBeam
              size={80}
              duration={6}
              colorFrom="hsl(var(--primary))"
              colorTo="hsl(var(--secondary))"
            />
          )}

          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              {/* Icon with Primary background */}
              <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 bg-primary shadow-md">
                <Icon className="size-6 text-primary-foreground" />
                {/* Glow */}
                <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 border-0"
                  >
                    {config.label}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    {item.type === 'template' && <TrendingUpIcon className="size-2.5 text-primary" />}
                    {item.reason}
                  </span>
                </div>
                <h3 className="font-semibold text-base line-clamp-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className={`
                inline-flex items-center text-xs font-medium transition-all duration-300
                ${item.highlight
                  ? 'text-primary group-hover:text-primary/80'
                  : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
                }
              `}>
                {item.highlight && <SparklesIcon className="size-3 mr-1" />}
                {item.type === 'call' ? 'Termin buchen' : 'Ansehen'}
                <ArrowRightIcon className="size-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </MotionPreset>
  )
}

export function Recommendations() {
  return (
    <MotionPreset fade blur delay={0.2}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Empfohlen für dich</h2>
          <span className="text-xs text-muted-foreground">
            Basierend auf deinem Fortschritt
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {recommendations.map((item, index) => (
            <RecommendationCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </MotionPreset>
  )
}
