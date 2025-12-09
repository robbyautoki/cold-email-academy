'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  AlertTriangleIcon,
  SearchIcon,
  CheckCircleIcon,
  XCircleIcon,
  Loader2Icon,
  ShieldIcon,
  ShieldCheckIcon,
  ShieldAlertIcon,
  HelpCircleIcon,
  ServerIcon,
  GlobeIcon,
  RefreshCwIcon,
  ExternalLinkIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import { ToolHero } from '@/components/tools/shared'

interface BlacklistResult {
  name: string
  listed: boolean | null
  checked: boolean
}

// Bekannte Blacklists (DNS-basiert)
const BLACKLISTS = [
  { name: 'Spamhaus ZEN', dns: 'zen.spamhaus.org', description: 'Meistgenutzte Blacklist weltweit' },
  { name: 'Spamcop', dns: 'bl.spamcop.net', description: 'Community-basierte Spam-Reports' },
  { name: 'Barracuda', dns: 'b.barracudacentral.org', description: 'Enterprise Security Provider' },
  { name: 'SORBS', dns: 'dnsbl.sorbs.net', description: 'Spam & Open Relay Blocking System' },
  { name: 'SpamRATS', dns: 'noptr.spamrats.com', description: 'Dynamische IP & Proxy Detection' },
  { name: 'UCEPROTECT L1', dns: 'dnsbl-1.uceprotect.net', description: 'Einzelne IP Listings' },
  { name: 'Invaluement', dns: 'dnsbl.invaluement.com', description: 'Anti-Spam Blacklist' },
  { name: 'Mailspike', dns: 'bl.mailspike.net', description: 'Real-time Spam Detection' }
]

