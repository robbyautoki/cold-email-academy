'use client'

import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import {
  ArrowUpIcon,
  ArrowDownIcon,
  Undo2Icon,
  ChartColumnStackedIcon,
  GraduationCapIcon,
  BookOpenIcon,
  CalendarIcon,
  ListChecksIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  MailCheckIcon,
  ServerIcon,
  FileTextIcon,
  MailIcon,
  RepeatIcon,
  ScaleIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { knowledgeBaseCategories } from '@/data/knowledgeBase'
import { checklists } from '@/data/checklists'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
  className?: string
}

const SearchDialog = ({ defaultOpen = false, trigger, className }: Props) => {
  const [open, setOpen] = useState(defaultOpen)
  const [search, setSearch] = useState('')
  const router = useRouter()

  // Alle Artikel flach machen für die Suche
  const allArticles = useMemo(
    () =>
      knowledgeBaseCategories.flatMap(cat =>
        cat.articles.map(article => ({
          ...article,
          categoryTitle: cat.title,
          categorySlug: cat.slug
        }))
      ),
    []
  )

  // Filtern basierend auf Suchbegriff
  const filteredArticles =
    search.length > 1
      ? allArticles
          .filter(
            article =>
              article.title.toLowerCase().includes(search.toLowerCase()) ||
              article.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
          )
          .slice(0, 5)
      : []

  const filteredChecklists =
    search.length > 1
      ? checklists.filter(cl => cl.title.toLowerCase().includes(search.toLowerCase()))
      : []

  const handleSelect = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  const getChecklistIcon = (icon: string) => {
    switch (icon) {
      case 'mail':
        return <MailIcon className='text-primary size-5' />
      case 'shield':
        return <ShieldCheckIcon className='text-primary size-5' />
      case 'repeat':
        return <RepeatIcon className='text-primary size-5' />
      default:
        return <ListChecksIcon className='text-primary size-5' />
    }
  }

  return (
    <div className={className}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Suche nach Kursen, Tools, Artikeln...'
          value={search}
          onValueChange={setSearch}
          className='text-base [svg:has(+&)]:size-5 [svg:has(+&)]:opacity-100'
        />

        <CommandList className='max-h-[65vh]'>
          <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>

          <CommandGroup
            heading='Vorschläge'
            className='[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase'
          >
            <CommandItem onSelect={() => handleSelect('/dashboard')} className='!py-1.5 text-base'>
              <ChartColumnStackedIcon className='text-foreground !size-4.5' />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/kurse')} className='!py-1.5 text-base'>
              <GraduationCapIcon className='text-foreground !size-4.5' />
              <span>Kurse</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/knowledge-base')} className='!py-1.5 text-base'>
              <BookOpenIcon className='text-foreground !size-4.5' />
              <span>Knowledge Base</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/beratung')} className='!py-1.5 text-base'>
              <CalendarIcon className='text-foreground !size-4.5' />
              <span>Beratung buchen</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/checklisten')} className='!py-1.5 text-base'>
              <ListChecksIcon className='text-foreground !size-4.5' />
              <span>Checklisten</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup
            heading='Beliebte Tools'
            className='[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase'
          >
            <CommandItem onSelect={() => handleSelect('/tools/spf-generator')} className='gap-3 !py-1.5 text-base'>
              <Avatar className='size-9.5 bg-primary/10'>
                <AvatarFallback className='bg-transparent'>
                  <ShieldCheckIcon className='text-primary size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex w-full flex-col items-start'>
                <span className='font-medium'>SPF Generator</span>
                <span className='text-muted-foreground text-sm'>E-Mail Authentifizierung konfigurieren</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/tools/email-kalkulator')} className='gap-3 !py-1.5 text-base'>
              <Avatar className='size-9.5 bg-primary/10'>
                <AvatarFallback className='bg-transparent'>
                  <CalculatorIcon className='text-primary size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex w-full flex-col items-start'>
                <span className='font-medium'>Email Kalkulator</span>
                <span className='text-muted-foreground text-sm'>ROI und Kampagnen berechnen</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/tools/email-verifizierung')} className='gap-3 !py-1.5 text-base'>
              <Avatar className='size-9.5 bg-primary/10'>
                <AvatarFallback className='bg-transparent'>
                  <MailCheckIcon className='text-primary size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex w-full flex-col items-start'>
                <span className='font-medium'>Email Verifizierung</span>
                <span className='text-muted-foreground text-sm'>E-Mail Adressen prüfen</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/tools/mx-record-check')} className='gap-3 !py-1.5 text-base'>
              <Avatar className='size-9.5 bg-primary/10'>
                <AvatarFallback className='bg-transparent'>
                  <ServerIcon className='text-primary size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex w-full flex-col items-start'>
                <span className='font-medium'>MX Record Check</span>
                <span className='text-muted-foreground text-sm'>Mail Server überprüfen</span>
              </div>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Dynamische Suchergebnisse - Knowledge Base */}
          {filteredArticles.length > 0 && (
            <>
              <CommandGroup
                heading='Knowledge Base'
                className='[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase'
              >
                {filteredArticles.map(article => (
                  <CommandItem
                    key={article.id}
                    onSelect={() => handleSelect(`/knowledge-base/${article.categorySlug}/${article.slug}`)}
                    className='gap-3 !py-1.5 text-base'
                  >
                    <Avatar className='size-9.5 bg-blue-500/10'>
                      <AvatarFallback className='bg-transparent'>
                        <FileTextIcon className='text-blue-500 size-5' />
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex w-full flex-col items-start'>
                      <span className='font-medium'>{article.title}</span>
                      <span className='text-muted-foreground text-sm font-light'>{article.categoryTitle}</span>
                    </div>
                    <Badge className='bg-muted px-2 py-0.5 text-xs font-normal'>{article.readTime}</Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* Dynamische Suchergebnisse - Checklisten */}
          {filteredChecklists.length > 0 && (
            <>
              <CommandGroup
                heading='Checklisten'
                className='[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase'
              >
                {filteredChecklists.map(checklist => (
                  <CommandItem
                    key={checklist.slug}
                    onSelect={() => handleSelect(`/checklisten/${checklist.slug}`)}
                    className='gap-3 !py-1.5 text-base'
                  >
                    <Avatar className='size-9.5 bg-green-500/10'>
                      <AvatarFallback className='bg-transparent'>{getChecklistIcon(checklist.icon)}</AvatarFallback>
                    </Avatar>
                    <div className='flex w-full flex-col items-start'>
                      <span className='font-medium'>{checklist.title}</span>
                      <span className='text-muted-foreground text-sm font-light'>{checklist.items.length} Punkte</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* Schnellzugriff - 3 Knowledge Base Artikel */}
          <CommandGroup
            heading='Schnellzugriff'
            className='[&_[cmdk-group-heading]]:text-muted-foreground !px-4 !py-6 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:uppercase'
          >
            <CommandItem
              onSelect={() => handleSelect('/knowledge-base/grundlagen-strategie/was-ist-cold-email')}
              className='gap-3 !py-1.5 text-base'
            >
              <Avatar className='size-9.5 bg-blue-500/10'>
                <AvatarFallback className='bg-transparent'>
                  <BookOpenIcon className='text-blue-500 size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex w-full flex-col items-start'>
                <span className='font-medium'>Was ist Cold Email?</span>
                <span className='text-muted-foreground text-sm font-light'>Grundlagen & Strategie</span>
              </div>
              <Badge className='bg-blue-600/10 px-3 py-1 font-normal text-blue-600 dark:bg-blue-400/10 dark:text-blue-400'>
                Beliebt
              </Badge>
            </CommandItem>
            <CommandItem
              onSelect={() => handleSelect('/knowledge-base/technische-infrastruktur/spf-dkim-dmarc-einrichten')}
              className='gap-3 !py-1.5 text-base'
            >
              <Avatar className='size-9.5 bg-purple-500/10'>
                <AvatarFallback className='bg-transparent'>
                  <ShieldCheckIcon className='text-purple-500 size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex w-full flex-col items-start'>
                <span className='font-medium'>SPF, DKIM & DMARC einrichten</span>
                <span className='text-muted-foreground text-sm font-light'>Technische Infrastruktur</span>
              </div>
              <Badge className='bg-purple-600/10 px-3 py-1 font-normal text-purple-600 dark:bg-purple-400/10 dark:text-purple-400'>
                Wichtig
              </Badge>
            </CommandItem>
            <CommandItem
              onSelect={() => handleSelect('/knowledge-base/rechtliches-compliance/dsgvo-cold-email')}
              className='gap-3 !py-1.5 text-base'
            >
              <Avatar className='size-9.5 bg-red-500/10'>
                <AvatarFallback className='bg-transparent'>
                  <ScaleIcon className='text-red-500 size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex w-full flex-col items-start'>
                <span className='font-medium'>DSGVO-konforme Cold Emails</span>
                <span className='text-muted-foreground text-sm font-light'>Rechtliches & Compliance</span>
              </div>
              <Badge className='bg-red-600/10 px-3 py-1 font-normal text-red-600 dark:bg-red-400/10 dark:text-red-400'>
                Pflicht
              </Badge>
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <CommandSeparator />

        <div className='text-muted-foreground flex flex-wrap items-center gap-4 p-6'>
          <div className='flex flex-1 items-center gap-2'>
            <kbd className='rounded border px-1 text-sm'>esc</kbd>
            <span>Schließen</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex size-5 items-center justify-center rounded border'>
              <Undo2Icon className='size-4' />
            </div>
            <span>Auswählen</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex size-5 items-center justify-center rounded border'>
              <ArrowUpIcon className='size-4' />
            </div>
            <div className='flex size-5 items-center justify-center rounded border'>
              <ArrowDownIcon className='size-4' />
            </div>
            <span>Navigieren</span>
          </div>
        </div>
      </CommandDialog>
    </div>
  )
}

export default SearchDialog
