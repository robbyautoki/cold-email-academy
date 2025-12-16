'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  BellIcon,
  CheckCircleIcon,
  LinkIcon,
  Loader2Icon,
  MegaphoneIcon,
  PlayIcon,
  SendIcon,
  ShieldIcon,
  TrashIcon,
  UsersIcon,
  WebhookIcon,
  XCircleIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
  companyName: string
  industry: string
  revenue: string
  referralSource: string
  role: string
  onboardingCompleted: boolean
  createdAt: number
  imageUrl: string
}

interface Notification {
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

interface WebhookConfig {
  url: string
  enabled: boolean
  events: {
    registration: boolean
    profileUpdate: boolean
  }
  logs: WebhookLog[]
}

interface WebhookLog {
  id: string
  event: string
  status: 'success' | 'error'
  statusCode?: number
  timestamp: string
  payload: Record<string, unknown>
  error?: string
}

const AdminPage = () => {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [users, setUsers] = useState<UserData[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isNotifLoading, setIsNotifLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)

  // Webhook State
  const [webhookConfig, setWebhookConfig] = useState<WebhookConfig | null>(null)
  const [isWebhookLoading, setIsWebhookLoading] = useState(true)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isSavingWebhook, setIsSavingWebhook] = useState(false)

  const [notifForm, setNotifForm] = useState({
    title: '',
    message: '',
    link: '',
    linkText: '',
    type: 'info' as 'info' | 'update' | 'announcement'
  })

