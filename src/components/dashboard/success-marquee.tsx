'use client'

import { QuoteIcon, TrendingUpIcon } from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'
import { Marquee } from '@/components/ui/marquee'

interface SuccessStory {
  quote: string
  author: string
  result?: string
}

const successStories: SuccessStory[] = [
  {
    quote: 'Die Templates haben mir unzählige Stunden gespart.',
    author: 'Max K.',
    result: '12% Reply Rate'
  },
  {
    quote: 'Endlich verstehe ich, wie Deliverability funktioniert.',
    author: 'Sarah M.',
    result: '98% Inbox Rate'
  },
  {
    quote: 'Von 0 auf 50 Meetings im ersten Monat.',
    author: 'Tim B.',
    result: '50 Meetings'
  },
  {
    quote: 'Die SPF/DKIM Tools sind Gold wert!',
    author: 'Lisa W.',
    result: 'Keine Spam-Folder'
  },
  {
    quote: 'Meine Open Rate hat sich verdoppelt.',
    author: 'Jan P.',
    result: '68% Open Rate'
  },
  {
    quote: 'Beste Ressource für Cold Email im deutschsprachigen Raum.',
    author: 'Anna S.',
    result: 'Top Ergebnisse'
  },
  {
    quote: 'Der Kurs war der Game-Changer für unser Outreach.',
    author: 'Michael H.',
    result: '3x mehr Replies'
  },
  {
    quote: 'Professionelle Signaturen = mehr Vertrauen.',
    author: 'Julia R.',
    result: '+40% Replies'
  }
]

function SuccessCard({ story }: { story: SuccessStory }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm">
      <QuoteIcon className="size-4 text-zinc-300 dark:text-zinc-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-zinc-700 dark:text-zinc-300 truncate">
          "{story.quote}"
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            — {story.author}
          </span>
          {story.result && (
            <>
              <span className="text-zinc-300 dark:text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUpIcon className="size-3" />
                {story.result}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function SuccessMarquee() {
  return (
    <MotionPreset fade blur delay={0.6}>
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <TrendingUpIcon className="size-3.5 text-zinc-500" />
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Community Erfolge
            </span>
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {successStories.length}+ Mitglieder
          </span>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-9 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-9 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <Marquee
          pauseOnHover
          duration={50}
          gap={1}
          className="py-2"
        >
          {successStories.map((story, index) => (
            <SuccessCard key={index} story={story} />
          ))}
        </Marquee>
      </div>
    </MotionPreset>
  )
}
