'use client'

import { useState } from 'react'
import {
  LightbulbIcon,
  TagIcon,
  InfoIcon,
  MailIcon,
  ArrowLeftIcon
} from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MotionPreset } from '@/components/ui/motion-preset'
import { CopyButton } from './copy-button'
import { getCategoryInfo, type EmailTemplate } from '@/data/templates'

interface TemplatePreviewProps {
  template: EmailTemplate
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const [activeSubject, setActiveSubject] = useState(0)
  const categoryInfo = getCategoryInfo(template.category)

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <MotionPreset fade blur>
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Zurück zu Templates
        </Link>
      </MotionPreset>

      {/* Header */}
      <MotionPreset fade blur delay={0.05}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`${categoryInfo?.bgColor} ${categoryInfo?.color} border-0`}
              >
                {categoryInfo?.title}
              </Badge>
              {template.stats?.replyRate && (
                <Badge variant="outline" className="border-primary/30 dark:border-primary/50 text-primary">
                  {template.stats.replyRate} Reply Rate
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">{template.title}</h1>
            <p className="text-muted-foreground max-w-2xl">{template.description}</p>
          </div>
        </div>
      </MotionPreset>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject Lines */}
          <MotionPreset fade blur delay={0.1}>
            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MailIcon className="size-4" />
                  Betreffzeilen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {template.subjectLines.map((subject, index) => (
                  <div
                    key={index}
                    className={`group flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                      activeSubject === index
                        ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                    onClick={() => setActiveSubject(index)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-6 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="font-mono text-sm">{subject}</span>
                    </div>
                    <CopyButton text={subject} variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Email Body */}
          <MotionPreset fade blur delay={0.15}>
            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Email Body</CardTitle>
                  <CopyButton text={template.body} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                    {template.body}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* When to Use */}
          <MotionPreset fade blur delay={0.2}>
            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <InfoIcon className="size-4 text-blue-500" />
                  Wann nutzen?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {template.whenToUse}
                </p>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Placeholders */}
          <MotionPreset fade blur delay={0.25}>
            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TagIcon className="size-4 text-purple-500" />
                  Platzhalter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {template.placeholders.map((placeholder, index) => (
                  <div key={index} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                        {placeholder.placeholder}
                      </code>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {placeholder.description}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-medium">Beispiel:</span> {placeholder.example}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Tips */}
          {template.tips && template.tips.length > 0 && (
            <MotionPreset fade blur delay={0.3}>
              <Card className="border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <LightbulbIcon className="size-4 text-amber-500" />
                    Pro Tipps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {template.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-amber-500 mt-1">•</span>
                        <span className="text-zinc-700 dark:text-zinc-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </MotionPreset>
          )}
        </div>
      </div>
    </div>
  )
}
