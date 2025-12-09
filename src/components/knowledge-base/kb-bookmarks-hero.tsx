'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeftIcon, BookmarkIcon, BookOpenIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface KBBookmarksHeroProps {
  bookmarkCount: number
}

export function KBBookmarksHero({ bookmarkCount }: KBBookmarksHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-neutral-500/5 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute -right-20 -top-20 size-64 rounded-full bg-gradient-to-br from-zinc-500/5 to-transparent blur-3xl" />
      <div className="absolute -bottom-10 -left-10 size-48 rounded-full bg-gradient-to-tr from-neutral-500/5 to-transparent blur-2xl" />

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
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 shadow-lg"
          >
            <BookmarkIcon className="size-8 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-2xl font-bold tracking-tight md:text-3xl"
            >
              Meine Lesezeichen
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-muted-foreground"
            >
              {bookmarkCount > 0 ? (
                <>
                  Du hast <span className="font-semibold text-foreground">{bookmarkCount}</span>{' '}
                  {bookmarkCount === 1 ? 'Artikel' : 'Artikel'} gespeichert
                </>
              ) : (
                'Speichere Artikel, um sie später schnell wiederzufinden'
              )}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function KBBookmarksEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 py-16 text-center"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-zinc-500/20 to-neutral-500/10"
      >
        <BookmarkIcon className="size-10 text-zinc-500" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-xl font-semibold"
      >
        Keine Lesezeichen
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-2 max-w-sm text-muted-foreground"
      >
        Du hast noch keine Artikel gespeichert. Stöbere durch die Knowledge Base und speichere
        interessante Artikel für später.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Link href="/knowledge-base">
          <Button className="gap-2">
            <BookOpenIcon className="size-4" />
            Knowledge Base entdecken
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
