'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  GlobeIcon,
  SearchIcon,
  Loader2Icon,
  CopyIcon,
  CheckIcon,
  ServerIcon,
  MailIcon,
  FileTextIcon,
  NetworkIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ShieldIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { ToolHero } from '@/components/tools/shared'

interface DNSRecord {
  type: string
  name: string
  value: string
  ttl?: number
}

interface DNSResult {
  domain: string
  records: {
    A: DNSRecord[]
    AAAA: DNSRecord[]
    CNAME: DNSRecord[]
    MX: DNSRecord[]
    TXT: DNSRecord[]
    NS: DNSRecord[]
  }
  checkedAt: Date
  responseTime: number
}

const recordTypeConfig: Record<string, {
  icon: typeof GlobeIcon
  label: string
  description: string
  priority: number
  span: string
}> = {
  A: {
    icon: ServerIcon,
    label: 'A Records',
    description: 'IPv4-Adressen',
    priority: 1,
    span: 'sm:col-span-1'
  },
  AAAA: {
    icon: ServerIcon,
    label: 'AAAA Records',
    description: 'IPv6-Adressen',
    priority: 2,
    span: 'sm:col-span-1'
  },
  MX: {
    icon: MailIcon,
    label: 'MX Records',
    description: 'Mailserver',
    priority: 3,
    span: 'sm:col-span-2'
  },
  TXT: {
    icon: FileTextIcon,
    label: 'TXT Records',
    description: 'SPF, DKIM, DMARC',
    priority: 4,
    span: 'sm:col-span-2'
  },
  NS: {
    icon: NetworkIcon,
    label: 'NS Records',
    description: 'Nameserver',
    priority: 5,
    span: 'sm:col-span-1'
  },
  CNAME: {
    icon: GlobeIcon,
    label: 'CNAME Records',
    description: 'Alias',
    priority: 6,
    span: 'sm:col-span-1'
  }
}

