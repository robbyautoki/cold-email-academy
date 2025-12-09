'use client'

import { ArrowRightIcon } from 'lucide-react'

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
  const canProceed = formData.firstName.trim() !== '' && formData.lastName.trim() !== ''

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
        <Button size='lg' onClick={stepper.next} disabled={!canProceed}>
          Weiter
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}

export default AccountDetailsStep
