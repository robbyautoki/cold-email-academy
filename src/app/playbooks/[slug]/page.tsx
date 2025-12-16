'use client'

import { use, useState, useRef } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  ClockIcon,
  TargetIcon,
  BookMarkedIcon,
  CheckCircle2Icon,
  CircleIcon,
  ListIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MotionPreset } from '@/components/ui/motion-preset'
import { PlaybookStep } from '@/components/playbooks'
import { getPlaybookBySlug, difficultyConfig } from '@/data/playbooks'
import { cn } from '@/lib/utils'

interface PlaybookDetailPageProps {
  params: Promise<{ slug: string }>
}

export default function PlaybookDetailPage({ params }: PlaybookDetailPageProps) {
  const { slug } = use(params)
  const playbook = getPlaybookBySlug(slug)

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [activeStep, setActiveStep] = useState<string>(playbook?.steps[0]?.id || '')
  const stepRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  if (!playbook) {
    notFound()
  }

  const difficulty = difficultyConfig[playbook.difficulty]
  const progress = (completedSteps.size / playbook.steps.length) * 100

  const toggleStepComplete = (stepId: string) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId)
    } else {
      newCompleted.add(stepId)
      // Move to next step
      const currentIndex = playbook.steps.findIndex(s => s.id === stepId)
      if (currentIndex < playbook.steps.length - 1) {
        setActiveStep(playbook.steps[currentIndex + 1].id)
      }
    }
    setCompletedSteps(newCompleted)
  }

  const scrollToStep = (stepId: string) => {
    setActiveStep(stepId)
    const element = stepRefs.current.get(stepId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Helper to get short title for sidebar
  const getShortTitle = (title: string) => {
    // Remove "Tag X:" or "Tag X-Y:" prefix
    return title.replace(/^Tag\s+\d+(-\d+)?:\s*/, '')
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <MotionPreset fade blur>
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Zurück zu Playbooks
        </Link>
      </MotionPreset>

      {/* Header */}
      <MotionPreset fade blur delay={0.05}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`flex size-10 items-center justify-center rounded-xl ${difficulty.bgColor}`}>
                <BookMarkedIcon className={`size-5 ${difficulty.color}`} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`${difficulty.bgColor} ${difficulty.color} border-0`}
                >
                  {difficulty.label}
                </Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ClockIcon className="size-3" />
                  {playbook.duration}
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">{playbook.title}</h1>
            <p className="text-muted-foreground max-w-2xl">{playbook.description}</p>
            <div className="flex flex-wrap gap-2">
              {playbook.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </MotionPreset>

      {/* Progress & Outcome */}
      <div className="grid gap-4 sm:grid-cols-2">
        <MotionPreset fade blur delay={0.1}>
          <Card className="border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Dein Fortschritt</span>
                <span className="text-sm font-bold tabular-nums">
                  {completedSteps.size}/{playbook.steps.length} Schritte
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {progress === 100
                  ? 'Glückwunsch! Du hast das Playbook abgeschlossen.'
                  : `${Math.round(progress)}% abgeschlossen`}
              </p>
            </CardContent>
          </Card>
        </MotionPreset>

        <MotionPreset fade blur delay={0.15}>
          <Card className="border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <TargetIcon className="size-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-primary">
                    Ergebnis
                  </span>
                  <p className="text-sm text-primary/80 dark:text-primary/90 mt-0.5">
                    {playbook.outcome}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionPreset>
      </div>

      {/* Two-Column Layout: Sidebar + Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Sidebar - Table of Contents */}
        <MotionPreset fade blur delay={0.2}>
          <div className="hidden lg:block">
            <Card className="sticky top-24 border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-4">
                {/* Sidebar Header */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  <ListIcon className="size-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">Inhaltsverzeichnis</span>
                </div>

                {/* Progress in Sidebar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Fortschritt</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>

                {/* Step List */}
                <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                  {playbook.steps.map((step, index) => {
                    const isCompleted = completedSteps.has(step.id)
                    const isActive = activeStep === step.id

                    return (
                      <button
                        key={step.id}
                        onClick={() => scrollToStep(step.id)}
                        className={cn(
                          'w-full flex items-start gap-2 px-2 py-1.5 rounded-lg text-left transition-all text-sm',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : isCompleted
                            ? 'text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            : 'text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        )}
                      >
                        {/* Status Icon */}
                        <span className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <CheckCircle2Icon className="size-4 text-primary" />
                          ) : isActive ? (
                            <div className="size-4 rounded-full border-2 border-primary bg-transparent flex items-center justify-center">
                              <span className="text-[10px] font-bold text-primary">{index + 1}</span>
                            </div>
                          ) : (
                            <CircleIcon className="size-4 text-zinc-300 dark:text-zinc-600" />
                          )}
                        </span>

                        {/* Step Title */}
                        <span className={cn(
                          'line-clamp-2 leading-tight',
                          isCompleted && 'line-through opacity-60'
                        )}>
                          {getShortTitle(step.title)}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>
        </MotionPreset>

        {/* Steps Content */}
        <div className="space-y-3">
          {playbook.steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id)
            const isActive = activeStep === step.id

            return (
              <MotionPreset key={step.id} fade blur delay={0.25 + index * 0.02}>
                <div
                  ref={(el) => {
                    if (el) stepRefs.current.set(step.id, el)
                  }}
                  className="scroll-mt-24"
                >
                  <PlaybookStep
                    step={step}
                    stepNumber={index + 1}
                    totalSteps={playbook.steps.length}
                    isCompleted={isCompleted}
                    isActive={isActive}
                    onToggleComplete={() => toggleStepComplete(step.id)}
                  />
                </div>
              </MotionPreset>
            )
          })}
        </div>
      </div>
    </div>
  )
}
