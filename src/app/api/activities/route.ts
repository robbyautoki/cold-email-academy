import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

export interface Activity {
  id: string
  userId: string
  userName: string
  userAvatar: string
  type: 'login' | 'course_started' | 'course_completed' | 'tool_used' | 'playbook_viewed' | 'checklist_completed' | 'notification_received'
  title: string
  description: string
  metadata?: Record<string, string>
  createdAt: number
}

const ACTIVITIES_FILE = path.join(process.cwd(), 'src/data/activities.json')

async function getActivities(): Promise<Activity[]> {
  try {
    const data = await readFile(ACTIVITIES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveActivities(activities: Activity[]): Promise<void> {
  await writeFile(ACTIVITIES_FILE, JSON.stringify(activities, null, 2))
}

// GET - Get activities for current user
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    const activities = await getActivities()
    // Get user's activities, sorted by newest first
    const userActivities = activities
      .filter(a => a.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 20) // Last 20 activities

    return NextResponse.json({ activities: userActivities })
  } catch (error) {
    console.error('Fehler beim Abrufen der Aktivitäten:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

// POST - Log a new activity
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    const body = await request.json()
    const { type, title, description, metadata } = body

    if (!type || !title) {
      return NextResponse.json({ error: 'Typ und Titel erforderlich' }, { status: 400 })
    }

    const activities = await getActivities()

    const firstName = (user.unsafeMetadata?.firstName as string) || user.firstName || ''
    const lastName = (user.unsafeMetadata?.lastName as string) || user.lastName || ''

    const newActivity: Activity = {
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      userName: `${firstName} ${lastName}`.trim() || 'Benutzer',
      userAvatar: user.imageUrl || '',
      type,
      title,
      description: description || '',
      metadata,
      createdAt: Date.now(),
    }

    activities.unshift(newActivity)

    // Keep only last 1000 activities total
    const trimmed = activities.slice(0, 1000)
    await saveActivities(trimmed)

    return NextResponse.json({ activity: newActivity })
  } catch (error) {
    console.error('Fehler beim Erstellen der Aktivität:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
