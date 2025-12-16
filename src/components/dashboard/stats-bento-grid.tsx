'use client'

import {
  TrendingUpIcon,
  ZapIcon,
  TargetIcon,
  MailIcon,
  CheckCircleIcon,
  SparklesIcon
} from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/ui/border-beam'
import { MotionPreset } from '@/components/ui/motion-preset'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { NumberTicker } from './number-ticker'

// Fortschritts-Daten
const progressData = [
  { day: 'Mo', progress: 20 },
  { day: 'Di', progress: 35 },
  { day: 'Mi', progress: 45 },
  { day: 'Do', progress: 60 },
  { day: 'Fr', progress: 75 },
  { day: 'Sa', progress: 82 },
  { day: 'So', progress: 87 }
]

const progressConfig = {
  progress: {
    label: 'Fortschritt',
    color: 'hsl(var(--primary))'
  }
} satisfies ChartConfig

// Aktivitäts-Daten
const activityData = [
  { day: 'Mo', emails: 12, opens: 8 },
  { day: 'Di', emails: 18, opens: 14 },
  { day: 'Mi', emails: 24, opens: 19 },
  { day: 'Do', emails: 15, opens: 11 },
  { day: 'Fr', emails: 28, opens: 22 },
  { day: 'Sa', emails: 8, opens: 5 },
  { day: 'So', emails: 5, opens: 3 }
]

const activityConfig = {
  emails: {
    label: 'Emails',
    color: 'hsl(var(--primary))'
  },
  opens: {
    label: 'Öffnungen',
    color: 'hsl(var(--secondary))'
  }
} satisfies ChartConfig

// Erfolge
const achievements = [
  { id: 1, name: 'Erste Email', icon: MailIcon, unlocked: true },
  { id: 2, name: '10 Replies', icon: CheckCircleIcon, unlocked: true },
  { id: 3, name: 'Power User', icon: ZapIcon, unlocked: true },
  { id: 4, name: 'Top Performer', icon: SparklesIcon, unlocked: false }
]

export function StatsBentoGrid() {
  return (
    <MotionPreset fade blur delay={0.3}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Deine Statistiken</h2>
          <span className="text-xs text-muted-foreground">Diese Woche</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Fortschritts-Card */}
          <MotionPreset fade blur delay={0.35}>
            <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800">
              <BorderBeam
                size={80}
                duration={8}
                colorFrom="hsl(var(--primary))"
                colorTo="hsl(var(--secondary))"
              />
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUpIcon className="size-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Fortschritt
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    +12%
                  </Badge>
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <NumberTicker
                    value={87}
                    suffix="%"
                    className="text-3xl font-bold text-zinc-900 dark:text-zinc-100"
                  />
                  <span className="text-xs text-muted-foreground">
                    abgeschlossen
                  </span>
                </div>

                <ChartContainer config={progressConfig} className="h-[70px] w-full">
                  <AreaChart
                    data={progressData}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  >
                    <defs>
                      <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="progress"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#progressGradient)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Aktivitäts-Card */}
          <MotionPreset fade blur delay={0.4}>
            <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <ZapIcon className="size-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Aktivität
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <NumberTicker
                    value={110}
                    className="text-3xl font-bold text-zinc-900 dark:text-zinc-100"
                  />
                  <span className="text-xs text-muted-foreground">Emails diese Woche</span>
                </div>

                <ChartContainer config={activityConfig} className="h-[70px] w-full">
                  <BarChart data={activityData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <XAxis dataKey="day" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                      dataKey="emails"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Erfolge-Card */}
          <MotionPreset fade blur delay={0.45}>
            <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <TargetIcon className="size-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Erfolge
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    <NumberTicker value={3} className="font-semibold" />/4
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <MotionPreset
                        key={achievement.id}
                        fade
                        blur
                        delay={0.5 + index * 0.05}
                      >
                        <div
                          className={`
                            flex items-center gap-2 rounded-lg p-2 transition-all duration-200
                            ${
                              achievement.unlocked
                                ? 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                : 'bg-zinc-50 dark:bg-zinc-900/50 opacity-50'
                            }
                          `}
                        >
                          <div
                            className={`
                              flex size-6 shrink-0 items-center justify-center rounded-md
                              ${
                                achievement.unlocked
                                  ? 'bg-secondary text-secondary-foreground shadow-sm'
                                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400'
                              }
                            `}
                          >
                            <Icon className="size-3" />
                          </div>
                          <span
                            className={`
                              text-xs font-medium truncate
                              ${
                                achievement.unlocked
                                  ? 'text-zinc-700 dark:text-zinc-300'
                                  : 'text-zinc-400 dark:text-zinc-500'
                              }
                            `}
                          >
                            {achievement.name}
                          </span>
                        </div>
                      </MotionPreset>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </MotionPreset>
  )
}
