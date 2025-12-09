'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ArrowLeftIcon,
  ClockIcon,
  BookmarkIcon,
  BookmarkCheckIcon,
  ShareIcon,
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
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { KBCategory, KBArticle } from '@/data/knowledgeBase'

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
  iconBg: 'from-zinc-700 to-zinc-800'
}

const categoryGradients: Record<string, { bg: string; iconBg: string }> = {
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

const difficultyConfig: Record<string, { label: string; color: string; bg: string }> = {
  beginner: {
    label: 'Einsteiger',
    color: 'text-green-700 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30'
  },
  intermediate: {
    label: 'Fortgeschritten',
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30'
  },
  advanced: {
    label: 'Experte',
    color: 'text-red-700 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30'
  }
}

interface KBArticleHeaderProps {
  category: KBCategory
  article: KBArticle
  isBookmarked: boolean
  onBookmark: () => void
  onShare: () => void
}

export function KBArticleHeader({
  category,
  article,
  isBookmarked,
  onBookmark,
  onShare
}: KBArticleHeaderProps) {
  const IconComponent = iconMap[category.icon] || BookOpenIcon
  const gradient = categoryGradients[category.slug] || defaultGradient
  const difficulty = difficultyConfig[article.difficulty]

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
            href={`/knowledge-base/${category.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Zurück zu {category.title}
          </Link>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-4 flex items-center gap-2"
        >
          <div className={`flex size-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient.iconBg}`}>
            <IconComponent className="size-4 text-white" />
          </div>
          <Link
            href={`/knowledge-base/${category.slug}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {category.title}
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-4 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
        >
          {article.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-3 text-lg text-muted-foreground"
        >
          {article.description}
        </motion.p>

        {/* Metadata Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-4 flex flex-wrap items-center gap-3"
        >
          <Badge
            variant="outline"
            className={cn('text-xs font-medium', difficulty.bg, difficulty.color)}
          >
            {difficulty.label}
          </Badge>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ClockIcon className="size-4" />
            {article.readTime}
          </div>

          <div className="h-4 w-px bg-border" />

          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 flex gap-2"
        >
          <Button
            variant={isBookmarked ? 'default' : 'outline'}
            size="sm"
            onClick={onBookmark}
            className="gap-2 transition-all"
          >
            {isBookmarked ? (
              <>
                <BookmarkCheckIcon className="size-4" />
                Gespeichert
              </>
            ) : (
              <>
                <BookmarkIcon className="size-4" />
                Speichern
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={onShare} className="gap-2">
            <ShareIcon className="size-4" />
            Teilen
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
