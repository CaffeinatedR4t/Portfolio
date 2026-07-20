import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import Lenis from '@studio-freight/lenis'
import './AboutModal.css'

export default function AboutModal({ isOpen, onClose }) {
  useEffect(() => {
    let modalLenis
    let rafId

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (window.lenis) window.lenis.stop()

      // Small delay to ensure DOM is ready after Framer Motion mounts it
      setTimeout(() => {
        const wrapper = document.querySelector('.about-modal-drawer')
        const content = document.querySelector('.about-modal-inner-content')
        if (wrapper && content) {
          modalLenis = new Lenis({
            wrapper,
            content,
            lerp: 0.1,
            smoothWheel: true,
          })

          const raf = (time) => {
            modalLenis.raf(time)
            rafId = requestAnimationFrame(raf)
          }
          rafId = requestAnimationFrame(raf)
        }
      }, 100)

    } else {
      document.body.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }

    return () => {
      if (modalLenis) modalLenis.destroy()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="about-modal-portal">
          {/* Backdrop */}
          <motion.div
            className="about-modal-backdrop"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
          />
          
          {/* Slide-over Drawer */}
          <motion.div
            className="about-modal-drawer"
            data-lenis-prevent="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', height: 0 }}>
              <button 
                className="modal-close-btn" 
                onClick={onClose}
                style={{ position: 'absolute', top: '3rem', right: '4rem' }}
              >
                <FaTimes />
              </button>
            </div>

            <div className="about-modal-inner-content">
              <div className="about-modal-header">
                <h2 className="about-modal-title">ABOUT ME</h2>
              </div>

              <div className="about-modal-content">
                <div className="about-modal-section">
                  <motion.p 
                    className="about-lead-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Hey, I'm Jeremy. I build secure, high-performance digital products that help businesses solve real problems, not just launch another website.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    My work sits at the intersection of full-stack development, cybersecurity, and AI. I'm driven by the idea that great software should be fast, secure, and built with purpose. Whether it's developing scalable web applications, integrating intelligent automation, or identifying security vulnerabilities before they become risks, I focus on creating solutions that last.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Every project starts by understanding the problem before writing a single line of code. From architecture and development to optimization and security, I believe the best products come from balancing technical excellence with practical business goals.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    When we work together, you get more than a developer. You get someone who values long-term stability and business growth as much as clean code.
                  </motion.p>
                </div>

                <motion.div 
                  className="about-modal-footer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <p>JAKARTA, ID</p>
                  <p>© 2026</p>
                </motion.div>

                <motion.div 
                  className="about-image-placeholder"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  style={{ padding: 0, border: 'none', background: 'transparent' }}
                >
                  <img 
                    src="/images/IMG_20260720_203555.webp" 
                    alt="Jeremy Yosep Pohar" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </motion.div>

                <motion.div 
                  className="about-modal-section principles-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <h3 className="principles-title">OUR PRINCIPLES</h3>
                  
                  <div className="principles-list">
                    <div className="principle-item">
                      <span className="principle-number">01</span>
                      <div className="principle-content">
                        <h4>Build with purpose</h4>
                        <p>Technology should solve problems, not create them. Every decision starts with understanding the objective before choosing the tools.</p>
                      </div>
                    </div>
                    
                    <div className="principle-item">
                      <span className="principle-number">02</span>
                      <div className="principle-content">
                        <h4>Security isn't optional</h4>
                        <p>Performance means little without trust. Security is considered from the first line of code, not added as an afterthought.</p>
                      </div>
                    </div>

                    <div className="principle-item">
                      <span className="principle-number">03</span>
                      <div className="principle-content">
                        <h4>Keep improving</h4>
                        <p>Great software is never truly finished. Every project is an opportunity to refine, optimize, and learn something new.</p>
                      </div>
                    </div>

                    <div className="principle-item">
                      <span className="principle-number">04</span>
                      <div className="principle-content">
                        <h4>Simplicity scales</h4>
                        <p>The best systems are often the simplest ones. Clean architecture, maintainable code, and thoughtful design outlast unnecessary complexity.</p>
                      </div>
                    </div>

                    <div className="principle-item">
                      <span className="principle-number">05</span>
                      <div className="principle-content">
                        <h4>Results over recognition</h4>
                        <p>Success isn't measured by the number of technologies used or features shipped. It's measured by the value delivered, the problems solved, and the impact left behind.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
