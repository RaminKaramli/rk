import { useEffect } from 'react'

export function useCanvasEffects(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const body = document.body
    const homeSection = document.getElementById('home-section')
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

    let visibleDotCount = 3
    const dotRadius = 2
    const dotMargin = 40
    const gridPadding = 20
    const smallDotRadius = 1
    const smallDotMargin = 10
    const spaceForOneDot = 2 * dotMargin
    const spaceForSmallDot = 2 * smallDotMargin

    let animationFrameId = 0
    let restartTimeoutId = 0
    let xPos = gridPadding

    const getPalette = () => {
      const isDark = body.classList.contains('theme-dark')

      return {
        dot: isDark ? 'rgba(238, 243, 255, 0.95)' : 'rgba(0, 0, 0, 1)',
        faint: isDark ? 'rgba(238, 243, 255, 0.36)' : 'rgba(0, 0, 0, 0.3)',
        line: isDark ? 'rgba(238, 243, 255, 0.74)' : 'rgba(0, 0, 0, 0.95)',
        sweep: isDark ? 'rgba(238, 243, 255, 0.22)' : 'rgba(0, 0, 0, 0.16)',
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvasSweep.width = window.innerWidth
      canvasSweep.height = window.innerHeight
      visibleDotCount = canvas.width < 600 ? 2 : 3
    }

    const calculateDistance = (mouseX: number, mouseY: number, dotX: number, dotY: number) => {
      return Math.sqrt((mouseX - dotX) ** 2 + (mouseY - dotY) ** 2)
    }

    const isInsideHomeSection = (x: number, y: number) => {
      if (!homeSection) {
        return true
      }

      const bounds = homeSection.getBoundingClientRect()

      return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom
    }

    const drawDot = (target: CanvasRenderingContext2D, x: number, y: number) => {
      target.fillStyle = getPalette().dot
      target.beginPath()
      target.arc(x, y, dotRadius, 0, Math.PI * 2, true)
      target.fill()
    }

    const drawSmallDot = (target: CanvasRenderingContext2D, x: number, y: number) => {
      target.fillStyle = getPalette().faint
      target.beginPath()
      target.arc(x, y, smallDotRadius, 0, Math.PI * 2, true)
      target.fill()
    }

    const drawLines = (target: CanvasRenderingContext2D, x: number, y: number) => {
      target.strokeStyle = getPalette().line
      target.beginPath()
      target.moveTo(x, y)
      target.lineTo(x - dotMargin, y)
      target.moveTo(x, y)
      target.lineTo(x + dotMargin, y)
      target.moveTo(x, y)
      target.lineTo(x, y + dotMargin)
      target.moveTo(x, y)
      target.lineTo(x, y - dotMargin)
      target.stroke()
    }

    const drawGrid = (mouseX = -1000, mouseY = -1000) => {
      context.lineWidth = 0.2

      for (let i = 0; i < (window.innerWidth - gridPadding) / spaceForOneDot; i += 1) {
        for (let j = 0; j < (window.innerHeight - gridPadding) / spaceForOneDot; j += 1) {
          const dotXPos = gridPadding + i * spaceForOneDot
          const dotYPos = gridPadding + j * spaceForOneDot
          const dist = calculateDistance(mouseX, mouseY, dotXPos, dotYPos)

          if (dist < spaceForOneDot * visibleDotCount) {
            drawDot(context, dotXPos, dotYPos)
            drawLines(context, dotXPos, dotYPos)
          }
        }
      }

      for (let i = 0; i < (window.innerWidth - gridPadding) / spaceForSmallDot; i += 1) {
        for (let j = 0; j < (window.innerHeight - gridPadding) / spaceForSmallDot; j += 1) {
          const dotXPos = gridPadding + i * spaceForSmallDot
          const dotYPos = gridPadding + j * spaceForSmallDot
          const dist = calculateDistance(mouseX, mouseY, dotXPos, dotYPos)

          if (dist < spaceForOneDot * visibleDotCount) {
            drawSmallDot(context, dotXPos, dotYPos)
          }
        }
      }
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

    const handleMouseMove = (event: MouseEvent) => {
      if (!isInsideHomeSection(event.clientX, event.clientY)) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid(event.clientX, event.clientY)
    }

    const handleResize = () => {
      resizeCanvas()
      context.clearRect(0, 0, canvas.width, canvas.height)
      sweepContext.clearRect(0, 0, canvasSweep.width, canvasSweep.height)
      drawGrid()
    }

    const handleScroll = () => {
      if (!homeSection) {
        return
      }

      const bounds = homeSection.getBoundingClientRect()
      const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight

      if (!isVisible) {
        context.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    resizeCanvas()
    drawGrid()
    animateSweep(gridPadding)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(restartTimeoutId)
      context.clearRect(0, 0, canvas.width, canvas.height)
      sweepContext.clearRect(0, 0, canvasSweep.width, canvasSweep.height)
    }
  }, [enabled])
}
