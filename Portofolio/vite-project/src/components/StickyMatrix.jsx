import { useEffect, useRef } from 'react'
import './StickyMatrix.css'

function StickyMatrix() {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const dropsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false }) // alpha:false = faster compositing
    const fontSize = 16   // bigger font = fewer columns = less work
    const interval = 100  // ~10fps instead of 60fps — matrix looks fine at low fps
    let cols
    let lastTime = 0
    let isVisible = false

    // Only run the matrix when it's actually visible in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting },
      { threshold: 0.01 }
    )
    observer.observe(canvas)

    const resize = () => {
      // Render at half resolution, CSS scales it up — halves pixel count
      const dpr = Math.min(window.devicePixelRatio, 1) // cap at 1x
      canvas.width  = Math.floor(canvas.offsetWidth  * dpr)
      canvas.height = Math.floor(canvas.offsetHeight * dpr)
      ctx.scale(dpr, dpr)
      cols = Math.floor(canvas.offsetWidth / fontSize)
      dropsRef.current = Array(cols).fill(1)
    }

    resize()

    // Debounced resize
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200)
    }
    window.addEventListener('resize', onResize)

    const draw = (timestamp) => {
      animFrameRef.current = requestAnimationFrame(draw)

      // Skip frames — only draw every `interval` ms
      if (timestamp - lastTime < interval) return
      // Skip entirely when off screen
      if (!isVisible) return
      lastTime = timestamp

      // Fade trail — semi-transparent black rect instead of clearRect
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      ctx.font = `${fontSize}px "Courier New", monospace`

      const drops = dropsRef.current
      const len = drops.length

      for (let i = 0; i < len; i++) {
        const char = Math.random() > 0.5 ? '1' : '0'
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Only draw head — skip separate trail draw to halve fillText calls
        // The fade rect handles the trail effect naturally
        ctx.fillStyle = drops[i] % 3 === 0 ? '#ff3333' : '#cc0000'
        ctx.shadowColor = '#cc0000'
        ctx.shadowBlur = drops[i] % 3 === 0 ? 6 : 0
        ctx.fillText(char, x, y)

        if (y > canvas.offsetHeight && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      // Reset shadow after loop — don't leave it on
      ctx.shadowBlur = 0
    }

    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animFrameRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="sticky-matrix">
      <canvas ref={canvasRef} className="sticky-matrix__canvas" />
      <div className="sticky-matrix__logo">
        <img src="/[logo].svg" alt="Jeremy Joseph Pohar Portfolio Logo" />
      </div>
    </div>
  )
}

export default StickyMatrix