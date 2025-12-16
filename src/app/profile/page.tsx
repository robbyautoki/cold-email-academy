'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  AlertTriangleIcon,
  BellIcon,
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
  SaveIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShieldIcon,
  TextSearchIcon,
  WrenchIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

import LogoSvg from '@/assets/svg/logo'
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import MenuSheet from '@/components/shadcn-studio/blocks/menu-sheet'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-sheet'

const industries = [
  'E-Commerce',
  'SaaS / Software',
  'Agentur / Beratung',
  'Coaching / Training',
  'Gesundheit / Fitness',
  'Immobilien',
  'Finanzen / Versicherung',
  'Handwerk / Produktion',
  'Gastronomie / Hotellerie',
  'Sonstiges',
]

const revenueRanges = [
  'Noch kein Umsatz',
  '0 - 10.000 EUR',
  '10.000 - 50.000 EUR',
  '50.000 - 100.000 EUR',
  '100.000 - 500.000 EUR',
  '500.000 - 1 Mio EUR',
  '1 Mio - 5 Mio EUR',
  'Mehr als 5 Mio EUR',
]

const referralSources = [
  'Google Suche',
  'YouTube',
  'Instagram',
  'TikTok',
  'LinkedIn',
  'Facebook',
  'Empfehlung / Freunde',
  'Podcast',
  'Werbung',
  'Sonstiges',
]

const ProfilePage = () => {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const isAdmin = user?.unsafeMetadata?.role === 'admin'

  const navigationData: NavigationSection[] = [
    {
      title: 'Dashboard',
      icon: <ChartColumnStackedIcon className='text-foreground size-4 shrink-0' />,
      href: '/dashboard'
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
        { title: 'Blacklist Prüfer', href: '/tools/blacklist-pruefer', icon: <AlertTriangleIcon className='text-foreground size-4 shrink-0' /> }
      ]
    },
    {
      title: 'Ressourcen',
      icon: <FolderOpenIcon className='text-foreground size-4 shrink-0' />,
      items: [
        { title: 'Templates', href: '#', icon: <FileTextIcon className='text-foreground size-4 shrink-0' /> },
        { title: 'Checklisten', href: '/checklisten', icon: <ListChecksIcon className='text-foreground size-4 shrink-0' /> }
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    industry: '',
    revenue: '',
    referralSource: '',
    linkedinUrl: '',
  })

  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.unsafeMetadata as Record<string, string>
      setFormData({
        firstName: (metadata?.firstName as string) || '',
        lastName: (metadata?.lastName as string) || '',
        companyName: (metadata?.companyName as string) || '',
        industry: (metadata?.industry as string) || '',
        revenue: (metadata?.revenue as string) || '',
        referralSource: (metadata?.referralSource as string) || '',
        linkedinUrl: (metadata?.linkedinUrl as string) || '',
      })
    }
  }, [isLoaded, user])

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    setSaveSuccess(false)

    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          ...formData,
        },
      })
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Fehler beim Speichern:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoaded) {
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
                <div className='flex items-center'>
                  <LogoSvg className='size-8.5' />
                  <span className='ml-2.5 hidden text-xl font-semibold sm:block'>Dashboard</span>
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
                      <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                      <AvatarFallback>JD</AvatarFallback>
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

      <main className='mx-auto size-full max-w-2xl flex-1 space-y-6 px-4 py-6 sm:px-6'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold'>Mein Profil</h1>
          <p className='text-muted-foreground text-sm'>Bearbeite deine Profildaten</p>
        </div>

        <Card>
          <CardHeader>
            <span className='text-lg font-semibold'>Persönliche Daten</span>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <div className='flex flex-col items-start gap-1'>
                <Label htmlFor='profile-firstname'>
                  Vorname <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='profile-firstname'
                  placeholder='Max'
                  value={formData.firstName}
                  onChange={e => updateFormData({ firstName: e.target.value })}
                  required
                />
              </div>
              <div className='flex flex-col items-start gap-1'>
                <Label htmlFor='profile-lastname'>
                  Nachname <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='profile-lastname'
                  placeholder='Mustermann'
                  value={formData.lastName}
                  onChange={e => updateFormData({ lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className='flex flex-col items-start gap-1'>
              <Label htmlFor='profile-company'>Unternehmensname</Label>
              <Input
                id='profile-company'
                placeholder='Meine Firma GmbH'
                value={formData.companyName}
                onChange={e => updateFormData({ companyName: e.target.value })}
              />
            </div>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <div className='flex flex-col items-start gap-1'>
                <Label htmlFor='profile-industry'>Branche</Label>
                <Select value={formData.industry} onValueChange={value => updateFormData({ industry: value })}>
                  <SelectTrigger id='profile-industry'>
                    <SelectValue placeholder='Branche auswählen' />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col items-start gap-1'>
                <Label htmlFor='profile-revenue'>Jahresumsatz</Label>
                <Select value={formData.revenue} onValueChange={value => updateFormData({ revenue: value })}>
                  <SelectTrigger id='profile-revenue'>
                    <SelectValue placeholder='Umsatz auswählen' />
                  </SelectTrigger>
                  <SelectContent>
                    {revenueRanges.map(range => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex flex-col items-start gap-1'>
              <Label htmlFor='profile-referral'>Wie hast du von uns erfahren?</Label>
              <Select value={formData.referralSource} onValueChange={value => updateFormData({ referralSource: value })}>
                <SelectTrigger id='profile-referral'>
                  <SelectValue placeholder='Quelle auswählen' />
                </SelectTrigger>
                <SelectContent>
                  {referralSources.map(source => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='flex flex-col items-start gap-1'>
              <Label htmlFor='profile-linkedin'>LinkedIn URL</Label>
              <Input
                id='profile-linkedin'
                type='url'
                placeholder='https://linkedin.com/in/dein-profil'
                value={formData.linkedinUrl}
                onChange={e => updateFormData({ linkedinUrl: e.target.value })}
              />
            </div>

            <div className='flex items-center justify-between pt-4'>
              <div>
                {saveSuccess && (
                  <span className='text-sm text-green-600'>Erfolgreich gespeichert!</span>
                )}
              </div>
              <Button onClick={handleSave} disabled={isSaving || !formData.firstName || !formData.lastName}>
                {isSaving ? (
                  <Loader2Icon className='size-4 animate-spin' />
                ) : (
                  <SaveIcon className='size-4' />
                )}
                Speichern
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer>
        <div className='mx-auto flex size-full max-w-7xl items-center justify-between gap-3 p-4 max-md:flex-col sm:px-6'>
          <p className='text-muted-foreground text-center text-sm text-balance'>
            {`©${new Date().getFullYear()}`}{' '}
            <a href='#' className='text-primary'>
              Shadcn/studio
            </a>
            , Made for better web design
          </p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profil</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </footer>
    </div>
  )
}

export default ProfilePage
