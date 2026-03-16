import './Footer.css'
import { FaChevronUp } from 'react-icons/fa'

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
        <h2>READY TO BUILD<br />RESILIENT SOLUTIONS?</h2>
        <button onClick={scrollToContact} className="arrow-button">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect x="1" y="1" width="78" height="78" stroke="currentColor" strokeWidth="1" />
            <path
              d="M28 46 L40 34 L52 46"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" 
                      fontSize="18" fontWeight="bold" fill="currentColor">
                  JJP
                </text>
              </svg>
              <h3>WORK WITH ME</h3>
            </div>
          </div>

          <div className="footer-col">
            <h4>HELLO</h4>
            <p><a href="mailto:jeremy.yosep@gmail.com">jeremy.yosep@gmail.com</a></p>
            <p className="address">
              Jakarta, Indonesia
            </p>
          </div>

          <div className="footer-col">
            <h4>SOCIAL</h4>
            <ul>
              <li><a href="https://instagram.com/jeremyjpohar" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
              <li><a href="https://www.linkedin.com/in/jeremyjosephpohar/" target="_blank" rel="noopener noreferrer">LINKEDIN</a></li>
              <li><a href="https://github.com/CaffeinatedR4t" target="_blank" rel="noopener noreferrer">GITHUB</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>OTHER</h4>
            <ul>
              <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>PROJECTS</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>ABOUT</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>CONTACT</a></li>
              <li className="model-credit">
                <a href="https://skfb.ly/6SvyM" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   title="3D Model by Vivien Deroche">
                  3D Model by Vivien Deroche
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <div className="footer-brand"><img src="/[logo].svg" alt="Logo" className="footer-logo-img" /></div>
          <p>All content ©<br />Jeremy Joseph Pohar {currentYear}</p>
        </div>
        <div className="footer-bottom-center">
          <p>Portfolio by Jeremy Joseph Pohar</p>
        </div>
        <button className="back-to-top" onClick={scrollToTop}>
          BACK TO TOP <FaChevronUp />
        </button>
      </div>
    </footer>
  )
}

export default Footer