'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { PlayCircleIcon, TrophyIcon, SparklesIcon, ArrowRightIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CircularProgress } from '@/components/ui/circular-progress'

interface CourseProgressCardProps {
  overallProgress: number
  completedCourses: number
  totalCourses: number
  currentLesson?: {
    title: string
    courseId: string
    moduleId: string
    lessonId: string
  }
  streak?: number
  totalMinutes?: number
}

export function CourseProgressCard({
  overallProgress,
  completedCourses,
  totalCourses,
  currentLesson,
  streak = 5,
  totalMinutes = 320
}: CourseProgressCardProps) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrophyIcon className="size-5 text-amber-500" />
            Dein Fortschritt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Progress Circle */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <CircularProgress
                value={overallProgress}
                size={100}
                strokeWidth={8}
                className="text-primary"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{overallProgress}%</span>
                <span className="text-xs text-muted-foreground">Gesamt</span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="size-4 text-orange-500" />
                    <span className="text-sm text-muted-foreground">Streak</span>
                  </div>
                  <div className="mt-1 text-xl font-bold">{streak} Tage</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="size-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">Lernzeit</span>
                  </div>
                  <div className="mt-1 text-xl font-bold">{hours}h {minutes}m</div>
                </div>
              </div>

              {/* Course Count */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Kurse abgeschlossen</span>
                <Badge variant="secondary">
                  {completedCourses}/{totalCourses}
                </Badge>
              </div>
            </div>
          </div>

          {/* Current Lesson CTA */}
          {currentLesson && (
            <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <PlayCircleIcon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Weitermachen mit</p>
                    <p className="font-medium">{currentLesson.title}</p>
                  </div>
                </div>
                <Link href={`/kurse/${currentLesson.courseId}/${currentLesson.moduleId}/${currentLesson.lessonId}`}>
                  <Button size="sm" className="gap-1">
                    Fortsetzen
                    <ArrowRightIcon className="size-3" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {!currentLesson && (
            <div className="rounded-lg border bg-gradient-to-r from-green-500/5 to-green-500/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-500/10">
                  <TrophyIcon className="size-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-green-700">Alle Lektionen abgeschlossen!</p>
                  <p className="text-sm text-muted-foreground">Du hast alle verfügbaren Kurse durchgearbeitet.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
