'use client'

import Link from 'next/link'
import { WrenchIcon, BookOpenIcon, GraduationCapIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'

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
      <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-background dark:from-zinc-900/50">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Greeting */}
            <div className="flex items-start gap-4">
              <Avatar className="size-14 border-2 border-zinc-200 dark:border-zinc-700 shadow-lg">
                <AvatarImage src={userImage} />
                <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-lg font-semibold">
                  {firstName ? getInitials(firstName) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <p className="text-muted-foreground text-sm">{getGreeting()}</p>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {firstName ? `${firstName}!` : 'Willkommen!'}
                </h1>
                <p className="text-muted-foreground max-w-md">
                  Dein Zugang zu exklusiven Cold Email Ressourcen, Tools und Strategien.
                </p>
              </div>
            </div>

            {/* Right: Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Link href="/tools">
                <Button className="shadow-sm bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900">
                  <WrenchIcon className="size-4" />
                  Tools
                </Button>
              </Link>
              <Link href="/knowledge-base">
                <Button variant="outline" className="shadow-sm border-zinc-300 dark:border-zinc-700">
                  <BookOpenIcon className="size-4" />
                  Knowledge Base
                </Button>
              </Link>
              <Link href="/kurse">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <GraduationCapIcon className="size-4" />
                  Kurs
                  <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0 bg-zinc-100 dark:bg-zinc-800">
                    Bonus
                  </Badge>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionPreset>
  )
}
