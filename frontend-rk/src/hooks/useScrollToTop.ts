import { useEffect } from 'react'

export function useScrollToTop(trigger: string) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [trigger])
}
