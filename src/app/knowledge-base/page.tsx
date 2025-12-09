'use client'

import { knowledgeBaseCategories } from '@/data/knowledgeBase'

import { KBHero } from '@/components/knowledge-base/kb-hero'
import { KBCategoryCard } from '@/components/knowledge-base/kb-category-card'
import { KBStats } from '@/components/knowledge-base/kb-stats'

export default function KnowledgeBasePage() {
  const totalArticles = knowledgeBaseCategories.reduce((acc, cat) => acc + cat.articleCount, 0)
  const totalCategories = knowledgeBaseCategories.length

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <KBHero
        totalArticles={totalArticles}
        totalCategories={totalCategories}
      />

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {knowledgeBaseCategories.map((category, index) => (
          <KBCategoryCard
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>

      {/* Stats Section */}
      <KBStats
        totalArticles={totalArticles}
        totalCategories={totalCategories}
      />
    </div>
  )
}
