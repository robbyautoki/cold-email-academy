import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/global-tooltip'

import { MotionPreset } from '@/components/ui/motion-preset'

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'SM',
    name: 'Sarah Müller'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    fallback: 'MK',
    name: 'Michael Koch'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'AW',
    name: 'Anna Weber'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
    fallback: 'TS',
    name: 'Thomas Schmidt'
  }
]

const CTASection = () => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Card className='rounded-3xl border-none py-8 shadow-md md:py-16 lg:py-24'>
          <CardContent className='px-4 md:px-6 lg:px-8'>
            <div className='flex flex-col items-center gap-6 text-center'>
              <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
                <div className='flex -space-x-4'>
                  <TooltipProvider>
                    {avatars.map((avatar, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger>
                          <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:scale-105'>
                            <AvatarImage src={avatar.src} alt={avatar.name} />
                            <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>{avatar.name}</TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              </MotionPreset>

              <MotionPreset
                component='h2'
                className='text-3xl font-semibold'
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.3}
                transition={{ duration: 0.5 }}
              >
                Werde Teil einer Community von 12.000+ Sales Profis
              </MotionPreset>

              <MotionPreset
                component='p'
                className='text-muted-foreground max-w-3xl'
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.6}
                transition={{ duration: 0.5 }}
              >
                Erhalte Zugang zu allen Kursen, Templates, Tools und Playbooks - komplett kostenlos.
                Keine Kreditkarte erforderlich. Starte noch heute mit deiner ersten Cold Email Kampagne.
              </MotionPreset>

              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.9}
                transition={{ duration: 0.5 }}
              >
                <Button asChild size='lg' className='rounded-lg text-base'>
                  <a href='/login'>Jetzt kostenlos starten</a>
                </Button>
              </MotionPreset>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default CTASection
