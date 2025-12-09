import Link from 'next/link'
import { MotionPreset } from '@/components/ui/motion-preset'
import { BounceButton } from '@/components/ui/bounce-button'
import { BookOpenIcon, WrenchIcon, FileTextIcon, MailIcon } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className='flex-1 overflow-hidden py-8 sm:py-12 lg:py-16'>
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-12 px-4 sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'>
        <div className='relative grid gap-12 lg:grid-cols-5'>
          <div className='flex flex-col justify-center gap-6 lg:col-span-3'>
            <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.3}>
              <h1 className='max-w-3xl text-3xl leading-[1.29167] font-bold sm:text-4xl lg:text-5xl'>
                Cold Email Mastery - Kostenlos lernen
              </h1>
            </MotionPreset>
            <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.5}>
              <p className='text-muted-foreground text-lg'>
                Entdecke bewährte Strategien, praxisnahe Vorlagen und Tools, um erfolgreiche Cold Email Kampagnen zu erstellen.
                Unser kostenloser Kurs führt dich Schritt für Schritt zum Erfolg - von den Grundlagen bis zur Skalierung.
              </p>
            </MotionPreset>
            <MotionPreset
              component='div'
              fade
              slide={{ offset: 50 }}
              blur
              transition={{ duration: 0.5 }}
              delay={0.7}
              className='flex flex-wrap items-center gap-6'
            >
              <BounceButton>
                <Link href='/kurse'>Jetzt starten</Link>
              </BounceButton>
              <div className='flex flex-col'>
                <span className='text-xl font-medium'>5+</span>
                <span className='text-muted-foreground'>Module</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl font-medium'>24</span>
                <span className='text-muted-foreground'>Lektionen</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl font-medium'>100%</span>
                <span className='text-muted-foreground'>Kostenlos</span>
              </div>
            </MotionPreset>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-184'>
              <MotionPreset
                component='div'
                fade
                slide={{ direction: 'down', offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.9}
                className='bg-muted group relative h-39 overflow-hidden rounded-md p-4'
              >
                <span className='text-foreground text-lg font-medium'>Schritt für Schritt</span>
                <p className='text-muted-foreground text-sm mt-1'>Strukturierte Lernpfade</p>
                <div className='text-muted-foreground absolute end-4 bottom-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110'>
                  <BookOpenIcon className='size-12 opacity-20' />
                </div>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ direction: 'down', offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={1.0}
                className='bg-muted group relative h-39 overflow-hidden rounded-md p-4'
              >
                <span className='text-foreground text-lg font-medium'>Praxis-Vorlagen</span>
                <p className='text-muted-foreground text-sm mt-1'>Sofort einsetzbar</p>
                <div className='text-muted-foreground absolute end-4 bottom-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110'>
                  <FileTextIcon className='size-12 opacity-20' />
                </div>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ direction: 'down', offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={1.1}
                className='bg-muted group relative h-39 overflow-hidden rounded-md p-4'
              >
                <span className='text-foreground text-lg font-medium'>7 kostenlose Tools</span>
                <p className='text-muted-foreground text-sm mt-1'>Für deinen Workflow</p>
                <div className='text-muted-foreground absolute end-4 bottom-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110'>
                  <WrenchIcon className='size-12 opacity-20' />
                </div>
              </MotionPreset>
            </div>
          </div>
          <MotionPreset
            component='div'
            fade
            slide={{ direction: 'right', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
            delay={0.5}
            className='relative flex items-center justify-center lg:col-span-2'
          >
            <div className='relative flex items-center justify-center'>
              <div className='absolute size-64 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 opacity-20 blur-3xl dark:from-zinc-700 dark:to-zinc-800' />
              <div className='relative flex size-48 items-center justify-center rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-xl dark:from-zinc-800 dark:to-zinc-900'>
                <MailIcon className='size-24 text-zinc-600 dark:text-zinc-400' strokeWidth={1.5} />
              </div>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
