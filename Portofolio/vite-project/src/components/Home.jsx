import './Home.css'

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
      <div className="home-top-left">
        <h2>COMPUTER SCIENCE STUDENT</h2>
        <p>JAKARTA, INDONESIA</p>
      </div>

      <video 
        className="home-background-video" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/videos/particleizer_remix_scene.webm" type="video/webm" />
      </video>

      <div className="home-bottom-left">
        <button className="cta-button" onClick={scrollToContact}>
          CONNECT
        </button>
        
        <p className="home-quote">
          "IN PURSUIT OF GREATNESS."<br />
          [Jeremy J. Pohar]
        </p>
        
        <p className="home-year">©2026</p>
      </div>

      <div className="home-bottom-right">
        <div className="status-card">
          <div className="status-preview">
            <span>AI TRAINER</span>
            <span>FULL STACK DEV</span>
            <span>IT SECURITY</span>
          </div>
          <p className="status-title">AVAILABLE FOR WORK.</p>
          <a href="#projects" className="status-link">VIEW PROJECTS</a>
        </div>
      </div>

    </section>
  )
}

export default Home