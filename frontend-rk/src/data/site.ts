import aboutShowcaseMotion from '../assets/images/about-showcase-motion.png'
import avatar from '../assets/images/avatar.png'
import footerPortrait from '../assets/images/footer-portrait.jpeg'
import heroFigure from '../assets/images/hero-figure.png'
import projectCard from '../assets/images/project-card.png'

export type SocialIconName = 'linkedin' | 'github' | 'instagram' | 'x'

export type MenuLink = {
  href: string
  imageIndex: number
  label: string
}

export type SocialLink = {
  href: string
  icon: SocialIconName
  label: string
}

export type FooterLink = {
  href: string
  label: string
}

export type StackCard = {
  alt: string
  image: string
  tags: string[]
}

export type AboutSkill = {
  description: string
  tags: string[]
  title: string
}

export type NotableStatConfig =
  | {
      kind: 'static'
      label: string
      minDigits: number
      target: number
    }
  | {
      kind: 'monthsSince'
      monthLabel: string
      monthMinDigits: number
      startDate: string
      yearLabel: string
      yearMinDigits: number
    }

export const media = {
  aboutShowcaseMotion,
  avatar,
  footerPortrait,
  heroFigure,
  projectCard,
}

export const overlayMenuImages = [
  'https://images.unsplash.com/photo-1522139137660-4248e04955b8?q=80&w=2076&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1710799885122-428e63eff691?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1720983590448-28b749bd403d?q=80&w=1932&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1718212456991-54ab241fae82?q=80&w=2070&auto=format&fit=crop',
]

export const homeMenuLinks: MenuLink[] = [
  { href: './index.html#home-section', imageIndex: 0, label: 'HOME' },
  { href: './aboutme.html', imageIndex: 1, label: 'ABOUT' },
  { href: './index.html#notable-works', imageIndex: 2, label: 'WORKS' },
  { href: './index.html#site-footer', imageIndex: 3, label: 'CONTACT' },
]

export const aboutMenuLinks: MenuLink[] = [
  { href: './index.html#home-section', imageIndex: 0, label: 'HOME' },
  { href: './aboutme.html', imageIndex: 1, label: 'ABOUT' },
  { href: './index.html#notable-works', imageIndex: 2, label: 'WORKS' },
  { href: './index.html#site-footer', imageIndex: 3, label: 'CONTACT' },
]

export const heroSocialLinks: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/karamliramin/',
    icon: 'linkedin',
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/RaminKaramli',
    icon: 'github',
    label: 'GitHub',
  },
  {
    href: 'https://www.instagram.com/raminkaramli/',
    icon: 'instagram',
    label: 'Instagram',
  },
  {
    href: 'https://x.com/raminkaramli',
    icon: 'x',
    label: 'X',
  },
]

export const footerSocialLinks: FooterLink[] = [
  { href: 'https://www.linkedin.com/in/karamliramin/', label: 'LINKEDIN' },
  { href: 'https://www.instagram.com/raminkaramli/', label: 'INSTAGRAM' },
  { href: 'https://github.com/RaminKaramli', label: 'GITHUB' },
  { href: 'https://www.behance.net/', label: 'BEHANCE' },
]

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
    tags: ['Bootstrap', 'Tailwind CSS', 'Bulma'],
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

export const siteContent = {
  aboutLead:
    'Whether it’s shaping gentle, intentional flows or holding space for stories to unfold, I care about designing in a way that feels, not just functions. Experiences that stay. Moments that matter. That’s what I’m here for.',
  contactEmail: 'raminkaramli93@gmail.com',
  footerMeta: '© 2026 Ramin Karamli. All rights reserved.',
  heroBottomCopy: 'I build websites using HTML, CSS, JavaScript, TypeScript, and React.js',
  heroTopCopy: 'I use a hearing aid to hear',
}
