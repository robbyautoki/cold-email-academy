import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { sendRegistrationWebhook, type WebhookConfig, type WebhookLog } from '@/lib/webhook'

const WEBHOOKS_FILE = path.join(process.cwd(), 'src/data/webhooks.json')

// POST - Registration Webhook (ohne Auth-Check für SSO-Callback)
export async function POST(request: Request) {
  try {
    const fileData = await readFile(WEBHOOKS_FILE, 'utf-8')
    const config: WebhookConfig = JSON.parse(fileData)

    if (!config.enabled || !config.events.registration) {
      return NextResponse.json({ success: true, skipped: true, reason: 'Registration webhook deaktiviert' })
    }

    const body = await request.json()
    const { email, fullName } = body

    if (!email) {
      return NextResponse.json({ error: 'Email erforderlich' }, { status: 400 })
    }

    const name = fullName || email.split('@')[0]
    const result = await sendRegistrationWebhook(email, name, config.url)

    // Log speichern
    const log: WebhookLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      event: 'user.registration',
      status: result.success ? 'success' : 'error',
      statusCode: result.statusCode,
      timestamp: new Date().toISOString(),
      payload: {
        event: 'user.registration',
        user: {
          email,
          full_name: name,
          name: name
        }
      },
      error: result.error,
    }

    config.logs = [log, ...config.logs].slice(0, 50)
    await writeFile(WEBHOOKS_FILE, JSON.stringify(config, null, 2))

    return NextResponse.json({
      success: result.success,
      statusCode: result.statusCode,
      error: result.error
    })
  } catch (error) {
    console.error('Registration webhook error:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
