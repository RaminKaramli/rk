import type { SocialLink } from '../../../types/common.types'
import SocialIcon from './SocialIcon'

type SocialLinksProps = {
  className?: string
  links: SocialLink[]
}

export default function SocialLinks({ className = 'social-links', links }: SocialLinksProps) {
  return (
    <span className={className}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label={link.label}
        >
          <SocialIcon icon={link.icon} />
        </a>
      ))}
    </span>
  )
}
