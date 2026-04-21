import { useEffect, useState } from 'react'

const STORAGE_KEY = 'rk-preloader-seen'
const PRELOADER_FALLBACK_MS = 6000

function shouldShowPreloader() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== 'true'
  } catch {
    return false
  }
}

export function usePreloader() {
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader)

  useEffect(() => {
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

    try {
      window.sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // Ignore storage failures.
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
