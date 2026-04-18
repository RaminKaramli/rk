import { useLayoutEffect, useRef } from 'react'
import { aboutLoopGalleryColumns } from '../../data/aboutLoopGallery'
import { ScrollTrigger, gsap } from '../../lib/gsap'

export default function AboutLoopGallery() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    let cleanup: (() => void) | undefined

    const context = gsap.context(() => {
      const columns = Array.from(section.querySelectorAll<HTMLElement>('.about-loop-gallery__col'))
      const tracks = Array.from(section.querySelectorAll<HTMLElement>('.about-loop-gallery__track'))

      if (tracks.length === 0) {
        return
      }

      const animations: Array<ReturnType<typeof gsap.to>> = []
      const triggers: ScrollTrigger[] = []

      const destroyScene = () => {
        animations.forEach((animation) => animation.kill())
        triggers.forEach((trigger) => trigger.kill())
        animations.length = 0
        triggers.length = 0
      }

      const setupScene = () => {
        destroyScene()

        tracks.forEach((track, index) => {
          if (!columns[index]) {
            return
          }

          const cycleDistance = track.scrollHeight / 2
          if (cycleDistance <= 0) {
            gsap.set(track, { y: 0 })
            return
          }

          const movesDown = index % 2 !== 0
          const startY = movesDown ? -cycleDistance : 0
          const endY = movesDown ? 0 : -cycleDistance

          gsap.set(track, { y: startY })

          const animation = gsap.to(track, {
            y: endY,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 2.8,
              invalidateOnRefresh: true,
            },
          })

          animations.push(animation)
          if (animation.scrollTrigger) {
            triggers.push(animation.scrollTrigger)
          }
        })
      }

      setupScene()

      const resizeObserver = new ResizeObserver(() => {
        setupScene()
        ScrollTrigger.refresh()
      })

      columns.forEach((column) => resizeObserver.observe(column))
      tracks.forEach((track) => resizeObserver.observe(track))

      cleanup = () => {
        resizeObserver.disconnect()
        destroyScene()
      }
    }, section)

    return () => {
      cleanup?.()
      context.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="about-loop-gallery" aria-label="A$AP Rocky gallery">
      <div className="about-loop-gallery__viewport">
        <div className="about-loop-gallery__gallery">
          {aboutLoopGalleryColumns.map((column, columnIndex) => (
            <div className="about-loop-gallery__col" key={`column-${columnIndex + 1}`}>
              <div className="about-loop-gallery__track">
                {[...column, ...column].map((item, itemIndex) => {
                  const isClone = itemIndex >= column.length

                  return (
                    <div className="about-loop-gallery__item" aria-hidden={isClone} key={`${item.id}-${itemIndex}`}>
                      <img src={item.src} alt={isClone ? '' : item.alt} loading="lazy" decoding="async" />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
