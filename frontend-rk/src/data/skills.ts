import type { AboutSkill } from '../types/skill.types'

export const aboutSkills: AboutSkill[] = [
  {
    title: 'Development',
    description:
      'Designing intuitive, scalable digital products that solve real user problems and drive meaningful outcomes.',
    tags: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js'],
  },
  {
    title: 'CSS Framework',
    description:
      'Building interfaces faster with practical CSS frameworks that help keep layouts clean, responsive, and consistent.',
    tags: ['Bootstrap', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: 'Animation & Scroll Libraries',
    description:
      'Building smoother motion, reveal effects, and scroll experiences with libraries that make interfaces feel more dynamic and polished.',
    tags: ['GSAP', 'AOS', 'ScrollReveal', 'Lenis', 'Locomotive Scroll'],
  },
  {
    title: 'Graphic & UI/UX Design',
    description:
      'Designing visual assets, interface concepts, and presentation-ready layouts with tools that support both product and graphic work.',
    tags: ['Canva', 'Kittl', 'CorelDRAW', 'Adobe Photoshop', 'Figma'],
  },
  {
    title: 'Graphic & Print Design',
    description:
      'Creating print-ready visuals and branded materials that support both presentation, promotion, and business identity needs.',
    tags: ['Logo', 'Business Card', 'Invitation', 'Certificate', 'Letterhead', 'Brochure / Flyer', 'Poster', 'Menu'],
  },
]

export type { AboutSkill }
