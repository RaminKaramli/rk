import { useEffect, useState } from 'react'
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

  if (pageQuery === 'about' || pathname === '/about') {
    return 'about'
  }

  if (pageQuery === 'projects' || pathname === '/projects') {
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

export default function AppRouter() {
  const [route, setRoute] = useState<RouteKey>(() => resolveRoute())

  useEffect(() => {
    const onLocationChange = () => {
      setRoute(resolveRoute())
    }

    window.addEventListener('popstate', onLocationChange)
    window.addEventListener('hashchange', onLocationChange)

    return () => {
      window.removeEventListener('popstate', onLocationChange)
      window.removeEventListener('hashchange', onLocationChange)
    }
  }, [])

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
