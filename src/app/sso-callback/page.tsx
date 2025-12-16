'use client'

import { useEffect, useState, useRef } from 'react'
import { useClerk, useUser, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk()
  const { user, isLoaded } = useUser()
  const { signUp } = useSignUp()
  const router = useRouter()
  const [callbackDone, setCallbackDone] = useState(false)
  const [error, setError] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const hasRun = useRef(false)

  useEffect(() => {
    // Verhindere doppelte Ausführung (React Strict Mode)
    if (hasRun.current) return
    hasRun.current = true

    const handleCallback = async () => {
      try {
        // handleRedirectCallback verarbeitet den OAuth-Callback
        const result = await handleRedirectCallback({})
        console.log('SSO Callback result:', result)

        // Prüfe ob es ein neuer User war
        if (signUp?.createdSessionId) {
          setIsNewUser(true)
        }

        setCallbackDone(true)
      } catch (err) {
        console.error('SSO Callback Error:', err)
        setError(true)
        // Kurze Verzögerung vor Redirect
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      }
    }

    handleCallback()
  }, [handleRedirectCallback, router, signUp])

  useEffect(() => {
    // Warte bis Callback fertig UND User geladen
    if (callbackDone && isLoaded && user) {
      const onboardingCompleted = user.unsafeMetadata?.onboardingCompleted as boolean | undefined
      const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0
      const now = Date.now()
      const isRecentlyCreated = (now - createdAt) < 60000 // Weniger als 1 Minute alt

      console.log('SSO User:', user.id, 'onboardingCompleted:', onboardingCompleted, 'isRecentlyCreated:', isRecentlyCreated)

      // Neuer User oder kein Onboarding → Welcome
      if (!onboardingCompleted || isNewUser || isRecentlyCreated) {
        router.push('/welcome')
      } else {
        router.push('/dashboard')
      }
    }
  }, [callbackDone, isLoaded, user, router, isNewUser])

  if (error) {
    return (
      <div className='flex h-dvh items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <p className='text-muted-foreground'>Fehler bei der Anmeldung. Weiterleitung...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-dvh items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <Loader2Icon className='size-8 animate-spin' />
        <p className='text-muted-foreground'>Anmeldung wird abgeschlossen...</p>
      </div>
    </div>
  )
}
