'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  MailIcon,
  ChevronDown,
  Sparkles,
  MessageCircleQuestion,
  RefreshCw
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { PromptInput } from '@/components/ai/prompt-input'
import { AIReasoning } from '@/components/ai/ai-reasoning'
import { AISuggestions } from '@/components/ai/ai-suggestions'
import { AIActions } from '@/components/ai/ai-actions'
import { AILoader } from '@/components/ai/ai-loader'

// Types
interface EmailVersion {
  id: string
  prompt: string
  subject: string
  body: string
  signature: string
  framework: string
  reasoning: string
  createdAt: Date
}

interface StreamChunk {
  type: 'reasoning' | 'subject' | 'body' | 'signature' | 'framework' | 'suggestions' | 'question' | 'done'
  content: string | string[]
}

interface Selection {
  start: number
  end: number
  text: string
}

const STORAGE_KEY = 'ai-email-writer-versions'
const MAX_VERSIONS = 10

export default function AIEmailWriterPage() {
  // Versions
  const [versions, setVersions] = useState<EmailVersion[]>([])
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1)

  // Current email state
  const [prompt, setPrompt] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [signature, setSignature] = useState('')
  const [framework, setFramework] = useState('')
  const [reasoning, setReasoning] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null)
  const [originalPrompt, setOriginalPrompt] = useState('')

  // UI state
  const [isStreaming, setIsStreaming] = useState(false)
  const [isFormal, setIsFormal] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Selection state for inline regeneration
  const [selection, setSelection] = useState<Selection | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Voice recording
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Load versions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setVersions(parsed.map((v: EmailVersion) => ({
          ...v,
          createdAt: new Date(v.createdAt)
        })))
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  // Save versions to localStorage
  const saveVersions = useCallback((newVersions: EmailVersion[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVersions))
    setVersions(newVersions)
  }, [])

  // Start voice recording
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
    } catch {
      console.error('Mikrofon-Zugriff verweigert')
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
    } catch {
      console.error('Transkription fehlgeschlagen')
    } finally {
      setIsTranscribing(false)
    }
  }

  // Generate email with streaming
  const handleGenerate = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt
    if (!finalPrompt.trim()) return

    // Wenn es eine Antwort auf eine Frage ist, kombiniere mit Original-Prompt
    let combinedPrompt = finalPrompt
    if (pendingQuestion && originalPrompt) {
      combinedPrompt = `${originalPrompt}\n\n${finalPrompt}`
      setPendingQuestion(null)
    } else {
      setOriginalPrompt(finalPrompt)
    }

    // Reset current email
    setSubject('')
    setBody('')
    setSignature('')
    setFramework('')
    setReasoning('')
    setSuggestions([])
    setPendingQuestion(null)
    setIsStreaming(true)

    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/ai-email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: combinedPrompt,
          formal: isFormal
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) throw new Error('Generation failed')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const chunk: StreamChunk = JSON.parse(line)

            switch (chunk.type) {
              case 'reasoning':
                setReasoning(chunk.content as string)
                break
              case 'framework':
                setFramework(chunk.content as string)
                break
              case 'subject':
                setSubject(chunk.content as string)
                break
              case 'body':
                setBody(chunk.content as string)
                break
              case 'signature':
                setSignature(chunk.content as string)
                break
              case 'suggestions':
                setSuggestions(chunk.content as string[])
                break
              case 'question':
                setPendingQuestion(chunk.content as string)
                setPrompt('') // Clear prompt for answer
                break
              case 'done':
                // Save version after completion (only if email was generated)
                if (chunk.content === 'complete') {
                  saveCurrentAsVersion(combinedPrompt)
                }
                break
            }
          } catch {
            // Ignore parse errors
          }
        }
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Generation error:', error)
      }
    } finally {
      setIsStreaming(false)
      abortControllerRef.current = null
    }
  }

  // Stop streaming
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  // Save current email as version
  const saveCurrentAsVersion = useCallback((usedPrompt: string) => {
    if (!subject && !body) return

    const newVersion: EmailVersion = {
      id: Date.now().toString(),
      prompt: usedPrompt,
      subject,
      body,
      signature,
      framework,
      reasoning,
      createdAt: new Date()
    }

    setVersions(prev => {
      const updated = [newVersion, ...prev].slice(0, MAX_VERSIONS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
    setCurrentVersionIndex(0)
  }, [subject, body, signature, framework, reasoning])

  // Load a specific version
  const loadVersion = (index: number) => {
    const version = versions[index]
    if (!version) return

    setSubject(version.subject)
    setBody(version.body)
    setSignature(version.signature)
    setFramework(version.framework)
    setReasoning(version.reasoning)
    setCurrentVersionIndex(index)
    setSuggestions([])
  }

  // Copy email to clipboard
  const handleCopy = async () => {
    const fullEmail = `Betreff: ${subject}\n\n${body}\n\n---\n${signature}`
    await navigator.clipboard.writeText(fullEmail)
  }

  // Toggle formal/informal
  const handleToggleFormal = () => {
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
    } else {
      return text
        .replace(/\bSie\b/g, 'du')
        .replace(/\bIhnen\b/g, 'dir')
        .replace(/\bIhr\b/g, 'dein')
        .replace(/\bIhre\b/g, 'deine')
        .replace(/\bIhren\b/g, 'deinen')
        .replace(/\bIhrer\b/g, 'deiner')
        .replace(/\bIhrem\b/g, 'deinem')
    }
  }

  // Handle text selection in body textarea
  const handleTextSelection = () => {
    const textarea = bodyTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start !== end && end - start > 0) {
      setSelection({
        start,
        end,
        text: body.slice(start, end)
      })
    } else {
      setSelection(null)
    }
  }

  // Handle body text change (editable)
  const handleBodyChange = (newBody: string) => {
    setBody(newBody)
    setSelection(null)
  }

  // Regenerate selected text
  const handleRegenerateSelection = async () => {
    if (!selection || isRegenerating) return

    const textBefore = body.slice(0, selection.start)
    const selectedText = selection.text
    const textAfter = body.slice(selection.end)

    setIsRegenerating(true)

    try {
      const response = await fetch('/api/ai-email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'regenerate',
          textBefore,
          selectedText,
          textAfter,
          formal: isFormal
        })
      })

      if (!response.ok) throw new Error('Regeneration failed')

      const data = await response.json()

      if (data.success && data.regeneratedText) {
        // Replace selected text with regenerated text
        const newBody = textBefore + data.regeneratedText + textAfter
        setBody(newBody)
        setSelection(null)
      }
    } catch (error) {
      console.error('Regeneration error:', error)
    } finally {
      setIsRegenerating(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    const improvementPrompt = `${prompt}\n\nVerbesserung: ${suggestion}`
    setPrompt(improvementPrompt)
    handleGenerate(improvementPrompt)
  }

  // Regenerate
  const handleRegenerate = () => {
    if (prompt) {
      handleGenerate()
    }
  }

  // Save current version manually
  const handleSaveVersion = () => {
    if (prompt && (subject || body)) {
      saveCurrentAsVersion(prompt)
    }
  }

  const hasOutput = subject || body
  const hasQuestion = pendingQuestion !== null

  return (
    <div className='flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto py-8'>
      {/* Header with Version Selector */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
          <div className='flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600'>
            <Sparkles className='size-5 text-white' />
          </div>
          <div>
            <h1 className='text-xl font-bold'>AI Cold Email Writer</h1>
            <p className='text-xs text-muted-foreground'>
              ChatGPT meets Gmail
            </p>
          </div>
        </div>

        {versions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {currentVersionIndex >= 0 ? `v${versions.length - currentVersionIndex}` : 'Versionen'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {versions.map((version, index) => (
                <DropdownMenuItem
                  key={version.id}
                  onClick={() => loadVersion(index)}
                  className="flex flex-col items-start gap-1"
                >
                  <span className="font-medium text-sm">
                    v{versions.length - index}: {version.framework}
                  </span>
                  <span className="text-xs text-muted-foreground truncate w-full">
                    {version.prompt.slice(0, 50)}...
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Main Content Area - Scrollable */}
      <div className='flex-1 overflow-y-auto space-y-4 pb-4'>
        {/* Question Card */}
        {hasQuestion && (
          <Card className='overflow-hidden border-primary/20 bg-primary/5'>
            <div className='border-b bg-primary/10 px-4 py-3'>
              <div className='flex items-center gap-2 text-sm'>
                <MessageCircleQuestion className='size-4 text-primary' />
                <span className='font-medium text-primary'>Noch eine Frage...</span>
              </div>
            </div>
            <CardContent className='p-6'>
              <div className='whitespace-pre-wrap text-sm leading-relaxed'>
                {pendingQuestion}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gmail-Style Email Preview */}
        {(hasOutput || isStreaming) && !hasQuestion ? (
          <Card className='overflow-hidden'>
            {/* Email Header */}
            <div className='border-b bg-muted/30 px-4 py-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 text-sm'>
                  <MailIcon className='size-4 text-muted-foreground' />
                  <span className='text-muted-foreground'>Betreff:</span>
                  <span className='font-semibold'>
                    {subject || (isStreaming && <AILoader size={14} className="inline ml-1" />)}
                  </span>
                </div>
                {framework && (
                  <Badge variant='outline' className='text-xs'>
                    {framework}
                  </Badge>
                )}
              </div>
            </div>

            {/* Email Body - Editable */}
            <CardContent className='p-6 min-h-[200px] relative'>
              {body ? (
                <div className="relative">
                  <Textarea
                    ref={bodyTextareaRef}
                    value={body}
                    onChange={(e) => handleBodyChange(e.target.value)}
                    onSelect={handleTextSelection}
                    onMouseUp={handleTextSelection}
                    onKeyUp={handleTextSelection}
                    disabled={isStreaming || isRegenerating}
                    className="min-h-[200px] resize-none border-0 p-0 text-sm leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    placeholder="Email-Text..."
                  />
                  {isStreaming && <span className="animate-pulse text-primary">|</span>}

                  {/* Floating Regenerate Button */}
                  {selection && !isStreaming && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
                      <Button
                        size="sm"
                        onClick={handleRegenerateSelection}
                        disabled={isRegenerating}
                        className="gap-1.5 shadow-lg bg-violet-600 hover:bg-violet-700 text-white"
                      >
                        {isRegenerating ? (
                          <>
                            <AILoader size={14} className="text-white" />
                            <span>Generiere...</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw className="size-3.5" />
                            <span>Neu generieren</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ) : isStreaming ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <AILoader size={16} />
                  <span>Generiere E-Mail...</span>
                </div>
              ) : null}

              {signature && (
                <div className='mt-6 pt-4 border-t text-sm text-muted-foreground whitespace-pre-wrap'>
                  {signature}
                </div>
              )}
            </CardContent>

            {/* Actions */}
            {hasOutput && !isStreaming && (
              <div className='border-t bg-muted/20 px-4 py-2'>
                <AIActions
                  onCopy={handleCopy}
                  onRegenerate={handleRegenerate}
                  onSaveVersion={handleSaveVersion}
                  onToggleFormal={handleToggleFormal}
                  isFormal={isFormal}
                  disabled={isStreaming}
                />
              </div>
            )}
          </Card>
        ) : !hasQuestion ? (
          // Empty State
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 mb-4'>
              <MailIcon className='size-8 text-violet-500/50' />
            </div>
            <h2 className='text-lg font-medium mb-2'>Erstelle deine erste Cold Email</h2>
            <p className='text-sm text-muted-foreground max-w-md'>
              Beschreibe dein Angebot und deine Zielgruppe. Die AI wahlt automatisch
              das beste Cold Email Framework und generiert eine professionelle E-Mail.
            </p>
          </div>
        ) : null}

        {/* Suggestions */}
        {suggestions.length > 0 && !isStreaming && (
          <AISuggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            disabled={isStreaming}
          />
        )}

        {/* Reasoning */}
        <AIReasoning
          isStreaming={isStreaming}
          reasoning={reasoning}
        />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className='pt-4 border-t bg-background'>
        {isRecording && (
          <div className='flex items-center gap-2 text-sm text-red-500 mb-2 px-1'>
            <span className='relative flex size-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full size-2 bg-red-500'></span>
            </span>
            Aufnahme lauft... Klicke zum Stoppen
          </div>
        )}

        {isTranscribing && (
          <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2 px-1'>
            <AILoader size={14} />
            Transkribiere Sprachnachricht...
          </div>
        )}

        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={() => handleGenerate()}
          onStop={handleStop}
          isStreaming={isStreaming}
          disabled={isTranscribing}
          placeholder="Beschreibe deine Cold Email... (z.B. 'Cold Email fur Entrumpelungsdienste, ich biete Google Ads')"
          showMic={true}
          onMicClick={isRecording ? stopRecording : startRecording}
        />
      </div>
    </div>
  )
}
