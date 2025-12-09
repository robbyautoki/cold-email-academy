// Webhook Service for sending events to external systems (e.g., Attio)

export interface WebhookConfig {
  url: string
  enabled: boolean
  events: {
    registration: boolean
    profileUpdate: boolean
  }
  logs: WebhookLog[]
}

export interface WebhookLog {
  id: string
  event: string
  status: 'success' | 'error'
  statusCode?: number
  timestamp: string
  payload: Record<string, unknown>
  error?: string
}

export interface RegistrationPayload {
  event: 'user.registration'
  user: {
    email: string
    full_name: string
    name: string
  }
}

export interface ProfileUpdatePayload {
  event: 'user.profile_update'
  user: {
    email: string
    full_name: string
    job_title: string
    industry: string
    company_size: string
    linkedin_url: string
  }
}

type WebhookPayload = RegistrationPayload | ProfileUpdatePayload

// Default webhook URL (can be overridden in admin settings)
const DEFAULT_WEBHOOK_URL = 'https://attio-hub.vercel.app/api/webhooks/academy'

/**
 * Send a webhook to the configured endpoint
 */
export async function sendWebhook(
  payload: WebhookPayload,
  webhookUrl?: string
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  const url = webhookUrl || DEFAULT_WEBHOOK_URL

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        error: `HTTP ${response.status}: ${response.statusText}`,
      }
    }

    return {
      success: true,
      statusCode: response.status,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Send registration webhook
 */
export async function sendRegistrationWebhook(
  email: string,
  fullName: string,
  webhookUrl?: string
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  const payload: RegistrationPayload = {
    event: 'user.registration',
    user: {
      email,
      full_name: fullName,
      name: fullName,
    },
  }

  return sendWebhook(payload, webhookUrl)
}

/**
 * Send profile update webhook (after onboarding)
 */
export async function sendProfileUpdateWebhook(
  data: {
    email: string
    firstName: string
    lastName: string
    industry: string
    revenue: string
    linkedinUrl: string
  },
  webhookUrl?: string
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  const fullName = `${data.firstName} ${data.lastName}`.trim()

  const payload: ProfileUpdatePayload = {
    event: 'user.profile_update',
    user: {
      email: data.email,
      full_name: fullName,
      job_title: '', // Not collected in Academy
      industry: data.industry || '',
      company_size: data.revenue || '', // Revenue maps to company_size
      linkedin_url: data.linkedinUrl || '',
    },
  }

  return sendWebhook(payload, webhookUrl)
}

/**
 * Get default webhook configuration
 */
export function getDefaultWebhookConfig(): WebhookConfig {
  return {
    url: DEFAULT_WEBHOOK_URL,
    enabled: true,
    events: {
      registration: true,
      profileUpdate: true,
    },
    logs: [],
  }
}
