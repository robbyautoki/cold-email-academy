'use client'

import { motion } from 'motion/react'
import {
  FileTextIcon,
  BookMarkedIcon,
  WrenchIcon,
  GraduationCapIcon,
  BookOpenIcon,
  TargetIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ZapIcon,
  LockIcon
} from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BorderBeam } from '@/components/ui/border-beam'
import { MotionPreset } from '@/components/ui/motion-preset'
import { NumberTicker } from '@/components/dashboard/number-ticker'

const features = [
  {
    title: 'Email Templates',
    description: 'Copy-paste Vorlagen für jeden Anwendungsfall. Von Erstkontakt bis Follow-up.',
    count: 25,
    suffix: '+',
    icon: FileTextIcon,
    items: ['Erstkontakt', 'Follow-up', 'Breakup', 'Meeting Request'],
    span: 'col-span-1 md:col-span-2'
  },
  {
    title: 'Playbooks',
    description: 'Step-by-Step Guides für deine erste Kampagne.',
    count: 4,
    suffix: '',
    icon: BookMarkedIcon,
    items: ['Erste Kampagne', 'Skalierung', 'Automation'],
    span: 'col-span-1'
  },
  {
    title: 'Kostenlose Tools',
    description: 'SPF Generator, DNS Checker, Email Validator und mehr.',
    count: 7,
    suffix: '',
    icon: WrenchIcon,
    items: ['SPF Generator', 'DNS Checker', 'MX Check', 'Blacklist Check'],
    span: 'col-span-1'
  },
  {
    title: 'Masterclass Kurs',
    description: 'Von Grundlagen bis zur Skalierung. 5 Module, 24+ Lektionen.',
    count: 24,
    suffix: '+',
    icon: GraduationCapIcon,
    items: ['Modul 1: Basics', 'Modul 2: Setup', 'Modul 3: Kampagnen'],
    span: 'col-span-1 md:col-span-2'
  },
  {
    title: 'Knowledge Base',
    description: 'Tiefgehendes Wissen zu jedem Cold Email Thema.',
    count: 50,
    suffix: '+',
    icon: BookOpenIcon,
    items: ['Deliverability', 'Compliance', 'Copywriting', 'Tech Setup'],
    span: 'col-span-1'
  },
  {
    title: 'Praxis-Checklisten',
    description: 'Schritt-für-Schritt Checklisten zum Abhaken.',
    count: 10,
    suffix: '+',
    icon: TargetIcon,
    items: ['Pre-Launch', 'Kampagnen-Check', 'Optimierung'],
    span: 'col-span-1'
  }
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon

  return (
    <MotionPreset
      fade
      blur
      slide={{ direction: 'up', offset: 30 }}
      delay={0.2 + index * 0.1}
      className={feature.span}
    >
      <Card className="group relative h-full overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50">
        {/* Hover BorderBeam - Neutral */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <BorderBeam
            size={100}
            duration={6}
            colorFrom="#18181b"
            colorTo="#71717a"
          />
        </div>

        <CardContent className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-transform duration-300 group-hover:scale-110">
              <Icon className="size-7 text-zinc-700 dark:text-zinc-300" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                <NumberTicker value={feature.count} suffix={feature.suffix} />
              </div>
              <div className="text-xs text-muted-foreground">Inhalte</div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {feature.description}
            </p>

            {/* Preview Items */}
            <div className="space-y-2">
              {feature.items.slice(0, 3).map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircleIcon className="size-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.div>
              ))}
              {feature.items.length > 3 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LockIcon className="size-4 text-zinc-400" />
                  <span className="blur-[2px]">+ {feature.items.length - 3} mehr...</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <span className="inline-flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
              Zugang freischalten
              <ArrowRightIcon className="size-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </MotionPreset>
  )
}

export function FeaturesBento() {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionPreset fade blur delay={0.1}>
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 mb-4"
            >
              <ZapIcon className="size-3.5 mr-1.5 text-primary" />
              Was dich erwartet
            </Badge>
          </MotionPreset>

          <MotionPreset fade blur delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Alles für deinen{' '}
              <span className="text-primary">
                Cold Email Erfolg
              </span>
            </h2>
          </MotionPreset>

          <MotionPreset fade blur delay={0.3}>
            <p className="text-lg text-muted-foreground">
              Von Templates bis Masterclass - wir haben alles, was du brauchst.
              Und das Beste: Es ist komplett kostenlos.
            </p>
          </MotionPreset>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA */}
        <MotionPreset fade blur delay={0.8}>
          <div className="mt-12 text-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02]"
              >
                <ZapIcon className="size-4 mr-2" />
                Jetzt kostenlos registrieren
                <ArrowRightIcon className="size-4 ml-2" />
              </Button>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Keine Kreditkarte erforderlich
            </p>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}
