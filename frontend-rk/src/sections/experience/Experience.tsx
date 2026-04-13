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
      mm.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="stack-cards-section">
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
