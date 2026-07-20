import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdWorkOutline, MdCalendarToday } from 'react-icons/md'
import CalendarModal from './CalendarModal'
import './Contact.css'

const easeOutExpo = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
}

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (status.message) setStatus({ type: '', message: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      )

      setStatus({ 
        type: 'success', 
        message: 'MESSAGE SENT SUCCESSFULLY.' 
      })
      setFormData({ name: '', email: '', message: '' })
      
      // Auto-hide toaster after 5 seconds
      setTimeout(() => {
        setStatus({ type: '', message: '' })
      }, 5000)

    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus({ 
        type: 'error', 
        message: 'FAILED TO SEND MESSAGE. PLEASE TRY AGAIN.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="section-title">
            GET IN TOUCH
          </h2>
          <p className="section-subtitle">Let's work together</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3>Contact Information</h3>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="info-item" variants={staggerItem}>
                <div className="info-icon-wrapper">
                  <MdEmail className="info-icon" />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>jeremy.yosep@gmail.com</p>
                </div>
              </motion.div>

              <motion.div className="info-item" variants={staggerItem}>
                <div className="info-icon-wrapper">
                  <MdLocationOn className="info-icon" />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Jakarta, Indonesia</p>
                </div>
              </motion.div>

              <motion.div className="info-item" variants={staggerItem}>
                <div className="info-icon-wrapper">
                  <MdWorkOutline className="info-icon" />
                </div>
                <div>
                  <h4>Status</h4>
                  <p>Open to Opportunities</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="social-links"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.a href="https://github.com/CaffeinatedR4t" target="_blank" rel="noopener noreferrer" title="GitHub" variants={staggerItem}>
                <FaGithub />
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/jeremyjosephpohar/" target="_blank" rel="noopener noreferrer" title="LinkedIn" variants={staggerItem}>
                <FaLinkedin />
              </motion.a>
              <motion.a href="https://instagram.com/jeremyjpohar" target="_blank" rel="noopener noreferrer" title="Instagram" variants={staggerItem}>
                <FaInstagram />
              </motion.a>
              <motion.a href="mailto:jeremy.yosep@gmail.com" title="Email" variants={staggerItem}>
                <FaEnvelope />
              </motion.a>
            </motion.div>

            <motion.div
              className="book-call-wrapper"
              variants={staggerItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <button 
                className="btn btn-primary book-call-btn" 
                onClick={() => setIsCalendarOpen(true)}
                style={{ width: 'max-content' }}
              >
                <span>BOOK A CALL</span>
              </button>
            </motion.div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className={`form-status ${status.type}`}
                >
                  <span>{status.message}</span>
                  <button 
                    className="toaster-close" 
                    onClick={() => setStatus({ type: '', message: '' })}
                    aria-label="Close notification"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label htmlFor="name">NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">MESSAGE</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
              {!isSubmitting && <i className="fas fa-paper-plane"></i>}
            </button>
          </motion.form>
        </div>
      </div>
      
      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
      />
    </section>
  )
}

export default Contact
