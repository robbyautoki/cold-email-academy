import {
  BellRingIcon,
  CircleOffIcon,
  MailIcon,
  MailOpenIcon,
  MousePointerClickIcon,
  TriangleAlertIcon
} from 'lucide-react'

import MonthlyCampaignCard from '@/components/shadcn-studio/blocks/widget-monthly-campaign'

// Campaigns data
const campaignData = [
  {
    icon: MailIcon,
    title: 'Emails',
    value: '14,250',
    percentage: '0.3%'
  },
  {
    icon: MailOpenIcon,
    title: 'Opened',
    value: '4,523',
    percentage: '3.1%'
  },
  {
    icon: MousePointerClickIcon,
    title: 'Clicked',
    value: '1,250',
    percentage: '1.3%'
  },
  {
    icon: BellRingIcon,
    title: 'Subscribed',
    value: '750',
    percentage: '9.8%'
  },
  {
    icon: TriangleAlertIcon,
    title: 'Errors',
    value: '20',
    percentage: '1.5%'
  },
  {
    icon: CircleOffIcon,
    title: 'Unsubscribed',
    value: '86',
    percentage: '0.6%'
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <MonthlyCampaignCard
          title='Monthly campaign state'
          subTitle='7.58k Social Visitors'
          campaignData={campaignData}
          className='w-full max-w-100'
        />
      </div>
    </div>
  )
}

export default WidgetCardPreview
