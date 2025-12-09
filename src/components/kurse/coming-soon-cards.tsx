'use client'

import { motion } from 'motion/react'
import {
  PenToolIcon,
  LinkedinIcon,
  LayersIcon,
  SparklesIcon,
  BellIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ComingSoonCourse {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  expectedDate?: string
}

const upcomingCourses: ComingSoonCourse[] = [
  {
    id: 'advanced-copywriting',
    title: 'Advanced Copywriting',
    description: 'Fortgeschrittene Techniken für höhere Reply-Raten',
    icon: <PenToolIcon className="size-6" />,
    color: 'from-zinc-500/20 to-neutral-500/20',
    expectedDate: 'Q1 2025'
  },
  {
    id: 'linkedin-outreach',
    title: 'LinkedIn Outreach',
    description: 'Cold Outreach auf LinkedIn professionell umsetzen',
    icon: <LinkedinIcon className="size-6" />,
    color: 'from-zinc-500/20 to-neutral-500/20',
    expectedDate: 'Q2 2025'
  },
  {
    id: 'multi-channel',
    title: 'Multi-Channel Sequencing',
    description: 'Email, LinkedIn & Calls optimal kombinieren',
    icon: <LayersIcon className="size-6" />,
    color: 'from-zinc-500/20 to-neutral-500/20',
    expectedDate: 'Q2 2025'
  }
]

export function ComingSoonCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <SparklesIcon className="size-5 text-amber-500" />
        <h2 className="text-lg font-semibold">Bald verfügbar</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          >
            <Card className="group relative overflow-hidden border-dashed transition-all hover:border-solid hover:shadow-md">
              {/* Glass Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-50`} />
              <div className="absolute inset-0 backdrop-blur-[2px]" />

              <CardContent className="relative p-5">
                {/* Badge */}
                <Badge
                  variant="secondary"
                  className="absolute top-3 right-3 bg-amber-500/10 text-amber-600 text-xs"
                >
                  {course.expectedDate}
                </Badge>

                {/* Icon */}
                <div className={`mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${course.color} text-foreground`}>
                  {course.icon}
                </div>

                {/* Content */}
                <h3 className="mb-1 font-semibold">{course.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {course.description}
                </p>

                {/* Notify Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                  disabled
                >
                  <BellIcon className="size-3" />
                  Benachrichtigen
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
