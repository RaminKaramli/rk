import type { ReactNode } from 'react'

type SectionTitleProps = {
  children: ReactNode
  className?: string
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return <h2 className={`ui-section-title ${className}`.trim()}>{children}</h2>
}
