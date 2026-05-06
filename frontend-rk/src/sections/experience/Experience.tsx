import { useLayoutEffect, useRef, type SVGProps } from 'react'
import { Icon } from '@iconify/react'
import { stackCards } from '../../data/projects'
import { Draggable, ScrollTrigger, gsap } from '../../lib/gsap'

const showcasedProjects = [
  {
    cards: stackCards,
    description:
      'Website designed to showcase a boutique furniture brand’s collection, highlight product features, and drive online purchases.',
    href: 'https://ikili2.com/',
    title: 'Furniture Website',
  },
  {
    cards: [...stackCards].reverse(),
    description:
      'Website designed to present a modern digital brand, communicate services clearly, and create a polished browsing experience.',
    href: 'https://ikili2.com/',
    title: 'Digital Studio Website',
  },
  {
    cards: stackCards.slice(0, 2),
    description:
      'Website designed with a focused two-screen showcase, clear visual hierarchy, and responsive presentation for a compact brand experience.',
    href: 'https://ikili2.com/',
    title: 'Compact Brand Website',
  },
  {
    cards: stackCards.slice(2, 4),
    description:
      'Website designed to highlight selected work through a concise two-panel layout, sharp visuals, and smooth interaction details.',
    href: 'https://ikili2.com/',
    title: 'Selected Work Website',
  },
]

function FlowbiteHtmlSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path
        fill="#e65100"
        d="m3 2l1.578 17.824L12 22l7.467-2.175L21 2zm14.049 6.048H9.075l.172 2.016h7.697l-.626 6.565l-4.246 1.381l-4.281-1.455l-.288-2.932h2.024l.16 1.411l2.4.815l2.346-.763l.297-3.005H7.416l-.562-6.05h10.412z"
      />
    </svg>
  )
}

function VscodeIconsFileTypeScss2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" {...props}>
      <path fill="#c69" fillRule="evenodd" d="M16 2A14 14 0 1 1 2 16A14 14 0 0 1 16 2" />
      <path
        fill="#fff"
        d="M24.782 7.992c-.634-2.486-4.757-3.3-8.659-1.918a19.6 19.6 0 0 0-6.644 3.811c-2.149 2.01-2.492 3.76-2.351 4.491c.5 2.58 4.033 4.266 5.486 5.517v.007c-.428.211-3.564 1.8-4.3 3.42c-.774 1.712.123 2.94.718 3.105A4.4 4.4 0 0 0 13.78 24.5a4.82 4.82 0 0 0 .472-4.288a5.6 5.6 0 0 1 2.143-.123c2.456.287 2.938 1.82 2.846 2.462a1.62 1.62 0 0 1-.779 1.1c-.172.107-.225.143-.21.223c.021.115.1.111.247.086a1.915 1.915 0 0 0 1.336-1.707c.059-1.5-1.382-3.186-3.934-3.143a6.7 6.7 0 0 0-2.189.3l-.108-.12c-1.578-1.683-4.494-2.874-4.371-5.137c.045-.823.331-2.989 5.6-5.617c4.32-2.153 7.778-1.56 8.376-.247c.854 1.876-1.848 5.361-6.334 5.864a3.37 3.37 0 0 1-2.833-.718c-.236-.26-.271-.271-.359-.223c-.143.079-.052.309 0 .445a2.66 2.66 0 0 0 1.621 1.274a8.6 8.6 0 0 0 5.258-.52c2.721-1.049 4.843-3.974 4.22-6.419M13.218 20.663a3.6 3.6 0 0 1-.029 2.092q-.035.106-.077.21t-.091.2a4 4 0 0 1-.647.943c-.813.887-1.95 1.223-2.437.94c-.526-.305-.263-1.556.68-2.553a9.5 9.5 0 0 1 2.474-1.762Z"
      />
    </svg>
  )
}

function FlowbiteCssSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path
        fill="#0277bd"
        d="m3 2l1.578 17.834L12 22l7.468-2.165L21 2zm13.3 14.722l-4.293 1.204H12l-4.297-1.204l-.297-3.167h2.108l.15 1.526l2.335.639l2.34-.64l.245-3.05h-7.27l-.187-2.006h7.64l.174-2.006H6.924l-.176-2.006h10.506z"
      />
    </svg>
  )
}

