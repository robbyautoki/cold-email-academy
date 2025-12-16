'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  FileTextIcon,
  HelpCircleIcon,
  PenToolIcon,
  ListIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Progress } from '@/components/ui/progress'

import type { Course, Module, Lesson } from '@/data/courses'

interface LessonHeaderProps {
  course: Course
  module: Module
  lesson: Lesson
  courseId: string
  moduleId: string
  currentIndex: number
  totalLessons: number
  isCompleted: boolean
  moduleProgress: number
  isLessonCompleted: (lessonId: string) => boolean
}

const lessonTypeConfig = {
  video: {
    icon: PlayCircleIcon,
    label: 'Video',
    gradient: 'from-primary/20 via-primary/10 to-transparent',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  text: {
    icon: FileTextIcon,
    label: 'Lektion',
    gradient: 'from-primary/20 via-primary/10 to-transparent',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  quiz: {
    icon: HelpCircleIcon,
    label: 'Quiz',
    gradient: 'from-primary/20 via-primary/10 to-transparent',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  practice: {
    icon: PenToolIcon,
    label: 'Praxis',
    gradient: 'from-primary/20 via-primary/10 to-transparent',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  }
}

export function LessonHeader({
  course,
  module,
  lesson,
  courseId,
  moduleId,
  currentIndex,
  totalLessons,
  isCompleted,
  moduleProgress,
  isLessonCompleted
}: LessonHeaderProps) {
  const typeConfig = lessonTypeConfig[lesson.type]
  const TypeIcon = typeConfig.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link href={`/kurse/${courseId}`}>
          <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/5">
            <ArrowLeftIcon className="size-4" />
            <span className="hidden sm:inline">Zurück zum Kurs</span>
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          {/* Progress Badge */}
          <Badge variant="secondary" className="gap-1.5 px-3 py-1">
            <span className="font-medium">{currentIndex}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{totalLessons}</span>
          </Badge>

          {/* Mobile Sidebar Toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ListIcon className="size-4" />
                <span className="hidden sm:inline">Inhaltsverzeichnis</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">{course.title}</SheetTitle>
                <SheetDescription className="text-left">
                  Modul {module.number}: {module.title}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-2">
                {module.lessons.map((l, idx) => {
                  const completed = isLessonCompleted(l.id)
                  const isCurrent = l.id === lesson.id
                  const LessonTypeIcon = lessonTypeConfig[l.type].icon

                  return (
                    <Link
                      key={l.id}
                      href={`/kurse/${courseId}/${moduleId}/${l.id}`}
                      className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                        isCurrent
                          ? 'bg-primary/10 ring-1 ring-primary/20'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                          completed
                            ? 'bg-secondary text-secondary-foreground'
                            : isCurrent
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {completed ? (
                          <CheckCircleIcon className="size-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            completed ? 'text-muted-foreground' : ''
                          }`}
                        >
                          {l.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <LessonTypeIcon className={`size-3 ${lessonTypeConfig[l.type].color}`} />
                          <span>{l.duration}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Module Progress */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Modul-Fortschritt</span>
                  <span className="font-medium">{moduleProgress}%</span>
                </div>
                <Progress value={moduleProgress} className="h-2" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/kurse" className="hover:text-foreground transition-colors">
          Kurse
        </Link>
        <ChevronRightIcon className="size-4" />
        <Link
          href={`/kurse/${courseId}`}
          className="hover:text-foreground transition-colors truncate max-w-32"
        >
          {course.title}
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-foreground font-medium">Modul {module.number}</span>
      </div>

      {/* Lesson Header Card */}
      <div className="relative overflow-hidden rounded-xl border bg-card">
        {/* Gradient Background based on lesson type */}
        <div className={`absolute inset-0 bg-gradient-to-br ${typeConfig.gradient}`} />

        <div className="relative p-5">
          <div className="flex flex-wrap items-start gap-3">
            {/* Type Badge */}
            <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${typeConfig.bgColor}`}>
              <TypeIcon className={`size-4 ${typeConfig.color}`} />
              <span className={`text-sm font-medium ${typeConfig.color}`}>{typeConfig.label}</span>
            </div>

            {/* Duration Badge */}
            <Badge variant="secondary" className="gap-1.5">
              <ClockIcon className="size-3" />
              {lesson.duration}
            </Badge>

            {/* Completion Badge */}
            {isCompleted && (
              <Badge className="gap-1.5 bg-secondary/10 text-secondary-foreground border-secondary/20">
                <CheckCircleIcon className="size-3" />
                Abgeschlossen
              </Badge>
            )}
          </div>

          <h1 className="mt-3 text-xl font-bold md:text-2xl">{lesson.title}</h1>
        </div>
      </div>
    </motion.div>
  )
}
