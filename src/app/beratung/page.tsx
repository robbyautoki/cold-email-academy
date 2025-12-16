'use client'

import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  RocketIcon,
  ZapIcon,
  StarIcon,
  QuoteIcon
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MotionPreset } from '@/components/ui/motion-preset'

export default function BeratungPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'automation-audit' })
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#171717' },
          dark: { 'cal-brand': '#fafafa' }
        },
        hideEventTypeDetails: false,
        layout: 'month_view'
      })
    })()
  }, [])

  const benefits = [
    {
      icon: <ZapIcon className='size-5' />,
      title: 'Kostenlos',
      description: 'Unverbindliches Kennenlernen'
    },
    {
      icon: <RocketIcon className='size-5' />,
      title: 'Done-for-You',
      description: 'Wir bauen dein System auf'
    },
    {
      icon: <CalendarIcon className='size-5' />,
      title: 'Schnell',
      description: 'Termine innerhalb 48h'
    }
  ]

  const expectations = [
    '15-30 Minuten Kennenlerngespräch',
    'Analyse deiner aktuellen Outreach-Situation',
    'Klärung ob wir zusammenpassen'
  ]

  // Testimonials mit Favicon als Profilbild
  const testimonials = [
    {
      name: 'Frank van der Sande',
      company: 'entruempelungsdienst.de',
      avatar: 'https://www.google.com/s2/favicons?domain=entruempelungsdienst.de&sz=128',
      initials: 'FS',
      quote: 'Nach dem Discovery Call war klar: Das ist genau das Team, das unser Cold Outreach System aufbauen soll. Innerhalb von 4 Wochen hatten wir alles am Laufen.'
    },
    {
      name: 'Ismail Ergün',
      company: 'lead-star.de',
      avatar: 'https://www.google.com/s2/favicons?domain=lead-star.de&sz=128',
      initials: 'IE',
      quote: 'Die Zusammenarbeit war von Anfang an professionell. Auto.KI hat unser komplettes Outreach-System aufgebaut und wir generieren jetzt konstant neue Leads.'
    },
    {
      name: 'Thomas Grimm',
      company: 'deurstit.de',
      avatar: 'https://www.google.com/s2/favicons?domain=deurstit.de&sz=128',
      initials: 'TG',
      quote: 'Endlich ein Team, das versteht was wir brauchen. Das Cold Email Setup läuft wie am Schnürchen und die Ergebnisse sprechen für sich.'
    }
  ]

  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <MotionPreset fade slide={{ direction: 'down', offset: 20 }} transition={{ duration: 0.5 }}>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 text-primary rounded-lg p-2'>
              <CalendarIcon className='size-6' />
            </div>
            <h1 className='text-3xl font-bold'>Discovery Call buchen</h1>
            <Badge variant='secondary' className='bg-secondary text-secondary-foreground'>
              Kostenlos
            </Badge>
          </div>
          <p className='text-muted-foreground'>
            Finde heraus, ob eine Zusammenarbeit für dein Cold Outreach System das Richtige für dich ist.
          </p>
        </div>
      </MotionPreset>

      {/* Bento Grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {/* Cal.com Embed - Hauptkarte */}
        <MotionPreset
          fade
          slide={{ direction: 'up', offset: 30 }}
          transition={{ duration: 0.5 }}
          delay={0.1}
          className='md:col-span-2 md:row-span-2'
        >
          <Card className='h-full'>
            <CardContent className='p-0'>
              <Cal
                namespace='automation-audit'
                calLink='autoki/automation-audit'
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '600px'
                }}
                config={{
                  layout: 'month_view',
                  theme: 'light'
                }}
              />
            </CardContent>
          </Card>
        </MotionPreset>

        {/* Was erwartet dich? */}
        <MotionPreset
          fade
          slide={{ direction: 'up', offset: 30 }}
          transition={{ duration: 0.5 }}
          delay={0.2}
        >
          <Card className='h-full'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-2'>
                <div className='bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2'>
                  <ClockIcon className='size-5 text-zinc-900 dark:text-zinc-100' />
                </div>
                <CardTitle className='text-lg'>Was erwartet dich?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              {expectations.map((item, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <CheckCircleIcon className='size-5 shrink-0 text-green-500' />
                  <span className='text-sm'>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </MotionPreset>

        {/* Testimonial */}
        <MotionPreset
          fade
          slide={{ direction: 'up', offset: 30 }}
          transition={{ duration: 0.5 }}
          delay={0.3}
        >
          <Card className='h-full bg-primary'>
            <CardContent className='flex h-full flex-col justify-between p-6'>
              <div>
                <QuoteIcon className='text-primary-foreground/30 mb-2 size-8' />
                <p className='text-primary-foreground/90 text-sm italic leading-relaxed'>
                  "{testimonials[testimonialIndex].quote}"
                </p>
              </div>
              <div className='mt-4 flex items-center gap-3'>
                <Avatar className='size-10 bg-white'>
                  <AvatarImage src={testimonials[testimonialIndex].avatar} />
                  <AvatarFallback className='bg-white text-zinc-900 text-xs font-bold'>
                    {testimonials[testimonialIndex].initials}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='text-sm font-medium text-primary-foreground'>{testimonials[testimonialIndex].name}</span>
                  <span className='text-primary-foreground/60 text-xs'>{testimonials[testimonialIndex].company}</span>
                </div>
                <div className='ml-auto flex gap-0.5'>
                  {[1, 2, 3, 4, 5].map(star => (
                    <StarIcon key={star} className='size-4 fill-secondary text-secondary' />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionPreset>

        {/* 3 Vorteile Cards */}
        {benefits.map((benefit, index) => (
          <MotionPreset
            key={benefit.title}
            fade
            slide={{ direction: 'up', offset: 30 }}
            transition={{ duration: 0.5 }}
            delay={0.4 + index * 0.1}
          >
            <Card className='h-full'>
              <CardContent className='flex items-center gap-4 p-4'>
                <div className='bg-primary/10 text-primary rounded-lg p-3'>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className='font-semibold'>{benefit.title}</h3>
                  <p className='text-muted-foreground text-sm'>{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        ))}
      </div>
    </div>
  )
}
