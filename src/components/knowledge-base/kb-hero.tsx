'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  SearchIcon,
  FileTextIcon,
  BookOpenIcon,
  SparklesIcon
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

import { knowledgeBaseCategories, searchArticles, type KBArticle } from '@/data/knowledgeBase'

interface KBHeroProps {
  totalArticles: number
  totalCategories: number
}

export function KBHero({ totalArticles, totalCategories }: KBHeroProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return []
    return searchArticles(searchQuery).slice(0, 8)
  }, [searchQuery])

  const showSearchResults = searchQuery.length >= 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border bg-card"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-neutral-500/5 to-transparent" />
      <div className="absolute -top-24 -right-24 size-48 rounded-full bg-zinc-500/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-48 rounded-full bg-neutral-500/5 blur-3xl" />

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Title & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 shadow-lg"
              >
                <BookOpenIcon className="size-6 text-white" />
              </motion.div>
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-4 text-zinc-500" />
                <span className="text-sm font-medium text-zinc-600">Cold Email Wissen</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Knowledge Base</h1>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Dein umfassendes Nachschlagewerk für Cold Email im DACH-Raum.
                Von Grundlagen bis zur Skalierung – alles was du wissen musst.
              </p>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                <FileTextIcon className="size-3.5" />
                {totalArticles} Artikel
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                <BookOpenIcon className="size-3.5" />
                {totalCategories} Kategorien
              </Badge>
              <Badge className="gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5">
                DACH Fokussiert
              </Badge>
            </div>
          </div>

          {/* Right: Search */}
          <div className="w-full lg:w-80">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-500/10 to-neutral-500/10 blur-sm" />
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Artikel durchsuchen..."
                  className="pl-10 bg-background/80 backdrop-blur-sm border-white/20"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border bg-popover shadow-xl"
                >
                  {searchResults.length > 0 ? (
                    <ul className="divide-y max-h-80 overflow-y-auto">
                      {searchResults.map(article => {
                        const category = knowledgeBaseCategories.find(c => c.id === article.categoryId)
                        return (
                          <li key={article.id}>
                            <Link
                              href={`/knowledge-base/${category?.slug}/${article.slug}`}
                              className="flex items-start gap-3 p-3 transition-colors hover:bg-muted"
                              onClick={() => setSearchQuery('')}
                            >
                              <FileTextIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-medium">{article.title}</p>
                                <p className="truncate text-sm text-muted-foreground">
                                  {category?.title}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={`shrink-0 text-xs ${
                                  article.difficulty === 'beginner'
                                    ? 'border-green-500/50 text-green-600'
                                    : article.difficulty === 'intermediate'
                                    ? 'border-amber-500/50 text-amber-600'
                                    : 'border-red-500/50 text-red-600'
                                }`}
                              >
                                {article.difficulty === 'beginner' && 'Einsteiger'}
                                {article.difficulty === 'intermediate' && 'Fortgeschritten'}
                                {article.difficulty === 'advanced' && 'Experte'}
                              </Badge>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Keine Artikel gefunden für "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
