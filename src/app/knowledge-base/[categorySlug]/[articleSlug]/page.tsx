'use client'

import { useMemo } from 'react'
import { useParams, notFound } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'

import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

import { getCategoryBySlug, getArticleBySlug } from '@/data/knowledgeBase'
import { ArticleSectionsRenderer } from '@/components/knowledge-base/article-sections'
import { KBArticleHeader } from '@/components/knowledge-base/kb-article-header'
import { KBArticleNavigation, KBRelatedArticles } from '@/components/knowledge-base/kb-article-navigation'

export default function ArticlePage() {
  const params = useParams()
  const { user } = useUser()
  const { toast } = useToast()

  const categorySlug = params.categorySlug as string
  const articleSlug = params.articleSlug as string

  const category = getCategoryBySlug(categorySlug)
  const article = category ? getArticleBySlug(categorySlug, articleSlug) : null

  const isBookmarked = useMemo(() => {
    if (!user || !article) return false
    const bookmarks = (user.unsafeMetadata?.bookmarkedArticles as string[]) || []
    return bookmarks.includes(article.id)
  }, [user, article])

  const currentIndex = category?.articles.findIndex((a) => a.slug === articleSlug) ?? -1
  const prevArticle = currentIndex > 0 ? category?.articles[currentIndex - 1] : null
  const nextArticle =
    currentIndex < (category?.articles.length ?? 0) - 1
      ? category?.articles[currentIndex + 1]
      : null

  const handleBookmark = async () => {
    if (!user || !article) return

    const currentBookmarks = (user.unsafeMetadata?.bookmarkedArticles as string[]) || []
    let newBookmarks: string[]

    if (isBookmarked) {
      newBookmarks = currentBookmarks.filter((id) => id !== article.id)
      toast({
        title: 'Lesezeichen entfernt',
        description: 'Artikel wurde aus deinen Lesezeichen entfernt.'
      })
    } else {
      newBookmarks = [...currentBookmarks, article.id]
      toast({
        title: 'Lesezeichen hinzugefügt',
        description: 'Artikel wurde zu deinen Lesezeichen hinzugefügt.'
      })
    }

    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bookmarkedArticles: newBookmarks
        }
      })
    } catch {
      toast({
        title: 'Fehler',
        description: 'Lesezeichen konnte nicht aktualisiert werden.',
        variant: 'destructive'
      })
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          url
        })
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(url)
      toast({
        title: 'Link kopiert',
        description: 'Der Link wurde in die Zwischenablage kopiert.'
      })
    }
  }

  if (!category || !article) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Article Header */}
      <KBArticleHeader
        category={category}
        article={article}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border bg-card p-6 md:p-8"
      >
        {/* Intro Text (if present) */}
        {article.intro && (
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {article.intro}
          </p>
        )}

        {/* New: Structured Sections */}
        {article.sections && article.sections.length > 0 ? (
          <ArticleSectionsRenderer sections={article.sections} />
        ) : article.content ? (
          /* Legacy: Markdown Content */
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 mt-8 text-2xl font-bold">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-4 mt-8 text-xl font-semibold">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-3 mt-6 text-lg font-semibold">{children}</h3>
                ),
                p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
                ul: ({ children }) => (
                  <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-7">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="my-4 border-l-4 border-primary pl-4 italic">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children }) => {
                  const isInline = !className
                  if (isInline) {
                    return (
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                        {children}
                      </code>
                    )
                  }
                  return (
                    <code className="block overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-100">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4">
                    {children}
                  </pre>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => <Separator className="my-8" />,
                table: ({ children }) => (
                  <div className="my-4 overflow-x-auto">
                    <table className="w-full border-collapse">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted/50">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="border px-4 py-2 text-left font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border px-4 py-2">{children}</td>
                )
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        ) : null}
      </motion.article>

      {/* Related Articles */}
      <KBRelatedArticles
        categorySlug={category.slug}
        categoryTitle={category.title}
        articles={category.articles}
        currentArticleId={article.id}
      />

      {/* Navigation */}
      <KBArticleNavigation
        categorySlug={category.slug}
        prevArticle={prevArticle ?? null}
        nextArticle={nextArticle ?? null}
      />
    </div>
  )
}
