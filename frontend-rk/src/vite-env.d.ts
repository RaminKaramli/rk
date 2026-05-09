/// <reference types="vite/client" />

export {}

declare global {
  type ScribbleTransitionOptions = {
    onCover?: () => void
    trigger?: HTMLElement
  }

  interface Window {
    __runScribbleTransition?: (options?: ScribbleTransitionOptions) => Promise<void>
  }
}
