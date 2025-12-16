'use client'

import Link from 'next/link'
import { PlayIcon, ClockIcon, BookOpenIcon, ArrowRightIcon, CheckCircle2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MotionPreset } from '@/components/ui/motion-preset'
import { BorderBeam } from '@/components/ui/border-beam'

interface FeaturedCourseProps {
  progress?: number // 0-100
  currentLesson?: number
  totalLessons?: number
}

export function FeaturedCourse({
  progress = 0,
  currentLesson = 1,
  totalLessons = 24
}: FeaturedCourseProps) {
  const isStarted = progress > 0
  const isCompleted = progress >= 100

  return (
    <MotionPreset fade blur delay={0.15}>
      <Card className="group relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 via-background to-zinc-50/50 dark:from-zinc-900/80 dark:via-background dark:to-zinc-900/50">
        <BorderBeam
          size={300}
          duration={15}
          colorFrom="rgb(59 130 246)"
          colorTo="rgb(147 51 234)"
          className="opacity-30 group-hover:opacity-60 transition-opacity"
        />
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Side - Course Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                  Featured
                </Badge>
                <Badge variant="outline" className="border-zinc-300 dark:border-zinc-600">
                  <ClockIcon className="size-3 mr-1" />
                  ~3 Stunden
                </Badge>
                <Badge variant="outline" className="border-zinc-300 dark:border-zinc-600">
                  <BookOpenIcon className="size-3 mr-1" />
                  {totalLessons} Lektionen
                </Badge>
              </div>

              <div>
                <h2 className="text-2xl font-bold sm:text-3xl mb-2">
                  Cold Email Masterclass
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Lerne Cold Email von Grund auf – von der perfekten Domain-Konfiguration bis zur
                  konvertierenden Follow-up Sequenz. Alles was du für erfolgreiche Outreach-Kampagnen brauchst.
                </p>
              </div>

              {/* Course Modules Preview */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Grundlagen',
                  'Deliverability',
                  'Lead Generation',
                  'Copywriting',
                  'Automatisierung'
                ].map((module, index) => (
                  <span
                    key={module}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {index < 1 && <CheckCircle2Icon className="size-3 text-primary" />}
                    {module}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side - Progress & CTA */}
            <div className="lg:min-w-[280px] space-y-4">
              {/* Progress Section */}
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                {isCompleted ? (
                  <div className="text-center py-2">
                    <div className="flex size-12 mx-auto items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 mb-2">
                      <CheckCircle2Icon className="size-6 text-primary" />
                    </div>
                    <p className="font-semibold text-primary">Abgeschlossen!</p>
                    <p className="text-xs text-muted-foreground">Zertifikat verfügbar</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {isStarted ? 'Dein Fortschritt' : 'Bereit zum Start'}
                      </span>
                      <span className="text-sm font-bold tabular-nums">
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2 mb-3" />
                    <p className="text-xs text-muted-foreground">
                      {isStarted
                        ? `Lektion ${currentLesson} von ${totalLessons}`
                        : `${totalLessons} Lektionen • Für Anfänger & Fortgeschrittene`}
                    </p>
                  </>
                )}
              </div>

              {/* CTA Button */}
              <Link href="/kurse" className="block">
                <Button
                  size="lg"
                  className="w-full gap-2 shadow-lg bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-900 dark:hover:from-zinc-200 dark:hover:to-zinc-300"
                >
                  {isCompleted ? (
                    <>
                      Nochmal ansehen
                      <ArrowRightIcon className="size-4" />
                    </>
                  ) : isStarted ? (
                    <>
                      <PlayIcon className="size-4" />
                      Fortsetzen
                    </>
                  ) : (
                    <>
                      <PlayIcon className="size-4" />
                      Jetzt starten
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionPreset>
  )
}
