import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import { ScrollTrigger, gsap } from '../lib/gsap'
import { stackCards } from '../data/site'

export default function StackCardsShowcase() {
  const listRef = useRef<HTMLUListElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    const section = sectionRef.current

    if (!list || !section) {
      return
    }

    let timeline: gsap.core.Timeline | null = null
    const cards = Array.from(list.querySelectorAll<HTMLElement>('.stack-card'))

    if (!cards.length) {
      return
    }

    const clearStackCards = () => {
      timeline?.scrollTrigger?.kill(true)
      timeline?.kill()
      timeline = null
      cards.forEach((card) => {
        gsap.set(card, { clearProps: 'all' })
      })
      gsap.set(list, { clearProps: 'all' })
    }

    const initStackCards = () => {
      clearStackCards()

      if (window.matchMedia('(max-width: 768px)').matches) {
        return
      }

      const revealOffset = 85 / 3
      const scaleStep = 0.015
      const stepDistance = window.innerHeight * 0.82

      gsap.set(list, {
        height: window.innerHeight,
      })

      cards.forEach((card, index) => {
        gsap.set(card, {
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          yPercent: -50,
          y: index === 0 ? 0 : window.innerHeight * 0.9,
          scale: 1,
          opacity: 1,
          zIndex: index + 1,
        })
      })

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: list,
          start: 'top top',
          end: `+=${stepDistance * (cards.length - 1)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, index) => {
        if (index === 0 || !timeline) {
          return
        }

        timeline
          .to(
            cards.slice(0, index),
            {
              y: (cardIndex) => -revealOffset * (index - cardIndex),
              scale: (cardIndex) => 1 - scaleStep * (index - cardIndex),
              ease: 'none',
              duration: 1,
            },
            index - 1,
          )
          .to(
            card,
            {
              y: 0,
              ease: 'none',
              duration: 1,
            },
            index - 1,
          )
      })

      ScrollTrigger.refresh()
    }

    initStackCards()
    window.addEventListener('resize', initStackCards)

    return () => {
      window.removeEventListener('resize', initStackCards)
      clearStackCards()
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="stack-cards-section">
      <ul ref={listRef} className="stack-cards-list">
        {stackCards.map((card, index) => (
          <li
            key={card.alt}
            className="stack-card"
            id={`stack-card-${index + 1}`}
            style={{ '--index': index + 1 } as CSSProperties}
          >
            <div className="stack-card-body">
              <article className="stack-card-showcase">
                <div className="stack-card-showcase-media">
                  <img src={card.image} alt={card.alt} />
                </div>

                <div className="stack-card-showcase-content">
                  <ul className="stack-card-showcase-tags">
                    {card.tags.map((tag) => (
                      <li key={`${card.alt}-${tag}`}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
