import type { FooterLink, MenuLink, SocialLink } from '../types/common.types'
import aboutShowcaseMotion from '../assets/images/about-showcase-motion.png'
import heroImage from '../assets/images/her0.png'
import myImage from '../assets/images/avatar-100kb.jpeg'
import rkImage from '../assets/images/rk.jpeg'

export const overlayMenuImages = [
  heroImage,
  rkImage,
  myImage,
  aboutShowcaseMotion,
]

export const homeMenuLinks: MenuLink[] = [
  { href: '/#home-section', imageIndex: 0, label: 'HOME' },
  { href: '/#about', imageIndex: 1, label: 'ABOUT' },
  { href: '/projects', imageIndex: 2, label: 'WORKS' },
  { href: 'https://drive.google.com/file/d/1ivaKtMMG6bSn46QoVIOkTxh7hKjoAgTa/view?usp=sharing', imageIndex: 3, label: 'RESUME' },
]

export const aboutMenuLinks: MenuLink[] = [
  { href: '/#home-section', imageIndex: 0, label: 'HOME' },
  { href: '/#about', imageIndex: 1, label: 'ABOUT' },
  { href: '/projects', imageIndex: 2, label: 'WORKS' },
  { href: 'https://drive.google.com/file/d/1ivaKtMMG6bSn46QoVIOkTxh7hKjoAgTa/view?usp=sharing', imageIndex: 3, label: 'RESUME' },
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
  { href: 'https://x.com/raminkaramli', label: 'TWITTER' },
  { href: 'https://www.behance.net/', label: 'BEHANCE' },
]

export type { FooterLink, MenuLink, SocialIconName, SocialLink } from '../types/common.types'
