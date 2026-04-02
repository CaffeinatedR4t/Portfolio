import './About.css'
import { useState, useEffect } from 'react'
import { 
  SiTypescript, 
  SiJavascript, 
  SiPython, 
  SiPhp, 
  SiC, 
  SiCplusplus,
  SiHtml5, 
  SiCss3,
  SiReact, 
  SiNodedotjs,
  SiAndroidstudio, 
  SiLaravel, 
  SiMysql, 
  SiGithub, 
  SiFigma,
  SiUnity,
  SiThreedotjs,
  SiJupyter
} from 'react-icons/si'

import { DiJava } from 'react-icons/di'
import { FaFilePdf, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Custom SVG Logos
const CSharpLogo = () => (
  <svg viewBox="0 0 128 128" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M85.3 76.1c-4.2 7.4-12.2 12.4-21.3 12.4-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"/>
    <path d="M97 66.2l.9-4.3h-4.2v-4.7h5.1l1.2-6.2h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6.2h-4.9l1.2-6.2h-3.8l-1.2 6.2h-4.8l1.2-6.2h-2.4v-4.7h3.3zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z"/>
  </svg>
)

const RStudioLogo = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="60" fill="#75aadb"/>
    <text 
      x="64" 
      y="85" 
      fontSize="64" 
      fontWeight="700" 
      fontFamily="'Helvetica Neue', Arial, sans-serif" 
      textAnchor="middle" 
      fill="white"
      style={{ letterSpacing: '-2px' }}
    >
      R
    </text>
  </svg>
)

// ✅ CERTIFICATION DATA
const certificationsData = [
  {
    id: 1,
    title: "HCIA-AI V3.5",
    issuer: "Huawei",
    date: "March 2025",
    description: "Comprehensive certification covering AI fundamentals, machine learning algorithms, deep learning frameworks, and practical applications of artificial intelligence in real-world scenarios.",
    image: "/images/1757263374472.png",
    pdf: null // No PDF
  },
  {
    id: 2,
    title: "Python Intermediate",
    issuer: "Sololearn",
    date: "May 2025",
    description: "Advanced Python programming certification covering object-oriented programming, decorators, generators, error handling, and best practices for writing clean, efficient Python code.",
    image: "/images/cf42e461-75c2-4823-b515-f953be549a55.png",
    pdf: "/certs/31a36364-2ae2-41a7-8a17-d5ae64270025.pdf"
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    issuer: "IBM",
    date: "November 2025",
    description: "Foundational certification in cybersecurity covering threat landscape, security principles, cryptography, network security, and best practices for protecting digital assets.",
    image: "/images/cybersecurity-fundamentals.png",
    pdf: "/certs/IBMDesign20260212-32-t4abd9.pdf"
  },
  {
    id: 4,
    title: "Getting Started with Cybersecurity",
    issuer: "IBM",
    date: "November 2025",
    description: "Introduction to cybersecurity concepts, including security frameworks, risk management, incident response, and hands-on experience with security tools and techniques.",
    image: "/images/getting-started-with-cybersecurity.png",
    pdf: "/certs/IBMDesign20260212-33-qfwwb4.pdf"
  },
  {
    id: 5,
    title: "EF SET English C1",
    issuer: "EF Standard English Test",
    date: "June 2025",
    description: "Advanced English proficiency certification (C1 level) demonstrating strong command of English language skills including reading comprehension, listening, and communication.",
    image: "/images/efset.png",
    pdf: "/certs/EF SET Certificate.pdf"
  }
]

