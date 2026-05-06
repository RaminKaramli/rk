/// <reference types="vite/client" />

import type Lenis from 'lenis'

declare global {
  type ScribbleTransitionOptions = {
    onCover?: () => void
    trigger?: HTMLElement
  }

  interface Window {
    __lenis?: Lenis
    __runScribbleTransition?: (options?: ScribbleTransitionOptions) => Promise<void>
  }
}
