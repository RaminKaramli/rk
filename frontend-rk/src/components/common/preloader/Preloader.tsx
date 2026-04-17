import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../../lib/gsap'
import '../../preloader/Preloader.scss'

type PreloaderProps = {
  visible: boolean
}

export default function Preloader({ visible }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineFillRef = useRef<HTMLDivElement>(null)
  const word1Ref = useRef<HTMLSpanElement>(null)
  const word2Ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (!visible) return

    const preloaderEl = preloaderRef.current
    const contentEl = contentRef.current
    const titleEl = titleRef.current
    const lineEl = lineRef.current
    const lineFillEl = lineFillRef.current
    const word1El = word1Ref.current
    const word2El = word2Ref.current

    if (!preloaderEl || !contentEl || !titleEl || !lineEl || !lineFillEl || !word1El || !word2El) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(preloaderEl, { autoAlpha: 1 })
      gsap.set(contentEl, { autoAlpha: 1 })
      gsap.set(titleEl, {
        autoAlpha: 1,
        scale: 0.18,
        transformOrigin: 'center center',
      })
      gsap.set(lineEl, { autoAlpha: 1 })
      gsap.set(lineFillEl, {
        scaleX: 0,
        transformOrigin: 'left center',
      })
      gsap.set(word1El, {
        x: -56,
        autoAlpha: 1,
        transformOrigin: 'center center',
      })
      gsap.set(word2El, {
        x: 56,
        autoAlpha: 1,
        transformOrigin: 'center center',
      })

      gsap.timeline()
        .to(word1El, {
          x: 0,
          duration: 1.05,
          ease: 'power2.inOut',
        }, 0)
        .to(word2El, {
          x: 0,
          duration: 1.05,
          ease: 'power2.inOut',
        }, 0)
        .to(lineFillEl, {
          scaleX: 1,
          duration: 2.7,
          ease: 'none',
        }, 0.12)
        .to(titleEl, {
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
        }, 1.32)
        .to({}, { duration: 0.6 })
        .to(preloaderEl, {
          autoAlpha: 0,
          duration: 0.42,
          ease: 'power2.out',
        })
    }, preloaderEl)

    return () => {
      context.revert()
    }
  }, [visible])

  if (!visible) {
    return null
  }

  return (
    <div ref={preloaderRef} className="preloader" aria-hidden="true">
      <div ref={contentRef} className="preloader__content">
        <h1 ref={titleRef} className="preloader__title">
          <span ref={word1Ref} className="word word1">RAMIN</span>{' '}
          <span ref={word2Ref} className="word word2">KARAMLI</span>
        </h1>
        <div ref={lineRef} className="preloader__line" aria-hidden="true">
          <div ref={lineFillRef} className="preloader__line-fill" />
        </div>
      </div>
    </div>
  )
}
