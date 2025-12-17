'use client'

import { useState } from 'react'
import { SparklesIcon, CopyIcon, CheckIcon, Loader2Icon, MailIcon, UsersIcon, MessageSquareIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AIEmailWriterPage() {
  const [targetAudience, setTargetAudience] = useState('')
  const [context, setContext] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!targetAudience || !context) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai-email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetAudience, context })
      })

      if (response.ok) {
        const data = await response.json()
        setGeneratedEmail(data.email)
      }
    } catch (error) {
      console.error('Fehler beim Generieren:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='border-b bg-gradient-to-b from-violet-500/5 to-transparent'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25'>
              <SparklesIcon className='size-6 text-white' />
            </div>
            <Badge className='bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 shadow-[0_0_15px_rgba(139,92,246,0.4)]'>
              AI-Powered
            </Badge>
          </div>
          <h1 className='text-center text-3xl font-bold tracking-tight sm:text-4xl'>
            AI Cold E-Mail Writer
          </h1>
          <p className='mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto'>
            Generiere personalisierte Cold E-Mails in Sekunden. Gib einfach deine Zielgruppe und den Kontext ein – unsere AI erstellt die perfekte E-Mail für dich.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid gap-8 lg:grid-cols-2'>
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <UsersIcon className='size-5 text-violet-500' />
                Eingaben
              </CardTitle>
              <CardDescription>
                Beschreibe deine Zielgruppe und was du erreichen möchtest
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='targetAudience'>Zielgruppe</Label>
                <Input
                  id='targetAudience'
                  placeholder='z.B. SaaS Gründer, E-Commerce Manager, Marketing Leiter...'
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
                <p className='text-xs text-muted-foreground'>
                  Wer soll die E-Mail erhalten?
                </p>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='context'>Kontext / Angebot</Label>
                <Textarea
                  id='context'
                  placeholder='z.B. Ich biete eine Software an, die automatisch Leads generiert und möchte ein Erstgespräch vereinbaren...'
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={5}
                />
                <p className='text-xs text-muted-foreground'>
                  Was bietest du an und was ist dein Ziel?
                </p>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!targetAudience || !context || isGenerating}
                className='w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/25'
              >
                {isGenerating ? (
                  <>
                    <Loader2Icon className='mr-2 size-4 animate-spin' />
                    Generiere E-Mail...
                  </>
                ) : (
                  <>
                    <SparklesIcon className='mr-2 size-4' />
                    E-Mail generieren
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MailIcon className='size-5 text-violet-500' />
                Generierte E-Mail
              </CardTitle>
              <CardDescription>
                Bearbeite und kopiere deine generierte E-Mail
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Textarea
                placeholder='Deine generierte E-Mail erscheint hier...'
                value={generatedEmail}
                onChange={(e) => setGeneratedEmail(e.target.value)}
                rows={12}
                className='font-mono text-sm'
              />

              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  onClick={handleCopy}
                  disabled={!generatedEmail}
                  className='flex-1'
                >
                  {copied ? (
                    <>
                      <CheckIcon className='mr-2 size-4 text-green-500' />
                      Kopiert!
                    </>
                  ) : (
                    <>
                      <CopyIcon className='mr-2 size-4' />
                      Kopieren
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MessageSquareIcon className='size-5 text-violet-500' />
              Tipps für bessere Ergebnisse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              <li className='flex items-start gap-2 text-sm text-muted-foreground'>
                <span className='mt-1 size-1.5 rounded-full bg-violet-500 shrink-0' />
                Sei spezifisch bei der Zielgruppe
              </li>
              <li className='flex items-start gap-2 text-sm text-muted-foreground'>
                <span className='mt-1 size-1.5 rounded-full bg-violet-500 shrink-0' />
                Beschreibe den konkreten Nutzen
              </li>
              <li className='flex items-start gap-2 text-sm text-muted-foreground'>
                <span className='mt-1 size-1.5 rounded-full bg-violet-500 shrink-0' />
                Nenne ein klares Ziel (z.B. Call)
              </li>
              <li className='flex items-start gap-2 text-sm text-muted-foreground'>
                <span className='mt-1 size-1.5 rounded-full bg-violet-500 shrink-0' />
                Erwähne Social Proof wenn möglich
              </li>
              <li className='flex items-start gap-2 text-sm text-muted-foreground'>
                <span className='mt-1 size-1.5 rounded-full bg-violet-500 shrink-0' />
                Personalisiere nach dem Generieren
              </li>
              <li className='flex items-start gap-2 text-sm text-muted-foreground'>
                <span className='mt-1 size-1.5 rounded-full bg-violet-500 shrink-0' />
                Teste verschiedene Varianten
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
