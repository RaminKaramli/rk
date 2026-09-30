import { useLayoutEffect, useRef } from 'react'
import { useDocumentTheme } from '../../hooks/useDocumentTheme'
import { gsap } from '../../lib/gsap'
import './ScrollingTicker.scss'

const TICKER_TEXT =
  'FRONT-END DEVELOPER & WEB DESIGNER & FRONT-END DEVELOPER & WEB DESIGNER & FRONT-END DEVELOPER & WEB DESIGNER & FRONT-END DEVELOPER & WEB DESIGNER & FRONT-END DEVELOPER & WEB DESIGNER & FRONT-END DEVELOPER & WEB DESIGNER'

export default function ScrollingTicker() {
  const isDarkTheme = useDocumentTheme()
  const sectionRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const context = gsap.context(() => {
      gsap.fromTo(
        text,
        {
          x: 100,
        },
        {
          x: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      )
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="spacer flex justify-center items-center relative scrolling-ticker-section"
      data-theme={isDarkTheme ? 'dark' : 'light'}
      style={{
        width: '100%',
        minHeight: 0,
        height: 'auto',
        overflow: 'hidden',
        padding: '1.25rem 0',
        backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
      }}
    >
      <h1
        ref={textRef}
        id="scrollingText"
        className="scrolling-text text-[clamp(20px,10vw,72px)]"
        style={{
          whiteSpace: 'nowrap',
          display: 'inline-block',
          fontWeight: 900,
          fontFamily: '"DM Sans", sans-serif',
          color: isDarkTheme ? '#f3f6ff' : '#000000',
        }}
      >
        {TICKER_TEXT}
      </h1>
    </section>
  )
}
