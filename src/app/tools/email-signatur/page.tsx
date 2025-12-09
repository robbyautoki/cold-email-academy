'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CopyIcon,
  CheckIcon,
  PenToolIcon,
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  LinkedinIcon,
  UserIcon,
  BriefcaseIcon,
  BuildingIcon,
  PaletteIcon,
  LayoutTemplateIcon,
  DownloadIcon,
  SparklesIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { ToolHero } from '@/components/tools/shared'

interface SignatureData {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  linkedin: string
  imageUrl: string
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean und professionell',
    icon: '✨'
  },
  {
    id: 'classic',
    name: 'Klassisch',
    description: 'Zeitlos elegant',
    icon: '📜'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Schlicht und fokussiert',
    icon: '🎯'
  }
]

const colorPresets = [
  { name: 'Blau', value: '#3b82f6' },
  { name: 'Grün', value: '#22c55e' },
  { name: 'Violett', value: '#8b5cf6' },
  { name: 'Rot', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Schwarz', value: '#18181b' }
]

const EmailSignaturePage = () => {
  const [copied, setCopied] = useState(false)
  const [template, setTemplate] = useState<'modern' | 'classic' | 'minimal'>('modern')
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')
  const [data, setData] = useState<SignatureData>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    imageUrl: ''
  })

  const updateData = (key: keyof SignatureData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const generateModernSignature = () => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;">
  <tr>
    <td style="vertical-align: top; padding-right: 15px;">
      ${data.imageUrl ? `<img src="${data.imageUrl}" alt="${data.name}" width="80" height="80" style="border-radius: 50%; object-fit: cover;" />` : ''}
    </td>
    <td style="vertical-align: top; border-left: 3px solid ${primaryColor}; padding-left: 15px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size: 18px; font-weight: bold; color: #111111; padding-bottom: 2px;">${data.name || 'Dein Name'}</td>
        </tr>
        <tr>
          <td style="font-size: 14px; color: ${primaryColor}; padding-bottom: 8px;">${data.title || 'Deine Position'}${data.company ? ` | ${data.company}` : ''}</td>
        </tr>
        ${data.email ? `<tr><td style="font-size: 13px; color: #666666; padding-bottom: 2px;">✉️ ${data.email}</td></tr>` : ''}
        ${data.phone ? `<tr><td style="font-size: 13px; color: #666666; padding-bottom: 2px;">📞 ${data.phone}</td></tr>` : ''}
        ${data.website ? `<tr><td style="font-size: 13px; padding-bottom: 2px;"><a href="${data.website}" style="color: ${primaryColor}; text-decoration: none;">🌐 ${data.website.replace(/^https?:\/\//, '')}</a></td></tr>` : ''}
        ${data.linkedin ? `<tr><td style="padding-top: 8px;"><a href="${data.linkedin}" style="color: #0077B5; text-decoration: none;">LinkedIn</a></td></tr>` : ''}
      </table>
    </td>
  </tr>
</table>
    `.trim()
  }

  const generateClassicSignature = () => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Georgia, serif; font-size: 14px; color: #333333;">
  <tr>
    <td style="padding-bottom: 10px; border-bottom: 1px solid #cccccc;">
      <span style="font-size: 16px; font-weight: bold;">${data.name || 'Dein Name'}</span><br/>
      <span style="font-style: italic; color: #666666;">${data.title || 'Deine Position'}</span>
      ${data.company ? `<br/><span style="color: #888888;">${data.company}</span>` : ''}
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px; font-size: 13px; color: #666666;">
      ${data.email ? `Email: <a href="mailto:${data.email}" style="color: ${primaryColor};">${data.email}</a><br/>` : ''}
      ${data.phone ? `Tel: ${data.phone}<br/>` : ''}
      ${data.website ? `Web: <a href="${data.website}" style="color: ${primaryColor};">${data.website.replace(/^https?:\/\//, '')}</a>` : ''}
    </td>
  </tr>
</table>
    `.trim()
  }

  const generateMinimalSignature = () => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #555555;">
  <tr>
    <td>
      <span style="font-weight: 600; color: #111111;">${data.name || 'Dein Name'}</span>
      ${data.title ? ` · <span style="color: #888888;">${data.title}</span>` : ''}
      ${data.company ? ` · <span style="color: #888888;">${data.company}</span>` : ''}
    </td>
  </tr>
  <tr>
    <td style="padding-top: 4px;">
      ${data.email ? `<a href="mailto:${data.email}" style="color: ${primaryColor}; text-decoration: none;">${data.email}</a>` : ''}
      ${data.email && data.phone ? ' · ' : ''}
      ${data.phone ? `<span>${data.phone}</span>` : ''}
      ${(data.email || data.phone) && data.website ? ' · ' : ''}
      ${data.website ? `<a href="${data.website}" style="color: ${primaryColor}; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a>` : ''}
    </td>
  </tr>
</table>
    `.trim()
  }

  const getSignatureHTML = () => {
    switch (template) {
      case 'classic':
        return generateClassicSignature()
      case 'minimal':
        return generateMinimalSignature()
      default:
        return generateModernSignature()
    }
  }

  const copyToClipboard = async () => {
    const html = getSignatureHTML()
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([html], { type: 'text/plain' })
        })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const filledFields = Object.values(data).filter(v => v.trim()).length

  return (
    <div className="space-y-6">
      {/* Hero */}
      <ToolHero
        icon={PenToolIcon}
        title="Email Signatur Generator"
        description="Erstelle eine professionelle Email-Signatur in wenigen Schritten"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Linke Seite: Formular */}
        <div className="lg:col-span-3 space-y-6">
          {/* Template-Auswahl */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <LayoutTemplateIcon className="size-5" />
                  Template wählen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-3">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id as typeof template)}
                      className={`relative rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                        template === t.id
                          ? 'border-zinc-800 bg-zinc-50'
                          : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {template === t.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-2 -top-2"
                        >
                          <div className="flex size-5 items-center justify-center rounded-full bg-zinc-800 text-white">
                            <CheckIcon className="size-3" />
                          </div>
                        </motion.div>
                      )}
                      <span className="text-2xl">{t.icon}</span>
                      <p className="mt-2 font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Farbauswahl */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <PaletteIcon className="size-5" />
                  Farbe wählen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setPrimaryColor(color.value)}
                      className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 transition-all ${
                        primaryColor === color.value
                          ? 'border-zinc-800'
                          : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <div
                        className="size-4 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-sm">{color.name}</span>
                    </button>
                  ))}
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-10 w-14 cursor-pointer p-1"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-28"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Persönliche Daten */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <UserIcon className="size-5" />
                  Persönliche Daten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <UserIcon className="size-3" />
                      Name
                    </Label>
                    <Input
                      placeholder="Max Mustermann"
                      value={data.name}
                      onChange={(e) => updateData('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <BriefcaseIcon className="size-3" />
                      Position
                    </Label>
                    <Input
                      placeholder="CEO / Geschäftsführer"
                      value={data.title}
                      onChange={(e) => updateData('title', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <BuildingIcon className="size-3" />
                    Unternehmen
                  </Label>
                  <Input
                    placeholder="Meine Firma GmbH"
                    value={data.company}
                    onChange={(e) => updateData('company', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kontaktdaten */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MailIcon className="size-5" />
                  Kontaktdaten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MailIcon className="size-3" />
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="max@beispiel.de"
                      value={data.email}
                      onChange={(e) => updateData('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <PhoneIcon className="size-3" />
                      Telefon
                    </Label>
                    <Input
                      placeholder="+49 123 456789"
                      value={data.phone}
                      onChange={(e) => updateData('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <GlobeIcon className="size-3" />
                      Website
                    </Label>
                    <Input
                      placeholder="https://beispiel.de"
                      value={data.website}
                      onChange={(e) => updateData('website', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <LinkedinIcon className="size-3" />
                      LinkedIn
                    </Label>
                    <Input
                      placeholder="https://linkedin.com/in/..."
                      value={data.linkedin}
                      onChange={(e) => updateData('linkedin', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rechte Seite: Preview & Export */}
        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <SparklesIcon className="size-5 text-amber-500" />
                    Live Vorschau
                  </CardTitle>
                  <Badge variant="outline">{filledFields}/8 Felder</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={template + primaryColor}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg border bg-white p-6"
                    dangerouslySetInnerHTML={{ __html: getSignatureHTML() }}
                  />
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Export Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Signatur exportieren</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={copyToClipboard} className="w-full gap-2">
                  {copied ? (
                    <>
                      <CheckIcon className="size-4" />
                      Kopiert!
                    </>
                  ) : (
                    <>
                      <CopyIcon className="size-4" />
                      HTML kopieren
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    const blob = new Blob([getSignatureHTML()], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'email-signatur.html'
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                >
                  <DownloadIcon className="size-4" />
                  Als HTML herunterladen
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Anleitung */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Anleitung</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {[
                    'Kopiere den HTML-Code',
                    'Öffne deine Email-Einstellungen',
                    'Suche nach "Signatur" Optionen',
                    'Füge den Code im HTML-Modus ein'
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EmailSignaturePage
