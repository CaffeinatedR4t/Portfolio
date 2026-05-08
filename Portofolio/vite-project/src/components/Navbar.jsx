import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use a ref instead of state for lastScrollY.
  // State triggers re-render + useEffect cleanup/re-subscribe every scroll tick.
  // Ref updates silently — the listener is created ONCE and reads the ref each time.
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      setScrolled(currentScrollY > 50)
      lastScrollYRef.current = currentScrollY  // ref write — no re-render
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // empty dep array — listener created once, never recreated

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''} ${visible ? '' : 'navbar-hidden'}`}
        style={{ mixBlendMode: 'difference' }}
      >
        <div className="nav-left">
          <Logo onClick={closeMobileMenu} />
        </div>

        <div
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span className="arrow-icon">
            {mobileMenuOpen ? '▲' : '▼'}
          </span>
        </div>

        <div className="nav-right desktop-nav">
          <BinaryHoverLink href="#about" text="ABOUT" onClick={closeMobileMenu} />
          <BinaryHoverLink href="#projects" text="PROJECTS" onClick={closeMobileMenu} />
          <BinaryHoverLink href="#contact" text="CONTACT" onClick={closeMobileMenu} />
        </div>
      </nav>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <MobileNavLink href="#about" text="ABOUT" onClick={closeMobileMenu} />
          <MobileNavLink href="#projects" text="PROJECTS" onClick={closeMobileMenu} />
          <MobileNavLink href="#contact" text="CONTACT" onClick={closeMobileMenu} />
        </div>
      </div>
    </>
  )
}

function Logo({ onClick }) {
  const handleClick = (e) => {
    e.preventDefault()
    const homeSection = document.getElementById('home')
    if (homeSection) {
      if (window.lenis) {
        window.lenis.scrollTo(homeSection, {
          offset: 0,
          duration: 1.5,
          easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        })
      } else {
        homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    if (onClick) onClick()
  }

  return (
    <a href="#home" className="nav-logo" onClick={handleClick}>
      <img src="/[logo].svg" alt="Logo" className="logo-image" />
    </a>
  )
}

function BinaryHoverLink({ href, text, onClick }) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const characters = '01'

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text)
      return
    }

    let iteration = 0
    const centerIndex = (text.length - 1) / 2
    const maxIteration = Math.max(centerIndex, text.length - 1 - centerIndex)
    
    // Sync with CSS transition-duration (1.2s = 1200ms)
    const duration = 1200 
    const intervalTime = 40
    const totalTicks = duration / intervalTime
    const increment = maxIteration / totalTicks
    
    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (char === ' ') return ' '
          if (Math.abs(index - centerIndex) <= iteration) {
            return text[index]
          }
          return characters[Math.floor(Math.random() * characters.length)]
        }).join('')
      )
      
      if (iteration >= maxIteration) {
        clearInterval(interval)
        setDisplayText(text) // Ensure final state is perfect
      }
      
      iteration += increment
    }, intervalTime)

    return () => {
      clearInterval(interval)
      setDisplayText(text)
    }
  }, [isHovering, text])

  const handleClick = (e) => {
    e.preventDefault()
    const targetElement = document.getElementById(href.replace('#', ''))
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 2.5,
          easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        })
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    if (onClick) onClick()
  }

  return (
    <a
      href={href}
      className="nav-link"
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Invisible original text locks the width to prevent X-axis shifting */}
      <span style={{ visibility: 'hidden' }}>{text}</span>
      {/* Absolutely positioned scrambled text */}
      <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center' }}>
        {displayText}
      </span>
    </a>
  )
}

function MobileNavLink({ href, text, onClick }) {
  const handleClick = (e) => {
    e.preventDefault()
    const targetElement = document.getElementById(href.replace('#', ''))
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 2.5,
          easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        })
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    if (onClick) onClick()
  }

  return (
    <a href={href} className="mobile-nav-link" onClick={handleClick}>
      <span className="mobile-link-bracket">[</span>
      {text}
      <span className="mobile-link-bracket">]</span>
    </a>
  )
}

export default Navbar