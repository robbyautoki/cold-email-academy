'use client'

import AppLayout from '@/components/app-layout'

export default function KurseLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout breadcrumbs={[{ label: 'Kurse' }]}>
      {children}
    </AppLayout>
  )
}
