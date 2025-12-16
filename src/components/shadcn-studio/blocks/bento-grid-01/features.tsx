'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { FileTextIcon, GiftIcon, Grid2x2CheckIcon, PlayCircleIcon, GlobeIcon, CalculatorIcon, MailCheckIcon, ServerIcon, ShieldCheckIcon, BanIcon, WrenchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Badge } from '@/components/ui/badge'

import IconBG from '@/assets/svg/bento-icon-bg'

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)
  const span4Ref = useRef<HTMLSpanElement>(null)
  const span5Ref = useRef<HTMLSpanElement>(null)
  const span6Ref = useRef<HTMLSpanElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

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
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {/* Playbooks Card */}
      <MotionPreset fade blur delay={0.9} transition={{ duration: 0.5 }}>
        <Link href='/playbooks' className='block h-full'>
          <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
            <Card className='group-hover:bg-card/90 h-full justify-between border-0 pb-0 shadow-none transition-all duration-300 ease-in-out'>
              <CardContent className='flex flex-col items-center gap-6 text-center'>
                <Badge variant='outline' className='text-sm font-normal'>Neu verfügbar</Badge>
                <h3 className='text-xl font-medium'>Playbooks</h3>
                <p className='text-lg'>
                  Schritt-für-Schritt Anleitungen für deinen Cold Email Erfolg
                </p>
                <Button size='lg' className='gap-2'>
                  <PlayCircleIcon className='size-5' />
                  Jetzt entdecken
                </Button>
              </CardContent>

              <div className='relative h-[320px] w-full overflow-hidden'>
                <Image
                  src='/website1.jpeg'
                  alt='Playbooks'
                  fill
                  className='object-cover scale-125 object-[10%_top]'
                />
              </div>
            </Card>
            <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
            <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
          </div>
        </Link>
      </MotionPreset>

      {/* Tools Card */}
      <MotionPreset fade blur delay={1} transition={{ duration: 0.5 }}>
        <Link href='/tools' className='block h-full'>
          <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
            <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
              <CardContent className='flex flex-col items-center gap-6 text-center'>
                <div className='relative'>
                  <IconBG />
                  <WrenchIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
                </div>

                <h3 className='text-xl font-medium'>Tools</h3>

                <p className='text-lg'>
                  Praktische Tools für deine Cold Email Kampagnen - von DNS Checker bis Email Kalkulator.
                </p>

                <div ref={containerRef} className='relative flex size-64 flex-col items-center justify-between'>
                  <span
                    ref={span1Ref}
                    className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                  >
                    <GlobeIcon className='size-7 text-primary' />
                  </span>

                  <div className='flex w-full justify-between'>
                    <span
                      ref={span2Ref}
                      className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                    >
                      <CalculatorIcon className='size-6 text-primary' />
                    </span>
                    <span
                      ref={span3Ref}
                      className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                    >
                      <MailCheckIcon className='size-6 text-primary' />
                    </span>
                  </div>

                  <div ref={logoRef} className='z-1 flex h-12 items-center justify-center overflow-visible'>
                    <Image src='/logo-new.svg' alt='Logo' width={64} height={64} className='size-16' />
                  </div>

                  <div className='flex w-full justify-between'>
                    <span
                      ref={span4Ref}
                      className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                    >
                      <ServerIcon className='size-6 text-primary' />
                    </span>
                    <span
                      ref={span5Ref}
                      className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                    >
                      <ShieldCheckIcon className='size-6 text-primary' />
                    </span>
                  </div>

                  <span
                    ref={span6Ref}
                    className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                  >
                    <BanIcon className='size-6 text-primary' />
                  </span>

                  <AnimatedBeam containerRef={containerRef} fromRef={span1Ref} toRef={logoRef} duration={4.5} />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={span2Ref}
                    toRef={logoRef}
                    duration={4.5}
                    delay={4.75}
                    curvature={-25}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={span3Ref}
                    toRef={logoRef}
                    duration={4.5}
                    delay={1.75}
                    curvature={-25}
                    reverse
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={span4Ref}
                    toRef={logoRef}
                    duration={4.5}
                    delay={4}
                    curvature={25}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={span5Ref}
                    toRef={logoRef}
                    duration={4.5}
                    delay={2.5}
                    curvature={25}
                    reverse
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={span6Ref}
                    toRef={logoRef}
                    duration={4.5}
                    delay={2.5}
                  />
                </div>
              </CardContent>
            </Card>
            <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
            <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
          </div>
        </Link>
      </MotionPreset>

      {/* Checklisten Card */}
      <MotionPreset fade blur delay={1.1} transition={{ duration: 0.5 }}>
        <Link href='/checklisten' className='block h-full'>
          <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
            <Card className='group-hover:bg-card/90 h-full justify-between border-0 pb-0 shadow-none transition-all duration-300 ease-in-out'>
              <CardContent className='flex flex-col items-center gap-6 text-center'>
                <Badge variant='outline' className='text-sm font-normal'>Neu verfügbar</Badge>
                <h3 className='text-xl font-medium'>Checklisten</h3>
                <p className='text-lg'>
                  Strukturierte Checklisten für jeden Schritt deiner Cold Email Kampagne
                </p>
                <Button size='lg' className='gap-2'>
                  <PlayCircleIcon className='size-5' />
                  Jetzt entdecken
                </Button>
              </CardContent>

              <div className='relative h-[320px] w-full overflow-hidden'>
                <Image
                  src='/website3.jpeg'
                  alt='Checklisten'
                  fill
                  className='object-cover scale-125 object-[0%_35%]'
                />
              </div>
            </Card>
            <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
            <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
          </div>
        </Link>
      </MotionPreset>

      {/* Knowledge Base Card */}
      <MotionPreset fade blur delay={1.2} transition={{ duration: 0.5 }}>
        <Link href='/knowledge-base' className='block h-full'>
          <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
            <Card className='group-hover:bg-card/90 h-full justify-between border-0 pb-0 shadow-none transition-all duration-300 ease-in-out'>
              <CardContent className='flex flex-col items-center gap-6 text-center'>
                <div className='relative'>
                  <IconBG />
                  <FileTextIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
                </div>
                <h3 className='text-xl font-medium'>Knowledge Base</h3>
                <p className='text-lg'>Geballtes Wissen aus 2 Jahren KI Cold Mailing Erfahrung.</p>
              </CardContent>

              <div className='relative'>
                <Image
                  src='/website5.jpeg'
                  alt='Knowledge Base'
                  width={400}
                  height={300}
                  className='z-1 w-full opacity-40 blur-[3px] dark:grayscale dark:invert'
                />
                <div className='to-primary/10 absolute inset-0 bg-gradient-to-b from-transparent' />
                <span className='text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-medium'>
                  50+ Artikel
                </span>
              </div>
            </Card>
            <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
            <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
          </div>
        </Link>
      </MotionPreset>

      {/* 100% Kostenlos */}
      <MotionPreset fade blur delay={1.3} transition={{ duration: 0.5 }}>
        <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
          <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-col items-center gap-6 text-center'>
              <div className='relative'>
                <IconBG />
                <GiftIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
              </div>
              <h3 className='text-xl font-medium'>100% Kostenlos</h3>
              <p className='text-lg'>Alle Playbooks, Checklisten, Tools und die Knowledge Base - komplett gratis für dich.</p>
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-4.png'
                alt='100% Kostenlos'
                className='w-full max-w-71'
              />
            </CardContent>
          </Card>
          <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
          <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
        </div>
      </MotionPreset>

      {/* Alles an einem Ort */}
      <MotionPreset fade blur delay={1.4} transition={{ duration: 0.5 }}>
        <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
          <Card className='group-hover:bg-card/90 h-full justify-between border-0 pb-0 shadow-none transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-col items-center gap-6 text-center'>
              <div className='relative'>
                <IconBG />
                <Grid2x2CheckIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
              </div>
              <h3 className='text-xl font-medium'>Zentrale Anlaufstelle</h3>
              <p className='text-lg'>Rund um Cold Emails in Deutschland.</p>
            </CardContent>

            <div className='relative h-[280px] overflow-hidden'>
              <img
                src='/website7.jpeg'
                alt='Alles an einem Ort'
                className='z-1 w-full -mt-48 opacity-40 blur-[3px] dark:grayscale dark:invert'
              />
              <div className='to-primary/10 absolute inset-0 bg-gradient-to-b from-transparent' />
              <span className='text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-medium'>
                & vieles mehr!
              </span>
            </div>
          </Card>
          <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
          <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
        </div>
      </MotionPreset>
    </div>
  )
}

export default Features
