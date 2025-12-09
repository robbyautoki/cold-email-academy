import { CircleCheckIcon } from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'

type FeatureItem = {
  title: string
  description: string
}

type FeatureSection = {
  badge: string
  title: string
  description: string
  features: FeatureItem[]
  image: {
    src: string
    darkSrc?: string
    alt: string
  }
}

type FeaturesProps = {
  sections: FeatureSection[]
}

const Features = ({ sections }: FeaturesProps) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='space-y-24'>
          {sections.map((section, sectionIndex) => {
            const isOdd = sectionIndex % 2 === 0 // 0-based index, so 0 is "first" (odd visual position)
            const contentOrder = isOdd ? 'order-1' : 'order-1 lg:order-2'
            const imageOrder = isOdd ? 'order-2' : 'order-2 lg:order-1'
            const imageDirection = isOdd ? 'right' : 'left'
            const imageJustify = isOdd ? 'lg:justify-end' : 'lg:justify-start'

            return (
              <div key={sectionIndex} className='grid items-center gap-12 lg:grid-cols-2 lg:gap-52'>
                {/* Content */}
                <div className={`space-y-6 ${contentOrder}`}>
                  <div className='space-y-4'>
                    <MotionPreset
                      fade
                      slide
                      transition={{ duration: 0.5 }}
                      className='text-primary text-sm font-medium uppercase'
                    >
                      {section.badge}
                    </MotionPreset>

                    <MotionPreset
                      component='h2'
                      className='text-2xl font-semibold md:text-3xl lg:text-4xl'
                      fade
                      slide
                      delay={0.3}
                      transition={{ duration: 0.5 }}
                    >
                      {section.title}
                    </MotionPreset>

                    <MotionPreset
                      component='p'
                      className='text-muted-foreground text-xl'
                      fade
                      slide
                      delay={0.6}
                      transition={{ duration: 0.5 }}
                    >
                      {section.description}
                    </MotionPreset>
                  </div>

                  <div className='space-y-3.5'>
                    {section.features.map((feature, featureIndex) => (
                      <MotionPreset
                        key={featureIndex}
                        className='flex items-start gap-3'
                        fade
                        slide
                        delay={0.9 + featureIndex * 0.2}
                        transition={{ duration: 0.5 }}
                      >
                        <CircleCheckIcon className='text-primary mt-0.5 size-6 shrink-0' />
                        <p className='text-lg'>
                          <span className='font-medium'>{feature.title}</span>{' '}
                          <span className='text-muted-foreground'>{feature.description}</span>
                        </p>
                      </MotionPreset>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <MotionPreset
                  fade
                  slide={{ direction: imageDirection, offset: 50 }}
                  delay={0.6}
                  transition={{ duration: 0.8 }}
                  className={`bg-muted group flex justify-center rounded-md p-6 transition-all duration-400 hover:p-0 ${imageJustify} ${imageOrder}`}
                >
                  {section.image.darkSrc ? (
                    <>
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className='h-auto w-full rounded-md dark:hidden'
                      />
                      <img
                        src={section.image.darkSrc}
                        alt={section.image.alt}
                        className='hidden h-auto w-full rounded-md dark:block'
                      />
                    </>
                  ) : (
                    <img src={section.image.src} alt={section.image.alt} className='h-auto w-full rounded-md' />
                  )}
                </MotionPreset>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
