'use client'

import { BookOpenIcon, FileTextIcon, PlayCircleIcon, AwardIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Progress } from '@/components/ui/progress'

interface StatItem {
  label: string
  value: number
  total?: number
  icon: React.ElementType
  color: string
  bgColor: string
}

const stats: StatItem[] = [
  {
    label: 'Lektionen',
    value: 0,
    total: 24,
    icon: PlayCircleIcon,
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20'
  },
  {
    label: 'Playbooks',
    value: 0,
    total: 4,
    icon: BookOpenIcon,
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20'
  },
  {
    label: 'Templates',
    value: 0,
    icon: FileTextIcon,
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20'
  },
  {
    label: 'Zertifikate',
    value: 0,
    total: 3,
    icon: AwardIcon,
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20'
  }
]

export function ProgressStats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, index) => (
        <MotionPreset key={stat.label} fade blur delay={0.1 + index * 0.05}>
          <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`flex size-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`size-6 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tabular-nums">
                      {stat.value}
                    </span>
                    {stat.total && (
                      <span className="text-sm text-muted-foreground">
                        /{stat.total}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {stat.label}
                  </p>
                </div>
              </div>
              {stat.total && (
                <Progress
                  value={(stat.value / stat.total) * 100}
                  className="h-1 mt-3"
                />
              )}
            </CardContent>
          </Card>
        </MotionPreset>
      ))}
    </div>
  )
}
