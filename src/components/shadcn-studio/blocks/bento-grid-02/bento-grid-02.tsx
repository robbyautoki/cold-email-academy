import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { GraduationCapIcon, BookOpenIcon, WrenchIcon, TargetIcon } from 'lucide-react'

const BentoGrid = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        {/* Header Section */}
        <div className='space-y-4 text-center'>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='text-sm font-normal'>
              Unsere Features
            </Badge>
          </MotionPreset>

          <MotionPreset
            component='h2'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
            className='text-2xl font-semibold sm:text-3xl lg:text-4xl'
          >
            Alles was du für Cold Email Erfolg brauchst
          </MotionPreset>

          <MotionPreset
            component='p'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5 }}
            className='text-muted-foreground text-xl'
          >
            Kurse, Wissen, Tools und Praxis-Übungen - alles an einem Ort.
          </MotionPreset>
        </div>

        {/* Grid Section */}
        <div className='space-y-6'>
          {/* Grid Row 1 */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Card 1 - Kurse */}
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 15 }}
              delay={0.9}
              transition={{ duration: 0.5 }}
            >
              <Card className='bg-zinc-500/10 group relative flex h-full min-h-[280px] items-end gap-y-9 overflow-hidden border-0 p-6 shadow-none'>
                <div className='space-y-4 z-10'>
                  <h3 className='text-3xl font-semibold'>Cold Email Kurse</h3>
                  <p className='text-muted-foreground text-lg'>
                    Strukturierter Lernpfad von den Grundlagen bis zur Skalierung.
                  </p>
                </div>
                <div className='absolute end-6 top-6 transition-transform duration-500 group-hover:scale-110'>
                  <div className='flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800'>
                    <GraduationCapIcon className='size-10 text-white' />
                  </div>
                </div>
              </Card>
            </MotionPreset>

            {/* Card 2 - Knowledge Base */}
            <MotionPreset fade blur slide={{ direction: 'down', offset: 15 }} delay={1} transition={{ duration: 0.5 }}>
              <Card className='bg-zinc-500/10 group relative h-full min-h-[280px] border-0 p-6 shadow-none'>
                <div className='absolute end-6 top-6 transition-transform duration-500 group-hover:scale-110'>
                  <div className='flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800'>
                    <BookOpenIcon className='size-10 text-white' />
                  </div>
                </div>
                <CardContent className='flex h-full flex-col justify-end p-0'>
                  <div className='space-y-4'>
                    <h3 className='text-3xl font-semibold'>Knowledge Base</h3>
                    <p className='text-muted-foreground text-lg'>
                      100+ Artikel zu allen Cold Email Themen - von Zustellbarkeit bis Compliance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>
          </div>

          {/* Grid Row 2 */}
          <div className='grid gap-6 lg:grid-cols-5'>
            {/* Card 3 - Tools */}
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 15 }}
              delay={1.1}
              transition={{ duration: 0.5 }}
              className='lg:col-span-2'
            >
              <Card className='h-full min-h-[280px] border-0 bg-zinc-500/10 shadow-none'>
                <CardContent className='flex flex-1 flex-col gap-4 p-6'>
                  <div className='flex min-h-38.5 flex-1 items-center justify-center'>
                    <div className='grid grid-cols-4 gap-3'>
                      {['SPF', 'DNS', 'MX', 'BL', 'SIG', 'ROI', 'VAL'].map((tool, i) => (
                        <div
                          key={tool}
                          className='flex size-14 items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-800 text-sm font-medium'
                        >
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-3xl font-semibold'>7 kostenlose Tools</h3>
                    <p className='text-muted-foreground text-lg'>SPF Generator, DNS Checker, Email Validator und mehr.</p>
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>

            {/* Card 4 - Praxis */}
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 15 }}
              delay={1.2}
              transition={{ duration: 0.5 }}
              className='lg:col-span-3'
            >
              <Card className='group h-full min-h-[280px] overflow-hidden border-0 bg-zinc-500/10 shadow-none'>
                <CardContent className='flex flex-1 items-end gap-4 p-6 max-sm:flex-wrap'>
                  <div className='space-y-4'>
                    <h3 className='text-3xl font-semibold'>Praxis-Übungen</h3>
                    <p className='text-muted-foreground text-lg'>Echte Übungen und Vorlagen für sofortige Anwendung.</p>
                  </div>

                  <div className='flex shrink-0 grow justify-center'>
                    <div className='flex size-32 items-center justify-center rounded-3xl bg-gradient-to-br from-zinc-700 to-zinc-800 transition-transform duration-500 group-hover:scale-105'>
                      <TargetIcon className='size-16 text-white' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
