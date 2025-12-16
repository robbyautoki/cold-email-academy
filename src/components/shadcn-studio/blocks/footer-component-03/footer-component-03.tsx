import { Separator } from '@/components/ui/separator'

import Image from 'next/image'

const Footer = () => {
  return (
    <footer>
      <Separator />

      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-6'>
        <a href='/' className='flex items-center gap-2.5'>
          <Image src='/logo-new.svg' alt='Academy' width={32} height={32} className='rounded-lg' />
          <span className='text-xl font-semibold'>Academy</span>
        </a>
        <p className='font-medium'>
          {`©${new Date().getFullYear()}`} <a href='https://auto.ki' target='_blank' rel='noopener'>auto.ki</a> - Cold Email Academy
        </p>
      </div>
    </footer>
  )
}

export default Footer
