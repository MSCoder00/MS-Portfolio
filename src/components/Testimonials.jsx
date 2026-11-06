import { useState, useRef, useEffect, useCallback } from 'react'
import './Testimonials.css'

// SAMPLE REVIEWS - replace with real feedback before publishing
const testimonials = [
  {
    id: 'test-1',
    name: 'Ahmed Raza',
    role: 'Team Lead / Tech Lead',
    company: 'Tech Solutions',
    rating: 5.0,
    text: 'Shifat is an incredibly talented full-stack developer. His attention to detail, mastery over both frontend user experience and backend API architecture is remarkable. He consistently delivers high-quality, scalable solutions.',
    initials: 'AR',
    color: '#9333ea',
    gradient: 'linear-gradient(135deg, #9333ea, rgba(0,0,0,0.5))'
  },
  {
    id: 'test-2',
    isSample: true,
    name: 'Tanvir Hasan',
    initials: 'TH',
    role: 'Senior Software Engineer',
    rating: 5.0,
    text: "Shifat picks things up fast and doesn't wait to be told what to do next. He took a feature from the database schema to the finished React screen on his own, and the code was clean enough that we merged it with almost no review comments.",
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)'
  },
  {
    id: 'test-3',
    isSample: true,
    name: 'Nusrat Jahan',
    initials: 'NJ',
    role: 'Engineering Mentor · Internship Program',
    rating: 4.9,
    text: 'During the internship he asked good questions, took feedback well and never repeated the same mistake twice. His REST API work and the way he handled authentication were well above what I expect at this level.',
    color: '#6d28d9',
    gradient: 'linear-gradient(135deg, #6d28d9, #8b5cf6)'
  },
  {
    id: 'test-4',
    isSample: true,
    name: 'Rakibul Islam',
    initials: 'RI',
    role: 'Project Lead',
    rating: 5.0,
    text: 'Reliable and easy to work with. Deadlines were never a surprise, he told us early when something was at risk, and his pull requests always came with clear notes. I would happily work with him again.',
    color: '#5b21b6',
    gradient: 'linear-gradient(135deg, #5b21b6, #9333ea)'
  },
  {
    id: 'test-5',
    isSample: true,
    name: 'Farhana Akter',
    initials: 'FA',
    role: 'Classmate & Project Teammate · University of Dhaka',
    rating: 4.8,
    text: 'In our group project Shifat took the backend and deployment, and he also helped everyone else debug their code. The app was live and stable while other groups were still fixing local errors.',
    color: '#4f46e5',
    gradient: 'linear-gradient(135deg, #4f46e5, #a855f7)'
  },
  {
    id: 'test-6',
    isSample: true,
    name: 'Imran Chowdhury',
    initials: 'IC',
    role: 'Freelance Client',
    rating: 5.0,
    text: 'I needed a working site fast and he delivered it ahead of schedule. It is quick, looks great on my phone, and he explained everything in plain language. Communication was excellent throughout.',
    color: '#7e22ce',
    gradient: 'linear-gradient(135deg, #7e22ce, #c084fc)'
  }
]

const StarRating = ({ rating }) => {
  const score = typeof rating === 'number' ? rating.toFixed(1) : rating
  return (
    <div className="star-rating" aria-label={`${score} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          className="star filled"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span className="rating-score">{score}</span>
    </div>
  )
}

const Testimonials = () => {
  const trackRef = useRef(null)
  const progressTrackRef = useRef(null)
  const thumbRef = useRef(null)
  const rafRef = useRef(null)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftStartRef = useRef(0)
  const hasMovedRef = useRef(false)

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(testimonials.length > 1)

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
        const calculatedWidth = Math.max(24, Math.round(visibleRatio * barWidth))
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

    const firstCard = track.querySelector('.testimonial-card')
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 340
    const gap = window.innerWidth >= 1024 ? 24 : (window.innerWidth >= 768 ? 16 : 14)
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
    if (e.target.closest('button, .testimonial-nav-btn')) return
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

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="testimonials-header-wrapper">
          <div className="testimonials-header">
            <div data-animate="fade-up" style={{ '--reveal-delay': '0.05s' }}>
              <span className="section-tag">✦ Reviews</span>
            </div>
            <h2 className="section-title" data-animate="fade-up" style={{ '--reveal-delay': '0.15s' }}>
              What They Say About Me
            </h2>
            <p className="testimonials-subtitle" data-animate="fade-up" style={{ '--reveal-delay': '0.25s' }}>
              Feedback from colleagues, supervisors, and mentors who have worked with me.
            </p>
          </div>

          {testimonials.length > 1 && (
            <div className="testimonials-controls" aria-label="Review navigation">
              <button
                type="button"
                className="testimonial-nav-btn prev-btn"
                onClick={handlePrev}
                disabled={!canScrollPrev}
                aria-label="Previous review"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
              </button>
              <button
                type="button"
                className="testimonial-nav-btn next-btn"
                onClick={handleNext}
                disabled={!canScrollNext}
                aria-label="Next review"
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
          className="testimonials-grid"
          ref={trackRef}
          onScroll={onScroll}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          tabIndex={0}
          role="region"
          aria-label="Customer reviews"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="testimonial-card"
              data-animate="fade-up"
              style={{ '--i': i }}
              id={t.id}
            >
              <div className="testimonial-quote">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <StarRating rating={t.rating} />

              <p className="testimonial-text">"{t.text}"</p>

              <div className="testimonial-author">
                <div
                  className="author-avatar"
                  style={{
                    '--avatar-color': t.color,
                    '--avatar-gradient': t.gradient
                  }}
                >
                  {t.initials}
                </div>
                <div className="author-info">
                  <span className="author-name">{t.name}</span>
                  <span className="author-role">
                    {t.company ? `${t.role} · ${t.company}` : t.role}
                  </span>
                </div>
              </div>

              <div className="testimonial-glow" style={{ '--glow-color': t.color }} />
            </div>
          ))}
        </div>

        {testimonials.length > 1 && (
          <div className="testimonials-progress-wrapper" aria-hidden="true">
            <div className="testimonials-progress-track" ref={progressTrackRef}>
              <div className="testimonials-progress-thumb" ref={thumbRef} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
