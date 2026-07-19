import './About.css'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { 
  SiTypescript, 
  SiJavascript, 
  SiPython, 
  SiPhp, 
  SiC,
  SiHtml5, 
  SiCss3,
  SiTailwindcss,
  SiReact, 
  SiNextdotjs,
  SiNodedotjs,
  SiLaravel, 
  SiThreedotjs,
  SiMysql, 
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiPrisma,
  SiMongoose,
  SiUnity,
  SiAndroidstudio, 
  SiExpo,
  SiJupyter,
  SiR,
  SiGithub, 
  SiFigma,
  SiDocker,
  SiPostman,
  SiVercel,
  SiLinux
} from 'react-icons/si'

import { DiJava } from 'react-icons/di'
import { TbApi } from 'react-icons/tb'
import { VscVscode } from 'react-icons/vsc'
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
    { name: 'C#', icon: <CSharpLogo />, className: 'csharp' }
  ]

  const webFrameworks = [
    { name: 'HTML5', icon: <SiHtml5 />, className: 'html' },
    { name: 'CSS3', icon: <SiCss3 />, className: 'css' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, className: 'tailwind' },
    { name: 'React', icon: <SiReact />, className: 'react' },
    { name: 'Next.js', icon: <SiNextdotjs />, className: 'nextjs' },
    { name: 'Node.js', icon: <SiNodedotjs />, className: 'nodejs' },
    { name: 'Laravel', icon: <SiLaravel />, className: 'laravel' },
    { name: 'Three.js', icon: <SiThreedotjs />, className: 'threejs' },
    { name: 'REST API', icon: <TbApi />, className: 'rest' }
  ]

  const databasesOrms = [
    { name: 'MySQL', icon: <SiMysql />, className: 'mysql' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, className: 'postgresql' },
    { name: 'MongoDB', icon: <SiMongodb />, className: 'mongodb' },
    { name: 'Supabase', icon: <SiSupabase />, className: 'supabase' },
    { name: 'Prisma', icon: <SiPrisma />, className: 'prisma' },
    { name: 'Mongoose', icon: <SiMongoose />, className: 'mongoose' }
  ]

  const mobileGameDev = [
    { name: 'Unity', icon: <SiUnity />, className: 'unity' },
    { name: 'Android Studio', icon: <SiAndroidstudio />, className: 'android' },
    { name: 'Expo', icon: <SiExpo />, className: 'expo' }
  ]

  const dataScience = [
    { name: 'Jupyter', icon: <SiJupyter />, className: 'jupyter' },
    { name: 'R', icon: <SiR />, className: 'r' },
    { name: 'RStudio', icon: <RStudioLogo />, className: 'rstudio' }
  ]

  const toolsPlatforms = [
    { name: 'VS Code', icon: <VscVscode />, className: 'vscode' },
    { name: 'GitHub', icon: <SiGithub />, className: 'github' },
    { name: 'Figma', icon: <SiFigma />, className: 'figma' },
    { name: 'Docker', icon: <SiDocker />, className: 'docker' },
    { name: 'Postman', icon: <SiPostman />, className: 'postman' },
    { name: 'Vercel', icon: <SiVercel />, className: 'vercel' },
    { name: 'Linux (WSL)', icon: <SiLinux />, className: 'linux' }
  ]

  const sectionEasing = [0.16, 1, 0.3, 1]

  const fadeUpProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: sectionEasing },
  }

  const techCategoryVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07 },
    },
  }

  const techCategoryItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: sectionEasing },
    },
  }

  const [techStackOpen, setTechStackOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jeremy.yosep@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <>
    <section id="about" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: sectionEasing, delay: 0.2 }}
        >
          <h2 className="section-title">ABOUT</h2>
          <p className="section-subtitle">Get to know me</p>
        </motion.div>

        <div className="about-content">
          <motion.h3
            className="about-role"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: sectionEasing, delay: 0.35 }}
          >
            Full-Stack Developer. Cybersecurity Enthusiast. Founder. Critical Thinker.
          </motion.h3>

          <motion.p
            className="about-description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: sectionEasing, delay: 0.5 }}
          >
            I'm Jeremy Joseph Pohar with 4+ years of experience, I build secure, scalable, and user-focused digital experiences across web, mobile, and AI. I enjoy solving complex problems, learning continuously, and creating technology that makes a meaningful impact.
          </motion.p>

          <motion.p
            className="about-moto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: sectionEasing, delay: 0.65 }}
          >
            In pursuit of greatness.
          </motion.p>

            {/* ── Action Buttons Row ── */}
            <motion.div
              className="about-actions-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: sectionEasing, delay: 0.8 }}
            >
              <a
                className="download-cv-button"
                href="/CV_ATS_JeremyJosephPohar.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV
              </a>

              <motion.button
                layout
                className="tech-stack-toggle-btn"
                onClick={() => setTechStackOpen(prev => !prev)}
                transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
              >
                <motion.span layout="position">
                  {techStackOpen ? 'Hide Tech Stack' : 'See My Tech Stack'}
                </motion.span>
                <motion.span
                  className="toggle-chevron"
                  animate={{ rotate: techStackOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <motion.button
                layout
                className="copy-email-btn"
                onClick={handleCopyEmail}
                transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
              >
                <motion.span layout="position">
                  {emailCopied ? 'Copied!' : 'Copy Email'}
                </motion.span>
              </motion.button>
            </motion.div>

            {/* ── Collapsible Tech Stack ── */}
            <AnimatePresence initial={false}>
              {techStackOpen && (
                <motion.div
                  className="tech-stack"
                  key="tech-stack"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  {/* ✅ PROGRAMMING LANGUAGES */}
                  <motion.div
                    className="tech-category"
                    variants={techCategoryVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3>Programming Languages</h3>
                    <StaticTechGrid items={programmingLanguages} itemVariants={techCategoryItemVariants} />
                  </motion.div>

                  {/* ✅ WEB & FRAMEWORKS */}
                  <motion.div
                    className="tech-category"
                    variants={techCategoryVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3>Web & Frameworks</h3>
                    <StaticTechGrid items={webFrameworks} itemVariants={techCategoryItemVariants} />
                  </motion.div>

                  {/* ✅ DATABASES & ORMS */}
                  <motion.div
                    className="tech-category"
                    variants={techCategoryVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3>Databases & ORMs</h3>
                    <StaticTechGrid items={databasesOrms} itemVariants={techCategoryItemVariants} />
                  </motion.div>

                  {/* ✅ MOBILE & GAME DEV */}
                  <motion.div
                    className="tech-category"
                    variants={techCategoryVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3>Mobile & Game Dev</h3>
                    <StaticTechGrid items={mobileGameDev} itemVariants={techCategoryItemVariants} />
                  </motion.div>

                  {/* ✅ DATA SCIENCE & ANALYTICS */}
                  <motion.div
                    className="tech-category"
                    variants={techCategoryVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3>Data Science & Analytics</h3>
                    <StaticTechGrid items={dataScience} itemVariants={techCategoryItemVariants} />
                  </motion.div>

                  {/* ✅ TOOLS & PLATFORMS */}
                  <motion.div
                    className="tech-category"
                    variants={techCategoryVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3>Tools & Platforms</h3>
                    <StaticTechGrid items={toolsPlatforms} itemVariants={techCategoryItemVariants} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          {/* ✅ CERTIFICATIONS CAROUSEL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: sectionEasing, delay: 0.3 }}
          >
            <CertificationsCarousel certifications={certificationsData} />
          </motion.div>

        </div>
      </div>
    </section>
    </>
  )
}

// ✅ STATIC TECH GRID (NO CAROUSEL)
function StaticTechGrid({ items, itemVariants }) {
  return (
    <div className="tech-grid">
      {items.map((item) => (
        <motion.div key={item.name} className="tech-icon" variants={itemVariants}>
          <div className={`icon-box ${item.className}`}>
            {item.icon}
          </div>
          <span>{item.name}</span>
        </motion.div>
      ))}
    </div>
  )
}

const certClickSound = new Audio('/audio/lesiakower-minimalist-button-hover-sound-effect-399749.wav');
certClickSound.volume = 0.4;
function CertificationsCarousel({ certifications }) {
  const [[currentIndex, direction], setPage] = useState([0, 0])
  const [selectedCert, setSelectedCert] = useState(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const total = certifications.length

  const playClick = () => {
    if (!window.isMuted) { certClickSound.currentTime = 0; certClickSound.play().catch(() => {}) }
  }

  const paginate = (dir) => {
    playClick()
    setPage(([idx]) => [(idx + dir + total) % total, dir])
  }

  const handleCertClick = (cert) => {
    playClick()
    setSelectedCert(cert)
    document.body.style.overflow = 'hidden'
    if (window.lenis) window.lenis.stop()
  }

  const handleClosePopup = () => {
    setSelectedCert(null)
    document.body.style.overflow = 'auto'
    if (window.lenis) window.lenis.start()
  }

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchMove  = (e) => setTouchEnd(e.touches[0].clientX)
  const handleTouchEnd   = () => {
    if (touchStart - touchEnd > 50)  paginate(1)
    if (touchStart - touchEnd < -50) paginate(-1)
  }

  const prevIndex = (currentIndex - 1 + total) % total
  const nextIndex = (currentIndex + 1) % total

  // Build the 3 visible slots — stable key=pos so layout animation fires
  const visibleCards = [
    { cert: certifications[prevIndex],    pos: 'prev' },
    { cert: certifications[currentIndex], pos: 'active' },
    { cert: certifications[nextIndex],    pos: 'next' },
  ]

  // Spring config for the conveyor belt slide
  const spring = { type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }

  return (
    <div className="certifications-section">
      <h3>Certifications</h3>

      <div
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="carousel-arrow carousel-prev" onClick={() => paginate(-1)}>
          <FaChevronLeft />
        </button>

        {/* LayoutGroup ensures Framer Motion tracks cards across renders */}
        <motion.div className="carousel-track" layout>
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            {visibleCards.map(({ cert, pos }) => (
              <motion.div
                key={cert.id}
                layoutId={`cert-card-${cert.id}`}
                layout
                transition={spring}
                className={`cert-card-carousel ${pos}`}
                onClick={() => pos === 'active' && handleCertClick(cert)}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: pos === 'active' ? 1 : 0.5,
                  scale: pos === 'active' ? 1.15 : 0.85,
                  filter: pos === 'active' ? 'blur(0px)' : 'blur(1px)',
                  transition: spring,
                }}
                exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
              >
                {cert.image
                  ? <img src={cert.image} alt={cert.title} className="cert-image" />
                  : <div className="cert-placeholder" />}
                <h4>{cert.title}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
                <span className="cert-date">{cert.date}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <button className="carousel-arrow carousel-next" onClick={() => paginate(1)}>
          <FaChevronRight />
        </button>
      </div>

      <div className="carousel-counter">
        {currentIndex + 1} / {certifications.length}
      </div>

      {/* Certification Popup */}
      {selectedCert && (
        <div className="cert-popup-overlay" onClick={handleClosePopup}>
          <div className="cert-popup" onClick={(e) => e.stopPropagation()} data-lenis-prevent="true">
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