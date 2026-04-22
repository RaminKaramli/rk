import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger, gsap } from '../../lib/gsap'
import { stackCards } from '../../data/projects'

export default function StackCardsShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const context = gsap.context(() => {
      const separatorLines = section.querySelectorAll<HTMLElement>('.stack-cards-section__separator-line')
      const separatorPlus = section.querySelector<HTMLElement>('.stack-cards-section__separator-plus')
      const panelContents = Array.from(section.querySelectorAll<HTMLElement>('.panel-content'))

      if (!panelContents.length || separatorLines.length === 0 || !separatorPlus) {
        return
      }

      gsap.set(separatorLines, { scaleX: 0, transformOrigin: 'center center' })
      gsap.set(separatorPlus, { autoAlpha: 0, scale: 0.72, rotate: -90, transformOrigin: 'center center' })
      gsap.set(panelContents, {
        autoAlpha: 0,
        y: 20,
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=120',
          once: true,
        },
      })
      .to(separatorLines, { scaleX: 1, duration: 0.62, ease: 'power2.out' })
      .to(separatorPlus, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.46, ease: 'back.out(1.5)' }, '-=0.34')
      .to(panelContents, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.2')
    }, section)

    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const panels = Array.from(section.querySelectorAll<HTMLElement>('.panel'))

      if (panels.length < 2) {
        return
      }

      const timelines = panels.slice(0, -1).map((panel) =>
        gsap
          .timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'bottom bottom',
              pin: true,
              pinSpacing: false,
              scrub: true,
              invalidateOnRefresh: true,
              onRefresh: () =>
                gsap.set(panel, {
                  transformOrigin: `center ${panel.offsetHeight - window.innerHeight / 2}px`,
                }),
            },
          })
          .fromTo(
            panel,
            {
              scale: 1,
              opacity: 1,
            },
            {
              scale: 0.72,
              opacity: 0.42,
              ease: 'none',
              duration: 1,
            },
          )
          .to(
            panel,
            {
              opacity: 0,
              ease: 'none',
              duration: 0.1,
            },
            '>-0.02',
          ),
      )

      ScrollTrigger.refresh()

      return () => {
        timelines.forEach((timeline) => {
          timeline.scrollTrigger?.kill(true)
          timeline.kill()
        })

        panels.forEach((panel) => {
          gsap.set(panel, { clearProps: 'all' })
        })
      }
    })

    return () => {
      context.revert()
      mm.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="stack-cards-section">
      <div className="stack-cards-section__header" aria-hidden="true">
        <div className="stack-cards-section__separator">
          <div className="stack-cards-section__separator-line" />
          <div className="stack-cards-section__separator-plus">
            <span className="stack-cards-section__separator-stroke" />
            <span className="stack-cards-section__separator-stroke stack-cards-section__separator-stroke--vertical" />
          </div>
          <div className="stack-cards-section__separator-line" />
        </div>
      </div>

      <div className="slides-wrapper">
        {stackCards.map((card) => (
          <section key={card.alt} className="panel">
            <div className="panel-content">
              <div className="panel-visual">
                <img src={card.image} alt={card.alt} />
              </div>

              <ul className="panel-tags" aria-label={`${card.alt} tags`}>
                {card.tags.map((tag) => (
                  <li key={`${card.alt}-${tag}`}>{tag}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
