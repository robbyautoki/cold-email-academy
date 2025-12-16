'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import {
  WrenchIcon,
  BookOpenIcon,
  BookMarkedIcon,
  ArrowRightIcon,
  LightbulbIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  CalculatorIcon,
  ClockIcon,
  PlayCircleIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MotionPreset } from '@/components/ui/motion-preset'
import { BorderBeam } from '@/components/ui/border-beam'

import { knowledgeBaseCategories } from '@/data/knowledgeBase'

// Quick Links zu allen Bereichen
const quickLinks = [
  { title: 'Playbooks', href: '/playbooks', icon: BookMarkedIcon, count: '4', badge: 'Neu' },
  { title: 'Email Kalkulator', href: '/tools/email-kalkulator', icon: CalculatorIcon, count: 'Tool', badge: 'Neu' },
  { title: 'Knowledge Base', href: '/knowledge-base', icon: BookOpenIcon, count: '50+' },
  { title: 'Checklisten', href: '/checklisten', icon: ClipboardCheckIcon, count: '8' },
  // AUSGEBLENDET: Templates - später wieder aktivieren
  // { title: 'Templates', href: '/templates', icon: FileTextIcon, count: '25+', badge: 'Neu' },
  // AUSGEBLENDET: Kurse - später wieder aktivieren
  // { title: 'Kurse', href: '/kurse', icon: GraduationCapIcon, count: '1' },
]

// Knowledge Base Artikel Highlights
const kbHighlights = knowledgeBaseCategories.flatMap(cat => cat.articles).slice(0, 3)

// Tips - kurz gehalten für konstante Card-Höhe
const tips = [
  { title: 'Beste Sendezeit', content: 'Sende Cold Emails zwischen 8-10 Uhr morgens. Dienstag bis Donnerstag funktioniert am besten.' },
  { title: 'Personalisierung', content: 'Emails mit personalisierter Betreffzeile haben 26% höhere Öffnungsraten.' },
  { title: 'Follow-up ist King', content: '80% der Deals werden erst nach dem 5. Follow-up abgeschlossen. Bleib dran!' },
  { title: 'Kürze gewinnt', content: 'Die ideale Cold Email hat 50-125 Wörter. Kurz, prägnant und auf den Punkt.' }
]


// Difficulty Badge Mapping
const difficultyLabels = {
  beginner: 'Einsteiger',
  intermediate: 'Fortgeschritten',
  advanced: 'Experte'
}

