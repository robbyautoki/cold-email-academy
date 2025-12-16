'use client'

import Link from 'next/link'
import { ArrowRightIcon, ClockIcon, BookMarkedIcon, CheckCircleIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { difficultyConfig, type Playbook } from '@/data/playbooks'

interface PlaybookCardProps {
  playbook: Playbook
  index?: number
  progress?: number // 0-100
}

export function PlaybookCard({ playbook, index = 0, progress = 0 }: PlaybookCardProps) {
  const difficulty = difficultyConfig[playbook.difficulty]
  const isStarted = progress > 0
  const isCompleted = progress >= 100

  return (
    <MotionPreset fade blur delay={0.1 + index * 0.05}>
      <Link href={`/playbooks/${playbook.slug}`} className="group block h-full">
        <Card className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700">
          <CardContent className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className={`flex size-10 items-center justify-center rounded-xl ${difficulty.bgColor}`}>
                  <BookMarkedIcon className={`size-5 ${difficulty.color}`} />
                </div>
                {isCompleted && (
                  <CheckCircleIcon className="size-5 text-primary" />
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-2 py-0.5 ${difficulty.bgColor} ${difficulty.color} border-0`}
                >
                  {difficulty.label}
                </Badge>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <ClockIcon className="size-3" />
                  {playbook.duration}
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
              {playbook.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {playbook.description}
            </p>

            {/* Steps Preview */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-muted-foreground">
                {playbook.steps.length} Schritte
              </span>
              <div className="flex-1 flex gap-1">
                {playbook.steps.slice(0, 7).map((step, i) => (
                  <div
                    key={step.id}
                    className={`h-1 flex-1 rounded-full ${
                      progress > (i / playbook.steps.length) * 100
                        ? 'bg-primary'
                        : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {playbook.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="inline-flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                {isCompleted ? 'Nochmal ansehen' : isStarted ? 'Fortsetzen' : 'Jetzt starten'}
                <ArrowRightIcon className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </MotionPreset>
  )
}
