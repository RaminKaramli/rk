import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return <span className={`ui-badge ${className}`.trim()}>{children}</span>
}
