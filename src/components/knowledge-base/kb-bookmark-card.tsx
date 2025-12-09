'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { BookmarkIcon, BookOpenIcon, ClockIcon, XIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { KBArticle, KBCategory } from '@/data/knowledgeBase'

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

interface KBBookmarkCardProps {
  article: KBArticle
  category: KBCategory | undefined
  index: number
  onRemove: (articleId: string) => void
}

export function KBBookmarkCard({ article, category, index, onRemove }: KBBookmarkCardProps) {
  const difficulty = difficultyConfig[article.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30">
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="relative flex-row items-start justify-between gap-4 space-y-0 pb-3">
          {/* Main Content - Clickable */}
          <Link
            href={`/knowledge-base/${category?.slug}/${article.slug}`}
            className="min-w-0 flex-1 space-y-3"
          >
            {/* Category Badge */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpenIcon className="size-4" />
              <span className="truncate">{category?.title || 'Unbekannte Kategorie'}</span>
            </div>

            {/* Title */}
            <CardTitle className="text-lg leading-tight transition-colors duration-300 group-hover:text-primary">
              {article.title}
            </CardTitle>

            {/* Description */}
            <CardDescription className="line-clamp-2">{article.description}</CardDescription>
          </Link>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => {
              e.preventDefault()
              onRemove(article.id)
            }}
          >
            <BookmarkIcon className="size-4 fill-current" />
            <span className="sr-only">Lesezeichen entfernen</span>
          </Button>
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
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
              {article.tags.length > 2 && (
                <span className="text-xs text-muted-foreground">+{article.tags.length - 2}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
