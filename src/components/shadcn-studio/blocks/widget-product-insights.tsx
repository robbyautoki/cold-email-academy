'use client'

import { Bar, BarChart } from 'recharts'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'

// Aktive Lernende Daten
const aktiveLernendeData = [
  { month: 'Januar', lernende: 12 },
  { month: 'Februar', lernende: 28 },
  { month: 'März', lernende: 45 },
  { month: 'April', lernende: 67 },
  { month: 'Mai', lernende: 89 }
]

const aktiveLernendeConfig = {
  lernende: {
    label: 'Lernende',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

// Abgeschlossene Kurse Daten
const abgeschlosseneKurseData = [
  { month: 'Januar', kurse: 5 },
  { month: 'Februar', kurse: 12 },
  { month: 'März', kurse: 18 },
  { month: 'April', kurse: 31 },
  { month: 'Mai', kurse: 45 }
]

const abgeschlosseneKurseConfig = {
  kurse: {
    label: 'Kurse',
    color: 'color-mix(in oklab, var(--primary) 10%, transparent)'
  }
} satisfies ChartConfig

const AcademyInsightsCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='text-lg font-semibold'>Academy Insights</span>
          <span className='text-muted-foreground text-sm'>Stand: Mai 2025</span>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Separator />
        <div className='flex items-center justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs'>Aktive Lernende</span>
            <span className='text-2xl font-semibold'>89</span>
          </div>
          <ChartContainer config={aktiveLernendeConfig} className='min-h-13 max-w-18'>
            <BarChart accessibilityLayer data={aktiveLernendeData} barSize={8}>
              <Bar dataKey='lernende' fill='var(--color-lernende)' radius={2} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className='flex items-center justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs'>Abgeschlossene Kurse</span>
            <span className='text-2xl font-semibold'>45</span>
          </div>
          <ChartContainer config={abgeschlosseneKurseConfig} className='min-h-13 max-w-18'>
            <BarChart accessibilityLayer data={abgeschlosseneKurseData} barSize={8}>
              <Bar dataKey='kurse' fill='var(--color-kurse)' radius={2} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default AcademyInsightsCard
