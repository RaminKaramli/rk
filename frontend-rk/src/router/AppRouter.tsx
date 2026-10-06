import { useEffect, useLayoutEffect, useState } from 'react'
import AboutPage from '../pages/about/About'
import HomePage from '../pages/home/Home'
import NotFoundPage from '../pages/not-found/NotFound'
import ProjectDetailsPage from '../pages/project-details/ProjectDetails'
import ProjectsPage from '../pages/projects/ProjectsPage'

type RouteKey = 'about' | 'home' | 'not-found' | 'project-details' | 'projects'

function normalizePathname(pathname: string) {
  if (pathname === '/index.html') {
    return '/'
  }

  const normalized = pathname.replace(/\/+$/, '')
  return normalized || '/'
}

function resolveRoute(): RouteKey {
  const pathname = normalizePathname(window.location.pathname)
  const pageQuery = new URLSearchParams(window.location.search).get('page')
  const hash = window.location.hash
  const aboutHashes = new Set(['#about', '#experience-showcase', '#resume'])
  const projectHashes = new Set(['#works', '#notable-works', '#projects', '#project-showcase'])

  if (pageQuery === 'about' || pathname === '/about' || (pathname === '/' && aboutHashes.has(hash))) {
    return 'about'
  }

  if (pageQuery === 'projects' || pathname === '/projects' || (pathname === '/' && projectHashes.has(hash))) {
    return 'projects'
  }

  if (pageQuery === 'project-details' || pathname === '/project-details') {
    return 'project-details'
  }

  if (pageQuery === 'home' || pathname === '/') {
    return 'home'
  }

  return 'not-found'
}

function getLocationKey() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

function normalizeLegacyAboutUrl() {
  const nextUrl = new URL(window.location.href)

  if (nextUrl.searchParams.get('page') !== 'about') {
    return
  }

  nextUrl.searchParams.delete('page')
  nextUrl.hash = nextUrl.hash || '#about'
  window.history.replaceState(window.history.state, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
}

export default function AppRouter() {
  const [route, setRoute] = useState<RouteKey>(() => resolveRoute())
  const [locationKey, setLocationKey] = useState(getLocationKey)

  useEffect(() => {
    const onLocationChange = () => {
      normalizeLegacyAboutUrl()
      setRoute(resolveRoute())
      setLocationKey(getLocationKey())
    }

    onLocationChange()
    window.addEventListener('popstate', onLocationChange)
    window.addEventListener('hashchange', onLocationChange)

    return () => {
      window.removeEventListener('popstate', onLocationChange)
      window.removeEventListener('hashchange', onLocationChange)
    }
  }, [])

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const hash = window.location.hash

    if (!hash) {
      window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
      return
    }

    let frameId = 0
    let attempts = 0

    const scrollToHash = () => {
      const target = document.querySelector<HTMLElement>(hash)

      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
        return
      }

      attempts += 1
      if (attempts < 12) {
        frameId = window.requestAnimationFrame(scrollToHash)
      }
    }

    frameId = window.requestAnimationFrame(scrollToHash)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [locationKey, route])

  if (route === 'about') {
    return <AboutPage />
  }

  if (route === 'projects') {
    return <ProjectsPage />
  }

  if (route === 'project-details') {
    return <ProjectDetailsPage />
  }

  if (route === 'home') {
    return <HomePage />
  }

  return <NotFoundPage />
}
