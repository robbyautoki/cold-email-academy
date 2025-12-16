import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'

import Features from '@/components/shadcn-studio/blocks/bento-grid-01/features'

const BentoGrid = () => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        {/* Header Section */}
        <div className='space-y-4 text-center'>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='text-sm font-normal'>
              Features
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
            Alles was du brauchst
          </MotionPreset>

          <MotionPreset
            component='p'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5 }}
            className='text-muted-foreground text-xl'
          >
            Playbooks, Checklisten, Tools und geballtes Wissen - alles kostenlos für deinen Cold Email Erfolg.
          </MotionPreset>
        </div>

        {/* Feature Cards */}
        <Features />
      </div>
    </section>
  )
}

export default BentoGrid
