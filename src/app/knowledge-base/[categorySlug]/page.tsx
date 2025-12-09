'use client'

import { useState, useMemo } from 'react'
import { useParams, notFound } from 'next/navigation'

import { getCategoryBySlug } from '@/data/knowledgeBase'

import { KBCategoryHero } from '@/components/knowledge-base/kb-category-hero'
import { KBArticleCard, KBEmptyState } from '@/components/knowledge-base/kb-article-card'

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.categorySlug as string

  const category = getCategoryBySlug(categorySlug)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const filteredArticles = useMemo(() => {
    if (!category) return []

    return category.articles.filter((article) => {
      const matchesSearch =
        searchQuery.length < 2 ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDifficulty =
        !selectedDifficulty || article.difficulty === selectedDifficulty

      return matchesSearch && matchesDifficulty
    })
  }, [category, searchQuery, selectedDifficulty])

  if (!category) {
    notFound()
  }

  const handleReset = () => {
    setSearchQuery('')
    setSelectedDifficulty(null)
  }

  return (
    <div className="space-y-6">
      {/* Hero with Search & Filters */}
      <KBCategoryHero
        category={category}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        filteredCount={filteredArticles.length}
      />

      {/* Articles List */}
      {filteredArticles.length > 0 ? (
        <div className="space-y-4">
          {filteredArticles.map((article, index) => (
            <KBArticleCard
              key={article.id}
              article={article}
              categorySlug={category.slug}
              index={index}
            />
          ))}
        </div>
      ) : (
        <KBEmptyState onReset={handleReset} />
      )}
    </div>
  )
}
