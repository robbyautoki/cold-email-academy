'use client'

import Link from 'next/link'
import {
  MailIcon,
  ShieldCheckIcon,
  RepeatIcon,
  ArrowRightIcon,
  ListChecksIcon
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { checklists } from '@/data/checklists'

const iconMap: Record<string, React.ReactNode> = {
  mail: <MailIcon className='size-6' />,
  shield: <ShieldCheckIcon className='size-6' />,
  repeat: <RepeatIcon className='size-6' />
}

export default function ChecklistenPage() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3'>
          <div className='bg-primary/10 text-primary rounded-lg p-2'>
            <ListChecksIcon className='size-6' />
          </div>
          <h1 className='text-3xl font-bold'>Email Outreach Checklisten</h1>
        </div>
        <p className='text-muted-foreground'>
          Nutze diese Checklisten um sicherzustellen, dass deine Email Kampagnen erfolgreich sind.
          Klicke auf eine Checkliste um sie zu öffnen und abzuhaken.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {checklists.map(checklist => (
          <Link key={checklist.slug} href={`/checklisten/${checklist.slug}`}>
            <Card className='group h-full cursor-pointer transition-all hover:border-primary/50 hover:shadow-md'>
              <CardHeader className='pb-4'>
                <div className='flex items-start justify-between'>
                  <div className='bg-primary/10 text-primary rounded-lg p-2.5'>
                    {iconMap[checklist.icon]}
                  </div>
                  <Badge variant='secondary' className='text-xs'>
                    {checklist.items.length} Items
                  </Badge>
                </div>
                <CardTitle className='mt-4 flex items-center gap-2'>
                  {checklist.title}
                  <ArrowRightIcon className='size-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100' />
                </CardTitle>
                <CardDescription className='line-clamp-2'>
                  {checklist.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-muted-foreground text-sm'>
                  <ul className='space-y-1'>
                    {checklist.items.slice(0, 3).map(item => (
                      <li key={item.id} className='flex items-center gap-2'>
                        <span className='bg-muted size-1.5 rounded-full' />
                        <span className='truncate'>{item.label}</span>
                      </li>
                    ))}
                    {checklist.items.length > 3 && (
                      <li className='text-primary text-xs font-medium'>
                        + {checklist.items.length - 3} weitere Items
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
