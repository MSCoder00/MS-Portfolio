import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

// ─── 1. Global reveal system ───────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    // Initial observation + re-observe on DOM changes (for dynamic content)
    const observe = () => {
      document.querySelectorAll('[data-animate]:not(.revealed)').forEach((el) =>
        observer.observe(el)
      )
    }
    observe()

    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { observer.disconnect(); mo.disconnect() }
  }, [])
}

// ─── 2. Stat counter ──────────────────────────────────────────────────────
export function useStatCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll('[data-count]')
    if (!counters.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counters.forEach((el) => {
        const target = el.dataset.count
        const suffix = el.dataset.countSuffix || ''
        el.textContent = target + suffix
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const target = parseInt(el.dataset.count, 10)
          const suffix = el.dataset.countSuffix || ''
          const duration = 1200
          const start = performance.now()
          el.textContent = '0' + suffix

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.floor(eased * target) + suffix
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.unobserve(el)
        })
      },
      { threshold: 0.2 }
    )
    counters.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── 3. Scroll progress bar ──────────────────────────────────────────────
function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])
}

// ─── 4. Cursor ────────────────────────────────────────────────────────────
function useCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    const circle = document.createElement('div')
    circle.className = 'custom-cursor-circle'
    cursor.appendChild(circle)
    document.body.appendChild(cursor)

    let mouseX = -100
    let mouseY = -100
    let cursorX = mouseX
    let cursorY = mouseY
    let isVisible = false
    let rafId

    const INTERACTIVE = 'a, button, [role="button"], .nav-link, .social-icon, .btn, .project-preview-anchor, .project-preview-frame, .testimonial-nav-btn'

    const hide = () => {
      cursor.classList.add('cursor--hidden')
    }

    const show = () => {
      cursor.classList.remove('cursor--hidden')
    }

    // Event delegation: instant hide on enter interactive element
    const handleMouseOver = (e) => {
      if (e.target?.closest(INTERACTIVE)) {
        hide()
      }
    }

    // Event delegation: instant reappear on leave, unless moving into another interactive element
    const handleMouseOut = (e) => {
      const leavingInteractive = e.target?.closest(INTERACTIVE)
      if (!leavingInteractive) return

      // Moving directly to another interactive item (e.g. nav items) -> stay hidden, no flash
      const enteringInteractive = e.relatedTarget?.closest(INTERACTIVE)
      if (enteringInteractive) return

      show()
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        cursorX = mouseX
        cursorY = mouseY
        cursor.classList.add('is-visible')
      }

      // Re-verify interactive state on move
      if (e.target?.closest(INTERACTIVE)) {
        hide()
      } else {
        show()
      }
    }

    const handleMouseLeave = () => {
      hide()
    }

    const handleMouseEnter = (e) => {
      if (e.target?.closest(INTERACTIVE)) {
        hide()
      } else {
        show()
      }
    }

    // Hide on blur (tab switch / leaving window)
    const handleBlur = () => hide()
    const handleFocus = () => { /* restored instantly on next pointer move */ }

    const animate = () => {
      const ease = 0.18
      cursorX += (mouseX - cursorX) * ease
      cursorY += (mouseY - cursorY) * ease
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      cancelAnimationFrame(rafId)
      cursor.parentNode?.removeChild(cursor)
    }
  }, [])
}

// ─── App Component ────────────────────────────────────────────────────────
function App() {
  const [activeExpTab, setActiveExpTab] = useState('experience')

  useReveal()
  useStatCounters()
  useScrollProgress()
  useCursor()

  return (
    <div className="app">
      {/* Scroll progress bar */}
      <div id="scroll-progress" aria-hidden="true" />

      {/* Background Orbs */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Navigation */}
      <Navbar activeExpTab={activeExpTab} onTabChange={setActiveExpTab} />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Experience activeTab={activeExpTab} onTabChange={setActiveExpTab} />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer — outside main so it pushes to bottom */}
      <Footer />
    </div>
  )
}

export default App
