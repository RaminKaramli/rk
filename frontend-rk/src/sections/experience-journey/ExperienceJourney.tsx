import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const experienceCards = [
  {
    type: 'role',
    className: 'experience-journey-card--dark experience-journey-card--span-4',
    brand: 'Gabriel AI',
    role: 'Product Designer',
    date: "Oct '25 - Present",
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
    type: 'role',
    className: 'experience-journey-card--purple experience-journey-card--span-4',
    brand: 'accenture',
    role: 'Product Designer',
    date: "Aug '22 - July '24",
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
    type: 'social',
    className: 'experience-journey-card--instagram experience-journey-card--span-3',
    brand: 'Instagram',
    href: 'https://www.instagram.com/karamliramin/',
  },
  {
    type: 'role',
    className: 'experience-journey-card--dark experience-journey-card--span-10 experience-journey-card--short',
    brand: 'MERCOR',
    role: 'Product/UX Design Expert',
    date: "Jan '26 - Present",
  },
  {
    type: 'resume',
    className: 'experience-journey-card--resume experience-journey-card--span-2 experience-journey-card--short',
    brand: 'Resume',
  },
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
        <path strokeDasharray={66} d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"></animate>
        </path>
        <path strokeDasharray={28} strokeDashoffset={28} d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" to={0}></animate>
        </path>
      </g>
      <circle cx={17} cy={7} r={1.5} fill="#000000" opacity={0}>
        <animate fill="freeze" attributeName="opacity" begin="1.3s" dur="0.2s" to={1}></animate>
      </circle>
    </svg>
  )
}

export default function ExperienceJourney() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // LinkedIn Animation
      const linkedinCard = containerRef.current?.querySelector('.experience-journey-card--linkedin')
      if (linkedinCard) {
        const circle = linkedinCard.querySelector('.linkedin-circle')
        const paths = [
          linkedinCard.querySelector('.linkedin-path-1'),
          linkedinCard.querySelector('.linkedin-path-2'),
          linkedinCard.querySelector('.linkedin-path-3')
        ]

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: linkedinCard,
            start: 'top 85%',
            toggleActions: 'restart none none none',
          }
        })

        tl.to(circle, { opacity: 1, duration: 0.4 })
        paths.forEach((path) => {
          tl.to(path, { strokeDashoffset: 0, duration: 0.4 }, '+=0.1')
        })
      }
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
            ) : card.type === 'social' ? (
              <a className="experience-journey-card__social" href={card.href} target="_blank" rel="noopener noreferrer">
                <span className="experience-journey-card__social-icon" aria-hidden="true">
                  {card.brand === 'LinkedIn' ? <LineMdLinkedin /> : <LineMdInstagram />}
                </span>
              </a>
            ) : card.type === 'resume' ? (
              <a className="experience-journey-card__resume" href="/?page=about">
                <span aria-hidden="true">▤</span>
                Resume -&gt;
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
