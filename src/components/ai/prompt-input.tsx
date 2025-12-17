'use client'

import { useRef, useEffect, KeyboardEvent } from 'react'
import { Send, Square, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AILoader } from './ai-loader'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onStop?: () => void
  placeholder?: string
  isStreaming?: boolean
  disabled?: boolean
  className?: string
  showMic?: boolean
  onMicClick?: () => void
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  onStop,
  placeholder = 'Beschreibe deine Cold Email...',
  isStreaming = false,
  disabled = false,
  className,
  showMic = false,
  onMicClick
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }, [value])

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to submit, Shift+Enter for new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && !isStreaming && value.trim()) {
        onSubmit()
      }
    }
  }

  const handleSubmit = () => {
    if (isStreaming && onStop) {
      onStop()
    } else if (value.trim()) {
      onSubmit()
    }
  }

  return (
    <div
      className={cn(
        'relative flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-sm transition-shadow focus-within:shadow-md',
        className
      )}
    >
      {showMic && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onMicClick}
          disabled={disabled || isStreaming}
          className="h-10 w-10 shrink-0 rounded-xl p-0"
        >
          <Mic className="h-5 w-5" />
        </Button>
      )}

      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isStreaming}
        rows={1}
        className={cn(
          'min-h-[44px] max-h-[200px] resize-none border-0 bg-transparent p-2 text-base shadow-none focus-visible:ring-0',
          'scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent'
        )}
      />

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={disabled || (!isStreaming && !value.trim())}
        size="sm"
        className={cn(
          'h-10 w-10 shrink-0 rounded-xl p-0 transition-all',
          isStreaming
            ? 'bg-destructive hover:bg-destructive/90'
            : 'bg-primary hover:bg-primary/90'
        )}
      >
        {isStreaming ? (
          <Square className="h-4 w-4 fill-current" />
        ) : disabled ? (
          <AILoader size={18} className="text-primary-foreground" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
