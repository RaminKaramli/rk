/// <reference types="vite/client" />

export {}

declare global {
  type ScribbleTransitionOptions = {
    onCover?: () => void
    trigger?: HTMLElement
    durationIn?: number
    durationOut?: number
  }

  interface Window {
    __runScribbleTransition?: (options?: ScribbleTransitionOptions) => Promise<void>
    lenis?: import('lenis').default
  }
}
