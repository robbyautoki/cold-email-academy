'use client'

import { motion } from 'motion/react'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image'

interface ToolHeroProps {
  icon: LucideIcon
  title: string
  description: string
  children?: React.ReactNode
  centerContent?: boolean
  image?: string
}

export function ToolHero({ icon: Icon, title, description, children, centerContent = false, image }: ToolHeroProps) {
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
        <div className={`flex flex-col gap-6 ${image ? 'md:flex-row md:items-center md:justify-between' : centerContent ? 'items-center text-center' : 'md:flex-row md:items-center md:justify-between'}`}>
          {/* Left side: Title & Description */}
          <div className={`flex ${image ? 'flex-1 flex-col justify-center gap-2' : centerContent ? 'flex-col items-center gap-4' : 'items-center gap-4'}`}>
            {/* Icon with Gradient - only show if no image */}
            {!image && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 text-white shadow-lg"
              >
                <Icon className="size-7" />
              </motion.div>
            )}

            {/* Title & Description */}
            <div>
              <motion.h1
                initial={{ opacity: 0, x: centerContent || image ? 0 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={image ? "text-3xl font-bold md:text-4xl" : "text-2xl font-bold md:text-3xl"}
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: centerContent || image ? 0 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={image ? "mt-2 text-lg text-muted-foreground" : "mt-1 text-muted-foreground"}
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Right side: Image (if provided) */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex flex-1 items-center justify-center"
            >
              <Image
                src={image}
                alt={title}
                width={400}
                height={250}
                className="rounded-xl shadow-lg object-contain max-h-48"
              />
            </motion.div>
          )}

          {/* Optional Children (e.g., Input, Buttons) - only show if no image */}
          {children && !image && (
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
