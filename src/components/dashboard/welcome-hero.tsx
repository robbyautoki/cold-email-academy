'use client'

import Link from 'next/link'
import { WrenchIcon, BookOpenIcon, CalendarIcon, SparklesIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MotionPreset } from '@/components/ui/motion-preset'
import { BorderBeam } from '@/components/ui/border-beam'
import { Badge } from '@/components/ui/badge'

interface WelcomeHeroProps {
  firstName: string
  userImage?: string
}

export function WelcomeHero({ firstName, userImage }: WelcomeHeroProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Guten Morgen'
    if (hour < 18) return 'Guten Tag'
    return 'Guten Abend'
  }

  const getMotivation = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Starte produktiv in den Tag!'
    if (hour < 18) return 'Weiter so, du machst das super!'
    return 'Zeit für die Abend-Session!'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <MotionPreset fade blur>
      <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 via-white to-zinc-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800/50 p-6 overflow-hidden">
        <BorderBeam
          size={120}
          duration={12}
          colorFrom="hsl(var(--primary))"
          colorTo="hsl(var(--secondary))"
          borderWidth={1}
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Greeting */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="size-16 border-2 border-zinc-200 dark:border-zinc-700 ring-4 ring-zinc-100 dark:ring-zinc-800">
                <AvatarImage src={userImage} />
                <AvatarFallback className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 text-zinc-700 dark:text-zinc-300 text-xl font-semibold">
                  {firstName ? getInitials(firstName) : 'U'}
                </AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 size-3.5 rounded-full bg-secondary border-2 border-white dark:border-zinc-900" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">{getGreeting()}</p>
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0"
                >
                  <SparklesIcon className="size-2.5 mr-0.5" />
                  Pro
                </Badge>
              </div>
              <h1 className="text-xl font-bold sm:text-2xl bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 bg-clip-text text-transparent">
                {firstName || 'Willkommen'}
              </h1>
              <p className="text-muted-foreground text-xs flex items-center gap-1.5">
                <span className="inline-block size-1.5 rounded-full bg-secondary animate-pulse" />
                {getMotivation()}
              </p>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Link href="/tools">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-300 dark:border-zinc-700 hover:scale-[1.02] transition-transform"
              >
                <WrenchIcon className="size-4" />
                Tools
              </Button>
            </Link>
            <Link href="/knowledge-base">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-300 dark:border-zinc-700 hover:scale-[1.02] transition-transform"
              >
                <BookOpenIcon className="size-4" />
                Knowledge Base
              </Button>
            </Link>
            <Link href="/beratung">
              <Button size="sm" className="hover:scale-[1.02] transition-transform">
                <CalendarIcon className="size-4" />
                Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MotionPreset>
  )
}
