'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw, Save, User, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface AIActionsProps {
  onCopy: () => void
  onRegenerate: () => void
  onSaveVersion: () => void
  onToggleFormal: () => void
  isFormal: boolean
  disabled?: boolean
  className?: string
}

export function AIActions({
  onCopy,
  onRegenerate,
  onSaveVersion,
  onToggleFormal,
  isFormal,
  disabled = false,
  className
}: AIActionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-1', className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={disabled}
              className="h-9 w-9 p-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? 'Kopiert!' : 'Kopieren'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFormal}
              disabled={disabled}
              className="h-9 px-2 gap-1"
            >
              {isFormal ? (
                <>
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Sie</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span className="text-xs">Du</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Zu {isFormal ? 'Du' : 'Sie'} wechseln</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={disabled}
              className="h-9 w-9 p-0"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Neu generieren</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSaveVersion}
              disabled={disabled}
              className="h-9 w-9 p-0"
            >
              <Save className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Version speichern</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
