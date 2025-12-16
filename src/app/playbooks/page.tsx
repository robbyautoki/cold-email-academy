'use client'

import { BookMarkedIcon, SparklesIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { PlaybookCard } from '@/components/playbooks'
import { playbooks } from '@/data/playbooks'

export default function PlaybooksPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <MotionPreset fade blur>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
              <BookMarkedIcon className="size-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">Playbooks</h1>
                <Badge className="bg-secondary text-secondary-foreground border-0">
                  <SparklesIcon className="size-3 mr-1" />
                  Neu
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Step-by-Step Guides für jeden Anwendungsfall - von Anfänger bis Experte
              </p>
            </div>
          </div>
        </div>
      </MotionPreset>

      {/* Intro */}
      <MotionPreset fade blur delay={0.05}>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-900/50 dark:to-zinc-800/30 border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-semibold mb-2">Was sind Playbooks?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Playbooks sind detaillierte Step-by-Step Anleitungen, die dich durch komplexe Prozesse führen.
            Jeder Schritt hat Checklisten, Ressourcen und Pro-Tipps - so kannst du nichts vergessen.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Anfänger-freundlich</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-muted-foreground/50" />
              <span className="text-muted-foreground">Fortgeschritten</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-muted-foreground/70" />
              <span className="text-muted-foreground">Experte</span>
            </div>
          </div>
        </div>
      </MotionPreset>

      {/* Playbooks Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {playbooks.map((playbook, index) => (
          <PlaybookCard key={playbook.id} playbook={playbook} index={index} />
        ))}
      </div>

      {/* Coming Soon */}
      <MotionPreset fade blur delay={0.3}>
        <div className="text-center py-8 px-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <p className="text-muted-foreground text-sm">
            Weitere Playbooks kommen bald. Hast du Wünsche?{' '}
            <a href="/beratung" className="text-foreground underline underline-offset-4 hover:text-primary">
              Lass es uns wissen!
            </a>
          </p>
        </div>
      </MotionPreset>
    </div>
  )
}
