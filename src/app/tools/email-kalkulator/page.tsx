'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CalculatorIcon,
  TrendingUpIcon,
  MailIcon,
  UsersIcon,
  DollarSignIcon,
  TargetIcon,
  MousePointerClickIcon,
  ShoppingCartIcon,
  SparklesIcon,
  ArrowRightIcon,
  ZapIcon
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { ToolHero } from '@/components/tools/shared'

// Industrie-Durchschnittswerte
const INDUSTRY_STATS = {
  openRate: 21.5,
  clickRate: 2.6,
  conversionRate: 1.8
}

// Presets für schnelle Auswahl
const PRESETS = [
  { name: 'Starter', listSize: 1000, emailsPerMonth: 4, orderValue: 30 },
  { name: 'Growth', listSize: 5000, emailsPerMonth: 8, orderValue: 50 },
  { name: 'Scale', listSize: 25000, emailsPerMonth: 12, orderValue: 75 },
  { name: 'Enterprise', listSize: 100000, emailsPerMonth: 16, orderValue: 100 }
]

const EmailKalkulatorPage = () => {
  const [listSize, setListSize] = useState(1000)
  const [emailsPerMonth, setEmailsPerMonth] = useState(4)
  const [averageOrderValue, setAverageOrderValue] = useState(50)
  const [activePreset, setActivePreset] = useState<string | null>(null)

  const { openRate, clickRate, conversionRate } = INDUSTRY_STATS

  const calculations = useMemo(() => {
    const totalEmails = listSize * emailsPerMonth
    const opens = Math.round((totalEmails * openRate) / 100)
    const clicks = Math.round((totalEmails * clickRate) / 100)
    const conversions = Math.round((clicks * conversionRate) / 100)
    const revenue = conversions * averageOrderValue
    const revenuePerSubscriber = listSize > 0 ? revenue / listSize : 0
    const revenuePerEmail = totalEmails > 0 ? revenue / totalEmails : 0

    return {
      totalEmails,
      opens,
      clicks,
      conversions,
      revenue,
      revenuePerSubscriber,
      revenuePerEmail,
      yearlyRevenue: revenue * 12,
      ltv: revenuePerSubscriber * 12
    }
  }, [listSize, emailsPerMonth, openRate, clickRate, conversionRate, averageOrderValue])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('de-DE').format(value)
  }

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setListSize(preset.listSize)
    setEmailsPerMonth(preset.emailsPerMonth)
    setAverageOrderValue(preset.orderValue)
    setActivePreset(preset.name)
  }

  // Funnel-Daten für die Visualisierung
  const funnelSteps = [
    { label: 'Gesendet', value: calculations.totalEmails, icon: MailIcon, color: 'bg-zinc-600' },
    { label: 'Geöffnet', value: calculations.opens, icon: TargetIcon, color: 'bg-zinc-700', percent: openRate },
    { label: 'Geklickt', value: calculations.clicks, icon: MousePointerClickIcon, color: 'bg-zinc-800', percent: clickRate },
    { label: 'Konvertiert', value: calculations.conversions, icon: ShoppingCartIcon, color: 'bg-green-600', percent: conversionRate }
  ]

  return (
    <div className="space-y-6">
      {/* Hero */}
      <ToolHero
        icon={CalculatorIcon}
        title="Email ROI Kalkulator"
        description="Berechne den Return on Investment deiner Email-Kampagnen"
      />

      {/* Presets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Schnellauswahl:</span>
              {PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  variant={activePreset === preset.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => applyPreset(preset)}
                  className="gap-2"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Eingaben - 2 Spalten */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Listen-Größe */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 text-white">
                  <UsersIcon className="size-4" />
                </div>
                Listen-Größe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground">Abonnenten</Label>
                <motion.span
                  key={listSize}
                  initial={{ scale: 1.2, color: 'hsl(var(--primary))' }}
                  animate={{ scale: 1, color: 'hsl(var(--foreground))' }}
                  className="text-2xl font-bold"
                >
                  {formatNumber(listSize)}
                </motion.span>
              </div>
              <Slider
                value={[listSize]}
                onValueChange={([value]) => {
                  setListSize(value)
                  setActivePreset(null)
                }}
                min={100}
                max={100000}
                step={100}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100</span>
                <span>100.000</span>
              </div>
            </CardContent>
          </Card>

          {/* Email-Frequenz */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 text-white">
                  <MailIcon className="size-4" />
                </div>
                Email-Frequenz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground">Emails / Monat</Label>
                <motion.span
                  key={emailsPerMonth}
                  initial={{ scale: 1.2, color: 'hsl(var(--primary))' }}
                  animate={{ scale: 1, color: 'hsl(var(--foreground))' }}
                  className="text-2xl font-bold"
                >
                  {emailsPerMonth}
                </motion.span>
              </div>
              <Slider
                value={[emailsPerMonth]}
                onValueChange={([value]) => {
                  setEmailsPerMonth(value)
                  setActivePreset(null)
                }}
                min={1}
                max={30}
                step={1}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1x</span>
                <span>30x</span>
              </div>
            </CardContent>
          </Card>

          {/* Bestellwert */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 text-white">
                  <DollarSignIcon className="size-4" />
                </div>
                Durchschn. Bestellwert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground">AOV</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={averageOrderValue}
                    onChange={e => {
                      setAverageOrderValue(parseInt(e.target.value) || 0)
                      setActivePreset(null)
                    }}
                    min={0}
                    className="w-24 text-right font-bold text-lg"
                  />
                  <span className="text-muted-foreground">€</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industrie-Metriken */}
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUpIcon className="size-4 text-muted-foreground" />
                Industrie-Durchschnitt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-lg font-bold">{openRate}%</p>
                  <p className="text-[10px] text-muted-foreground">Öffnungsrate</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-lg font-bold">{clickRate}%</p>
                  <p className="text-[10px] text-muted-foreground">Klickrate</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-lg font-bold">{conversionRate}%</p>
                  <p className="text-[10px] text-muted-foreground">Conversion</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Quelle: Mailchimp, Campaign Monitor 2024
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ergebnisse - 3 Spalten */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-4"
        >
          {/* Hauptergebnis */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent" />
            <CardContent className="relative py-8">
              <div className="flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-4 gap-1">
                  <SparklesIcon className="size-3" />
                  Geschätzter Monatsumsatz
                </Badge>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={calculations.revenue}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="text-5xl font-bold text-green-600"
                  >
                    {formatCurrency(calculations.revenue)}
                  </motion.div>
                </AnimatePresence>
                <p className="text-muted-foreground mt-2 text-sm">
                  basierend auf Industrie-Durchschnittswerten
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email-Funnel visuell */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Email-Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {funnelSteps.map((step, index) => {
                  const Icon = step.icon
                  const widthPercent = index === 0 ? 100 : Math.max(5, (step.value / funnelSteps[0].value) * 100)

                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className="size-4 text-muted-foreground" />
                          <span className="text-sm">{step.label}</span>
                          {step.percent && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {step.percent}%
                            </Badge>
                          )}
                        </div>
                        <span className="font-bold">{formatNumber(step.value)}</span>
                      </div>
                      <div className="h-8 bg-muted rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPercent}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                          className={`h-full ${step.color} rounded-lg flex items-center justify-end pr-3`}
                        >
                          {index < funnelSteps.length - 1 && (
                            <ArrowRightIcon className="size-4 text-white/50" />
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Kennzahlen Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200">
                      <UsersIcon className="size-5 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">pro Abonnent/Monat</p>
                      <p className="text-xl font-bold">{formatCurrency(calculations.revenuePerSubscriber)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200">
                      <MailIcon className="size-5 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">pro Email</p>
                      <p className="text-xl font-bold">{formatCurrency(calculations.revenuePerEmail)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
                      <TrendingUpIcon className="size-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Jahresumsatz</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(calculations.yearlyRevenue)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
            >
              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
                      <ZapIcon className="size-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">LTV pro Abonnent</p>
                      <p className="text-xl font-bold text-amber-600">{formatCurrency(calculations.ltv)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-dashed">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 text-white">
                    <SparklesIcon className="size-4" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Wachstums-Tipp</p>
                    <p className="text-muted-foreground mt-1">
                      Bei einer Verdopplung deiner Liste auf <strong>{formatNumber(listSize * 2)} Abonnenten</strong> würdest
                      du voraussichtlich <strong>{formatCurrency(calculations.revenue * 2)}</strong> pro Monat generieren.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default EmailKalkulatorPage
