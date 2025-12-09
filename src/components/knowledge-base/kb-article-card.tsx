'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ClockIcon, ArrowRightIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import type { KBArticle } from '@/data/knowledgeBase'

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

interface KBArticleCardProps {
  article: KBArticle
  categorySlug: string
  index: number
}

export function KBArticleCard({ article, categorySlug, index }: KBArticleCardProps) {
  const difficulty = difficultyConfig[article.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/knowledge-base/${categorySlug}/${article.slug}`}>
        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30">
          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <CardHeader className="relative flex-row items-start gap-4 space-y-0 pb-3">
            {/* Number Badge */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-muted to-muted/50 font-semibold text-muted-foreground transition-all duration-300 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground">
              {index + 1}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-1">
              <CardTitle className="text-lg leading-tight transition-colors duration-300 group-hover:text-primary">
                {article.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {article.description}
              </CardDescription>
            </div>

            {/* Arrow Icon */}
            <div className="shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
              <ArrowRightIcon className="size-5 text-primary" />
            </div>
          </CardHeader>

          <CardContent className="relative pt-0">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Difficulty Badge */}
              <Badge
                variant="outline"
                className={cn('text-xs font-medium', difficulty.bg, difficulty.color)}
              >
                {difficulty.label}
              </Badge>

              {/* Read Time */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ClockIcon className="size-3.5" />
                {article.readTime}
              </div>

              {/* Separator */}
              <div className="h-3 w-px bg-border" />

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{article.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

interface KBEmptyStateProps {
  onReset: () => void
}

export function KBEmptyState({ onReset }: KBEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 py-16 text-center"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <svg
          className="size-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold">Keine Artikel gefunden</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Versuche andere Suchbegriffe oder setze die Filter zurück.
      </p>
      <button
        onClick={onReset}
        className="mt-4 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        Filter zurücksetzen
      </button>
    </motion.div>
  )
}
