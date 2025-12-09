import { EllipsisVerticalIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'

const listItems = ['Teilen', 'Aktualisieren', 'Neu laden']

const plans = [
  {
    name: 'Basis Zugang',
    price: 0,
    checked: true
  },
  {
    name: 'Pro Tools',
    price: 49,
    checked: false
  },
  {
    name: '1:1 Coaching',
    price: 199,
    checked: false
  },
  {
    name: 'Community Access',
    price: 29,
    checked: false
  }
]

const ForBusinessSharkCard = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-lg font-semibold'>Pro Membership</span>
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
        </div>
        <p className='text-muted-foreground text-sm'>
          Erweitere deinen Zugang mit Pro Features und exklusiven Tools
        </p>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <Label className='text-base font-medium'>Wähle dein Upgrade</Label>
          {plans.map((plan, index) => (
            <Label
              key={index}
              className='has-[[aria-checked=true]]:border-primary dark:has-[[aria-checked=true]]:border-primary flex items-center gap-3 rounded-md border px-4 py-2'
            >
              <Checkbox defaultChecked={plan.checked} />
              <div className='flex w-full items-center justify-between gap-2'>
                <p className='text-sm leading-none font-medium'>{plan.name}</p>
                <Badge className='bg-primary/10 text-primary rounded-sm'>${plan.price}</Badge>
              </div>
            </Label>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between text-sm'>
            <span>MwSt.</span>
            <span>inkl.</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm'>Gesamtbetrag</span>
            <span className='text-lg font-medium'>Bald verfügbar</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled>Bald verfügbar</Button>
      </CardFooter>
    </Card>
  )
}

export default ForBusinessSharkCard
