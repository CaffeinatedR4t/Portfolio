import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

const services = [
  { 
    title: "Web Development", 
    image: "/images/web_development_1784564493319.webp", 
    desc: "Fast, scalable websites engineered for performance and growth." 
  },
  { 
    title: "Web Security Audits", 
    image: "/images/security_audits_1784564503776.webp", 
    desc: "Comprehensive security audits to identify and mitigate vulnerabilities." 
  },
  { 
    title: "Performance Optimization", 
    image: "/images/performance_opt_1784564513502.webp", 
    desc: "Deep performance tuning for lightning-fast load times and seamless UX." 
  },
  { 
    title: "Technical Consulting", 
    image: "/images/tech_consulting_1784564525214.webp", 
    desc: "Strategic architecture and technical guidance for complex systems." 
  },
  { 
    title: "Automation Solutions", 
    image: "/images/automation_solutions_1784564577102.webp", 
    desc: "Intelligent workflow automation to save time and reduce human error." 
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate how far we've scrolled INTO the section
      // rect.top is 0 when the top of the section hits the top of the viewport
      const scrollY = -rect.top; 
      
      // The total scrollable distance is the section height minus the viewport height
      const maxScroll = rect.height - window.innerHeight;
      
      if (scrollY < 0) {
        setActiveIndex(0);
        return;
      }
      
      if (scrollY > maxScroll) {
        setActiveIndex(services.length - 1);
        return;
      }

      // Calculate progress from 0 to 1
      const progress = scrollY / maxScroll;
      
      // Map progress to an index
      let index = Math.floor(progress * services.length);
      
      // Ensure index stays within bounds (e.g. if progress is exactly 1)
      if (index >= services.length) {
        index = services.length - 1;
      }
      
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-sticky-wrapper">
        <div className="services-container">
          {/* Left Column: Fixed Text */}
          <div className="services-text-col">
            <div className="services-header">
              <h2>MY SERVICES</h2>
            </div>
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-text-item ${index === activeIndex ? 'active' : ''}`}
              >
                <h3>{service.title}</h3>
              </div>
            ))}
          </div>

          {/* Right Column: Fixed Image */}
          <div className="services-image-col">
            <div className="services-image-wrapper">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`service-image-card ${index === activeIndex ? 'active' : ''}`}
                >
                  <img src={service.image} alt={service.title} />
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
