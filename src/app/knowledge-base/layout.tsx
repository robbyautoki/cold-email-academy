'use client'

import AppLayout from '@/components/app-layout'

export default function KnowledgeBaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout breadcrumbs={[{ label: 'Knowledge Base' }]}>
      {children}
    </AppLayout>
  )
}
