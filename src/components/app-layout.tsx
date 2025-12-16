'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

import AppHeader from '@/components/app-header'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push('/login')
        return
      }

      const onboardingCompleted = user.unsafeMetadata?.onboardingCompleted as boolean | undefined

      if (!onboardingCompleted) {
        router.push('/welcome')
      } else {
        setIsChecking(false)
      }
    }
  }, [isLoaded, user, router])

  if (!isLoaded || isChecking) {
    return (
      <div className='flex h-dvh items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2Icon className='size-8 animate-spin' />
          <p className='text-muted-foreground'>Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className='flex min-h-dvh flex-col'>
        <AppHeader />
        <main className='mx-auto size-full w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6 lg:px-8'>{children}</main>
        <footer className='border-t'>
        <div className='mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 lg:px-8'>
          <p className='text-muted-foreground text-center text-sm'>
            {`© ${new Date().getFullYear()}`}{' '}
            <a href='#' className='text-foreground hover:underline'>
              Cold Email Academy
            </a>
          </p>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/dashboard'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className='contents'>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </span>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
      </footer>
      </div>
    </TooltipProvider>
  )
}
