import { useEffect, useRef } from 'react'
import './Preloader.scss'

declare const gsap: any

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js'
    script.async = true

    script.onload = () => {
      const words = [
        { text: 'RAMIN', class: 'word1' },
        { text: 'KARAMLI', class: 'word2' }
      ]

      const word1El = document.querySelector('.word1')
      const word2El = document.querySelector('.word2')

      if (!word1El || !word2El) return

      words.forEach((word, idx) => {
        const el = idx === 0 ? word1El : word2El
        const letters = word.text.split('')
        el.textContent = ''
        letters.forEach(char => {
          const span = document.createElement('span')
          span.textContent = char
          span.style.display = 'inline-block'
          span.style.transform = 'translateY(100%)'
          el.appendChild(span)
        })
      })

      const tl = gsap.timeline()

      tl.to('.word1 span, .word2 span', {
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05
      })
      .to('.word1 span, .word2 span', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in',
        stagger: 0.05,
        delay: 0.5
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          preloaderRef.current?.style.setProperty('display', 'none')
        }
      })
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div ref={preloaderRef} className="preloader">
      <h1 className="heading">
        <span className="word word1"></span>
        <span className="word word2"></span>
      </h1>
    </div>
  )
}
