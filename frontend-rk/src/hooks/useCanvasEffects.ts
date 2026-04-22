import { useEffect } from 'react'

export function useCanvasEffects(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const body = document.body
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
    const canvasSweep = document.getElementById('canvas5') as HTMLCanvasElement | null

    if (!canvas || !canvasSweep) {
      return
    }

    const context = canvas.getContext('2d')
    const sweepContext = canvasSweep.getContext('2d')

    if (!context || !sweepContext) {
      return
    }

    const dotRadius = 2
    const dotMargin = 40
    const gridPadding = 20
    const spaceForOneDot = 2 * dotMargin

    let animationFrameId = 0
    let restartTimeoutId = 0
    let xPos = gridPadding

    const getPalette = () => {
      const isDark = body.classList.contains('theme-dark')

      return {
        dot: isDark ? 'rgba(238, 243, 255, 0.95)' : 'rgba(0, 0, 0, 1)',
        sweep: isDark ? 'rgba(238, 243, 255, 0.22)' : 'rgba(0, 0, 0, 0.16)',
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvasSweep.width = window.innerWidth
      canvasSweep.height = window.innerHeight
    }

    const drawDot = (target: CanvasRenderingContext2D, x: number, y: number) => {
      target.fillStyle = getPalette().dot
      target.beginPath()
      target.arc(x, y, dotRadius, 0, Math.PI * 2, true)
      target.fill()
    }

    const animateSweep = (position: number) => {
      sweepContext.lineWidth = 0.15
      sweepContext.strokeStyle = getPalette().sweep
      sweepContext.clearRect(0, 0, canvasSweep.width, canvasSweep.height)

      for (let j = 0; j < (window.innerHeight - gridPadding) / spaceForOneDot; j += 1) {
        const yPos = gridPadding + j * spaceForOneDot
        sweepContext.beginPath()
        sweepContext.moveTo(Math.min(position, canvas.width - gridPadding), yPos)
        sweepContext.lineTo(Math.max(gridPadding, position - 4 * spaceForOneDot), yPos)
        sweepContext.stroke()
      }

      for (let i = 0; i < (window.innerWidth - gridPadding) / spaceForOneDot; i += 1) {
        for (let j = 0; j < (window.innerHeight - gridPadding) / spaceForOneDot; j += 1) {
          const dotXPos = gridPadding + i * spaceForOneDot
          const dotYPos = gridPadding + j * spaceForOneDot
          const dist = position - dotXPos

          if (dist > 0 && dist < spaceForOneDot * 4) {
            drawDot(sweepContext, dotXPos, dotYPos)
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(() => {
        if (xPos + 5 - 4 * spaceForOneDot > canvas.width - gridPadding) {
          xPos = gridPadding + 5
          restartTimeoutId = window.setTimeout(() => {
            animateSweep(xPos)
          }, 1500)
          return
        }

        xPos += 5
        animateSweep(xPos)
      })
    }

    const handleResize = () => {
      resizeCanvas()
      context.clearRect(0, 0, canvas.width, canvas.height)
      sweepContext.clearRect(0, 0, canvasSweep.width, canvasSweep.height)
    }

    resizeCanvas()
    animateSweep(gridPadding)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(restartTimeoutId)
      context.clearRect(0, 0, canvas.width, canvas.height)
      sweepContext.clearRect(0, 0, canvasSweep.width, canvasSweep.height)
    }
  }, [enabled])
}
