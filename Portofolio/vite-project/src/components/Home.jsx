import { useEffect, useState } from 'react'
import ModelViewer from './ModelViewer'
import './Home.css'

function Home() {
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
      
      setHours(String(jakartaTime.getHours()).padStart(2, '0'))
      setMinutes(String(jakartaTime.getMinutes()).padStart(2, '0'))
      setSeconds(String(jakartaTime.getSeconds()).padStart(2, '0'))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

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
      <div className="home-top-left">
        <h2>COMPUTER SCIENCE STUDENT</h2>
        <p>JAKARTA, INDONESIA</p>
      </div>

      <div className="home-top-right">
        <div className="rotated-time">
          {hours}:{minutes}:{seconds} | 6.2088° S, 106.8456° E
        </div>
      </div>

      <div className="model-container">
        <ModelViewer />
      </div>

      <div className="home-bottom-left">
        <button className="cta-button" onClick={scrollToContact}>
          Let's Connect
        </button>
        
        <p className="home-quote">
          "ANALYZE. DEVELOP. DELIVER."<br />
          (JEREMY JOSEPH POHAR)
        </p>
        
        <p className="home-year">©2025</p>
      </div>

      <div className="home-bottom-right">
        <div className="status-card">
          <div className="status-preview">
            <span>AI TRAINER</span>
            <span>DEVELOPER</span>
            <span>RESEARCHER</span>
          </div>
          <p className="status-title">WORKING NOW.</p>
          <a href="#projects" className="status-link">VIEW PROJECTS</a>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>SCROLL</span>
        <span className="arrow">↓</span>
      </div>
    </section>
  )
}

export default Home