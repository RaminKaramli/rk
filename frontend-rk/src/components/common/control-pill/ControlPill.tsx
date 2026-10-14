import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../../../context/LanguageContext'
import { useThemeContext } from '../../../context/ThemeContext'
import type { Language } from '../../../types/i18n.types'
import './ControlPill.scss'

type YouTubePlayer = {
  destroy: () => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  getVideoData: () => { author?: string; title?: string }
  loadVideoById: (videoId: string) => void
  pauseVideo: () => void
  playVideo: () => void
  setVolume: (volume: number) => void
}

type YouTubePlayerState = {
  BUFFERING: number
  CUED: number
  ENDED: number
  PAUSED: number
  PLAYING: number
  UNSTARTED: number
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          events?: {
            onError?: (event: { data: number }) => void
            onReady?: (event: { target: YouTubePlayer }) => void
            onStateChange?: (event: { data: number; target: YouTubePlayer }) => void
          }
          playerVars?: Record<string, number | string>
          videoId: string
        },
      ) => YouTubePlayer
      PlayerState: YouTubePlayerState
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

const YOUTUBE_URLS = [
  'https://www.youtube.com/watch?v=fDrTbLXHKu8',
  'https://www.youtube.com/watch?v=5qap5aO4i9A',
  'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  'https://www.youtube.com/watch?v=PIh2xe4jnpk',
  'https://www.youtube.com/watch?v=pAgnJDJN4VA',
] as const

const YOUTUBE_PLAYER_ID = 'rk-unified-audio-player'
let youtubeApiPromise: Promise<void> | null = null

function extractVideoId(url: string): string {
  try {
    const parsed = new URL(url)
    const value = parsed.searchParams.get('v')
    return value && value.trim().length > 0 ? value : 'fDrTbLXHKu8'
  } catch {
    return 'fDrTbLXHKu8'
  }
}

function sanitizeTitle(rawTitle: string): string {
  return rawTitle
    .replace(/\(official video\)/i, '')
    .replace(/\(official music video\)/i, '')
    .replace(/\[official video\]/i, '')
    .replace(/【.*?】/g, '')
    .trim()
}

function getArtistFromTitle(title: string): string {
  const match = title.split(/\s[-–]\s/)[0]?.trim()
  return match && match.length > 0 ? match : 'Ambient Music'
}

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) {
    return Promise.resolve()
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise
  }

  youtubeApiPromise = new Promise((resolve) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]')
    const previousHandler = window.onYouTubeIframeAPIReady

    window.onYouTubeIframeAPIReady = () => {
      previousHandler?.()
      resolve()
    }

    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    document.head.appendChild(script)
  })

  return youtubeApiPromise
}

