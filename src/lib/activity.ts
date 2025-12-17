// Activity tracking helper
export type ActivityType =
  | 'login'
  | 'course_started'
  | 'course_completed'
  | 'tool_used'
  | 'playbook_viewed'
  | 'checklist_completed'
  | 'notification_received'

interface TrackActivityParams {
  type: ActivityType
  title: string
  description?: string
  metadata?: Record<string, string>
}

export async function trackActivity(params: TrackActivityParams): Promise<boolean> {
  try {
    const response = await fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    return response.ok
  } catch (err) {
    console.error('Fehler beim Tracken der Aktivität:', err)
    return false
  }
}
