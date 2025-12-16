import { ArrowUpIcon } from 'lucide-react'

import SocialProofPhone from '@/assets/svg/social-proof-phone'
import SocialProofBubble from '@/assets/svg/social-proof-bubble'
import SocialProofCreditCard from '@/assets/svg/social-proof-credit-card'
import SocialProofDocument from '@/assets/svg/social-proof-document'
import SocialProofChat from '@/assets/svg/social-proof-chat'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { MotionPreset } from '@/components/ui/motion-preset'

const SocialProof = () => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} blur transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='text-sm font-normal'>
              Zahlen & Fakten
            </Badge>
          </MotionPreset>

          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
            delay={0.3}
          >
            Cold Email Academy in Zahlen
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground text-xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5 }}
          >
            Tausende Nutzer vertrauen der Cold Email Academy und erzielen messbare Ergebnisse
            mit unseren Ressourcen, Templates und Tools.
          </MotionPreset>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {/* Card 1 */}
          <MotionPreset fade blur slide={{ direction: 'down', offset: 15 }} delay={0.9} transition={{ duration: 0.5 }}>
            <Card className='h-full py-5'>
              <CardContent className='flex h-full justify-between gap-6 px-4 md:px-6 lg:px-8'>
                <div className='flex flex-col justify-between gap-20'>
                  <div className='space-y-6 font-medium'>
                    <p className='text-xl'>Response Rate</p>
                    <h4 className='text-3xl'>Nutzer-Ergebnisse</h4>
                    <p className='text-xl'>Mit unseren Templates!</p>
                  </div>
                  <div>
                    <Badge className='bg-primary/10 [a&]:hover:bg-primary/5 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 text-primary rounded-sm border-none px-3 py-1 focus-visible:outline-none'>
                      #Erfolgsrate
                    </Badge>
                  </div>
                </div>
                <div className='h-full'>
                  <div className='flex h-3/5 w-full flex-col justify-center gap-2 rounded-t-lg bg-green-600/20 px-3 py-2.5 dark:bg-green-400/20'>
                    <p className='text-xl font-medium'>Erfolg</p>
                    <h4 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>95%</h4>
                  </div>
                  <div className='flex h-2/5 w-full flex-col justify-center gap-2 rounded-b-lg bg-amber-600/20 px-3 py-2.5 dark:bg-amber-400/20'>
                    <p className='text-xl font-medium'>Lernen</p>
                    <h4 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>5%</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Card 2 */}
          <MotionPreset fade blur slide={{ direction: 'down', offset: 15 }} delay={1} transition={{ duration: 0.5 }}>
            <Card className='h-full py-5'>
              <CardContent className='flex h-full flex-col items-center justify-between gap-16 px-4 text-center md:px-6 lg:px-8'>
                <h4 className='text-3xl font-medium'>Cold Email Academy Stats</h4>
                <div className='flex items-center justify-between gap-6'>
                  <div className='flex h-full flex-col items-center justify-center gap-2.5 text-center'>
                    <h4 className='text-2xl font-bold md:text-3xl lg:text-4xl'>12k+</h4>
                    <p>Aktive Nutzer</p>
                  </div>
                  <div className='flex h-full flex-col items-center justify-center gap-2.5 text-center'>
                    <h4 className='text-2xl font-bold md:text-3xl lg:text-4xl'>25+</h4>
                    <p>Email Templates</p>
                  </div>
                </div>
                <MotionPreset
                  fade
                  blur
                  zoom={{ initialScale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  delay={1.7}
                  className='h-8.5 w-full rounded-md bg-green-600/10 dark:bg-green-400/10'
                ></MotionPreset>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Card 3 */}
          <MotionPreset fade blur slide={{ direction: 'down', offset: 15 }} delay={1.1} transition={{ duration: 0.5 }}>
            <Card className='h-full py-5'>
              <CardContent className='h-full px-4 md:px-6 lg:px-8'>
                <div className='relative flex h-full flex-col justify-between max-md:gap-30'>
                  <div className='flex items-center gap-4'>
                    <ArrowUpIcon className='size-10' />
                    <span className='text-6xl font-semibold'>520%</span>
                  </div>
                  <p className='w-2/3 text-3xl font-medium'>Höhere Response Rate mit unseren Templates!</p>
                  <MotionPreset
                    fade
                    blur
                    slide={{ direction: 'right', offset: 15 }}
                    transition={{ duration: 0.5 }}
                    delay={1.7}
                  >
                    <svg
                      width='210'
                      className='absolute right-0 bottom-0 rtl:rotate-y-180'
                      height='198'
                      viewBox='0 0 210 198'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M-0.00195312 99C-0.00195312 44.3238 44.3219 0 98.998 0H104.998C162.988 0 209.998 47.0101 209.998 105V198H98.998C44.3219 198 -0.00195312 153.676 -0.00195312 99Z'
                        fill='var(--destructive)'
                        fillOpacity='0.1'
                      />
                    </svg>
                  </MotionPreset>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Card 4 */}
          <MotionPreset fade blur slide={{ direction: 'down', offset: 15 }} delay={1.2} transition={{ duration: 0.5 }}>
            <Card className='h-full py-4'>
              <CardContent className='h-full px-4'>
                <div className='flex h-full flex-col items-center justify-between gap-6 rounded-lg bg-green-600/10 p-5 pb-0 text-center dark:bg-green-400/10'>
                  <h4 className='text-3xl font-medium'>Mehr Deals</h4>
                  <p className='text-xl font-medium'>Durchschnittlich 3x mehr Meetings mit Cold Email</p>
                  <MotionPreset
                    fade
                    blur
                    zoom={{ initialScale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    delay={1.7}
                    className='text-foreground'
                  >
                    <SocialProofPhone />
                  </MotionPreset>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Card 5 */}
          <MotionPreset fade blur slide={{ direction: 'down', offset: 15 }} delay={1.3} transition={{ duration: 0.5 }}>
            <Card className='h-full py-5'>
              <CardContent className='overflow-hidden px-4 md:px-6 lg:px-8'>
                <div className='flex h-full flex-col items-center justify-center gap-6 text-center'>
                  <h4 className='text-3xl font-medium'>100% kostenlos - keine versteckten Kosten!</h4>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    transition={{ duration: 0.5 }}
                    delay={1.7}
                  >
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/social-proof/image-4.png'
                      alt='Cashback'
                      className='h-56'
                    />
                  </MotionPreset>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Card 6 */}
          <MotionPreset fade blur slide={{ direction: 'down', offset: 15 }} delay={1.4} transition={{ duration: 0.5 }}>
            <Card className='relative h-full min-h-80 overflow-hidden py-4'>
              <CardContent className='h-full px-4'>
                <div className='flex h-full flex-col items-center justify-center gap-6 rounded-lg bg-sky-600/10 p-6 text-center dark:bg-sky-400/10'>
                  <h4 className='text-3xl font-medium'>50+ Artikel</h4>
                  <p className='text-xl'>In der Knowledge Base zum sofortigen Lernen</p>
                </div>

                <MotionPreset
                  className='absolute top-0 left-0'
                  fade
                  slide={{ offset: 50 }}
                  transition={{ duration: 0.5 }}
                  delay={1.7}
                >
                  <SocialProofBubble />
                </MotionPreset>

                <MotionPreset
                  className='absolute top-3 right-3'
                  fade
                  slide={{ direction: 'right', offset: 50 }}
                  transition={{ duration: 0.5 }}
                  delay={1.7}
                >
                  <SocialProofCreditCard />
                </MotionPreset>

                <MotionPreset
                  className='absolute bottom-0 left-0'
                  fade
                  slide={{ offset: 50 }}
                  transition={{ duration: 0.5 }}
                  delay={1.7}
                >
                  <SocialProofDocument />
                </MotionPreset>

                <MotionPreset
                  className='absolute -right-1 bottom-0'
                  fade
                  slide={{ direction: 'right', offset: 50 }}
                  transition={{ duration: 0.5 }}
                  delay={1.7}
                >
                  <SocialProofChat />
                </MotionPreset>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
