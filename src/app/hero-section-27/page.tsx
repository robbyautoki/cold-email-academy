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

const avatarMotionData = [
  // Left Avatars
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'JW',
    name: 'Jenny Wilson',
    duration: 0.8,
    className: 'absolute -top-14 left-50',
    sizeClass: 'size-16'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'OS',
    name: 'Olivia Sparks',
    duration: 0.5,
    className: 'absolute top-0 left-8',
    sizeClass: 'size-20.5'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'EM',
    name: 'Emma Martinez',
    duration: 1,
    className: 'absolute top-40 left-42',
    sizeClass: 'size-16'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    fallback: 'HL',
    name: 'Howard Lloyd',
    duration: 0.6,
    className: 'absolute bottom-60 -left-1',
    sizeClass: 'size-13'
  },

  // Right Avatars
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-19.png',
    fallback: 'SC',
    name: 'Sarah Chen',
    duration: 0.8,
    className: 'absolute -top-14 right-50',
    sizeClass: 'size-16'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
    fallback: 'MT',
    name: 'Michael Thompson',
    duration: 1,
    className: 'absolute top-0 right-8',
    sizeClass: 'size-20.5'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
    fallback: 'AD',
    name: 'Alex Davis',
    duration: 0.5,
    className: 'absolute top-40 right-42',
    sizeClass: 'size-16'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
    fallback: 'HR',
    name: 'Hallie Richards',
    duration: 0.7,
    className: 'absolute -right-1 bottom-60',
    sizeClass: 'size-13'
  }
]

const HeroSectionPage = () => {
  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-col'>
        <HeroSection avatarMotion={avatarMotionData} />
      </main>
    </div>
  )
}

export default HeroSectionPage