const BlacklistPrueferPage = () => {
  const [domain, setDomain] = useState('')
  const [resolvedIP, setResolvedIP] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<BlacklistResult[]>([])
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [currentlyChecking, setCurrentlyChecking] = useState<string | null>(null)

  const reverseIP = (ip: string): string => {
    return ip.split('.').reverse().join('.')
  }

  const resolvedomainToIP = async (domain: string): Promise<string | null> => {
    try {
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=A`,
        { headers: { Accept: 'application/dns-json' } }
      )
      const data = await response.json()

      if (data.Status === 0 && data.Answer && data.Answer.length > 0) {
        const aRecord = data.Answer.find((r: { type: number }) => r.type === 1)
        if (aRecord) {
          return aRecord.data
        }
      }
      return null
    } catch {
      return null
    }
  }

  const checkBlacklist = async (reversedIP: string, blacklist: { name: string; dns: string }): Promise<BlacklistResult> => {
    try {
      const query = `${reversedIP}.${blacklist.dns}`
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${query}&type=A`,
        { headers: { Accept: 'application/dns-json' } }
      )
      const data = await response.json()

      if (data.Status === 3 || !data.Answer || data.Answer.length === 0) {
        return { name: blacklist.name, listed: false, checked: true }
      }

      const answerIP = data.Answer[0]?.data || ''

      if (answerIP.startsWith('127.255.255.')) {
        return { name: blacklist.name, listed: null, checked: true }
      }

      const listed = answerIP.startsWith('127.0.0.') || answerIP.startsWith('127.0.1.')

      return { name: blacklist.name, listed, checked: true }
    } catch {
      return { name: blacklist.name, listed: null, checked: true }
    }
  }

  const checkAllBlacklists = async () => {
    if (!domain.trim()) return

    setIsLoading(true)
    setError(null)
    setResults([])
    setProgress(0)
    setResolvedIP(null)
    setCurrentlyChecking(null)

    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]

    const ip = await resolvedomainToIP(cleanDomain)

    if (!ip) {
      setError('Domain konnte nicht aufgelöst werden. Bitte prüfe die Eingabe.')
      setIsLoading(false)
      return
    }

    setResolvedIP(ip)
    const reversedIP = reverseIP(ip)
    const newResults: BlacklistResult[] = []

    for (let i = 0; i < BLACKLISTS.length; i++) {
      setCurrentlyChecking(BLACKLISTS[i].name)
      const result = await checkBlacklist(reversedIP, BLACKLISTS[i])
      newResults.push(result)
      setResults([...newResults])
      setProgress(((i + 1) / BLACKLISTS.length) * 100)

      if (i < BLACKLISTS.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    }

    setCurrentlyChecking(null)
    setIsLoading(false)
  }

  const listedCount = results.filter(r => r.listed === true).length
  const cleanCount = results.filter(r => r.listed === false).length
  const unknownCount = results.filter(r => r.listed === null).length

  const getStatusIcon = (listed: boolean | null) => {
    if (listed === true) return <XCircleIcon className="size-5 text-red-500" />
    if (listed === false) return <CheckCircleIcon className="size-5 text-green-500" />
    return <HelpCircleIcon className="size-5 text-muted-foreground" />
  }

  const getStatusBadge = (listed: boolean | null) => {
    if (listed === true) return <Badge variant="destructive">Gelistet</Badge>
    if (listed === false) return <Badge variant="secondary" className="bg-green-500/10 text-green-700 border-green-500/20">Sauber</Badge>
    return <Badge variant="outline">Unbekannt</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <ToolHero
        icon={AlertTriangleIcon}
        title="Blacklist Prüfer"
        description="Prüfe ob deine Domain auf Spam-Blacklists steht"
      >
        <div className="flex w-full gap-2 md:w-96">
          <Input
            placeholder="beispiel.de"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAllBlacklists()}
            className="h-12"
          />
          <Button
            onClick={checkAllBlacklists}
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

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-red-500 bg-red-50">
            <CardContent className="flex items-center gap-3 py-4">
              <AlertTriangleIcon className="size-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Loading Progress */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                    <span className="text-sm">
                      Prüfe: <span className="font-medium">{currentlyChecking}</span>
                    </span>
                  </div>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Row */}
            <div className="grid gap-4 sm:grid-cols-4">
              {/* Domain Info */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 text-white">
                      <GlobeIcon className="size-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Domain</p>
                      <p className="font-bold truncate">{domain}</p>
                      {resolvedIP && (
                        <p className="text-xs text-muted-foreground">{resolvedIP}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Clean Count */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Card className={`h-full ${cleanCount > 0 && listedCount === 0 ? 'border-green-500' : ''}`}>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-green-100">
                      <ShieldCheckIcon className="size-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sauber</p>
                      <p className="text-3xl font-bold text-green-600">{cleanCount}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Listed Count */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className={`h-full ${listedCount > 0 ? 'border-red-500' : ''}`}>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className={`flex size-12 items-center justify-center rounded-xl ${listedCount > 0 ? 'bg-red-100' : 'bg-muted'}`}>
                      <ShieldAlertIcon className={`size-6 ${listedCount > 0 ? 'text-red-600' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gelistet</p>
                      <p className={`text-3xl font-bold ${listedCount > 0 ? 'text-red-600' : ''}`}>{listedCount}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Unknown Count */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Card className="h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-100">
                      <HelpCircleIcon className="size-6 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unbekannt</p>
                      <p className="text-3xl font-bold">{unknownCount}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Status Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className={listedCount > 0 ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}>
                <CardContent className="flex items-center gap-4 py-6">
                  {listedCount > 0 ? (
                    <>
                      <div className="flex size-14 items-center justify-center rounded-full bg-red-100">
                        <ShieldAlertIcon className="size-7 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-red-800">
                          Achtung: Deine Domain ist auf {listedCount} Blacklist{listedCount > 1 ? 's' : ''} gelistet!
                        </p>
                        <p className="text-sm text-red-700 mt-1">
                          Dies kann die Zustellbarkeit deiner Emails erheblich beeinträchtigen.
                          Kontaktiere den Blacklist-Betreiber für eine Delisting-Anfrage.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
                        <ShieldCheckIcon className="size-7 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Alles in Ordnung!</p>
                        <p className="text-sm text-green-700 mt-1">
                          {domain} ist auf keiner der geprüften Blacklists. Deine Email-Zustellbarkeit sollte nicht beeinträchtigt sein.
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Blacklist Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Blacklist Status</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={checkAllBlacklists}
                    disabled={isLoading}
                  >
                    <RefreshCwIcon className={`mr-2 size-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Erneut prüfen
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {BLACKLISTS.map((blacklist, index) => {
                      const result = results.find(r => r.name === blacklist.name)
                      const isChecking = currentlyChecking === blacklist.name

                      return (
                        <motion.div
                          key={blacklist.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className={`relative flex items-center justify-between rounded-lg border p-4 transition-all ${
                            isChecking ? 'border-primary bg-primary/5' :
                            result?.listed === true ? 'border-red-500/50 bg-red-50' :
                            result?.listed === false ? 'border-green-500/30 bg-green-50/50' :
                            ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex size-10 items-center justify-center rounded-lg ${
                              result?.listed === true ? 'bg-red-100' :
                              result?.listed === false ? 'bg-green-100' :
                              'bg-muted'
                            }`}>
                              {isChecking ? (
                                <Loader2Icon className="size-5 animate-spin text-primary" />
                              ) : result ? (
                                getStatusIcon(result.listed)
                              ) : (
                                <ServerIcon className="size-5 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{blacklist.name}</p>
                              <p className="text-xs text-muted-foreground">{blacklist.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {result && getStatusBadge(result.listed)}
                            {result?.listed === true && (
                              <Button variant="ghost" size="icon" className="size-8" asChild>
                                <a
                                  href={`https://www.google.com/search?q=${blacklist.name}+delisting`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLinkIcon className="size-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info when no results */}
      {results.length === 0 && !isLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldIcon className="size-5" />
                Was sind Blacklists?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                <strong>Email-Blacklists</strong> sind Datenbanken, die IP-Adressen von bekannten
                Spam-Versendern sammeln. Mailserver nutzen diese Listen, um Spam zu blockieren.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-red-100">
                    <XCircleIcon className="size-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Gelistet = Problem</p>
                    <p className="text-xs text-muted-foreground">
                      Emails können als Spam markiert oder abgelehnt werden
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-green-100">
                    <CheckCircleIcon className="size-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sauber = Gut</p>
                    <p className="text-xs text-muted-foreground">
                      Keine Einschränkungen bei der Zustellung
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-dashed p-4">
                <p className="text-sm font-medium mb-2">Häufige Gründe für Blacklisting:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-muted-foreground" />
                    Versand von Spam oder Massen-Emails ohne Einwilligung
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-muted-foreground" />
                    Kompromittierter Server durch Malware
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-muted-foreground" />
                    Shared Hosting mit problematischen Nutzern
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-muted-foreground" />
                    Hohe Bounce-Raten durch ungültige Empfänger
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default BlacklistPrueferPage
