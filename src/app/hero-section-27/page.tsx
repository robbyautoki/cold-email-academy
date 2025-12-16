import Header from '@/components/shadcn-studio/blocks/hero-section-27/header'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-27/hero-section-27'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'

const navigationData: NavigationSection[] = [
  {
    title: 'Home',
    href: '#'
  },
  {
    title: 'About us',
    href: '#'
  },
  {
    title: 'Services',
    href: '#'
  },
  {
    title: 'Solutions',
    href: '#'
  }
]

const HeroSectionPage = () => {
  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-col'>
        <HeroSection />
      </main>
    </div>
  )
}

export default HeroSectionPage
