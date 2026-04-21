import type { FooterLink, MenuLink, SocialLink } from '../types/common.types'
import aboutShowcaseMotion from '../assets/images/about-showcase-motion.png'
import heroImage from '../assets/images/her0.png'
import myImage from '../assets/images/my.png'
import rkImage from '../assets/images/rk.jpeg'

export const overlayMenuImages = [
  heroImage,
  rkImage,
  myImage,
  aboutShowcaseMotion,
]

export const homeMenuLinks: MenuLink[] = [
  { href: '/#home-section', imageIndex: 0, label: 'HOME' },
  { href: '/?page=about', imageIndex: 1, label: 'ABOUT' },
  { href: '/#notable-works', imageIndex: 2, label: 'WORKS' },
  { href: '/#site-footer', imageIndex: 3, label: 'CONTACT' },
]

export const aboutMenuLinks: MenuLink[] = [
  { href: '/#home-section', imageIndex: 0, label: 'HOME' },
  { href: '/?page=about', imageIndex: 1, label: 'ABOUT' },
  { href: '/?page=about#notable-works', imageIndex: 2, label: 'WORKS' },
  { href: '/?page=about#site-footer', imageIndex: 3, label: 'CONTACT' },
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

export type { FooterLink, MenuLink, SocialIconName, SocialLink } from '../types/common.types'
