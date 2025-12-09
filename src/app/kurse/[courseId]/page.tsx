'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { LockIcon, BookOpenIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import { CourseDetailHero } from '@/components/kurse/course-detail-hero'
import { ModuleCard } from '@/components/kurse/module-card'

import {
  getCourseById,
  isModuleUnlocked,
  calculateModuleProgress,
  calculateCourseProgress,
  type Course,
  type Module,
  type CourseProgress
} from '@/data/courses'

const CourseDetailPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string

  const [course, setCourse] = useState<Course | null>(null)
  const [userProgress, setUserProgress] = useState<CourseProgress | null>(null)
  const [openModules, setOpenModules] = useState<string[]>([])

  useEffect(() => {
    const foundCourse = getCourseById(courseId)
    if (foundCourse) {
      setCourse(foundCourse)
      // Öffne das erste Modul standardmäßig
      if (foundCourse.modules.length > 0) {
        setOpenModules([foundCourse.modules[0].id])
      }
    } else {
      router.push('/kurse')
    }
  }, [courseId, router])

  useEffect(() => {
    if (user?.unsafeMetadata?.courseProgress) {
      const progress = (user.unsafeMetadata.courseProgress as Record<string, CourseProgress>)[courseId]
      if (progress) {
        setUserProgress(progress)
        // Öffne das aktuelle Modul
        if (progress.currentModuleId) {
          setOpenModules(prev =>
            prev.includes(progress.currentModuleId) ? prev : [...prev, progress.currentModuleId]
          )
        }
      }
    }
  }, [user, courseId])

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const getQuizScore = (quizId: string): number | null => {
    if (!userProgress?.quizScores) return null
    return userProgress.quizScores[quizId] ?? null
  }

  const getNextLesson = (module: Module): string | null => {
    for (const lesson of module.lessons) {
      if (!userProgress?.completedLessons?.includes(lesson.id)) {
        return lesson.id
      }
    }
    return null
  }

  const getContinueUrl = (): string | null => {
    if (!course) return null

    for (const module of course.modules) {
      if (!isModuleUnlocked(courseId, module.id, userProgress)) continue

      const nextLesson = getNextLesson(module)
      if (nextLesson) {
        return `/kurse/${courseId}/${module.id}/${nextLesson}`
      }
    }
    return null
  }

  if (!course) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="size-8 rounded-full border-2 border-primary border-t-transparent"
        />
      </div>
    )
  }

  const overallProgress = calculateCourseProgress(course, userProgress?.completedLessons || [])
  const continueUrl = getContinueUrl()
  const completedLessons = userProgress?.completedLessons || []

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <CourseDetailHero
        course={course}
        progress={overallProgress}
        continueUrl={continueUrl}
      />

      {/* Modules Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <BookOpenIcon className="size-5 text-primary" />
          <h2 className="text-xl font-semibold">Kursinhalt</h2>
          <span className="text-sm text-muted-foreground">
            ({course.modules.length} Module, {course.totalLessons} Lektionen)
          </span>
        </div>

        <div className="space-y-4">
          {course.modules.map((module, moduleIndex) => {
            const isUnlocked = isModuleUnlocked(courseId, module.id, userProgress)
            const moduleProgress = calculateModuleProgress(module, completedLessons)
            const isOpen = openModules.includes(module.id)

            return (
              <ModuleCard
                key={module.id}
                module={module}
                courseId={courseId}
                moduleIndex={moduleIndex}
                isUnlocked={isUnlocked}
                progress={moduleProgress}
                completedLessons={completedLessons}
                isOpen={isOpen}
                onToggle={() => toggleModule(module.id)}
                getQuizScore={getQuizScore}
              />
            )
          })}
        </div>
      </motion.div>

      {/* Info Card for Locked Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                <LockIcon className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-amber-700">Progressive Freischaltung</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Schließe jedes Modul vollständig ab, um das nächste freizuschalten.
                  Bei Modulen mit Quiz musst du mindestens 80% erreichen.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default CourseDetailPage
