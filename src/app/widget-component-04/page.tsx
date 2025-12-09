import SocialNetworkVisitsCard from '@/components/shadcn-studio/blocks/widget-social-network-visits'

// Social network visits data
const Visits = [
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/facebook-icon.png',
    platform: 'Facebook',
    socialNetworkType: 'Social Media',
    numberOfVisits: '10,436',
    growthPercentage: 15
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/linkdin-icon.png',
    platform: 'LinkedIn',
    socialNetworkType: 'Professional Network',
    numberOfVisits: '2,345',
    growthPercentage: 5
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png',
    platform: 'Twitter',
    socialNetworkType: 'Social Media',
    numberOfVisits: '6,789',
    growthPercentage: -10
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/instagram-icon.png',
    platform: 'Instagram',
    socialNetworkType: 'Social Media',
    numberOfVisits: '8,234',
    growthPercentage: 20
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <SocialNetworkVisitsCard
          title='Social network visits'
          visits='50,232'
          trend='up'
          percentage={16}
          comparisonText='Last 6 months Visits'
          visitData={Visits}
          className='w-full max-w-100'
        />
      </div>
    </div>
  )
}

export default WidgetCardPreview
