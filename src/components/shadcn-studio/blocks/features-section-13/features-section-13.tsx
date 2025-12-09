import type { ComponentType } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { MotionPreset } from '@/components/ui/motion-preset'

type Features = {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}[]

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset
            className='text-primary text-sm font-medium uppercase'
            fade
            slide={{ direction: 'down', offset: 30 }}
            blur
            transition={{ duration: 0.5 }}
          >
            Our Best Features
          </MotionPreset>

          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            delay={0.2}
            transition={{ duration: 0.6 }}
          >
            Clarity drives growth and opens opportunities.
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground mx-auto max-w-3xl text-xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            We provide all the advantages that can simplify all your good design requirement without any further
            requirements
          </MotionPreset>

          <MotionPreset fade slide={{ direction: 'down', offset: 30 }} blur delay={0.4} transition={{ duration: 0.5 }}>
            <Button size='lg' className='rounded-lg text-base' asChild>
              <a href='#'>Learn more</a>
            </Button>
          </MotionPreset>
        </div>

        {/* Features Grid */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {featuresList.map((feature, index) => (
            <MotionPreset
              key={index}
              fade
              slide={{ direction: 'up', offset: 40 }}
              blur
              delay={0.6 + index * 0.1}
              transition={{ duration: 0.5 }}
            >
              <Card className='hover:border-primary h-full border shadow-none transition-colors duration-300'>
                <CardContent className='flex gap-4'>
                  <Avatar className='size-9 rounded-md'>
                    <AvatarFallback className='bg-card-foreground/10 text-card-foreground rounded-md [&>svg]:size-6'>
                      <feature.icon />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h6 className='mb-1 text-lg font-semibold'>{feature.title}</h6>
                    <p className='text-muted-foreground leading-relaxed'>{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
