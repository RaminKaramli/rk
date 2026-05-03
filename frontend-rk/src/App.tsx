import { useEffect } from 'react'
import Lenis from 'lenis'
import AppRouter from './router/AppRouter'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    })

    window.__lenis = lenis

    lenis.on('scroll', (e) => {
      console.log(e)
    })

    return () => {
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return <AppRouter />
}
