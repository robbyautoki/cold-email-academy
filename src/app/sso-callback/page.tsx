'use client'

import { useEffect, useState } from 'react'
import { useClerk, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk()
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [callbackDone, setCallbackDone] = useState(false)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Kein afterSignInUrl/afterSignUpUrl - wir machen die Weiterleitung selbst
        await handleRedirectCallback({})
        setCallbackDone(true)
      } catch {
        router.push('/sign-in')
      }
    }

    handleCallback()
  }, [handleRedirectCallback, router])

  useEffect(() => {
    // Warte bis Callback fertig UND User geladen
    if (callbackDone && isLoaded && user) {
      const onboardingCompleted = user.unsafeMetadata?.onboardingCompleted as boolean | undefined

      if (onboardingCompleted) {
        router.push('/dashboard')
      } else {
        router.push('/welcome')
      }
    }
  }, [callbackDone, isLoaded, user, router])

  return (
    <div className='flex h-dvh items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <Loader2Icon className='size-8 animate-spin' />
        <p className='text-muted-foreground'>Anmeldung wird abgeschlossen...</p>
      </div>
    </div>
  )
}
