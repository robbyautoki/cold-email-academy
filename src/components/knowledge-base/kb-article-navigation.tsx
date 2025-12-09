'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import type { KBArticle } from '@/data/knowledgeBase'

interface KBArticleNavigationProps {
  categorySlug: string
  prevArticle: KBArticle | null
  nextArticle: KBArticle | null
}

export function KBArticleNavigation({
  categorySlug,
  prevArticle,
  nextArticle
}: KBArticleNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {/* Previous Article */}
      {prevArticle ? (
        <Link href={`/knowledge-base/${categorySlug}/${prevArticle.slug}`} className="group">
          <Card className="relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardContent className="relative flex items-center gap-4 p-4">
              {/* Arrow Icon */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <ChevronLeftIcon className="size-5" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Vorheriger Artikel
                </p>
                <p className="mt-0.5 truncate font-medium transition-colors duration-300 group-hover:text-primary">
                  {prevArticle.title}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Article */}
      {nextArticle ? (
        <Link href={`/knowledge-base/${categorySlug}/${nextArticle.slug}`} className="group">
          <Card className="relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardContent className="relative flex items-center justify-end gap-4 p-4 text-right">
              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Nächster Artikel
                </p>
                <p className="mt-0.5 truncate font-medium transition-colors duration-300 group-hover:text-primary">
                  {nextArticle.title}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <ChevronRightIcon className="size-5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div />
      )}
    </motion.div>
  )
}

interface KBRelatedArticlesProps {
  categorySlug: string
  categoryTitle: string
  articles: KBArticle[]
  currentArticleId: string
}

export function KBRelatedArticles({
  categorySlug,
  categoryTitle,
  articles,
  currentArticleId
}: KBRelatedArticlesProps) {
  const relatedArticles = articles
    .filter((a) => a.id !== currentArticleId)
    .slice(0, 3)

  if (relatedArticles.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border bg-card p-6"
    >
      <h3 className="font-semibold">Weitere Artikel in {categoryTitle}</h3>
      <div className="mt-4 space-y-3">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/knowledge-base/${categorySlug}/${article.slug}`}
            className="group flex items-center justify-between gap-2 rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <span className="truncate text-sm transition-colors group-hover:text-primary">
              {article.title}
            </span>
            <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
          </Link>
        ))}
      </div>
      <Link
        href={`/knowledge-base/${categorySlug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        Alle Artikel anzeigen
        <ArrowRightIcon className="size-3.5" />
      </Link>
    </motion.div>
  )
}
