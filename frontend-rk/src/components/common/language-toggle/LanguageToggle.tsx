import { useEffect, useState } from 'react'
import { useLanguage } from '../../../context/LanguageContext'
import type { Language } from '../../../types/i18n.types'
import './LanguageToggle.scss'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [activeLang, setActiveLang] = useState<Language>(language)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setActiveLang(language)
  }, [language])

  const handleLanguageChange = (target: Language) => {
    if (target === language || isTransitioning) return
    if (document.body.classList.contains('is-transitioning')) return

    setActiveLang(target)
    setIsTransitioning(true)

    const savedScrollY = window.lenis?.scroll ?? window.scrollY

    const runTransition = window.__runScribbleTransition

    if (runTransition) {
      void runTransition({
        durationIn: 0.8,
        durationOut: 1.0,
        onCover: () => {
          setLanguage(target)
          if (window.lenis) {
            window.lenis.scrollTo(savedScrollY, { immediate: true })
          } else {
            window.scrollTo({ top: savedScrollY, behavior: 'instant' })
          }
        },
      }).finally(() => {
        setIsTransitioning(false)
        if (window.lenis) {
          window.lenis.scrollTo(savedScrollY, { immediate: true })
        } else {
          window.scrollTo({ top: savedScrollY, behavior: 'instant' })
        }
      })
    } else {
      setLanguage(target)
      setIsTransitioning(false)
    }
  }

  return (
    <div
      className={`language-toggle language-toggle--floating${isTransitioning ? ' is-loading' : ''}`}
      role="group"
      aria-label="Language selection"
    >
      <div
        className={`language-toggle__glider ${activeLang === 'az' ? 'is-az' : 'is-en'}`}
        aria-hidden="true"
      />
      <button
        type="button"
        className={`language-toggle__btn ${activeLang === 'en' ? 'is-active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        disabled={isTransitioning}
        aria-label="Switch to English"
        aria-pressed={activeLang === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={`language-toggle__btn ${activeLang === 'az' ? 'is-active' : ''}`}
        onClick={() => handleLanguageChange('az')}
        disabled={isTransitioning}
        aria-label="Azərbaycan dilinə keç"
        aria-pressed={activeLang === 'az'}
      >
        AZ
      </button>
    </div>
  )
}

