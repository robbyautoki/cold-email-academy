'use client'

import { useState, useMemo } from 'react'
import { FileTextIcon, SparklesIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { TemplateCard, TemplateFilter } from '@/components/templates'
import { templates, templateCategories, type TemplateCategory } from '@/data/templates'

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all')

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return templates
    return templates.filter(t => t.category === activeCategory)
  }, [activeCategory])

  const counts = useMemo(() => {
    const result: Record<TemplateCategory | 'all', number> = {
      all: templates.length,
      'erstkontakt': 0,
      'follow-up': 0,
      'meeting-request': 0,
      'spezial': 0
    }
    templates.forEach(t => {
      result[t.category]++
    })
    return result
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <MotionPreset fade blur>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
              <FileTextIcon className="size-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">Email Templates</h1>
                <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
                  <SparklesIcon className="size-3 mr-1" />
                  Neu
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {templates.length}+ Copy-Paste-fertige Email-Vorlagen für jeden Anwendungsfall
              </p>
            </div>
          </div>
        </div>
      </MotionPreset>

      {/* Category Descriptions */}
      <MotionPreset fade blur delay={0.05}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {templateCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${
                activeCategory === category.id
                  ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold ${category.color}`}>
                  {category.title}
                </span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {counts[category.id]}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {category.description}
              </p>
            </button>
          ))}
        </div>
      </MotionPreset>

      {/* Filter */}
      <TemplateFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        counts={counts}
      />

      {/* Templates Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template, index) => (
          <TemplateCard key={template.id} template={template} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Keine Templates in dieser Kategorie gefunden.</p>
        </div>
      )}
    </div>
  )
}
