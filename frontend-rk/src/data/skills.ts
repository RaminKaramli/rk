import type { AboutSkill } from '../types/skill.types'

export const aboutSkills: AboutSkill[] = [
  {
    title: 'Development',
    description:
      'Designing intuitive, scalable digital products that solve real user problems and drive meaningful outcomes.',
    tags: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js'],
  },
  {
    title: 'CSS Frameworks & UI',
    description:
      'Building interfaces faster with practical CSS frameworks and UI libraries that help keep layouts clean, responsive, and consistent.',
    tags: ['Tailwind CSS', 'Bootstrap', 'Bulma', 'W3.CSS', 'Uiverse.io'],
  },
  {
    title: 'Libraries',
    description:
      'Building smoother motion, reveal effects, and scroll experiences with libraries that make interfaces feel more dynamic and polished.',
    tags: [
      'GSAP',
      'Swiper.js',
      'React Icons',
      'AOS',
      'ScrollReveal',
      'Lenis',
      'Locomotive Scroll',
      'TAOS',
      'Framer Motion (Currently Learning)',
    ],
  },
  {
    title: 'Design Tools',
    description:
      'Designing visual assets, interface concepts, and presentation-ready layouts with tools that support both product and graphic work.',
    tags: ['Figma', 'CorelDRAW', 'Adobe Photoshop', 'Canva', 'Kittl'],
  },
  {
    title: 'Graphic & Print Design',
    description:
      'Creating print-ready visuals and branded materials that support both presentation, promotion, and business identity needs.',
    tags: [
      'Logo',
      'Business Cards',
      'Invitations',
      'Certificates',
      'Brochures/Flyers',
      'Posters',
      'Menus',
    ],
  },
]

export type { AboutSkill }
