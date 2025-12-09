'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CopyIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  GlobeIcon,
  ServerIcon,
  SettingsIcon,
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { ToolHero } from '@/components/tools/shared'

// Provider Data
const emailProviders = [
  {
    id: 'google',
    name: 'Google Workspace',
    description: 'Gmail & Google Workspace',
    include: '_spf.google.com',
    icon: '🔵'
  },
  {
    id: 'microsoft',
    name: 'Microsoft 365',
    description: 'Outlook & Exchange Online',
    include: 'spf.protection.outlook.com',
    icon: '🟦'
  },
  {
    id: 'zoho',
    name: 'Zoho Mail',
    description: 'Zoho Workplace Suite',
    include: 'zoho.com',
    icon: '🟡'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email Marketing Platform',
    include: 'servers.mcsv.net',
    icon: '🐵'
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Transactional Email Service',
    include: 'sendgrid.net',
    icon: '🔷'
  },
  {
    id: 'amazon',
    name: 'Amazon SES',
    description: 'AWS Simple Email Service',
    include: 'amazonses.com',
    icon: '📦'
  }
]

const policyOptions = [
  {
    value: '~all',
    name: 'Softfail',
    description: 'Empfohlen - E-Mails werden als verdächtig markiert',
    recommended: true
  },
  {
    value: '-all',
    name: 'Hardfail',
    description: 'Strikt - E-Mails werden abgelehnt',
    recommended: false
  },
  {
    value: '?all',
    name: 'Neutral',
    description: 'Keine Empfehlung gegeben',
    recommended: false
  }
]

const steps = [
  { id: 1, name: 'Domain', icon: GlobeIcon },
  { id: 2, name: 'IP-Adressen', icon: ServerIcon },
  { id: 3, name: 'Provider', icon: SettingsIcon },
  { id: 4, name: 'Ergebnis', icon: SparklesIcon }
]

const SPFGeneratorPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [domain, setDomain] = useState('')
  const [ipAddresses, setIpAddresses] = useState<string[]>([''])
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [policy, setPolicy] = useState<string>('~all')

  const progress = (currentStep / steps.length) * 100

  const generateSPF = () => {
    let spf = 'v=spf1'

    // Add IPs
    ipAddresses.forEach(ip => {
      if (ip.trim()) {
        if (ip.includes(':')) {
          spf += ` ip6:${ip.trim()}`
        } else {
          spf += ` ip4:${ip.trim()}`
        }
      }
    })

    // Add selected providers
    selectedProviders.forEach(providerId => {
      const provider = emailProviders.find(p => p.id === providerId)
      if (provider) {
        spf += ` include:${provider.include}`
      }
    })

    spf += ` ${policy}`
    return spf
  }

  const spfRecord = generateSPF()
  const recordLength = spfRecord.length
  const includeCount = selectedProviders.length + ipAddresses.filter(ip => ip.trim()).length

  const copyToClipboard = () => {
    navigator.clipboard.writeText(spfRecord)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addIpAddress = () => setIpAddresses([...ipAddresses, ''])
  const removeIpAddress = (index: number) => setIpAddresses(ipAddresses.filter((_, i) => i !== index))
  const updateIpAddress = (index: number, value: string) => {
    const updated = [...ipAddresses]
    updated[index] = value
    setIpAddresses(updated)
  }

  const toggleProvider = (providerId: string) => {
    setSelectedProviders(prev =>
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    )
  }

  const canProceed = () => {
    if (currentStep === 1) return domain.trim().length > 0
    return true
  }

  const nextStep = () => {
    if (currentStep < 4 && canProceed()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const resetWizard = () => {
    setCurrentStep(1)
    setDomain('')
    setIpAddresses([''])
    setSelectedProviders([])
    setPolicy('~all')
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <ToolHero
        icon={ShieldCheckIcon}
        title="SPF Generator"
        description="Erstelle einen SPF-Record für deine Domain in wenigen Schritten"
      />

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            {/* Steps */}
            <div className="mb-4 flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id

                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isCompleted
                          ? 'rgb(34 197 94)'
                          : isActive
                            ? 'rgb(39 39 42)'
                            : 'rgb(228 228 231)'
                      }}
                      className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                        isActive || isCompleted ? 'text-white' : 'text-zinc-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckIcon className="size-5" />
                      ) : (
                        <StepIcon className="size-5" />
                      )}
                    </motion.div>
                    <span className={`ml-2 hidden text-sm font-medium sm:block ${
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`mx-4 h-0.5 w-8 sm:w-16 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-zinc-200'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Domain */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GlobeIcon className="size-5" />
                  Für welche Domain?
                </CardTitle>
                <CardDescription>
                  Gib die Domain ein, für die du den SPF-Record erstellen möchtest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="beispiel.de"
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    className="h-14 text-lg pl-4"
                  />
                  {domain && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircleIcon className="size-6 text-green-500" />
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Beispiel: meinefirma.de, mail.beispiel.com
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: IP Addresses */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ServerIcon className="size-5" />
                  IP-Adressen deiner Mailserver
                </CardTitle>
                <CardDescription>
                  Füge die IP-Adressen hinzu, von denen E-Mails gesendet werden (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ipAddresses.map((ip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-2"
                  >
                    <Input
                      placeholder="192.168.1.1 oder 2001:db8::1"
                      value={ip}
                      onChange={e => updateIpAddress(index, e.target.value)}
                      className="flex-1"
                    />
                    {ipAddresses.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeIpAddress(index)}
                        className="shrink-0"
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                    )}
                  </motion.div>
                ))}
                <Button
                  variant="outline"
                  onClick={addIpAddress}
                  className="w-full gap-2"
                >
                  <PlusIcon className="size-4" />
                  IP-Adresse hinzufügen
                </Button>
                <p className="text-sm text-muted-foreground">
                  Unterstützt IPv4, IPv6 und CIDR-Notation (z.B. 192.168.0.0/24)
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Providers */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Provider Grid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="size-5" />
                  Email Provider
                </CardTitle>
                <CardDescription>
                  Wähle die Dienste aus, die du für den E-Mail-Versand nutzt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {emailProviders.map((provider, index) => {
                    const isSelected = selectedProviders.includes(provider.id)
                    return (
                      <motion.div
                        key={provider.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <button
                          onClick={() => toggleProvider(provider.id)}
                          className={`group relative w-full rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                            isSelected
                              ? 'border-zinc-800 bg-zinc-800 text-white'
                              : 'border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -right-2 -top-2"
                            >
                              <div className="flex size-6 items-center justify-center rounded-full bg-green-500 text-white">
                                <CheckIcon className="size-4" />
                              </div>
                            </motion.div>
                          )}
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{provider.icon}</span>
                            <div>
                              <p className="font-medium">{provider.name}</p>
                              <p className={`text-xs ${isSelected ? 'text-zinc-300' : 'text-muted-foreground'}`}>
                                {provider.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Policy Selection */}
            <Card>
              <CardHeader>
                <CardTitle>SPF Policy</CardTitle>
                <CardDescription>
                  Wie soll mit E-Mails umgegangen werden, die nicht autorisiert sind?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {policyOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setPolicy(option.value)}
                      className={`flex w-full items-center justify-between rounded-lg border-2 p-4 text-left transition-all ${
                        policy === option.value
                          ? 'border-zinc-800 bg-zinc-50'
                          : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{option.name}</span>
                          <Badge variant="outline" className="font-mono text-xs">
                            {option.value}
                          </Badge>
                          {option.recommended && (
                            <Badge className="bg-green-500/10 text-green-600 text-xs">
                              Empfohlen
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      <div className={`flex size-5 items-center justify-center rounded-full border-2 ${
                        policy === option.value
                          ? 'border-zinc-800 bg-zinc-800'
                          : 'border-zinc-300'
                      }`}>
                        {policy === option.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="size-2 rounded-full bg-white"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Result */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Stats Row */}
            <div className="grid gap-4 sm:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-green-600">{recordLength}</div>
                    <p className="text-sm text-muted-foreground">Zeichen</p>
                    {recordLength > 255 && (
                      <Badge variant="destructive" className="mt-2">
                        <XCircleIcon className="mr-1 size-3" />
                        Zu lang!
                      </Badge>
                    )}
                    {recordLength <= 255 && (
                      <Badge className="mt-2 bg-green-500/10 text-green-600">
                        <CheckCircleIcon className="mr-1 size-3" />
                        OK
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">{includeCount}</div>
                    <p className="text-sm text-muted-foreground">Einträge</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">{domain}</div>
                    <p className="text-sm text-muted-foreground">Domain</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* SPF Record */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <SparklesIcon className="size-5 text-amber-500" />
                        Dein SPF-Record
                      </CardTitle>
                      <CardDescription>
                        Kopiere diesen Record in deine DNS-Einstellungen
                      </CardDescription>
                    </div>
                    <Button onClick={copyToClipboard} className="gap-2">
                      {copied ? (
                        <>
                          <CheckIcon className="size-4" />
                          Kopiert!
                        </>
                      ) : (
                        <>
                          <CopyIcon className="size-4" />
                          Kopieren
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-zinc-900 p-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                      <Badge variant="outline" className="border-zinc-600 text-zinc-400">
                        TXT
                      </Badge>
                      <span>@ / {domain}</span>
                    </div>
                    <code className="block break-all text-sm text-green-400">
                      {spfRecord}
                    </code>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* DNS Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Anleitung zum Einrichten</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {[
                      'Öffne die DNS-Einstellungen bei deinem Domain-Provider',
                      'Erstelle einen neuen TXT-Record',
                      `Setze den Host auf @ oder leer (für ${domain})`,
                      'Füge den generierten SPF-Record als Wert ein',
                      'Speichere die Änderungen (Propagation dauert bis zu 48h)'
                    ].map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <Button
          variant="outline"
          onClick={currentStep === 4 ? resetWizard : prevStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          {currentStep === 4 ? (
            <>Nochmal</>
          ) : (
            <>
              <ArrowLeftIcon className="size-4" />
              Zurück
            </>
          )}
        </Button>

        {currentStep < 4 && (
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="gap-2"
          >
            Weiter
            <ArrowRightIcon className="size-4" />
          </Button>
        )}
      </motion.div>
    </div>
  )
}

export default SPFGeneratorPage
