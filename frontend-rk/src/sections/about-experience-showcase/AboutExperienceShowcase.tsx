import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, Draggable } from '../../lib/gsap'
import nsStudioLogo from '../../assets/images/publications/ns-studio-logo.png'
import skillHtml from '../../assets/images/publications/html-5-svgrepo-com.svg'
import skillScss from '../../assets/images/publications/scss2-svgrepo-com.svg'
import skillJs from '../../assets/images/publications/js-svgrepo-com.svg'
import skillFigma from '../../assets/images/publications/figma-svgrepo-com (1).svg'
import { useDocumentTheme } from '../../hooks/useDocumentTheme'
import { useLanguage } from '../../context/LanguageContext'

export default function AboutExperienceShowcase() {
  const { t } = useLanguage()
  const isDarkTheme = useDocumentTheme()
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const context = gsap.context(() => {
      const separatorLines = section.querySelectorAll<HTMLElement>('.experience-showcase__separator-line')
      const separatorPlus = section.querySelector<HTMLElement>('.experience-showcase__separator-plus')
      const heading = section.querySelector<HTMLElement>('.experience-showcase__heading')
      const content = section.querySelector<HTMLElement>('.experience-showcase__content')

      if (!heading || !content || separatorLines.length === 0 || !separatorPlus) {
        return
      }

      gsap.set(separatorLines, { scaleX: 0, transformOrigin: 'center center' })
      gsap.set(separatorPlus, { autoAlpha: 0, scale: 0.72, rotate: -90, transformOrigin: 'center center' })
      gsap.set(heading, { autoAlpha: 0 })
      gsap.set(content, { autoAlpha: 0 })

      const initDraggable = () => {
        const items = gsap.utils.toArray<HTMLElement>('.experience-showcase__tool')
        if (items.length < 2) return

        setTimeout(() => {
          const rowHeight = items[1].offsetTop - items[0].offsetTop

          type TrackedItem = HTMLElement & { startIndex: number; currentIndex: number }

          items.forEach((item, i) => {
            gsap.set(item, { position: 'relative' })
            const tracked = item as TrackedItem
            tracked.startIndex = i
            tracked.currentIndex = i
          })

          items.forEach((item, i) => {
            Draggable.create(item, {
              type: 'y',
              bounds: {
                minY: -i * rowHeight,
                maxY: (items.length - 1 - i) * rowHeight,
              },
              edgeResistance: 1,
              cursor: "url('https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68384fb014875f192dfcef4b_cursor-drag.svg') 12 0, auto",
              activeCursor: "url('https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68384fb13cff138fa04d162c_cursor-dragging.svg') 12 0, text",
              onDragStart: function () {
                this.target.style.zIndex = '10'
                this.target.classList.add('is-dragging')
                gsap.to(this.target, { scale: 1.02, duration: 0.2, overwrite: 'auto' })
              },
              onDrag: function () {
                const draggedItem = this.target as TrackedItem
                const startIndex = draggedItem.startIndex

                const currentTargetIndex = Math.round(this.y / rowHeight) + startIndex
                const newIndex = Math.max(0, Math.min(items.length - 1, currentTargetIndex))

                if (draggedItem.currentIndex !== newIndex) {
                  const oldIndex = draggedItem.currentIndex

                  const otherItem = items.find((el) => (el as TrackedItem).currentIndex === newIndex) as TrackedItem | undefined

                  if (otherItem) {
                    otherItem.currentIndex = oldIndex
                    const targetY = (otherItem.currentIndex - otherItem.startIndex) * rowHeight
                    gsap.to(otherItem, { y: targetY, duration: 0.35, ease: 'back.out(1.1)', overwrite: 'auto' })
                  }

                  draggedItem.currentIndex = newIndex
                }
              },
              onDragEnd: function () {
                this.target.style.zIndex = '1'
                this.target.classList.remove('is-dragging')
                const draggedItem = this.target as TrackedItem
                const targetY = (draggedItem.currentIndex - draggedItem.startIndex) * rowHeight
                gsap.to(draggedItem, { y: targetY, scale: 1, duration: 0.35, ease: 'back.out(1.1)', overwrite: 'auto' })
              },
            })
          })
        }, 50)
      }

      initDraggable()

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          once: true,
        },
      })

      tl.to(separatorLines, { scaleX: 1, duration: 0.2, ease: 'power2.out' })
        .to(separatorPlus, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.16, ease: 'back.out(1.5)' }, '-=0.1')
        .to(heading, { autoAlpha: 1, duration: 0.22, ease: 'power2.out', clearProps: 'opacity,visibility' }, '-=0.08')
        .to(content, { autoAlpha: 1, duration: 0.25, ease: 'power2.out', clearProps: 'opacity,visibility' }, '+=0.02')

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience-showcase"
      className="section experience-showcase"
      aria-labelledby="experience-showcase-title"
      style={{
        backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
        color: isDarkTheme ? '#f3f6ff' : '#181212',
      }}
    >
      <div className="centered">
        <header className="experience-showcase__header">
          <div className="experience-showcase__separator" aria-hidden="true">
            <div className="experience-showcase__separator-line" />
            <div className="experience-showcase__separator-plus">
              <span className="experience-showcase__separator-stroke" />
              <span className="experience-showcase__separator-stroke experience-showcase__separator-stroke--vertical" />
            </div>
            <div className="experience-showcase__separator-line" />
          </div>
        </header>

        <h2
          className="experience-showcase__heading shiny-hover"
          id="experience-showcase-title"
        >
          {t.experienceShowcase.heading}
        </h2>

        <div className="experience-showcase__content">
          <div className="experience-showcase__articles">
            <div className="experience-showcase__article">
              <div className="experience-showcase__article-top">
                <div className="experience-showcase__article-image experience-showcase__article-tilt">
                  <img src={nsStudioLogo} alt={t.experienceShowcase.company} className="experience-showcase__article-bg" />
                </div>
                <div className="experience-showcase__article-header">
                  <div className="experience-showcase__article-company-row">
                    <span className="experience-showcase__article-company">{t.experienceShowcase.company}</span>
                    <span className="experience-showcase__article-dot" aria-hidden="true">&bull;</span>
                    <span className="experience-showcase__article-badge">{t.experienceShowcase.badge}</span>
                  </div>
                  <h3 className="experience-showcase__article-title">{t.experienceShowcase.role}</h3>
                </div>
              </div>

              <p className="experience-showcase__article-caption">
                {t.experienceShowcase.caption}
              </p>

              <div className="experience-showcase__article-grid">
                <div className="experience-showcase__grid-item">
                  <div className="experience-showcase__grid-item-head">
                    <span className="experience-showcase__grid-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </span>
                    <span className="experience-showcase__grid-title">{t.experienceShowcase.grid.webInterfacesTitle}</span>
                  </div>
                  <p className="experience-showcase__grid-desc">
                    {t.experienceShowcase.grid.webInterfacesDesc}
                  </p>
                </div>

                <div className="experience-showcase__grid-item">
                  <div className="experience-showcase__grid-item-head">
                    <span className="experience-showcase__grid-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </span>
                    <span className="experience-showcase__grid-title">{t.experienceShowcase.grid.ecommerceTitle}</span>
                  </div>
                  <p className="experience-showcase__grid-desc">
                    {t.experienceShowcase.grid.ecommerceDesc}
                  </p>
                </div>

                <div className="experience-showcase__grid-item">
                  <div className="experience-showcase__grid-item-head">
                    <span className="experience-showcase__grid-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                    </span>
                    <span className="experience-showcase__grid-title">{t.experienceShowcase.grid.responsiveTitle}</span>
                  </div>
                  <p className="experience-showcase__grid-desc">
                    {t.experienceShowcase.grid.responsiveDesc}
                  </p>
                </div>

                <div className="experience-showcase__grid-item">
                  <div className="experience-showcase__grid-item-head">
                    <span className="experience-showcase__grid-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </span>
                    <span className="experience-showcase__grid-title">{t.experienceShowcase.grid.optimizationTitle}</span>
                  </div>
                  <p className="experience-showcase__grid-desc">
                    {t.experienceShowcase.grid.optimizationDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-showcase__tools">
            <article className="experience-showcase__tool">
              <img src={skillHtml} alt="HTML" className="experience-showcase__tool-logo" width="56" height="56" />
              <div className="experience-showcase__tool-details">
                <div className="experience-showcase__tool-title">
                  <span className="experience-showcase__tool-title-full">{t.experienceShowcase.tools.htmlTitle}</span>
                  <span className="experience-showcase__tool-title-short">{t.experienceShowcase.tools.htmlTitle}</span>
                </div>
                <div className="experience-showcase__tool-caption">
                  <span className="experience-showcase__tool-caption-full">{t.experienceShowcase.tools.htmlCaption}</span>
                  <span className="experience-showcase__tool-caption-short">{t.experienceShowcase.tools.htmlCaption}</span>
                </div>
              </div>
            </article>

            <article className="experience-showcase__tool">
              <img src={skillScss} alt="SCSS" className="experience-showcase__tool-logo" width="56" height="56" />
              <div className="experience-showcase__tool-details">
                <div className="experience-showcase__tool-title">
                  <span className="experience-showcase__tool-title-full">{t.experienceShowcase.tools.scssTitle}</span>
                  <span className="experience-showcase__tool-title-short">{t.experienceShowcase.tools.scssTitle}</span>
                </div>
                <div className="experience-showcase__tool-caption">
                  <span className="experience-showcase__tool-caption-full">{t.experienceShowcase.tools.scssCaption}</span>
                  <span className="experience-showcase__tool-caption-short">{t.experienceShowcase.tools.scssCaption}</span>
                </div>
              </div>
            </article>

            <article className="experience-showcase__tool">
              <img src={skillJs} alt="JavaScript" className="experience-showcase__tool-logo" width="56" height="56" />
              <div className="experience-showcase__tool-details">
                <div className="experience-showcase__tool-title">
                  <span className="experience-showcase__tool-title-full">{t.experienceShowcase.tools.jsTitle}</span>
                  <span className="experience-showcase__tool-title-short">{t.experienceShowcase.tools.jsTitle}</span>
                </div>
                <div className="experience-showcase__tool-caption">
                  <span className="experience-showcase__tool-caption-full">{t.experienceShowcase.tools.jsCaption}</span>
                  <span className="experience-showcase__tool-caption-short">{t.experienceShowcase.tools.jsCaption}</span>
                </div>
              </div>
            </article>

            <article className="experience-showcase__tool">
              <img src={skillFigma} alt="Figma" className="experience-showcase__tool-logo" width="56" height="56" />
              <div className="experience-showcase__tool-details">
                <div className="experience-showcase__tool-title">
                  <span className="experience-showcase__tool-title-full">{t.experienceShowcase.tools.figmaTitle}</span>
                  <span className="experience-showcase__tool-title-short">{t.experienceShowcase.tools.figmaTitle}</span>
                </div>
                <div className="experience-showcase__tool-caption">
                  <span className="experience-showcase__tool-caption-full">{t.experienceShowcase.tools.figmaCaption}</span>
                  <span className="experience-showcase__tool-caption-short">{t.experienceShowcase.tools.figmaCaption}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
