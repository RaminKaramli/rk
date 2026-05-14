import { useLayoutEffect, useRef } from 'react'
import CvIcon from '@iconify-react/pepicons-pop/cv'
import { Icon } from '@iconify/react'
import { ScrollTrigger, gsap } from '../../lib/gsap'
import downloadVideo from '../../assets/videos/download.mp4'

const experienceCards = [
  {
    type: 'video',
    className: 'experience-journey-card--video experience-journey-card--span-4',
    brand: 'Download video',
  },
  {
    type: 'quote',
    className: 'experience-journey-card--quote experience-journey-card--span-8',
    quote:
      'She has a strong ability to break down complex requirements into clean, intuitive UX while keeping the broader business context in mind, which made collaboration across product and engineering smooth & efficient.',
    name: 'Vishnu Purushotama Sanjeev',
    meta: 'Product Operations Coordinator @Gabriel AI',
  },
  {
    type: 'quote',
    className: 'experience-journey-card--quote experience-journey-card--span-6',
    quote:
      'Shambhavi is a self-starter who quickly understands the task, sketches ideas early, and keeps refining them until the solution feels right.',
    name: 'Vignesh Ravichandran',
    meta: 'Founder @ MyClone',
  },
  {
    type: 'social',
    className: 'experience-journey-card--linkedin experience-journey-card--span-3',
    brand: 'LinkedIn',
    href: 'https://www.linkedin.com/in/karamliramin/',
  },
  {
    type: 'role',
    className: 'experience-journey-card--pink experience-journey-card--span-3',
    brand: 'CNN',
    role: 'Product Designer',
    date: "Jan '25 - Aug '25",
  },
  {
    type: 'social',
    className: 'experience-journey-card--instagram experience-journey-card--span-3',
    brand: 'Instagram',
    href: 'https://www.instagram.com/karamliramin/',
  },
  {
    type: 'quote',
    className: 'experience-journey-card--quote experience-journey-card--span-5',
    quote:
      'Clear communication with stakeholders & she independently handled all deliverables, making her a reliable teammate.',
    name: 'Manya Singh',
    meta: 'Product Designer @Actual AI',
  },
  {
    type: 'stack',
    className: 'experience-journey-card--tech-stack experience-journey-card--span-4',
    brand: 'My Tech Stack',
  },
  {
    type: 'github',
    className: 'experience-journey-card--github experience-journey-card--span-10 experience-journey-card--short',
    brand: 'GitHub',
    href: 'https://github.com/RaminKaramli?tab=overview&from=2026-05-01&to=2026-05-14',
  },
  {
    type: 'resume',
    className: 'experience-journey-card--resume experience-journey-card--span-2 experience-journey-card--short',
    brand: 'Resume',
  },
]

const contributionLevels = [
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 1, 1, 2, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 2, 1, 3, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 4, 4, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 3, 2, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 1, 3, 1, 2, 2, 2, 0, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 2, 0, 1, 1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
].flat()

const contributionMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const contributionDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const techStackItems = [
  { name: 'Photoshop', icon: 'simple-icons:adobephotoshop' },
  { name: 'Figma', icon: 'logos:figma' },
  { name: 'Notion', icon: 'simple-icons:notion' },
  { name: 'OpenAI', icon: 'simple-icons:openai' },
  { name: 'Supabase', icon: 'simple-icons:supabase' },
  { name: 'Framer', icon: 'simple-icons:framer' },
]

function LineMdLinkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <circle className="linkedin-circle" cx={4} cy={4} r={2} fill="#ffffff" opacity={0} />
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
        <path className="linkedin-path-1" strokeDasharray={12} strokeDashoffset={12} d="M4 10v10" />
        <path className="linkedin-path-2" strokeDasharray={12} strokeDashoffset={12} d="M10 10v10" />
        <path className="linkedin-path-3" strokeDasharray={24} strokeDashoffset={24} d="M10 15c0 -2.76 2.24 -5 5 -5c2.76 0 5 2.24 5 5v5" />
      </g>
    </svg>
  )
}

function LineMdInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <path className="instagram-frame" strokeDasharray={66} strokeDashoffset={66} d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z" />
        <path className="instagram-lens" strokeDasharray={28} strokeDashoffset={28} d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4" />
      </g>
      <circle className="instagram-dot" cx={17} cy={7} r={1.5} fill="#000000" opacity={0} />
    </svg>
  )
}

