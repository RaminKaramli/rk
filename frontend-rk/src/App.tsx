import TransitionScribble from './components/common/transition-scribble/TransitionScribble'
import { ThemeProvider } from './context/ThemeContext'
import AppRouter from './router/AppRouter'

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
      <TransitionScribble />
    </ThemeProvider>
  )
}
