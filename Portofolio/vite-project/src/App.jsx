import { useEffect, useState, useRef } from 'react'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import Lenis from '@studio-freight/lenis'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyMatrix from './components/StickyMatrix'
import ScrollReveal from './components/ScrollReveal'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenisInstance
    window.lenis = lenisInstance

    function raf(time) {
      lenisInstance.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') return
      e.preventDefault()
      const targetElement = document.querySelector(href)
      if (targetElement) {
        lenisInstance.scrollTo(targetElement, {
          offset: -80,
          duration: 1,
          easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        })
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      if (lenisRef.current) lenisRef.current.destroy()
      if (window.lenis) delete window.lenis
    }
  }, [])

  // Sync global mute state for other components to access
  useEffect(() => {
    window.isMuted = isMuted;
  }, [isMuted]);

  // Global hover sound effect
  useEffect(() => {
    const hoverSound = new Audio('/audio/lesiakower-minimalist-button-hover-sound-effect-399749.wav');
    hoverSound.volume = 0.4;
    let currentHovered = null;

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, .icon-box, .project-list-row');
      
      if (target && target !== currentHovered) {
        currentHovered = target;
        if (!window.isMuted) {
          hoverSound.currentTime = 0;
          hoverSound.play().catch(() => {
            // Ignore autoplay restrictions until user interacts with the page
          });
        }
      } else if (!target) {
        currentHovered = null;
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <div className="App">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <Navbar />
      <Home />
      <About />
      <Projects />
      <ScrollReveal />
      <Contact />

      {/* Footer sticky wrapper — sticks to bottom while spacer scrolls.
          The spacer below is what gives scroll room for the footer
          to unstick and slide away, revealing the matrix. */}
      <div className="footer-sticky-wrapper">
        <Footer />
      </div>

      {/* Spacer — exactly 80vh (same as matrix height).
          This sits AFTER the sticky footer in normal flow.
          Lenis scrolls through it while the footer stays pinned,
          then as the spacer ends the footer slides away. */}
      <div className="matrix-reveal-spacer" aria-hidden="true" />

      <StickyMatrix />
      
      <button 
        className="mute-btn" 
        onClick={() => setIsMuted(!isMuted)}
        aria-label="Toggle Sound"
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  )
}

export default App