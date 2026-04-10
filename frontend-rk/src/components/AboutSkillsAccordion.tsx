import { useRef, useLayoutEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { aboutSkills } from '../data/site'

export default function AboutSkillsAccordion() {
  // Index 0 (01) is open by default, others closed
  const openStates = useRef<boolean[]>(aboutSkills.map((_, i) => i === 0))
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs = useRef<(SVGSVGElement | null)[]>([])
  const articleRefs = useRef<(HTMLElement | null)[]>([])

  // Initialize: 01 open, rest closed
  useLayoutEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === 0) {
        gsap.set(el, { height: 'auto', overflow: 'hidden' })
      } else {
        gsap.set(el, { height: 0, overflow: 'hidden' })
      }
    })
    iconRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { rotation: i === 0 ? 45 : 0 })
    })
    articleRefs.current[0]?.classList.add('about-skills-item--open')
  }, [])

  const handleToggle = useCallback((index: number) => {
    const isCurrentlyOpen = openStates.current[index]
    const content = contentRefs.current[index]
    const icon = iconRefs.current[index]
    const article = articleRefs.current[index]
    if (!content || !icon || !article) return

    gsap.killTweensOf(content)
    gsap.killTweensOf(icon)

    if (isCurrentlyOpen) {
      // Close
      const h = content.getBoundingClientRect().height
      gsap.set(content, { height: h, overflow: 'hidden' })
      gsap.to(content, { height: 0, duration: 0.85, ease: 'power3.inOut' })
      gsap.to(icon, { rotation: 0, duration: 0.75, ease: 'power2.inOut' })
      article.classList.remove('about-skills-item--open')
      openStates.current[index] = false
    } else {
      // Open
      gsap.set(content, { height: 'auto', overflow: 'hidden' })
      const targetH = content.scrollHeight
      gsap.set(content, { height: 0 })
      gsap.to(content, { height: targetH, duration: 1.1, ease: 'power3.out', overflow: 'hidden' })
      gsap.to(icon, { rotation: 45, duration: 0.9, ease: 'power2.out' })
      article.classList.add('about-skills-item--open')
      openStates.current[index] = true
    }
  }, [])

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
          {aboutSkills.map((skill, index) => {
            const panelId = `about-skills-panel-${index + 1}`
            const triggerId = `about-skills-trigger-${index + 1}`

            return (
              <article
                key={skill.title}
                ref={(el) => { articleRefs.current[index] = el }}
                id={`about-skills-item-${index + 1}`}
                className="about-skills-item"
              >
                <div className="about-skills-item__index" aria-hidden="true">
                  <span className="about-skills-item__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div 
                  className="about-skills-item__panel"
                  onClick={() => handleToggle(index)}
                >
                  <button
                    className="about-skills-item__trigger"
                    type="button"
                    id={triggerId}
                    aria-expanded={false}
                    aria-controls={panelId}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent double trigger
                      handleToggle(index);
                    }}
                    style={{ position: 'relative', zIndex: 30 }}
                  >
                    <span className="about-skills-item__title">{skill.title}</span>
                    <span className="about-skills-item__toggle" aria-hidden="true">
                      <svg
                        ref={(el) => { iconRefs.current[index] = el }}
                        className="about-skills-item__icon"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <div
                    ref={(el) => { contentRefs.current[index] = el }}
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
          })}
        </div>
      </div>
    </section>
  )
}
