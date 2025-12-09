'use client'

import { motion } from 'motion/react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

import type { QuizQuestion as QuizQuestionType } from '@/data/courses'

interface QuizQuestionProps {
  question: QuizQuestionType
  index: number
  selectedAnswer?: number
  onSelect: (answerIdx: number) => void
  totalQuestions: number
}

export function QuizQuestion({
  question,
  index,
  selectedAnswer,
  onSelect,
  totalQuestions
}: QuizQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base font-medium">{question.question}</CardTitle>
            <Badge variant="secondary" className="shrink-0">
              {index + 1}/{totalQuestions}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => onSelect(parseInt(value))}
            className="space-y-2"
          >
            {question.options.map((option, optIdx) => {
              const isSelected = selectedAnswer === optIdx

              return (
                <motion.div
                  key={optIdx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Label
                    htmlFor={`${question.id}-${optIdx}`}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <RadioGroupItem
                      value={optIdx.toString()}
                      id={`${question.id}-${optIdx}`}
                      className="shrink-0"
                    />
                    <span className="flex-1">{option}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </motion.div>
                    )}
                  </Label>
                </motion.div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  )
}
