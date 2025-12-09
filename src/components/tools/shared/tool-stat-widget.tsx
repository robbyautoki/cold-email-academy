'use client'

import { motion } from 'motion/react'
import { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

interface ToolStatWidgetProps {
  icon: LucideIcon
  label: string
  value: string | number
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: 'default' | 'success' | 'warning' | 'error'
  delay?: number
  className?: string
}

const variantStyles = {
  default: {
    iconBg: 'from-zinc-700 to-zinc-800',
    iconColor: 'text-white',
    valueBg: 'bg-zinc-500/10'
  },
  success: {
    iconBg: 'from-green-600 to-green-700',
    iconColor: 'text-white',
    valueBg: 'bg-green-500/10'
  },
  warning: {
    iconBg: 'from-amber-600 to-amber-700',
    iconColor: 'text-white',
    valueBg: 'bg-amber-500/10'
  },
  error: {
    iconBg: 'from-red-600 to-red-700',
    iconColor: 'text-white',
    valueBg: 'bg-red-500/10'
  }
}

export function ToolStatWidget({
  icon: Icon,
  label,
  value,
  description,
  trend,
  variant = 'default',
  delay = 0,
  className = ''
}: ToolStatWidgetProps) {
  const styles = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className={`group relative overflow-hidden transition-all hover:shadow-md ${className}`}>
        {/* Background Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <CardContent className="relative flex items-center gap-4 p-4">
          {/* Icon */}
          <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${styles.iconBg} ${styles.iconColor} shadow-md`}>
            <Icon className="size-6" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{value}</span>
              {trend && (
                <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground truncate">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
