import { useState, useEffect, useRef } from 'react'
import './Footer.css'
import { FaChevronUp } from 'react-icons/fa'
import { motion, useScroll, useTransform } from 'framer-motion'

const easeOutExpo = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

function BinaryScrambleText({ text }) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const characters = '01'

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text)
      return
    }

    let iteration = 0
    const maxIteration = text.length - 1

    const duration = 350
    const intervalTime = 25
    const totalTicks = duration / intervalTime
    const increment = maxIteration / totalTicks

    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (char === ' ') return ' '
          if (index <= iteration) {
            return text[index]
          }
          return characters[Math.floor(Math.random() * characters.length)]
        }).join('')
      )

      if (iteration >= maxIteration) {
        clearInterval(interval)
        setDisplayText(text)
      }

      iteration += increment
    }, intervalTime)

    return () => {
      clearInterval(interval)
      setDisplayText(text)
    }
  }, [isHovering, text])

  return (
    <span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <span style={{ visibility: 'hidden' }}>{text}</span>
      <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'left' }}>
        {displayText}
      </span>
    </span>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = (e) => {
    e.preventDefault()
    const homeSection = document.getElementById('home') || document.body
    
    if (window.lenis) {
      window.lenis.scrollTo(homeSection, {
        offset: 0,
        duration: 1,
        easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const targetSection = document.getElementById(sectionId)
    
    if (targetSection) {
      if (window.lenis) {
        window.lenis.scrollTo(targetSection, {
          offset: -80,
          duration: 2,
          easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        })
      } else {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const scrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    
    if (contactSection) {
      if (window.lenis) {
        window.lenis.scrollTo(contactSection, {
          offset: -80,
          duration: 1,
          easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        })
      } else {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <footer className="footer">
      <div className="footer-cta">
        <FooterCTA />
      </div>

      <div className="footer-main">
        <motion.div
          className="footer-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="footer-col" variants={fadeUp}>
            <div className="footer-logo">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" 
                      fontSize="18" fontWeight="bold" fill="currentColor">
                  JJP
                </text>
              </svg>
              <h3>WORK WITH ME</h3>
            </div>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>HELLO</h4>
            <p><a href="mailto:jeremy.yosep@gmail.com">jeremy.yosep@gmail.com</a></p>
            <p className="address">
              Jakarta, Indonesia
            </p>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>SOCIAL</h4>
            <ul>
              <li><a href="https://instagram.com/jeremyjpohar" target="_blank" rel="noopener noreferrer"><BinaryScrambleText text="INSTAGRAM" /></a></li>
              <li><a href="https://www.linkedin.com/in/jeremyjosephpohar/" target="_blank" rel="noopener noreferrer"><BinaryScrambleText text="LINKEDIN" /></a></li>
              <li><a href="https://github.com/CaffeinatedR4t" target="_blank" rel="noopener noreferrer"><BinaryScrambleText text="GITHUB" /></a></li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>OTHER</h4>
            <ul>
              <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}><BinaryScrambleText text="PROJECTS" /></a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}><BinaryScrambleText text="ABOUT" /></a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}><BinaryScrambleText text="CONTACT" /></a></li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="footer-bottom"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="footer-bottom-left">
          <div className="footer-brand"><img src="/[logo].svg" alt="Jeremy Joseph Pohar Portfolio Logo" className="footer-logo-img" /></div>
          <p>All content ©<br />Jeremy Joseph Pohar {currentYear}</p>
        </div>
        <div className="footer-bottom-center">
          <p>Portfolio by Jeremy Joseph Pohar</p>
        </div>
        <button className="back-to-top" onClick={scrollToTop}>
          <FaChevronUp />
        </button>
      </motion.div>
    </footer>
  )
}

export default Footer

const FooterCTA = () => {
  const ctaRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ['start 90%', 'end 50%'],
  })

  const words = ['READY', 'TO', 'BUILD', 'RESILIENT', 'SOLUTIONS?']

  return (
    <h2 ref={ctaRef}>
      {words.map((word, i) => {
        const step = 1 / words.length
        const start = i * step
        const end = (i + 1) * step
        return (
          <span key={i}>
            <CTAWord word={word} progress={scrollYProgress} start={start} end={end} />
            {i === 2 ? <br /> : ' '}
          </span>
        )
      })}
    </h2>
  )
}

function CTAWord({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  const color   = useTransform(progress, [start, end], ['#444444', '#ffffff'])
  return (
    <motion.span style={{ opacity, color, display: 'inline-block', willChange: 'opacity, color' }}>
      {word}
    </motion.span>
  )
}