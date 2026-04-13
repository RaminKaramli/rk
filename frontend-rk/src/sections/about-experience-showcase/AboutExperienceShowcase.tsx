import { useLayoutEffect, useRef } from 'react'
import { gsap, Draggable } from '../../lib/gsap'
import nsStudioLogo from '../../assets/images/publications/ns-studio-logo.png'
import skillHtml from '../../assets/images/publications/html-5-svgrepo-com.svg'
import skillScss from '../../assets/images/publications/scss2-svgrepo-com.svg'
import skillJs from '../../assets/images/publications/js-svgrepo-com.svg'
import skillFigma from '../../assets/images/publications/figma-svgrepo-com (1).svg'

export default function AboutExperienceShowcase() {
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
      const articles = section.querySelector<HTMLElement>('.experience-showcase__articles')
      const tools = section.querySelector<HTMLElement>('.experience-showcase__tools')

      if (!heading || !articles || !tools || separatorLines.length === 0 || !separatorPlus) {
        return
      }

      gsap.set(separatorLines, { scaleX: 0, transformOrigin: 'center center' })
      gsap.set(separatorPlus, { autoAlpha: 0, scale: 0.72, rotate: -90, transformOrigin: 'center center' })
      gsap.set([heading, articles, tools], { autoAlpha: 0, y: 14 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        })
        .to(separatorLines, { scaleX: 1, duration: 0.62, ease: 'power2.out' })
        .to(separatorPlus, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.46, ease: 'back.out(1.5)' }, '-=0.34')
        .to(heading, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.24')
        .to(articles, { autoAlpha: 1, y: 0, duration: 0.58, ease: 'power2.out' }, '-=0.24')
        .to(tools, { autoAlpha: 1, y: 0, duration: 0.58, ease: 'power2.out' }, '-=0.42')
        .add(() => {
          const items = gsap.utils.toArray<HTMLElement>('.experience-showcase__tool')
          if (items.length < 2) return

          // Wait a tiny bit for layout to ensure offsetTop is accurate
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
                  // Optional subtle scale when dragging
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
          className="experience-showcase__heading shiny-hover reveal-scroll reveal-scroll--visible"
          id="experience-showcase-title"
        >
          Experience
        </h2>

        <div className="experience-showcase__content">
          <div className="experience-showcase__articles reveal-scroll reveal-scroll--visible">
            <a
              href="https://medium.com/design-bootcamp/perception-based-color-palettes-for-customizable-ui-themes-33f596faf23d"
              target="_blank"
              rel="noopener"
              className="experience-showcase__article"
            >
              <div className="experience-showcase__article-image experience-showcase__article-tilt">
                <img src={nsStudioLogo} alt="" className="experience-showcase__article-bg" />
              </div>
              <div className="experience-showcase__article-details">
                <h3 className="experience-showcase__article-title">Junior Front-End Developer</h3>
                <p className="experience-showcase__article-caption">
                  Developed modern and responsive web interfaces and improved practical front-end skills over a 2-month learning experience.
                </p>
              </div>
            </a>
          </div>

          <div className="experience-showcase__tools reveal-scroll reveal-scroll--visible">
            <article className="experience-showcase__tool">
              <img src={skillHtml} alt="HTML" className="experience-showcase__tool-logo" width="56" height="56" />
              <div className="experience-showcase__tool-details">
                <div className="experience-showcase__tool-title">
                  <span className="experience-showcase__tool-title-full">HTML &middot; Structure</span>
                  <span className="experience-showcase__tool-title-short">HTML &middot; Structure</span>
                </div>
                <div className="experience-showcase__tool-caption">
                  <span className="experience-showcase__tool-caption-full">Created clean and semantic page structure.</span>
                  <span className="experience-showcase__tool-caption-short">Created clean and semantic page structure.</span>
                </div>
              </div>
            </article>

            <article className="experience-showcase__tool">
              <img src={skillScss} alt="SCSS" className="experience-showcase__tool-logo" width="56" height="56" />
              <div className="experience-showcase__tool-details">
                <div className="experience-showcase__tool-title">
                  <span className="experience-showcase__tool-title-full">SCSS &middot; Styling</span>
                  <span className="experience-showcase__tool-title-short">SCSS &middot; Styling</span>
                </div>
                <div className="experience-showcase__tool-caption">
                  <span className="experience-showcase__tool-caption-full">Built responsive and polished visual layouts.</span>
                  <span className="experience-showcase__tool-caption-short">Built responsive and polished visual layouts.</span>
                </div>
              </div>
            </article>

            <article className="experience-showcase__tool">
              <img src={skillJs} alt="JavaScript" className="experience-showcase__tool-logo" width="56" height="56" />
              <div className="experience-showcase__tool-details">
                <div className="experience-showcase__tool-title">
                  <span className="experience-showcase__tool-title-full">JavaScript &middot; Functionality</span>
                  <span className="experience-showcase__tool-title-short">JavaScript &middot; Functionality</span>
                </div>
                <div className="experience-showcase__tool-caption">
                  <span className="experience-showcase__tool-caption-full">Added interactive and dynamic user experience.</span>
                  <span className="experience-showcase__tool-caption-short">Added interactive and dynamic user experience.</span>
                </div>
              </div>
            </article>

            <article className="experience-showcase__tool">
              <img src={skillFigma} alt="Figma" className="experience-showcase__tool-logo" width="56" height="56" />
              <div className="experience-showcase__tool-details">
                <div className="experience-showcase__tool-title">
                  <span className="experience-showcase__tool-title-full">Figma &middot; Design</span>
                  <span className="experience-showcase__tool-title-short">Figma &middot; Design</span>
                </div>
                <div className="experience-showcase__tool-caption">
                  <span className="experience-showcase__tool-caption-full">Designed modern and user-friendly interfaces.</span>
                  <span className="experience-showcase__tool-caption-short">Designed modern and user-friendly interfaces.</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
