'use client'

import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  AlertTriangleIcon,
  BellIcon,
  BookMarkedIcon,
  BookOpenIcon,
  CalculatorIcon,
  CalendarIcon,
  ChartColumnStackedIcon,
  FileTextIcon,
  FolderOpenIcon,
  GlobeIcon,
  GraduationCapIcon,
  InboxIcon,
  ListChecksIcon,
  MailCheckIcon,
  MenuIcon,
  PenToolIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShieldIcon,
  WrenchIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import ActivityDialog from '@/components/shadcn-studio/blocks/dialog-activity'
import MenuSheet from '@/components/shadcn-studio/blocks/menu-sheet'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-sheet'

const navLinks = [
  { title: 'Dashboard', href: '/dashboard', icon: ChartColumnStackedIcon },
  // AUSGEBLENDET: Kurse - später wieder aktivieren
  // { title: 'Kurse', href: '/kurse', icon: GraduationCapIcon },
  { title: 'Playbooks', href: '/playbooks', icon: BookMarkedIcon, badge: 'Neu' },
  // AUSGEBLENDET: Templates - später wieder aktivieren
  // { title: 'Templates', href: '/templates', icon: FileTextIcon, badge: 'Neu' }
]

// Tools kategorisiert für Mega-Dropdown
const toolsCategories = [
  {
    title: 'Email Tools',
    items: [
      {
        title: 'Email Signatur',
        href: '/tools/email-signatur',
        icon: PenToolIcon,
        description: 'Professionelle Signaturen erstellen'
      },
      {
        title: 'Email Verifizierung',
        href: '/tools/email-verifizierung',
        icon: MailCheckIcon,
        description: 'E-Mail Adressen validieren'
      },
      {
        title: 'Email Kalkulator',
        href: '/tools/email-kalkulator',
        icon: CalculatorIcon,
        description: 'Cold Email ROI berechnen'
      }
    ]
  },
  {
    title: 'DNS & Sicherheit',
    items: [
      {
        title: 'SPF Generator',
        href: '/tools/spf-generator',
        icon: ShieldCheckIcon,
        description: 'SPF Records generieren'
      },
      {
        title: 'DNS Checker',
        href: '/tools/dns-checker',
        icon: GlobeIcon,
        description: 'DNS Einträge analysieren'
      },
      {
        title: 'MX Record Check',
        href: '/tools/mx-record-check',
        icon: ServerIcon,
        description: 'Mail-Server überprüfen'
      },
      {
        title: 'Blacklist Prüfer',
        href: '/tools/blacklist-pruefer',
        icon: AlertTriangleIcon,
        description: 'Blacklist Status prüfen'
      }
    ]
  }
]

const resourceItems = [
  {
    title: 'Knowledge Base',
    href: '/knowledge-base',
    icon: BookOpenIcon,
    description: 'Tiefes Wissen & Artikel'
  },
  {
    title: 'Checklisten',
    href: '/checklisten',
    icon: ListChecksIcon,
    description: 'Schritt-für-Schritt Anleitungen'
  },
  {
    title: 'Discovery Call',
    href: '/beratung',
    icon: CalendarIcon,
    description: 'Kostenloses Kennenlerngespräch'
  }
]

// Flat tools list für mobile Menu
const toolsItemsFlat = toolsCategories.flatMap(cat => cat.items)

