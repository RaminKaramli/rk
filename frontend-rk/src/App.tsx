import ControlPill from './components/common/control-pill/ControlPill'
import TransitionScribble from './components/common/transition-scribble/TransitionScribble'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import AppRouter from './router/AppRouter'

export default function App() {

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppRouter />
        <TransitionScribble />
        <ControlPill />
      </LanguageProvider>
    </ThemeProvider>
  )
}
