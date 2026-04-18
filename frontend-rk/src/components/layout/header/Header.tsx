import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { aboutMenuLinks, homeMenuLinks, overlayMenuImages } from '../../../data/socials'
import { ScrollTrigger, gsap } from '../../../lib/gsap'
import { media } from '../../../utils/constants'
import ThemeToggle from '../../common/theme-toggle/ThemeToggle'

type HeaderProps = {
  isDark: boolean
  onToggleTheme: () => void
  page: 'about' | 'home'
}

export default function Header({ isDark, onToggleTheme, page }: HeaderProps) {
  const MENU_DURATION = 0.42
  const LINK_STAGGER = 0.05
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isSectionTwoActive, setIsSectionTwoActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const overlayContentRef = useRef<HTMLDivElement | null>(null)
  const imageRefs = useRef<HTMLDivElement[]>([])
  const linkRefs = useRef<HTMLAnchorElement[]>([])
  const isInitializedRef = useRef(false)

  const isAboutPage = page === 'about'
  const sectionTwoActive = isSectionTwoActive
  const links = isAboutPage ? aboutMenuLinks : homeMenuLinks

  useEffect(() => {
    document.body.classList.toggle('overlay-active', menuOpen)

    return () => {
      document.body.classList.remove('overlay-active')
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useLayoutEffect(() => {
    const menu = menuRef.current
    const overlayContent = overlayContentRef.current
    const header = headerRef.current
    const images = imageRefs.current
    const linksToAnimate = linkRefs.current

    if (!menu || !overlayContent || !header) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(menu, {
        visibility: 'hidden',
        autoAlpha: 0,
        pointerEvents: 'none',
      })

      gsap.set(overlayContent, { autoAlpha: 0, y: -8 })
      gsap.set(linksToAnimate, { autoAlpha: 0, x: 0, y: 8 })
      gsap.set(images, { autoAlpha: 0, scale: 1.03 })

      if (images[0]) {
        gsap.set(images[0], { autoAlpha: 1, scale: 1 })
      }
    })

    isInitializedRef.current = true

    return () => {
      context.revert()
    }
  }, [])

  useLayoutEffect(() => {
    const triggerSection = isAboutPage
      ? document.querySelector<HTMLElement>('.about-loop-gallery')
      : document.getElementById('about')

    if (!triggerSection) {
      return
    }

    const mediaMatcher = gsap.matchMedia()

    mediaMatcher.add('(min-width: 769px)', () => {
      const trigger = ScrollTrigger.create({
        trigger: triggerSection,
        start: 'top top+=104',
        end: 'bottom top+=104',
        onEnter: () => {
          setIsSectionTwoActive(true)
        },
        onEnterBack: () => {
          setIsSectionTwoActive(true)
        },
        onLeave: () => {
          setIsSectionTwoActive(false)
        },
        onLeaveBack: () => {
          setIsSectionTwoActive(false)
        },
      })

      return () => {
        trigger.kill()
      }
    })

    return () => {
      mediaMatcher.revert()
    }
  }, [isAboutPage])

  useLayoutEffect(() => {
    if (!isInitializedRef.current) {
      return
    }

    const menu = menuRef.current
    const overlayContent = overlayContentRef.current
    const images = imageRefs.current
    const linksToAnimate = linkRefs.current

    if (!menu || !overlayContent) {
      return
    }

    gsap.killTweensOf([menu, overlayContent, ...images, ...linksToAnimate])

    if (menuOpen) {
      gsap.set(overlayContent, { autoAlpha: 0, x: 0, y: -8 })
      gsap.set(linksToAnimate, { autoAlpha: 0, x: 0, y: 8 })

      return void gsap
        .timeline({
          onStart: () => {
            gsap.set(menu, {
              visibility: 'visible',
              autoAlpha: 0,
              pointerEvents: 'auto',
            })
          },
        })
        .to(menu, { autoAlpha: 1, duration: MENU_DURATION, ease: 'power1.out' }, 0)
        .to(overlayContent, { autoAlpha: 1, y: 0, duration: MENU_DURATION, ease: 'power2.out' }, 0)
        .to(linksToAnimate, { autoAlpha: 1, y: 0, duration: MENU_DURATION, stagger: LINK_STAGGER, ease: 'power2.out' }, 0)
    }

    return void gsap
      .timeline({
        onStart: () => {
          gsap.set(menu, {
            pointerEvents: 'none',
          })
        },
        onComplete: () => {
          gsap.set(menu, { autoAlpha: 0 })
          gsap.set(menu, { clearProps: 'visibility' })
          gsap.set(overlayContent, { autoAlpha: 0, x: 0, y: -8 })
          gsap.set(linksToAnimate, { autoAlpha: 0, x: 0, y: 8 })
        },
      })
      .to(linksToAnimate, { autoAlpha: 0, y: 8, duration: MENU_DURATION, ease: 'power2.inOut' }, 0)
      .to(overlayContent, { autoAlpha: 0, y: -8, duration: MENU_DURATION, ease: 'power2.inOut' }, 0)
      .to(menu, { autoAlpha: 0, duration: MENU_DURATION, ease: 'power2.inOut' }, 0)
  }, [menuOpen])

  useLayoutEffect(() => {
    const images = imageRefs.current

    if (!menuOpen || !images.length) {
      return
    }

    images.forEach((image, index) => {
      gsap.to(image, {
        autoAlpha: index === activeImageIndex ? 1 : 0,
        scale: index === activeImageIndex ? 1 : 1.03,
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  }, [activeImageIndex, menuOpen])

  const overlayMenuNode = (
    <div
      ref={menuRef}
      className={`full-width-overlay-menu${sectionTwoActive ? ' full-width-overlay-menu--side' : ''}${menuOpen ? ' is-open' : ''}`}
      id="fullWidthMenu"
      aria-hidden={!menuOpen}
    >
      <div className="overlay-menu-image-wrap">
        {overlayMenuImages.map((image, index) => (
          <div
            ref={(element) => {
              if (element) {
                imageRefs.current[index] = element
              }
            }}
            key={image}
            className={`overlay-menu-image${index === activeImageIndex ? ' is-active' : ''}`}
          >
            <img src={image} alt="" />
          </div>
        ))}
      </div>

      <div ref={overlayContentRef} className="overlay-menu-content">
        <ul className="overlay-nav-list">
          {links.map((link, index) => (
            <li key={`${link.label}-${link.href}`}>
              <a
                ref={(element) => {
                  if (element) {
                    linkRefs.current[index] = element
                  }
                }}
                href={link.href}
                data-image-index={link.imageIndex}
                onMouseEnter={() => {
                  setActiveImageIndex(link.imageIndex)
                }}
                onFocus={() => {
                  setActiveImageIndex(link.imageIndex)
                }}
                onClick={() => {
                  setMenuOpen(false)
                }}
                className="overlay-nav-link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header${sectionTwoActive ? ' site-header--section2-left' : ''}${menuOpen ? ' is-open' : ''}`}
        id="siteHeader"
      >
        <div className="header-wrapper">
          <a href="/" className="header-logo" aria-label="Ramin avatar">
            <img id="headerAvatar" src={media.avatar} alt="Ramin avatar" />
          </a>

          <button
            className="menu-toggle"
            id="menuToggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="fullWidthMenu"
            onClick={() => {
              setMenuOpen((current) => !current)
              setActiveImageIndex(0)
            }}
          >
            <svg className={`ham ham6${menuOpen ? ' active' : ''}`} viewBox="0 0 100 100" width="56" aria-hidden="true">
              <path
                className="line top"
                d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
              />
              <path
                className="line middle"
                d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
              />
              <path
                className="line bottom"
                d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
              />
            </svg>
          </button>
        </div>
      </header>

      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

      {typeof document !== 'undefined' ? createPortal(overlayMenuNode, document.body) : null}
    </>
  )
}
