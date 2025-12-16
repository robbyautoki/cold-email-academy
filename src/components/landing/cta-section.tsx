'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  RocketIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  MailIcon,
  ZapIcon,
  ShieldCheckIcon,
  GiftIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/ui/border-beam'
import { MotionPreset } from '@/components/ui/motion-preset'
import { NumberTicker } from '@/components/dashboard/number-ticker'

const benefits = [
  'Sofortiger Zugang zu allen Inhalten',
  '25+ bewährte Email-Templates',
  'Kostenlose Deliverability-Tools',
  'Schritt-für-Schritt Playbooks',
  'Community-Support auf Discord'
]

const guarantees = [
  { icon: ShieldCheckIcon, text: '100% kostenlos' },
  { icon: MailIcon, text: 'Kein Spam' },
  { icon: ZapIcon, text: 'Sofortiger Zugang' }
]

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background - Subtle */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-zinc-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-zinc-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Main CTA Card */}
          <MotionPreset fade blur delay={0.1}>
            <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-8 sm:p-12 lg:p-16 overflow-hidden">
              <BorderBeam
                size={200}
                duration={12}
                colorFrom="#18181b"
                colorTo="#71717a"
              />

              {/* Gradient Orb - Subtle */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                  <div>
                    <MotionPreset fade blur delay={0.2}>
                      <Badge
                        variant="secondary"
                        className="px-4 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 mb-4"
                      >
                        <GiftIcon className="size-3.5 mr-1.5 text-primary" />
                        Starte jetzt kostenlos
                      </Badge>
                    </MotionPreset>

                    <MotionPreset fade blur delay={0.3}>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Bereit für{' '}
                        <span className="text-primary">
                          bessere Ergebnisse?
                        </span>
                      </h2>
                    </MotionPreset>

                    <MotionPreset fade blur delay={0.4}>
                      <p className="text-lg text-muted-foreground">
                        Schließe dich{' '}
                        <span className="font-semibold text-foreground">
                          <NumberTicker value={500} suffix="+" />
                        </span>{' '}
                        anderen Cold Email Profis an und starte noch heute.
                      </p>
                    </MotionPreset>
                  </div>

                  {/* Benefits */}
                  <MotionPreset fade blur delay={0.5}>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <motion.li
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                            <CheckCircleIcon className="size-4 text-primary" />
                          </div>
                          <span className="text-zinc-700 dark:text-zinc-300">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </MotionPreset>

                  {/* CTA Button */}
                  <MotionPreset fade blur delay={0.8}>
                    <div className="space-y-4">
                      <Link href="/login">
                        <Button
                          size="lg"
                          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] text-lg px-8 py-6"
                        >
                          <ZapIcon className="size-5 mr-2" />
                          Kostenlos registrieren
                          <ArrowRightIcon className="size-5 ml-2" />
                        </Button>
                      </Link>

                      {/* Guarantees */}
                      <div className="flex flex-wrap gap-4">
                        {guarantees.map((guarantee) => {
                          const Icon = guarantee.icon
                          return (
                            <div
                              key={guarantee.text}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Icon className="size-4 text-zinc-400" />
                              <span>{guarantee.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </MotionPreset>
                </div>

                {/* Right Content - Visual */}
                <MotionPreset
                  fade
                  blur
                  slide={{ direction: 'right', offset: 50 }}
                  delay={0.4}
                >
                  <div className="relative hidden lg:block">
                    {/* Floating Cards */}
                    <div className="relative h-[400px]">
                      {/* Card 1 - Templates */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="absolute top-0 left-0 right-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-xl"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
                            <MailIcon className="size-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold">Email Templates</p>
                            <p className="text-xs text-muted-foreground">
                              <NumberTicker value={25} suffix="+" /> Vorlagen
                            </p>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-700 overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1, delay: 0.8 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>

                      {/* Card 2 - Kurse */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        viewport={{ once: true }}
                        className="absolute top-24 left-12 right-0 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-xl"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
                            <RocketIcon className="size-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold">Masterclass</p>
                            <p className="text-xs text-muted-foreground">
                              <NumberTicker value={24} suffix="+" /> Lektionen
                            </p>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-700 overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '75%' }}
                            transition={{ duration: 1, delay: 0.9 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>

                      {/* Card 3 - Tools */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                        className="absolute top-48 left-0 right-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-xl"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
                            <ZapIcon className="size-5 text-white dark:text-zinc-900" />
                          </div>
                          <div>
                            <p className="font-semibold">Kostenlose Tools</p>
                            <p className="text-xs text-muted-foreground">
                              <NumberTicker value={7} /> verfügbar
                            </p>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-700 overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1, delay: 1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>

                      {/* Success Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, type: 'spring' }}
                        viewport={{ once: true }}
                        className="absolute bottom-4 right-4 rounded-full border border-primary/20 dark:border-primary/30 bg-primary/10 dark:bg-primary/20 px-4 py-2 shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircleIcon className="size-5 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            100% kostenlos
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </MotionPreset>
              </div>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}
