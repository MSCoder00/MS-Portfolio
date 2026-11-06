import { useState, useRef, useEffect, useCallback } from 'react'
import './Projects.css'

import ecommerceImg from '../assets/images/project-ecommerce.webp'
import landingImg from '../assets/images/project-landing.webp'
import weatherImg from '../assets/images/project-weather.webp'
import todoImg from '../assets/images/project-todo.webp'

const projects = [
  {
    id: '01',
    title: 'E-Commerce Website',
    type: 'Web design & development',
    description: 'A fully responsive e-commerce website showcasing product deals with modern UI/UX design.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    color: '#9333ea',
    liveUrl: 'https://e-commerce-website-two-puce.vercel.app/',
    image: ecommerceImg,
    icon: '🛒'
  },
  {
    id: '02',
    title: 'Product Landing Page',
    type: 'Landing page design',
    description: 'A Shopify-styled skincare product landing page with smooth animations and conversion-focused design.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    color: '#7c3aed',
    liveUrl: 'https://mscoder00.github.io/Product-landing-page/',
    image: landingImg,
    icon: '✨'
  },
  {
    id: '03',
    title: 'Weather Web App',
    type: 'Web app',
    description: 'A live weather application fetching real-time data using Weather API with dynamic UI updates.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
    color: '#6d28d9',
    liveUrl: 'https://mscoder00.github.io/Weather-web-app/',
    image: weatherImg,
    icon: '⛅'
  },
  {
    id: '04',
    title: 'Todo List',
    type: 'Web app',
    description: 'A feature-rich task management app with date/time tracking, categories, and local storage persistence.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React JS'],
    color: '#5b21b6',
    liveUrl: 'https://todo-list-website-omega.vercel.app/',
    image: todoImg,
    icon: '✅'
  },
]

