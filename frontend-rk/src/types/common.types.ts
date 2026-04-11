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
