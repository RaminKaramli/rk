import { useLayoutEffect, useRef } from 'react'
import { aboutLoopGalleryColumns } from '../../data/aboutLoopGallery'
import { gsap } from '../../lib/gsap'

type LoopController = {
  animation: ReturnType<typeof gsap.to>
}

export default function AboutLoopGallery() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    let cleanup: (() => void) | undefined

    const context = gsap.context(() => {
      const tracks = Array.from(section.querySelectorAll<HTMLElement>('.about-loop-gallery__track'))

      if (tracks.length === 0) {
        return
      }

      const controllers: LoopController[] = []

      const destroyScene = () => {
        controllers.forEach((controller) => {
          gsap.killTweensOf(controller.animation)
          controller.animation.kill()
        })
        controllers.length = 0
      }

      const setupScene = () => {
        destroyScene()

        tracks.forEach((track, index) => {
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
            duration: 20 + index * 1.5,
            repeat: -1,
            ease: 'none',
          })

          controllers.push({ animation })
        })
      }

      setupScene()

      const resizeObserver = new ResizeObserver(() => {
        setupScene()
      })

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
