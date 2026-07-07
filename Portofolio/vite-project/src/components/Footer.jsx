import './Footer.css'
import { FaChevronUp } from 'react-icons/fa'
import { motion } from 'framer-motion'

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
      <motion.div
        className="footer-cta"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2>READY TO BUILD<br />RESILIENT SOLUTIONS?</h2>
      </motion.div>

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
              <li><a href="https://instagram.com/jeremyjpohar" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
              <li><a href="https://www.linkedin.com/in/jeremyjosephpohar/" target="_blank" rel="noopener noreferrer">LINKEDIN</a></li>
              <li><a href="https://github.com/CaffeinatedR4t" target="_blank" rel="noopener noreferrer">GITHUB</a></li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>OTHER</h4>
            <ul>
              <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>PROJECTS</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>ABOUT</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>CONTACT</a></li>
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
          BACK TO TOP <FaChevronUp />
        </button>
      </motion.div>
    </footer>
  )
}

export default Footer