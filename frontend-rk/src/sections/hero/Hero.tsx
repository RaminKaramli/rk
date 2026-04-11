import { heroSocialLinks } from '../../data/socials'
import SocialLinks from '../../components/common/social-links/SocialLinks'
import { media, siteContent } from '../../utils/constants'

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
          <SocialLinks links={heroSocialLinks} className="sosial-icons" />
        </div>
      </div>
    </section>
  )
}
