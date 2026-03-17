import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const rafIdRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.2
      currentY += (mouseY - currentY) * 0.2
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`
      trail.style.transform  = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`
      rafIdRef.current = requestAnimationFrame(animate)
    }

    rafIdRef.current = requestAnimationFrame(animate)

    const handleMouseEnter = (e) => {
      const target = e.target
      if (target?.nodeType === 1 && target.matches(
        'a, button, input, textarea, .project-folder-card, .cta-button, .arrow-button, .status-link'
      )) setIsHovering(true)
    }

    const handleMouseLeave = (e) => {
      const target = e.target
      if (target?.nodeType === 1 && target.matches(
        'a, button, input, textarea, .project-folder-card, .cta-button, .arrow-button, .status-link'
      )) setIsHovering(false)
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`retro-cursor ${isHovering ? 'hovering' : ''}`}
      >
        <div className="pixel-cursor">
          <div className="pixel-row">
            <span className="pixel"></span>
            <span className="pixel"></span>
          </div>
          <div className="pixel-row">
            <span className="pixel"></span>
            <span className="pixel fill"></span>
          </div>
        </div>
      </div>

      <div ref={trailRef} className="cursor-trail" />
    </>
  )
}

export default CustomCursor