'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Lightbulb } from 'lucide-react'

interface AISuggestionsProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
  className?: string
  disabled?: boolean
}

export function AISuggestions({
  suggestions,
  onSuggestionClick,
  className,
  disabled = false
}: AISuggestionsProps) {
  if (!suggestions.length) return null

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <span>Verbesserungsvorschlage</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            disabled={disabled}
            className="rounded-full text-xs h-8 px-3 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}
