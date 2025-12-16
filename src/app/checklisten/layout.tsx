'use client'

import AppLayout from '@/components/app-layout'

export default function ChecklistenLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout breadcrumbs={[{ label: 'Ressourcen', href: '#' }, { label: 'Checklisten' }]}>
      {children}
    </AppLayout>
  )
}
