import Image from 'next/image'

// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Image src='/logo-new.svg' alt='Academy' width={34} height={34} className='rounded-lg' />
      <div className='hidden sm:flex sm:flex-col'>
        <span className='text-base font-semibold leading-tight'>Academy</span>
        <span className='text-muted-foreground text-xs'>auto.ki</span>
      </div>
    </div>
  )
}

export default Logo
