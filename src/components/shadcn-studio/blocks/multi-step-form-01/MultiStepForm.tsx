'use client'

import { Fragment, useState } from 'react'

import * as Stepperize from '@stepperize/react'
import { CheckCircleIcon, ChevronRightIcon, HomeIcon, UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

import AccountDetailsStep from '@/components/shadcn-studio/blocks/multi-step-form-01/AccountDetailsStep'
import PersonalInformationStep from '@/components/shadcn-studio/blocks/multi-step-form-01/PersonalInformationStep'
import CompleteStep from '@/components/shadcn-studio/blocks/multi-step-form-01/CompleteStep'

const { useStepper, utils } = Stepperize.defineStepper(
  {
    id: 'multi-step-1-account-details',
    title: 'Account Details',
    description: 'Setup Account Details',
    icon: HomeIcon
  },
  { id: 'multi-step-1-personal-info', title: 'Personal Information', description: 'Add Personal Info', icon: UserIcon },
  { id: 'multi-step-1-complete', title: 'Submitted', description: 'Form Submitted', icon: CheckCircleIcon }
)

export type StepperType = ReturnType<typeof useStepper>

export interface OnboardingData {
  firstName: string
  lastName: string
  companyName: string
  industry: string
  revenue: string
  referralSource: string
  linkedinUrl: string
}

const MultiStepForm = () => {
  const stepper = useStepper()
  const currentStep = utils.getIndex(stepper.current.id)

  const [formData, setFormData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    companyName: '',
    industry: '',
    revenue: '',
    referralSource: '',
    linkedinUrl: '',
  })

  const updateFormData = (data: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  return (
    <div className='flex w-full max-w-200 flex-col gap-12'>
      <nav aria-label='Multi Steps'>
        <ol className='flex items-center justify-between gap-x-2 gap-y-4 max-md:flex-col max-md:items-start'>
          {stepper.all
            .filter(step => step.id !== 'multi-step-1-complete')
            .map((step, index, array) => (
              <Fragment key={step.id}>
                <li>
                  <Button
                    variant='ghost'
                    className='h-auto shrink-0 cursor-pointer gap-2 rounded !bg-transparent p-0'
                    onClick={() => stepper.goTo(step.id)}
                  >
                    <Avatar className='size-9.5'>
                      <AvatarFallback
                        className={cn({ 'bg-primary text-primary-foreground shadow-sm': index <= currentStep })}
                      >
                        <step.icon className='size-4' />
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start'>
                      <span>{step.title}</span>
                      <span className='text-muted-foreground text-sm'>{step.description}</span>
                    </div>
                  </Button>
                </li>
                {index < array.length - 1 && (
                  <li className='max-md:hidden'>
                    <ChevronRightIcon className='size-4' />
                  </li>
                )}
              </Fragment>
            ))}
        </ol>
      </nav>
      <div className='flex flex-col gap-6'>
        {stepper.switch({
          'multi-step-1-account-details': () => (
            <AccountDetailsStep stepper={stepper} formData={formData} updateFormData={updateFormData} />
          ),
          'multi-step-1-personal-info': () => (
            <PersonalInformationStep stepper={stepper} formData={formData} updateFormData={updateFormData} />
          ),
          'multi-step-1-complete': () => <CompleteStep stepper={stepper} formData={formData} />
        })}
      </div>
    </div>
  )
}

export default MultiStepForm
