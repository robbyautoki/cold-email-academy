'use client'

import { useState } from 'react'
import {
  SparklesIcon,
  CopyIcon,
  CheckIcon,
  Loader2Icon,
  MailIcon,
  UsersIcon,
  PenLineIcon,
  TypeIcon,
  UserIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function AIEmailWriterPage() {
  const [targetAudience, setTargetAudience] = useState('')
  const [context, setContext] = useState('')
  const [tone, setTone] = useState('professional')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [signature, setSignature] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!targetAudience || !context) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai-email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetAudience, context, tone })
      })

      if (response.ok) {
        const data = await response.json()
        setSubject(data.subject || '')
        setBody(data.body || '')
        setSignature(data.signature || '')
      }
    } catch (error) {
      console.error('Fehler beim Generieren:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleCopyAll = async () => {
    const fullEmail = `Betreff: ${subject}\n\n${body}\n\n${signature}`
    await navigator.clipboard.writeText(fullEmail)
    setCopiedField('all')
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='border-b bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent'>
        <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-center gap-3 mb-3'>
            <div className='flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/30'>
              <SparklesIcon className='size-7 text-white' />
            </div>
          </div>
          <div className='flex items-center justify-center gap-2 mb-3'>
            <Badge className='bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 shadow-[0_0_20px_rgba(139,92,246,0.5)] px-4 py-1 text-sm'>
              AI-Powered
            </Badge>
          </div>
          <h1 className='text-center text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text'>
            AI Cold E-Mail Writer
          </h1>
          <p className='mt-4 text-center text-lg text-muted-foreground max-w-3xl mx-auto'>
            Generiere überzeugende Cold E-Mails in Sekunden. Gib deine Zielgruppe und dein Angebot ein –
            unsere AI erstellt Betreff, E-Mail und Signatur für dich.
          </p>
        </div>
      </div>

      {/* Main Content - Breiteres Layout */}
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid gap-8 lg:grid-cols-[400px_1fr]'>
          {/* Input Section - Links */}
          <div className='space-y-6'>
            <Card className='border-2'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <div className='flex size-8 items-center justify-center rounded-lg bg-violet-500/10'>
                    <UsersIcon className='size-4 text-violet-500' />
                  </div>
                  Eingaben
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-5'>
                <div className='space-y-2'>
                  <Label htmlFor='targetAudience' className='text-sm font-medium'>
                    Zielgruppe
                  </Label>
                  <Input
                    id='targetAudience'
                    placeholder='z.B. SaaS Gründer, E-Commerce Manager...'
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className='h-11'
                  />
                  <p className='text-xs text-muted-foreground'>
                    Wer soll die E-Mail erhalten?
                  </p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='context' className='text-sm font-medium'>
                    Dein Angebot / Kontext
                  </Label>
                  <Textarea
                    id='context'
                    placeholder='Beschreibe dein Angebot, den Nutzen für die Zielgruppe und was du erreichen möchtest (z.B. Erstgespräch, Demo-Call)...'
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    rows={6}
                    className='resize-none'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='tone' className='text-sm font-medium'>
                    Ton der E-Mail
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className='h-11'>
                      <SelectValue placeholder='Wähle einen Ton' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='professional'>Professionell</SelectItem>
                      <SelectItem value='casual'>Locker & Freundlich</SelectItem>
                      <SelectItem value='direct'>Direkt & Kurz</SelectItem>
                      <SelectItem value='curious'>Neugierig machend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!targetAudience || !context || isGenerating}
                  className='w-full h-12 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/25 text-base font-medium'
                >
                  {isGenerating ? (
                    <>
                      <Loader2Icon className='mr-2 size-5 animate-spin' />
                      Generiere...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className='mr-2 size-5' />
                      E-Mail generieren
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Section - Rechts */}
          <div className='space-y-4'>
            {/* Betreff */}
            <Card className='border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <div className='flex size-7 items-center justify-center rounded-md bg-violet-500/10'>
                      <TypeIcon className='size-3.5 text-violet-500' />
                    </div>
                    Betreff
                  </CardTitle>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleCopy(subject, 'subject')}
                    disabled={!subject}
                    className='h-8 px-3'
                  >
                    {copiedField === 'subject' ? (
                      <CheckIcon className='size-4 text-green-500' />
                    ) : (
                      <CopyIcon className='size-4' />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder='Der Betreff erscheint hier...'
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className='h-11 font-medium bg-background'
                />
              </CardContent>
            </Card>

            {/* E-Mail Inhalt */}
            <Card className='border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <div className='flex size-7 items-center justify-center rounded-md bg-violet-500/10'>
                      <MailIcon className='size-3.5 text-violet-500' />
                    </div>
                    E-Mail Inhalt
                  </CardTitle>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleCopy(body, 'body')}
                    disabled={!body}
                    className='h-8 px-3'
                  >
                    {copiedField === 'body' ? (
                      <CheckIcon className='size-4 text-green-500' />
                    ) : (
                      <CopyIcon className='size-4' />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder='Der E-Mail Inhalt erscheint hier...'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={10}
                  className='resize-none bg-background'
                />
              </CardContent>
            </Card>

            {/* Signatur */}
            <Card className='border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <div className='flex size-7 items-center justify-center rounded-md bg-violet-500/10'>
                      <PenLineIcon className='size-3.5 text-violet-500' />
                    </div>
                    Signatur
                  </CardTitle>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleCopy(signature, 'signature')}
                    disabled={!signature}
                    className='h-8 px-3'
                  >
                    {copiedField === 'signature' ? (
                      <CheckIcon className='size-4 text-green-500' />
                    ) : (
                      <CopyIcon className='size-4' />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder='Die Signatur erscheint hier...'
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  rows={4}
                  className='resize-none bg-background'
                />
              </CardContent>
            </Card>

            {/* Alles kopieren Button */}
            <Button
              variant='outline'
              onClick={handleCopyAll}
              disabled={!subject && !body && !signature}
              className='w-full h-11 border-2'
            >
              {copiedField === 'all' ? (
                <>
                  <CheckIcon className='mr-2 size-4 text-green-500' />
                  Alles kopiert!
                </>
              ) : (
                <>
                  <CopyIcon className='mr-2 size-4' />
                  Komplette E-Mail kopieren
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            { icon: UsersIcon, text: 'Sei spezifisch bei der Zielgruppe' },
            { icon: SparklesIcon, text: 'Beschreibe den konkreten Nutzen' },
            { icon: MailIcon, text: 'Nenne ein klares Ziel (z.B. Call)' },
            { icon: UserIcon, text: 'Personalisiere nach dem Generieren' }
          ].map((tip, i) => (
            <div
              key={i}
              className='flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3'
            >
              <div className='flex size-8 shrink-0 items-center justify-center rounded-md bg-violet-500/10'>
                <tip.icon className='size-4 text-violet-500' />
              </div>
              <span className='text-sm text-muted-foreground'>{tip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
