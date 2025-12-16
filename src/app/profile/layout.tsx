'use client'

import AppLayout from '@/components/app-layout'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout breadcrumbs={[{ label: 'Mein Profil' }]}>
      {children}
    </AppLayout>
  )
}
