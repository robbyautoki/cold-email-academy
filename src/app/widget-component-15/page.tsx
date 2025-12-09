import UserOrderCard from '@/components/shadcn-studio/blocks/widget-user-order'

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <UserOrderCard className='w-full max-w-100' />
      </div>
    </div>
  )
}

export default WidgetCardPreview
