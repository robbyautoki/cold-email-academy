'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'
import {
  AlertTriangleIcon,
  BellIcon,
  BookOpenIcon,
  CalculatorIcon,
  ChartColumnStackedIcon,
  FileTextIcon,
  FolderOpenIcon,
  GlobeIcon,
  GraduationCapIcon,
  LanguagesIcon,
  ListChecksIcon,
  Loader2Icon,
  MailCheckIcon,
  MenuIcon,
  PenToolIcon,
  PlusIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShieldIcon,
  TextSearchIcon,
  WrenchIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

import Image from 'next/image'
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import MenuSheet from '@/components/shadcn-studio/blocks/menu-sheet'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-sheet'

export default function KnowledgeBaseLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  const isAdmin = user?.unsafeMetadata?.role === 'admin'

  const navigationData: NavigationSection[] = [
    {
      title: 'Dashboard',
      icon: <ChartColumnStackedIcon className='text-foreground size-4 shrink-0' />,
      href: '/dashboard'
    },
    {
      title: 'Kurse',
      icon: <GraduationCapIcon className='text-foreground size-4 shrink-0' />,
      href: '/kurse'
    },
    {
      title: 'Knowledge Base',
      icon: <BookOpenIcon className='text-foreground size-4 shrink-0' />,
      href: '/knowledge-base'
    },
    {
      title: 'Tools',
      icon: <WrenchIcon className='text-foreground size-4 shrink-0' />,
      items: [
        { title: 'SPF Generator', href: '/tools/spf-generator', icon: <ShieldCheckIcon className='text-foreground size-4 shrink-0' /> },
        { title: 'Email Signatur', href: '/tools/email-signatur', icon: <PenToolIcon className='text-foreground size-4 shrink-0' /> },
        { title: 'MX Record Check', href: '/tools/mx-record-check', icon: <ServerIcon className='text-foreground size-4 shrink-0' /> },
        { title: 'Email Verifizierung', href: '/tools/email-verifizierung', icon: <MailCheckIcon className='text-foreground size-4 shrink-0' /> },
        { title: 'DNS Checker', href: '/tools/dns-checker', icon: <GlobeIcon className='text-foreground size-4 shrink-0' /> },
        { title: 'Email Kalkulator', href: '/tools/email-kalkulator', icon: <CalculatorIcon className='text-foreground size-4 shrink-0' /> },
        { title: 'Blacklist Pruefer', href: '/tools/blacklist-pruefer', icon: <AlertTriangleIcon className='text-foreground size-4 shrink-0' /> }
      ]
    },
    {
      title: 'Ressourcen',
      icon: <FolderOpenIcon className='text-foreground size-4 shrink-0' />,
      items: [
        { title: 'Templates', href: '#', icon: <FileTextIcon className='text-foreground size-4 shrink-0' /> },
        { title: 'Checklisten', href: '#', icon: <ListChecksIcon className='text-foreground size-4 shrink-0' /> }
      ]
    },
    {
      title: 'Suche',
      icon: <TextSearchIcon className='text-foreground size-4 shrink-0' />,
      href: '#'
    },
    ...(isAdmin ? [{
      title: 'Admin',
      icon: <ShieldIcon className='text-foreground size-4 shrink-0' />,
      href: '/admin'
    }] : [])
  ]

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
    <div className='flex min-h-dvh flex-col'>
      <header className='bg-card sticky top-0 z-50 border-b'>
        <div className='border-b'>
          <div className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6'>
            <div className='flex items-center gap-4'>
              <MenuSheet
                logoName='Dashboard'
                navigationData={navigationData}
                trigger={
                  <Button variant='outline' size='icon' className='inline-flex md:hidden'>
                    <MenuIcon />
                    <span className='sr-only'>Menu</span>
                  </Button>
                }
              />
              <a href='/dashboard'>
                <div className='flex items-center gap-2.5'>
                  <Image src='/logo-new.svg' alt='Academy' width={34} height={34} className='rounded-lg' />
                  <div className='hidden sm:flex sm:flex-col'>
                    <span className='text-base font-semibold leading-tight'>Academy</span>
                    <span className='text-muted-foreground text-xs'>auto.ki</span>
                  </div>
                </div>
              </a>
            </div>
            <SearchDialog
              className='hidden md:block'
              trigger={
                <Button variant='ghost' className='p-0 font-normal'>
                  <div className='text-muted-foreground flex min-w-55 items-center gap-1.5 rounded-md border px-3 py-2 text-sm'>
                    <SearchIcon />
                    <span>Type to search...</span>
                  </div>
                </Button>
              }
            />
            <div className='flex items-center gap-1.5'>
              <SearchDialog
                className='md:hidden'
                trigger={
                  <Button variant='ghost' size='icon'>
                    <SearchIcon />
                    <span className='sr-only'>Search</span>
                  </Button>
                }
              />
              <LanguageDropdown
                trigger={
                  <Button variant='ghost' size='icon'>
                    <LanguagesIcon />
                  </Button>
                }
              />
              <NotificationDropdown
                trigger={
                  <Button variant='ghost' size='icon' className='relative'>
                    <BellIcon />
                    <span className='bg-destructive absolute top-2 right-2.5 size-2 rounded-full' />
                  </Button>
                }
              />
              <ProfileDropdown
                trigger={
                  <Button variant='ghost' className='h-full p-0'>
                    <Avatar className='size-9.5 rounded-md'>
                      <AvatarImage src={user?.imageUrl || 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'} />
                      <AvatarFallback>{user?.firstName?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
            </div>
          </div>
        </div>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-1.5 sm:px-6'>
          <NavigationMenu viewport={false} className='hidden md:block'>
            <NavigationMenuList className='flex-wrap justify-start'>
              {navigationData.map(navItem => {
                if (navItem.href) {
                  return (
                    <NavigationMenuItem key={navItem.title}>
                      <NavigationMenuLink
                        href={navItem.href}
                        className={cn(navigationMenuTriggerStyle(), 'flex flex-row items-center gap-1.5')}
                      >
                        {navItem.icon}
                        {navItem.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                }

                return (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuTrigger className='gap-1.5'>
                      {navItem.icon}
                      {navItem.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
                      <ul className='grid w-42 gap-4'>
                        <li>
                          {navItem.items?.map(item => (
                            <NavigationMenuLink
                              key={item.title}
                              href={item.href}
                              className='flex flex-row items-center gap-1.5'
                            >
                              {item.icon}
                              {item.title}
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <Button>
            Invite Members
            <PlusIcon />
          </Button>
        </div>
      </header>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        {children}
      </main>
      <footer>
        <div className='mx-auto flex size-full max-w-7xl items-center justify-between gap-3 p-4 max-md:flex-col sm:px-6'>
          <p className='text-muted-foreground text-center text-sm text-balance'>
            {`©${new Date().getFullYear()}`}{' '}
            <a href='#' className='text-primary'>
              Cold Email Academy
            </a>
          </p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/dashboard'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Knowledge Base</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </footer>
    </div>
  )
}
