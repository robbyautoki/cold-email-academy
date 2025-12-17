'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  SparklesIcon,
  CopyIcon,
  CheckIcon,
  Loader2Icon,
  UsersIcon,
  TargetIcon,
  PaletteIcon,
  SettingsIcon,
  MailIcon,
  RefreshCwIcon,
  ClockIcon,
  FileTextIcon,
  ShieldCheckIcon,
  PhoneIcon,
  MessageSquareIcon,
  LinkIcon,
  SendIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

// Zielgruppen Presets
const audiencePresets = [
  { id: 'saas', label: 'SaaS Gründer', icon: '🚀' },
  { id: 'ecommerce', label: 'E-Commerce Manager', icon: '🛒' },
  { id: 'marketing', label: 'Marketing Leiter', icon: '📈' },
  { id: 'agency', label: 'Agenturinhaber', icon: '🏢' },
  { id: 'freelancer', label: 'Freelancer', icon: '💻' },
  { id: 'ceo', label: 'CEO / Geschäftsführer', icon: '👔' }
]

// E-Mail Stil Templates
const styleTemplates = [
  {
    id: 'direct',
    name: 'Direkt',
    description: 'Kurz & auf den Punkt',
    icon: '🎯'
  },
  {
    id: 'professional',
    name: 'Professionell',
    description: 'Business-Style',
    icon: '💼'
  },
  {
    id: 'personal',
    name: 'Persönlich',
    description: 'Warm & nahbar',
    icon: '🤝'
  },
  {
    id: 'aida',
    name: 'AIDA',
    description: 'Attention-Interest-Desire-Action',
    icon: '🔥'
  }
]

// CTA Optionen
const ctaOptions = [
  { id: 'call', label: 'Call buchen', icon: PhoneIcon },
  { id: 'demo', label: 'Demo anfragen', icon: MessageSquareIcon },
  { id: 'reply', label: 'Antwort erbitten', icon: MailIcon },
  { id: 'link', label: 'Link klicken', icon: LinkIcon }
]

// Längen Optionen
const lengthOptions = [
  { id: 'short', label: 'Kurz', words: '50-80' },
  { id: 'medium', label: 'Mittel', words: '80-120' },
  { id: 'long', label: 'Lang', words: '120-180' }
]

