'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'

import { TemplatePreview } from '@/components/templates'
import { getTemplateBySlug } from '@/data/templates'

interface TemplateDetailPageProps {
  params: Promise<{ slug: string }>
}

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { slug } = use(params)
  const template = getTemplateBySlug(slug)

  if (!template) {
    notFound()
  }

  return <TemplatePreview template={template} />
}