export default function ControlPill() {
  const { language, setLanguage } = useLanguage()
  const { isDark, toggleTheme } = useThemeContext()

  const [activeLang, setActiveLang] = useState<Language>(language)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Audio player state
  const playerRef = useRef<YouTubePlayer | null>(null)
  const shouldAutoPlayRef = useRef(false)
  const [activePartIndex, setActivePartIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [author, setAuthor] = useState('Chill / Ambient')
  const [song, setSong] = useState('Background Music')
  const [ready, setReady] = useState(false)

  const activeVideoId = useMemo(() => extractVideoId(YOUTUBE_URLS[activePartIndex] ?? YOUTUBE_URLS[0]), [activePartIndex])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setActiveLang(language)
  }, [language])

  const handleLanguageChange = (target: Language) => {
    if (target === language || isTransitioning) return
    if (document.body.classList.contains('is-transitioning')) return

    setIsTransitioning(true)

    const savedScrollY = window.scrollY
    const runTransition = window.__runScribbleTransition

    if (runTransition) {
      void runTransition({
        durationIn: 0.8,
        durationOut: 1.0,
        onCover: () => {
          setActiveLang(target)
          setLanguage(target)
          window.scrollTo({ top: savedScrollY, behavior: 'instant' })
        },
      }).finally(() => {
        setIsTransitioning(false)
        window.scrollTo({ top: savedScrollY, behavior: 'instant' })
      })
    } else {
      setActiveLang(target)
      setLanguage(target)
      setIsTransitioning(false)
    }
  }

  const handleToggleLanguage = () => {
    const nextLang: Language = activeLang === 'az' ? 'en' : 'az'
    handleLanguageChange(nextLang)
  }

  const updateVideoMeta = useCallback(() => {
    const player = playerRef.current
    if (!player) return

    const data = player.getVideoData?.()
    const cleanedTitle = data?.title ? sanitizeTitle(data.title) : ''

    if (cleanedTitle) {
      setSong(cleanedTitle)
      setAuthor(getArtistFromTitle(cleanedTitle))
      return
    }

    if (data?.author && data.author.toLowerCase() !== 'youtube') {
      setAuthor(data.author)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    void (async () => {
      await loadYouTubeApi()
      if (cancelled || !window.YT?.Player) return

      playerRef.current = new window.YT.Player(YOUTUBE_PLAYER_ID, {
        videoId: activeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          enablejsapi: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onError: () => {
            setActivePartIndex((prev) => (prev + 1) % YOUTUBE_URLS.length)
          },
          onReady: (event) => {
            if (cancelled) return
            setReady(true)
            event.target.setVolume(55)
            updateVideoMeta()

            if (shouldAutoPlayRef.current) {
              shouldAutoPlayRef.current = false
              event.target.playVideo()
            }
          },
          onStateChange: (event) => {
            const states = window.YT?.PlayerState
            if (!states) return

            if (event.data === states.PLAYING) {
              setIsPlaying(true)
              updateVideoMeta()
              return
            }

            if (event.data === states.ENDED) {
              shouldAutoPlayRef.current = true
              setReady(false)
              setIsPlaying(true)
              setActivePartIndex((prev) => (prev + 1) % YOUTUBE_URLS.length)
              return
            }

            if (event.data === states.PAUSED) {
              setIsPlaying(false)
            }
          },
        },
      })
    })()

    return () => {
      cancelled = true
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [activeVideoId, updateVideoMeta])

  const handleTogglePlay = () => {
    const player = playerRef.current
    if (!player) {
      shouldAutoPlayRef.current = true
      return
    }

    const states = window.YT?.PlayerState
    const currentState = player.getPlayerState?.()
    const currentlyPlaying = currentState === states?.PLAYING || currentState === states?.BUFFERING

    if (currentlyPlaying) {
      shouldAutoPlayRef.current = false
      player.pauseVideo()
      setIsPlaying(false)
      return
    }

    if (!ready) {
      shouldAutoPlayRef.current = true
      return
    }

    player.playVideo()
    setIsPlaying(true)
  }

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation()
    shouldAutoPlayRef.current = true
    setReady(false)
    setIsPlaying(true)
    setActivePartIndex((prev) => (prev === 0 ? YOUTUBE_URLS.length - 1 : prev - 1))
  }

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation()
    shouldAutoPlayRef.current = true
    setReady(false)
    setIsPlaying(true)
    setActivePartIndex((prev) => (prev + 1) % YOUTUBE_URLS.length)
  }

  const content = (
    <div className={`control-pill-island${isTransitioning ? ' is-loading' : ''}`} role="region" aria-label="Quick controls">
      {/* 1. Single Language Toggle Button */}
      <button
        type="button"
        className="control-pill__icon-btn control-pill__lang-btn"
        onClick={handleToggleLanguage}
        disabled={isTransitioning}
        aria-label={activeLang === 'az' ? 'Switch to English' : 'Azərbaycan dilinə keç'}
        title={activeLang === 'az' ? 'English' : 'Azərbaycan'}
      >
        <span className="control-pill__lang-text">{activeLang.toUpperCase()}</span>
      </button>

      <div className="control-pill__divider" aria-hidden="true" />

      {/* 2. Theme Toggle Segment */}
      <button
        type="button"
        className="control-pill__icon-btn control-pill__theme"
        onClick={toggleTheme}
        aria-label={isDark ? 'İşıqlı rejimə keç' : 'Qaranlıq rejimə keç'}
        title={isDark ? 'Light mode' : 'Dark mode'}
        aria-pressed={isDark}
      >
        <svg className="control-pill__theme-icon control-pill__theme-icon--moon" viewBox="0 0 36 36" aria-hidden="true">
          <path d="M12.5 8.473a10.968 10.968 0 0 1 8.785-.97 7.435 7.435 0 0 0-3.737 4.672l-.09.373A7.454 7.454 0 0 0 28.732 20.4a10.97 10.97 0 0 1-5.232 7.125l-.497.27c-5.014 2.566-11.175.916-14.234-3.813l-.295-.483C5.53 18.403 7.13 11.93 12.017 8.77l.483-.297Zm4.234.616a8.946 8.946 0 0 0-2.805.883l-.429.234A9 9 0 0 0 10.206 22.5l.241.395A9 9 0 0 0 22.5 25.794l.416-.255a8.94 8.94 0 0 0 2.167-1.99 9.433 9.433 0 0 1-2.782-.313c-5.043-1.352-8.036-6.535-6.686-11.578l.147-.491c.242-.745.573-1.44.972-2.078Z" />
        </svg>
        <svg className="control-pill__theme-icon control-pill__theme-icon--sun" viewBox="0 0 36 36" aria-hidden="true">
          <path fillRule="evenodd" d="M18 12a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd" />
          <path d="M17 6.038a1 1 0 1 1 2 0v3a1 1 0 0 1-2 0v-3ZM24.244 7.742a1 1 0 1 1 1.618 1.176L24.1 11.345a1 1 0 1 1-1.618-1.176l1.763-2.427ZM29.104 13.379a1 1 0 0 1 .618 1.902l-2.854.927a1 1 0 1 1-.618-1.902l2.854-.927ZM29.722 20.795a1 1 0 0 1-.619 1.902l-2.853-.927a1 1 0 1 1 .618-1.902l2.854.927ZM25.862 27.159a1 1 0 0 1-1.618 1.175l-1.763-2.427a1 1 0 1 1 1.618-1.175l1.763 2.427ZM19 30.038a1 1 0 0 1-2 0v-3a1 1 0 1 1 2 0v3ZM11.755 28.334a1 1 0 0 1-1.618-1.175l1.764-2.427a1 1 0 1 1 1.618 1.175l-1.764 2.427ZM6.896 22.697a1 1 0 1 1-.618-1.902l2.853-.927a1 1 0 1 1 .618 1.902l-2.853.927ZM6.278 15.28a1 1 0 1 1 .618-1.901l2.853.927a1 1 0 1 1-.618 1.902l-2.853-.927ZM10.137 8.918a1 1 0 0 1 1.618-1.176l1.764 2.427a1 1 0 0 1-1.618 1.176l-1.764-2.427Z" />
        </svg>
      </button>

      <div className="control-pill__divider" aria-hidden="true" />

      {/* 3. Sound / Music Segment */}
      <div className="control-pill__music-wrapper">
        <button
          type="button"
          className={`control-pill__icon-btn control-pill__music${isPlaying ? ' is-playing' : ''}`}
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Musiqini dayandır' : 'Musiqini başlat'}
          title={isPlaying ? `Musiqi: ${song} (Dayandır)` : 'Musiqini başlat'}
          aria-pressed={isPlaying}
        >
          <svg
            className={`control-pill__sound-icon ${isPlaying ? 'is-playing' : 'is-muted'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5L6 9H3C2.44772 9 2 9.44772 2 10V14C2 14.5523 2.44772 15 3 15H6L11 19V5Z" fill="currentColor" fillOpacity={isPlaying ? 0.22 : 0} />
            {isPlaying ? (
              <>
                <path d="M15.5 8.5C16.8 9.8 16.8 12.2 15.5 13.5" className="sound-wave sound-wave--1" />
                <path d="M18.5 5.5C21 8 21 14 18.5 16.5" className="sound-wave sound-wave--2" />
              </>
            ) : (
              <>
                <line x1="21" y1="9.5" x2="16" y2="14.5" className="sound-mute-cross" />
                <line x1="16" y1="9.5" x2="21" y2="14.5" className="sound-mute-cross" />
              </>
            )}
          </svg>
        </button>

        {/* Hover track tooltip */}
        <div className="control-pill__music-tooltip" aria-live="polite">
          <div className="control-pill__track-info">
            <span className="control-pill__song-title">{song}</span>
            <span className="control-pill__song-author">{author}</span>
          </div>
          <div className="control-pill__track-actions">
            <button
              type="button"
              className="control-pill__track-btn"
              onClick={handlePrev}
              title="Əvvəlki mahnı"
              aria-label="Əvvəlki mahnı"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <button
              type="button"
              className="control-pill__track-btn"
              onClick={handleNext}
              title="Növbəti mahnı"
              aria-label="Növbəti mahnı"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden YouTube background audio iframe */}
      <div className="control-pill__youtube-host" aria-hidden="true">
        <div id={YOUTUBE_PLAYER_ID} />
      </div>
    </div>
  )

  if (!mounted || typeof document === 'undefined') {
    return null
  }

  return createPortal(content, document.body)
}

