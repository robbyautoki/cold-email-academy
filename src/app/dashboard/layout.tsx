'use client'

import AppLayout from '@/components/app-layout'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout breadcrumbs={[{ label: 'Dashboard' }]}>
      {children}
    </AppLayout>
  )
}