const Projects = () => {
  const trackRef = useRef(null)
  const progressTrackRef = useRef(null)
  const thumbRef = useRef(null)
  const rafRef = useRef(null)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftStartRef = useRef(0)
  const hasMovedRef = useRef(false)

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(projects.length > 1)

  const updateSlider = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const { scrollLeft, scrollWidth, clientWidth } = track
    const maxScroll = Math.max(0, scrollWidth - clientWidth)

    setCanScrollPrev(scrollLeft > 4)
    setCanScrollNext(scrollLeft < maxScroll - 4)

    if (thumbRef.current && progressTrackRef.current) {
      const barWidth = progressTrackRef.current.clientWidth || 160
      if (scrollWidth <= clientWidth || maxScroll <= 0) {
        thumbRef.current.style.width = `${barWidth}px`
        thumbRef.current.style.transform = 'translateX(0px)'
      } else {
        const visibleRatio = Math.min(1, clientWidth / scrollWidth)
        const calculatedWidth = Math.max(28, Math.round(visibleRatio * barWidth))
        const scrollRatio = Math.min(1, Math.max(0, scrollLeft / maxScroll))
        const maxTranslate = barWidth - calculatedWidth
        const calculatedTranslate = Math.round(scrollRatio * maxTranslate)

        thumbRef.current.style.width = `${calculatedWidth}px`
        thumbRef.current.style.transform = `translateX(${calculatedTranslate}px)`
      }
    }
  }, [])

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(updateSlider)
  }, [updateSlider])

  useEffect(() => {
    updateSlider()
    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateSlider)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateSlider])

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return

    const firstCard = track.querySelector('.project-card')
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 480
    const gap = window.innerWidth >= 1024 ? 28 : (window.innerWidth >= 768 ? 20 : 16)
    const scrollAmount = (cardWidth + gap) * direction

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    track.scrollBy({
      left: scrollAmount,
      behavior: prefersReduced ? 'auto' : 'smooth'
    })
  }

  const handlePrev = () => scrollByCard(-1)
  const handleNext = () => scrollByCard(1)

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    if (e.target.closest('a, button, .project-link-btn, .project-nav-btn')) return
    const track = trackRef.current
    if (!track) return

    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.pageX - track.offsetLeft
    scrollLeftStartRef.current = track.scrollLeft
    track.classList.add('is-dragging')
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const track = trackRef.current
    if (!track) return

    e.preventDefault()
    const x = e.pageX - track.offsetLeft
    const walk = (x - startXRef.current) * 1.2
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true
    }
    track.scrollLeft = scrollLeftStartRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    trackRef.current?.classList.remove('is-dragging')
  }

  const handleCardLinkClick = (e) => {
    if (hasMovedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handlePreviewEnter = (e) => {
    const frame = e.currentTarget
    const img = frame.querySelector('.project-preview-img')
    if (!img) return
    const overflow = img.offsetHeight - frame.offsetHeight
    if (overflow > 15) {
      img.style.setProperty('--scroll-translate', `-${overflow}px`)
      img.classList.add('can-scroll')
    } else {
      img.classList.remove('can-scroll')
    }
  }

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="projects-header-wrapper">
          <div className="projects-header">
            <div data-animate="fade-up" style={{ '--reveal-delay': '0.05s' }}>
              <span className="section-tag">✦ Portfolio</span>
            </div>
            <h2 className="section-title" data-animate="fade-up" style={{ '--reveal-delay': '0.15s' }}>
              I make Incredible Projects
            </h2>
            <p className="projects-subtitle" data-animate="fade-up" style={{ '--reveal-delay': '0.25s' }}>
              A collection of projects I've built, showcasing my skills in full-stack development.
            </p>
          </div>

          {projects.length > 1 && (
            <div className="projects-controls" aria-label="Projects navigation">
              <button
                type="button"
                className="project-nav-btn prev-btn"
                onClick={handlePrev}
                disabled={!canScrollPrev}
                aria-label="Previous project"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
              </button>
              <button
                type="button"
                className="project-nav-btn next-btn"
                onClick={handleNext}
                disabled={!canScrollNext}
                aria-label="Next project"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div
          className="projects-track"
          ref={trackRef}
          onScroll={onScroll}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          tabIndex={0}
          role="region"
          aria-label="Projects"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card"
              data-animate="fade-up"
              style={{ '--i': i }}
              id={`project-${project.id}`}
            >
              {/* Preview Frame with Browser Chrome */}
              <div className="project-preview-frame">
                <div className="browser-bar" aria-hidden="true">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-preview-anchor"
                  aria-label={`View live site for ${project.title}`}
                  title="View live site"
                  onClick={handleCardLinkClick}
                  onMouseEnter={handlePreviewEnter}
                >
                  <div className="project-preview-viewport">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        className="project-preview-img"
                        width="1200"
                        height="750"
                        loading="lazy"
                      />
                    ) : (
                      <div className="project-preview-placeholder">
                        <span className="placeholder-icon">{project.icon}</span>
                        <span className="placeholder-title">{project.title}</span>
                      </div>
                    )}

                    <div className="view-live-pill" aria-hidden="true">
                      <span>View Live</span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

              {/* Header Row: Big Number + Title/Type + Arrow Button */}
              <div className="project-header-row">
                <div className="project-number-wrap">
                  <span className="project-number">{project.id}</span>
                </div>

                <div className="project-title-wrap">
                  <h3 className="project-title" title={project.title}>{project.title}</h3>
                  <span className="project-type">{project.type}</span>
                </div>

                <a
                  href={project.liveUrl}
                  className="project-link-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live website`}
                  title="View live site"
                  onClick={handleCardLinkClick}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>
              </div>

              {/* Tools and features */}
              <div className="project-meta-wrap">
                <span className="project-meta-label">Tools and features</span>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="project-desc">{project.description}</p>

              {/* Card Glow Blob */}
              <div className="project-card-glow" style={{ '--glow-color': project.color }} />
            </div>
          ))}
        </div>

        {projects.length > 1 && (
          <div className="projects-progress-wrapper" aria-hidden="true">
            <div className="projects-progress-track" ref={progressTrackRef}>
              <div className="projects-progress-thumb" ref={thumbRef} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
