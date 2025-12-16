'use client'

import { FileTextIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { templateCategories, type TemplateCategory } from '@/data/templates'

interface TemplateFilterProps {
  activeCategory: TemplateCategory | 'all'
  onCategoryChange: (category: TemplateCategory | 'all') => void
  counts: Record<TemplateCategory | 'all', number>
}

export function TemplateFilter({ activeCategory, onCategoryChange, counts }: TemplateFilterProps) {
  return (
    <MotionPreset fade blur delay={0.05}>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('all')}
          className="gap-1.5"
        >
          <FileTextIcon className="size-4" />
          Alle
          <Badge
            variant="secondary"
            className={`ml-1 h-5 px-1.5 text-[10px] ${
              activeCategory === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800'
            }`}
          >
            {counts.all}
          </Badge>
        </Button>

        {templateCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="gap-1.5"
          >
            {category.title}
            <Badge
              variant="secondary"
              className={`ml-1 h-5 px-1.5 text-[10px] ${
                activeCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800'
              }`}
            >
              {counts[category.id]}
            </Badge>
          </Button>
        ))}
      </div>
    </MotionPreset>
  )
}
