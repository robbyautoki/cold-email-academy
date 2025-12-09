import PaymentHistoryCard from '@/components/shadcn-studio/blocks/widget-payment-history'

// Payment data
const paymentData = [
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/master-card.png',
    imgWidth: 8,
    cardNumber: '5688',
    cardType: 'Credit Card',
    date: '05/Jan',
    spend: '2,820',
    remaining: '10,020'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/visa.png',
    imgWidth: 8,
    cardNumber: '8562',
    cardType: 'Debit Card',
    date: '15/Feb',
    spend: '1,450',
    remaining: '8,570'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/american-express.png',
    imgWidth: 10.5,
    cardNumber: '5238',
    cardType: 'ATM card',
    date: '20/Mar',
    spend: '500',
    remaining: '7,070'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/visa.png',
    imgWidth: 8,
    cardNumber: '8562',
    cardType: 'Debit card',
    date: '10/Mar',
    spend: '750',
    remaining: '5,120'
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/master-card.png',
    imgWidth: 8,
    cardNumber: '*5688',
    cardType: 'Credit Card',
    date: '25/May',
    spend: '1,200',
    remaining: '5,870'
  }
]

const WidgetCardPreview = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-16'>
      <div className='flex justify-center'>
        <PaymentHistoryCard title='Payment History' paymentData={paymentData} className='w-full max-w-100' />
      </div>
    </div>
  )
}

export default WidgetCardPreview
