'use client'

import { cn } from '@/lib/utils'

interface AILoaderProps {
  size?: number
  className?: string
}

export function AILoader({ size = 16, className }: AILoaderProps) {
  return (
    <div
      role="status"
      aria-label="Generiere..."
      className={cn('inline-flex items-center justify-center', className)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin"
        style={{ animationDuration: '1s' }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-20"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
