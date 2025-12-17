'use client'

import { useState } from 'react'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, Loader2Icon, MailIcon, StarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Marquee } from '@/components/ui/marquee'

// Google Icon Component
const GoogleIcon = () => (
  <svg className='size-5' viewBox='0 0 24 24'>
    <path
      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
      fill='#4285F4'
    />
    <path
      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
      fill='#34A853'
    />
    <path
      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
      fill='#FBBC05'
    />
    <path
      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
      fill='#EA4335'
    />
  </svg>
)

const HeroSection = () => {
  const { signIn, isLoaded: signInLoaded } = useSignIn()
  const { signUp, isLoaded: signUpLoaded } = useSignUp()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signInLoaded || !signUpLoaded || !signIn || !signUp) return

    setIsLoading(true)
    setError('')

    try {
      // Versuche zuerst Sign-In (bestehender User)
      const signInResult = await signIn.create({
        identifier: email,
      })

      // Prüfe ob email_code verfügbar ist
      const emailCodeFactor = signInResult.supportedFirstFactors?.find(
        (factor) => factor.strategy === 'email_code'
      )

      if (emailCodeFactor && 'emailAddressId' in emailCodeFactor) {
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId: emailCodeFactor.emailAddressId,
        })
        // Weiterleitung zur Login-Seite mit Email als Parameter
        router.push(`/login?email=${encodeURIComponent(email)}&step=code`)
      } else {
        setError('E-Mail-Verifizierung nicht verfügbar.')
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ code: string; message: string }> }

      // User existiert nicht → Sign-Up
      if (clerkError.errors?.[0]?.code === 'form_identifier_not_found') {
        try {
          await signUp.create({
            emailAddress: email,
          })

          await signUp.prepareEmailAddressVerification({
            strategy: 'email_code',
          })

          // Weiterleitung zur Login-Seite mit Email als Parameter
          router.push(`/login?email=${encodeURIComponent(email)}&step=code&new=true`)
        } catch (signUpErr: unknown) {
          const signUpError = signUpErr as { errors?: Array<{ code: string; message: string }> }
          setError(signUpError.errors?.[0]?.message || 'Ein Fehler ist aufgetreten.')
        }
      } else {
        setError(clerkError.errors?.[0]?.message || 'Ein Fehler ist aufgetreten.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    if (!signUp) {
      console.error('signUp not loaded')
      return
    }

    try {
      const baseUrl = window.location.origin
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: `${baseUrl}/sso-callback`,
        redirectUrlComplete: `${baseUrl}/sso-callback`,
      })
    } catch (err) {
      console.error('Google OAuth Error:', err)
      const clerkError = err as { errors?: Array<{ code: string; message: string; longMessage?: string }> }
      const errorMessage = clerkError.errors?.[0]?.longMessage || clerkError.errors?.[0]?.message || 'Google-Anmeldung fehlgeschlagen.'
      setError(errorMessage)
    }
  }
  return (
    <section className='relative flex-1 overflow-hidden pt-32 pb-8 sm:pb-16 lg:pb-24'>
      <div className='mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'>
        {/* Hero Content */}
        <div className='flex max-w-3xl flex-col items-center gap-4 text-center'>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <Badge variant='outline' className='text-sm font-normal'>
              100% Kostenlos
            </Badge>
          </MotionPreset>

          <MotionPreset
            component='h1'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-2xl font-semibold sm:text-3xl lg:text-5xl lg:font-bold'
          >
            Cold Email Academy
          </MotionPreset>

          <MotionPreset
            component='p'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-muted-foreground max-w-2xl text-xl'
          >
            Deine zentrale Anlaufstelle rund um Cold Emails in Deutschland.
            Playbooks, Checklisten, Tools und geballtes Wissen - alles kostenlos.
          </MotionPreset>

          {/* Registrierungs-Formular */}
          <MotionPreset
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.9}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='w-full max-w-md'
          >
            <div className='w-full space-y-4 mt-4'>
              {/* Google Button */}
              <Button
                type='button'
                variant='outline'
                className='w-full h-11 text-base'
                onClick={handleGoogleSignIn}
              >
                <GoogleIcon />
                <span className='ml-2'>Mit Google registrieren</span>
              </Button>

              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background text-muted-foreground px-2'>oder</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className='flex gap-2'>
                <div className='relative flex-1'>
                  <MailIcon className='text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2' />
                  <Input
                    type='email'
                    placeholder='deine@email.de'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='pl-10 h-11'
                    required
                  />
                </div>
                <Button type='submit' className='h-11 px-6' disabled={isLoading || !email}>
                  {isLoading ? (
                    <Loader2Icon className='size-5 animate-spin' />
                  ) : (
                    <>
                      Kostenlos starten <ArrowRightIcon className='ml-1 size-4' />
                    </>
                  )}
                </Button>
              </form>

              {error && <p className='text-destructive text-sm text-center'>{error}</p>}

              {/* CAPTCHA Element */}
              <div id='clerk-captcha' />
            </div>
          </MotionPreset>

          {/* Social Proof */}
          <MotionPreset
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={1}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex items-center gap-3'
          >
            <div className='flex -space-x-2'>
              <Avatar className='ring-background size-8 ring-2'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' alt='User' />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar className='ring-background size-8 ring-2'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png' alt='User' />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <Avatar className='ring-background size-8 ring-2'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png' alt='User' />
                <AvatarFallback>AW</AvatarFallback>
              </Avatar>
              <Avatar className='ring-background size-8 ring-2'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='User' />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
            </div>
            <p className='text-muted-foreground text-sm'>
              Bereits <span className='text-primary font-medium'>500+</span> Nutzer
            </p>
          </MotionPreset>
        </div>
        <div className='relative w-full max-w-5xl'>
          <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent' />
          <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l to-transparent' />
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={1.1} transition={{ duration: 0.5 }}>
            <Marquee pauseOnHover duration={60} gap={6}>
              {[
                { text: 'Endlich eine deutsche Ressource für Cold Emails!', author: 'Marco S.' },
                { text: 'Die Playbooks sind Gold wert. Habe meine Reply Rate verdoppelt.', author: 'Sarah K.' },
                { text: 'Beste Cold Email Academy im DACH-Raum.', author: 'Thomas M.' },
                { text: 'Der Email Kalkulator spart mir jede Woche Stunden.', author: 'Julia R.' },
                { text: 'Kompakt, praxisnah und kostenlos - was will man mehr?', author: 'David L.' },
                { text: 'Hat mir geholfen, meine erste Kampagne aufzusetzen.', author: 'Lisa B.' },
              ].map((review, i) => (
                <div key={i} className='flex items-center gap-3 px-2'>
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_, j) => (
                      <StarIcon key={j} className='size-4 fill-yellow-400 text-yellow-400' />
                    ))}
                  </div>
                  <span className='text-muted-foreground text-sm'>&quot;{review.text}&quot;</span>
                  <span className='text-foreground/70 text-sm font-medium'>— {review.author}</span>
                </div>
              ))}
            </Marquee>
          </MotionPreset>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