export default function AIEmailWriterPage() {
  // Input States
  const [audience, setAudience] = useState('')
  const [customAudience, setCustomAudience] = useState('')
  const [context, setContext] = useState('')
  const [style, setStyle] = useState('professional')
  const [cta, setCta] = useState('call')
  const [length, setLength] = useState('medium')
  const [includeSocialProof, setIncludeSocialProof] = useState(true)

  // Output States
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [signature, setSignature] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const effectiveAudience = customAudience || audience

  const handleGenerate = async () => {
    if (!effectiveAudience || !context) return

    setIsGenerating(true)
    setSubject('')
    setBody('')
    setSignature('')

    try {
      const response = await fetch('/api/ai-email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetAudience: effectiveAudience,
          context,
          style,
          cta,
          length,
          includeSocialProof
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Typewriter Effekt simulieren
        await typewriterEffect(data.subject, setSubject, 20)
        await typewriterEffect(data.body, setBody, 5)
        await typewriterEffect(data.signature, setSignature, 15)
      }
    } catch (error) {
      console.error('Fehler beim Generieren:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const typewriterEffect = async (
    text: string,
    setter: (val: string) => void,
    speed: number
  ) => {
    for (let i = 0; i <= text.length; i++) {
      setter(text.slice(0, i))
      await new Promise((resolve) => setTimeout(resolve, speed))
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

  // Stats berechnen
  const wordCount = body.split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  const spamScore = body.toLowerCase().includes('gratis') || body.toLowerCase().includes('kostenlos')
    ? 'mittel'
    : body.toLowerCase().includes('!!!') || body.toUpperCase() === body
    ? 'hoch'
    : 'niedrig'

  const isReadyToGenerate = effectiveAudience && context.length > 20

  return (
    <div className='space-y-6'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative overflow-hidden rounded-2xl border bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 p-8'
      >
        <div className='absolute -right-20 -top-20 size-64 rounded-full bg-violet-500/10 blur-3xl' />
        <div className='absolute -bottom-20 -left-20 size-64 rounded-full bg-purple-500/10 blur-3xl' />

        <div className='relative flex items-center gap-4'>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className='flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/30'
          >
            <SparklesIcon className='size-8 text-white' />
          </motion.div>
          <div>
            <div className='flex items-center gap-3'>
              <h1 className='text-3xl font-bold'>AI Cold E-Mail Writer</h1>
              <Badge className='bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 shadow-[0_0_20px_rgba(139,92,246,0.5)]'>
                AI-Powered
              </Badge>
            </div>
            <p className='mt-1 text-muted-foreground'>
              Generiere überzeugende Cold E-Mails die wirklich geöffnet werden
            </p>
          </div>
        </div>
      </motion.div>

      <div className='grid gap-6 lg:grid-cols-5'>
        {/* Linke Seite: Input Cards */}
        <div className='lg:col-span-3 space-y-4'>
          {/* Zielgruppe Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <UsersIcon className='size-5 text-violet-500' />
                  Zielgruppe
                  {effectiveAudience && (
                    <Badge variant='secondary' className='ml-auto'>
                      {effectiveAudience}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
                  {audiencePresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setAudience(preset.label)
                        setCustomAudience('')
                      }}
                      className={`relative rounded-lg border-2 p-3 text-left transition-all hover:shadow-md ${
                        audience === preset.label && !customAudience
                          ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
                          : 'border-border hover:border-violet-300'
                      }`}
                    >
                      {audience === preset.label && !customAudience && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='absolute -right-1.5 -top-1.5'
                        >
                          <div className='flex size-5 items-center justify-center rounded-full bg-violet-500 text-white'>
                            <CheckIcon className='size-3' />
                          </div>
                        </motion.div>
                      )}
                      <span className='text-lg'>{preset.icon}</span>
                      <p className='mt-1 text-sm font-medium'>{preset.label}</p>
                    </button>
                  ))}
                </div>
                <div className='relative'>
                  <Input
                    placeholder='Oder eigene Zielgruppe eingeben...'
                    value={customAudience}
                    onChange={(e) => {
                      setCustomAudience(e.target.value)
                      setAudience('')
                    }}
                    className='h-11'
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Angebot / Pain Point Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <TargetIcon className='size-5 text-violet-500' />
                  Dein Angebot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder='Beschreibe dein Angebot und welches Problem du löst. Was ist der konkrete Nutzen für deine Zielgruppe? Was soll der Empfänger tun?'
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={5}
                  className='resize-none'
                />
                <div className='mt-2 flex items-center justify-between text-xs text-muted-foreground'>
                  <span>Je detaillierter, desto besser die E-Mail</span>
                  <span className={context.length > 50 ? 'text-green-500' : ''}>
                    {context.length} Zeichen
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* E-Mail Stil Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <PaletteIcon className='size-5 text-violet-500' />
                  E-Mail Stil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
                  {styleTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setStyle(template.id)}
                      className={`relative rounded-xl border-2 p-4 text-center transition-all hover:shadow-md ${
                        style === template.id
                          ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
                          : 'border-border hover:border-violet-300'
                      }`}
                    >
                      {style === template.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='absolute -right-1.5 -top-1.5'
                        >
                          <div className='flex size-5 items-center justify-center rounded-full bg-violet-500 text-white'>
                            <CheckIcon className='size-3' />
                          </div>
                        </motion.div>
                      )}
                      <span className='text-2xl'>{template.icon}</span>
                      <p className='mt-2 font-medium text-sm'>{template.name}</p>
                      <p className='text-xs text-muted-foreground'>{template.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Optionen Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <SettingsIcon className='size-5 text-violet-500' />
                  Weitere Optionen
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-5'>
                {/* CTA */}
                <div className='space-y-2'>
                  <Label className='text-sm font-medium'>Call-to-Action</Label>
                  <div className='flex flex-wrap gap-2'>
                    {ctaOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setCta(option.id)}
                        className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm transition-all ${
                          cta === option.id
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
                            : 'border-border hover:border-violet-300'
                        }`}
                      >
                        <option.icon className='size-4' />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Länge */}
                <div className='space-y-2'>
                  <Label className='text-sm font-medium'>Länge</Label>
                  <div className='flex gap-2'>
                    {lengthOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setLength(option.id)}
                        className={`flex-1 rounded-lg border-2 px-3 py-2 text-sm transition-all ${
                          length === option.id
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
                            : 'border-border hover:border-violet-300'
                        }`}
                      >
                        <p className='font-medium'>{option.label}</p>
                        <p className='text-xs text-muted-foreground'>{option.words} Wörter</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Proof Toggle */}
                <div className='flex items-center justify-between rounded-lg border p-3'>
                  <div>
                    <Label className='text-sm font-medium'>Social Proof einbauen</Label>
                    <p className='text-xs text-muted-foreground'>
                      Referenzen, Zahlen oder Erfolge erwähnen
                    </p>
                  </div>
                  <Switch
                    checked={includeSocialProof}
                    onCheckedChange={setIncludeSocialProof}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generate Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleGenerate}
              disabled={!isReadyToGenerate || isGenerating}
              className='w-full h-14 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-xl shadow-violet-500/25 text-lg font-semibold disabled:opacity-50'
            >
              {isGenerating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='mr-3'
                >
                  <Loader2Icon className='size-6' />
                </motion.div>
              ) : (
                <SparklesIcon className='mr-3 size-6' />
              )}
              {isGenerating ? 'Generiere E-Mail...' : 'E-Mail generieren'}
            </Button>
            {!isReadyToGenerate && (
              <p className='mt-2 text-center text-sm text-muted-foreground'>
                Wähle eine Zielgruppe und beschreibe dein Angebot (min. 20 Zeichen)
              </p>
            )}
          </motion.div>
        </div>

        {/* Rechte Seite: Preview & Export */}
        <div className='lg:col-span-2 space-y-4 lg:sticky lg:top-20 lg:self-start'>
          {/* Email Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className='overflow-hidden'>
              <CardHeader className='pb-3 bg-muted/30'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <MailIcon className='size-5 text-violet-500' />
                  E-Mail Vorschau
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                {/* Email Client Look */}
                <div className='border-b bg-muted/20 px-4 py-3 space-y-1'>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='text-muted-foreground w-12'>Von:</span>
                    <span className='font-medium'>Du</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='text-muted-foreground w-12'>An:</span>
                    <span className='font-medium'>{effectiveAudience || '[Zielgruppe]'}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='text-muted-foreground w-12'>Betreff:</span>
                    <span className='font-semibold text-violet-600'>
                      {subject || '[Betreff wird generiert]'}
                    </span>
                  </div>
                </div>

                {/* Email Body */}
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={body}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='p-4 min-h-[200px]'
                  >
                    {body ? (
                      <div className='space-y-4'>
                        <div className='whitespace-pre-wrap text-sm leading-relaxed'>
                          {body}
                        </div>
                        {signature && (
                          <div className='pt-4 border-t text-sm text-muted-foreground whitespace-pre-wrap'>
                            {signature}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center h-[200px] text-muted-foreground'>
                        <SendIcon className='size-12 mb-3 opacity-20' />
                        <p className='text-sm'>Deine E-Mail erscheint hier</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Export Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Exportieren</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='grid grid-cols-2 gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleCopy(subject, 'subject')}
                    disabled={!subject}
                    className='h-9'
                  >
                    {copiedField === 'subject' ? (
                      <CheckIcon className='mr-2 size-4 text-green-500' />
                    ) : (
                      <CopyIcon className='mr-2 size-4' />
                    )}
                    Betreff
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleCopy(body, 'body')}
                    disabled={!body}
                    className='h-9'
                  >
                    {copiedField === 'body' ? (
                      <CheckIcon className='mr-2 size-4 text-green-500' />
                    ) : (
                      <CopyIcon className='mr-2 size-4' />
                    )}
                    Inhalt
                  </Button>
                </div>
                <Button
                  onClick={handleCopyAll}
                  disabled={!subject && !body}
                  className='w-full'
                >
                  {copiedField === 'all' ? (
                    <>
                      <CheckIcon className='mr-2 size-4' />
                      Kopiert!
                    </>
                  ) : (
                    <>
                      <CopyIcon className='mr-2 size-4' />
                      Alles kopieren
                    </>
                  )}
                </Button>
                <Button
                  variant='outline'
                  onClick={handleGenerate}
                  disabled={!isReadyToGenerate || isGenerating}
                  className='w-full'
                >
                  <RefreshCwIcon className='mr-2 size-4' />
                  Neu generieren
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Card */}
          {body && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base'>Statistiken</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-3 gap-4 text-center'>
                    <div>
                      <div className='flex items-center justify-center gap-1 text-muted-foreground mb-1'>
                        <FileTextIcon className='size-4' />
                      </div>
                      <p className='text-2xl font-bold'>{wordCount}</p>
                      <p className='text-xs text-muted-foreground'>Wörter</p>
                    </div>
                    <div>
                      <div className='flex items-center justify-center gap-1 text-muted-foreground mb-1'>
                        <ClockIcon className='size-4' />
                      </div>
                      <p className='text-2xl font-bold'>{readTime}</p>
                      <p className='text-xs text-muted-foreground'>Min. Lesezeit</p>
                    </div>
                    <div>
                      <div className='flex items-center justify-center gap-1 text-muted-foreground mb-1'>
                        <ShieldCheckIcon className='size-4' />
                      </div>
                      <p className={`text-2xl font-bold ${
                        spamScore === 'niedrig' ? 'text-green-500' :
                        spamScore === 'mittel' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {spamScore === 'niedrig' ? '✓' : spamScore === 'mittel' ? '!' : '✗'}
                      </p>
                      <p className='text-xs text-muted-foreground'>Spam-Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
