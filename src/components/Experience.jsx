import { useState, useEffect, useRef } from 'react'
import './Experience.css'

const experienceData = [
  {
    id: 'exp-1',
    role: 'Full-Stack Developer',
    company: 'Notionhive of Bangladesh',
    period: '[2026 – Present]',
    type: 'Full-Time / Contract',
    description: 'Architecting and scaling full-stack web applications. Building robust REST APIs with Node.js and Express, designing MongoDB & PostgreSQL database schemas, implementing secure JWT authentication, and creating responsive React and Next.js frontends with automated deployments.',
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Docker', 'REST APIs'],
    current: true
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Web Developer',
    company: 'Pathao Internship Program',
    period: '[2023 – 2024]',
    type: 'Internship',
    description: 'Developed end-to-end web features across client and server architectures. Integrated third-party APIs, implemented authentication flows, optimized database queries, and collaborated with Git workflows and cloud deployment pipelines.',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'MySQL', 'REST APIs', 'Git'],
    current: false
  }
]

const educationData = [
  {
    id: 'edu-1',
    degree: "Bachelor's Degree - Software Engineering",
    institution: 'University of Dhaka',
    period: '2025 - Present',
    description: "Pursuing Bachelor's degree with a focus on computing, software engineering methodologies, and advanced problem-solving.",
    current: true
  },
  {
    id: 'edu-2',
    degree: 'Intermediate (Pre-Engineering)',
    institution: 'Dhaka College',
    period: '2023 - 2024',
    description: 'Higher Secondary Certificate with major coursework in Mathematics, Physics, and Chemistry.',
    current: false
  },
  {
    id: 'edu-3',
    degree: 'Matric (Science)',
    institution: 'Gouripur High School, Cumilla',
    period: '2014 - 2022',
    description: 'Secondary School Certificate in Science, establishing foundational technical and mathematical proficiency.',
    current: false
  }
]

const Experience = ({ activeTab: controlledTab, onTabChange }) => {
  const [internalTab, setInternalTab] = useState('experience')
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab

  // Animation states for sliding & swapping
  const [displayedTab, setDisplayedTab] = useState(activeTab)
  const [animState, setAnimState] = useState('idle') // 'idle' | 'exiting' | 'entering'
  const [direction, setDirection] = useState('forward') // 'forward' (exp->edu) | 'backward' (edu->exp)
  const [containerHeight, setContainerHeight] = useState(null)

  const isTransitioningRef = useRef(false)
  const expBtnRef = useRef(null)
  const eduBtnRef = useRef(null)
  const panelRef = useRef(null)
  const containerRef = useRef(null)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })

  // Update sliding pill position
  const updatePill = () => {
    const activeBtn = activeTab === 'experience' ? expBtnRef.current : eduBtnRef.current
    if (activeBtn) {
      setPillStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth
      })
    }
  }

  useEffect(() => {
    updatePill()
    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [activeTab])

  // Handle switching tabs
  const handleTabClick = (nextTab) => {
    if (nextTab === activeTab) return
    if (isTransitioningRef.current) return // Prevent fast repeated clicks

    const nextDirection = nextTab === 'education' ? 'forward' : 'backward'
    setDirection(nextDirection)
    isTransitioningRef.current = true

    // Notify parent for navbar label sync
    if (onTabChange) {
      onTabChange(nextTab)
    }
    setInternalTab(nextTab)

    // Measure current height before swap
    if (panelRef.current) {
      setContainerHeight(panelRef.current.offsetHeight)
    }

    // Step 1: Animate old cards out
    setAnimState('exiting')

    setTimeout(() => {
      // Step 2: Swap content and trigger entrance
      setDisplayedTab(nextTab)
      setAnimState('entering')

      // Measure new content height
      requestAnimationFrame(() => {
        if (panelRef.current) {
          setContainerHeight(panelRef.current.scrollHeight)
        }
      })

      // Step 3: Finish transition
      setTimeout(() => {
        setAnimState('idle')
        setContainerHeight(null)
        isTransitioningRef.current = false
      }, 350)
    }, 250)
  }

  // Keyboard navigation for tablist
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (activeTab === 'experience') {
        handleTabClick('education')
        eduBtnRef.current?.focus()
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (activeTab === 'education') {
        handleTabClick('experience')
        expBtnRef.current?.focus()
      }
    }
  }

  const items = displayedTab === 'experience' ? experienceData : educationData

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <div className="experience-header">
          <div data-animate="fade-up" style={{ '--reveal-delay': '0.05s' }}>
            <span className="section-tag">✦ Journey</span>
          </div>
          <h2 className="section-title" data-animate="fade-up" style={{ '--reveal-delay': '0.15s' }}>
            My Work Experience
          </h2>
          <p className="experience-subtitle" data-animate="fade-up" style={{ '--reveal-delay': '0.25s' }}>
            My professional journey and educational background that shaped my skills.
          </p>
        </div>

        {/* Tab Selector with Sliding Pill */}
        <div
          className="tab-selector"
          role="tablist"
          aria-label="Experience and Education tabs"
          onKeyDown={handleKeyDown}
          data-animate="fade-up"
          style={{ '--reveal-delay': '0.35s' }}
        >
          {/* Sliding Purple Pill */}
          <span
            className="tab-pill"
            style={{
              transform: `translateX(${pillStyle.left}px)`,
              width: `${pillStyle.width}px`
            }}
            aria-hidden="true"
          />

          <button
            ref={expBtnRef}
            role="tab"
            aria-selected={activeTab === 'experience'}
            aria-controls="panel-experience"
            id="tab-experience"
            tabIndex={activeTab === 'experience' ? 0 : -1}
            className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => handleTabClick('experience')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            </svg>
            Experience
          </button>

          <button
            ref={eduBtnRef}
            role="tab"
            aria-selected={activeTab === 'education'}
            aria-controls="panel-education"
            id="tab-education"
            tabIndex={activeTab === 'education' ? 0 : -1}
            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => handleTabClick('education')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Education
          </button>
        </div>

        {/* Animated Timeline Container with smooth height */}
        <div
          ref={containerRef}
          className="timeline-container-wrap"
          style={{
            height: containerHeight ? `${containerHeight}px` : 'auto'
          }}
        >
          <div
            ref={panelRef}
            role="tabpanel"
            id={`panel-${displayedTab}`}
            aria-labelledby={`tab-${displayedTab}`}
            className={`timeline anim-${animState} dir-${direction}`}
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                className="timeline-item"
                id={item.id}
                style={{ '--i': i }}
              >
                <div className="timeline-marker">
                  <div className={`timeline-dot ${item.current ? 'current' : ''}`} />
                  {i < items.length - 1 && <div className="timeline-line" />}
                </div>

                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">
                        {item.role || item.degree}
                      </h3>
                      <div className="timeline-company">
                        <span className="company-name">
                          {item.company || item.institution}
                        </span>
                        {item.current && (
                          displayedTab === 'experience' ? (
                            <span className="current-badge">
                              <span className="badge-pulse-dot" aria-hidden="true" />
                              Current
                            </span>
                          ) : (
                            <span className="ongoing-badge">
                              <span className="badge-pulse-dot" aria-hidden="true" />
                              Ongoing
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="timeline-meta">
                      <span className="timeline-period">{item.period}</span>
                      {item.type && (
                        <span className="timeline-type">{item.type}</span>
                      )}
                    </div>
                  </div>

                  <p className="timeline-description">{item.description}</p>

                  {item.skills && (
                    <div className="timeline-skills">
                      {item.skills.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
