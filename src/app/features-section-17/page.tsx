import Features from '@/components/shadcn-studio/blocks/features-section-17/features-section-17'

const FeaturesPage = () => {
  const sectionsData = [
    {
      badge: 'OUR BEST FEATURES',
      title: 'Unleash the full financial potential with our best features',
      description: 'Using technology to make finance simpler, smarter and more rewarding.',
      features: [
        {
          title: 'Live market:',
          description: "Stay ahead of the game with our platform's real time market data and analysis"
        },
        {
          title: 'User friendly UI:',
          description: "Experience the convenience and ease of our platform's user-friendly design"
        },
        {
          title: 'Easy login:',
          description: 'Get the most out of platform by leveraging our easy login capabilities'
        }
      ],
      image: {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-58.png',
        darkSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-58-dark.png',
        alt: 'Financial Dashboard'
      }
    },
    {
      badge: 'ADVANCED FEATURES',
      title: 'Maximise Your Financial Efficiency with Smarter Tools',
      description: 'Harness intelligent features designed to streamline, simplify, and elevate your financial journey.',
      features: [
        {
          title: 'Real-Time Market Insights:',
          description: 'Make informed decisions with up-to-the-minute financial data'
        },
        {
          title: 'Intuitive Design:',
          description: 'Make informed decisions with up-to-the-minute financial data'
        },
        {
          title: 'Seamless:',
          description: 'Enjoy fast, secure entry with our hassle-free login experience'
        }
      ],
      image: {
        src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-57.png',
        darkSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-57-dark.png',
        alt: 'Dashboard Wireframe'
      }
    }
  ]

  return <Features sections={sectionsData} />
}

export default FeaturesPage
