'use client'

import { useEffect, useState, useMemo } from 'react'
import { useUser } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Loader2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { LessonHeader } from '@/components/kurse/lesson-header'
import { LessonContent } from '@/components/kurse/lesson-content'
import { LessonSidebar } from '@/components/kurse/lesson-sidebar'
import { LessonNavigation } from '@/components/kurse/lesson-navigation'
import { QuizQuestion } from '@/components/kurse/quiz-question'
import { QuizResults } from '@/components/kurse/quiz-results'

import {
  getCourseById,
  getModuleById,
  getLessonById,
  isModuleUnlocked,
  calculateModuleProgress,
  type Course,
  type Module,
  type Lesson,
  type CourseProgress
} from '@/data/courses'

const LessonPlayerPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const params = useParams()

  const courseId = params.courseId as string
  const moduleId = params.moduleId as string
  const lessonId = params.lessonId as string

  const [course, setCourse] = useState<Course | null>(null)
  const [module, setModule] = useState<Module | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [userProgress, setUserProgress] = useState<CourseProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)

  useEffect(() => {
    const foundCourse = getCourseById(courseId)
    const foundModule = getModuleById(courseId, moduleId)
    const foundLesson = getLessonById(courseId, moduleId, lessonId)

    if (foundCourse && foundModule && foundLesson) {
      setCourse(foundCourse)
      setModule(foundModule)
      setLesson(foundLesson)
    } else {
      router.push('/kurse')
    }
    setIsLoading(false)
  }, [courseId, moduleId, lessonId, router])

  useEffect(() => {
    if (user?.unsafeMetadata?.courseProgress) {
      const progress = (user.unsafeMetadata.courseProgress as Record<string, CourseProgress>)[courseId]
      if (progress) {
        setUserProgress(progress)

        // Lade vorhandene Quiz-Antworten wenn vorhanden
        if (lesson?.type === 'quiz' && progress.quizScores?.[lessonId]) {
          setQuizScore(progress.quizScores[lessonId])
          setQuizSubmitted(true)
        }
      }
    }
  }, [user, courseId, lessonId, lesson?.type])

  // Navigation helpers
  const { prevLesson, nextLesson, currentIndex, totalLessons } = useMemo(() => {
    if (!course || !module) {
      return { prevLesson: null, nextLesson: null, currentIndex: 0, totalLessons: 0 }
    }

    // Flatten all lessons from all modules
    const allLessons: { moduleId: string; lesson: Lesson }[] = []
    course.modules.forEach(m => {
      m.lessons.forEach(l => {
        allLessons.push({ moduleId: m.id, lesson: l })
      })
    })

    const currentIdx = allLessons.findIndex(
      item => item.moduleId === moduleId && item.lesson.id === lessonId
    )

    return {
      prevLesson: currentIdx > 0 ? allLessons[currentIdx - 1] : null,
      nextLesson: currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null,
      currentIndex: currentIdx + 1,
      totalLessons: allLessons.length
    }
  }, [course, module, moduleId, lessonId])

  const isLessonCompleted = (id: string): boolean => {
    return userProgress?.completedLessons?.includes(id) || false
  }

  const canNavigateToLesson = (targetModuleId: string): boolean => {
    return isModuleUnlocked(courseId, targetModuleId, userProgress)
  }

  const markLessonComplete = async () => {
    if (!user || !course || !lesson) return
    if (isLessonCompleted(lesson.id)) return

    setIsSaving(true)

    try {
      const existingProgress = (user.unsafeMetadata?.courseProgress as Record<string, CourseProgress>) || {}
      const courseProgress = existingProgress[courseId] || {
        courseId,
        completedLessons: [],
        currentModuleId: moduleId,
        currentLessonId: lessonId,
        quizScores: {},
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        completed: false
      }

      // Add lesson to completed if not already there
      if (!courseProgress.completedLessons.includes(lesson.id)) {
        courseProgress.completedLessons.push(lesson.id)
      }

      courseProgress.currentModuleId = moduleId
      courseProgress.currentLessonId = lessonId
      courseProgress.lastAccessedAt = new Date().toISOString()

      // Check if course is complete
      const totalLessonsInCourse = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
      courseProgress.completed = courseProgress.completedLessons.length >= totalLessonsInCourse

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          courseProgress: {
            ...existingProgress,
            [courseId]: courseProgress
          }
        }
      })

      setUserProgress(courseProgress)
    } catch (error) {
      console.error('Error saving progress:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleQuizSubmit = async () => {
    if (!lesson?.quizQuestions || !user || !course) return

    // Calculate score
    let correct = 0
    lesson.quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })

    const score = Math.round((correct / lesson.quizQuestions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)

    // Save quiz score
    setIsSaving(true)
    try {
      const existingProgress = (user.unsafeMetadata?.courseProgress as Record<string, CourseProgress>) || {}
      const courseProgress = existingProgress[courseId] || {
        courseId,
        completedLessons: [],
        currentModuleId: moduleId,
        currentLessonId: lessonId,
        quizScores: {},
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        completed: false
      }

      courseProgress.quizScores = {
        ...courseProgress.quizScores,
        [lesson.id]: score
      }

      // Mark as complete if score >= 80
      if (score >= 80 && !courseProgress.completedLessons.includes(lesson.id)) {
        courseProgress.completedLessons.push(lesson.id)
      }

      courseProgress.lastAccessedAt = new Date().toISOString()

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          courseProgress: {
            ...existingProgress,
            [courseId]: courseProgress
          }
        }
      })

      setUserProgress(courseProgress)
    } catch (error) {
      console.error('Error saving quiz score:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const retryQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
  }

  if (isLoading || !course || !module || !lesson) {
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

  const moduleProgress = calculateModuleProgress(module, userProgress?.completedLessons || [])
  const lessonCompleted = isLessonCompleted(lesson.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <LessonHeader
        course={course}
        module={module}
        lesson={lesson}
        courseId={courseId}
        moduleId={moduleId}
        currentIndex={currentIndex}
        totalLessons={totalLessons}
        isCompleted={lessonCompleted}
        moduleProgress={moduleProgress}
        isLessonCompleted={isLessonCompleted}
      />

      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Lesson Content */}
          <LessonContent lesson={lesson}>
            {/* Quiz Content */}
            {lesson.type === 'quiz' && lesson.quizQuestions && (
              <>
                {!quizSubmitted ? (
                  <div className="space-y-4">
                    {lesson.quizQuestions.map((question, qIdx) => (
                      <QuizQuestion
                        key={question.id}
                        question={question}
                        index={qIdx}
                        selectedAnswer={quizAnswers[question.id]}
                        onSelect={(answerIdx) =>
                          setQuizAnswers(prev => ({ ...prev, [question.id]: answerIdx }))
                        }
                        totalQuestions={lesson.quizQuestions!.length}
                      />
                    ))}

                    <Button
                      onClick={handleQuizSubmit}
                      disabled={
                        Object.keys(quizAnswers).length < lesson.quizQuestions.length ||
                        isSaving
                      }
                      className="w-full gap-2"
                      size="lg"
                    >
                      {isSaving && <Loader2Icon className="size-4 animate-spin" />}
                      Quiz abschließen
                    </Button>
                  </div>
                ) : (
                  <QuizResults
                    questions={lesson.quizQuestions}
                    answers={quizAnswers}
                    score={quizScore!}
                    onRetry={retryQuiz}
                  />
                )}
              </>
            )}
          </LessonContent>

          {/* Navigation */}
          <LessonNavigation
            courseId={courseId}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            canNavigateToPrev={prevLesson ? canNavigateToLesson(prevLesson.moduleId) : false}
            canNavigateToNext={nextLesson ? canNavigateToLesson(nextLesson.moduleId) : false}
            isCompleted={lessonCompleted}
            lessonType={lesson.type}
            isSaving={isSaving}
            onMarkComplete={markLessonComplete}
          />
        </div>

        {/* Sidebar */}
        <LessonSidebar
          module={module}
          courseId={courseId}
          moduleId={moduleId}
          currentLessonId={lessonId}
          moduleProgress={moduleProgress}
          isLessonCompleted={isLessonCompleted}
        />
      </div>
    </div>
  )
}

export default LessonPlayerPage
