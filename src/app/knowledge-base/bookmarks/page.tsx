'use client'

import { useMemo } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'motion/react'
import { Loader2Icon } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'

import { knowledgeBaseCategories, getAllArticles, type KBArticle } from '@/data/knowledgeBase'
import { KBBookmarksHero, KBBookmarksEmptyState } from '@/components/knowledge-base/kb-bookmarks-hero'
import { KBBookmarkCard } from '@/components/knowledge-base/kb-bookmark-card'

export default function BookmarksPage() {
  const { user, isLoaded } = useUser()
  const { toast } = useToast()

  const bookmarkedArticles = useMemo(() => {
    if (!user) return []

    const bookmarkIds = (user.unsafeMetadata?.bookmarkedArticles as string[]) || []
    const allArticles = getAllArticles()

    return bookmarkIds
      .map((id) => allArticles.find((article) => article.id === id))
      .filter((article): article is KBArticle => article !== undefined)
  }, [user])

  const handleRemoveBookmark = async (articleId: string) => {
    if (!user) return

    const currentBookmarks = (user.unsafeMetadata?.bookmarkedArticles as string[]) || []
    const newBookmarks = currentBookmarks.filter((id) => id !== articleId)

    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bookmarkedArticles: newBookmarks
        }
      })
      toast({
        title: 'Lesezeichen entfernt',
        description: 'Artikel wurde aus deinen Lesezeichen entfernt.'
      })
    } catch {
      toast({
        title: 'Fehler',
        description: 'Lesezeichen konnte nicht entfernt werden.',
        variant: 'destructive'
      })
    }
  }

  const getCategoryForArticle = (categoryId: string) => {
    return knowledgeBaseCategories.find((cat) => cat.id === categoryId)
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2Icon className="size-8 text-primary" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <KBBookmarksHero bookmarkCount={bookmarkedArticles.length} />

      {/* Bookmarked Articles */}
      {bookmarkedArticles.length > 0 ? (
        <div className="space-y-4">
          {bookmarkedArticles.map((article, index) => (
            <KBBookmarkCard
              key={article.id}
              article={article}
              category={getCategoryForArticle(article.categoryId)}
              index={index}
              onRemove={handleRemoveBookmark}
            />
          ))}
        </div>
      ) : (
        <KBBookmarksEmptyState />
      )}
    </div>
  )
}
