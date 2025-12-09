'use client'

import type { ReactNode } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { UserIcon, LogOutIcon } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const ProfileDropdown = ({ trigger, defaultOpen, align = 'end' }: Props) => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const userName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'User'
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || ''
  const userAvatar = user?.imageUrl || 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
  const userInitials = userName.slice(0, 2).toUpperCase()

  const handleLogout = () => {
    signOut({ redirectUrl: '/' })
  }

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-80' align={align || 'end'}>
        <DropdownMenuLabel className='flex items-center gap-4 px-4 py-2.5 font-normal'>
          <div className='relative'>
            <Avatar className='size-10'>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <span className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
          </div>
          <div className='flex flex-1 flex-col items-start'>
            <span className='text-foreground text-lg font-semibold'>{userName}</span>
            <span className='text-muted-foreground text-base'>{userEmail}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className='px-4 py-2.5 text-base' onClick={() => router.push('/profile')}>
            <UserIcon className='text-foreground size-5' />
            <span>Mein Profil</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant='destructive' className='px-4 py-2.5 text-base' onClick={handleLogout}>
          <LogOutIcon className='size-5' />
          <span>Abmelden</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
