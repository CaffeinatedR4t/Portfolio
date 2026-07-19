import { useEffect, useRef, useState } from 'react'
import './Preloader.css'

// Same easing Mantis uses (GSAP expo.inOut)
const expoInOut = (t) => {
  if (t === 0 || t === 1) return t
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2
}

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading -> ready -> wipe -> done
  const lineParentRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const lineParent = lineParentRef.current
    const counter = counterRef.current
    let rafId
    let startTime = null
    let lastValue = 0

    // 0 -> 88 slow ramp, hold a beat, 88 -> 100 quick — like Mantis
    const rampDuration = 3200
    const finishDelay = 250
    const finishDuration = 700

    const positionCounter = (value) => {
      const parentWidth = lineParent.offsetWidth
      const textWidth = counter.offsetWidth
      const x = (parentWidth - textWidth) * (value / 100)
      lineParent.style.setProperty('--x', `${x}px`)
      lineParent.style.setProperty('--textWidth', `${textWidth}px`)
      lineParent.style.setProperty('--progress', value / 100)
      counter.style.transform = `translateX(${x}px)`
    }

    const tick = (now) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      let value

      if (elapsed <= rampDuration) {
        value = expoInOut(elapsed / rampDuration) * 88
      } else if (elapsed <= rampDuration + finishDelay) {
        value = 88
      } else if (elapsed <= rampDuration + finishDelay + finishDuration) {
        const t = (elapsed - rampDuration - finishDelay) / finishDuration
        value = 88 + expoInOut(t) * 12
      } else {
        positionCounter(100)
        setProgress(100)
        setPhase('wipe')
        return
      }

      lastValue = value
      positionCounter(value)
      setProgress(value)
      rafId = requestAnimationFrame(tick)
    }

    const handleResize = () => positionCounter(lastValue)

    rafId = requestAnimationFrame(tick)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // After wipe animation, notify parent
  useEffect(() => {
    if (phase !== 'wipe') return
    const fadeTimer = setTimeout(() => setPhase('done'), 900)
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 1700)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [phase, onComplete])

  return (
    <div id="preloader" className={`phase-${phase}`}>
      <div className="loader-line-parent" ref={lineParentRef}>
        <div className="loader-counter" ref={counterRef}>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="loader-line"></div>
      </div>

      <div className="loader-branding-bottom">
        <h1 className="loader-name">Jeremy Joseph Pohar</h1>
        <p className="loader-tagline">PORTFOLIO</p>
      </div>

      {/* Click to enter prompt — appears after loading completes */}
      <div className="loader-enter">
        <span>CLICK TO ENTER</span>
      </div>
    </div>
  )
}

export default Preloader
