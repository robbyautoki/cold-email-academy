'use client'

import ReactMarkdown from 'react-markdown'
import { motion } from 'motion/react'
import { PlayCircleIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import type { Lesson, QuizQuestion } from '@/data/courses'

interface LessonContentProps {
  lesson: Lesson
  children?: React.ReactNode // For quiz content
}

export function LessonContent({ lesson, children }: LessonContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {/* Video Lesson */}
          {lesson.type === 'video' && (
            <div className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-muted to-muted/50">
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex size-20 cursor-pointer items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-primary"
                  >
                    <PlayCircleIcon className="size-10 ml-1" />
                  </motion.div>
                  <p className="mt-4 text-sm text-muted-foreground">Video Player (Placeholder)</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 size-40 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-primary/5 blur-3xl" />
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{lesson.content}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Text Lesson */}
          {lesson.type === 'text' && (
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>
          )}

          {/* Practice Lesson */}
          {lesson.type === 'practice' && (
            <div className="space-y-6">
              <div className="rounded-lg border-l-4 border-green-500 bg-green-500/5 p-4">
                <p className="text-sm font-medium text-green-700">Praxis-Übung</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Wende das Gelernte direkt an und verbessere deine Fähigkeiten.
                </p>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{lesson.content}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Quiz Lesson - Render children */}
          {lesson.type === 'quiz' && (
            <div className="space-y-6">
              {lesson.content && (
                <p className="text-muted-foreground">{lesson.content}</p>
              )}
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
