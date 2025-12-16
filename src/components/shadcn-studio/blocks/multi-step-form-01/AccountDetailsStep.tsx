'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { ArrowRightIcon, Loader2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { StepperType, OnboardingData } from '@/components/shadcn-studio/blocks/multi-step-form-01/MultiStepForm'

interface AccountDetailsStepProps {
  stepper: StepperType
  formData: OnboardingData
  updateFormData: (data: Partial<OnboardingData>) => void
}

const AccountDetailsStep = ({ stepper, formData, updateFormData }: AccountDetailsStepProps) => {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const canProceed = formData.firstName.trim() !== '' && formData.lastName.trim() !== ''

  const handleNext = async () => {
    if (!canProceed) return

    setIsLoading(true)

    // Registration Webhook mit Pflichtdaten (Vorname + Nachname)
    try {
      await fetch('/api/webhooks/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress || '',
          fullName: `${formData.firstName} ${formData.lastName}`.trim()
        })
      })
    } catch (err) {
      console.error('Registration webhook error:', err)
    }

    setIsLoading(false)
    stepper.next()
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col items-start'>
        <h2 className='text-2xl font-semibold'>Willkommen!</h2>
        <p className='text-muted-foreground'>Wie heisst du?</p>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-account-firstname'>
            Vorname <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='multi-step-account-firstname'
            placeholder='Max'
            value={formData.firstName}
            onChange={e => updateFormData({ firstName: e.target.value })}
            required
          />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-account-lastname'>
            Nachname <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='multi-step-account-lastname'
            placeholder='Mustermann'
            value={formData.lastName}
            onChange={e => updateFormData({ lastName: e.target.value })}
            required
          />
        </div>
      </div>
      <div className='flex justify-end gap-4'>
        <Button size='lg' onClick={handleNext} disabled={!canProceed || isLoading}>
          {isLoading ? <Loader2Icon className='animate-spin' /> : 'Weiter'}
          {!isLoading && <ArrowRightIcon />}
        </Button>
      </div>
    </div>
  )
}

export default AccountDetailsStep