  const isAdmin = user?.unsafeMetadata?.role === 'admin'

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push('/dashboard')
    }
  }, [isLoaded, isAdmin, router])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users')
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Benutzer')
        }
        const data = await response.json()
        setUsers(data.users)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
      } finally {
        setIsLoading(false)
      }
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/admin/notifications')
        if (response.ok) {
          const data = await response.json()
          setNotifications(data.notifications)
        }
      } catch (err) {
        console.error('Fehler beim Laden der Notifications:', err)
      } finally {
        setIsNotifLoading(false)
      }
    }

    const fetchWebhookConfig = async () => {
      try {
        const response = await fetch('/api/admin/webhooks')
        if (response.ok) {
          const data = await response.json()
          setWebhookConfig(data.config)
          setWebhookUrl(data.config.url)
        }
      } catch (err) {
        console.error('Fehler beim Laden der Webhook-Config:', err)
      } finally {
        setIsWebhookLoading(false)
      }
    }

    if (isLoaded && isAdmin) {
      fetchUsers()
      fetchNotifications()
      fetchWebhookConfig()
    }
  }, [isLoaded, isAdmin])

  const handleSendNotification = async () => {
    if (!notifForm.title || !notifForm.message) return

    setIsSending(true)
    setSendSuccess(false)

    try {
      const response = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifForm)
      })

      if (response.ok) {
        const data = await response.json()
        setNotifications(prev => [data.notification, ...prev])
        setNotifForm({ title: '', message: '', link: '', linkText: '', type: 'info' })
        setSendSuccess(true)
        setTimeout(() => setSendSuccess(false), 3000)
      }
    } catch (err) {
      console.error('Fehler beim Senden:', err)
    } finally {
      setIsSending(false)
    }
  }

  const handleDeleteNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/notifications?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }
    } catch (err) {
      console.error('Fehler beim Löschen:', err)
    }
  }

  const handleSaveWebhook = async () => {
    if (!webhookUrl) return

    setIsSavingWebhook(true)
    try {
      const response = await fetch('/api/admin/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookUrl,
          enabled: webhookConfig?.enabled ?? true,
          events: webhookConfig?.events ?? { registration: true, profileUpdate: true }
        })
      })

      if (response.ok) {
        const data = await response.json()
        setWebhookConfig(data.config)
        setTestResult({ success: true, message: 'Konfiguration gespeichert!' })
        setTimeout(() => setTestResult(null), 3000)
      }
    } catch (err) {
      console.error('Fehler beim Speichern:', err)
      setTestResult({ success: false, message: 'Fehler beim Speichern' })
    } finally {
      setIsSavingWebhook(false)
    }
  }

  const handleToggleWebhook = async (enabled: boolean) => {
    if (!webhookConfig) return

    try {
      const response = await fetch('/api/admin/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookConfig.url,
          enabled,
          events: webhookConfig.events
        })
      })

      if (response.ok) {
        const data = await response.json()
        setWebhookConfig(data.config)
      }
    } catch (err) {
      console.error('Fehler beim Toggle:', err)
    }
  }

  const handleToggleEvent = async (event: 'registration' | 'profileUpdate', enabled: boolean) => {
    if (!webhookConfig) return

    const newEvents = { ...webhookConfig.events, [event]: enabled }

    try {
      const response = await fetch('/api/admin/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookConfig.url,
          enabled: webhookConfig.enabled,
          events: newEvents
        })
      })

      if (response.ok) {
        const data = await response.json()
        setWebhookConfig(data.config)
      }
    } catch (err) {
      console.error('Fehler beim Event-Toggle:', err)
    }
  }

  const handleTestWebhook = async () => {
    setIsTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/admin/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test' })
      })

      const data = await response.json()

      if (data.success) {
        setTestResult({ success: true, message: `Erfolgreich! Status: ${data.statusCode}` })
        // Reload config to get new log
        const configResponse = await fetch('/api/admin/webhooks')
        if (configResponse.ok) {
          const configData = await configResponse.json()
          setWebhookConfig(configData.config)
        }
      } else {
        setTestResult({ success: false, message: data.error || 'Test fehlgeschlagen' })
      }
    } catch (err) {
      setTestResult({ success: false, message: 'Netzwerkfehler' })
    } finally {
      setIsTesting(false)
      setTimeout(() => setTestResult(null), 5000)
    }
  }

  const handleClearLogs = async () => {
    try {
      const response = await fetch('/api/admin/webhooks', { method: 'DELETE' })
      if (response.ok && webhookConfig) {
        setWebhookConfig({ ...webhookConfig, logs: [] })
      }
    } catch (err) {
      console.error('Fehler beim Löschen der Logs:', err)
    }
  }

  if (!isLoaded || (isLoaded && !isAdmin)) {
    return (
      <div className='flex h-dvh items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2Icon className='size-8 animate-spin' />
          <p className='text-muted-foreground'>Laden...</p>
        </div>
      </div>
    )
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Gerade eben'
    if (minutes < 60) return `vor ${minutes} Min.`
    if (hours < 24) return `vor ${hours} Std.`
    return `vor ${days} Tagen`
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <div className='bg-primary/10 flex size-12 items-center justify-center rounded-lg'>
          <ShieldIcon className='text-primary size-6' />
        </div>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold'>Admin-Bereich</h1>
          <p className='text-muted-foreground text-sm'>Benutzer verwalten und Benachrichtigungen senden</p>
        </div>
      </div>

      <Tabs defaultValue='users' className='space-y-6'>
          <TabsList>
            <TabsTrigger value='users' className='gap-2'>
              <UsersIcon className='size-4' />
              Benutzer
            </TabsTrigger>
            <TabsTrigger value='notifications' className='gap-2'>
              <BellIcon className='size-4' />
              Benachrichtigungen
            </TabsTrigger>
            <TabsTrigger value='webhooks' className='gap-2'>
              <WebhookIcon className='size-4' />
              Webhooks
            </TabsTrigger>
          </TabsList>

          <TabsContent value='users'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <span className='text-lg font-semibold'>Benutzer ({users.length})</span>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className='flex items-center justify-center py-8'>
                    <Loader2Icon className='size-6 animate-spin' />
                  </div>
                ) : error ? (
                  <div className='text-destructive py-8 text-center'>{error}</div>
                ) : (
                  <div className='overflow-x-auto'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Benutzer</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Unternehmen</TableHead>
                          <TableHead>Branche</TableHead>
                          <TableHead>Quelle</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Registriert</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map(userData => (
                          <TableRow key={userData.id}>
                            <TableCell>
                              <div className='flex items-center gap-3'>
                                <Avatar className='size-8'>
                                  <AvatarImage src={userData.imageUrl} />
                                  <AvatarFallback>
                                    {(userData.firstName?.[0] || '') + (userData.lastName?.[0] || '')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                  <span className='font-medium'>
                                    {userData.firstName} {userData.lastName}
                                  </span>
                                  {userData.role === 'admin' && (
                                    <Badge variant='secondary' className='w-fit text-xs'>Admin</Badge>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className='text-muted-foreground'>{userData.email}</TableCell>
                            <TableCell>{userData.companyName || '-'}</TableCell>
                            <TableCell>{userData.industry || '-'}</TableCell>
                            <TableCell>{userData.referralSource || '-'}</TableCell>
                            <TableCell>
                              {userData.onboardingCompleted ? (
                                <Badge variant='default' className='bg-secondary text-secondary-foreground'>Aktiv</Badge>
                              ) : (
                                <Badge variant='outline'>Onboarding</Badge>
                              )}
                            </TableCell>
                            <TableCell className='text-muted-foreground text-sm'>
                              {formatDate(userData.createdAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='notifications' className='space-y-6'>
            <div className='grid gap-6 lg:grid-cols-2'>
              <Card>
                <CardHeader>
                  <div className='flex items-center gap-2'>
                    <MegaphoneIcon className='size-5' />
                    <span className='text-lg font-semibold'>Neue Benachrichtigung</span>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex flex-col gap-1'>
                    <Label htmlFor='notif-title'>Titel *</Label>
                    <Input
                      id='notif-title'
                      placeholder='z.B. Neues Tool verfügbar!'
                      value={notifForm.title}
                      onChange={e => setNotifForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <Label htmlFor='notif-message'>Nachricht *</Label>
                    <Textarea
                      id='notif-message'
                      placeholder='Beschreibe die Neuigkeit...'
                      rows={3}
                      value={notifForm.message}
                      onChange={e => setNotifForm(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <Label htmlFor='notif-type'>Typ</Label>
                    <Select
                      value={notifForm.type}
                      onValueChange={(value: 'info' | 'update' | 'announcement') =>
                        setNotifForm(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger id='notif-type'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='info'>Info</SelectItem>
                        <SelectItem value='update'>Update</SelectItem>
                        <SelectItem value='announcement'>Ankündigung</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='flex flex-col gap-1'>
                      <Label htmlFor='notif-link'>Link (optional)</Label>
                      <Input
                        id='notif-link'
                        placeholder='https://...'
                        value={notifForm.link}
                        onChange={e => setNotifForm(prev => ({ ...prev, link: e.target.value }))}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label htmlFor='notif-linktext'>Link-Text (optional)</Label>
                      <Input
                        id='notif-linktext'
                        placeholder='Mehr erfahren'
                        value={notifForm.linkText}
                        onChange={e => setNotifForm(prev => ({ ...prev, linkText: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className='flex items-center justify-between pt-2'>
                    <div>
                      {sendSuccess && (
                        <span className='text-sm text-primary'>Benachrichtigung gesendet!</span>
                      )}
                    </div>
                    <Button
                      onClick={handleSendNotification}
                      disabled={isSending || !notifForm.title || !notifForm.message}
                    >
                      {isSending ? (
                        <Loader2Icon className='size-4 animate-spin' />
                      ) : (
                        <SendIcon className='size-4' />
                      )}
                      An alle senden
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-semibold'>Gesendete Benachrichtigungen</span>
                    <Badge variant='secondary'>{notifications.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {isNotifLoading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Loader2Icon className='size-6 animate-spin' />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className='text-muted-foreground py-8 text-center'>
                      Noch keine Benachrichtigungen gesendet
                    </div>
                  ) : (
                    <div className='max-h-96 space-y-3 overflow-y-auto'>
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          className='bg-muted/50 flex items-start gap-3 rounded-lg p-3'
                        >
                          <Avatar className='size-8'>
                            <AvatarImage src={notif.adminAvatar} />
                            <AvatarFallback>{notif.adminName[0]}</AvatarFallback>
                          </Avatar>
                          <div className='flex-1 space-y-1'>
                            <div className='flex items-start justify-between gap-2'>
                              <span className='font-medium'>{notif.title}</span>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='text-muted-foreground hover:text-destructive size-6'
                                onClick={() => handleDeleteNotification(notif.id)}
                              >
                                <TrashIcon className='size-3.5' />
                              </Button>
                            </div>
                            <p className='text-muted-foreground text-sm'>{notif.message}</p>
                            {notif.link && (
                              <div className='flex items-center gap-1 text-sm'>
                                <LinkIcon className='size-3' />
                                <a href={notif.link} className='text-primary hover:underline'>
                                  {notif.linkText || notif.link}
                                </a>
                              </div>
                            )}
                            <div className='flex items-center gap-2 text-xs'>
                              <span className='text-muted-foreground'>{formatRelativeTime(notif.createdAt)}</span>
                              <Badge variant='outline' className='text-xs'>
                                {notif.type === 'info' && 'Info'}
                                {notif.type === 'update' && 'Update'}
                                {notif.type === 'announcement' && 'Ankündigung'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='webhooks' className='space-y-6'>
            <div className='grid gap-6 lg:grid-cols-2'>
              {/* Webhook Konfiguration */}
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <WebhookIcon className='size-5' />
                      <span className='text-lg font-semibold'>Webhook Konfiguration</span>
                    </div>
                    {webhookConfig && (
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-muted-foreground'>
                          {webhookConfig.enabled ? 'Aktiv' : 'Inaktiv'}
                        </span>
                        <Switch
                          checked={webhookConfig.enabled}
                          onCheckedChange={handleToggleWebhook}
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {isWebhookLoading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Loader2Icon className='size-6 animate-spin' />
                    </div>
                  ) : (
                    <>
                      <div className='flex flex-col gap-1'>
                        <Label htmlFor='webhook-url'>Webhook URL</Label>
                        <div className='flex gap-2'>
                          <Input
                            id='webhook-url'
                            placeholder='https://...'
                            value={webhookUrl}
                            onChange={e => setWebhookUrl(e.target.value)}
                          />
                          <Button
                            onClick={handleSaveWebhook}
                            disabled={isSavingWebhook || !webhookUrl}
                            size='icon'
                          >
                            {isSavingWebhook ? (
                              <Loader2Icon className='size-4 animate-spin' />
                            ) : (
                              <CheckCircleIcon className='size-4' />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className='space-y-3 pt-2'>
                        <Label>Events</Label>
                        <div className='space-y-2'>
                          <div className='flex items-center justify-between rounded-lg border p-3'>
                            <div>
                              <p className='font-medium text-sm'>user.registration</p>
                              <p className='text-xs text-muted-foreground'>Bei neuer Registrierung</p>
                            </div>
                            <Switch
                              checked={webhookConfig?.events.registration ?? true}
                              onCheckedChange={(checked) => handleToggleEvent('registration', checked)}
                            />
                          </div>
                          <div className='flex items-center justify-between rounded-lg border p-3'>
                            <div>
                              <p className='font-medium text-sm'>user.profile_update</p>
                              <p className='text-xs text-muted-foreground'>Nach Onboarding-Abschluss</p>
                            </div>
                            <Switch
                              checked={webhookConfig?.events.profileUpdate ?? true}
                              onCheckedChange={(checked) => handleToggleEvent('profileUpdate', checked)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center justify-between pt-4 border-t'>
                        <div>
                          {testResult && (
                            <span className={cn(
                              'text-sm flex items-center gap-1',
                              testResult.success ? 'text-primary' : 'text-destructive'
                            )}>
                              {testResult.success ? (
                                <CheckCircleIcon className='size-4' />
                              ) : (
                                <XCircleIcon className='size-4' />
                              )}
                              {testResult.message}
                            </span>
                          )}
                        </div>
                        <Button
                          variant='outline'
                          onClick={handleTestWebhook}
                          disabled={isTesting || !webhookConfig?.enabled}
                        >
                          {isTesting ? (
                            <Loader2Icon className='size-4 animate-spin' />
                          ) : (
                            <PlayIcon className='size-4' />
                          )}
                          Test senden
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Webhook Logs */}
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-semibold'>Webhook Logs</span>
                    <div className='flex items-center gap-2'>
                      <Badge variant='secondary'>{webhookConfig?.logs.length || 0}</Badge>
                      {(webhookConfig?.logs.length || 0) > 0 && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={handleClearLogs}
                          className='text-muted-foreground hover:text-destructive'
                        >
                          <TrashIcon className='size-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isWebhookLoading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Loader2Icon className='size-6 animate-spin' />
                    </div>
                  ) : !webhookConfig?.logs.length ? (
                    <div className='text-muted-foreground py-8 text-center'>
                      Noch keine Webhook-Aufrufe
                    </div>
                  ) : (
                    <div className='max-h-96 space-y-2 overflow-y-auto'>
                      {webhookConfig.logs.map(log => (
                        <div
                          key={log.id}
                          className={cn(
                            'rounded-lg border p-3',
                            log.status === 'success' ? 'border-secondary/30 bg-secondary/10' : 'border-destructive/30 bg-destructive/10'
                          )}
                        >
                          <div className='flex items-start justify-between gap-2'>
                            <div className='flex items-center gap-2'>
                              {log.status === 'success' ? (
                                <CheckCircleIcon className='size-4 text-primary' />
                              ) : (
                                <XCircleIcon className='size-4 text-destructive' />
                              )}
                              <span className='font-mono text-sm'>{log.event}</span>
                            </div>
                            <span className='text-xs text-muted-foreground'>
                              {new Date(log.timestamp).toLocaleString('de-DE')}
                            </span>
                          </div>
                          {log.statusCode && (
                            <p className='text-xs text-muted-foreground mt-1'>
                              Status: {log.statusCode}
                            </p>
                          )}
                          {log.error && (
                            <p className='text-xs text-destructive mt-1'>
                              Fehler: {log.error}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
    </div>
  )
}

export default AdminPage
