'use client'

import ReactMarkdown from 'react-markdown'
import {
  InfoIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  CheckIcon
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type SectionType =
  | 'prose'
  | 'accordion'
  | 'tabs'
  | 'callout'
  | 'steps'
  | 'comparison'
  | 'checklist'
  | 'code'
  | 'keypoints'

export type CalloutVariant = 'info' | 'warning' | 'tip' | 'success'

export interface AccordionItemData {
  title: string
  content: string
  defaultOpen?: boolean
}

export interface TabItemData {
  label: string
  content: string
}

export interface StepItemData {
  title: string
  content: string
}

export interface ComparisonData {
  headers: string[]
  rows: string[][]
}

export interface ChecklistItemData {
  text: string
  checked?: boolean
}

export interface ArticleSection {
  type: SectionType
  title?: string
  content:
    | string
    | AccordionItemData[]
    | TabItemData[]
    | StepItemData[]
    | ComparisonData
    | ChecklistItemData[]
    | string[]
  variant?: CalloutVariant
}

// =============================================================================
// MARKDOWN RENDERER (shared)
// =============================================================================

function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className='mb-3 leading-7'>{children}</p>,
        ul: ({ children }) => (
          <ul className='mb-3 ml-6 list-disc space-y-1'>{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className='mb-3 ml-6 list-decimal space-y-1'>{children}</ol>
        ),
        li: ({ children }) => <li className='leading-7'>{children}</li>,
        strong: ({ children }) => (
          <strong className='font-semibold'>{children}</strong>
        ),
        code: ({ children }) => (
          <code className='bg-muted rounded px-1.5 py-0.5 font-mono text-sm'>
            {children}
          </code>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className='text-primary hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            {children}
          </a>
        )
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

// Prose - Normaler Markdown-Text
function ProseSection({ title, content }: { title?: string; content: string }) {
  return (
    <div className='space-y-3'>
      {title && <h2 className='text-xl font-semibold'>{title}</h2>}
      <div className='prose prose-gray dark:prose-invert max-w-none'>
        <MarkdownContent content={content} />
      </div>
    </div>
  )
}

// Accordion - Einklappbare Abschnitte
function AccordionSection({
  title,
  items
}: {
  title?: string
  items: AccordionItemData[]
}) {
  const defaultOpenItems = items
    .filter(item => item.defaultOpen)
    .map((_, idx) => `item-${idx}`)

  return (
    <div className='space-y-3'>
      {title && <h2 className='text-xl font-semibold'>{title}</h2>}
      <Accordion
        type='multiple'
        defaultValue={defaultOpenItems}
        className='rounded-lg border'
      >
        {items.map((item, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className='px-4'>
            <AccordionTrigger className='text-base font-medium'>
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className='prose prose-gray dark:prose-invert max-w-none prose-sm'>
                <MarkdownContent content={item.content} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

// Tabs - Tab-basierte Inhalte
function TabsSection({
  title,
  items
}: {
  title?: string
  items: TabItemData[]
}) {
  return (
    <div className='space-y-3'>
      {title && <h2 className='text-xl font-semibold'>{title}</h2>}
      <Tabs defaultValue={items[0]?.label} className='w-full'>
        <TabsList className='w-full flex-wrap h-auto'>
          {items.map(item => (
            <TabsTrigger key={item.label} value={item.label}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map(item => (
          <TabsContent key={item.label} value={item.label} className='mt-4'>
            <Card>
              <CardContent className='pt-4'>
                <MarkdownContent content={item.content} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

// Callout - Hervorgehobene Boxen
function CalloutSection({
  title,
  content,
  variant = 'info'
}: {
  title?: string
  content: string
  variant?: CalloutVariant
}) {
  const variants = {
    info: {
      icon: InfoIcon,
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    warning: {
      icon: AlertTriangleIcon,
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    tip: {
      icon: LightbulbIcon,
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      border: 'border-purple-200 dark:border-purple-800',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    success: {
      icon: CheckCircle2Icon,
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400'
    }
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        config.bg,
        config.border
      )}
    >
      <div className='flex gap-3'>
        <Icon className={cn('size-5 shrink-0 mt-0.5', config.iconColor)} />
        <div className='flex-1'>
          {title && (
            <h3 className='font-semibold mb-2'>{title}</h3>
          )}
          <div className='text-sm'>
            <MarkdownContent content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Steps - Nummerierte Schritte
function StepsSection({
  title,
  items
}: {
  title?: string
  items: StepItemData[]
}) {
  return (
    <div className='space-y-3'>
      {title && <h2 className='text-xl font-semibold'>{title}</h2>}
      <div className='space-y-4'>
        {items.map((item, idx) => (
          <div key={idx} className='flex gap-4'>
            <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm'>
              {idx + 1}
            </div>
            <div className='flex-1 pt-1'>
              <h3 className='font-semibold mb-1'>{item.title}</h3>
              <div className='text-muted-foreground text-sm'>
                <MarkdownContent content={item.content} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Comparison - Vergleichstabelle
function ComparisonSection({
  title,
  data
}: {
  title?: string
  data: ComparisonData
}) {
  return (
    <div className='space-y-3'>
      {title && <h2 className='text-xl font-semibold'>{title}</h2>}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-muted/50'>
              {data.headers.map((header, idx) => (
                <th
                  key={idx}
                  className='border px-4 py-2 text-left font-semibold'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className='even:bg-muted/20'>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className='border px-4 py-2'>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Checklist - Interaktive Checkliste
function ChecklistSection({
  title,
  items
}: {
  title?: string
  items: ChecklistItemData[]
}) {
  return (
    <div className='space-y-3'>
      {title && <h2 className='text-xl font-semibold'>{title}</h2>}
      <div className='space-y-2'>
        {items.map((item, idx) => (
          <div
            key={idx}
            className='flex items-start gap-3 rounded-lg border p-3 bg-card'
          >
            <div
              className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded border mt-0.5',
                item.checked
                  ? 'bg-primary border-primary'
                  : 'border-muted-foreground/30'
              )}
            >
              {item.checked && (
                <CheckIcon className='size-3 text-primary-foreground' />
              )}
            </div>
            <span className={cn(item.checked && 'text-muted-foreground')}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Code - Code-Block mit Titel
function CodeSection({
  title,
  content
}: {
  title?: string
  content: string
}) {
  return (
    <div className='space-y-3'>
      {title && (
        <h2 className='text-xl font-semibold'>{title}</h2>
      )}
      <pre className='overflow-x-auto rounded-lg bg-slate-900 p-4'>
        <code className='font-mono text-sm text-slate-100'>{content}</code>
      </pre>
    </div>
  )
}

// Key Points - Wichtige Punkte am Ende
function KeypointsSection({
  title,
  items
}: {
  title?: string
  items: string[]
}) {
  return (
    <Card className='bg-primary/5 border-primary/20'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg flex items-center gap-2'>
          <CheckCircle2Icon className='size-5 text-primary' />
          {title || 'Key Takeaways'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {items.map((item, idx) => (
            <li key={idx} className='flex items-start gap-2'>
              <ChevronRightIcon className='size-4 shrink-0 mt-1 text-primary' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// =============================================================================
// MAIN RENDERER
// =============================================================================

export function ArticleSectionRenderer({
  section
}: {
  section: ArticleSection
}) {
  switch (section.type) {
    case 'prose':
      return (
        <ProseSection
          title={section.title}
          content={section.content as string}
        />
      )

    case 'accordion':
      return (
        <AccordionSection
          title={section.title}
          items={section.content as AccordionItemData[]}
        />
      )

    case 'tabs':
      return (
        <TabsSection
          title={section.title}
          items={section.content as TabItemData[]}
        />
      )

    case 'callout':
      return (
        <CalloutSection
          title={section.title}
          content={section.content as string}
          variant={section.variant}
        />
      )

    case 'steps':
      return (
        <StepsSection
          title={section.title}
          items={section.content as StepItemData[]}
        />
      )

    case 'comparison':
      return (
        <ComparisonSection
          title={section.title}
          data={section.content as ComparisonData}
        />
      )

    case 'checklist':
      return (
        <ChecklistSection
          title={section.title}
          items={section.content as ChecklistItemData[]}
        />
      )

    case 'code':
      return (
        <CodeSection
          title={section.title}
          content={section.content as string}
        />
      )

    case 'keypoints':
      return (
        <KeypointsSection
          title={section.title}
          items={section.content as string[]}
        />
      )

    default:
      return null
  }
}

// Render multiple sections with spacing
export function ArticleSectionsRenderer({
  sections
}: {
  sections: ArticleSection[]
}) {
  return (
    <div className='space-y-8'>
      {sections.map((section, idx) => (
        <ArticleSectionRenderer key={idx} section={section} />
      ))}
    </div>
  )
}
