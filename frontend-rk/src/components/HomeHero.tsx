import { heroSocialLinks, media, siteContent } from '../data/site'
import SocialIcon from './SocialIcon'

export default function HomeHero() {
  return (
    <section id="home-section" className="hero-section">
      <div className="hero-middle">
        <p className="press-text-one">{siteContent.heroTopCopy}</p>

        <div className="hero-name-wrap">
          <h1 className="my-name" style={{ fontFamily: 'var(--headingnowtrial)', letterSpacing: '0.005em' }}>
            Ramin <span className="surname-black">KA</span>
            <span className="surname-filter">RAMLI</span>
          </h1>

          <div className="hero-figure">
            <img
              src={media.heroFigure}
              alt="Person waving while working on a laptop"
              className="hero-figure-image"
            />
          </div>
        </div>

        <p className="press-text-two">{siteContent.heroBottomCopy}</p>
      </div>

      <div id="left-right-full" className="bottom-row">
        <div className="top-left">
          <p>FRONT-END DEVELOPER</p>
          <p>UI/UX DESIGN</p>
        </div>

        <div className="top-right">
          <span className="sosial-icons">
            {heroSocialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.label}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </span>
        </div>
      </div>
    </section>
  )
}