function VscodeIconsFileTypeJsOfficial(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" {...props}>
      <path fill="#f5de19" d="M2 2h28v28H2z" />
      <path d="M20.809 23.875a2.87 2.87 0 0 0 2.6 1.6c1.09 0 1.787-.545 1.787-1.3c0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964c0-1.973 1.5-3.476 3.853-3.476a3.89 3.89 0 0 1 3.742 2.107L25 18.128A1.79 1.79 0 0 0 23.311 17a1.145 1.145 0 0 0-1.259 1.128c0 .789.489 1.109 1.618 1.6l.658.282c2.236.959 3.5 1.936 3.5 4.133c0 2.369-1.861 3.667-4.36 3.667a5.06 5.06 0 0 1-4.795-2.691Zm-9.295.228c.413.733.789 1.353 1.693 1.353c.864 0 1.41-.338 1.41-1.653v-8.947h2.631v8.982c0 2.724-1.6 3.964-3.929 3.964a4.085 4.085 0 0 1-3.947-2.4Z" />
    </svg>
  )
}

const projectTools = [
  { icon: <FlowbiteHtmlSolid aria-hidden="true" />, label: 'HTML' },
  { icon: <FlowbiteCssSolid aria-hidden="true" />, label: 'CSS' },
  { icon: <VscodeIconsFileTypeScss2 aria-hidden="true" />, label: 'SCSS' },
  { icon: <VscodeIconsFileTypeJsOfficial aria-hidden="true" />, label: 'JavaScript' },
  { icon: <Icon icon="logos:greensock-icon" aria-hidden="true" />, label: 'GSAP' },
]

