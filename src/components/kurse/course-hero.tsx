'use client'

import { motion } from 'motion/react'
import { GraduationCapIcon, BookOpenIcon, ClockIcon, UsersIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

interface CourseHeroProps {
  totalCourses: number
  totalModules: number
  totalLessons: number
  totalDuration: string
}

export function CourseHero({ totalCourses, totalModules, totalLessons, totalDuration }: CourseHeroProps) {
  const stats = [
    { label: 'Kurse', value: totalCourses, icon: GraduationCapIcon },
    { label: 'Module', value: totalModules, icon: BookOpenIcon },
    { label: 'Lektionen', value: totalLessons, icon: UsersIcon },
    { label: 'Lernzeit', value: totalDuration, icon: ClockIcon }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 p-8 text-white"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 size-96 rounded-full bg-zinc-500/20 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 size-64 rounded-full bg-zinc-400/10 blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Title & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <GraduationCapIcon className="size-7" />
              </div>
              <div>
                <Badge className="mb-1 bg-white/20 text-white hover:bg-white/30">
                  Cold Email Academy
                </Badge>
                <h1 className="text-3xl font-bold sm:text-4xl">Kurse</h1>
              </div>
            </div>
            <p className="max-w-xl text-white/80">
              Lerne Cold Email von Grund auf. Von den Basics bis zur Skalierung -
              alles was du brauchst, um erfolgreiche Kampagnen zu fahren.
            </p>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-wrap gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur"
              >
                <stat.icon className="size-4 text-white/70" />
                <div className="text-center">
                  <div className="font-semibold">{stat.value}</div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
