import { useState, useEffect } from 'react'
import './Navbar.css'

const AnimatedNavLabel = ({ label }) => {
  const [display, setDisplay] = useState({ current: label, prev: null, animating: false })

  if (label !== display.current && !display.animating) {
    setDisplay({ current: label, prev: display.current, animating: true })
  }

  useEffect(() => {
    if (display.animating) {
      const timer = setTimeout(() => {
        setDisplay(prev => ({ ...prev, prev: null, animating: false }))
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [display.animating])

  return (
    <span className="nav-label-container">
      {display.prev && (
        <span className="nav-label-text nav-label-exit">
          {display.prev}
        </span>
      )}
      <span className={`nav-label-text ${display.animating ? 'nav-label-enter' : ''}`}>
        {display.current}
      </span>
    </span>
  )
}

const Navbar = ({ activeExpTab = 'experience' }) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const scrollPos = window.scrollY + 200
      const contactEl = document.getElementById('contact')
      const projectsEl = document.getElementById('projects')
      const experienceEl = document.getElementById('experience')
      const aboutEl = document.getElementById('about')

      if (contactEl && contactEl.offsetTop <= scrollPos) {
        setActiveLink('contact')
      } else if (projectsEl && projectsEl.offsetTop <= scrollPos) {
        setActiveLink('projects')
      } else if (experienceEl && experienceEl.offsetTop <= scrollPos) {
        setActiveLink('experience')
      } else if (aboutEl && aboutEl.offsetTop <= scrollPos) {
        setActiveLink('about')
      } else {
        setActiveLink('home')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const expLabel = activeExpTab === 'education' ? 'Education' : 'Experience'

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'experience', label: expLabel, isDynamic: true },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  const scrollTo = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container navbar-inner">
        <div className="navbar-logo" onClick={() => scrollTo('home')} role="button" tabIndex={0}>
          <span className="logo-text">
            MS <span className="logo-accent">Coder</span>
          </span>
        </div>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`nav-link ${activeLink === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
              id={`nav-${link.id}`}
            >
              {link.isDynamic ? (
                <AnimatedNavLabel label={link.label} />
              ) : (
                link.label
              )}
            </button>
          ))}
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
