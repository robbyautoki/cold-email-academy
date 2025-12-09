'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Loader2Icon, CheckCircle2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { StepperType, OnboardingData } from '@/components/shadcn-studio/blocks/multi-step-form-01/MultiStepForm'

interface CompleteStepProps {
  stepper: StepperType
  formData: OnboardingData
}

const CompleteStep = ({ stepper, formData }: CompleteStepProps) => {
  const router = useRouter()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const saveUserData = async () => {
      if (!user) return

      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            tag: 'academy',
            firstName: formData.firstName,
            lastName: formData.lastName,
            companyName: formData.companyName || undefined,
            industry: formData.industry || undefined,
            revenue: formData.revenue || undefined,
            referralSource: formData.referralSource || undefined,
            linkedinUrl: formData.linkedinUrl || undefined,
            onboardingCompleted: true,
            onboardingCompletedAt: new Date().toISOString(),
          },
        })

        // Webhook für Profil-Update nach Onboarding triggern
        try {
          await fetch('/api/webhooks/trigger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'profileUpdate',
              data: {
                email: user.primaryEmailAddress?.emailAddress || '',
                firstName: formData.firstName,
                lastName: formData.lastName,
                industry: formData.industry || '',
                revenue: formData.revenue || '',
                linkedinUrl: formData.linkedinUrl || ''
              }
            })
          })
        } catch (webhookError) {
          console.error('Webhook error:', webhookError)
          // Fehler nicht an User zeigen, da Onboarding erfolgreich war
        }

        setIsSaved(true)
      } catch (err) {
        console.error('Error saving user data:', err)
        setError('Fehler beim Speichern. Bitte versuche es erneut.')
      } finally {
        setIsLoading(false)
      }
    }

    saveUserData()
  }, [user, formData])

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-12'>
        <Loader2Icon className='size-8 animate-spin text-primary' />
        <p className='text-muted-foreground'>Daten werden gespeichert...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-start'>
          <h2 className='text-2xl font-semibold text-destructive'>Fehler</h2>
          <p className='text-muted-foreground'>{error}</p>
        </div>
        <div className='flex justify-end'>
          <Button size='lg' onClick={() => window.location.reload()}>
            Erneut versuchen
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col items-center gap-4 py-8'>
        <CheckCircle2Icon className='size-16 text-green-500' />
        <h2 className='text-2xl font-semibold'>Willkommen, {formData.firstName}!</h2>
        <p className='text-muted-foreground text-center'>
          Dein Profil wurde erfolgreich eingerichtet. Du kannst jetzt loslegen!
        </p>
      </div>
      <div className='flex justify-center'>
        <Button size='lg' onClick={handleGoToDashboard}>
          Zum Dashboard
        </Button>
      </div>
    </div>
  )
}

export default CompleteStep
