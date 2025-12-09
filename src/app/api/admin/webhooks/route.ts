import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import type { WebhookConfig, WebhookLog } from '@/lib/webhook'
import { sendWebhook, getDefaultWebhookConfig } from '@/lib/webhook'

const WEBHOOKS_FILE = path.join(process.cwd(), 'src/data/webhooks.json')

async function getWebhookConfig(): Promise<WebhookConfig> {
  try {
    const data = await readFile(WEBHOOKS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return getDefaultWebhookConfig()
  }
}

async function saveWebhookConfig(config: WebhookConfig): Promise<void> {
  await writeFile(WEBHOOKS_FILE, JSON.stringify(config, null, 2))
}

async function isAdmin(userId: string): Promise<boolean> {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  return user.unsafeMetadata?.role === 'admin'
}

// GET - Webhook-Konfiguration abrufen (nur Admin)
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const config = await getWebhookConfig()
    return NextResponse.json({ config })
  } catch (error) {
    console.error('Fehler beim Abrufen der Webhook-Config:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

// POST - Webhook-Konfiguration speichern oder Test senden (nur Admin)
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const body = await request.json()

    // Test-Webhook senden
    if (body.action === 'test') {
      const config = await getWebhookConfig()
      const testPayload = {
        event: 'test' as const,
        user: {
          email: 'test@example.com',
          full_name: 'Test User',
          name: 'Test User',
        },
      }

      const result = await sendWebhook(testPayload as any, config.url)

      // Log hinzufügen
      const log: WebhookLog = {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        event: 'test',
        status: result.success ? 'success' : 'error',
        statusCode: result.statusCode,
        timestamp: new Date().toISOString(),
        payload: testPayload,
        error: result.error,
      }

      config.logs = [log, ...config.logs].slice(0, 50) // Maximal 50 Logs
      await saveWebhookConfig(config)

      return NextResponse.json({
        success: result.success,
        statusCode: result.statusCode,
        error: result.error
      })
    }

    // Konfiguration speichern
    const { url, enabled, events } = body

    if (!url) {
      return NextResponse.json({ error: 'Webhook URL erforderlich' }, { status: 400 })
    }

    const config = await getWebhookConfig()
    config.url = url
    config.enabled = enabled ?? config.enabled
    config.events = events ?? config.events

    await saveWebhookConfig(config)

    return NextResponse.json({ config })
  } catch (error) {
    console.error('Fehler beim Speichern der Webhook-Config:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

// DELETE - Logs löschen (nur Admin)
export async function DELETE() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const config = await getWebhookConfig()
    config.logs = []
    await saveWebhookConfig(config)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Fehler beim Löschen der Logs:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
