import { useState } from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdWorkOutline } from 'react-icons/md'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: '✅ Message sent! Check your email for confirmation.' 
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({ 
          type: 'error', 
          message: `❌ ${data.message}` 
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus({ 
        type: 'error', 
        message: '❌ Failed to send message. Make sure the backend server is running.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            GET IN TOUCH
          </h2>
          <p className="section-subtitle">Let's work together</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            
            <div className="info-item">
              <div className="info-icon-wrapper">
                <MdEmail className="info-icon" />
              </div>
              <div>
                <h4>Email</h4>
                <p>jeremy.yosep@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <MdLocationOn className="info-icon" />
              </div>
              <div>
                <h4>Location</h4>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <MdWorkOutline className="info-icon" />
              </div>
              <div>
                <h4>Status</h4>
                <p>Open to Opportunities</p>
              </div>
            </div>

            <div className="social-links">
              <a href="https://github.com/CaffeinatedR4t" target="_blank" rel="noopener noreferrer" title="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/jeremyjosephpohar/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com/jeremyjpohar" target="_blank" rel="noopener noreferrer" title="Instagram">
                <FaInstagram />
              </a>
              <a href="mailto:jeremy.yosep@gmail.com" title="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}

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
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact