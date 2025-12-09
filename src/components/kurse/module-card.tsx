'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import {
  BookOpenIcon,
  CheckCircleIcon,
  LockIcon,
  ChevronDownIcon,
  SettingsIcon,
  SearchIcon,
  PenToolIcon,
  TrendingUpIcon,
  PlayCircleIcon,
  FileTextIcon,
  HelpCircleIcon
} from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import type { Module, Lesson } from '@/data/courses'

interface ModuleCardProps {
  module: Module
  courseId: string
  moduleIndex: number
  isUnlocked: boolean
  progress: number
  completedLessons: string[]
  isOpen: boolean
  onToggle: () => void
  getQuizScore: (quizId: string) => number | null
}

const moduleColors = [
  { gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-500/10', text: 'text-amber-600' },
  { gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-500/10', text: 'text-amber-600' },
  { gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-500/10', text: 'text-amber-600' },
  { gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-500/10', text: 'text-amber-600' },
  { gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-500/10', text: 'text-amber-600' }
]

const getModuleIcon = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    BookOpen: <BookOpenIcon className="size-5" />,
    Settings: <SettingsIcon className="size-5" />,
    Search: <SearchIcon className="size-5" />,
    PenTool: <PenToolIcon className="size-5" />,
    TrendingUp: <TrendingUpIcon className="size-5" />
  }
  return icons[iconName] || <BookOpenIcon className="size-5" />
}

const lessonTypeConfig = {
  video: { icon: PlayCircleIcon, label: 'Video', color: 'text-zinc-600' },
  text: { icon: FileTextIcon, label: 'Lektion', color: 'text-zinc-600' },
  quiz: { icon: HelpCircleIcon, label: 'Quiz', color: 'text-zinc-600' },
  practice: { icon: PenToolIcon, label: 'Praxis', color: 'text-zinc-600' }
}

export function ModuleCard({
  module,
  courseId,
  moduleIndex,
  isUnlocked,
  progress,
  completedLessons,
  isOpen,
  onToggle,
  getQuizScore
}: ModuleCardProps) {
  const colorConfig = moduleColors[moduleIndex % moduleColors.length]
  const isComplete = progress === 100
  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: moduleIndex * 0.1 }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 ${
          !isUnlocked ? 'opacity-60' : 'hover:shadow-lg'
        } ${isComplete ? 'ring-2 ring-green-500/50' : ''}`}
      >
        {/* Header */}
        <CardHeader
          className={`cursor-pointer transition-colors ${
            isUnlocked ? 'hover:bg-muted/50' : 'cursor-not-allowed'
          }`}
          onClick={() => isUnlocked && onToggle()}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Module Number/Status Badge */}
              <motion.div
                whileHover={isUnlocked && !isComplete ? { scale: 1.05 } : {}}
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorConfig.gradient} text-white shadow-lg`}
              >
                {isComplete ? (
                  <CheckCircleIcon className="size-6" />
                ) : !isUnlocked ? (
                  <LockIcon className="size-5" />
                ) : (
                  <span className="text-lg font-bold">{module.number}</span>
                )}
              </motion.div>

              {/* Module Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">
                    Modul {module.number}: {module.title}
                  </h3>
                  {isComplete && (
                    <Badge className="bg-green-500/10 text-green-700 border-green-500/20 text-xs">
                      Abgeschlossen
                    </Badge>
                  )}
                  {!isUnlocked && (
                    <Badge variant="secondary" className="text-xs">
                      Gesperrt
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {!isUnlocked ? (
                    <span className="flex items-center gap-1 text-amber-600">
                      <LockIcon className="size-3" />
                      Schließe Modul {moduleIndex} ab, um freizuschalten
                    </span>
                  ) : (
                    module.description
                  )}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Progress */}
              {isUnlocked && (
                <div className="hidden items-center gap-3 sm:flex">
                  <span className="text-sm text-muted-foreground">
                    {completedLessons.filter(id =>
                      module.lessons.some(l => l.id === id)
                    ).length}
                    /{module.lessons.length}
                  </span>
                  <div className="w-20">
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              )}

              {/* Chevron */}
              {isUnlocked && (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="size-5 text-muted-foreground" />
                </motion.div>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Lessons Content */}
        <AnimatePresence>
          {isOpen && isUnlocked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <CardContent className="border-t pt-4">
                <div className="space-y-1">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const completed = isLessonCompleted(lesson.id)
                    const TypeConfig = lessonTypeConfig[lesson.type]
                    const TypeIcon = TypeConfig.icon
                    const quizScore = lesson.type === 'quiz' ? getQuizScore(lesson.id) : null

                    return (
                      <Link
                        key={lesson.id}
                        href={`/kurse/${courseId}/${module.id}/${lesson.id}`}
                        className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          {/* Lesson Status */}
                          <div
                            className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                              completed
                                ? 'bg-green-500 text-white'
                                : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                            }`}
                          >
                            {completed ? (
                              <CheckCircleIcon className="size-4" />
                            ) : (
                              <span className="text-sm font-medium">{lessonIndex + 1}</span>
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div>
                            <p
                              className={`font-medium ${
                                completed ? 'text-muted-foreground line-through' : ''
                              }`}
                            >
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge
                                variant="outline"
                                className={`gap-1 px-1.5 py-0 text-[10px] ${TypeConfig.color}`}
                              >
                                <TypeIcon className="size-3" />
                                {TypeConfig.label}
                              </Badge>
                              <span>{lesson.duration}</span>
                              {quizScore !== null && (
                                <Badge
                                  variant={quizScore >= 80 ? 'default' : 'destructive'}
                                  className="text-[10px] px-1.5 py-0"
                                >
                                  {quizScore}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Play Icon on Hover */}
                        <PlayCircleIcon className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
