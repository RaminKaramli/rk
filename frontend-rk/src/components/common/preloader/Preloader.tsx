import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../../lib/gsap'
import '../../preloader/Preloader.scss'

type PreloaderProps = {
  onComplete: () => void
  visible: boolean
}

export default function Preloader({ onComplete, visible }: PreloaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!visible) {
      return
    }

    const loaderEl = loaderRef.current
    const nameEl = nameRef.current
    const barEl = barRef.current
    const counterEl = counterRef.current

    if (!loaderEl || !nameEl || !barEl || !counterEl) {
      return
    }

    let finished = false

    const finishLoader = () => {
      if (finished) {
        return
      }

      finished = true
      onComplete()
    }

    const context = gsap.context(() => {
      const progressState = { value: 0 }

      gsap.set(loaderEl, { autoAlpha: 1, yPercent: 0 })
      gsap.set(nameEl, { autoAlpha: 0, y: 20 })
      gsap.set(barEl, { width: '0%' })
      counterEl.textContent = '000'

      gsap.to(nameEl, {
        autoAlpha: 1,
        delay: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        y: 0,
      })

      gsap
        .timeline()
        .to(progressState, {
          duration: 3.8,
          ease: 'power2.inOut',
          onUpdate: () => {
            const progress = Math.min(progressState.value, 100)
            barEl.style.width = `${progress}%`
            counterEl.textContent = String(Math.floor(progress)).padStart(3, '0')
          },
          value: 100,
        })
        .to({}, { duration: 0.45 })
        .to(loaderEl, {
          duration: 1.05,
          ease: 'power4.inOut',
          onComplete: finishLoader,
          yPercent: -100,
        })
    }, loaderEl)

    return () => {
      context.revert()
    }
  }, [onComplete, visible])

  if (!visible) {
    return null
  }

  return (
    <div ref={loaderRef} className="preloader" aria-hidden="true">
      <div ref={nameRef} className="loader-name">Ramin Karamli</div>
      <div className="loader-bar-wrap" aria-hidden="true">
        <div ref={barRef} className="loader-bar" />
      </div>
      <div ref={counterRef} className="loader-counter">000</div>
    </div>
  )
}
