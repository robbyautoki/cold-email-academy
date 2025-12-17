'use client'

import { useEffect, useRef, useState } from 'react'
import { Brain, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AILoader } from './ai-loader'

interface AIReasoningProps {
  isStreaming: boolean
  reasoning: string
  className?: string
}

export function AIReasoning({ isStreaming, reasoning, className }: AIReasoningProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [duration, setDuration] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-open when streaming starts, track duration
  useEffect(() => {
    if (isStreaming) {
      setIsOpen(true)
      startTimeRef.current = Date.now()

      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000))
        }
      }, 100)
    } else {
      // Cleanup when streaming stops
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      // Auto-close after a short delay
      if (startTimeRef.current) {
        const finalDuration = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setDuration(finalDuration)

        setTimeout(() => {
          setIsOpen(false)
        }, 1500)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isStreaming])

  // Don't render if no reasoning content and not streaming
  if (!reasoning && !isStreaming) return null

  return (
    <div className={cn('rounded-lg border bg-muted/30', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2">
          {isStreaming ? (
            <AILoader size={16} className="text-primary" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          <span>
            {isStreaming ? 'Denke nach...' : `Nachgedacht ${duration > 0 ? `(${duration}s)` : ''}`}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-3 pt-0">
            <div className="rounded-md bg-background/50 p-3 text-sm text-muted-foreground whitespace-pre-wrap max-h-48 overflow-y-auto">
              {reasoning || 'Analysiere Anfrage...'}
              {isStreaming && <span className="animate-pulse">|</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
