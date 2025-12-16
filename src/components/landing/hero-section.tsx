'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  MailIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
  GiftIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/ui/border-beam'
import { MotionPreset } from '@/components/ui/motion-preset'
import { NumberTicker } from '@/components/dashboard/number-ticker'

const stats = [
  { value: 500, suffix: '+', label: 'Nutzer', icon: UsersIcon },
  { value: 25, suffix: '+', label: 'Templates', icon: MailIcon },
  { value: 87, suffix: '%', label: 'Erfolgsrate', icon: TrendingUpIcon }
]

const benefits = [
  '25+ fertige Email-Templates zum Kopieren',
  '7 Deliverability-Tools für mehr Inbox-Rate',
  'Masterclass mit 24+ Lektionen',
  '50+ Wissensartikel & Playbooks',
  'Praxis-Checklisten zum Abhaken'
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background - Subtle */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <MotionPreset fade blur delay={0.1}>
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
              >
                <GiftIcon className="size-3.5 mr-1.5 text-primary" />
                100% Kostenlos - Keine Kreditkarte
              </Badge>
            </MotionPreset>

            <MotionPreset fade blur delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Deine{' '}
                <span className="text-primary">
                  Cold Email
                </span>
                {' '}Schatzkiste
              </h1>
            </MotionPreset>

            <MotionPreset fade blur delay={0.3}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                Templates, Tools, Kurse & Guides - alles was du für erfolgreiche Cold Emails brauchst.
                Komplett kostenlos. Sofortiger Zugang.
              </p>
            </MotionPreset>

            {/* Benefits List */}
            <MotionPreset fade blur delay={0.4}>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground mb-3">Registriere dich und bekomme:</p>
                <ul className="space-y-2.5">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 text-sm sm:text-base"
                    >
                      <CheckCircleIcon className="size-5 text-primary shrink-0" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </MotionPreset>

            {/* CTA Buttons */}
            <MotionPreset fade blur delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background transition-all duration-300 hover:scale-[1.02]"
                  >
                    <ZapIcon className="size-4 mr-2" />
                    Kostenlos starten
                    <ArrowRightIcon className="size-4 ml-2" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto hover:scale-[1.02] transition-all duration-300"
                  >
                    Mehr erfahren
                  </Button>
                </Link>
              </div>
            </MotionPreset>

            {/* Stats */}
            <MotionPreset fade blur delay={0.7}>
              <div className="flex flex-wrap gap-8 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <Icon className="size-5 text-zinc-600 dark:text-zinc-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          <NumberTicker value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </MotionPreset>
          </div>

          {/* Right Side - Preview Card */}
          <MotionPreset fade blur slide={{ direction: 'right', offset: 50 }} delay={0.3}>
            <div className="relative">
              {/* Glow Effect - Subtle */}
              <div className="absolute -inset-4 bg-zinc-500/10 rounded-3xl blur-2xl" />

              {/* Main Card */}
              <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 shadow-2xl">
                <BorderBeam size={150} duration={10} colorFrom="#18181b" colorTo="#71717a" />

                {/* Mock Dashboard Preview */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-foreground flex items-center justify-center">
                        <MailIcon className="size-5 text-background" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Cold Email Academy</p>
                        <p className="text-xs text-muted-foreground">Dein Dashboard</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 dark:bg-primary/20 text-primary text-[10px] border-0">
                      Kostenlos
                    </Badge>
                  </div>

                  {/* Progress Preview */}
                  <div className="space-y-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dein Fortschritt</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '87%' }}
                        transition={{ duration: 1.5, delay: 1 }}
                      />
                    </div>
                  </div>

                  {/* Mock Items */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Templates', count: '25+' },
                      { label: 'Kurse', count: '5' },
                      { label: 'Tools', count: '7' },
                      { label: 'Artikel', count: '50+' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 group hover:scale-[1.02] transition-transform cursor-pointer border border-zinc-200 dark:border-zinc-700"
                      >
                        <div className="text-lg font-bold text-primary">
                          {item.count}
                        </div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Blur Overlay */}
                  <div className="relative">
                    <div className="h-20 rounded-lg bg-zinc-100 dark:bg-zinc-800 blur-sm" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge className="bg-foreground text-background border-0">
                        <ZapIcon className="size-3 mr-1" />
                        Registriere dich für vollen Zugang
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}
