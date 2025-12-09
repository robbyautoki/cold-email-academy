'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  LockIcon,
  HomeIcon,
  Loader2Icon
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { Lesson } from '@/data/courses'

interface LessonNavigationProps {
  courseId: string
  prevLesson: { moduleId: string; lesson: Lesson } | null
  nextLesson: { moduleId: string; lesson: Lesson } | null
  canNavigateToPrev: boolean
  canNavigateToNext: boolean
  isCompleted: boolean
  lessonType: Lesson['type']
  isSaving: boolean
  onMarkComplete: () => void
}

export function LessonNavigation({
  courseId,
  prevLesson,
  nextLesson,
  canNavigateToPrev,
  canNavigateToNext,
  isCompleted,
  lessonType,
  isSaving,
  onMarkComplete
}: LessonNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex flex-wrap items-center justify-between gap-4"
    >
      {/* Previous Button */}
      {prevLesson && canNavigateToPrev ? (
        <Link href={`/kurse/${courseId}/${prevLesson.moduleId}/${prevLesson.lesson.id}`}>
          <Button variant="outline" className="gap-2">
            <ChevronLeftIcon className="size-4" />
            <span className="hidden sm:inline">Vorherige Lektion</span>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {/* Mark Complete Button (only for non-quiz lessons that aren't completed) */}
      {!isCompleted && lessonType !== 'quiz' && (
        <Button
          onClick={onMarkComplete}
          disabled={isSaving}
          className="gap-2"
          size="lg"
        >
          {isSaving ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <CheckCircleIcon className="size-4" />
          )}
          Als abgeschlossen markieren
        </Button>
      )}

      {/* Already Completed Badge */}
      {isCompleted && lessonType !== 'quiz' && (
        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-700">
          <CheckCircleIcon className="size-4" />
          <span className="text-sm font-medium">Abgeschlossen</span>
        </div>
      )}

      {/* Next Button */}
      {nextLesson && canNavigateToNext ? (
        <Link href={`/kurse/${courseId}/${nextLesson.moduleId}/${nextLesson.lesson.id}`}>
          <Button className="gap-2">
            <span className="hidden sm:inline">Nächste Lektion</span>
            <ChevronRightIcon className="size-4" />
          </Button>
        </Link>
      ) : nextLesson && !canNavigateToNext ? (
        <Button disabled className="gap-2">
          <LockIcon className="size-4" />
          <span className="hidden sm:inline">Modul gesperrt</span>
        </Button>
      ) : (
        <Link href={`/kurse/${courseId}`}>
          <Button className="gap-2">
            <HomeIcon className="size-4" />
            <span className="hidden sm:inline">Kurs abschließen</span>
          </Button>
        </Link>
      )}
    </motion.div>
  )
}
