import { useEffect, useState } from 'react'

const TIME_LOCALE = 'en-US'

function formatFooterClock(date: Date, timeZone: string) {
  const timeFormatter = new Intl.DateTimeFormat(TIME_LOCALE, {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    second: '2-digit',
    timeZone,
  })

  const dateFormatter = new Intl.DateTimeFormat(TIME_LOCALE, {
    day: 'numeric',
    month: 'long',
    timeZone,
    weekday: 'long',
    year: 'numeric',
  })

  return `${timeFormatter.format(date)} • ${dateFormatter.format(date)}`
}

export function useFooterClock(timeZone = 'Asia/Baku') {
  const [clock, setClock] = useState(() => formatFooterClock(new Date(), timeZone))

  useEffect(() => {
    const render = () => {
      setClock(formatFooterClock(new Date(), timeZone))
    }

    render()
    const intervalId = window.setInterval(render, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [timeZone])

  return clock
}
