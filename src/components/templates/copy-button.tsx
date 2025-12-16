'use client'

import { useState } from 'react'
import { CopyIcon, CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function CopyButton({ text, className, variant = 'outline', size = 'sm' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn('gap-1.5 transition-all', className)}
    >
      {copied ? (
        <>
          <CheckIcon className="size-4 text-primary" />
          <span className="text-primary">Kopiert!</span>
        </>
      ) : (
        <>
          <CopyIcon className="size-4" />
          <span>Kopieren</span>
        </>
      )}
    </Button>
  )
}
