'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  BookOpenIcon,
  ServerIcon,
  ShieldCheckIcon,
  SearchIcon,
  PenToolIcon,
  WrenchIcon,
  ScaleIcon,
  ChartBarIcon,
  TrendingUpIcon,
  HelpCircleIcon,
  FileTextIcon,
  ArrowRightIcon
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import type { KBCategory } from '@/data/knowledgeBase'

interface KBCategoryCardProps {
  category: KBCategory
  index: number
}

const iconMap: Record<string, React.ElementType> = {
  BookOpenIcon,
  ServerIcon,
  ShieldCheckIcon,
  SearchIcon,
  PenToolIcon,
  WrenchIcon,
  ScaleIcon,
  ChartBarIcon,
  TrendingUpIcon,
  HelpCircleIcon
}

// Unified grayscale gradients for all categories
const defaultGradient = {
  gradient: 'from-zinc-500/10 via-neutral-500/5 to-transparent',
  iconBg: 'from-zinc-700 to-zinc-800'
}

const categoryGradients: Record<string, { gradient: string; iconBg: string }> = {
  'grundlagen-strategie': defaultGradient,
  'technische-infrastruktur': defaultGradient,
  'zustellbarkeit-reputation': defaultGradient,
  'lead-research-targeting': defaultGradient,
  'copywriting-messaging': defaultGradient,
  'tools-automatisierung': defaultGradient,
  'rechtliches-compliance': defaultGradient,
  'metriken-optimierung': defaultGradient,
  'skalierung-prozesse': defaultGradient,
  'troubleshooting-faq': defaultGradient
}

export function KBCategoryCard({ category, index }: KBCategoryCardProps) {
  const IconComponent = iconMap[category.icon] || BookOpenIcon
  const colors = categoryGradients[category.slug] || categoryGradients['grundlagen-strategie']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/knowledge-base/${category.slug}`}>
        <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />

          <CardHeader className="relative">
            <div className="flex items-start justify-between">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors.iconBg} shadow-lg`}
              >
                <IconComponent className="size-6 text-white" />
              </motion.div>
              <Badge variant="secondary" className="text-xs font-medium">
                {category.articleCount} Artikel
              </Badge>
            </div>
            <CardTitle className="mt-4 transition-colors group-hover:text-primary">
              {category.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {category.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative">
            <div className="space-y-2">
              {category.articles.slice(0, 3).map((article, articleIndex) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + articleIndex * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {articleIndex + 1}
                  </div>
                  <span className="truncate">{article.title}</span>
                </motion.div>
              ))}
              {category.articles.length > 3 && (
                <div className="flex items-center gap-1.5 pt-2 text-sm text-primary font-medium">
                  <span>+{category.articles.length - 3} weitere</span>
                  <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
