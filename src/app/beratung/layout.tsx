'use client'

import AppLayout from '@/components/app-layout'

export default function BeratungLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout breadcrumbs={[{ label: 'Ressourcen', href: '#' }, { label: 'Discovery Call' }]}>
      {children}
    </AppLayout>
  )
}