export default function DashboardPage() {
  const { user } = useUser()
  const firstName = (user?.unsafeMetadata?.firstName as string) || user?.firstName || ''
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTipIndex(prev => (prev + 1) % tips.length), 8000)
    return () => clearInterval(interval)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Guten Morgen'
    if (hour < 18) return 'Guten Tag'
    return 'Guten Abend'
  }

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="space-y-6">
      {/* Row 1: Welcome + Pro Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome Hero */}
        <MotionPreset fade blur className="lg:col-span-2">
          <Card className="relative h-full overflow-hidden border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-primary/5 to-transparent">
            <BorderBeam size={150} duration={10} colorFrom="hsl(var(--primary))" colorTo="hsl(var(--secondary))" borderWidth={1.5} />
            {/* Grid Pattern Overlay with edge fade */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
              }}
            />
            {/* Decorative Gradient Blob - only blue */}
            <div className="absolute -right-12 -top-12 size-32 rounded-full bg-primary/10 blur-3xl" />
            <CardContent className="relative p-6 h-full flex items-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="size-14 border-2 border-zinc-200 dark:border-zinc-700 ring-4 ring-zinc-100 dark:ring-zinc-800">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 text-zinc-700 dark:text-zinc-300 text-lg font-bold">
                      {firstName ? getInitials(firstName) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base text-muted-foreground">{getGreeting()}</p>
                    <h1 className="text-2xl font-bold">{firstName || 'Willkommen zurück'}</h1>
                    <p className="text-base text-muted-foreground mt-0.5">Was möchtest du heute lernen?</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Link href="/playbooks" className="flex-1 sm:flex-none">
                    <Button variant="outline" size="lg" className="gap-2 w-full">
                      <BookMarkedIcon className="size-5" />
                      Playbooks
                    </Button>
                  </Link>
                  <Link href="/tools" className="flex-1 sm:flex-none">
                    <Button variant="outline" size="lg" className="gap-2 w-full">
                      <WrenchIcon className="size-5" />
                      Tools
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionPreset>

        {/* Pro Tip */}
        <MotionPreset fade blur delay={0.05}>
          <Card className="relative h-full overflow-hidden border-zinc-200 dark:border-zinc-800">
            {/* Background Logo - inline SVG for color control */}
            <svg
              width="168"
              height="213"
              viewBox="0 0 168 213"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -right-4 -top-4 size-32 pointer-events-none text-secondary"
            >
              <path
                d="M165.994 172.053C166.594 172.658 166.594 173.634 165.994 174.239L128.838 211.628C128.232 212.238 127.245 212.238 126.639 211.628L61.5835 146.162L100.924 106.575L165.994 172.053ZM61.5835 146.162L40.8619 167.016C40.2557 167.626 39.2687 167.626 38.6625 167.016L1.50826 129.627C0.907431 129.023 0.907418 128.046 1.50823 127.442L22.2437 106.575L61.5835 146.162ZM61.5845 66.9857L22.2437 106.575L0.450669 84.6439C-0.150169 84.0393 -0.150161 83.063 0.450689 82.4584L37.6059 45.0698C38.2121 44.4598 39.199 44.4598 39.8052 45.0698L61.5845 66.9857ZM167.051 37.847C167.652 38.4517 167.652 39.428 167.051 40.0326L100.924 106.575L61.5845 66.9857L127.697 0.457528C128.303 -0.15249 129.29 -0.152486 129.896 0.457537L167.051 37.847Z"
                fill="currentColor"
              />
            </svg>
            <CardContent className="relative p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
                  <LightbulbIcon className="size-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Pro Tip des Tages</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tipIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="h-[100px] overflow-hidden">
                  <h3 className="text-lg font-semibold mb-2">{tips[tipIndex].title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{tips[tipIndex].content}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-1.5 mt-4">
                {tips.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i === tipIndex ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionPreset>
      </div>

      {/* Row 2: Featured Playbook + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Featured Playbook */}
        <MotionPreset fade blur delay={0.1} className="lg:col-span-2">
          <Link href="/playbooks" className="group block h-full">
            <Card className="relative h-full overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              {/* Background Image */}
              <Image
                src="/website1.jpeg"
                alt="Playbook Vorschau"
                fill
                className="object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
              {/* Content */}
              <CardContent className="relative p-6 h-full flex flex-col justify-center items-center text-center min-h-[200px]">
                <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">Neu verfügbar</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">Playbooks</h2>
                <p className="text-white/80 text-lg mb-6">Schritt-für-Schritt Anleitungen für Cold Email Erfolg</p>
                <Button variant="secondary" size="lg" className="gap-2 group-hover:scale-105 transition-transform">
                  <PlayCircleIcon className="size-5" />
                  Jetzt entdecken
                  <ArrowRightIcon className="size-5" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </MotionPreset>

        {/* Quick Links */}
        <MotionPreset fade blur delay={0.15}>
          <Card className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-6 h-full flex flex-col">
              <h3 className="font-semibold text-lg mb-4">Schnellzugriff</h3>
              <div className="space-y-2 flex-1">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="group flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <link.icon className="size-5 text-primary" />
                      </div>
                      <span className="font-medium text-base">{link.title}</span>
                      {link.badge && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0">{link.badge}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm font-medium bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full">{link.count}</span>
                      <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionPreset>
      </div>

      {/* Row 3: Knowledge Base Highlights */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <BookOpenIcon className="size-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Knowledge Base</h2>
              <p className="text-base text-muted-foreground">Tiefes Wissen & Fachartikel</p>
            </div>
          </div>
          <Link href="/knowledge-base">
            <Button variant="outline" size="sm" className="gap-2">
              Alle Artikel <ArrowRightIcon className="size-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kbHighlights.map((article, index) => (
            <MotionPreset key={article.id} fade blur delay={0.2 + index * 0.05}>
              <Link href={`/knowledge-base/${article.categoryId}/${article.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="p-5 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {difficultyLabels[article.difficulty]}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <ClockIcon className="size-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-1 text-base font-medium text-primary mt-3 group-hover:gap-2 transition-all">
                      Artikel lesen
                      <ArrowRightIcon className="size-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </MotionPreset>
          ))}
        </div>
      </div>

      {/* Row 4: Discovery Call CTA - Full Width */}
      <MotionPreset fade blur delay={0.3}>
        <Card className="relative overflow-hidden border-primary bg-gradient-to-br from-primary via-primary to-primary/95">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-xl bg-secondary shadow-lg shrink-0">
                  <CalendarIcon className="size-7 text-secondary-foreground" />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2 border-secondary/30 bg-secondary/20 text-secondary">Kostenlos</Badge>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-foreground">Discovery Call buchen</h3>
                  <p className="text-base text-primary-foreground/80 mt-1 max-w-xl">
                    15 Minuten kostenloses Strategiegespräch mit einem Cold Email Experten. Lass uns gemeinsam dein Setup planen.
                  </p>
                </div>
              </div>
              <Link href="/beratung" className="shrink-0">
                <Button variant="secondary" size="lg" className="gap-2 w-full md:w-auto">
                  <CalendarIcon className="size-5" />
                  Termin vereinbaren
                  <ArrowRightIcon className="size-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </MotionPreset>

    </div>
  )
}
