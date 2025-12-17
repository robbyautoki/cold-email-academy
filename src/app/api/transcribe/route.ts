import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// POST - Transkribiere Audio mit OpenAI Whisper
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
    }

    const formData = await request.formData()
    const audioFile = formData.get('file') as File

    if (!audioFile) {
      return NextResponse.json({ error: 'Keine Audio-Datei' }, { status: 400 })
    }

    // Prüfe ob OpenAI API Key vorhanden ist
    const openaiKey = process.env.OPENAI_API_KEY

    if (!openaiKey) {
      // Fallback: Placeholder Response wenn kein API Key
      console.warn('OPENAI_API_KEY nicht konfiguriert - verwende Placeholder')
      return NextResponse.json({
        transcript: '[Sprachnachricht erkannt - OpenAI API Key für Transkription erforderlich]'
      })
    }

    // OpenAI Whisper API Call
    const whisperFormData = new FormData()
    whisperFormData.append('file', audioFile)
    whisperFormData.append('model', 'whisper-1')
    whisperFormData.append('language', 'de')

    const whisperResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`
      },
      body: whisperFormData
    })

    if (!whisperResponse.ok) {
      const error = await whisperResponse.text()
      console.error('Whisper API Fehler:', error)
      return NextResponse.json({ error: 'Transkription fehlgeschlagen' }, { status: 500 })
    }

    const result = await whisperResponse.json()

    return NextResponse.json({ transcript: result.text })
  } catch (error) {
    console.error('Transkription Fehler:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
