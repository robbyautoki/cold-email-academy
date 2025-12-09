'use client'

import { motion } from 'motion/react'
import { CheckCircleIcon, XCircleIcon, RotateCcwIcon, PartyPopperIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import type { QuizQuestion } from '@/data/courses'

interface QuizResultsProps {
  questions: QuizQuestion[]
  answers: Record<string, number>
  score: number
  onRetry: () => void
}

export function QuizResults({ questions, answers, score, onRetry }: QuizResultsProps) {
  const passed = score >= 80

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Score Card */}
      <Card
        className={`overflow-hidden ${
          passed
            ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/5'
            : 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/5'
        }`}
      >
        <CardContent className="py-8">
          <div className="flex flex-col items-center text-center">
            {/* Score Circle */}
            <div className="relative mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className={`flex size-32 items-center justify-center rounded-full ${
                  passed ? 'bg-green-500/20' : 'bg-amber-500/20'
                }`}
              >
                <div className="relative size-24">
                  <svg className="size-24 -rotate-90" viewBox="0 0 96 96">
                    {/* Background Circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className={passed ? 'text-green-200' : 'text-amber-200'}
                    />
                    {/* Progress Circle */}
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      className={passed ? 'text-green-500' : 'text-amber-500'}
                      initial={{ strokeDasharray: '0 264' }}
                      animate={{ strokeDasharray: `${(score / 100) * 264} 264` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{score}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Celebration Icon for Passed */}
              {passed && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.5 }}
                  className="absolute -top-2 -right-2"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-green-500 shadow-lg">
                    <PartyPopperIcon className="size-5 text-white" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Result Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className={`text-2xl font-bold ${passed ? 'text-green-700' : 'text-amber-700'}`}>
                {passed ? 'Bestanden!' : 'Nicht bestanden'}
              </h3>
              <p className="mt-1 text-muted-foreground">
                {passed
                  ? 'Gut gemacht! Du kannst mit der nächsten Lektion fortfahren.'
                  : 'Du benötigst mindestens 80% um zu bestehen.'}
              </p>
            </motion.div>

            {/* Retry Button */}
            {!passed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                <Button onClick={onRetry} variant="outline" className="gap-2">
                  <RotateCcwIcon className="size-4" />
                  Quiz wiederholen
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Answers Review */}
      <div className="space-y-4">
        <h4 className="font-semibold">Deine Antworten im Überblick:</h4>

        {questions.map((question, qIdx) => {
          const userAnswer = answers[question.id]
          const isCorrect = userAnswer === question.correctAnswer

          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * qIdx }}
            >
              <Card
                className={`overflow-hidden ${
                  isCorrect ? 'border-green-500/50' : 'border-red-500/50'
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircleIcon className="size-4 text-white" />
                      ) : (
                        <XCircleIcon className="size-4 text-white" />
                      )}
                    </div>
                    <CardTitle className="text-sm font-medium">
                      Frage {qIdx + 1}: {question.question}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Options */}
                  <div className="space-y-1.5">
                    {question.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`rounded-lg p-2.5 text-sm ${
                          optIdx === question.correctAnswer
                            ? 'bg-green-500/10 text-green-700 font-medium'
                            : optIdx === userAnswer && !isCorrect
                            ? 'bg-red-500/10 text-red-700 line-through'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <span className="mr-2 font-medium">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {option}
                        {optIdx === question.correctAnswer && (
                          <CheckCircleIcon className="ml-2 inline-block size-4 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm">
                      <span className="font-medium">Erklärung: </span>
                      <span className="text-muted-foreground">{question.explanation}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
