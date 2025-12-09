import VehiclesConditionCard from '@/components/shadcn-studio/blocks/widget-vehicles-condition'

const vehicleConditionData = [
  {
    condition: 'Excellent',
    details: '12% increase',
    progressValue: 55,
    changePercentage: '+25%'
  },
  {
    condition: 'Good',
    details: '24 vehicles',
    progressValue: 20,
    changePercentage: '+30%'
  },
  {
    condition: 'Average',
    details: '182 Tasks',
    progressValue: 12,
    changePercentage: '-15%'
  },
  {
    condition: 'Bad',
    details: '9 vehicles',
    progressValue: 8,
    changePercentage: '+35%'
  },
  {
    condition: 'Not Working',
    details: '3 vehicles',
    progressValue: 5,
    changePercentage: '-2%'
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <VehiclesConditionCard
          title='Vehicles Condition'
          vehicleConditionData={vehicleConditionData}
          className='w-full max-w-100'
        />
      </div>
    </div>
  )
}

export default WidgetCardPreview
