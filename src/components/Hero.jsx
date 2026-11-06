import { useEffect, useState } from 'react'
import './Hero.css'
import heroCutout from '../assets/images/hero-portrait-cutout.webp'

const Hero = () => {
  const [visible, setVisible] = useState(false)
  const [revealState, setRevealState] = useState('hidden-bottom')

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // UPside Text Reveal Loop
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealState('visible')
      return
    }

    let isMounted = true
    let timeoutId

    const runLoop = async () => {
      // 1. Reveal UP
      if (!isMounted) return
      setRevealState('visible')

      // Hold visible for ~3.4s (4200ms total including entrance)
      await new Promise(r => { timeoutId = setTimeout(r, 4200) })
      if (!isMounted) return

      // 2. Exit UP (slide upwards and out)
      setRevealState('hidden-top')

      // Wait for exit transition to finish (~850ms)
      await new Promise(r => { timeoutId = setTimeout(r, 850) })
      if (!isMounted) return

      // 3. Reset to bottom instantly (no animation)
      setRevealState('hidden-bottom')

      // Short pause before next upward reveal
      await new Promise(r => { timeoutId = setTimeout(r, 100) })
      if (!isMounted) return

      runLoop()
    }

    timeoutId = setTimeout(runLoop, 250)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section className={`hero ${visible ? 'visible' : ''}`} id="home">
      {/* Background ambient purple glows */}
      <div className="hero-bg-glows" aria-hidden="true">
        <div className="hero-glow-top-left" />
      </div>

      {/* 3-column layout, vertically centered */}
      <div className="hero-inner">
        {/* LEFT COLUMN — Greeting + Big Bold White Name with Line-by-Line Mask Reveals */}
        <div className="hero-left">
          <div className="hero-mask-wrap">
            <p className="hero-greeting hero-mask-item hero-anim-greeting">
              Hello, I'm
            </p>
          </div>
          <h1 className="hero-name">
            <div className="hero-mask-wrap">
              <span className="name-line hero-mask-item hero-anim-name-1">
                MD
              </span>
            </div>
            <div className="hero-mask-wrap">
              <span className="name-line hero-mask-item hero-anim-name-2">
                Shifat
              </span>
            </div>
          </h1>
        </div>

        {/* CENTER COLUMN — Transparent cutout portrait with Blur-to-Sharp transition */}
        <div className="hero-center">
          <div className="hero-img-container">
            {/* Ambient glows behind photo fade in last */}
            <div className="hero-head-glow hero-anim-glow" aria-hidden="true" />
            <div className="hero-shoulder-glow left hero-anim-glow" aria-hidden="true" />
            <div className="hero-shoulder-glow right hero-anim-glow" aria-hidden="true" />

            <div className="hero-img-wrapper hero-anim-photo">
              <img
                src={heroCutout}
                alt="MD Shifat, Full-Stack Developer"
                className="hero-img"
                fetchPriority="high"
                decoding="async"
                width="408"
                height="612"
              />
              <div className="hero-img-fade" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Creative, Full-Stack, Developer UPside Text Reveal */}
        <div className="hero-right">
          <div className="hero-role-block">
            <div className="hero-role-glow" aria-hidden="true" />
            <div className="role-mask-wrap">
              <p className={`hero-role-label role-reveal-item delay-role-label state-${revealState}`}>
                Creative
              </p>
            </div>
            <div className="hero-role-heading" aria-label="Full-Stack Developer">
              <div className="role-mask-wrap">
                <span className={`role-gradient role-reveal-item delay-role-grad state-${revealState}`}>
                  Full-Stack
                </span>
              </div>
              <div className="role-mask-wrap">
                <span className={`role-solid role-reveal-item delay-role-solid state-${revealState}`}>
                  Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
