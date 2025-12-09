'use client'

import { motion } from 'motion/react'
import { LucideIcon } from 'lucide-react'

interface ToolHeroProps {
  icon: LucideIcon
  title: string
  description: string
  children?: React.ReactNode
}

export function ToolHero({ icon: Icon, title, description, children }: ToolHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border bg-card"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-neutral-500/5 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute -right-20 -top-20 size-40 rounded-full bg-zinc-500/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-zinc-500/5 blur-3xl" />

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {/* Icon with Gradient */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 text-white shadow-lg"
            >
              <Icon className="size-7" />
            </motion.div>

            {/* Title & Description */}
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-bold md:text-3xl"
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-1 text-muted-foreground"
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Optional Children (e.g., Input, Buttons) */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full md:w-auto"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
