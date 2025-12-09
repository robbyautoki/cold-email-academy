import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import {
  sendRegistrationWebhook,
  sendProfileUpdateWebhook,
  type WebhookConfig,
  type WebhookLog
} from '@/lib/webhook'

const WEBHOOKS_FILE = path.join(process.cwd(), 'src/data/webhooks.json')

async function getWebhookConfig(): Promise<WebhookConfig | null> {
  try {
    const data = await readFile(WEBHOOKS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

async function addLog(log: WebhookLog): Promise<void> {
  try {
    const data = await readFile(WEBHOOKS_FILE, 'utf-8')
    const config: WebhookConfig = JSON.parse(data)
    config.logs = [log, ...config.logs].slice(0, 50)
    await writeFile(WEBHOOKS_FILE, JSON.stringify(config, null, 2))
  } catch (error) {
    console.error('Failed to save webhook log:', error)
  }
}

// POST - Webhook triggern (für Registration oder Profile Update)
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    const config = await getWebhookConfig()

    if (!config || !config.enabled) {
      return NextResponse.json({ success: true, skipped: true, reason: 'Webhooks deaktiviert' })
    }

    const body = await request.json()
    const { event, data } = body

    let result: { success: boolean; statusCode?: number; error?: string }
    let payload: Record<string, unknown> = {}

    if (event === 'registration' && config.events.registration) {
      payload = {
        event: 'user.registration',
        user: {
          email: data.email,
          full_name: data.fullName || data.email.split('@')[0],
          name: data.fullName || data.email.split('@')[0],
        }
      }
      result = await sendRegistrationWebhook(
        data.email,
        data.fullName || data.email.split('@')[0],
        config.url
      )
    } else if (event === 'profileUpdate' && config.events.profileUpdate) {
      const fullName = `${data.firstName} ${data.lastName}`.trim()
      payload = {
        event: 'user.profile_update',
        user: {
          email: data.email,
          full_name: fullName,
          job_title: '',
          industry: data.industry || '',
          company_size: data.revenue || '',
          linkedin_url: data.linkedinUrl || '',
        }
      }
      result = await sendProfileUpdateWebhook(data, config.url)
    } else {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: `Event "${event}" nicht aktiviert`
      })
    }

    // Log speichern
    const log: WebhookLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      event: event === 'registration' ? 'user.registration' : 'user.profile_update',
      status: result.success ? 'success' : 'error',
      statusCode: result.statusCode,
      timestamp: new Date().toISOString(),
      payload,
      error: result.error,
    }

    await addLog(log)

    return NextResponse.json({
      success: result.success,
      statusCode: result.statusCode,
      error: result.error
    })
  } catch (error) {
    console.error('Fehler beim Webhook-Trigger:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
