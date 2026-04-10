import { media, siteContent } from '../data/site'

export default function AboutShowcase() {
  return (
    <section className="about-showcase" aria-labelledby="about-showcase-title">
      <div className="about-showcase__container">
        <div className="about-showcase__background" aria-hidden="true">
          <div className="about-showcase__media-wrap">
            <img
              src={media.aboutShowcaseMotion}
              alt="Ramin portrait in motion"
              decoding="auto"
              width="1536"
              height="1024"
            />
          </div>
        </div>

        <div className="about-showcase__foreground" aria-hidden="true">
          <div className="about-showcase__foreground-frame">
            <div className="about-showcase__media-wrap about-showcase__media-wrap--foreground">
              <img
                src={media.aboutShowcaseMotion}
                alt="Ramin portrait in motion"
                decoding="auto"
                width="1536"
                height="1024"
              />
            </div>
          </div>
        </div>

        <div className="about-showcase__overlay" aria-hidden="true" />

        <div className="about-showcase__content">
          <div className="about-showcase__left">
            <p className="about-showcase__year">©2026</p>
            <h1 className="about-showcase__title" id="about-showcase-title">
              <span>About</span>
              <span>Ramin</span>
            </h1>
          </div>

          <div className="about-showcase__right">
            <div className="about-showcase__body">
              <p>{siteContent.aboutLead}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
