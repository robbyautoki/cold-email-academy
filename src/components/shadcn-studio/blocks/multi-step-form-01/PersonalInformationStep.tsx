'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { StepperType, OnboardingData } from '@/components/shadcn-studio/blocks/multi-step-form-01/MultiStepForm'

interface PersonalInformationStepProps {
  stepper: StepperType
  formData: OnboardingData
  updateFormData: (data: Partial<OnboardingData>) => void
}

const industries = [
  'E-Commerce',
  'SaaS / Software',
  'Agentur / Beratung',
  'Coaching / Training',
  'Gesundheit / Fitness',
  'Immobilien',
  'Finanzen / Versicherung',
  'Handwerk / Produktion',
  'Gastronomie / Hotellerie',
  'Sonstiges',
]

const revenueRanges = [
  'Noch kein Umsatz',
  '0 - 10.000 EUR',
  '10.000 - 50.000 EUR',
  '50.000 - 100.000 EUR',
  '100.000 - 500.000 EUR',
  '500.000 - 1 Mio EUR',
  '1 Mio - 5 Mio EUR',
  'Mehr als 5 Mio EUR',
]

const referralSources = [
  'Google Suche',
  'YouTube',
  'Instagram',
  'TikTok',
  'LinkedIn',
  'Facebook',
  'Empfehlung / Freunde',
  'Podcast',
  'Werbung',
  'Sonstiges',
]

const PersonalInformationStep = ({ stepper, formData, updateFormData }: PersonalInformationStepProps) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col items-start'>
        <h2 className='text-2xl font-semibold'>Mehr zu dir</h2>
        <p className='text-muted-foreground'>Diese Angaben sind optional</p>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        <div className='flex flex-col items-start gap-1 sm:col-span-2'>
          <Label htmlFor='multi-step-personal-info-company'>Unternehmensname</Label>
          <Input
            id='multi-step-personal-info-company'
            placeholder='Meine Firma GmbH'
            value={formData.companyName}
            onChange={e => updateFormData({ companyName: e.target.value })}
          />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-personal-info-industry'>Branche</Label>
          <Select value={formData.industry} onValueChange={value => updateFormData({ industry: value })}>
            <SelectTrigger id='multi-step-personal-info-industry'>
              <SelectValue placeholder='Branche auswahlen' />
            </SelectTrigger>
            <SelectContent>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col items-start gap-1'>
          <Label htmlFor='multi-step-personal-info-revenue'>Jahresumsatz</Label>
          <Select value={formData.revenue} onValueChange={value => updateFormData({ revenue: value })}>
            <SelectTrigger id='multi-step-personal-info-revenue'>
              <SelectValue placeholder='Umsatz auswahlen' />
            </SelectTrigger>
            <SelectContent>
              {revenueRanges.map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col items-start gap-1 sm:col-span-2'>
          <Label htmlFor='multi-step-personal-info-referral'>Wie hast du von uns erfahren?</Label>
          <Select value={formData.referralSource} onValueChange={value => updateFormData({ referralSource: value })}>
            <SelectTrigger id='multi-step-personal-info-referral'>
              <SelectValue placeholder='Quelle auswahlen' />
            </SelectTrigger>
            <SelectContent>
              {referralSources.map(source => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col items-start gap-1 sm:col-span-2'>
          <Label htmlFor='multi-step-personal-info-linkedin'>LinkedIn URL</Label>
          <Input
            id='multi-step-personal-info-linkedin'
            type='url'
            placeholder='https://linkedin.com/in/dein-profil'
            value={formData.linkedinUrl}
            onChange={e => updateFormData({ linkedinUrl: e.target.value })}
          />
        </div>
      </div>
      <div className='flex justify-between gap-4'>
        <Button variant='secondary' size='lg' onClick={stepper.prev}>
          <ArrowLeftIcon />
          Zuruck
        </Button>
        <Button size='lg' onClick={stepper.next}>
          Abschliessen
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}

export default PersonalInformationStep
