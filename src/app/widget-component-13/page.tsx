import { GlobeIcon, MonitorIcon, CompassIcon, AppWindowIcon, CircleIcon } from 'lucide-react'
import ToolReleaseCard from '@/components/shadcn-studio/blocks/widget-browser-states'

const toolData = [
  {
    icon: CircleIcon,
    name: 'Google Chrome',
    percentage: 54.6
  },
  {
    icon: GlobeIcon,
    name: 'Mozilla Firefox',
    percentage: 37.5
  },
  {
    icon: MonitorIcon,
    name: 'Microsoft Edge',
    percentage: 22.8
  },
  {
    icon: CompassIcon,
    name: 'Opera',
    percentage: 10
  },
  {
    icon: AppWindowIcon,
    name: 'Safari',
    percentage: 6.7
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <ToolReleaseCard
          title='Browser states'
          subTitle='Counter April 2022'
          toolData={toolData}
          className='w-full max-w-100'
        />
      </div>
    </div>
  )
}

export default WidgetCardPreview
