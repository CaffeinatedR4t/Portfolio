import { useState, useEffect, useRef } from 'react'
import { FaGithub, FaFilePdf, FaTimes, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'

const projectsData = [
  {
    id: 1,
    number: "01",
    title: "Personal Portfolio Website",
    description: "A modern, interactive portfolio website built with React and Vite, featuring smooth animations with Lenis scroll, custom cursor effects, and a sleek dark theme.",
    tags: ["React", "Vite", "JavaScript", "Node.js", "CSS3"],
    image: '/images/webview.png',
    date: "2025 - Present",
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
    date: "January 2025",
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
    date: "November 2024",
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
    date: "December 2025",
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
    date: "December 2025",
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
    date: "September 2024",
    role: "Data Analyst & Researcher",
    pdf: "/AI_Student_Learning_Paper.pdf",
    fullDescription: "Comprehensive research project examining the integration of AI tools in educational settings and their effect on student engagement, comprehension, and academic performance. Utilized R and RStudio for statistical modeling, hypothesis testing, and data visualization to derive actionable insights."
  }
]

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const projectRefs = useRef([])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: '0px'
        }
      )

      if (ref) observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

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
          <p className="section-subtitle">My recent work</p>
        </div>

        <div className="projects-vertical-scroll">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="project-folder-wrapper"
            >
              <div 
                className="project-folder-card"
                onClick={() => handleProjectClick(project)}
              >
                {/* Folder Tab */}
                <div className="folder-tab">
                  <span className="folder-number">#{project.number}</span>
                </div>

                {/* Project Content */}
                <div className="folder-content">
                  {/* Image */}
                  <div className="project-image-container">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="project-image"
                    />
                  </div>

                  {/* Info */}
                  <div className="project-info">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-role">{project.role}</span>
                      <span className="project-date">{project.date}</span>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>

                    <div className="project-cta">
                      <span className="view-details">View Details →</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={handleCloseModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
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