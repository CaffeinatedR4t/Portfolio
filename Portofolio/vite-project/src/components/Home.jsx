import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Home.css'

const easeOutExpo = [0.16, 1, 0.3, 1]

function Home() {
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
    <section id="home" className="section">
      <motion.div
        className="home-top-left"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
      >
        <h1 className="sr-only">Jeremy Joseph Pohar - Web Developer & AI Trainer Portfolio</h1>
        <h2>FULLSTACK DEVELOPER</h2>
        <p>JAKARTA, INDONESIA</p>
      </motion.div>

      <motion.video 
        className="home-background-video" 
        autoPlay 
        loop 
        muted 
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
      >
        <source src="/videos/particleizer_remix_scene.webm" type="video/webm" />
      </motion.video>

      <motion.div
        className="home-bottom-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
      >
        <button className="cta-button" onClick={scrollToContact}>
          CONNECT
        </button>
        
        
        <p className="home-year">©2026</p>
      </motion.div>


    </section>
  )
}

export default Home

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
  }, [text, isHovering, characters])

  return (
    <span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ display: 'inline-block', minWidth: `${text.length}ch` }}
    >
      {displayText}
    </span>
  )
}