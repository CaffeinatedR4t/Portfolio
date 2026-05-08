import { useState, useEffect, useRef } from 'react'
import { FaGithub, FaFilePdf, FaTimes, FaExternalLinkAlt, FaFolder, FaArrowRight } from 'react-icons/fa'
import './Projects.css'

const projectsData = [
  {
    id: 1,
    number: "01",
    title: "Personal Portfolio Website",
    description: "A modern, interactive portfolio website built with React and Vite, featuring smooth animations with Lenis scroll, custom cursor effects, and a sleek dark theme.",
    tags: ["React", "Vite", "JavaScript", "Node.js", "CSS3"],
    image: '/images/webview.png',
    date: "Jan 2025",
    role: "Full-Stack Developer & Designer",
    github: "https://github.com/CaffeinatedR4t/Portofolio",
    fullDescription: "A modern, interactive portfolio website built with React and Vite, featuring smooth animations with Lenis scroll, custom cursor effects, and a sleek dark theme. Showcases my projects, skills, certifications, and professional experience with an engaging user interface. Fully responsive design with optimized performance and SEO."
  },
  {
    id: 2,
    number: "02",
    title: "XSS Mitigation Framework",
    description: "Designed and executed experimental testing on PHP-based web applications to identify Reflected, Stored, and DOM-based XSS vulnerabilities.",
    tags: ["PHP", "Cybersecurity", "XSS", "OWASP", "Research"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    date: "Jan 2025",
    role: "Cybersecurity Researcher",
    pdf: "/XSS_Research_Paper.pdf",
    fullDescription: "Designed and executed experimental testing on PHP-based web applications to identify Reflected, Stored, and DOM-based XSS vulnerabilities. Developed and evaluated prevention frameworks using input validation, output encoding (e.g., htmlspecialchars()), and Content-Security-Policy (CSP) implementation. Strengthened applied understanding of cybersecurity principles, secure coding practices, and OWASP standards."
  },
  {
    id: 3,
    number: "03",
    title: "Seadex - Export Management Platform",
    description: "A PHP-Laravel based export management platform connecting Indonesian suppliers with global buyers.",
    tags: ["PHP", "Laravel", "MySQL", "Full-Stack", "TailwindCSS"],
    image: '/images/seadex-new.png',
    date: "Nov 2024",
    role: "Front-End Developer & Database Engineer",
    github: "https://github.com/CaffeinatedR4t/UAS-WEBPRO-IF330",
    fullDescription: "A PHP-Laravel based export management platform connecting Indonesian suppliers with global buyers. Integrated front-end interfaces with robust MySQL database systems to streamline product listings and export operations."
  },
  {
    id: 4,
    number: "04",
    title: "Diabetes Meal Plan Framework",
    description: "Machine learning system designed to predict and manage Type 2 Diabetes through personalized meal recommendations.",
    tags: ["Python", "Machine Learning", "Data Science", "Healthcare"],
    image: '/images/diabetes-meal.png',
    date: "Dec 2025",
    role: "ML Engineer & Data Scientist",
    github: "https://github.com/Gr1X/Diabetes_MealPlan_Model",
    fullDescription: "Machine learning system designed to predict and manage Type 2 Diabetes through personalized meal recommendations. Built classification models using Python to analyze health and lifestyle data, integrating prediction algorithms with nutritional guidance."
  },
  {
    id: 5,
    number: "05",
    title: "Taman Bacaan Mobile App",
    description: "Android-based mobile application using Kotlin and Android Studio to support community reading activities through digital access.",
    tags: ["Kotlin", "Android Studio", "Mobile Dev", "Leadership"],
    image: '/images/taman-bacaan.png',
    date: "Dec 2025",
    role: "Lead Developer & Project Manager",
    github: "https://github.com/CaffeinatedR4t/Project_TamanBacaan",
    fullDescription: "Android-based mobile application using Kotlin and Android Studio to support community reading activities through digital access and user engagement. Led the full project lifecycle from system design, task delegation, and database integration to UI/UX development and testing."
  },
  {
    id: 6,
    number: "06",
    title: "AI in Student Learning",
    description: "Research project analyzing the impact of AI integration on student learning outcomes using statistical analysis in R.",
    tags: ["R", "Data Analysis", "Research", "Education", "Statistics"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    date: "Sep 2024",
    role: "Data Analyst & Researcher",
    pdf: "/AI_Student_Learning_Paper.pdf",
    fullDescription: "Comprehensive research project examining the integration of AI tools in educational settings and their effect on student engagement, comprehension, and academic performance. Utilized R and RStudio for statistical modeling, hypothesis testing, and data visualization to derive actionable insights."
  },
  {
    id: 7,
    number: "07",
    title: "EcoSort System",
    description: "Cross-platform mobile application for AI-based waste classification and reward-based wallet payouts.",
    tags: ["React Native", "Expo", "Zustand", "Supabase", "Gemini AI", "Node.js"],
    image: "/images/EcoSort.png",
    date: "Feb 2026",
    role: "Full-Stack Mobile Developer",
    github: "https://github.com/CaffeinatedR4t/EcoSort",
    fullDescription: "EcoSort is a cross-platform mobile application built with React Native (Expo) designed to streamline waste collection. It features an AI-driven workflow where users scan waste items (classified by Gemini 1.5 Flash), request pickups, and receive flat-rate wallet rewards upon driver and admin verification. The system utilizes Supabase for secure data management and a Node.js backend for business logic."
  }
]

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const projectRefs = useRef([])

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
    if (window.lenis) window.lenis.stop()
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
    if (window.lenis) window.lenis.start()
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">FEATURED PROJECTS</h2>
          <p className="section-subtitle">Directory of work</p>
        </div>
      </div>

      <div className="project-list-container">
        <div className="project-list">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className="project-list-row"
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onMouseMove={handleMouseMove}
              >
                <div className="col-icon">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="folder-icon"
                  >
                    <path d="M2 3h7.5l2 2.5H22v15.5H2V3z" fillOpacity="0.4" />
                    <path d="M2 8h20v13H2V8z" />
                  </svg>
                </div>
                <div className="col-name">
                  <span className="project-title-text">{project.title}</span>
                </div>
                <div className="col-type">
                  <span className="project-tags-text">{project.tags.join(', ')}</span>
                </div>
                <div className="col-date">
                  <span className="project-date-text">{project.date}</span>
                </div>
                <div className="col-arrow">
                  <FaArrowRight className="arrow-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Floating Image Component */}
      {hoveredProject && (
        <div 
          className="floating-image-container"
          style={{ 
            left: `${cursorPos.x}px`, 
            top: `${cursorPos.y}px` 
          }}
        >
          <img 
            src={hoveredProject.image} 
            alt={hoveredProject.title} 
            className="floating-image"
          />
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={handleCloseModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()} data-lenis-prevent="true">
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <FaTimes />
            </button>

            <div className="modal-content">
              {/* Left Side - Image */}
              <div className="modal-image-section">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="modal-image"
                />
              </div>

              {/* Right Side - Details */}
              <div className="modal-info-section">
                <div className="modal-header">
                  <span className="modal-number">#{selectedProject.number}</span>
                  <h2>{selectedProject.title}</h2>
                  <span className="modal-role">{selectedProject.role}</span>
                  <span className="modal-date">{selectedProject.date}</span>
                </div>

                <p className="modal-description">{selectedProject.fullDescription}</p>

                <div className="modal-tags">
                  <h4>Technologies Used</h4>
                  <div className="tags-list">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-links">
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-link-btn"
                    >
                      <FaGithub /> View on GitHub
                    </a>
                  )}
                  {selectedProject.pdf && (
                    <a 
                      href={selectedProject.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-link-btn"
                    >
                      <FaFilePdf /> View PDF
                    </a>
                  )}
                  {selectedProject.external && (
                    <a 
                      href={selectedProject.external} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-link-btn"
                    >
                      <FaExternalLinkAlt /> Visit Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects