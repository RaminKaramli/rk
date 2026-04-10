import { forwardRef } from 'react'
import { footerSocialLinks, media, siteContent } from '../data/site'
import { useFooterClock } from '../hooks/useFooterClock'

const SiteFooter = forwardRef<HTMLDivElement>(function SiteFooter(_, ref) {
  const footerClock = useFooterClock('Asia/Baku')

  return (
    <footer className="site-footer" id="site-footer">
      <div ref={ref} className="site-footer__container">
        <div className="site-footer__top">
          <section className="site-footer__cta" aria-label="Contact call to action">
            <p className="site-footer__eyebrow">HAVE A PROJECT IN MIND?</p>
            <a className="site-footer__talk" href={`mailto:${siteContent.contactEmail}`}>
              LET&apos;S TALK
            </a>
          </section>

          <aside className="site-footer__photo-wrap" aria-label="Childhood portrait">
            <div className="site-footer__photo">
              <img src={media.footerPortrait} alt="Ramin childhood portrait" />
            </div>
          </aside>
        </div>

        <nav className="site-footer__socials" aria-label="Social links">
          {footerSocialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__pill"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__bottom">
          <p className="site-footer__meta">{siteContent.footerMeta}</p>
          <p className="site-footer__clock" id="footerClock" data-time-zone="Asia/Baku" aria-live="polite">
            {footerClock}
          </p>
        </div>
      </div>
    </footer>
  )
})

export default SiteFooter
