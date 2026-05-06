import { useEffect, useLayoutEffect, useState } from 'react'

const PRELOADER_FALLBACK_MS = 6000
let hasShownInitialPreloader = false

function shouldShowPreloader() {
  if (hasShownInitialPreloader) {
    return false
  }

  hasShownInitialPreloader = true
  return true
}

export function usePreloader() {
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader)

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('is-preloading', showPreloader)
    document.documentElement.classList.toggle('skip-preloader', !showPreloader)
    document.body.classList.toggle('is-preloading', showPreloader)

    return () => {
      document.documentElement.classList.remove('is-preloading')
      document.body.classList.remove('is-preloading')
    }
  }, [showPreloader])

  useEffect(() => {
    if (!showPreloader) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setShowPreloader(false)
    }, PRELOADER_FALLBACK_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [showPreloader])

  return {
    dismissPreloader: () => setShowPreloader(false),
    showPreloader,
  }
}
