import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { ScrollTrigger, gsap } from '../../../lib/gsap'
import { useTheme } from '../../../hooks/useTheme'
import Footer from '../footer/Footer'
import Header from '../header/Header'

type ContainerProps = {
  children: ReactNode
  page: 'about' | 'home'
  preloader?: ReactNode
  showPreloader?: boolean
  title: string
}

export default function Container({
  children,
  page,
  preloader,
  showPreloader = false,
  title,
}: ContainerProps) {
  const { isDark, toggleTheme } = useTheme()
  const footerContainerRef = useRef<HTMLDivElement | null>(null)
  const mainContentRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    document.title = title
    document.body.classList.toggle('about-page', page === 'about')

    return () => {
      document.body.classList.remove('about-page')
    }
  }, [page, title])

  useLayoutEffect(() => {
    if (showPreloader) {
      return
    }

    const footerContainer = footerContainerRef.current
    const mainContent = mainContentRef.current

    if (!footerContainer || !mainContent) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(footerContainer, {
        y: '-70%',
      })

      gsap.to(footerContainer, {
        y: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: mainContent,
          start: 'bottom bottom',
          end: () => `+=${Math.max(footerContainer.offsetHeight, 1)}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      ScrollTrigger.refresh()
    })

    return () => {
      context.revert()
    }
  }, [page, showPreloader])

  useLayoutEffect(() => {
    if (showPreloader) {
      return
    }

    const darkSurfaceSections = Array.from(
      document.querySelectorAll<HTMLElement>('.about-showcase, .site-footer'),
    )

    if (!darkSurfaceSections.length) {
      document.body.classList.remove('ui-on-dark-surface')
      return
    }

    const activeSections = new Set<HTMLElement>()
    const syncBodyClass = () => {
      document.body.classList.toggle('ui-on-dark-surface', activeSections.size > 0)
    }

    const triggers = darkSurfaceSections.map((section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top+=104',
        end: 'bottom top+=104',
        onToggle: (self) => {
          if (self.isActive) {
            activeSections.add(section)
          } else {
            activeSections.delete(section)
          }

          syncBodyClass()
        },
      })

      if (trigger.isActive) {
        activeSections.add(section)
      }

      return trigger
    })

    syncBodyClass()

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      activeSections.clear()
      document.body.classList.remove('ui-on-dark-surface')
    }
  }, [page, showPreloader])

  return (
    <>
      {preloader}
      <div id="wrapper">
        <main ref={mainContentRef} className="main-content">
          <Header page={page} isDark={isDark} onToggleTheme={toggleTheme} showPreloader={showPreloader} />
          {children}
        </main>
        <Footer ref={footerContainerRef} />
      </div>
    </>
  )
}
