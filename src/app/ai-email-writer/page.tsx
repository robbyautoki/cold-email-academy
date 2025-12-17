'use client'

import { useState, useRef, useCallback } from 'react'
import {
  SparklesIcon,
  CopyIcon,
  CheckIcon,
  Loader2Icon,
  MicIcon,
  StopCircleIcon,
  RefreshCwIcon,
  MailIcon,
  PencilIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AIEmailWriterPage() {
  // Input
  const [prompt, setPrompt] = useState('')

  // Recording
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Output
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [signature, setSignature] = useState('')
  const [framework, setFramework] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  // Formality (du/Sie)
  const [isFormal, setIsFormal] = useState(false)

  // Text Selection
  const [selectedText, setSelectedText] = useState('')
  const [isEditingSelection, setIsEditingSelection] = useState(false)

  // Sprachaufnahme starten
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        audioChunksRef.current = []
        stream.getTracks().forEach(track => track.stop())
        await transcribeAudio(audioBlob)
      }

      mediaRecorder.start()
      mediaRecorderRef.current = mediaRecorder
      setIsRecording(true)
    } catch (error) {
      console.error('Mikrofon-Zugriff verweigert:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true)
    try {
      const formData = new FormData()
      formData.append('file', audioBlob, 'audio.webm')

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const { transcript } = await response.json()
        setPrompt((prev) => prev + (prev ? ' ' : '') + transcript)
      }
    } catch (error) {
      console.error('Transkription fehlgeschlagen:', error)
    } finally {
      setIsTranscribing(false)
    }
  }

  // E-Mail generieren
  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setSubject('')
    setBody('')
    setSignature('')
    setFramework('')

    try {
      const response = await fetch('/api/ai-email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          formal: isFormal
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSubject(data.subject)
        setBody(data.body)
        setSignature(data.signature)
        setFramework(data.framework || '')
      }
    } catch (error) {
      console.error('Fehler beim Generieren:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Du/Sie umschalten
  const toggleFormality = () => {
    setIsFormal(!isFormal)

    if (body) {
      const newBody = convertFormality(body, !isFormal)
      const newSubject = convertFormality(subject, !isFormal)
      setBody(newBody)
      setSubject(newSubject)
    }
  }

  const convertFormality = (text: string, toFormal: boolean): string => {
    if (toFormal) {
      return text
        .replace(/\bdu\b/gi, 'Sie')
        .replace(/\bdich\b/gi, 'Sie')
        .replace(/\bdir\b/gi, 'Ihnen')
        .replace(/\bdein\b/gi, 'Ihr')
        .replace(/\bdeine\b/gi, 'Ihre')
        .replace(/\bdeinen\b/gi, 'Ihren')
        .replace(/\bdeiner\b/gi, 'Ihrer')
        .replace(/\bdeinem\b/gi, 'Ihrem')
        .replace(/\bhast\b/gi, 'haben')
        .replace(/\bbist\b/gi, 'sind')
        .replace(/\bkannst\b/gi, 'können')
        .replace(/\bwillst\b/gi, 'wollen')
        .replace(/\bweißt\b/gi, 'wissen')
    } else {
      return text
        .replace(/\bSie\b/g, 'du')
        .replace(/\bIhnen\b/g, 'dir')
        .replace(/\bIhr\b/g, 'dein')
        .replace(/\bIhre\b/g, 'deine')
        .replace(/\bIhren\b/g, 'deinen')
        .replace(/\bIhrer\b/g, 'deiner')
        .replace(/\bIhrem\b/g, 'deinem')
        .replace(/\bhaben Sie\b/gi, 'hast du')
        .replace(/\bsind Sie\b/gi, 'bist du')
        .replace(/\bkönnen Sie\b/gi, 'kannst du')
        .replace(/\bwollen Sie\b/gi, 'willst du')
        .replace(/\bwissen Sie\b/gi, 'weißt du')
    }
  }

  // Text-Selektion erkennen
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim())
    }
  }, [])

  // Ausgewählten Text neu generieren
  const handleEditSelection = async () => {
    if (!selectedText) return

    setIsEditingSelection(true)

    try {
      const response = await fetch('/api/ai-email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Schreibe diesen Abschnitt um, aber behalte den Kontext bei: "${selectedText}"`,
          formal: isFormal,
          rewriteOnly: true
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Ersetze den ausgewählten Text im Body
        const newBody = body.replace(selectedText, data.rewritten)
        setBody(newBody)
        setSelectedText('')
      }
    } catch (error) {
      console.error('Fehler beim Bearbeiten:', error)
    } finally {
      setIsEditingSelection(false)
    }
  }

  // Alles kopieren
  const handleCopyAll = async () => {
    const fullEmail = `Betreff: ${subject}\n\n${body}\n\n---\n${signature}`
    await navigator.clipboard.writeText(fullEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hasOutput = subject || body

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <div className='flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600'>
          <SparklesIcon className='size-6 text-white' />
        </div>
        <div>
          <h1 className='text-2xl font-bold'>AI E-Mail Writer</h1>
          <p className='text-sm text-muted-foreground'>
            Beschreibe was du sagen willst - per Text oder Sprache
          </p>
        </div>
      </div>

      {/* Input Bereich */}
      <Card>
        <CardContent className='pt-6 space-y-4'>
          {/* Mic + Textarea */}
          <div className='flex gap-3'>
            <Button
              variant={isRecording ? 'destructive' : 'outline'}
              size='icon'
              className='shrink-0 size-12'
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isTranscribing}
            >
              {isTranscribing ? (
                <Loader2Icon className='size-5 animate-spin' />
              ) : isRecording ? (
                <StopCircleIcon className='size-5' />
              ) : (
                <MicIcon className='size-5' />
              )}
            </Button>

            <Textarea
              placeholder='Beschreibe kurz worum es geht: Wer ist die Zielgruppe? Was bietest du an? Was soll der Empfänger tun?'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className='resize-none flex-1'
            />
          </div>

          {isRecording && (
            <div className='flex items-center gap-2 text-sm text-red-500'>
              <span className='relative flex size-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full size-2 bg-red-500'></span>
              </span>
              Aufnahme läuft... Klicke zum Stoppen
            </div>
          )}

          {isTranscribing && (
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Loader2Icon className='size-4 animate-spin' />
              Transkribiere Sprachnachricht...
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className='w-full h-12 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white'
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

      {/* Output Bereich - Gmail Style */}
      {hasOutput && (
        <Card className='overflow-hidden'>
          {/* Email Header */}
          <div className='border-b bg-muted/30 px-4 py-3 space-y-2'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-sm'>
                <MailIcon className='size-4 text-muted-foreground' />
                <span className='text-muted-foreground'>Betreff:</span>
                <span className='font-semibold'>{subject}</span>
              </div>
              {framework && (
                <Badge variant='outline' className='text-xs'>
                  {framework}
                </Badge>
              )}
            </div>
          </div>

          {/* Email Body - Selektierbar */}
          <CardContent
            className='p-6 min-h-[200px]'
            onMouseUp={handleTextSelection}
          >
            <div className='whitespace-pre-wrap text-sm leading-relaxed'>
              {body}
            </div>

            {signature && (
              <div className='mt-6 pt-4 border-t text-sm text-muted-foreground whitespace-pre-wrap'>
                {signature}
              </div>
            )}
          </CardContent>

          {/* Aktionen */}
          <div className='border-t bg-muted/20 px-4 py-3'>
            <div className='flex flex-wrap items-center gap-2'>
              {/* Du/Sie Toggle */}
              <Button
                variant='outline'
                size='sm'
                onClick={toggleFormality}
                className='gap-2'
              >
                {isFormal ? 'Sie' : 'Du'}
                <span className='text-muted-foreground'>→</span>
                {isFormal ? 'Du' : 'Sie'}
              </Button>

              {/* Selection Edit */}
              {selectedText && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleEditSelection}
                  disabled={isEditingSelection}
                  className='gap-2'
                >
                  {isEditingSelection ? (
                    <Loader2Icon className='size-4 animate-spin' />
                  ) : (
                    <PencilIcon className='size-4' />
                  )}
                  Auswahl bearbeiten
                </Button>
              )}

              <div className='flex-1' />

              {/* Copy */}
              <Button
                variant='outline'
                size='sm'
                onClick={handleCopyAll}
                className='gap-2'
              >
                {copied ? (
                  <>
                    <CheckIcon className='size-4 text-green-500' />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <CopyIcon className='size-4' />
                    Kopieren
                  </>
                )}
              </Button>

              {/* Regenerate */}
              <Button
                variant='outline'
                size='sm'
                onClick={handleGenerate}
                disabled={isGenerating}
                className='gap-2'
              >
                <RefreshCwIcon className='size-4' />
                Neu
              </Button>
            </div>

            {selectedText && (
              <div className='mt-2 text-xs text-muted-foreground'>
                <Badge variant='secondary' className='font-normal'>
                  Ausgewählt: "{selectedText.slice(0, 50)}{selectedText.length > 50 ? '...' : ''}"
                </Badge>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!hasOutput && !isGenerating && (
        <div className='text-center py-12 text-muted-foreground'>
          <MailIcon className='size-12 mx-auto mb-3 opacity-20' />
          <p>Beschreibe was du sagen willst und klicke auf "E-Mail generieren"</p>
        </div>
      )}
    </div>
  )
}
