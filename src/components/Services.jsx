import { useState, useRef, useEffect } from 'react'
import './Services.css'

const skillGroups = [
  {
    id: 'frontend',
    category: 'Frontend',
    title: 'Frontend Development',
    description: 'Crafting responsive, high-performance, and visually stunning user interfaces',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS']
  },
  {
    id: 'backend',
    category: 'Backend',
    title: 'Backend Development',
    description: 'Architecting robust server-side logic, secure authentication, and APIs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT/Auth']
  },
  {
    id: 'database',
    category: 'Database',
    title: 'Database Architecture',
    description: 'Designing optimized schemas, relations, and scalable cloud databases',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    tags: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase']
  },
  {
    id: 'tools-devops',
    category: 'Tools & DevOps',
    title: 'Tools & DevOps',
    description: 'Version control, automated testing, containerization, and modern deployments',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="14" y1="4" x2="10" y2="20"/>
      </svg>
    ),
    tags: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Linux']
  }
]

const AccordionItem = ({ item, isOpen, onSelect }) => {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!isOpen || !contentRef.current) {
      setHeight(0)
      return
    }

    const el = contentRef.current
    setHeight(el.scrollHeight)

    const ro = new ResizeObserver(() => {
      if (el) {
        setHeight(el.scrollHeight)
      }
    })
    ro.observe(el)

    return () => ro.disconnect()
  }, [isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <div
      className={`accordion-item ${isOpen ? 'open' : ''}`}
      id={`skill-card-${item.id}`}
    >
      <button
        type="button"
        id={`skill-header-${item.id}`}
        className="accordion-header"
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`skill-panel-${item.id}`}
      >
        <div className="accordion-icon-wrap">
          {item.icon}
        </div>
        <div className="accordion-title-group">
          <div className="accordion-category-badge">{item.category}</div>
          <h3 className="accordion-title">{item.title}</h3>
          <p className="accordion-desc">{item.description}</p>
        </div>
        <div className={`accordion-chevron ${isOpen ? 'rotated' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </button>
      <div
        id={`skill-panel-${item.id}`}
        role="region"
        aria-labelledby={`skill-header-${item.id}`}
        className="accordion-body"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div className="accordion-content" ref={contentRef}>
          <div className="accordion-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="skill-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Services = () => {
  const [openId, setOpenId] = useState('frontend')

  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="services-layout">
          {/* Left Header */}
          <div className="services-header">
            <div data-animate="fade-up" style={{ '--reveal-delay': '0.05s' }}>
              <span className="section-tag">✦ Full-Stack Skills</span>
            </div>
            <h2 className="section-title" data-animate="fade-up" style={{ '--reveal-delay': '0.15s' }}>
              My Tech Stack
            </h2>
            <p className="services-description" data-animate="fade-up" style={{ '--reveal-delay': '0.25s' }}>
              A comprehensive toolkit covering both client-side design and server-side engineering. 
              Organized into dedicated groups for building modern, production-grade applications.
            </p>
            <div className="services-feature" data-animate="fade-up" style={{ '--reveal-delay': '0.35s' }}>
              <div className="feature-item">
                <div className="feature-icon">💻</div>
                <div>
                  <h4>Frontend Engineering</h4>
                  <p>React, Next.js, TypeScript & modern UI systems</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚙️</div>
                <div>
                  <h4>Backend & APIs</h4>
                  <p>RESTful architectures, Node.js & secure auth</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div>
                  <h4>Database & DevOps</h4>
                  <p>MongoDB, PostgreSQL, Docker & automated CI/CD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Accordion / Skill Cards */}
          <div className="services-accordion" data-animate="fade-up" style={{ '--reveal-delay': '0.35s' }}>
            {skillGroups.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onSelect={() => setOpenId(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
