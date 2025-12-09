'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  CheckCircleIcon,
  PlayCircleIcon,
  FileTextIcon,
  HelpCircleIcon,
  PenToolIcon
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import type { Module, Lesson } from '@/data/courses'

interface LessonSidebarProps {
  module: Module
  courseId: string
  moduleId: string
  currentLessonId: string
  moduleProgress: number
  isLessonCompleted: (lessonId: string) => boolean
}

const lessonTypeConfig = {
  video: { icon: PlayCircleIcon, color: 'text-red-500' },
  text: { icon: FileTextIcon, color: 'text-blue-500' },
  quiz: { icon: HelpCircleIcon, color: 'text-purple-500' },
  practice: { icon: PenToolIcon, color: 'text-green-500' }
}

export function LessonSidebar({
  module,
  courseId,
  moduleId,
  currentLessonId,
  moduleProgress,
  isLessonCompleted
}: LessonSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="hidden lg:block"
    >
      <Card className="sticky top-24">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Modul {module.number}</CardTitle>
          <CardDescription>{module.title}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Lesson List */}
          <div className="space-y-1">
            {module.lessons.map((lesson, idx) => {
              const completed = isLessonCompleted(lesson.id)
              const isCurrent = lesson.id === currentLessonId
              const TypeIcon = lessonTypeConfig[lesson.type].icon

              return (
                <Link
                  key={lesson.id}
                  href={`/kurse/${courseId}/${moduleId}/${lesson.id}`}
                  className={`flex items-center gap-2.5 rounded-lg p-2.5 text-sm transition-colors ${
                    isCurrent
                      ? 'bg-primary/10 font-medium'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs ${
                      completed
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {completed ? (
                      <CheckCircleIcon className="size-3.5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`truncate ${
                        completed && !isCurrent ? 'text-muted-foreground' : ''
                      }`}
                    >
                      {lesson.title}
                    </p>
                  </div>
                  <TypeIcon
                    className={`size-4 shrink-0 ${lessonTypeConfig[lesson.type].color}`}
                  />
                </Link>
              )
            })}
          </div>

          {/* Progress */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Fortschritt</span>
              <span className="font-medium">{moduleProgress}%</span>
            </div>
            <Progress value={moduleProgress} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
