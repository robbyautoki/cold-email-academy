'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDownIcon,
  CheckCircle2Icon,
  CircleIcon,
  ClockIcon,
  LightbulbIcon,
  ExternalLinkIcon,
  FileTextIcon,
  WrenchIcon,
  BookOpenIcon,
  LinkIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import type { PlaybookStep as PlaybookStepType } from '@/data/playbooks'

interface PlaybookStepProps {
  step: PlaybookStepType
  stepNumber: number
  totalSteps: number
  isCompleted?: boolean
  isActive?: boolean
  onToggleComplete?: () => void
}

const resourceIcons = {
  link: LinkIcon,
  template: FileTextIcon,
  tool: WrenchIcon,
  guide: BookOpenIcon
}

export function PlaybookStep({
  step,
  stepNumber,
  totalSteps,
  isCompleted = false,
  isActive = false,
  onToggleComplete
}: PlaybookStepProps) {
  const [isOpen, setIsOpen] = useState(isActive)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleCheckItem = (index: number) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedItems(newChecked)
  }

  const allChecked = checkedItems.size === step.checklist.length

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn(
        'overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all',
        isActive && 'border-zinc-900 dark:border-zinc-100 shadow-md',
        isCompleted && 'bg-primary/5 dark:bg-primary/10'
      )}>
        <CollapsibleTrigger asChild>
          <button className="w-full text-left">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                {/* Step Number / Status */}
                <div className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl border-2',
                  isCompleted
                    ? 'border-primary bg-transparent'
                    : isActive
                    ? 'border-zinc-900 dark:border-zinc-100 bg-transparent'
                    : 'border-zinc-300 dark:border-zinc-600 bg-transparent'
                )}>
                  {isCompleted ? (
                    <CheckCircle2Icon className="size-5 text-primary" />
                  ) : (
                    <span className={cn(
                      'text-sm font-bold',
                      isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'
                    )}>
                      {stepNumber}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-base text-muted-foreground line-clamp-2 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                        <ClockIcon className="size-3" />
                        {step.duration}
                      </span>
                      <ChevronDownIcon className={cn(
                        'size-5 text-muted-foreground transition-transform',
                        isOpen && 'rotate-180'
                      )} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t border-zinc-100 dark:border-zinc-800">
            <CardContent className="p-6 sm:p-8 pt-6 space-y-6">
              {/* Detailed Content - Explains WHY and HOW */}
              {step.content && (
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                  {step.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-base text-foreground leading-relaxed mb-3 last:mb-0">
                      {paragraph.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
                        }
                        return part
                      })}
                    </p>
                  ))}
                </div>
              )}

              {/* Checklist */}
              <div className="space-y-3">
                <h4 className="text-base font-medium flex items-center gap-2">
                  <CircleIcon className="size-4" />
                  Checkliste ({checkedItems.size}/{step.checklist.length})
                </h4>
                <div className="space-y-2.5 pl-1">
                  {step.checklist.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={checkedItems.has(index)}
                        onCheckedChange={() => toggleCheckItem(index)}
                        className="mt-0.5"
                      />
                      <span className={cn(
                        'text-base transition-colors',
                        checkedItems.has(index)
                          ? 'text-muted-foreground line-through'
                          : 'text-foreground group-hover:text-zinc-900 dark:group-hover:text-zinc-100'
                      )}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Resources */}
              {step.resources && step.resources.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-base font-medium">Ressourcen</h4>
                  <div className="flex flex-wrap gap-2">
                    {step.resources.map((resource, index) => {
                      const Icon = resourceIcons[resource.type]
                      return (
                        <Link
                          key={index}
                          href={resource.href}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                          <Icon className="size-4" />
                          {resource.title}
                          <ExternalLinkIcon className="size-3 text-muted-foreground" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Tips */}
              {step.tips && step.tips.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                  <h4 className="text-base font-medium flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400">
                    <LightbulbIcon className="size-4" />
                    Pro Tipps
                  </h4>
                  <ul className="space-y-2">
                    {step.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-base text-amber-800 dark:text-amber-300">
                        <span className="text-amber-500 mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mark as Complete */}
              {allChecked && !isCompleted && onToggleComplete && (
                <Button
                  onClick={onToggleComplete}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <CheckCircle2Icon className="size-4 mr-2" />
                  Schritt als erledigt markieren
                </Button>
              )}
            </CardContent>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
