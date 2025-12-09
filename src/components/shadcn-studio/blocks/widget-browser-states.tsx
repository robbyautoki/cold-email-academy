import { EllipsisVerticalIcon, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CircularProgress } from '@/components/ui/circular-progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'

const listItems = ['Teilen', 'Aktualisieren', 'Neu laden']

type Props = {
  title: string
  subTitle: string
  toolData: {
    icon: LucideIcon
    name: string
    percentage: number
  }[]
  className?: string
}

const ToolReleaseCard = ({ title, subTitle, toolData, className }: Props) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='text-lg font-semibold'>{title}</span>
          <span className='text-muted-foreground text-sm'>{subTitle}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='text-muted-foreground size-6 rounded-full'>
              <EllipsisVerticalIcon />
              <span className='sr-only'>Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuGroup>
              {listItems.map((item, index) => (
                <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col justify-between gap-4'>
        {toolData.map((tool, index) => {
          const IconComponent = tool.icon
          return (
            <div key={index} className='flex items-center justify-between gap-2'>
              <div className='flex items-center justify-between gap-4'>
                <div className='bg-primary/10 flex size-8 items-center justify-center rounded-md'>
                  <IconComponent className='text-primary size-5' />
                </div>
                <span className='font-medium'>{tool.name}</span>
              </div>
              <div className='flex items-center justify-between gap-4 text-sm'>
                <span className='text-sm'>{tool.percentage}%</span>
                <CircularProgress value={tool.percentage} size={28} strokeWidth={5} />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default ToolReleaseCard
