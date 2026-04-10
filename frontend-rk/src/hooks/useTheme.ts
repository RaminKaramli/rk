import { useEffect, useState } from 'react'

const STORAGE_KEY = 'rk-theme'

function readStoredTheme(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'dark'
  } catch {
    return false
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState(readStoredTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', isDark)
    document.body.classList.toggle('theme-dark', isDark)

    try {
      window.localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    } catch {
      // Ignore storage failures.
    }
  }, [isDark])

  return {
    isDark,
    toggleTheme: () => {
      setIsDark((current) => !current)
    },
  }
}
