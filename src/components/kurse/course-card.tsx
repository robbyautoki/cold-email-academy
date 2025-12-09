'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  MailIcon,
  BookOpenIcon,
  ClockIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import type { Course } from '@/data/courses'

interface CourseCardProps {
  course: Course
  progress: number
  status: 'not-started' | 'in-progress' | 'completed'
}

export function CourseCard({ course, progress, status }: CourseCardProps) {
  const difficultyConfig = {
    beginner: { label: 'Einsteiger', color: 'bg-green-500/10 text-green-700 border-green-500/20' },
    intermediate: { label: 'Fortgeschritten', color: 'bg-amber-500/10 text-amber-700 border-amber-500/20' },
    advanced: { label: 'Experte', color: 'bg-red-500/10 text-red-700 border-red-500/20' }
  }

  const statusConfig = {
    'not-started': { label: 'Nicht gestartet', icon: PlayCircleIcon, color: 'text-muted-foreground' },
    'in-progress': { label: 'In Bearbeitung', icon: PlayCircleIcon, color: 'text-blue-600' },
    'completed': { label: 'Abgeschlossen', icon: CheckCircleIcon, color: 'text-green-600' }
  }

  const StatusIcon = statusConfig[status].icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="flex flex-col lg:flex-row">
          {/* Icon/Image Section */}
          <div className="relative flex items-center justify-center bg-gradient-to-br from-zinc-500/20 via-neutral-500/10 to-zinc-600/20 p-8 lg:w-72">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/2 size-48 rounded-full bg-zinc-500/10 blur-3xl" />
              <div className="absolute -bottom-1/2 -left-1/2 size-48 rounded-full bg-neutral-500/10 blur-3xl" />
            </div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative z-10 flex size-24 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 shadow-lg"
            >
              <MailIcon className="size-12 text-white" />
            </motion.div>

            {/* Status Badge */}
            {status === 'completed' && (
              <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
                <CheckCircleIcon className="size-3" />
                Abgeschlossen
              </div>
            )}
          </div>

          {/* Content Section */}
          <CardContent className="flex flex-1 flex-col p-6">
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={difficultyConfig[course.difficulty].color}>
                    {difficultyConfig[course.difficulty].label}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <StatusIcon className={`size-3 ${statusConfig[status].color}`} />
                    {statusConfig[status].label}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold">{course.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-muted-foreground">{course.description}</p>

            {/* Stats */}
            <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BookOpenIcon className="size-4" />
                <span>{course.modules.length} Module</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PlayCircleIcon className="size-4" />
                <span>{course.totalLessons} Lektionen</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ClockIcon className="size-4" />
                <span>{course.totalDuration}</span>
              </div>
            </div>

            {/* Progress */}
            {status !== 'not-started' && (
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Fortschritt</span>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Module Preview */}
            <div className="mb-4 flex flex-wrap gap-2">
              {course.modules.slice(0, 5).map((module, index) => (
                <div
                  key={module.id}
                  className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs"
                >
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {module.number}
                  </span>
                  <span className="truncate max-w-24">{module.title.split(' - ')[0]}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto pt-4">
              <Link href={`/kurse/${course.id}`}>
                <Button className="w-full gap-2 sm:w-auto" size="lg">
                  {status === 'not-started' && (
                    <>
                      <PlayCircleIcon className="size-4" />
                      Kurs starten
                    </>
                  )}
                  {status === 'in-progress' && (
                    <>
                      <PlayCircleIcon className="size-4" />
                      Weiter lernen
                    </>
                  )}
                  {status === 'completed' && (
                    <>
                      <CheckCircleIcon className="size-4" />
                      Nochmal ansehen
                    </>
                  )}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
