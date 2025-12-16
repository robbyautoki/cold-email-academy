'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  MailIcon,
  ShieldCheckIcon,
  RepeatIcon,
  CheckIcon,
  CircleIcon,
  ArrowLeftIcon,
  DownloadIcon,
  RotateCcwIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { getChecklistBySlug, type Checklist } from '@/data/checklists'

const iconMap: Record<string, React.ReactNode> = {
  mail: <MailIcon className='size-8' />,
  shield: <ShieldCheckIcon className='size-8' />,
  repeat: <RepeatIcon className='size-8' />
}

interface CheckedState {
  [itemId: string]: boolean
}

export default function ChecklistDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const [checklist, setChecklist] = useState<Checklist | null>(null)
  const [checked, setChecked] = useState<CheckedState>({})
  const [mounted, setMounted] = useState(false)

  const storageKey = `checklist-${slug}`

  useEffect(() => {
    const data = getChecklistBySlug(slug)
    if (!data) {
      router.push('/checklisten')
      return
    }
    setChecklist(data)

    // Load from localStorage
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        setChecked(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading checklist state:', e)
      }
    }
    setMounted(true)
  }, [slug, router, storageKey])

  useEffect(() => {
    if (mounted && checklist) {
      localStorage.setItem(storageKey, JSON.stringify(checked))
    }
  }, [checked, mounted, storageKey, checklist])

  const toggleItem = (itemId: string) => {
    setChecked(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const resetChecklist = () => {
    setChecked({})
    localStorage.removeItem(storageKey)
  }

  const downloadAsPDF = () => {
    if (!checklist) return

    // Create printable content
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const checkedCount = checklist.items.filter(item => checked[item.id]).length

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${checklist.title} - Checkliste</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 8px;
            color: #111;
          }
          .description {
            color: #666;
            margin-bottom: 24px;
            font-size: 14px;
          }
          .progress-info {
            background: #f5f5f5;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 24px;
            font-size: 14px;
          }
          ul { list-style: none; }
          li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
          }
          .checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #ccc;
            border-radius: 4px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .checkbox.checked {
            background: #22c55e;
            border-color: #22c55e;
            color: white;
          }
          .label { font-size: 14px; }
          .label.checked {
            text-decoration: line-through;
            color: #999;
          }
          .footer {
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #999;
          }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <h1>${checklist.title}</h1>
        <p class="description">${checklist.description}</p>
        <div class="progress-info">
          <strong>Fortschritt:</strong> ${checkedCount} von ${checklist.items.length} erledigt (${Math.round((checkedCount / checklist.items.length) * 100)}%)
        </div>
        <ul>
          ${checklist.items.map(item => `
            <li>
              <div class="checkbox ${checked[item.id] ? 'checked' : ''}">
                ${checked[item.id] ? '✓' : ''}
              </div>
              <span class="label ${checked[item.id] ? 'checked' : ''}">${item.label}</span>
            </li>
          `).join('')}
        </ul>
        <div class="footer">
          Cold Email Academy - ${new Date().toLocaleDateString('de-DE')}
        </div>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `)
    printWindow.document.close()
  }

  if (!mounted || !checklist) {
    return null
  }

  const checkedCount = checklist.items.filter(item => checked[item.id]).length
  const progress = Math.round((checkedCount / checklist.items.length) * 100)

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col gap-4'>
        <Link href='/checklisten' className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors'>
          <ArrowLeftIcon className='size-4' />
          Zurück zur Übersicht
        </Link>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex items-start gap-4'>
            <div className='bg-primary/10 text-primary rounded-xl p-3'>
              {iconMap[checklist.icon]}
            </div>
            <div>
              <h1 className='text-2xl font-bold sm:text-3xl'>{checklist.title}</h1>
              <p className='text-muted-foreground mt-1'>{checklist.description}</p>
            </div>
          </div>

          <div className='flex gap-2'>
            <Button variant='outline' size='sm' onClick={resetChecklist}>
              <RotateCcwIcon className='size-4' />
              Zurücksetzen
            </Button>
            <Button size='sm' onClick={downloadAsPDF}>
              <DownloadIcon className='size-4' />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className='py-4'>
          <div className='flex items-center gap-4'>
            <div className='flex-1'>
              <div className='mb-2 flex items-center justify-between text-sm'>
                <span className='font-medium'>Fortschritt</span>
                <span className='text-muted-foreground'>{checkedCount} von {checklist.items.length} erledigt</span>
              </div>
              <Progress value={progress} className='h-2' />
            </div>
            <span className='text-2xl font-bold'>{progress}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <Card>
        <CardHeader>
          <CardTitle>Checkliste</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='divide-y'>
            {checklist.items.map((item, index) => (
              <li key={item.id} className='py-3 first:pt-0 last:pb-0'>
                <button
                  onClick={() => toggleItem(item.id)}
                  className='flex w-full items-start gap-4 text-left transition-colors hover:opacity-80'
                >
                  <span className='text-muted-foreground mt-0.5 w-6 text-sm font-medium'>
                    {index + 1}.
                  </span>
                  <div
                    className={cn(
                      'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                      checked[item.id]
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-muted-foreground/30'
                    )}
                  >
                    {checked[item.id] && <CheckIcon className='size-3.5' />}
                  </div>
                  <span
                    className={cn(
                      'flex-1 transition-colors',
                      checked[item.id] && 'text-muted-foreground line-through'
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Completion Message */}
      {progress === 100 && (
        <Card className='border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'>
          <CardContent className='py-6 text-center'>
            <div className='mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-500 text-white'>
              <CheckIcon className='size-6' />
            </div>
            <h3 className='text-lg font-semibold text-green-800 dark:text-green-200'>
              Checkliste abgeschlossen!
            </h3>
            <p className='text-green-600 dark:text-green-400'>
              Du hast alle Punkte dieser Checkliste erledigt.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