export default function StackCardsShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const separatorLines = section.querySelectorAll<HTMLElement>('.stack-cards-section__separator-line')
    const separatorPlus = section.querySelector<HTMLElement>('.stack-cards-section__separator-plus')
    const toolGroups = Array.from(section.querySelectorAll<HTMLElement>('.project-case__tools'))

    const context = gsap.context(() => {
      if (separatorLines.length === 0 || !separatorPlus) {
        return
      }

      gsap.set(separatorLines, { scaleX: 0, transformOrigin: 'center center' })
      gsap.set(separatorPlus, { autoAlpha: 0, scale: 0.72, rotate: -90, transformOrigin: 'center center' })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          gsap
            .timeline()
            .to(separatorLines, { scaleX: 1, duration: 0.62, ease: 'power2.out' })
            .to(separatorPlus, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.46, ease: 'back.out(1.5)' }, '-=0.34')
        },
      })
    }, section)

    let toolDraggables: Draggable[] = []
    let dragSetupTimer: number | undefined
    const entranceTimelines: ReturnType<typeof gsap.timeline>[] = []
    const toolsObservers: IntersectionObserver[] = []

    if (toolGroups.length > 0) {
      type TrackedButton = HTMLElement & { startIndex: number; currentIndex: number }

      dragSetupTimer = window.setTimeout(() => {
        toolGroups.forEach((tools) => {
          const toolButtons = Array.from(tools.querySelectorAll<HTMLElement>('.project-case__tool'))

          if (toolButtons.length < 2) {
            return
          }

          const slotWidth = toolButtons[1].offsetLeft - toolButtons[0].offsetLeft
          let hasCreatedDraggables = false
          let entranceTimeline: ReturnType<typeof gsap.timeline> | undefined

          toolButtons.forEach((button, index) => {
            gsap.set(button, {
              autoAlpha: 0,
              position: 'relative',
              rotate: -360,
              scale: 0.92,
              transformOrigin: 'center center',
              x: -220,
              y: 0,
            })
            const tracked = button as TrackedButton
            tracked.startIndex = index
            tracked.currentIndex = index
          })

          const createToolDraggables = () => {
            if (hasCreatedDraggables) {
              return
            }

            hasCreatedDraggables = true

            toolButtons.forEach((button, index) => {
              const draggable = Draggable.create(button, {
                activeCursor:
                  "url('https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68384fb13cff138fa04d162c_cursor-dragging.svg') 12 0, text",
                bounds: {
                  minX: -index * slotWidth,
                  maxX: (toolButtons.length - 1 - index) * slotWidth,
                },
                cursor:
                  "url('https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68384fb014875f192dfcef4b_cursor-drag.svg') 12 0, auto",
                edgeResistance: 1,
                type: 'x',
                zIndexBoost: true,
                onDragStart() {
                  this.target.style.zIndex = '10'
                  this.target.classList.add('is-dragging')
                  gsap.to(this.target, { scale: 1.04, duration: 0.2, overwrite: 'auto' })
                },
                onDrag() {
                  const draggedButton = this.target as TrackedButton
                  const targetIndex = Math.max(
                    0,
                    Math.min(toolButtons.length - 1, Math.round(this.x / slotWidth) + draggedButton.startIndex),
                  )

                  if (draggedButton.currentIndex === targetIndex) {
                    return
                  }

                  const oldIndex = draggedButton.currentIndex
                  const displacedButton = toolButtons.find(
                    (candidate) => (candidate as TrackedButton).currentIndex === targetIndex,
                  ) as TrackedButton | undefined

                  if (displacedButton) {
                    displacedButton.currentIndex = oldIndex
                    gsap.to(displacedButton, {
                      x: (displacedButton.currentIndex - displacedButton.startIndex) * slotWidth,
                      duration: 0.32,
                      ease: 'back.out(1.1)',
                      overwrite: 'auto',
                    })
                  }

                  draggedButton.currentIndex = targetIndex
                },
                onDragEnd() {
                  this.target.style.zIndex = '1'
                  this.target.classList.remove('is-dragging')

                  const draggedButton = this.target as TrackedButton
                  gsap.to(draggedButton, {
                    x: (draggedButton.currentIndex - draggedButton.startIndex) * slotWidth,
                    rotate: 0,
                    scale: 1,
                    duration: 0.35,
                    ease: 'back.out(1.1)',
                    overwrite: 'auto',
                  })
                },
              })

              toolDraggables.push(...draggable)
            })
          }

          const playEntrance = () => {
            if (entranceTimeline) {
              return
            }

            entranceTimeline = gsap.timeline({ onComplete: createToolDraggables })
            entranceTimelines.push(entranceTimeline)

            ;[...toolButtons].reverse().forEach((button, index) => {
              entranceTimeline?.to(
                button,
                {
                  autoAlpha: 1,
                  rotate: 0,
                  scale: 1,
                  x: 0,
                  duration: 1.15,
                },
                index * 0.3,
              )
            })
          }

          if ('IntersectionObserver' in window) {
            const toolsObserver = new IntersectionObserver(
              (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) {
                  return
                }

                playEntrance()
                toolsObserver.disconnect()
              },
              { threshold: 0.25 },
            )
            toolsObservers.push(toolsObserver)
            toolsObserver.observe(tools)
          } else {
            playEntrance()
          }
        })
      }, 50)
    }

    return () => {
      if (dragSetupTimer) {
        window.clearTimeout(dragSetupTimer)
      }
      toolsObservers.forEach((observer) => observer.disconnect())
      entranceTimelines.forEach((timeline) => timeline.kill())
      toolDraggables.forEach((draggable) => draggable.kill())
      context.revert()
    }
  }, [])

  return (
    <section id="project-showcase" className="stack-cards-section" ref={sectionRef}>
      <div className="stack-cards-section__separator" aria-hidden="true">
        <div className="stack-cards-section__separator-line" />
        <div className="stack-cards-section__separator-plus">
          <span className="stack-cards-section__separator-stroke" />
          <span className="stack-cards-section__separator-stroke stack-cards-section__separator-stroke--vertical" />
        </div>
        <div className="stack-cards-section__separator-line" />
      </div>

      {showcasedProjects.map((project) => (
        <article key={project.title} className="project-case">
          <div className={`projects-grid${project.cards.length === 2 ? ' projects-grid--two' : ''}`}>
            {project.cards.map((card) => (
              <div key={`${project.title}-${card.alt}`} className="projects-grid__item">
                <img className="projects-grid__image" src={card.image} alt={card.alt} />
              </div>
            ))}
          </div>

          <div className="project-case__content">
            <h2 className="project-case__title">{project.title}</h2>

            <div className="project-case__summary">
              <p className="project-case__description">{project.description}</p>
              <div className="project-case__actions">
                <a className="project-case__link" href={project.href} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>

                <div className="project-case__tools" aria-label={`${project.title} tools`}>
                  {projectTools.map((tool) => (
                    <button
                      key={`${project.title}-${tool.label}`}
                      className="project-case__tool"
                      type="button"
                      aria-label={tool.label}
                    >
                      {tool.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
