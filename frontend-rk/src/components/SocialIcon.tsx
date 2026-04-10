import type { SocialIconName } from '../data/site'

type SocialIconProps = {
  icon: SocialIconName
}

export default function SocialIcon({ icon }: SocialIconProps) {
  switch (icon) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56c0 1.03-.77 1.84-1.9 1.84-1.1 0-1.88-.81-1.88-1.84 0-1.05.8-1.86 1.91-1.86 1.12 0 1.84.81 1.87 1.86Zm12.28 7.98c0-3.28-1.75-4.8-4.09-4.8-1.88 0-2.72 1.03-3.19 1.77V8.5H8.78c.04.92 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.69.13-.93.27-.69.89-1.4 1.93-1.4 1.36 0 1.9 1.05 1.9 2.58V20H19.5v-7.08Z" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.52 1.04 1.52 1.04.88 1.54 2.31 1.1 2.87.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.21 2.45.11 2.71.64.71 1.03 1.62 1.03 2.74 0 3.95-2.34 4.82-4.58 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'x':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M18.9 3H21l-4.59 5.25L21.8 21h-4.23l-3.3-7.62L7.59 21H5.48l5.02-5.74L2.2 3h4.33l2.98 6.93L18.9 3Zm-1.48 16.15h1.17L7.17 4.77H5.91l11.5 14.38Z" />
        </svg>
      )
    default:
      return null
  }
}
