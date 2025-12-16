import Image from 'next/image'
import MultiStep01SVG from '@/assets/svg/multi-step-01'
import MultiStepForm from '@/components/shadcn-studio/blocks/multi-step-form-01/MultiStepForm'

const WelcomePage = () => {
  return (
    <div className='flex size-full min-h-dvh flex-col lg:grid lg:grid-cols-12'>
      <div className='bg-muted col-span-4 flex flex-col overflow-hidden max-lg:hidden'>
        <div className='flex items-start p-6'>
          <a href='#' className='flex items-center gap-2.5'>
            <Image src='/logo-new.svg' alt='Academy' width={32} height={32} className='rounded-lg' />
            <span className='text-xl font-semibold'>Academy</span>
          </a>
        </div>
        <div className='flex size-full items-center justify-center p-6'>
          <MultiStep01SVG />
        </div>
      </div>
      <div className='flex items-start p-4 sm:p-6 lg:hidden'>
        <a href='#' className='flex items-center gap-2.5'>
          <Image src='/logo-new.svg' alt='Academy' width={32} height={32} className='rounded-lg' />
          <span className='text-xl font-semibold'>Academy</span>
        </a>
      </div>
      <div className='col-span-8 flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8'>
        <MultiStepForm />
      </div>
    </div>
  )
}

export default WelcomePage
