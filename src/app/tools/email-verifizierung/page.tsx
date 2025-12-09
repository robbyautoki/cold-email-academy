'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  MailCheckIcon,
  SearchIcon,
  CheckCircleIcon,
  XCircleIcon,
  Loader2Icon,
  AlertCircleIcon,
  FileTextIcon,
  DownloadIcon,
  TrashIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ToolHero } from '@/components/tools/shared'

interface EmailResult {
  email: string
  isValid: boolean
  reason: string
  checks: {
    format: boolean
    domain: boolean
    mx: boolean
    disposable: boolean
  }
}

const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
  'throwaway.email', 'fakeinbox.com', 'trashmail.com', 'yopmail.com',
  'temp-mail.org', 'disposablemail.com', 'getairmail.com', 'mohmal.com'
]

const EmailVerifizierungPage = () => {
  const [emails, setEmails] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<EmailResult[]>([])
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('all')

  const validateEmailFormat = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email.trim())
  }

  const isDisposable = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase()
    return DISPOSABLE_DOMAINS.includes(domain)
  }

  const checkMXRecord = async (domain: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${domain}&type=MX`,
        { headers: { Accept: 'application/dns-json' } }
      )
      const data = await response.json()
      return data.Status === 0 && data.Answer && data.Answer.length > 0
    } catch {
      return false
    }
  }

  const verifyEmails = async () => {
    const emailList = emails
      .split(/[\n,;]/)
      .map(e => e.trim())
      .filter(e => e.length > 0)

    if (emailList.length === 0) return

    setIsLoading(true)
    setResults([])
    setProgress(0)

    const newResults: EmailResult[] = []

    for (let i = 0; i < emailList.length; i++) {
      const email = emailList[i]
      const domain = email.split('@')[1]

      const formatValid = validateEmailFormat(email)
      const disposable = isDisposable(email)
      const hasMX = formatValid && domain ? await checkMXRecord(domain) : false

      let reason = ''
      let isValid = true

      if (!formatValid) {
        reason = 'Ungültiges Format'
        isValid = false
      } else if (disposable) {
        reason = 'Wegwerf-Adresse'
        isValid = false
      } else if (!hasMX) {
        reason = 'Keine MX-Records'
        isValid = false
      } else {
        reason = 'Gültig'
      }

      newResults.push({
        email,
        isValid,
        reason,
        checks: {
          format: formatValid,
          domain: !!domain,
          mx: hasMX,
          disposable: !disposable
        }
      })

      setProgress(((i + 1) / emailList.length) * 100)
      setResults([...newResults])

      if (i < emailList.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200))
      }
    }

    setIsLoading(false)
  }

  const exportResults = (type: 'all' | 'valid' | 'invalid') => {
    let data = results
    if (type === 'valid') data = results.filter(r => r.isValid)
    if (type === 'invalid') data = results.filter(r => !r.isValid)

    const csv = ['Email,Status,Grund', ...data.map(r => `${r.email},${r.isValid ? 'Gültig' : 'Ungültig'},${r.reason}`)].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-verifizierung-${type}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const validResults = results.filter(r => r.isValid)
  const invalidResults = results.filter(r => !r.isValid)
  const emailCount = emails.split(/[\n,;]/).filter(e => e.trim()).length

  return (
    <div className="space-y-6">
      {/* Hero */}
      <ToolHero
        icon={MailCheckIcon}
        title="Email Verifizierung"
        description="Überprüfe Email-Adressen auf Gültigkeit und Zustellbarkeit"
      />

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileTextIcon className="size-5" />
                Email-Adressen eingeben
              </CardTitle>
              <Badge variant="outline">{emailCount} Email(s)</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="max@beispiel.de&#10;anna@firma.com&#10;test@company.org"
              value={emails}
              onChange={e => setEmails(e.target.value)}
              rows={6}
              className="font-mono text-sm"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEmails('')}
                  disabled={!emails.trim() || isLoading}
                >
                  <TrashIcon className="mr-2 size-4" />
                  Leeren
                </Button>
              </div>
              <Button onClick={verifyEmails} disabled={isLoading || !emails.trim()}>
                {isLoading ? (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                ) : (
                  <SearchIcon className="mr-2 size-4" />
                )}
                Verifizieren
              </Button>
            </div>

            {/* Progress */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Verifiziere...</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Row */}
            <div className="grid gap-4 sm:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-100">
                      <MailCheckIcon className="size-6 text-zinc-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Geprüft</p>
                      <p className="text-3xl font-bold">{results.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Card className={validResults.length > 0 ? 'border-green-500' : ''}>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-green-100">
                      <CheckCircleIcon className="size-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gültig</p>
                      <p className="text-3xl font-bold text-green-600">{validResults.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className={invalidResults.length > 0 ? 'border-red-500' : ''}>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-red-100">
                      <XCircleIcon className="size-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ungültig</p>
                      <p className="text-3xl font-bold text-red-600">{invalidResults.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Results Table with Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Ergebnisse</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => exportResults(activeTab as 'all' | 'valid' | 'invalid')}>
                        <DownloadIcon className="mr-2 size-4" />
                        CSV Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">
                        Alle ({results.length})
                      </TabsTrigger>
                      <TabsTrigger value="valid">
                        Gültig ({validResults.length})
                      </TabsTrigger>
                      <TabsTrigger value="invalid">
                        Ungültig ({invalidResults.length})
                      </TabsTrigger>
                    </TabsList>

                    {['all', 'valid', 'invalid'].map(tab => (
                      <TabsContent key={tab} value={tab} className="space-y-2">
                        {(tab === 'all' ? results : tab === 'valid' ? validResults : invalidResults).map((result, index) => (
                          <motion.div
                            key={result.email}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div className="flex items-center gap-3">
                              {result.isValid ? (
                                <CheckCircleIcon className="size-5 text-green-500" />
                              ) : (
                                <XCircleIcon className="size-5 text-red-500" />
                              )}
                              <code className="text-sm">{result.email}</code>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="hidden gap-1 sm:flex">
                                <Badge variant={result.checks.format ? 'default' : 'destructive'} className="text-[10px] px-1.5">
                                  Format
                                </Badge>
                                <Badge variant={result.checks.mx ? 'default' : 'destructive'} className="text-[10px] px-1.5">
                                  MX
                                </Badge>
                                <Badge variant={result.checks.disposable ? 'default' : 'destructive'} className="text-[10px] px-1.5">
                                  Echt
                                </Badge>
                              </div>
                              <Badge variant={result.isValid ? 'secondary' : 'destructive'} className="text-xs">
                                {result.reason}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info when no results */}
      {results.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircleIcon className="size-5" />
                Was wird geprüft?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <Badge>Format</Badge>
                  <p className="text-sm text-muted-foreground">
                    Syntaktische Korrektheit der Email-Adresse
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <Badge>MX</Badge>
                  <p className="text-sm text-muted-foreground">
                    Domain hat gültige Mail-Exchange-Records
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <Badge>Echt</Badge>
                  <p className="text-sm text-muted-foreground">
                    Keine Wegwerf- oder temporäre Adresse
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default EmailVerifizierungPage
