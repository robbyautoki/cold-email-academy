import SocialProof from '@/components/shadcn-studio/blocks/social-proof-03/social-proof-03'

const statsData = [
  {
    label: 'Blocks',
    value: '110+'
  },
  {
    label: 'Templates',
    value: '29'
  },
  {
    label: 'Customers',
    value: '3400+'
  },
  {
    label: 'Support Tickets',
    value: '2844'
  }
]

const SocialProofPage = () => {
  return <SocialProof stats={statsData} />
}

export default SocialProofPage
