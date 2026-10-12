import { useLanguage } from '../../../context/LanguageContext'
import './LanguageToggle.scss'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="language-toggle language-toggle--floating"
      role="group"
      aria-label="Language selection"
    >
      <div
        className={`language-toggle__glider ${language === 'az' ? 'is-az' : 'is-en'}`}
        aria-hidden="true"
      />
      <button
        type="button"
        className={`language-toggle__btn ${language === 'en' ? 'is-active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={`language-toggle__btn ${language === 'az' ? 'is-active' : ''}`}
        onClick={() => setLanguage('az')}
        aria-label="Azərbaycan dilinə keç"
        aria-pressed={language === 'az'}
      >
        AZ
      </button>
    </div>
  )
}

