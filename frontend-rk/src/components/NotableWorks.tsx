import { useLayoutEffect, useRef, useState } from 'react'
import { notableStats, type NotableStatConfig } from '../data/site'
import { ScrollTrigger, gsap } from '../lib/gsap'

type ResolvedStat = {
  label: string
  minDigits: number
  target: number
}

function formatStatValue(value: number, minDigits: number) {
  return String(value).padStart(minDigits, '0')
}

function parseIsoLocalDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function getElapsedMonthsSince(startDate: Date, nowDate = new Date()) {
  let months = (nowDate.getFullYear() - startDate.getFullYear()) * 12 + (nowDate.getMonth() - startDate.getMonth())

  if (nowDate.getDate() < startDate.getDate()) {
    months -= 1
  }

  return Math.max(0, months)
}

function resolveNotableStat(config: NotableStatConfig): ResolvedStat {
  if (config.kind === 'static') {
    return {
      label: config.label,
      minDigits: config.minDigits,
      target: config.target,
    }
  }

  const elapsedMonths = getElapsedMonthsSince(parseIsoLocalDate(config.startDate))

  if (elapsedMonths >= 12) {
    return {
      label: config.yearLabel,
      minDigits: config.yearMinDigits,
      target: Math.floor(elapsedMonths / 12),
    }
  }

  return {
    label: config.monthLabel,
    minDigits: config.monthMinDigits,
    target: elapsedMonths,
  }
}

export default function NotableWorks() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const statsRef = useRef<ResolvedStat[]>([])

  if (!statsRef.current.length) {
    statsRef.current = notableStats.map(resolveNotableStat)
  }

  const resolvedStats = statsRef.current
  const [displayValues, setDisplayValues] = useState(() =>
    resolvedStats.map((stat) => formatStatValue(0, stat.minDigits)),
  )

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const statCards = Array.from(section.querySelectorAll<HTMLElement>('.notable-stat'))
    const intro = section.querySelector<HTMLElement>('.notable-works-intro')

    const context = gsap.context(() => {
      gsap.set([intro, ...statCards], { autoAlpha: 0 })

      const counters = resolvedStats.map(() => ({ value: 0 }))

      ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        once: true,
        onEnter: () => {
          gsap.to(intro, {
            autoAlpha: 1,
            duration: 0.4,
            ease: 'power2.out',
          })

          gsap.to(statCards, {
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.12,
            ease: 'power2.out',
          })

          resolvedStats.forEach((stat, index) => {
            gsap.to(counters[index], {
              value: stat.target,
              duration: 1.8,
              delay: 0.12 + index * 0.08,
              ease: 'power3.out',
              onUpdate: () => {
                const nextValue = formatStatValue(
                  Math.round(counters[index].value),
                  stat.minDigits,
                )

                setDisplayValues((previous) => {
                  if (previous[index] === nextValue) {
                    return previous
                  }

                  const next = [...previous]
                  next[index] = nextValue
                  return next
                })
              },
            })
          })
        },
      })
    }, section)

    return () => {
      context.revert()
    }
  }, [resolvedStats])

  return (
    <section id="notable-works" className="notable-works-section" ref={sectionRef}>
      <div className="notable-works-inner">
        <div className="notable-works-intro">
          <h2 className="notable-works-title">NOTABLE WORKS</h2>
          <button className="notable-works-cta" type="button" aria-label="Work link">
            WORK? <span aria-hidden="true">●</span>
          </button>
        </div>

        <div className="notable-works-stats" aria-label="Professional statistics">
          {resolvedStats.map((stat, index) => (
            <article key={`${stat.label}-${index}`} className="notable-stat">
              <p className="notable-stat__value">{displayValues[index]}</p>
              <p className="notable-stat__label">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
