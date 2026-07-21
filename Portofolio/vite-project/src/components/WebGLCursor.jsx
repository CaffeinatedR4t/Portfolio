import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let width = window.innerWidth
    let height = window.innerHeight
    
    // Dot size / grid resolution
    const gridSize = 13 // Increased significantly to spread out the dot density

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      // High DPI handling
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }
    
    window.addEventListener('resize', resize)
    resize()

    const mouse = { x: width / 2, y: height / 2, hover: 0 }
    const lastMouse = { x: width / 2, y: height / 2 }
    
    let isMoving = false
    let moveTimeout

    // A Map to track active grid cells. Key: "x,y", Value: { life: float }
    const activeCells = new Map()

    const addCellsInRadius = (cx, cy, radius, hoverState) => {
      const startCol = Math.floor((cx - radius) / gridSize)
      const endCol = Math.ceil((cx + radius) / gridSize)
      const startRow = Math.floor((cy - radius) / gridSize)
      const endRow = Math.ceil((cy + radius) / gridSize)

      for (let c = startCol; c <= endCol; c++) {
        for (let r = startRow; r <= endRow; r++) {
          const x = c * gridSize
          const y = r * gridSize
          
          // Center of this cell
          const cellCx = x + gridSize / 2
          const cellCy = y + gridSize / 2
          
          const dist = Math.hypot(cellCx - cx, cellCy - cy)
          if (dist < radius) {
            const key = `${c},${r}`
            
            // Add random noise to the life so they pop out/dissolve randomly as they fade
            const initialLife = 1.0 + Math.random() * 0.8 + (hoverState * 0.5)
            
            // Calculate normalized distance from the center (0 = center, 1 = edge)
            const normalizedDist = dist / radius

            const existing = activeCells.get(key)
            if (!existing || existing.life < initialLife) {
              // Store normalizedDist so we can shrink the radius as it decays!
              activeCells.set(key, { life: initialLife, x, y, normalizedDist })
            }
          }
        }
      }
    }

    const onMouseMove = (e) => {
      isMoving = true
      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => { 
        isMoving = false
        // Removed activeCells.clear() so it smoothly fades out instead of instantly vanishing!
      }, 50) 

      lastMouse.x = mouse.x
      lastMouse.y = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const onMouseOver = (e) => {
      const t = e.target
      if (t.closest('a') || t.closest('button') || t.closest('.btn')) {
        mouse.hover = 1
      }
    }

    const onMouseOut = () => { mouse.hover = 0 }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    let currentHover = 0
    let animationFrameId;

    const lerp = (start, end, t) => start * (1 - t) + end * t

    const render = () => {
      currentHover += (mouse.hover - currentHover) * 0.15

      // Only spawn cells if we are moving AND NOT hovering a button!
      // This causes the trail to smoothly fade away into nothing when you mouse over a button.
      if (isMoving && mouse.hover === 0) {
        const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y)
        const steps = Math.max(1, Math.floor(dist / (gridSize / 2)))
        
        const currentRadius = 35 + (currentHover * 40)

        for (let i = 0; i <= steps; i++) {
          const t = steps === 0 ? 1 : i / steps
          const px = lerp(lastMouse.x, mouse.x, t)
          const py = lerp(lastMouse.y, mouse.y, t)
          
          addCellsInRadius(px, py, currentRadius, currentHover)
        }
        
        lastMouse.x = mouse.x
        lastMouse.y = mouse.y
      }

      ctx.clearRect(0, 0, width, height)
      
      // USER REQUEST: Make the color red again
      ctx.fillStyle = '#ff0000'
      
      ctx.beginPath()

      const dotSize = 2.5 
      const halfGrid = gridSize / 2

      for (const [key, cell] of activeCells.entries()) {
        cell.life -= 0.08 
        
        if (cell.life <= 0.01) {
          activeCells.delete(key)
        } else {
          // WATER TRAIL TRICK: Only draw the dot if its life is greater than its distance from the center.
          if (cell.life > cell.normalizedDist) {
            
            // LAYER 1: The sparse outer halo grid
            ctx.rect(
              cell.x + (gridSize - dotSize) / 2,
              cell.y + (gridSize - dotSize) / 2,
              dotSize,
              dotSize
            )

            // LAYER 2: The medium density diagonal offset (checkerboard)
            if (cell.life > 0.7) {
              ctx.rect(
                cell.x + halfGrid + (gridSize - dotSize) / 2,
                cell.y + halfGrid + (gridSize - dotSize) / 2,
                dotSize,
                dotSize
              )
            }

            // LAYER 3: The ultra-dense solid core (Cross-hatch pattern)
            // This 3rd layer fills in the final gaps horizontally and vertically when density is maxed out
            if (cell.life > 1.2) {
              // Horizontal in-between dot
              ctx.rect(
                cell.x + halfGrid + (gridSize - dotSize) / 2,
                cell.y + (gridSize - dotSize) / 2,
                dotSize,
                dotSize
              )
              // Vertical in-between dot
              ctx.rect(
                cell.x + (gridSize - dotSize) / 2,
                cell.y + halfGrid + (gridSize - dotSize) / 2,
                dotSize,
                dotSize
              )
            }
          }
        }
      }
      
      ctx.fill()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(moveTimeout)
    }
  }, [])

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null

  return (
    <canvas 
      ref={canvasRef} 
      className="webgl-cursor-wrapper"
    />
  )
}
