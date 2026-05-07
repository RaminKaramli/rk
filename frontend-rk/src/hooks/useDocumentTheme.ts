import { useEffect, useState } from 'react'

function readIsDarkTheme() {
  if (typeof document === 'undefined') {
    return false
  }

  return document.documentElement.classList.contains('theme-dark') || document.body.classList.contains('theme-dark')
}

export function useDocumentTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(readIsDarkTheme)

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkTheme(readIsDarkTheme())
    }

    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return isDarkTheme
}
