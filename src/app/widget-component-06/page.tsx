import SalesByCountryCard from '@/components/shadcn-studio/blocks/widget-sales-by-countries'

// Sales data
const Sales = [
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/flags/austria.png',
    sales: '$867k',
    country: 'Austria',
    changePercentage: '20.3%',
    trend: 'up'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/flags/china.png',
    sales: '$1.2M',
    country: 'China',
    changePercentage: '15.7%',
    trend: 'up'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/flags/switzerland.png',
    sales: '$750k',
    country: 'Switzerland',
    changePercentage: '18.2%',
    trend: 'down'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png',
    sales: '$1.5M',
    country: 'India',
    changePercentage: '22.1%',
    trend: 'up'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/flags/brazil.png',
    sales: '$980k',
    country: 'Brazil',
    changePercentage: '19.6%',
    trend: 'down'
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <SalesByCountryCard
          title='Sales by countries'
          subTitle='Monthly sales overview'
          salesData={Sales}
          className='w-full max-w-100'
        />
      </div>
    </div>
  )
}

export default WidgetCardPreview
