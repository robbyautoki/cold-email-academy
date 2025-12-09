import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

import TestimonialCard from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonial-card'

export type TestimonialItem = {
  name: string
  handle: string
  avatar: string
  rating: number
  title: string
  content: string
  platformName: string
  platformImage: string
}

const defaultTestimonials: TestimonialItem[] = [
  {
    name: 'Sarah Müller',
    handle: '@sarah_mueller',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    rating: 5,
    title: 'Endlich verstehe ich Cold Email!',
    content: 'Die Schritt-für-Schritt Anleitungen sind Gold wert. Ich habe innerhalb von 2 Wochen meine ersten Deals abgeschlossen.',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Michael Koch',
    handle: '@michael_koch',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    rating: 5,
    title: 'Die Tools sparen mir Stunden',
    content: 'Besonders der SPF Generator und der DNS Checker sind genial. Endlich habe ich meine Zustellbarkeit im Griff.',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Anna Weber',
    handle: '@anna_weber',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    rating: 5,
    title: 'Kostenlos und besser als bezahlte Kurse',
    content: 'Ich habe schon mehrere Cold Email Kurse gekauft. Dieser kostenlose Kurs ist ehrlich gesagt besser als die meisten.',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Thomas Schmidt',
    handle: '@thomas_schmidt',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
    rating: 5,
    title: 'Knowledge Base ist mega',
    content: 'Die Artikel sind super detailliert. Jedes Mal wenn ich eine Frage habe, finde ich die Antwort in der Knowledge Base.',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Lisa Hoffmann',
    handle: '@lisa_hoffmann',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
    rating: 5,
    title: 'Perfekt für Einsteiger',
    content: 'Als Anfängerin war ich unsicher wo ich anfangen soll. Der strukturierte Kursaufbau hat mir sehr geholfen.',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Jan Becker',
    handle: '@jan_becker',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
    rating: 5,
    title: 'Praxis-Vorlagen sind top',
    content: 'Die Email-Vorlagen funktionieren wirklich. Meine Response-Rate ist von 2% auf 12% gestiegen!',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Julia Fischer',
    handle: '@julia_fischer',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    rating: 5,
    title: 'Compliance endlich verstanden',
    content: 'Der rechtliche Teil ist super wichtig. Hier habe ich endlich verstanden was ich beachten muss.',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Markus Wagner',
    handle: '@markus_wagner',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    rating: 5,
    title: 'Sehr empfehlenswert',
    content: 'Klare Empfehlung für alle, die Cold Email lernen wollen. Qualität auf höchstem Niveau - und das kostenlos!',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Sandra Braun',
    handle: '@sandra_braun',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    rating: 5,
    title: 'Tolle Community',
    content: 'Die Kurse sind super, aber auch der Support ist klasse. Fragen werden schnell beantwortet.',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'David Klein',
    handle: '@david_klein',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
    rating: 5,
    title: 'ROI Kalkulator ist genial',
    content: 'Mit dem Kalkulator konnte ich meinem Chef zeigen, warum Cold Email Sinn macht. Budget genehmigt!',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Christina Lang',
    handle: '@christina_lang',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
    rating: 5,
    title: 'Blacklist Checker hat mich gerettet',
    content: 'Dank dem Blacklist Prüfer habe ich entdeckt, dass meine Domain auf einer Blacklist war. Sofort beheben können!',
    platformName: 'Verifiziert',
    platformImage: ''
  },
  {
    name: 'Peter Richter',
    handle: '@peter_richter',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
    rating: 5,
    title: 'Beste kostenlose Ressource',
    content: 'Ich habe viele Cold Email Ressourcen durchgeschaut. Diese hier ist mit Abstand die beste kostenlose Option.',
    platformName: 'Verifiziert',
    platformImage: ''
  }
]

type TestimonialsComponentProps = {
  testimonials?: TestimonialItem[]
}

const TestimonialsComponent = ({ testimonials = defaultTestimonials }: TestimonialsComponentProps) => {
  return (
    <section className='bg-muted pt-8 sm:pt-16 lg:pt-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        {/* Hero Header */}
        <div className='space-y-6 text-center sm:space-y-7.5 lg:space-y-9'>
          <MotionPreset
            component='h2'
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            className='text-primary z-1 inline-block text-3xl font-bold sm:text-4xl lg:text-5xl'
          >
            &ldquo;Einfach genial...&rdquo;
          </MotionPreset>

          <MotionPreset fade slide={{ direction: 'down' }} delay={0.3} transition={{ duration: 0.5 }}>
            <p className='text-muted-foreground text-base font-medium sm:text-2xl max-w-3xl mx-auto'>
              Hunderte Nutzer haben bereits mit unseren Kursen und Tools ihre Cold Email Skills verbessert.
            </p>
          </MotionPreset>
        </div>

        {/* Testimonials Marquee */}
        <MotionPreset
          fade
          slide={{ direction: 'down' }}
          delay={0.6}
          transition={{ duration: 0.5 }}
          className='relative grid sm:grid-cols-2 lg:grid-cols-4'
        >
          <div className='from-muted absolute top-0 z-1 h-1/3 w-full bg-gradient-to-b to-transparent' />
          <Marquee vertical pauseOnHover delay={0.9} duration={20} gap={1.5} className='h-200'>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={20} gap={1.5} reverse className='h-200 max-sm:hidden'>
            {testimonials.slice(3, 6).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={20} gap={1.5} className='h-200 max-lg:hidden'>
            {testimonials.slice(6, 9).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={20} gap={1.5} reverse className='h-200 max-lg:hidden'>
            {testimonials.slice(9, 12).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
        </MotionPreset>
      </div>
    </section>
  )
}

export default TestimonialsComponent
