import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { aboutMenuLinks, homeMenuLinks, overlayMenuImages } from '../../../data/socials'
import { ScrollTrigger, gsap } from '../../../lib/gsap'
import { media } from '../../../utils/constants'
import BrandLogo from '../../common/brand-logo/BrandLogo'
import ThemeToggle from '../../common/theme-toggle/ThemeToggle'

type HeaderProps = {
  isDark: boolean
  onToggleTheme: () => void
  page: 'about' | 'home'
  showPreloader: boolean
}

export default function Header({ isDark, onToggleTheme, page, showPreloader }: HeaderProps) {
  const MENU_DURATION = 0.42
  const LINK_STAGGER = 0.05
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isSectionTwoActive, setIsSectionTwoActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [locationState, setLocationState] = useState(() =>
    typeof window === 'undefined'
      ? ''
      : `${window.location.pathname}${window.location.search}${window.location.hash}`,
  )
  const headerRef = useRef<HTMLElement | null>(null)
  const brandRef = useRef<HTMLAnchorElement | null>(null)
  const switcherRef = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const overlayContentRef = useRef<HTMLDivElement | null>(null)
  const imageRefs = useRef<HTMLDivElement[]>([])
  const linkRefs = useRef<HTMLAnchorElement[]>([])
  const isInitializedRef = useRef(false)
  const headerEntrancePlayedRef = useRef(false)

  const isAboutPage = page === 'about'
  const sectionTwoActive = isSectionTwoActive
  const links = isAboutPage ? aboutMenuLinks : homeMenuLinks

  const getActiveNavIndex = useCallback((locationValue: string) => {
    if (!locationValue) {
      return isAboutPage ? 1 : 0
    }

    const nextUrl = new URL(locationValue, window.location.origin)
    const hash = nextUrl.hash
    const pathname = nextUrl.pathname.replace(/\/+$/, '') || '/'
    const pageParam = nextUrl.searchParams.get('page')

    if (hash === '#works' || hash === '#notable-works' || hash === '#project-showcase') {
      return 2
    }

    if (hash === '#about') {
      return 1
    }

    if (hash === '#experience-showcase' || hash === '#resume' || hash === '#site-footer' || hash === '#contact') {
      return 3
    }

    if (pageParam === 'about' || pathname === '/about') {
      return 1
    }

    if (pageParam === 'projects' || pathname === '/projects') {
      return 2
    }

    return 0
  }, [isAboutPage])

  const activeNavIndex = useMemo(() => getActiveNavIndex(locationState), [getActiveNavIndex, locationState])

  const syncLocationScroll = (hash: string) => {
    const scrollToHash = (attempt = 0) => {
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      const target = document.querySelector<HTMLElement>(hash)

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      if (attempt < 8) {
        window.setTimeout(() => scrollToHash(attempt + 1), 80)
      }
    }

    window.setTimeout(() => scrollToHash(), 80)
  }

  const shouldAnimateNavLink = (label: string) => ['HOME', 'ABOUT', 'WORKS'].includes(label)

  const navigateTo = (href: string, closeMenu = false) => {
    const nextUrl = new URL(href, window.location.origin)
    const nextRoute = `${nextUrl.pathname}${nextUrl.search}`
    const currentRoute = `${window.location.pathname}${window.location.search}`

    if (closeMenu) {
      setMenuOpen(false)
    }

    if (nextRoute !== currentRoute) {
      window.history.pushState({ skipPreloader: true }, '', `${nextRoute}${nextUrl.hash}`)
      window.dispatchEvent(new Event('popstate'))
      window.dispatchEvent(new Event('hashchange'))
      if (nextUrl.hash) {
        syncLocationScroll(nextUrl.hash)
      } else {
        window.scrollTo(0, 0)
      }
      return
    }

    const previousHash = window.location.hash

    if (previousHash !== nextUrl.hash) {
      window.history.pushState({ skipPreloader: true }, '', `${nextRoute}${nextUrl.hash}`)
      window.dispatchEvent(new Event('hashchange'))
    }

    syncLocationScroll(nextUrl.hash)
  }

  const navigateAfterScribble = (href: string, label: string, element: HTMLElement, closeMenu = false) => {
    const nextUrl = new URL(href, window.location.origin)
    const nextLocation = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
    const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`

    if (nextLocation === currentLocation) {
      navigateTo(href, closeMenu)
      return
    }

    if (!shouldAnimateNavLink(label)) {
      navigateTo(href, closeMenu)
      return
    }

    const runTransition = window.__runScribbleTransition

    if (!runTransition) {
      navigateTo(href, closeMenu)
      return
    }

    if (closeMenu) {
      setMenuOpen(false)
    }

    void runTransition({
      trigger: element,
      onCover: () => {
        navigateTo(href, false)
      },
    })
  }

  const isExternalOrBlankLink = (href: string, label: string) => {
    return (
      label === 'RESUME' ||
      href.includes('drive.google.com') ||
      href.endsWith('.pdf')
    )
  }

  const handleNavigationClick =
    (href: string, label: string, closeMenu = false) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (isExternalOrBlankLink(href, label)) {
        if (closeMenu) {
          setMenuOpen(false)
        }
        window.open(href, '_blank', 'noopener,noreferrer')
        event.preventDefault()
        return
      }

      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const nextUrl = new URL(href, window.location.origin)

      if (nextUrl.origin !== window.location.origin) {
        return
      }

      event.preventDefault()
      navigateAfterScribble(href, label, event.currentTarget, closeMenu)
    }

  const handleInlineNavigationClick =
    (href: string, label: string) => (event: ReactMouseEvent<HTMLLabelElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (isExternalOrBlankLink(href, label)) {
        window.open(href, '_blank', 'noopener,noreferrer')
        return
      }
      navigateAfterScribble(href, label, event.currentTarget)
    }

  const handleBrandClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (window.location.pathname !== '/' || window.location.search) {
      navigateAfterScribble('/', 'HOME', event.currentTarget)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    document.body.classList.toggle('overlay-active', menuOpen)

    if (menuOpen) {
      headerRef.current?.classList.remove('side-header--hidden')
      brandRef.current?.classList.remove('header-brand--hidden')
      if (menuRef.current) {
        menuRef.current.scrollTop = 0
      }
    }

    return () => {
      document.body.classList.remove('overlay-active')
    }
  }, [menuOpen])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    let lastScrollY = window.scrollY

    const onScroll = () => {
      if (menuOpen) {
        setMenuOpen(false)
        return
      }

      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollY

      if (currentScrollY < 80) {
        header.classList.remove('side-header--hidden')
        brandRef.current?.classList.remove('header-brand--hidden')
      } else if (diff > 0) {
        // Scrolling down — HIDE
        header.classList.add('side-header--hidden')
        brandRef.current?.classList.add('header-brand--hidden')
      } else if (diff < 0) {
        // Scrolling up — SHOW
        header.classList.remove('side-header--hidden')
        brandRef.current?.classList.remove('header-brand--hidden')
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    const syncLocationState = () => {
      setLocationState(`${window.location.pathname}${window.location.search}${window.location.hash}`)
    }

    syncLocationState()
    window.addEventListener('hashchange', syncLocationState)
    window.addEventListener('popstate', syncLocationState)

    return () => {
      window.removeEventListener('hashchange', syncLocationState)
      window.removeEventListener('popstate', syncLocationState)
    }
  }, [isAboutPage])

  useEffect(() => {
    const el = switcherRef.current

    if (!el) {
      return
    }

    const radios = el.querySelectorAll<HTMLInputElement>('input[type="radio"]')
    let previousValue: string | null = null

    const initiallyChecked = el.querySelector<HTMLInputElement>('input[type="radio"]:checked')
    if (initiallyChecked) {
      previousValue = initiallyChecked.getAttribute('c-option')
      el.setAttribute('c-previous', previousValue ?? '')
    }

    const cleanupFns = Array.from(radios).map((radio) => {
      const handleChange = () => {
        if (radio.checked) {
          el.setAttribute('c-previous', previousValue ?? '')
          previousValue = radio.getAttribute('c-option')
        }
      }

      radio.addEventListener('change', handleChange)

      return () => {
        radio.removeEventListener('change', handleChange)
      }
    })

    return () => {
      cleanupFns.forEach((cleanup) => cleanup())
    }
  }, [activeNavIndex, links])

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
    const header = headerRef.current
    const themeToggle = document.getElementById('themeToggle')

    if (!header || !themeToggle) {
      return
    }

    if (showPreloader) {
      headerEntrancePlayedRef.current = false
      gsap.killTweensOf([header, themeToggle])
      gsap.set(header, {
        autoAlpha: 0,
        y: -40,
      })
      gsap.set(themeToggle, {
        autoAlpha: 0,
        x: 24,
      })
      return
    }

    if (headerEntrancePlayedRef.current) {
      gsap.set(header, {
        autoAlpha: 1,
        clearProps: 'transform',
      })
      gsap.set(themeToggle, {
        autoAlpha: 1,
        clearProps: 'transform',
      })
      return
    }

    headerEntrancePlayedRef.current = true
    gsap.killTweensOf([header, themeToggle])
    gsap.set(header, {
      autoAlpha: 0,
      y: -40,
    })
    gsap.set(themeToggle, {
      autoAlpha: 0,
      x: 24,
    })

    gsap
      .timeline()
      .to(header, {
        autoAlpha: 1,
        delay: 0,
        duration: 0.2,
        ease: 'power3.out',
        y: 0,
        clearProps: 'transform',
      })
      .to(
        themeToggle,
        {
          autoAlpha: 1,
          duration: 0.25,
          ease: 'power2.out',
          x: 0,
          clearProps: 'transform',
        },
        '<',
      )
  }, [showPreloader])

  useLayoutEffect(() => {
    const triggerSection = document.getElementById('about')

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
  }, [])

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
                target={isExternalOrBlankLink(link.href, link.label) ? '_blank' : undefined}
                rel={isExternalOrBlankLink(link.href, link.label) ? 'noopener noreferrer' : undefined}
                data-image-index={link.imageIndex}
                onMouseEnter={() => {
                  setActiveImageIndex(link.imageIndex)
                }}
                onFocus={() => {
                  setActiveImageIndex(link.imageIndex)
                }}
                onClick={handleNavigationClick(link.href, link.label, true)}
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
      <a
        ref={brandRef}
        href="/"
        className="header-brand"
        aria-label="Ramin Karamli"
        onClick={handleBrandClick}
      >
        <BrandLogo className="header-brand__img" />
      </a>

      <header
        ref={headerRef}
        className={`side-header${sectionTwoActive ? ' side-header--section2-left' : ''}${menuOpen ? ' is-open' : ''}`}
        id="sideHeader"
      >
        <div className="header-wrapper">
          <a href="/" className="header-logo" aria-label="Ramin avatar">
            <img id="headerAvatar" src={media.avatar} alt="Ramin avatar" />
          </a>

          <nav
            ref={switcherRef}
            className="header-inline-nav switcher"
            aria-label="Primary"
            style={{ '--active-index': String(activeNavIndex) } as CSSProperties}
          >
            <span className="header-inline-nav__highlight" aria-hidden="true" />
            {links.map((link, index) => (
              <label
                key={`inline-${link.label}-${link.href}`}
                className={`header-inline-link switcher__option${activeNavIndex === index ? ' is-active' : ''}`}
                onClick={handleInlineNavigationClick(link.href, link.label)}
              >
                <input
                  checked={activeNavIndex === index}
                  className="switcher__input"
                  c-option={String(index + 1)}
                  name="header-switcher"
                  onChange={() => { }}
                  type="radio"
                  value={link.label}
                />
                <span className="switcher__text">{link.label}</span>
              </label>
            ))}
          </nav>

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
