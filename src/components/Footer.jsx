import React from 'react'
import './Footer.css'
import { contactConfig } from '../data/contactConfig'

export { contactConfig }

const socialLinks = [
  {
    id: 'footer-linkedin',
    label: 'LinkedIn',
    href: contactConfig.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    id: 'footer-github',
    label: 'GitHub',
    href: contactConfig.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    )
  },
  {
    id: 'footer-facebook',
    label: 'Facebook',
    href: contactConfig.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    id: 'footer-instagram',
    label: 'Instagram',
    href: contactConfig.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )
  }
]

const quickLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
]

const servicesList = [
  'Frontend Development',
  'Backend & APIs',
  'Database Design',
  'Deployment & DevOps'
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollTo = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="footer-site" id="site-footer">
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col footer-col-brand" data-animate="fade-up" style={{ '--i': 0 }}>
            <div className="footer-logo" onClick={() => scrollTo('home')} role="button" tabIndex={0}>
              <span className="logo-main">MS</span>
              <span className="logo-accent"> Coder</span>
            </div>
            <p className="footer-brand-desc">
              Full-Stack Developer building fast, scalable and beautiful web applications, from pixel-perfect interfaces to reliable backend systems.
            </p>
            <div className="footer-status-pill">
              <span className="status-dot-pulse" aria-hidden="true" />
              <span>Available for Work</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col" data-animate="fade-up" style={{ '--i': 1 }}>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    className="footer-link-btn"
                    onClick={() => scrollTo(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: What I Do */}
          <div className="footer-col" data-animate="fade-up" style={{ '--i': 2 }}>
            <h4 className="footer-col-title">What I Do</h4>
            <ul className="footer-services-list">
              {servicesList.map((service) => (
                <li key={service} className="footer-service-item">
                  <span className="service-bullet">✦</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="footer-col" data-animate="fade-up" style={{ '--i': 3 }}>
            <h4 className="footer-col-title">Get In Touch</h4>
            <div className="footer-contact-info">
              {/* Email — whole row is a clickable Gmail compose link */}
              <a
                href={contactConfig.gmailLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Send an email to ${contactConfig.email}`}
                title="Send me an email"
                className="footer-contact-row footer-contact-row--link"
              >
                <span className="contact-row-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <span className="footer-contact-val">{contactConfig.email}</span>
              </a>

              {/* Phone */}
              <div className="footer-contact-row">
                <span className="contact-row-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </span>
                <a href="tel:+8801742697332" className="footer-contact-val">{contactConfig.phone}</a>
              </div>

              {/* Location */}
              <div className="footer-contact-row">
                <span className="contact-row-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span className="footer-contact-val">{contactConfig.footerLocation}</span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="footer-social-row">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} profile`}
                  title={s.label}
                  id={s.id}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Thin Gradient Divider Line */}
        <div className="footer-divider-line" aria-hidden="true" />

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {currentYear} MS Coder. All rights reserved.
          </p>

          <p className="footer-credit">
            Designed & Built by MD Shifat
          </p>

          <button
            className="back-to-top-btn"
            onClick={() => scrollTo('home')}
            aria-label="Back to top"
            id="back-to-top"
          >
            <span className="back-to-top-arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
