import './About.css'
import aboutPortrait from '../assets/images/about-portrait.png'

const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Image Column */}
          <div className="about-image-col" data-animate="fade-left">
            <div className="about-image-wrapper">
              <div className="about-img-glow" />
              <div className="about-img-frame">
                <img
                  src={aboutPortrait}
                  alt="MD Shifat standing in a purple-lit studio"
                  className="about-img"
                  loading="lazy"
                  decoding="async"
                  width="375"
                  height="666"
                />
                {/* Bottom gradient overlay so badge stays readable */}
                <div className="about-img-overlay" />
              </div>
              <div className="about-badge" data-animate="fade-up" style={{ '--reveal-delay': '0.3s' }}>
                <span className="badge-dot" />
                <span>Available for Work</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="about-content-col">
            <div data-animate="fade-up" style={{ '--reveal-delay': '0.05s' }}>
              <span className="section-tag">✦ About Me</span>
            </div>
            <h2 className="section-title" data-animate="fade-up" style={{ '--reveal-delay': '0.15s' }}>
              Full-Stack Engineering & Design
            </h2>
            <p className="about-description" data-animate="fade-up" style={{ '--reveal-delay': '0.25s' }}>
              I'm a Full-Stack Developer passionate about building end-to-end web applications that combine
              intuitive, pixel-perfect user interfaces with reliable, high-performance backend systems.
            </p>
            <p className="about-description" data-animate="fade-up" style={{ '--reveal-delay': '0.35s' }}>
              From architecting scalable REST APIs, handling secure authentication, and designing databases (MongoDB, PostgreSQL)
              to crafting modern React and Next.js interfaces with seamless cloud deployment, I deliver complete digital solutions.
            </p>

            <div className="about-stats" data-animate="fade-up" style={{ '--reveal-delay': '0.45s' }}>
              <div className="stat-item">
                <span className="stat-number" data-count="4" data-count-suffix="+">4+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number" data-count="2" data-count-suffix="+">2+</span>
                <span className="stat-label">Internships</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number" data-count="1" data-count-suffix="+">1+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>

            <div className="about-cta" data-animate="fade-up" style={{ '--reveal-delay': '0.55s' }}>
              <a href="#" className="btn-primary" id="about-resume-btn">
                Download Resume
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
              <button
                className="btn-outline"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
