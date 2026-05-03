import projectCard from '../assets/images/publications/2.png'
import projectCardTwo from '../assets/images/publications/3.png'
import projectCardThree from '../assets/images/publications/1.png'
import projectCardFour from '../assets/images/publications/4.png'
import type { NotableStatConfig, StackCard } from '../types/project.types'

export const stackCards: StackCard[] = [
  {
    alt: 'Modern landing page project preview',
    image: projectCard,
    tags: ['Product', 'Web Design', 'Branding', 'React'],
  },
  {
    alt: 'Portfolio layout project preview',
    image: projectCardTwo,
    tags: ['Portfolio', 'UI System', 'Animation', 'TypeScript'],
  },
  {
    alt: 'Startup showcase project preview',
    image: projectCardThree,
    tags: ['Startup', 'SCSS', 'Frontend', 'Responsive'],
  },
  {
    alt: 'Creative presentation project preview',
    image: projectCardFour,
    tags: ['Creative', 'Glassmorphism', 'Interaction', 'Build'],
  },
]

export const notableStats: NotableStatConfig[] = [
  { kind: 'static', label: '+Projects', minDigits: 1, target: 2 },
  {
    kind: 'monthsSince',
    monthLabel: '+Months',
    monthMinDigits: 1,
    startDate: '2026-02-09',
    yearLabel: '+Years',
    yearMinDigits: 1,
  },
  { kind: 'static', label: '+Clients', minDigits: 1, target: 5 },
]

export type { NotableStatConfig, StackCard }
