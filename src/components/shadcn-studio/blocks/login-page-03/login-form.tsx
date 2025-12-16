'use client'

import { useState } from 'react'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Loader2Icon, MailIcon, ArrowLeftIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

// Google Icon Component
const GoogleIcon = () => (
  <svg className='mr-2 size-5' viewBox='0 0 24 24'>
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

// Main LoginForm Component
const LoginForm = () => {
  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn()
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp()
  const router = useRouter()

  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)

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
        setIsNewUser(false)
        setStep('code')
      } else {
        setError('E-Mail-Code-Verifizierung nicht verfügbar. Bitte prüfe die Clerk Dashboard Einstellungen.')
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

          setIsNewUser(true)
          setStep('code')
        } catch (signUpErr: unknown) {
          const signUpError = signUpErr as { errors?: Array<{ code: string; message: string }> }

          if (signUpError.errors?.[0]?.code === 'form_identifier_exists') {
            setError('Diese E-Mail ist bereits registriert. Bitte versuche es erneut.')
          } else {
            setError(signUpError.errors?.[0]?.message || 'Ein Fehler ist aufgetreten.')
          }
        }
      } else {
        setError(clerkError.errors?.[0]?.message || 'Ein Fehler ist aufgetreten.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signIn || !signUp) return

    setIsLoading(true)
    setError('')

    try {
      if (isNewUser) {
        // Sign-Up Verifizierung
        const result = await signUp.attemptEmailAddressVerification({ code })
        console.log('SignUp result:', result)

        if (result.status === 'complete') {
          await setSignUpActive?.({ session: result.createdSessionId })

          // Webhook für neue Registrierung triggern
          try {
            await fetch('/api/webhooks/trigger', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event: 'registration',
                data: {
                  email,
                  fullName: email.split('@')[0] // Name kommt später im Onboarding
                }
              })
            })
          } catch (webhookError) {
            console.error('Webhook error:', webhookError)
            // Fehler nicht an User zeigen, da Registrierung erfolgreich war
          }

          router.push('/welcome') // Neue User → Onboarding
        } else {
          setError(`Unerwarteter Status: ${result.status}`)
        }
      } else {
        // Sign-In Verifizierung
        const result = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code,
        })
        console.log('SignIn result:', result)

        if (result.status === 'complete') {
          await setSignInActive?.({ session: result.createdSessionId })
          router.push('/dashboard')
        } else {
          setError(`Unerwarteter Status: ${result.status}`)
        }
      }
    } catch (err: unknown) {
      console.error('Code verification error:', err)
      const clerkError = err as { errors?: Array<{ code: string; message: string; longMessage?: string }> }
      const errorMessage = clerkError.errors?.[0]?.longMessage || clerkError.errors?.[0]?.message || 'Ungültiger Code. Bitte versuche es erneut.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    if (!signUp) return

    try {
      // signUp.authenticateWithRedirect funktioniert für neue UND bestehende User
      // Bei bestehenden Usern transferiert Clerk automatisch zum Sign-In
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/sso-callback',
      })
    } catch {
      setError('Google-Anmeldung fehlgeschlagen.')
    }
  }

  const handleBack = () => {
    setStep('email')
    setCode('')
    setError('')
  }

  return (
    <div className='relative'>
      {/* EMAIL STEP */}
      {step === 'email' && (
        <form className='space-y-4' onSubmit={handleEmailSubmit}>
          <div className='space-y-1'>
            <Label className='leading-5' htmlFor='userEmail'>
              E-Mail-Adresse
            </Label>
            <div className='relative'>
              <MailIcon className='text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2' />
              <Input
                type='email'
                id='userEmail'
                placeholder='deine@email.de'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='pl-10'
                required
                autoComplete='email'
              />
            </div>
          </div>

          {error && <p className='text-destructive text-sm'>{error}</p>}

          {/* CAPTCHA Element - muss VOR signIn.create() im DOM sein */}
          <div id='clerk-captcha' />

          <Button className='w-full' type='submit' disabled={isLoading || !email}>
            {isLoading ? (
              <>
                <Loader2Icon className='mr-2 size-4 animate-spin' />
                Code wird gesendet...
              </>
            ) : (
              'Code senden'
            )}
          </Button>

          <div className='relative py-2'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background text-muted-foreground px-2'>oder</span>
            </div>
          </div>

          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            Mit Google anmelden
          </Button>
        </form>
      )}

      {/* CODE STEP */}
      {step === 'code' && (
        <form className='space-y-6' onSubmit={handleCodeSubmit}>
          <button
            type='button'
            onClick={handleBack}
            className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors'
          >
            <ArrowLeftIcon className='size-4' />
            Zurück
          </button>

          <div className='space-y-2'>
            <Label className='text-base leading-5'>Bestätigungscode</Label>
            <p className='text-muted-foreground text-sm'>
              Wir haben einen 6-stelligen Code an <strong>{email}</strong> gesendet.
            </p>
          </div>

          <div className='flex justify-center py-4'>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              autoFocus
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && <p className='text-destructive text-center text-sm'>{error}</p>}

          <Button className='w-full' type='submit' disabled={isLoading || code.length !== 6}>
            {isLoading ? (
              <>
                <Loader2Icon className='mr-2 size-4 animate-spin' />
                Wird überprüft...
              </>
            ) : (
              'Bestätigen'
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

export default LoginForm
