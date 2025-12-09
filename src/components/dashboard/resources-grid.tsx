'use client'

import Link from 'next/link'
import {
  WrenchIcon,
  BookOpenIcon,
  GraduationCapIcon,
  FileTextIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  PenToolIcon,
  ServerIcon,
  MailCheckIcon,
  GlobeIcon,
  CalculatorIcon,
  AlertTriangleIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { BorderBeam } from '@/components/ui/border-beam'

const tools = [
  { name: 'SPF Generator', icon: ShieldCheckIcon, href: '/tools/spf-generator' },
  { name: 'Email Signatur', icon: PenToolIcon, href: '/tools/email-signatur' },
  { name: 'MX Record Check', icon: ServerIcon, href: '/tools/mx-record-check' },
  { name: 'Email Verifizierung', icon: MailCheckIcon, href: '/tools/email-verifizierung' },
  { name: 'DNS Checker', icon: GlobeIcon, href: '/tools/dns-checker' },
  { name: 'Email Kalkulator', icon: CalculatorIcon, href: '/tools/email-kalkulator' },
  { name: 'Blacklist Prüfer', icon: AlertTriangleIcon, href: '/tools/blacklist-pruefer' }
]

const kbCategories = [
  'Cold Email Grundlagen',
  'Deliverability',
  'Copywriting',
  'Lead Generation',
  'Automatisierung'
]

export function ResourcesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Tools Card - Large */}
      <MotionPreset fade blur delay={0.1}>
        <Link href="/tools" className="group block h-full">
          <Card className="relative h-full overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <BorderBeam
              size={200}
              duration={12}
              colorFrom="rgb(161 161 170)"
              colorTo="rgb(82 82 91)"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <WrenchIcon className="size-6 text-zinc-600 dark:text-zinc-400" />
                </div>
                <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {tools.length} Tools
                </Badge>
              </div>

              <h3 className="text-xl font-semibold mb-2">Tools & Utilities</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Professionelle Tools für Cold Email Setup und Analyse
              </p>

              {/* Mini Tool Grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {tools.slice(0, 4).map((tool) => (
                  <div
                    key={tool.name}
                    className="flex size-10 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
                  >
                    <tool.icon className="size-4 text-zinc-500" />
                  </div>
                ))}
              </div>

              <div className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                Alle Tools ansehen
                <ArrowRightIcon className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </MotionPreset>

      {/* Knowledge Base Card - Large */}
      <MotionPreset fade blur delay={0.2}>
        <Link href="/knowledge-base" className="group block h-full">
          <Card className="relative h-full overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <BorderBeam
              size={200}
              duration={12}
              colorFrom="rgb(161 161 170)"
              colorTo="rgb(82 82 91)"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <BookOpenIcon className="size-6 text-zinc-600 dark:text-zinc-400" />
                </div>
                <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  50+ Artikel
                </Badge>
              </div>

              <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Tiefgreifendes Wissen zu Cold Emails und Outreach
              </p>

              {/* Category Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {kbCategories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-1 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                Zur Knowledge Base
                <ArrowRightIcon className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </MotionPreset>

      {/* Right Column - Stacked */}
      <div className="flex flex-col gap-4">
        {/* Kurs Card - Small with Bonus Badge */}
        <MotionPreset fade blur delay={0.3}>
          <Link href="/kurse" className="group block">
            <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      <GraduationCapIcon className="size-5 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Cold Email Kurs</h3>
                        <Badge className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] px-1.5 py-0 gap-0.5">
                          <SparklesIcon className="size-2.5" />
                          Bonus
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Kostenloser Videokurs für Mitglieder
                      </p>
                    </div>
                  </div>
                  <ArrowRightIcon className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </MotionPreset>

        {/* Templates Card - Coming Soon */}
        <MotionPreset fade blur delay={0.4}>
          <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <FileTextIcon className="size-5 text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-zinc-500 dark:text-zinc-400">Templates</h3>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-zinc-300 dark:border-zinc-600 text-zinc-500">
                        Coming Soon
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      Email-Vorlagen und Sequenzen
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionPreset>
      </div>
    </div>
  )
}
