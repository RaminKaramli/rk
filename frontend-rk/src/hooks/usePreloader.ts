import { useEffect, useState } from 'react'

const STORAGE_KEY = 'rk-preloader-seen'

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
    document.documentElement.classList.toggle('skip-preloader', !showPreloader)
    document.body.classList.toggle('is-preloading', showPreloader)

    return () => {
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
    }, 3600)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [showPreloader])

  return showPreloader
}
