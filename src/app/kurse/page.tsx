'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

import {
  courses,
  type CourseProgress,
  calculateCourseProgress,
  isModuleUnlocked
} from '@/data/courses'

import {
  CourseHero,
  CourseProgressCard,
  CourseCard,
  ModuleAccordion,
  ComingSoonCards
} from '@/components/kurse'

const KursePage = () => {
  const { user } = useUser()
  const [userProgress, setUserProgress] = useState<Record<string, CourseProgress>>({})

  useEffect(() => {
    if (user?.unsafeMetadata?.courseProgress) {
      setUserProgress(user.unsafeMetadata.courseProgress as Record<string, CourseProgress>)
    }
  }, [user])

  const getCourseProgress = (courseId: string): number => {
    const progress = userProgress[courseId]
    if (!progress) return 0

    const course = courses.find(c => c.id === courseId)
    if (!course) return 0

    return calculateCourseProgress(course, progress.completedLessons)
  }

  const getCourseStatus = (courseId: string): 'not-started' | 'in-progress' | 'completed' => {
    const progress = getCourseProgress(courseId)
    if (progress === 0) return 'not-started'
    if (progress === 100) return 'completed'
    return 'in-progress'
  }

  // Calculate totals
  const totalModules = courses.reduce((acc, c) => acc + c.modules.length, 0)
  const totalLessons = courses.reduce((acc, c) => acc + c.totalLessons, 0)
  const totalDuration = courses.reduce((acc, c) => {
    const match = c.totalDuration.match(/(\d+)/)
    return acc + (match ? parseInt(match[1]) : 0)
  }, 0)

  // Get overall progress
  const overallProgress = courses.length > 0
    ? Math.round(courses.reduce((acc, c) => acc + getCourseProgress(c.id), 0) / courses.length)
    : 0

  const completedCourses = courses.filter(c => getCourseProgress(c.id) === 100).length

  // Get current lesson for quick access
  const getCurrentLesson = () => {
    for (const course of courses) {
      const progress = userProgress[course.id]
      if (progress && !progress.completed) {
        // Find first incomplete lesson
        for (const module of course.modules) {
          for (const lesson of module.lessons) {
            if (!progress.completedLessons.includes(lesson.id)) {
              return {
                title: lesson.title,
                courseId: course.id,
                moduleId: module.id,
                lessonId: lesson.id
              }
            }
          }
        }
      }
    }
    // If no progress yet, return first lesson of first course
    if (courses.length > 0 && courses[0].modules.length > 0 && courses[0].modules[0].lessons.length > 0) {
      return {
        title: courses[0].modules[0].lessons[0].title,
        courseId: courses[0].id,
        moduleId: courses[0].modules[0].id,
        lessonId: courses[0].modules[0].lessons[0].id
      }
    }
    return undefined
  }

  // Get unlocked modules for the main course
  const getUnlockedModules = (courseId: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return []

    const progress = userProgress[courseId] || null
    return course.modules
      .filter(m => isModuleUnlocked(courseId, m.id, progress))
      .map(m => m.id)
  }

  // Get completed lessons for the main course
  const getCompletedLessons = (courseId: string) => {
    const progress = userProgress[courseId]
    return progress?.completedLessons || []
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <CourseHero
        totalCourses={courses.length}
        totalModules={totalModules}
        totalLessons={totalLessons}
        totalDuration={`${totalDuration}+ Std.`}
      />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Course Cards */}
        <div className="space-y-6 lg:col-span-2">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={getCourseProgress(course.id)}
              status={getCourseStatus(course.id)}
            />
          ))}
        </div>

        {/* Right: Progress Card */}
        <div className="space-y-6">
          <CourseProgressCard
            overallProgress={overallProgress}
            completedCourses={completedCourses}
            totalCourses={courses.length}
            currentLesson={getCurrentLesson()}
          />
        </div>
      </div>

      {/* Module Accordion for main course */}
      {courses.length > 0 && (
        <ModuleAccordion
          modules={courses[0].modules}
          courseId={courses[0].id}
          completedLessons={getCompletedLessons(courses[0].id)}
          unlockedModules={getUnlockedModules(courses[0].id)}
        />
      )}

      {/* Coming Soon Section */}
      <ComingSoonCards />
    </div>
  )
}

export default KursePage
