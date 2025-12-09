import YourAccountsCard from '@/components/shadcn-studio/blocks/widget-your-accounts'

const userData = [
  {
    name: 'jackwilliams',
    accountType: 'Business',
    isVerified: true,
    avatarUrl: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
  },
  {
    name: 'jacktherider',
    accountType: 'User',
    avatarUrl: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <YourAccountsCard title='Your accounts' userData={userData} className='w-full max-w-100' />
      </div>
    </div>
  )
}

export default WidgetCardPreview
