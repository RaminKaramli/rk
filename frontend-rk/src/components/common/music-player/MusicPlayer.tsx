import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

type YouTubePlayer = {
  destroy: () => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  getVideoData: () => { author?: string; title?: string }
  loadVideoById: (videoId: string) => void
  pauseVideo: () => void
  playVideo: () => void
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void
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
  'https://www.youtube.com/watch?v=fDrTbLXHKu8&list=RDfDrTbLXHKu8&start_radio=1',
  'https://www.youtube.com/watch?v=PIh2xe4jnpk&list=LL&index=555',
  'https://www.youtube.com/watch?v=pAgnJDJN4VA&list=RDpAgnJDJN4VA&start_radio=1',
  'https://www.youtube.com/watch?v=X9s_CQx4ylU&list=LL&index=411',
] as const
const YOUTUBE_PLAYER_ID = 'rk-youtube-player'
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
  return rawTitle.replace(/\(official video\)/i, '').replace(/\(official music video\)/i, '').trim()
}

function getArtistFromTitle(title: string): string {
  const match = title.split(/\s[-–]\s/)[0]?.trim()
  return match && match.length > 0 ? match : 'Music'
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

function formatTime(timeValue: number): string {
  if (!Number.isFinite(timeValue) || timeValue < 0) {
    return '0:00'
  }

  const totalSeconds = Math.floor(timeValue)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const playerRef = useRef<YouTubePlayer | null>(null)
  const shouldAutoPlayRef = useRef(false)
  const tickerRef = useRef<number | null>(null)
  const [activePartIndex, setActivePartIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [author, setAuthor] = useState('Music')
  const [song, setSong] = useState('Requested Song')
  const [ready, setReady] = useState(false)

  const progressPercent = useMemo(() => {
    if (!duration) {
      return 0
    }

    return Math.min((currentTime / duration) * 100, 100)
  }, [currentTime, duration])

  const activeVideoId = useMemo(() => extractVideoId(YOUTUBE_URLS[activePartIndex] ?? YOUTUBE_URLS[0]), [activePartIndex])

  const stopTicker = () => {
    if (tickerRef.current) {
      cancelAnimationFrame(tickerRef.current)
      tickerRef.current = null
    }
  }

  const tick = () => {
    const player = playerRef.current
    if (!player) {
      return
    }

    const time = player.getCurrentTime?.() ?? 0
    const full = player.getDuration?.() ?? 0
    setCurrentTime(time)
    setDuration(full)
    tickerRef.current = requestAnimationFrame(tick)
  }

  const startTicker = () => {
    if (tickerRef.current) {
      return
    }

    tickerRef.current = requestAnimationFrame(tick)
  }

  const updateVideoMeta = () => {
    const player = playerRef.current
    if (!player) {
      return
    }

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
  }

  useEffect(() => {
    let cancelled = false

    void (async () => {
      await loadYouTubeApi()
      if (cancelled || !window.YT?.Player) {
        return
      }

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
          onReady: (event) => {
            if (cancelled) {
              return
            }

            setReady(true)
            setDuration(event.target.getDuration?.() ?? 0)
            updateVideoMeta()

            if (shouldAutoPlayRef.current) {
              shouldAutoPlayRef.current = false
              event.target.playVideo()
            }
          },
          onStateChange: (event) => {
            const states = window.YT?.PlayerState
            if (!states) {
              return
            }

            if (event.data === states.PLAYING) {
              setIsPlaying(true)
              updateVideoMeta()
              startTicker()
              return
            }

            if (event.data === states.ENDED) {
              stopTicker()
              shouldAutoPlayRef.current = true
              setReady(false)
              setIsPlaying(true)
              setCurrentTime(0)
              setDuration(0)
              setActivePartIndex((previousValue) => (previousValue + 1) % YOUTUBE_URLS.length)
              return
            }

            if (event.data === states.PAUSED) {
              setIsPlaying(false)
              stopTicker()
              const current = event.target.getCurrentTime?.() ?? 0
              const full = event.target.getDuration?.() ?? 0
              setCurrentTime(current)
              setDuration(full)
            }
          },
        },
      })
    })()

    return () => {
      cancelled = true
      stopTicker()
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [activeVideoId])

  const handleTogglePlay = () => {
    const player = playerRef.current
    if (!player) {
      return
    }

    const states = window.YT?.PlayerState
    const currentState = player.getPlayerState?.()
    const currentlyPlaying = currentState === states?.PLAYING || currentState === states?.BUFFERING

    if (currentlyPlaying) {
      shouldAutoPlayRef.current = false
      player.pauseVideo()
      setIsPlaying(false)
      stopTicker()
      setCurrentTime(player.getCurrentTime?.() ?? 0)
      return
    }

    if (!ready) {
      shouldAutoPlayRef.current = true
      return
    }

    player.playVideo()
    setIsPlaying(true)
    startTicker()
  }

  const handleSeek = (event: MouseEvent<HTMLButtonElement>) => {
    const player = playerRef.current
    if (!player || !duration) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
    const seekTo = ratio * duration
    player.seekTo(seekTo, true)
    setCurrentTime(seekTo)
  }

  const handlePrev = () => {
    shouldAutoPlayRef.current = true
    setReady(false)
    setIsPlaying(true)
    setCurrentTime(0)
    setDuration(0)
    setActivePartIndex((previousValue) => {
      if (previousValue === 0) {
        return YOUTUBE_URLS.length - 1
      }

      return previousValue - 1
    })
  }

  const handleNext = () => {
    shouldAutoPlayRef.current = true
    setReady(false)
    setIsPlaying(true)
    setCurrentTime(0)
    setDuration(0)
    setActivePartIndex((previousValue) => (previousValue + 1) % YOUTUBE_URLS.length)
  }

  return (
    <div className={`player ${isPlaying ? 'play' : ''}`}>
      <div className="player__bar">
        <div className="player__album">
          <div
            className="player__albumImg active-song"
            data-author={author}
            data-song={song}
            style={{ backgroundImage: `url(https://i.ytimg.com/vi/${activeVideoId}/hqdefault.jpg)` }}
          />
        </div>

        <div className="player__content">
          <div className="player__timeline">
            <p className="player__author">{author}</p>
            <p className="player__song">{song}</p>
            <button type="button" className="player__timelineBar" onClick={handleSeek} aria-label="Seek song position">
              <span className="player__playhead" style={{ width: `${progressPercent}%` }} />
            </button>
          </div>

          <p className="player__time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </p>
        </div>

        <div className="player__controls">
          <button type="button" className="player__prev" onClick={handlePrev} aria-label="Previous" title="Previous">
            <Icon icon="material-symbols:skip-previous-rounded" className="icon iconify-color mdi--previous-title" aria-hidden="true" />
          </button>

          <button type="button" className="player__play" onClick={handleTogglePlay} aria-label={isPlaying ? 'Pause song' : 'Play song'}>
            <Icon icon="mdi:play" className="icon play" aria-hidden="true" />
            <Icon icon="material-symbols:pause" className="icon pause" aria-hidden="true" />
          </button>

          <button type="button" className="player__next" onClick={handleNext} aria-label="next" title="next">
            <Icon icon="material-symbols:skip-next-rounded" className="icon iconify-color mdi--next-title" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="player__youtube-host" aria-hidden="true">
        <div id={YOUTUBE_PLAYER_ID} />
      </div>
    </div>
  )
}
