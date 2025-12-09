import {
  Gamepad2Icon,
  HeadphonesIcon,
  LaptopIcon,
  LaptopMinimalIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  WatchIcon
} from 'lucide-react'

import TopProductsCard from '@/components/shadcn-studio/blocks/widget-top-products'

// Product by sales data
const productsBySalesData = [
  {
    icon: SmartphoneIcon,
    productName: 'Samsung galaxy S25',
    productBrand: 'Samsung',
    sales: '$32,203'
  },
  {
    icon: LaptopIcon,
    productName: 'Apple MacBook Pro',
    productBrand: 'Apple',
    sales: '$1,299'
  },
  {
    icon: HeadphonesIcon,
    productName: 'Sony WH-1000XM4',
    productBrand: 'Sony',
    sales: '$348'
  },
  {
    icon: LaptopMinimalIcon,
    productName: 'Dell XPS 13',
    productBrand: 'Dell',
    sales: '$999'
  },
  {
    icon: WatchIcon,
    productName: 'Smart band 4',
    productBrand: 'Xiaomi',
    sales: '$749'
  }
]

// Products by volume data
const productsByVolumeData = [
  {
    icon: LaptopIcon,
    productName: 'Dell XPS 13',
    productBrand: 'Dell',
    volume: '200k',
    changePercentage: 5
  },
  {
    icon: TabletIcon,
    productName: 'Apple iPad',
    productBrand: 'Apple',
    volume: '80K',
    changePercentage: 10
  },
  {
    icon: Gamepad2Icon,
    productName: 'Sony PlayStation 5',
    productBrand: 'Sony',
    volume: '30k',
    changePercentage: -20
  },
  {
    icon: MonitorIcon,
    productName: 'IMac pro',
    productBrand: 'Apple',
    volume: '15k',
    changePercentage: 12
  },
  {
    icon: SmartphoneIcon,
    productName: 'Samsung galaxy S25',
    productBrand: 'Samsung',
    volume: '12.4k',
    changePercentage: -15
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <TopProductsCard
          salesTitle='Top Products by Sales'
          volumeTitle='Top Products by Volume'
          productsBySalesData={productsBySalesData}
          productsByVolumeData={productsByVolumeData}
          className='w-full max-w-200'
        />
      </div>
    </div>
  )
}

export default WidgetCardPreview