const DNSCheckerPage = () => {
  const [domain, setDomain] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DNSResult | null>(null)
  const [copiedType, setCopiedType] = useState<string | null>(null)

  const queryDNS = async (domain: string, type: string): Promise<DNSRecord[]> => {
    try {
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`,
        { headers: { Accept: 'application/dns-json' } }
      )
      const data = await response.json()

      if (data.Status !== 0 || !data.Answer) {
        return []
      }

      return data.Answer
        .filter((record: { type: number }) => {
          const typeMap: { [key: string]: number } = {
            A: 1, AAAA: 28, CNAME: 5, MX: 15, TXT: 16, NS: 2
          }
          return record.type === typeMap[type]
        })
        .map((record: { name: string; data: string; TTL: number }) => ({
          type,
          name: record.name.replace(/\.$/, ''),
          value: record.data.replace(/\.$/, '').replace(/^"|"$/g, ''),
          ttl: record.TTL
        }))
    } catch {
      return []
    }
  }

  const checkDNS = async () => {
    if (!domain.trim()) return

    setIsLoading(true)
    setResult(null)

    const startTime = Date.now()

    try {
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]

      const [A, AAAA, CNAME, MX, TXT, NS] = await Promise.all([
        queryDNS(cleanDomain, 'A'),
        queryDNS(cleanDomain, 'AAAA'),
        queryDNS(cleanDomain, 'CNAME'),
        queryDNS(cleanDomain, 'MX'),
        queryDNS(cleanDomain, 'TXT'),
        queryDNS(cleanDomain, 'NS')
      ])

      const responseTime = Date.now() - startTime

      setResult({
        domain: cleanDomain,
        records: { A, AAAA, CNAME, MX, TXT, NS },
        checkedAt: new Date(),
        responseTime
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyRecords = (type: string, records: DNSRecord[]) => {
    const text = records.map(r => r.value).join('\n')
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const totalRecords = result
    ? Object.values(result.records).reduce((sum, arr) => sum + arr.length, 0)
    : 0

  const hasSPF = result?.records.TXT.some(r => r.value.startsWith('v=spf1'))
  const hasDKIM = result?.records.TXT.some(r => r.value.includes('DKIM'))
  const hasDMARC = result?.records.TXT.some(r => r.value.startsWith('v=DMARC1'))

  return (
    <div className="space-y-6">
      {/* Hero mit Bild rechts */}
      <ToolHero
        icon={GlobeIcon}
        title="DNS Checker"
        description="Analysiere alle DNS-Records einer Domain"
        image="/dns_records.png"
      />

      {/* Separate Input Section */}
      <Card>
        <CardContent className="flex justify-center p-6">
          <div className="flex w-full gap-2 md:w-96">
            <div className="relative flex-1">
              <Input
                placeholder="beispiel.de"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && checkDNS()}
                className="h-12 pr-4 pl-4"
              />
            </div>
            <Button
              onClick={checkDNS}
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
        </CardContent>
      </Card>

      {/* Loading State */}
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
                  <GlobeIcon className="size-12 text-muted-foreground" />
                </motion.div>
                <p className="mt-4 text-muted-foreground">DNS Records werden abgerufen...</p>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-100">
                      <GlobeIcon className="size-6 text-zinc-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Domain</p>
                      <p className="font-bold">{result.domain}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-green-100">
                      <CheckCircleIcon className="size-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Records</p>
                      <p className="font-bold">{totalRecords} gefunden</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100">
                      <ClockIcon className="size-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Response</p>
                      <p className="font-bold">{result.responseTime}ms</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-amber-100">
                      <ShieldIcon className="size-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Security</p>
                      <div className="flex gap-1">
                        <Badge variant={hasSPF ? 'default' : 'secondary'} className="text-[10px] px-1.5">SPF</Badge>
                        <Badge variant={hasDKIM ? 'default' : 'secondary'} className="text-[10px] px-1.5">DKIM</Badge>
                        <Badge variant={hasDMARC ? 'default' : 'secondary'} className="text-[10px] px-1.5">DMARC</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Bento Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(result.records)
                .sort((a, b) => {
                  const configA = recordTypeConfig[a[0]]
                  const configB = recordTypeConfig[b[0]]
                  return configA.priority - configB.priority
                })
                .map(([type, records], index) => {
                  const config = recordTypeConfig[type]
                  const Icon = config.icon
                  const hasRecords = records.length > 0

                  return (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className={config.span}
                    >
                      <Card className={`group h-full transition-all hover:shadow-md ${
                        !hasRecords ? 'opacity-60' : ''
                      }`}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`flex size-10 items-center justify-center rounded-lg ${
                                hasRecords
                                  ? 'bg-gradient-to-br from-zinc-700 to-zinc-800 text-white'
                                  : 'bg-zinc-100 text-zinc-400'
                              }`}>
                                <Icon className="size-5" />
                              </div>
                              <div>
                                <CardTitle className="text-base">{config.label}</CardTitle>
                                <p className="text-xs text-muted-foreground">{config.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={hasRecords ? 'default' : 'secondary'}>
                                {records.length}
                              </Badge>
                              {hasRecords && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                                  onClick={() => copyRecords(type, records)}
                                >
                                  {copiedType === type ? (
                                    <CheckIcon className="size-4 text-green-500" />
                                  ) : (
                                    <CopyIcon className="size-4" />
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {!hasRecords ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <AlertCircleIcon className="size-4" />
                              Keine Records gefunden
                            </div>
                          ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {records.map((record, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 + idx * 0.05 }}
                                  className="flex items-start justify-between gap-2 rounded-lg bg-muted p-2"
                                >
                                  <code className="text-xs break-all flex-1">{record.value}</code>
                                  <Badge variant="outline" className="shrink-0 text-[10px]">
                                    {record.ttl}s
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info when no result */}
      {!result && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">DNS Record Typen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(recordTypeConfig).map(([type, config], index) => {
                  const Icon = config.icon
                  return (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-100">
                        <Icon className="size-5 text-zinc-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{config.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default DNSCheckerPage
