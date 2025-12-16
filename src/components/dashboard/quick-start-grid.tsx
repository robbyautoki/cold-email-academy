'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileTextIcon,
  WrenchIcon,
  BookOpenIcon,
  GraduationCapIcon,
  BookMarkedIcon,
  ArrowRightIcon,
  SparklesIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { BorderBeam } from '@/components/ui/border-beam'

interface QuickStartItem {
  title: string
  description: string
  href: string
  icon: React.ElementType
  count: string
  badge?: string
}

const quickStartItems: QuickStartItem[] = [
  {
    title: 'Templates',
    description: 'Copy-Paste Email-Vorlagen',
    href: '/templates',
    icon: FileTextIcon,
    count: '25+',
    badge: 'Neu'
  },
  {
    title: 'Playbooks',
    description: 'Step-by-Step Guides',
    href: '/playbooks',
    icon: BookMarkedIcon,
    count: '4',
    badge: 'Neu'
  },
  {
    title: 'Tools',
    description: 'Praktische Utilities',
    href: '/tools',
    icon: WrenchIcon,
    count: '7'
  },
  {
    title: 'Kurse',
    description: 'Strukturiertes Lernen',
    href: '/kurse',
    icon: GraduationCapIcon,
    count: '1'
  },
  {
    title: 'Knowledge Base',
    description: 'Tiefes Wissen & Artikel',
    href: '/knowledge-base',
    icon: BookOpenIcon,
    count: '50+'
  }
]

function QuickStartCard({ item, index }: { item: QuickStartItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <MotionPreset fade blur delay={0.1 + index * 0.03}>
      <Link
        href={item.href}
        className="group block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="relative h-full overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:scale-[1.02]">
          {/* Hover BorderBeam - nur Primary */}
          {isHovered && (
            <BorderBeam
              size={60}
              duration={4}
              colorFrom="hsl(var(--primary))"
              colorTo="hsl(var(--secondary))"
            />
          )}

          <CardContent className="p-5 flex flex-col items-center text-center">
            {/* Badge - Secondary statt Amber */}
            {item.badge && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 text-[10px] px-1.5 py-0 border-0"
              >
                <SparklesIcon className="size-2.5 mr-0.5" />
                {item.badge}
              </Badge>
            )}

            {/* Icon with Primary background */}
            <div className="relative flex size-14 items-center justify-center rounded-xl mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-primary shadow-md">
              <item.icon className="size-7 text-primary-foreground" />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
            </div>

            {/* Title */}
            <h3 className="font-semibold text-base mb-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
              {item.description}
            </p>

            {/* Count with animated arrow */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              <span className="tabular-nums bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                {item.count}
              </span>
              <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </MotionPreset>
  )
}

export function QuickStartGrid() {
  return (
    <MotionPreset fade blur delay={0.15}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Schnellstart</h2>
          <span className="text-xs text-muted-foreground">
            Wähle einen Bereich
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {quickStartItems.map((item, index) => (
            <QuickStartCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </MotionPreset>
  )
}
