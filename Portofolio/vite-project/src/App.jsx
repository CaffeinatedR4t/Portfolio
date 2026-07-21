import { useEffect, useState, useRef } from 'react'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import Lenis from '@studio-freight/lenis'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyMatrix from './components/StickyMatrix'
import ScrollReveal from './components/ScrollReveal'
import AboutModal from './components/AboutModal'
import WebGLCursor from './components/WebGLCursor'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)
  const muteBtnRef = useRef(null)
  const bgMusicRef = useRef(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
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

  // Global hover sound — same approach as bymonolog.com (Howler-style Web Audio):
  // eager AudioContext + preloaded buffer, resume() attempted immediately and on
  // every candidate gesture until the context runs. On origins Chrome trusts
  // (visited/engaged before), the immediate resume() succeeds → zero-click sound.
  useEffect(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return

    const ctx = new AudioCtx()
    let buffer = null

    fetch('/audio/lesiakower-minimalist-button-hover-sound-effect-399749.wav')
      .then(r => r.arrayBuffer())
      .then(data => ctx.decodeAudioData(data))
      .then(decoded => { buffer = decoded })
      .catch(() => {})

    const unlockEvents = ['pointerdown', 'mousedown', 'keydown', 'touchstart', 'touchend', 'click', 'mousemove', 'wheel']

    const removeUnlockListeners = () => {
      unlockEvents.forEach(ev => document.removeEventListener(ev, tryResume, true))
    }

    const tryResume = () => {
      if (ctx.state !== 'suspended') { removeUnlockListeners(); return }
      ctx.resume().then(() => {
        if (ctx.state === 'running') removeUnlockListeners()
      }).catch(() => {})
    }

    // Attempt immediately — succeeds without any gesture when Chrome
    // already trusts this origin (exactly how bymonolog feels click-free)
    tryResume()
    unlockEvents.forEach(ev => document.addEventListener(ev, tryResume, { capture: true, passive: true }))

    const playHover = () => {
      if (window.isMuted || !buffer) return
      if (ctx.state === 'suspended') { tryResume(); return }
      const src = ctx.createBufferSource()
      src.buffer = buffer
      const gain = ctx.createGain()
      gain.gain.value = 1.5
      src.connect(gain)
      gain.connect(ctx.destination)
      src.start(0)
    }

    let currentHovered = null
    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, .icon-box, .project-list-row')
      if (target && target !== currentHovered) {
        currentHovered = target
        playHover()
      } else if (!target) {
        currentHovered = null
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    return () => {
      removeUnlockListeners()
      document.removeEventListener('mouseover', handleMouseOver)
      ctx.close()
    };
  }, []);

  // Background music control & tab visibility
  useEffect(() => {
    const audio = bgMusicRef.current;
    if (!audio) return;

    audio.volume = 0.2; // Set a reasonable background volume
    
    const originalTitle = "Jeremy Joseph Pohar - Portfolio"; // or we could read it once, but hardcoding or reading is fine. Let's read it:
    // Wait, reading it inside useEffect is safer:
    
    let titleInterval;

    const handlePlayPause = () => {
      // Pause if user mutes OR if they switch tabs
      if (isMuted || document.hidden) {
        audio.pause();
      } else {
        audio.muted = false;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }

      // Title Animation on hold
      if (document.hidden) {
        let dotCount = 1;
        document.title = "Paused.";
        clearInterval(titleInterval);
        titleInterval = setInterval(() => {
          dotCount = (dotCount % 3) + 1;
          document.title = "Paused" + ".".repeat(dotCount);
        }, 500);
      } else {
        clearInterval(titleInterval);
        document.title = "Jeremy Joseph Pohar | Portfolio";
      }
    };

    // Trigger on state change
    handlePlayPause();

    // Listen for tab switching
    document.addEventListener('visibilitychange', handlePlayPause);
    
    return () => {
      document.removeEventListener('visibilitychange', handlePlayPause);
      clearInterval(titleInterval);
      document.title = "Jeremy Joseph Pohar | Portfolio";
    };
  }, [isMuted]);

  // Slide mute button out on scroll, back when idle
  useEffect(() => {
    let timer
    const handleScroll = () => {
      muteBtnRef.current?.classList.add('is-scrolling')
      clearTimeout(timer)
      timer = setTimeout(() => muteBtnRef.current?.classList.remove('is-scrolling'), 800)
    }
    window.addEventListener('wheel', handleScroll, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <div className="App" style={{ background: '#000000' }}>
      <WebGLCursor />
      <audio
        ref={bgMusicRef}
        src="/audio/ytmp3free.cc_the-formula-youtubemp3free.org.mp3"
        loop
      />
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      <Navbar onAboutClick={() => setIsAboutOpen(true)} />

      <Home />
      <About />
      <Projects />
      <ScrollReveal />
      <Services />
      <Contact />

        {/* Footer sticky wrapper */}
        <div className="footer-sticky-wrapper">
          <Footer />
        </div>

        <div className="matrix-reveal-spacer" aria-hidden="true" />

        <StickyMatrix />

        <button
          ref={muteBtnRef}
          className="mute-btn"
          onClick={() => setIsMuted(prev => !prev)}
          aria-label="Toggle Sound"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
    </div>
  )
}

export default App
