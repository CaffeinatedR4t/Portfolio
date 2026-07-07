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
        <h2>COMPUTER SCIENCE STUDENT</h2>
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
        
        <p className="home-quote">
          "IN PURSUIT OF GREATNESS."<br />
          [Jeremy J. Pohar]
        </p>
        
        <p className="home-year">©2026</p>
      </motion.div>

      <motion.div
        className="home-bottom-right"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: easeOutExpo }}
      >
        <div className="status-card">
          <div className="status-preview">
            <span>AI TRAINER</span>
            <span>FULL STACK DEV</span>
            <span>IT SECURITY</span>
          </div>
          <p className="status-title">AVAILABLE FOR WORK.</p>
          <a href="#projects" className="status-link">VIEW PROJECTS</a>
        </div>
      </motion.div>

    </section>
  )
}

export default Home