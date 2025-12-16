'use client'

import { motion } from 'motion/react'
import {
  StarIcon,
  QuoteIcon,
  TrendingUpIcon,
  UsersIcon,
  CheckCircleIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BorderBeam } from '@/components/ui/border-beam'
import { MotionPreset } from '@/components/ui/motion-preset'
import { NumberTicker } from '@/components/dashboard/number-ticker'

const testimonials = [
  {
    name: 'Thomas M.',
    role: 'Gründer, SaaS Startup',
    avatar: '',
    initials: 'TM',
    content: 'Mit der Academy habe ich in 2 Wochen mehr über Cold Email gelernt als in 6 Monaten selbst probieren. Die Templates sind Gold wert!',
    rating: 5,
    result: '43% Reply Rate',
    featured: true
  },
  {
    name: 'Sarah K.',
    role: 'Sales Manager',
    avatar: '',
    initials: 'SK',
    content: 'Endlich verstehe ich Deliverability. Meine Emails landen jetzt im Posteingang statt im Spam.',
    rating: 5,
    result: '85% Inbox Rate'
  },
  {
    name: 'Max B.',
    role: 'B2B Freelancer',
    avatar: '',
    initials: 'MB',
    content: 'Die Playbooks haben mir geholfen, meine erste Kampagne zu starten. Hatte innerhalb einer Woche 3 neue Kunden.',
    rating: 5,
    result: '3 Neukunden'
  },
  {
    name: 'Lisa W.',
    role: 'Marketing Lead',
    avatar: '',
    initials: 'LW',
    content: 'Die kostenlosen Tools sind besser als viele kostenpflichtige Alternativen. Der SPF Generator hat mir Stunden gespart.',
    rating: 5,
    result: '10h gespart'
  }
]

const stats = [
  { label: 'Aktive Nutzer', value: 500, suffix: '+', icon: UsersIcon },
  { label: 'Emails gesendet', value: 50, suffix: 'k+', icon: TrendingUpIcon },
  { label: 'Erfolgsrate', value: 87, suffix: '%', icon: CheckCircleIcon }
]

const logos = [
  'Hubspot', 'Salesforce', 'Pipedrive', 'Lemlist', 'Apollo'
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`size-4 ${i < rating ? 'fill-zinc-900 text-zinc-900 dark:fill-zinc-100 dark:text-zinc-100' : 'text-zinc-300 dark:text-zinc-600'}`}
        />
      ))}
    </div>
  )
}

export function SocialProof() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionPreset fade blur delay={0.1}>
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 mb-4"
            >
              <StarIcon className="size-3.5 mr-1.5 fill-current" />
              Von der Community geliebt
            </Badge>
          </MotionPreset>

          <MotionPreset fade blur delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Erfolgsgeschichten aus der{' '}
              <span className="text-primary">
                Community
              </span>
            </h2>
          </MotionPreset>

          <MotionPreset fade blur delay={0.3}>
            <p className="text-lg text-muted-foreground">
              Hunderte Marketer haben bereits bessere Ergebnisse mit unseren Ressourcen erzielt.
            </p>
          </MotionPreset>
        </div>

        {/* Stats Row */}
        <MotionPreset fade blur delay={0.4}>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100">
                      <Icon className="size-5 text-white dark:text-zinc-900" />
                    </div>
                    <span className="text-4xl font-bold">
                      <NumberTicker value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </MotionPreset>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <MotionPreset
              key={testimonial.name}
              fade
              blur
              slide={{ direction: 'up', offset: 30 }}
              delay={0.5 + index * 0.1}
              className={testimonial.featured ? 'md:col-span-2 lg:row-span-2 lg:col-span-2' : ''}
            >
              <Card className={`group relative h-full overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 ${testimonial.featured ? 'hover:shadow-2xl hover:shadow-zinc-500/10' : 'hover:shadow-xl'}`}>
                {testimonial.featured && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <BorderBeam
                      size={120}
                      duration={8}
                      colorFrom="#18181b"
                      colorTo="#71717a"
                    />
                  </div>
                )}

                <CardContent className={`p-6 h-full flex flex-col ${testimonial.featured ? 'sm:p-8' : ''}`}>
                  {/* Quote Icon */}
                  <div className={`mb-4 ${testimonial.featured ? 'mb-6' : ''}`}>
                    <QuoteIcon className={`text-zinc-300 dark:text-zinc-700 ${testimonial.featured ? 'size-12' : 'size-8'}`} />
                  </div>

                  {/* Content */}
                  <p className={`flex-1 text-zinc-600 dark:text-zinc-400 leading-relaxed ${testimonial.featured ? 'text-lg sm:text-xl' : 'text-sm'}`}>
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Result Badge */}
                  {testimonial.result && (
                    <div className="my-4">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 dark:bg-primary/20 text-primary border-0"
                      >
                        <TrendingUpIcon className="size-3 mr-1" />
                        {testimonial.result}
                      </Badge>
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <Avatar className={testimonial.featured ? 'size-12' : 'size-10'}>
                      {testimonial.avatar && (
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      )}
                      <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>
          ))}
        </div>

        {/* Tool Logos */}
        <MotionPreset fade blur delay={0.9}>
          <div className="mt-16 pt-16 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-center text-sm text-muted-foreground mb-8">
              Funktioniert perfekt mit deinen bestehenden Tools
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {logos.map((logo, index) => (
                <motion.div
                  key={logo}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-zinc-400 dark:text-zinc-600 font-semibold text-lg hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-default"
                >
                  {logo}
                </motion.div>
              ))}
            </div>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}
