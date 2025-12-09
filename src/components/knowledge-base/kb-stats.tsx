'use client'

import { motion } from 'motion/react'
import { FileTextIcon, FolderIcon, GlobeIcon, ClockIcon } from 'lucide-react'

interface KBStatsProps {
  totalArticles: number
  totalCategories: number
}

export function KBStats({ totalArticles, totalCategories }: KBStatsProps) {
  const stats = [
    {
      label: 'Artikel insgesamt',
      value: totalArticles,
      icon: FileTextIcon,
      color: 'from-zinc-700 to-zinc-800'
    },
    {
      label: 'Kategorien',
      value: totalCategories,
      icon: FolderIcon,
      color: 'from-zinc-700 to-zinc-800'
    },
    {
      label: 'DACH Fokussiert',
      value: 'DACH',
      icon: GlobeIcon,
      color: 'from-zinc-700 to-zinc-800'
    },
    {
      label: 'Lesezeit gesamt',
      value: '~12h',
      icon: ClockIcon,
      color: 'from-zinc-700 to-zinc-800'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-md"
        >
          {/* Gradient Background on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`} />

          <div className="relative flex items-center gap-4">
            <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color} shadow-md`}>
              <stat.icon className="size-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
