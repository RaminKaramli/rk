import { useLayoutEffect, useRef } from 'react'
import { aboutExperienceEntries, aboutExperienceIntro } from '../../data/experience'
import { gsap } from '../../lib/gsap'
import { useDocumentTheme } from '../../hooks/useDocumentTheme'

export default function AboutExperience() {
  const isDarkTheme = useDocumentTheme()
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const context = gsap.context(() => {
      const separatorLines = section.querySelectorAll<HTMLElement>('.about-experience__separator-line')
      const separatorPlus = section.querySelector<HTMLElement>('.about-experience__separator-plus')

      if (separatorLines.length === 0 || !separatorPlus) {
        return
      }

      gsap.set(separatorLines, { scaleX: 0, transformOrigin: 'center center' })
      gsap.set(separatorPlus, { autoAlpha: 0, scale: 0.72, rotate: -90, transformOrigin: 'center center' })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        })
        .to(separatorLines, { scaleX: 1, duration: 0.62, ease: 'power2.out' })
        .to(separatorPlus, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.46, ease: 'back.out(1.5)' }, '-=0.34')
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="about-experience"
      aria-labelledby="about-experience-title"
      style={{
        backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
        color: isDarkTheme ? '#f4f6ff' : '#0f1117',
      }}
    >
      <div className="about-experience__inner">
        <header className="about-experience__header">
          <div className="about-experience__separator" aria-hidden="true">
            <div className="about-experience__separator-line" />
            <div className="about-experience__separator-plus">
              <span className="about-experience__separator-stroke" />
              <span className="about-experience__separator-stroke about-experience__separator-stroke--vertical" />
            </div>
            <div className="about-experience__separator-line" />
          </div>
        </header>

        <div className="about-experience__intro">
          <h2 className="about-experience__title" id="about-experience-title">
            {aboutExperienceIntro.title}
          </h2>
          <p className="about-experience__description">{aboutExperienceIntro.description}</p>
        </div>

        <ul className="about-experience__list" aria-label="Experience timeline">
          {aboutExperienceEntries.map((entry) => (
            <li className="about-experience__item" key={`${entry.company}-${entry.period}`}>
              <article className="about-experience__card">
                <h3 className="about-experience__company">{entry.company}</h3>

                <div className="about-experience__row">
                  <p className="about-experience__role">{entry.role}</p>
                  <span className="about-experience__period">{entry.period}</span>
                </div>

                <p className="about-experience__card-description">{entry.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
