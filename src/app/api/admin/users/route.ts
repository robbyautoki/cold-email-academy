import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    // Aktuellen User prüfen ob Admin
    const client = await clerkClient()
    const currentUser = await client.users.getUser(userId)
    const isAdmin = currentUser.unsafeMetadata?.role === 'admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    // Alle User abrufen
    const users = await client.users.getUserList({
      limit: 100,
      orderBy: '-created_at',
    })

    const formattedUsers = users.data.map(user => ({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: (user.unsafeMetadata?.firstName as string) || user.firstName || '',
      lastName: (user.unsafeMetadata?.lastName as string) || user.lastName || '',
      companyName: (user.unsafeMetadata?.companyName as string) || '',
      industry: (user.unsafeMetadata?.industry as string) || '',
      revenue: (user.unsafeMetadata?.revenue as string) || '',
      referralSource: (user.unsafeMetadata?.referralSource as string) || '',
      role: (user.unsafeMetadata?.role as string) || 'user',
      onboardingCompleted: user.unsafeMetadata?.onboardingCompleted || false,
      createdAt: user.createdAt,
      imageUrl: user.imageUrl,
    }))

    return NextResponse.json({ users: formattedUsers })
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