export default function AppHeader() {
  const { user } = useUser()
  const pathname = usePathname()

  const isAdmin = user?.unsafeMetadata?.role === 'admin'

  // Navigation data for mobile menu
  const navigationData: NavigationSection[] = [
    {
      title: 'Dashboard',
      icon: <ChartColumnStackedIcon className='text-foreground size-4 shrink-0' />,
      href: '/dashboard'
    },
    // AUSGEBLENDET: Kurse - später wieder aktivieren
    // {
    //   title: 'Kurse',
    //   icon: <GraduationCapIcon className='text-foreground size-4 shrink-0' />,
    //   href: '/kurse'
    // },
    {
      title: 'Playbooks',
      icon: <BookMarkedIcon className='text-foreground size-4 shrink-0' />,
      href: '/playbooks'
    },
    // AUSGEBLENDET: Templates - später wieder aktivieren
    // {
    //   title: 'Templates',
    //   icon: <FileTextIcon className='text-foreground size-4 shrink-0' />,
    //   href: '/templates'
    // },
    {
      title: 'Tools',
      icon: <WrenchIcon className='text-foreground size-4 shrink-0' />,
      items: toolsItemsFlat.map(item => ({
        title: item.title,
        href: item.href,
        icon: <item.icon className='text-foreground size-4 shrink-0' />
      }))
    },
    {
      title: 'Ressourcen',
      icon: <FolderOpenIcon className='text-foreground size-4 shrink-0' />,
      items: resourceItems.map(item => ({
        title: item.title,
        href: item.href,
        icon: <item.icon className='text-foreground size-4 shrink-0' />
      }))
    },
    ...(isAdmin
      ? [{ title: 'Admin', icon: <ShieldIcon className='text-foreground size-4 shrink-0' />, href: '/admin' }]
      : [])
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur'>
      <div className='mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Left: Logo + Mobile Menu */}
        <div className='flex items-center gap-3'>
          <MenuSheet
            logoName='Academy'
            navigationData={navigationData}
            trigger={
              <Button variant='ghost' size='icon' className='md:hidden'>
                <MenuIcon className='size-5' />
                <span className='sr-only'>Menu</span>
              </Button>
            }
          />
          <a href='/dashboard' className='flex items-center gap-2.5'>
            <Image src='/logo-new.svg' alt='Academy' width={32} height={32} className='rounded-lg' />
            <span className='text-foreground hidden text-lg font-semibold sm:block'>Academy</span>
          </a>
        </div>

        {/* Center: Navigation (Desktop) */}
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList className='gap-1'>
            {/* Regular nav links */}
            {navLinks.map(link => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  className={cn(
                    'text-muted-foreground hover:text-foreground hover:bg-accent flex flex-row items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive(link.href) && 'text-foreground bg-accent'
                  )}
                >
                  <link.icon className='size-4' />
                  {link.title}
                  {link.badge && (
                    <Badge
                      variant='secondary'
                      className='bg-primary/10 text-primary ml-0.5 h-5 px-1.5 text-[10px] font-medium'
                    >
                      {link.badge}
                    </Badge>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Tools Dropdown - Opens on Hover */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  'text-muted-foreground hover:text-foreground bg-transparent px-3 py-2 text-sm font-medium',
                  pathname.startsWith('/tools') && 'text-foreground bg-accent'
                )}
              >
                <WrenchIcon className='mr-1.5 size-4' />
                Tools
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid w-[480px] grid-cols-2 gap-0 p-0'>
                  {toolsCategories.map((category, idx) => (
                    <div key={category.title} className={cn('p-3', idx === 1 && 'border-l')}>
                      <h4 className='text-muted-foreground mb-2 px-2 text-xs font-semibold uppercase tracking-wide'>
                        {category.title}
                      </h4>
                      <div className='space-y-0.5'>
                        {category.items.map(item => (
                          <NavigationMenuLink key={item.href} asChild>
                            <a
                              href={item.href}
                              className='hover:bg-accent flex items-start gap-3 rounded-md p-2 transition-colors'
                            >
                              <div className='bg-muted flex size-8 shrink-0 items-center justify-center rounded-md border'>
                                <item.icon className='text-muted-foreground size-4' />
                              </div>
                              <div className='min-w-0 flex-1'>
                                <div className='text-foreground text-sm font-medium'>{item.title}</div>
                                <div className='text-muted-foreground truncate text-xs'>{item.description}</div>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Ressourcen Dropdown - Opens on Hover */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  'text-muted-foreground hover:text-foreground bg-transparent px-3 py-2 text-sm font-medium',
                  (pathname.startsWith('/knowledge-base') || pathname.startsWith('/checklisten') || pathname.startsWith('/beratung')) &&
                    'text-foreground bg-accent'
                )}
              >
                <FolderOpenIcon className='mr-1.5 size-4' />
                Ressourcen
              </NavigationMenuTrigger>
              <NavigationMenuContent className='!left-auto !right-0'>
                <div className='w-64 p-2'>
                  {resourceItems.map(item => (
                    <NavigationMenuLink key={item.href} asChild>
                      <a
                        href={item.href}
                        className='hover:bg-accent flex items-start gap-3 rounded-md p-2 transition-colors'
                      >
                        <div className='bg-muted flex size-8 shrink-0 items-center justify-center rounded-md border'>
                          <item.icon className='text-muted-foreground size-4' />
                        </div>
                        <div className='flex-1'>
                          <div className='text-foreground text-sm font-medium'>{item.title}</div>
                          <div className='text-muted-foreground text-xs'>{item.description}</div>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Admin Link */}
            {isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/admin'
                  className={cn(
                    'text-muted-foreground hover:text-foreground hover:bg-accent flex flex-row items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    pathname.startsWith('/admin') && 'text-foreground bg-accent'
                  )}
                >
                  <ShieldIcon className='size-4' />
                  Admin
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right: Actions */}
        <div className='flex items-center gap-1'>
          {/* Search with Keyboard Shortcut */}
          <SearchDialog
            trigger={
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-muted-foreground hover:text-foreground gap-2 transition-transform hover:scale-105'
                  >
                    <SearchIcon className='size-4' />
                    <kbd className='bg-muted hidden rounded border px-1.5 py-0.5 text-[10px] font-medium sm:inline-block'>
                      ⌘K
                    </kbd>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Suche (⌘K)</TooltipContent>
              </Tooltip>
            }
          />

          {/* Activity / Inbox */}
          <ActivityDialog
            trigger={
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-foreground relative transition-transform hover:scale-105'
              >
                <InboxIcon className='size-5' />
                <span className='absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white'>
                  3
                </span>
                <span className='sr-only'>Aktivitäten</span>
              </Button>
            }
          />

          {/* Notifications */}
          <NotificationDropdown
            trigger={
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-foreground relative transition-transform hover:scale-105'
              >
                <BellIcon className='size-5' />
                <span className='bg-destructive absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-medium text-white'>
                  2
                </span>
                <span className='sr-only'>Benachrichtigungen</span>
              </Button>
            }
          />

          {/* Profile */}
          <ProfileDropdown
            trigger={
              <Button
                variant='ghost'
                size='icon'
                className='ml-1 transition-transform hover:scale-105'
              >
                <Avatar className='size-8'>
                  {user?.imageUrl && <AvatarImage src={user.imageUrl} />}
                  <AvatarFallback className='text-xs'>{user?.firstName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  )
}
