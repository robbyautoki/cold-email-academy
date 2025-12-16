'use client'

import Link from 'next/link'
import { ArrowRightIcon, TrendingUpIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { getCategoryInfo, type EmailTemplate } from '@/data/templates'

interface TemplateCardProps {
  template: EmailTemplate
  index?: number
}

export function TemplateCard({ template, index = 0 }: TemplateCardProps) {
  const categoryInfo = getCategoryInfo(template.category)

  return (
    <MotionPreset fade blur delay={0.1 + index * 0.03}>
      <Link href={`/templates/${template.slug}`} className="group block h-full">
        <Card className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700">
          <CardContent className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <Badge
                variant="secondary"
                className={`text-[10px] px-2 py-0.5 ${categoryInfo?.bgColor} ${categoryInfo?.color} border-0`}
              >
                {categoryInfo?.title}
              </Badge>
              {template.stats?.replyRate && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary">
                  <TrendingUpIcon className="size-3" />
                  {template.stats.replyRate}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-base mb-2 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors line-clamp-1">
              {template.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {template.description}
            </p>

            {/* Subject Lines Preview */}
            <div className="space-y-1.5 mb-4">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                Betreffzeilen
              </p>
              <div className="flex flex-wrap gap-1.5">
                {template.subjectLines.slice(0, 2).map((subject, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 truncate max-w-[140px]"
                  >
                    {subject}
                  </span>
                ))}
                {template.subjectLines.length > 2 && (
                  <span className="text-xs px-2 py-1 text-muted-foreground">
                    +{template.subjectLines.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="inline-flex items-center text-xs font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                Template ansehen
                <ArrowRightIcon className="size-3 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </MotionPreset>
  )
}
