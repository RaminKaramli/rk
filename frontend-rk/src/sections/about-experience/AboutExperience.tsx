import { useLayoutEffect, useRef } from 'react'
import { aboutExperienceEntries, aboutExperienceIntro } from '../../data/experience'
import { gsap } from '../../lib/gsap'

export default function AboutExperience() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const context = gsap.context(() => {
      const separatorLine = section.querySelector<HTMLElement>('.about-experience__separator-line')
      const separatorPlus = section.querySelector<HTMLElement>('.about-experience__separator-plus')
      const title = section.querySelector<HTMLElement>('.about-experience__title')
      const description = section.querySelector<HTMLElement>('.about-experience__description')
      const items = Array.from(section.querySelectorAll<HTMLElement>('.about-experience__item'))

      if (!separatorLine || !separatorPlus || !title || !description) {
        return
      }

      gsap.set(separatorLine, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(separatorPlus, { autoAlpha: 0, scale: 0.72, rotate: -90, transformOrigin: 'center center' })
      gsap.set([title, description], { autoAlpha: 0, y: 18 })
      gsap.set(items, { autoAlpha: 0, y: 22 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        })
        .to(separatorLine, { scaleX: 1, duration: 0.62, ease: 'power2.out' })
        .to(separatorPlus, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.46, ease: 'back.out(1.5)' }, '-=0.34')
        .to(title, { autoAlpha: 1, y: 0, duration: 0.52, ease: 'power2.out' }, '-=0.24')
        .to(description, { autoAlpha: 1, y: 0, duration: 0.52, ease: 'power2.out' }, '-=0.36')
        .to(items, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.28')
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="about-experience" aria-labelledby="about-experience-title">
      <div className="about-experience__inner">
        <header className="about-experience__header">
          <div className="about-experience__separator" aria-hidden="true">
            <div className="about-experience__separator-line" />
            <div className="about-experience__separator-plus">
              <span className="about-experience__separator-stroke" />
              <span className="about-experience__separator-stroke about-experience__separator-stroke--vertical" />
            </div>
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
