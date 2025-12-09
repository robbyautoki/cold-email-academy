import {
  BriefcaseBusinessIcon,
  ComponentIcon,
  LayoutDashboardIcon,
  PencilRulerIcon,
  CodepenIcon,
  BlocksIcon
} from 'lucide-react'

import Features from '@/components/shadcn-studio/blocks/features-section-13/features-section-13'

const featuresList = [
  {
    icon: ComponentIcon,
    title: 'Unlimited Components:',
    description: 'Access a rich library of reusable components, designed for speed, scalability, and clarity.'
  },
  {
    icon: BlocksIcon,
    title: 'Smart Building Blocks:',
    description: 'Drag, drop, and customize essential UI elements to build faster with total design control.'
  },
  {
    icon: LayoutDashboardIcon,
    title: 'Flexible Layout System:',
    description: 'Adapt your designs to any screen size with responsive, modular layout blocks that just work.'
  },
  {
    icon: BriefcaseBusinessIcon,
    title: 'Complete UI Toolkit:',
    description: 'Everything you need to craft interfaces fast, consistent, and production-ready from day one.'
  },
  {
    icon: PencilRulerIcon,
    title: 'Design for Creators:',
    description: 'Beautifully designed components tailored for modern, creative-first brands and products.'
  },
  {
    icon: CodepenIcon,
    title: 'Effortless Prototyping:',
    description: 'Turn your ideas into high-fidelity, interactive designs — seamlessly and without code.'
  }
]

const FeaturesPage = () => {
  return <Features featuresList={featuresList} />
}

export default FeaturesPage
