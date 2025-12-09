'use client'

import { motion } from 'motion/react'
import { LucideIcon, CopyIcon, CheckIcon } from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ToolResultCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  value: string
  copyable?: boolean
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
  delay?: number
  children?: React.ReactNode
}

export function ToolResultCard({
  title,
  description,
  icon: Icon,
  value,
  copyable = true,
  badge,
  badgeVariant = 'secondary',
  className = '',
  delay = 0,
  children
}: ToolResultCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className={`group relative overflow-hidden transition-all hover:shadow-lg ${className}`}>
        {/* Background Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <CardHeader className="relative pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 text-white">
                  <Icon className="size-5" />
                </div>
              )}
              <div>
                <CardTitle className="text-base">{title}</CardTitle>
                {description && (
                  <CardDescription className="text-xs">{description}</CardDescription>
                )}
              </div>
            </div>
            {badge && (
              <Badge variant={badgeVariant} className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative space-y-3">
          {/* Value Display */}
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-start justify-between gap-2">
              <code className="break-all text-sm">{value}</code>
              {copyable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 shrink-0 px-2"
                >
                  {copied ? (
                    <CheckIcon className="size-4 text-green-500" />
                  ) : (
                    <CopyIcon className="size-4" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Optional Children */}
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}
