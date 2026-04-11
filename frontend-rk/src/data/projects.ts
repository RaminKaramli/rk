import projectCard from '../assets/images/project-card.png'
import type { NotableStatConfig, StackCard } from '../types/project.types'

export const stackCards: StackCard[] = [
  {
    alt: 'Modern landing page project preview',
    image: projectCard,
    tags: ['Product', 'Web Design', 'Branding', 'React'],
  },
  {
    alt: 'Portfolio layout project preview',
    image: projectCard,
    tags: ['Portfolio', 'UI System', 'Animation', 'TypeScript'],
  },
  {
    alt: 'Startup showcase project preview',
    image: projectCard,
    tags: ['Startup', 'SCSS', 'Frontend', 'Responsive'],
  },
  {
    alt: 'Creative presentation project preview',
    image: projectCard,
    tags: ['Creative', 'Glassmorphism', 'Interaction', 'Build'],
  },
]

export const notableStats: NotableStatConfig[] = [
  { kind: 'static', label: '+Projects', minDigits: 2, target: 2 },
  {
    kind: 'monthsSince',
    monthLabel: '+Months',
    monthMinDigits: 2,
    startDate: '2026-02-09',
    yearLabel: '+Years',
    yearMinDigits: 1,
  },
  { kind: 'static', label: '+Clients', minDigits: 2, target: 5 },
]

export type { NotableStatConfig, StackCard }
