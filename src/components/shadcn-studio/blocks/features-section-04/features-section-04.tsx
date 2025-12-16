'use client'

import { useEffect } from 'react'

import { ChartNoAxesColumnIncreasingIcon, ChartPieIcon, FileSearchIcon, RocketIcon, TrendingUpIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

import Logo from '@/assets/svg/logo'
import FeaturesTextarea from '@/assets/svg/features-textarea'
import FeaturesTable from '@/assets/svg/features-table'
import FeaturesSkeleton from '@/assets/svg/features-skeleton'
import FeaturesBlockquote from '@/assets/svg/features-blockquote'
import { MotionPreset } from '@/components/ui/motion-preset'

const Features = () => {
  useEffect(() => {
    const all = document.querySelectorAll('.card')

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach(e => {
        const blob = e.querySelector('.blob') as HTMLElement
        const fblob = e.querySelector('.fake-blob') as HTMLElement

        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '1'

        blob.animate(
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - 24 - rec.width / 2
              }px, ${ev.clientY - rec.top - 24 - rec.height / 2}px)`
            }
          ],
          {
            duration: 300,
            fill: 'forwards'
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
          >
            Alles was du für Cold Email Erfolg brauchst
          </MotionPreset>
          <MotionPreset
            component='p'
            className='text-muted-foreground text-xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            Kurse, Templates, Tools und Playbooks - kostenlos und praxiserprobt.
          </MotionPreset>

          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.6} transition={{ duration: 0.5 }}>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Button asChild size='lg' className='rounded-lg text-base has-[>svg]:px-6'>
                <a href='/login'>Jetzt starten <RocketIcon /></a>
              </Button>
              <Button asChild variant='secondary' size='lg' className='rounded-lg !px-6 text-base'>
                <a href='/kurse'>Alle Kurse ansehen</a>
              </Button>
            </div>
          </MotionPreset>
        </div>

        <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.9} transition={{ duration: 0.5 }}>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-6'>
            {/* Streamlined data integration. */}
            <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out lg:col-span-3'>
              <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
                <CardContent className='flex flex-col items-center gap-4 text-center'>
                  <FeaturesTable />
                  <div className='space-y-2'>
                    <CardTitle className='text-base'>25+ Email Templates</CardTitle>
                    <CardDescription>
                      Copy-paste Vorlagen für jeden Anwendungsfall - von Erstkontakt bis Follow-up.
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    className='bg-primary text-primary-foreground hover:bg-primary/90'
                  >
                    <a href='/templates'>Templates ansehen</a>
                  </Button>
                </CardContent>
              </Card>
              <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
              <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
            </div>

            {/* User-friendly interface */}
            <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out lg:col-span-3'>
              <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
                <CardContent className='flex flex-col items-center gap-6 text-center'>
                  <FeaturesBlockquote />
                  <div className='space-y-2'>
                    <CardTitle className='text-base'>Masterclass Kurs</CardTitle>
                    <CardDescription>
                      Von Grundlagen bis Skalierung - 5 Module, 24+ Lektionen komplett kostenlos.
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    className='bg-primary text-primary-foreground hover:bg-primary/90'
                  >
                    <a href='/kurse'>Kurs starten</a>
                  </Button>
                </CardContent>
              </Card>
              <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
              <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
            </div>

            {/* Comprehensive analytics tools. */}
            <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out lg:col-span-2'>
              <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
                <CardContent className='flex flex-col items-center gap-6 text-center'>
                  <FeaturesSkeleton />
                  <div className='space-y-2'>
                    <CardTitle className='text-base'>7 Kostenlose Tools</CardTitle>
                    <CardDescription>
                      SPF Generator, DNS Checker, Email Validator - alles für deine Deliverability.
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    className='bg-primary text-primary-foreground hover:bg-primary/90'
                  >
                    <a href='/tools'>Tools entdecken</a>
                  </Button>
                </CardContent>
              </Card>
              <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
              <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
            </div>

            {/* Enhanced security protocols. */}
            <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out lg:col-span-2'>
              <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
                <CardContent className='flex flex-col items-center gap-6 text-center'>
                  <div className='border-primary/10 relative size-55.5 rounded-full border p-5.5 transition-all duration-300 group-hover:rotate-12'>
                    <div className='border-primary/20 size-full rounded-full border p-5.5'>
                      <div className='border-primary/30 size-full rounded-full border'></div>
                    </div>
                    <Logo className='absolute inset-0 m-auto size-16 transition-all duration-300 group-hover:-rotate-12' />
                    <div className='text-destructive bg-background absolute top-5.5 right-0 flex size-9.5 items-center justify-center rounded-full border shadow-lg'>
                      <ChartNoAxesColumnIncreasingIcon />
                    </div>
                    <div className='bg-background absolute right-6 bottom-1 flex size-9.5 items-center justify-center rounded-full border text-amber-600 shadow-lg dark:text-amber-400'>
                      <TrendingUpIcon />
                    </div>
                    <div className='bg-background absolute bottom-5.5 left-0 flex size-9.5 items-center justify-center rounded-full border text-green-600 shadow-lg dark:text-green-400'>
                      <ChartPieIcon />
                    </div>
                    <div className='text-primary bg-background absolute top-1 left-6 flex size-9.5 items-center justify-center rounded-full border shadow-lg'>
                      <FileSearchIcon />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <CardTitle className='text-base'>Schritt-für-Schritt Playbooks</CardTitle>
                    <CardDescription>
                      Detaillierte Anleitungen von der ersten Kampagne bis zur Skalierung.
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    className='bg-primary text-primary-foreground hover:bg-primary/90'
                  >
                    <a href='/playbooks'>Playbooks entdecken</a>
                  </Button>
                </CardContent>
              </Card>
              <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
              <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
            </div>

            {/* Real-time updates and notifications. */}
            <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out max-lg:col-span-full lg:col-span-2'>
              <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
                <CardContent className='flex flex-col items-center gap-6 text-center'>
                  <FeaturesTextarea />
                  <div className='space-y-2'>
                    <CardTitle className='text-base'>50+ Wissensartikel</CardTitle>
                    <CardDescription>
                      Tiefgehendes Wissen zu jedem Cold Email Thema - von Deliverability bis Copywriting.
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    className='bg-primary text-primary-foreground hover:bg-primary/90'
                  >
                    <a href='/knowledge-base'>Knowledge Base</a>
                  </Button>
                </CardContent>
              </Card>
              <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
              <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
            </div>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default Features
