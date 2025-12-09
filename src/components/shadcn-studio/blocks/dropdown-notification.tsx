'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { SettingsIcon, XIcon, LinkIcon, Loader2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'

interface Notification {
  id: string
  title: string
  message: string
  link?: string
  linkText?: string
  type: 'info' | 'update' | 'announcement'
  adminId: string
  adminName: string
  adminAvatar: string
  createdAt: number
}

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const NotificationDropdown = ({ trigger, defaultOpen, align = 'end' }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/admin/notifications')
        if (response.ok) {
          const data = await response.json()
          setNotifications(data.notifications)
        }
      } catch (err) {
        console.error('Fehler beim Laden der Notifications:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Gerade eben'
    if (minutes < 60) return `vor ${minutes} Min.`
    if (hours < 24) return `vor ${hours} Std.`
    return `vor ${days} Tagen`
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'update': return 'Update'
      case 'announcement': return 'Ankündigung'
      default: return 'Info'
    }
  }

  const announcementNotifs = notifications.filter(n => n.type === 'announcement')
  const otherNotifs = notifications.filter(n => n.type !== 'announcement')

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-xs sm:max-w-122' align={align || 'end'}>
        <Tabs defaultValue='inbox' className='gap-0'>
          <DropdownMenuLabel className='flex flex-col pb-0'>
            <div className='flex items-center justify-between gap-6 pb-2.5'>
              <span className='text-muted-foreground text-base font-normal uppercase'>Benachrichtigungen</span>
              {notifications.length > 0 && (
                <Badge variant='secondary' className='bg-primary/10 text-primary font-normal'>
                  {notifications.length} Neu
                </Badge>
              )}
            </div>
            <div className='-mb-0.5 flex items-center justify-between gap-4'>
              <TabsList className='relative h-fit rounded-none bg-transparent p-0'>
                <TabsTrigger
                  value='inbox'
                  className='data-[state=active]:!border-b-primary rounded-none border-b-2 border-b-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent'
                >
                  Allgemein
                </TabsTrigger>
                <TabsTrigger
                  value='announcements'
                  className='data-[state=active]:!border-b-primary rounded-none border-b-2 border-b-transparent font-normal data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent'
                >
                  Ankündigungen
                </TabsTrigger>
              </TabsList>
              <SettingsIcon className='size-5' />
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className='mt-0 h-0.5' />

          <TabsContent value='inbox'>
            {isLoading ? (
              <div className='flex items-center justify-center py-8'>
                <Loader2Icon className='size-5 animate-spin' />
              </div>
            ) : otherNotifs.length === 0 ? (
              <div className='text-muted-foreground py-8 text-center text-sm'>
                Keine neuen Benachrichtigungen
              </div>
            ) : (
              otherNotifs.slice(0, 5).map((notif, index) => (
                <div key={notif.id}>
                  <DropdownMenuItem className='items-start gap-3 px-2 py-3 text-base'>
                    <Avatar className='size-9.5'>
                      <AvatarImage src={notif.adminAvatar} />
                      <AvatarFallback>{notif.adminName[0]}</AvatarFallback>
                    </Avatar>
                    <div className='flex w-full flex-col items-start'>
                      <span className='text-base font-medium'>{notif.title}</span>
                      <p className='text-muted-foreground text-sm line-clamp-2'>{notif.message}</p>
                      <div className='mt-1 flex items-center gap-2.5'>
                        <span className='text-muted-foreground text-sm'>{formatRelativeTime(notif.createdAt)}</span>
                        <div className='bg-muted size-1.5 rounded-full' />
                        <span className='text-muted-foreground text-sm'>{getTypeLabel(notif.type)}</span>
                      </div>
                      {notif.link && (
                        <div className='mt-2 flex items-center gap-1.5'>
                          <LinkIcon className='text-foreground size-3.5' />
                          <a href={notif.link} className='text-primary text-sm hover:underline'>
                            {notif.linkText || 'Mehr erfahren'}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                      <XIcon className='text-foreground size-3.5' />
                      <div className='bg-primary size-1.5 rounded-full' />
                    </div>
                  </DropdownMenuItem>
                  {index < otherNotifs.slice(0, 5).length - 1 && <DropdownMenuSeparator />}
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value='announcements'>
            {isLoading ? (
              <div className='flex items-center justify-center py-8'>
                <Loader2Icon className='size-5 animate-spin' />
              </div>
            ) : announcementNotifs.length === 0 ? (
              <div className='text-muted-foreground py-8 text-center text-sm'>
                Keine Ankündigungen
              </div>
            ) : (
              announcementNotifs.slice(0, 5).map((notif, index) => (
                <div key={notif.id}>
                  <DropdownMenuItem className='items-start gap-3 px-2 py-3 text-base'>
                    <Avatar className='size-9.5'>
                      <AvatarImage src={notif.adminAvatar} />
                      <AvatarFallback>{notif.adminName[0]}</AvatarFallback>
                    </Avatar>
                    <div className='flex w-full flex-col items-start'>
                      <span className='text-base font-medium'>{notif.title}</span>
                      <p className='text-muted-foreground text-sm line-clamp-2'>{notif.message}</p>
                      <div className='mt-1 flex items-center gap-2.5'>
                        <span className='text-muted-foreground text-sm'>{formatRelativeTime(notif.createdAt)}</span>
                        <div className='bg-muted size-1.5 rounded-full' />
                        <span className='text-muted-foreground text-sm'>Ankündigung</span>
                      </div>
                      {notif.link && (
                        <div className='mt-2 flex items-center gap-1.5'>
                          <LinkIcon className='text-foreground size-3.5' />
                          <a href={notif.link} className='text-primary text-sm hover:underline'>
                            {notif.linkText || 'Mehr erfahren'}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                      <XIcon className='text-foreground size-3.5' />
                      <div className='bg-primary size-1.5 rounded-full' />
                    </div>
                  </DropdownMenuItem>
                  {index < announcementNotifs.slice(0, 5).length - 1 && <DropdownMenuSeparator />}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationDropdown
