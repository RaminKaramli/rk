import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
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
      const heading = section.querySelector<HTMLElement>('.experience-showcase__heading')
      const articles = section.querySelector<HTMLElement>('.experience-showcase__articles')
      const tools = section.querySelector<HTMLElement>('.experience-showcase__tools')

      if (!heading || !articles || !tools) {
        return
      }

      gsap.set([heading, articles, tools], { autoAlpha: 0, y: 14 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        })
        .to(heading, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .to(articles, { autoAlpha: 1, y: 0, duration: 0.58, ease: 'power2.out' }, '-=0.24')
        .to(tools, { autoAlpha: 1, y: 0, duration: 0.58, ease: 'power2.out' }, '-=0.42')
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