export default function ExperienceJourney() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const linkedinCard = containerRef.current?.querySelector('.experience-journey-card--linkedin')
      if (linkedinCard) {
        const circle = linkedinCard.querySelector('.linkedin-circle')
        const paths = [
          linkedinCard.querySelector('.linkedin-path-1'),
          linkedinCard.querySelector('.linkedin-path-2'),
          linkedinCard.querySelector('.linkedin-path-3')
        ]

        gsap.set(circle, { opacity: 0 })
        gsap.set(paths[0], { strokeDashoffset: 12 })
        gsap.set(paths[1], { strokeDashoffset: 12 })
        gsap.set(paths[2], { strokeDashoffset: 24 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: linkedinCard,
            once: true,
            start: 'top 85%',
          }
        })

        tl.to(circle, { opacity: 1, duration: 0.22 })
        paths.forEach((path) => {
          tl.to(path, { strokeDashoffset: 0, duration: 0.32, ease: 'none' }, '+=0.06')
        })
      }

      const instagramCard = containerRef.current?.querySelector('.experience-journey-card--instagram')
      if (instagramCard) {
        const frame = instagramCard.querySelector('.instagram-frame')
        const lens = instagramCard.querySelector('.instagram-lens')
        const dot = instagramCard.querySelector('.instagram-dot')

        gsap.set(frame, { strokeDashoffset: 66 })
        gsap.set(lens, { strokeDashoffset: 28 })
        gsap.set(dot, { opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: instagramCard,
            once: true,
            start: 'top 85%',
          }
        })

        tl.to(frame, { strokeDashoffset: 0, duration: 0.4, ease: 'none' })
          .to(lens, { strokeDashoffset: 0, duration: 0.4, ease: 'none' }, '+=0.06')
          .to(dot, { opacity: 1, duration: 0.16 }, '+=0.06')
      }

      const githubCard = containerRef.current?.querySelector('.experience-journey-card--github')
      if (githubCard) {
        const graph = githubCard.querySelector('.graph')

        gsap.set(graph, { opacity: 0 })
        gsap.to(graph, {
          opacity: 1,
          duration: 0.7,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: githubCard,
            once: true,
            start: 'top 85%',
          },
        })
      }

      const resumeCard = containerRef.current?.querySelector('.experience-journey-card--resume')
      if (resumeCard) {
        const resumeIcon = resumeCard.querySelector('.experience-journey-card__resume-icon')
        const resumeButton = resumeCard.querySelector('.experience-journey-card__resume-button')

        gsap.set([resumeIcon, resumeButton], { opacity: 0, y: 12, scale: 0.9 })
        gsap.timeline({
          scrollTrigger: {
            trigger: resumeCard,
            once: true,
            start: 'top 85%',
          },
        })
          .to(resumeIcon, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: 'back.out(1.6)' })
          .to(resumeButton, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'power2.out' }, '-=0.12')
      }

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="experience-journey" aria-label="Experience" ref={containerRef}>
      <div className="experience-journey__grid">
        {experienceCards.map((card) => (
          <article className={`experience-journey-card ${card.className}`} key={`${card.type}-${card.brand}`}>
            {card.type === 'quote' ? (
              <>
                <p className="experience-journey-card__quote">"{card.quote}"</p>
                <div className="experience-journey-card__person">
                  <span aria-hidden="true">{card.name?.charAt(0)}</span>
                  <div>
                    <strong>{card.name}</strong>
                    <small>{card.meta}</small>
                  </div>
                </div>
              </>
            ) : card.type === 'video' ? (
              <video
                className="experience-journey-card__video"
                src={downloadVideo}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => ScrollTrigger.refresh()}
                aria-label={card.brand}
              />
            ) : card.type === 'stack' ? (
              <>
                <h3 className="experience-journey-card__stack-title">{card.brand}</h3>
                <div className="experience-journey-card__stack-marquee" aria-label="My tech stack">
                  {[0, 1].map((row) => (
                    <ul className="experience-journey-card__stack-track" key={row} aria-hidden={row === 1}>
                      {[...techStackItems, ...techStackItems].map((item, index) => (
                        <li className="experience-journey-card__stack-item" key={`${row}-${item.name}-${index}`}>
                          <Icon icon={item.icon} aria-hidden="true" />
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </>
            ) : card.type === 'social' ? (
              <a className="experience-journey-card__social" href={card.href} target="_blank" rel="noopener noreferrer">
                <span className="experience-journey-card__social-icon" aria-hidden="true">
                  {card.brand === 'LinkedIn' ? <LineMdLinkedin /> : <LineMdInstagram />}
                </span>
              </a>
            ) : card.type === 'resume' ? (
              <a className="experience-journey-card__resume" href="/?page=about">
                <CvIcon className="experience-journey-card__resume-icon" aria-hidden="true" />
                <span className="experience-journey-card__resume-button">
                  <span className="experience-journey-card__resume-icon-wrapper" aria-hidden="true">
                    <svg className="experience-journey-card__resume-arrow" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                    </svg>
                    <svg className="experience-journey-card__resume-arrow experience-journey-card__resume-arrow--copy" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                    </svg>
                  </span>
                  Resume
                </span>
              </a>
            ) : card.type === 'github' ? (
              <a className="experience-journey-card__github" href={card.href} target="_blank" rel="noopener noreferrer">
                <div className="graph">
                  <ul className="months">
                    {contributionMonths.map((month) => (
                      <li key={month}>{month}</li>
                    ))}
                  </ul>
                  <ul className="days">
                    {contributionDays.map((day) => (
                      <li key={day}>{day}</li>
                    ))}
                  </ul>
                  <ul className="squares" aria-label="GitHub contributions in 2026">
                    {contributionLevels.map((level, index) => (
                      <li data-level={level} key={index} />
                    ))}
                  </ul>
                  <div className="contribution-footer">
                    <div className="contribution-legend" aria-hidden="true">
                      <span>Less</span>
                      {[0, 1, 2, 3, 4].map((level) => (
                        <i data-level={level} key={level} />
                      ))}
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <>
                <div className="experience-journey-card__brand">{card.brand}</div>
                <div className="experience-journey-card__details">
                  <p>{card.role}</p>
                  <span>{card.date}</span>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
