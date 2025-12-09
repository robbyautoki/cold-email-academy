'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  BookOpenIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  LockIcon,
  ChevronDownIcon,
  ClockIcon,
  FileTextIcon,
  HelpCircleIcon,
  PenToolIcon
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import type { Module, Lesson } from '@/data/courses'

interface ModuleAccordionProps {
  modules: Module[]
  courseId: string
  completedLessons: string[]
  unlockedModules: string[]
}

const lessonTypeIcons = {
  video: PlayCircleIcon,
  text: FileTextIcon,
  quiz: HelpCircleIcon,
  practice: PenToolIcon
}

const lessonTypeLabels = {
  video: 'Video',
  text: 'Lektion',
  quiz: 'Quiz',
  practice: 'Praxis'
}

export function ModuleAccordion({
  modules,
  courseId,
  completedLessons,
  unlockedModules
}: ModuleAccordionProps) {
  const getModuleProgress = (module: Module) => {
    if (module.lessons.length === 0) return 0
    const completed = module.lessons.filter(l => completedLessons.includes(l.id)).length
    return Math.round((completed / module.lessons.length) * 100)
  }

  const isModuleLocked = (moduleId: string) => !unlockedModules.includes(moduleId)
  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId)

  const moduleColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-amber-500 to-amber-600',
    'from-red-500 to-red-600'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpenIcon className="size-5 text-primary" />
            Kurs-Module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-3">
            {modules.map((module, index) => {
              const progress = getModuleProgress(module)
              const isLocked = isModuleLocked(module.id)
              const isComplete = progress === 100
              const colorClass = moduleColors[index % moduleColors.length]

              return (
                <AccordionItem
                  key={module.id}
                  value={module.id}
                  className={`rounded-lg border bg-card transition-all ${
                    isLocked ? 'opacity-60' : 'hover:shadow-md'
                  }`}
                  disabled={isLocked}
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <div className="flex w-full items-center gap-4">
                      {/* Module Number Badge */}
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white ${colorClass}`}
                      >
                        {isLocked ? (
                          <LockIcon className="size-4" />
                        ) : isComplete ? (
                          <CheckCircleIcon className="size-5" />
                        ) : (
                          <span className="font-bold">{module.number}</span>
                        )}
                      </div>

                      {/* Module Info */}
                      <div className="flex flex-1 flex-col items-start gap-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{module.title}</span>
                          {isComplete && (
                            <Badge variant="secondary" className="bg-green-500/10 text-green-600 text-xs">
                              Abgeschlossen
                            </Badge>
                          )}
                          {isLocked && (
                            <Badge variant="secondary" className="text-xs">
                              Gesperrt
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{module.lessons.length} Lektionen</span>
                          {!isLocked && progress > 0 && (
                            <span className="text-primary">{progress}%</span>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar (small) */}
                      {!isLocked && (
                        <div className="hidden w-24 sm:block">
                          <Progress value={progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-4 pb-4">
                    <div className="mt-2 space-y-2 border-l-2 border-muted pl-4 ml-5">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = isLessonCompleted(lesson.id)
                        const TypeIcon = lessonTypeIcons[lesson.type]

                        return (
                          <Link
                            key={lesson.id}
                            href={isLocked ? '#' : `/kurse/${courseId}/${module.id}/${lesson.id}`}
                            className={`group flex items-center gap-3 rounded-lg p-2.5 transition-colors ${
                              isLocked
                                ? 'cursor-not-allowed opacity-50'
                                : 'hover:bg-muted'
                            }`}
                          >
                            {/* Lesson Status Icon */}
                            <div
                              className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                                isCompleted
                                  ? 'bg-green-500/10 text-green-600'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircleIcon className="size-4" />
                              ) : (
                                <TypeIcon className="size-4" />
                              )}
                            </div>

                            {/* Lesson Info */}
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${isCompleted ? 'text-muted-foreground line-through' : ''}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                  {lessonTypeLabels[lesson.type]}
                                </Badge>
                                <span className="flex items-center gap-1">
                                  <ClockIcon className="size-3" />
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>

                            {/* Play Icon on Hover */}
                            {!isLocked && !isCompleted && (
                              <PlayCircleIcon className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  )
}
