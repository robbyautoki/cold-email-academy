'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ArrowLeftIcon,
  BookOpenIcon,
  PlayCircleIcon,
  ClockIcon,
  TrophyIcon,
  MailIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import type { Course } from '@/data/courses'

interface CourseDetailHeroProps {
  course: Course
  progress: number
  continueUrl: string | null
}

export function CourseDetailHero({ course, progress, continueUrl }: CourseDetailHeroProps) {
  const difficultyConfig = {
    beginner: { label: 'Einsteiger', color: 'bg-green-500/10 text-green-700 border-green-500/20' },
    intermediate: { label: 'Fortgeschritten', color: 'bg-amber-500/10 text-amber-700 border-amber-500/20' },
    advanced: { label: 'Experte', color: 'bg-red-500/10 text-red-700 border-red-500/20' }
  }

  const isCompleted = progress === 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Back Button */}
      <Link href="/kurse">
        <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/5">
          <ArrowLeftIcon className="size-4" />
          Zurück zu Kurse
        </Button>
      </Link>

      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-2xl border bg-card">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-neutral-500/5 to-transparent" />
        <div className="absolute -top-24 -right-24 size-48 rounded-full bg-zinc-500/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 size-48 rounded-full bg-neutral-500/5 blur-3xl" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Course Icon */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative shrink-0"
            >
              <div className="flex size-24 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 shadow-lg shadow-zinc-500/25">
                <MailIcon className="size-12 text-white" />
              </div>
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-green-500 shadow-lg"
                >
                  <TrophyIcon className="size-4 text-white" />
                </motion.div>
              )}
            </motion.div>

            {/* Course Info */}
            <div className="flex-1 space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={difficultyConfig[course.difficulty].color}>
                  {difficultyConfig[course.difficulty].label}
                </Badge>
                {isCompleted && (
                  <Badge className="gap-1 bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20">
                    <TrophyIcon className="size-3" />
                    Abgeschlossen
                  </Badge>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">{course.title}</h1>
                <p className="mt-2 text-muted-foreground">{course.description}</p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
                  <BookOpenIcon className="size-4 text-primary" />
                  <span>{course.modules.length} Module</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
                  <PlayCircleIcon className="size-4 text-primary" />
                  <span>{course.totalLessons} Lektionen</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
                  <ClockIcon className="size-4 text-primary" />
                  <span>{course.totalDuration}</span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                {/* Progress Circle */}
                <div className="flex items-center gap-4">
                  <div className="relative size-16">
                    <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                      {/* Background Circle */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-muted"
                      />
                      {/* Progress Circle */}
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className={isCompleted ? 'text-green-500' : 'text-primary'}
                        initial={{ strokeDasharray: '0 176' }}
                        animate={{ strokeDasharray: `${(progress / 100) * 176} 176` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold">{progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fortschritt</p>
                    <p className="font-semibold">
                      {isCompleted ? 'Abgeschlossen!' : progress === 0 ? 'Noch nicht gestartet' : 'In Bearbeitung'}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                {continueUrl && (
                  <Link href={continueUrl}>
                    <Button size="lg" className="w-full gap-2 sm:w-auto">
                      <PlayCircleIcon className="size-5" />
                      {progress === 0 ? 'Kurs starten' : 'Weiter lernen'}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
