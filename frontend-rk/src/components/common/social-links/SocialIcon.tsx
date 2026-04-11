import type { SocialIconName } from '../../../types/common.types'
import { Icon } from '@iconify/react'

type SocialIconProps = {
  icon: SocialIconName
}

export default function SocialIcon({ icon }: SocialIconProps) {
  switch (icon) {
    case 'linkedin':
      return <Icon icon="mdi:linkedin" className="iconify-color mdi--linkedin linkedin social-icon" aria-hidden="true" />
    case 'github':
      return <Icon icon="mdi:github" className="iconify-color mdi--github github social-icon" aria-hidden="true" />
    case 'instagram':
      return <Icon icon="mdi:instagram" className="iconify-color mdi--instagram instagram social-icon" aria-hidden="true" />
    case 'x':
      return <Icon icon="ri:twitter-x-fill" className="iconify-color ri--twitter-x-fill twitter social-icon" aria-hidden="true" />
    default:
      return null
  }
}
