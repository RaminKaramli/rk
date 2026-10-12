import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import TransitionScribble from './components/common/transition-scribble/TransitionScribble'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import AppRouter from './router/AppRouter'

export default function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    window.lenis = lenis

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppRouter />
        <TransitionScribble />
      </LanguageProvider>
    </ThemeProvider>
  )
}
