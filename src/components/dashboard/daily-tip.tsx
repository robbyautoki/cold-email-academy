'use client'

import { useEffect, useState } from 'react'
import { LightbulbIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

const tips = [
  {
    title: 'Beste Sendezeit',
    content: 'Sende deine Cold Emails zwischen 8-10 Uhr morgens für die höchste Öffnungsrate.'
  },
  {
    title: 'Personalisierung',
    content: 'Emails mit personalisierter Betreffzeile haben 26% höhere Öffnungsraten.'
  },
  {
    title: 'Follow-up Strategie',
    content: '80% der Deals werden erst nach dem 5. Follow-up abgeschlossen. Bleib dran!'
  },
  {
    title: 'Optimale Länge',
    content: 'Die ideale Cold Email hat 50-125 Wörter. Kurz, prägnant und auf den Punkt.'
  },
  {
    title: 'Betreffzeile',
    content: 'Halte deine Betreffzeile unter 50 Zeichen für maximale Sichtbarkeit auf Mobile.'
  },
  {
    title: 'CTA Platzierung',
    content: 'Platziere nur einen Call-to-Action pro Email. Weniger ist mehr.'
  },
  {
    title: 'Social Proof',
    content: 'Erwähne bekannte Kunden oder Ergebnisse für mehr Glaubwürdigkeit.'
  },
  {
    title: 'Signature Trick',
    content: 'Eine professionelle Email-Signatur erhöht die Antwortrate um bis zu 32%.'
  }
]

export function DailyTip() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  useEffect(() => {
    // Wähle beim ersten Load einen zufälligen Tipp basierend auf dem Tag
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    )
    setCurrentTipIndex(dayOfYear % tips.length)
  }, [])

  useEffect(() => {
    // Wechsle den Tipp alle 10 Sekunden
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const currentTip = tips[currentTipIndex]

  return (
    <MotionPreset fade blur delay={0.5}>
      <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 to-zinc-100/50 dark:from-zinc-900/50 dark:to-zinc-800/30">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Icon with glow effect */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full" />
              <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50">
                <LightbulbIcon className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                  Pro Tip
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">•</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {currentTipIndex + 1}/{tips.length}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTipIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {currentTip.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {currentTip.content}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="hidden sm:flex flex-col gap-1 flex-shrink-0">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`size-1.5 rounded-full transition-colors duration-300 ${
                    index === currentTipIndex
                      ? 'bg-amber-500'
                      : 'bg-zinc-300 dark:bg-zinc-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionPreset>
  )
}