function About() {
  // Tech stack arrays
  const programmingLanguages = [
    { name: 'TypeScript', icon: <SiTypescript />, className: 'ts' },
    { name: 'JavaScript', icon: <SiJavascript />, className: 'js' },
    { name: 'Java', icon: <DiJava />, className: 'java' },
    { name: 'Python', icon: <SiPython />, className: 'python' },
    { name: 'PHP', icon: <SiPhp />, className: 'php' },
    { name: 'C', icon: <SiC />, className: 'c' },
    { name: 'C++', icon: <SiCplusplus />, className: 'cpp' },
    { name: 'C#', icon: <CSharpLogo />, className: 'csharp' }
  ]

  const frameworks = [
    { name: 'HTML5', icon: <SiHtml5 />, className: 'html' },
    { name: 'CSS3', icon: <SiCss3 />, className: 'css' },
    { name: 'React', icon: <SiReact />, className: 'react' },
    { name: 'Node.js', icon: <SiNodedotjs />, className: 'nodejs' },
    { name: 'Three.js', icon: <SiThreedotjs />, className: 'threejs' },
    { name: 'Laravel', icon: <SiLaravel />, className: 'laravel' }
  ]

  const tools = [
    { name: 'Unity', icon: <SiUnity />, className: 'unity' },
    { name: 'Android Studio', icon: <SiAndroidstudio />, className: 'android' },
    { name: 'Jupyter', icon: <SiJupyter />, className: 'jupyter' },
    { name: 'RStudio', icon: <RStudioLogo />, className: 'rstudio' },
    { name: 'MySQL', icon: <SiMysql />, className: 'mysql' },
    { name: 'GitHub', icon: <SiGithub />, className: 'github' },
    { name: 'Figma', icon: <SiFigma />, className: 'figma' }
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">ABOUT</h2>
          <p className="section-subtitle">Get to know me</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="intro-text">
              Hello! I'm <strong>Jeremy Joseph Pohar</strong>, a Computer Science student at Universitas Multimedia Nusantara.
            </p>
          </div>

            <div className="tech-stack">
            {/* ✅ PROGRAMMING LANGUAGES */}
            <div className="tech-category">
              <h3>Programming Languages</h3>
              <StaticTechGrid items={programmingLanguages} />
            </div>

            {/* ✅ FRAMEWORKS & LIBRARIES */}
            <div className="tech-category">
              <h3>Frameworks & Libraries</h3>
              <StaticTechGrid items={frameworks} />
            </div>

            {/* ✅ TOOLS & PLATFORMS */}
            <div className="tech-category">
              <h3>Tools & Platforms</h3>
              <StaticTechGrid items={tools} />
            </div>
          </div>

          {/* ✅ CERTIFICATIONS CAROUSEL */}
          <CertificationsCarousel certifications={certificationsData} />

          <div className="download-cv-container">
            <a
              className="download-cv-button"
              href="/CV_ATS_JeremyJosephPohar.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ✅ STATIC TECH GRID (NO CAROUSEL)
function StaticTechGrid({ items }) {
  return (
    <div className="tech-grid">
      {items.map((item) => (
        <div key={item.name} className="tech-icon">
          <div className={`icon-box ${item.className}`}>
            {item.icon}
          </div>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}

// ✅ CERTIFICATIONS CAROUSEL COMPONENT
function CertificationsCarousel({ certifications }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCert, setSelectedCert] = useState(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? certifications.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === certifications.length - 1 ? 0 : prev + 1
    )
  }

  const handleCertClick = (cert) => {
    setSelectedCert(cert)
    document.body.style.overflow = 'hidden'
    if (window.lenis) window.lenis.stop()
  }

  const handleClosePopup = () => {
    setSelectedCert(null)
    document.body.style.overflow = 'auto'
    if (window.lenis) window.lenis.start()
  }

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext()
    }
    if (touchStart - touchEnd < -50) {
      handlePrev()
    }
  }

  // Get visible cards (previous, current, next)
  const getVisibleCards = () => {
    const total = certifications.length
    const prevIndex = currentIndex === 0 ? total - 1 : currentIndex - 1
    const nextIndex = currentIndex === total - 1 ? 0 : currentIndex + 1

    return [
      certifications[prevIndex],
      certifications[currentIndex],
      certifications[nextIndex]
    ]
  }

  const visibleCards = getVisibleCards()

  return (
    <div className="certifications-section">
      <h3>Certifications</h3>
      
      <div 
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="carousel-arrow carousel-prev" onClick={handlePrev}>
          <FaChevronLeft />
        </button>

        <div className="carousel-track">
          {visibleCards.map((cert, idx) => (
            <div 
              key={cert.id} 
              className={`cert-card-carousel ${idx === 1 ? 'active' : idx === 0 ? 'prev' : 'next'}`}
              onClick={() => idx === 1 && handleCertClick(cert)}
            >
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="cert-image" />
              ) : (
                <div className="cert-placeholder">
                </div>
              )}
              <h4>{cert.title}</h4>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-date">{cert.date}</span>
            </div>
          ))}
        </div>

        <button className="carousel-arrow carousel-next" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      <div className="carousel-counter">
        {currentIndex + 1} / {certifications.length}
      </div>

      {/* Certification Popup */}
      {selectedCert && (
        <div className="cert-popup-overlay" onClick={handleClosePopup}>
          <div className="cert-popup" onClick={(e) => e.stopPropagation()}>
            <button className="cert-close-btn" onClick={handleClosePopup}>
              <FaTimes />
            </button>
            
            <div className="cert-popup-content">
              {selectedCert.image ? (
                <img src={selectedCert.image} alt={selectedCert.title} className="cert-popup-image" />
              ) : (
                <div className="cert-popup-placeholder">
                  <span className="cert-placeholder-icon-large">{selectedCert.icon}</span>
                </div>
              )}
              
              <div className="cert-popup-info">
                <div className="cert-popup-icon">{selectedCert.icon}</div>
                <h3>{selectedCert.title}</h3>
                <p className="cert-popup-issuer">{selectedCert.issuer}</p>
                <span className="cert-popup-date">{selectedCert.date}</span>
                <p className="cert-popup-description">{selectedCert.description}</p>
                
                {selectedCert.pdf && (
                  <a 
                    href={selectedCert.pdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cert-pdf-btn"
                  >
                    <FaFilePdf /> View Certificate
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default About