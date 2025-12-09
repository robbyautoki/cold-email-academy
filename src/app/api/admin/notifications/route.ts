import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

export interface Notification {
  id: string
  title: string
  message: string
  link?: string
  linkText?: string
  type: 'info' | 'update' | 'announcement'
  adminId: string
  adminName: string
  adminAvatar: string
  createdAt: number
}

const NOTIFICATIONS_FILE = path.join(process.cwd(), 'src/data/notifications.json')

async function getNotifications(): Promise<Notification[]> {
  try {
    const data = await readFile(NOTIFICATIONS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveNotifications(notifications: Notification[]): Promise<void> {
  await writeFile(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2))
}

async function isAdmin(userId: string): Promise<boolean> {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  return user.unsafeMetadata?.role === 'admin'
}

// GET - Alle Notifications abrufen (für alle User)
export async function GET() {
  try {
    const notifications = await getNotifications()
    // Sortiert nach neuesten zuerst
    const sorted = notifications.sort((a, b) => b.createdAt - a.createdAt)
    return NextResponse.json({ notifications: sorted })
  } catch (error) {
    console.error('Fehler beim Abrufen der Notifications:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

// POST - Neue Notification erstellen (nur Admin)
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const client = await clerkClient()
    const adminUser = await client.users.getUser(userId)

    const body = await request.json()
    const { title, message, link, linkText, type = 'info' } = body

    if (!title || !message) {
      return NextResponse.json({ error: 'Titel und Nachricht erforderlich' }, { status: 400 })
    }

    const notifications = await getNotifications()

    const newNotification: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      message,
      link: link || undefined,
      linkText: linkText || undefined,
      type,
      adminId: userId,
      adminName: `${adminUser.unsafeMetadata?.firstName || adminUser.firstName || ''} ${adminUser.unsafeMetadata?.lastName || adminUser.lastName || ''}`.trim() || 'Admin',
      adminAvatar: adminUser.imageUrl || 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
      createdAt: Date.now(),
    }

    notifications.unshift(newNotification)
    await saveNotifications(notifications)

    return NextResponse.json({ notification: newNotification })
  } catch (error) {
    console.error('Fehler beim Erstellen der Notification:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

// DELETE - Notification löschen (nur Admin)
export async function DELETE(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    if (!(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const notificationId = searchParams.get('id')

    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID erforderlich' }, { status: 400 })
    }

    const notifications = await getNotifications()
    const filtered = notifications.filter(n => n.id !== notificationId)

    if (filtered.length === notifications.length) {
      return NextResponse.json({ error: 'Notification nicht gefunden' }, { status: 404 })
    }

    await saveNotifications(filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Fehler beim Löschen der Notification:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
