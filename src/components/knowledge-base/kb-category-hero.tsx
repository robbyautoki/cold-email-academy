'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ArrowLeftIcon,
  BookOpenIcon,
  ServerIcon,
  ShieldCheckIcon,
  SearchIcon,
  PenToolIcon,
  WrenchIcon,
  ScaleIcon,
  ChartBarIcon,
  TrendingUpIcon,
  HelpCircleIcon,
  FileTextIcon,
  FilterIcon
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { KBCategory } from '@/data/knowledgeBase'

const iconMap: Record<string, React.ElementType> = {
  BookOpenIcon,
  ServerIcon,
  ShieldCheckIcon,
  SearchIcon,
  PenToolIcon,
  WrenchIcon,
  ScaleIcon,
  ChartBarIcon,
  TrendingUpIcon,
  HelpCircleIcon
}

// Unified grayscale gradient for all categories
const defaultGradient = {
  bg: 'from-zinc-500/10 via-neutral-500/5 to-transparent',
  iconBg: 'from-zinc-700 to-zinc-800',
  accent: 'text-zinc-600 dark:text-zinc-400'
}

const categoryGradients: Record<string, { bg: string; iconBg: string; accent: string }> = {
  'grundlagen-strategie': defaultGradient,
  'technische-infrastruktur': defaultGradient,
  'zustellbarkeit-reputation': defaultGradient,
  'lead-research-targeting': defaultGradient,
  'copywriting-messaging': defaultGradient,
  'tools-automatisierung': defaultGradient,
  'rechtliches-compliance': defaultGradient,
  'metriken-optimierung': defaultGradient,
  'skalierung-prozesse': defaultGradient,
  'troubleshooting-faq': defaultGradient
}

interface KBCategoryHeroProps {
  category: KBCategory
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedDifficulty: string | null
  onDifficultyChange: (value: string | null) => void
  filteredCount: number
}

export function KBCategoryHero({
  category,
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  filteredCount
}: KBCategoryHeroProps) {
  const IconComponent = iconMap[category.icon] || BookOpenIcon
  const gradient = categoryGradients[category.slug] || defaultGradient

  const difficultyFilters = [
    { value: null, label: 'Alle' },
    { value: 'beginner', label: 'Einsteiger' },
    { value: 'intermediate', label: 'Fortgeschritten' },
    { value: 'advanced', label: 'Experte' }
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient.bg}`} />

      {/* Decorative Elements */}
      <div className="absolute -right-20 -top-20 size-64 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
      <div className="absolute -bottom-10 -left-10 size-48 rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-2xl" />

      <div className="relative p-6 md:p-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/knowledge-base"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Zurück zur Übersicht
          </Link>
        </motion.div>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient.iconBg} shadow-lg`}
          >
            <IconComponent className="size-8 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-2xl font-bold tracking-tight md:text-3xl"
            >
              {category.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl"
            >
              {category.description}
            </motion.p>

            {/* Stats Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap gap-2"
            >
              <Badge variant="secondary" className="gap-1.5">
                <FileTextIcon className="size-3.5" />
                {category.articleCount} Artikel
              </Badge>
              {filteredCount !== category.articleCount && (
                <Badge variant="outline" className={gradient.accent}>
                  <FilterIcon className="mr-1.5 size-3.5" />
                  {filteredCount} gefiltert
                </Badge>
              )}
            </motion.div>
          </div>
        </div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          {/* Search */}
          <div className="relative flex-1 sm:max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Artikel suchen..."
              className="pl-10 bg-background/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Difficulty Filters */}
          <div className="flex flex-wrap gap-2">
            {difficultyFilters.map((filter) => (
              <Button
                key={filter.value ?? 'all'}
                variant={selectedDifficulty === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onDifficultyChange(filter.value)}
                className="transition-all"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
