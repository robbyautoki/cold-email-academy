'use client'

import { useEffect, useState, type ReactNode } from 'react'

import {
  BookOpenIcon,
  CheckCircleIcon,
  FileTextIcon,
  Loader2Icon,
  LogInIcon,
  WrenchIcon,
  BellIcon
} from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

interface Activity {
  id: string
  userId: string
  userName: string
  userAvatar: string
  type: 'login' | 'course_started' | 'course_completed' | 'tool_used' | 'playbook_viewed' | 'checklist_completed' | 'notification_received'
  title: string
  description: string
  metadata?: Record<string, string>
  createdAt: number
}

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
}

const ActivityDialog = ({ defaultOpen = false, trigger }: Props) => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities')
        if (response.ok) {
          const data = await response.json()
          setActivities(data.activities)
        }
      } catch (err) {
        console.error('Fehler beim Laden der Aktivitäten:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
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

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'login':
        return <LogInIcon className='size-4 text-primary' />
      case 'course_started':
      case 'course_completed':
        return <BookOpenIcon className='size-4 text-primary' />
      case 'tool_used':
        return <WrenchIcon className='size-4 text-primary' />
      case 'playbook_viewed':
        return <FileTextIcon className='size-4 text-primary' />
      case 'checklist_completed':
        return <CheckCircleIcon className='size-4 text-primary' />
      case 'notification_received':
        return <BellIcon className='size-4 text-primary' />
      default:
        return <CheckCircleIcon className='size-4 text-primary' />
    }
  }

  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className='gap-0 sm:max-w-112 [&>button]:top-2.75 [&>button>svg]:size-5'>
        <SheetHeader className='border-b py-2.25'>
          <SheetTitle className='text-lg leading-6'>Aktivitäten</SheetTitle>
          <SheetDescription hidden />
        </SheetHeader>

        <div className='overflow-y-auto'>
          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <Loader2Icon className='size-6 animate-spin' />
            </div>
          ) : activities.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-2 py-12 text-center'>
              <div className='bg-muted flex size-12 items-center justify-center rounded-full'>
                <CheckCircleIcon className='text-muted-foreground size-6' />
              </div>
              <p className='text-muted-foreground'>Noch keine Aktivitäten</p>
              <p className='text-muted-foreground text-sm'>Deine Aktivitäten werden hier angezeigt</p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <div key={activity.id}>
                <div className='flex gap-4 px-4 py-3'>
                  <Avatar>
                    <AvatarImage src={activity.userAvatar} />
                    <AvatarFallback>{activity.userName[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className='flex w-full flex-col items-start gap-1'>
                    <div className='text-muted-foreground flex flex-col items-start text-sm'>
                      <p className='flex items-center gap-2'>
                        {getActivityIcon(activity.type)}
                        <span className='text-foreground font-semibold'>{activity.title}</span>
                      </p>
                      {activity.description && (
                        <p className='mt-0.5'>{activity.description}</p>
                      )}
                      <p className='mt-1'>{formatRelativeTime(activity.createdAt)}</p>
                    </div>
                  </div>
                </div>
                {index < activities.length - 1 && <Separator />}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ActivityDialog
