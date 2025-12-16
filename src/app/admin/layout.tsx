'use client'

import AppLayout from '@/components/app-layout'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout breadcrumbs={[{ label: 'Admin' }]}>
      {children}
    </AppLayout>
  )
}
