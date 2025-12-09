'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ServerIcon,
  SearchIcon,
  CheckCircleIcon,
  XCircleIcon,
  Loader2Icon,
  CopyIcon,
  CheckIcon,
  MailIcon,
  ShieldIcon,
  ClockIcon,
  ArrowRightIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

import { ToolHero } from '@/components/tools/shared'

interface MXRecord {
  priority: number
  host: string
  provider?: string
}

interface CheckResult {
  domain: string
  mxRecords: MXRecord[]
  hasMX: boolean
  provider?: string
  checkedAt: Date
  responseTime: number
}

const providerLogos: Record<string, string> = {
  'Google Workspace': '🔵',
  'Microsoft 365': '🟦',
  'Zoho Mail': '🟡',
  'ProtonMail': '🟣',
  'Mimecast': '🔶',
  'Proofpoint': '🔷',
  'SendGrid': '📧',
  'IONOS': '🌐',
  'STRATO': '🌐',
  'GoDaddy': '🌐',
  'Unbekannt': '❓'
}

const MXRecordCheckPage = () => {
  const [domain, setDomain] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [copied, setCopied] = useState(false)

  const detectProvider = (host: string): string => {
    const lowerHost = host.toLowerCase()
    if (lowerHost.includes('google') || lowerHost.includes('googlemail')) return 'Google Workspace'
    if (lowerHost.includes('outlook') || lowerHost.includes('microsoft')) return 'Microsoft 365'
    if (lowerHost.includes('zoho')) return 'Zoho Mail'
    if (lowerHost.includes('protonmail')) return 'ProtonMail'
    if (lowerHost.includes('mimecast')) return 'Mimecast'
    if (lowerHost.includes('pphosted') || lowerHost.includes('proofpoint')) return 'Proofpoint'
    if (lowerHost.includes('sendgrid')) return 'SendGrid'
    if (lowerHost.includes('ionos') || lowerHost.includes('1und1')) return 'IONOS'
    if (lowerHost.includes('strato')) return 'STRATO'
    if (lowerHost.includes('secureserver')) return 'GoDaddy'
    return 'Unbekannt'
  }

  const checkMXRecords = async () => {
    if (!domain.trim()) return

    setIsLoading(true)
    setResult(null)

    const startTime = Date.now()

    try {
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=MX`,
        { headers: { Accept: 'application/dns-json' } }
      )

      const data = await response.json()
      const responseTime = Date.now() - startTime

      const mxRecords: MXRecord[] = (data.Answer || [])
        .filter((record: { type: number }) => record.type === 15)
        .map((record: { data: string }) => {
          const parts = record.data.split(' ')
          const priority = parseInt(parts[0], 10)
          const host = parts[1]?.replace(/\.$/, '') || ''
          return { priority, host, provider: detectProvider(host) }
        })
        .sort((a: MXRecord, b: MXRecord) => a.priority - b.priority)

      const mainProvider = mxRecords.length > 0 ? mxRecords[0].provider : undefined

      setResult({
        domain: cleanDomain,
        mxRecords,
        hasMX: mxRecords.length > 0,
        provider: mainProvider,
        checkedAt: new Date(),
        responseTime
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyResults = () => {
    if (!result) return
    const text = result.mxRecords.map(mx => `${mx.priority} ${mx.host}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <ToolHero
        icon={ServerIcon}
        title="MX Record Check"
        description="Analysiere die Mailserver-Konfiguration einer Domain"
      >
        <div className="flex w-full gap-2 md:w-96">
          <Input
            placeholder="beispiel.de"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkMXRecords()}
            className="h-12"
          />
          <Button
            onClick={checkMXRecords}
            disabled={isLoading || !domain.trim()}
            className="h-12 px-6"
          >
            {isLoading ? (
              <Loader2Icon className="size-5 animate-spin" />
            ) : (
              <>
                <SearchIcon className="mr-2 size-5" />
                Prüfen
              </>
            )}
          </Button>
        </div>
      </ToolHero>

      {/* Loading */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <ServerIcon className="size-12 text-muted-foreground" />
                </motion.div>
                <p className="mt-4 text-muted-foreground">MX Records werden abgerufen...</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Row */}
            <div className="grid gap-4 sm:grid-cols-4">
              {/* Provider Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="sm:col-span-2"
              >
                <Card className="h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 text-3xl text-white">
                      {result.provider ? providerLogos[result.provider] : '📧'}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Provider</p>
                      <p className="text-2xl font-bold">{result.provider || 'Unbekannt'}</p>
                      <p className="text-sm text-muted-foreground">{result.domain}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Records Count */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Card className="h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className={`flex size-12 items-center justify-center rounded-xl ${
                      result.hasMX ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {result.hasMX ? (
                        <MailIcon className="size-6 text-green-600" />
                      ) : (
                        <XCircleIcon className="size-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">MX Records</p>
                      <p className="text-2xl font-bold">{result.mxRecords.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100">
                      <ClockIcon className="size-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Response</p>
                      <p className="text-2xl font-bold">{result.responseTime}ms</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className={result.hasMX ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
                <CardContent className="flex items-center gap-4 p-6">
                  {result.hasMX ? (
                    <>
                      <CheckCircleIcon className="size-8 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">Email-Empfang möglich</p>
                        <p className="text-sm text-green-700">
                          Die Domain hat gültige MX-Records konfiguriert.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="size-8 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-800">Keine MX-Records gefunden</p>
                        <p className="text-sm text-red-700">
                          Diese Domain kann keine Emails empfangen.
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* MX Records List */}
            {result.mxRecords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">MX Records</CardTitle>
                    <Button variant="outline" size="sm" onClick={copyResults}>
                      {copied ? (
                        <CheckIcon className="mr-2 size-4" />
                      ) : (
                        <CopyIcon className="mr-2 size-4" />
                      )}
                      {copied ? 'Kopiert' : 'Kopieren'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.mxRecords.map((mx, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + index * 0.05 }}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 text-white font-bold">
                              {mx.priority}
                            </div>
                            <div>
                              <code className="text-sm">{mx.host}</code>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {mx.provider}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">Priorität {mx.priority}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Weitere Aktionen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link href={`/tools/dns-checker?domain=${result.domain}`}>
                      <Button variant="outline" className="w-full justify-between">
                        Alle DNS Records prüfen
                        <ArrowRightIcon className="size-4" />
                      </Button>
                    </Link>
                    <Link href={`/tools/blacklist-pruefer?domain=${result.domain}`}>
                      <Button variant="outline" className="w-full justify-between">
                        Blacklist Status prüfen
                        <ArrowRightIcon className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info when no result */}
      {!result && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Was sind MX Records?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong>MX Records</strong> (Mail Exchange Records) legen fest, welche Server für
                den Email-Empfang einer Domain zuständig sind.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100">
                    <ShieldIcon className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Priorität</p>
                    <p className="text-xs">Niedrigere Zahl = höhere Priorität</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100">
                    <ServerIcon className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Redundanz</p>
                    <p className="text-xs">Mehrere MX Records für Ausfallsicherheit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100">
                    <MailIcon className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Routing</p>
                    <p className="text-xs">Bestimmt wohin Emails zugestellt werden</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default MXRecordCheckPage
