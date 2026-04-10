import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { aboutSkills } from '../data/site'

interface AccordionItemProps {
  skill: (typeof aboutSkills)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ skill, index, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)
  const tweenRef = useRef<gsap.core.Timeline | null>(null)
  const prevIsOpen = useRef<boolean | null>(null)

  const panelId = `about-skills-panel-${index + 1}`
  const triggerId = `about-skills-trigger-${index + 1}`

  useEffect(() => {
    const content = contentRef.current
    const icon = iconRef.current
    if (!content || !icon) return

    // First render: snap to initial state, no animation
    if (prevIsOpen.current === null) {
      prevIsOpen.current = isOpen
      gsap.set(content, { height: isOpen ? 'auto' : 0, overflow: 'hidden' })
      gsap.set(icon, { rotation: isOpen ? 45 : 0 })
      return
    }

    // No actual change
    if (isOpen === prevIsOpen.current) return
    prevIsOpen.current = isOpen

    // Kill any running tween
    tweenRef.current?.kill()

    const tl = gsap.timeline()

    if (isOpen) {
      // Measure actual content height first
      gsap.set(content, { height: 'auto', overflow: 'hidden' })
      const targetH = content.scrollHeight
      gsap.set(content, { height: 0 })

      tl.to(content, {
        height: targetH,
        duration: 0.72,
        ease: 'power3.out',
        onComplete: () => {
          // Allow height to be dynamic after open
          gsap.set(content, { height: 'auto' })
        },
      })
      tl.to(icon, { rotation: 45, duration: 0.6, ease: 'power2.out' }, 0)
    } else {
      tl.to(content, {
        height: 0,
        duration: 0.58,
        ease: 'power3.inOut',
        overflow: 'hidden',
      })
      tl.to(icon, { rotation: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
    }

    tweenRef.current = tl
  }, [isOpen])

  return (
    <article
      className={`about-skills-item${isOpen ? ' about-skills-item--open' : ''}`}
    >
      <div className="about-skills-item__index" aria-hidden="true">
        <span className="about-skills-item__number">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="about-skills-item__panel">
        <button
          className="about-skills-item__trigger"
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="about-skills-item__title">{skill.title}</span>
          <span className="about-skills-item__toggle" aria-hidden="true">
            <svg
              ref={iconRef}
              className="about-skills-item__icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M12 5V19" />
              <path d="M5 12H19" />
            </svg>
          </span>
        </button>

        <div
          ref={contentRef}
          className="about-skills-item__content"
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
        >
          <p className="about-skills-item__description">{skill.description}</p>
          <ul
            className="about-skills-item__tags"
            aria-label={`${skill.title} skills`}
          >
            {skill.tags.map((tag) => (
              <li
                key={`${skill.title}-${tag}`}
                className="about-skills-item__tag"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function AboutSkillsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="about-skills" aria-labelledby="about-skills-title">
      <div className="about-skills__inner">
        <div className="about-skills__header">
          <h2 className="about-skills__title" id="about-skills-title">
            What I Bring To The Table
          </h2>
          <p className="about-skills__description">
            Digital experiences that engage users and help your startup stand
            out from day one
          </p>
        </div>

        <div className="about-skills__list">
          {aboutSkills.map((skill, index) => (
            <AccordionItem
              key={skill.title}
              skill={skill}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
