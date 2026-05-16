import { useLayoutEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { ScrollTrigger, gsap } from '../../lib/gsap'
import downloadVideo from '../../assets/videos/download.mp4'

interface ExperienceCard {
  type: 'video' | 'quote' | 'social' | 'role' | 'stack' | 'github' | 'resume'
  className: string
  brand?: string
  quote?: string
  name?: string
  meta?: string
  href?: string
  role?: string
  date?: string
}

const experienceCards: ExperienceCard[] = [
  {
    type: 'video',
    className: 'experience-journey-card--video experience-journey-card--span-4',
    brand: 'Portfolio Showcase',
  },
  {
    type: 'quote',
    className: 'experience-journey-card--quote experience-journey-card--span-8',
    quote:
      'He has a strong ability to break down complex requirements into clean, intuitive UX while keeping the broader business context in mind, which made collaboration across product and engineering smooth & efficient.',
    name: 'Vishnu Purushotama Sanjeev',
    meta: 'Product Operations Coordinator @Gabriel AI',
  },
  {
    type: 'quote',
    className: 'experience-journey-card--quote experience-journey-card--span-6',
    quote:
      'Ramin is a self-starter who quickly understands the task, sketches ideas early, and keeps refining them until the solution feels right.',
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
      'Clear communication with stakeholders & he independently handled all deliverables, making him a reliable teammate.',
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
    href: 'https://github.com/RaminKaramli',
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

function CustomHtmlIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-html5-plain" {...props}></i>
  )
}

const techStackItems = [
  { name: 'HTML', icon: 'custom-html' },
  { name: 'CSS', icon: 'custom-css' },
  { name: 'Sass', icon: 'custom-sass' },
  { name: 'JavaScript', icon: 'custom-js' },
  { name: 'TypeScript', icon: 'custom-ts' },
  { name: 'Node.js', icon: 'custom-nodejs' },
  { name: 'React', icon: 'custom-react' },
  { name: 'Tailwind CSS', icon: 'custom-tailwind' },
  { name: 'Bulma', icon: 'custom-bulma' },
  { name: 'Bootstrap', icon: 'custom-bootstrap' },
  { name: 'Figma', icon: 'custom-figma' },
  { name: 'OpenAI', icon: 'custom-openai' },
  { name: 'Claude Code', icon: 'custom-claudecode' },
  { name: 'GSAP', icon: 'custom-gsap' },
]

function CustomReactIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
    </svg>
  )
}

function CustomOpenaiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z" />
    </svg>
  )
}

function CustomClaudeCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" />
    </svg>
  )
}

function CustomGsapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M17.964 31.932c-0.417-0.073-0.849-0.271-1.094-0.49-0.167-0.172-0.26-0.406-0.266-0.646 0-0.245 0.125-0.589 0.323-0.932 0.12-0.193 0.214-0.401 0.281-0.62 0.042-0.151 0.13-0.396 0.198-0.552l0.12-0.286 0.031-1.911c0.016-1.057 0.047-2.036 0.073-2.188 0.068-0.438 0.182-0.865 0.333-1.281l0.115-0.276-0.167-0.099c-0.151-0.094-0.276-0.224-0.771-0.813-0.609-0.719-1.411-1.115-2.547-1.25-0.37-0.036-0.745-0.063-1.12-0.078-1.667-0.078-2.62-0.427-3.479-1.271-0.641-0.63-0.974-1.365-1.109-2.448-0.182-1.464-0.385-2.214-0.76-2.823-0.094-0.151-0.198-0.292-0.318-0.422l-0.151-0.151-0.333 0.214c-0.182 0.12-0.438 0.271-0.563 0.339-0.417 0.229-0.813 0.484-1.193 0.76-0.932 0.677-1.948 1.526-2.505 2.083-0.25 0.25-0.38 0.359-0.438 0.349-0.38-0.057-0.089-1.703 0.531-2.943 0.792-1.599 2.125-3.073 3.667-4.068 1.266-0.818 3.313-1.943 4.26-2.339 1.682-0.703 3.859-1.464 5.349-1.87 0.313-0.089 0.505-0.167 0.635-0.255 0.292-0.203 0.578-0.302 0.906-0.307 0.276-0.005 0.302-0.010 0.568-0.188 0.313-0.203 0.406-0.214 0.719-0.104l0.203 0.073 0.25-0.172 0.25-0.167 0.359 0.005c0.276 0.005 0.401-0.005 0.521-0.057 0.151-0.068 0.156-0.078 0.198-0.328 0.094-0.542 0.104-0.813 0.047-1.141-0.073-0.432-0.083-2.109-0.010-2.438 0.078-0.354 0.13-0.427 0.396-0.557 0.396-0.193 0.693-0.25 1.375-0.25 0.833 0 1.255 0.115 1.568 0.417 0.281 0.271 0.328 0.906 0.182 2.396-0.089 0.859-0.099 1.099-0.073 1.661 0.010 0.359 0.036 0.698 0.047 0.745 0.021 0.089 0.042 0.094 0.344 0.099 0.297 0.005 0.349 0.021 0.63 0.167 0.271 0.141 0.474 0.313 0.516 0.438 0.005 0.026 0.052 0.026 0.135 0 0.161-0.047 0.302 0.005 0.417 0.146 0.068 0.089 0.109 0.104 0.266 0.104 0.214 0 0.292 0.052 0.469 0.313 0.083 0.12 0.198 0.208 0.328 0.266 0.292 0.146 0.688 0.552 0.839 0.875 0.234 0.479 0.281 1.036 0.135 1.536-0.052 0.188-0.052 0.193 0.057 0.375 0.229 0.391 0.313 0.87 0.219 1.276l-0.052 0.24 0.156 0.156c0.776 0.776 0.661 2.042-0.286 3.172-0.099 0.12-0.219 0.307-0.266 0.422-0.182 0.484-0.391 0.823-0.661 1.104l-0.276 0.281h-0.281c-0.281 0-0.677-0.094-0.917-0.219-0.099-0.052-0.104-0.052-0.083 0.010 0.063 0.229 0.219 1.161 0.271 1.677 0.083 0.792 0.057 1.943-0.052 2.438-0.078 0.365-0.214 0.719-0.396 1.047-0.104 0.167-0.109 0.203-0.089 0.406 0.031 0.286-0.036 0.766-0.151 1.083-0.141 0.37-0.193 0.542-0.224 0.729-0.026 0.161-0.026 0.161 0.089 0.161 0.151 0 0.234 0.089 0.234 0.266 0 0.078-0.068 0.5-0.151 0.932-0.229 1.214-0.245 1.349-0.245 2.526-0.005 1.214-0.005 1.203 0.271 1.385l0.62 0.401c0.531 0.354 1.104 0.646 1.703 0.875 0.87 0.344 0.99 0.432 0.99 0.724 0 0.13-0.026 0.177-0.135 0.281-0.333 0.323-0.99 0.396-2.313 0.255-0.688-0.063-1.38-0.099-2.068-0.099-1.823-0.026-2.089-0.089-2.328-0.542-0.135-0.26-0.109-0.599 0.078-1.156 0.083-0.245 0.156-0.495 0.219-0.75 0.125-0.604 0.042-1.323-0.25-2.135l-0.25-0.693c-0.245-0.703-0.38-1.99-0.234-2.281 0.026-0.057 0.073-0.068 0.198-0.063l0.156 0.016 0.13-0.271c0.099-0.214 0.208-0.354 0.505-0.651l0.38-0.38-0.021-0.245c-0.016-0.234-0.323-1.37-0.365-1.365-0.016 0-0.099 0.115-0.193 0.26-0.229 0.344-0.734 0.875-1.021 1.068-0.125 0.083-0.229 0.182-0.229 0.214-0.005 0.141-0.125 0.417-0.271 0.609-0.141 0.188-0.151 0.219-0.13 0.385 0.036 0.245-0.042 1.031-0.135 1.443-0.083 0.302-0.198 0.599-0.344 0.885-0.359 0.745-0.63 1.411-0.698 1.719-0.052 0.297-0.078 0.599-0.094 0.896-0.016 0.354-0.052 0.698-0.078 0.771-0.036 0.099-0.036 0.177-0.005 0.328 0.026 0.109 0.042 0.354 0.036 0.547-0.005 0.266 0.016 0.438 0.094 0.75 0.135 0.531 0.161 0.865 0.099 1.063-0.042 0.125-0.083 0.172-0.224 0.24-0.313 0.161-1.198 0.25-1.677 0.167zM19.229 31.505c0.182-0.052 0.339-0.208 0.339-0.349 0-0.063-0.052-0.245-0.115-0.406-0.125-0.307-0.339-1.12-0.339-1.255 0-0.068 0.005-0.073 0.109-0.016l0.115 0.063v-0.146c-0.016-0.135-0.047-0.266-0.089-0.396-0.099-0.297-0.109-0.302-0.74-0.339l-0.427-0.021-0.156 0.151c-0.083 0.089-0.161 0.182-0.224 0.292-0.068 0.135-0.094 0.339-0.052 0.385 0.010 0.016 0.115 0 0.229-0.026 0.068-0.021 0.135-0.031 0.208-0.036 0 0.005-0.115 0.099-0.26 0.198-0.625 0.469-0.844 0.755-0.844 1.12 0 0.38 0.359 0.677 0.922 0.766 0.385 0.057 1.135 0.073 1.323 0.016zM27.703 30.885c0.156-0.188 0.135-0.38-0.063-0.599-0.115-0.115-0.245-0.214-0.391-0.292s-0.292-0.167-0.438-0.26c-0.115-0.083-0.479-0.297-0.813-0.479-0.24-0.13-0.474-0.266-0.703-0.411l-0.094-0.073v-1.432c0-1.411-0.005-1.432-0.078-1.411-0.365 0.099-0.969 0.146-1.734 0.13l-0.828-0.010 0.12 0.292c0.224 0.552 0.339 1.292 0.339 2.141 0 0.318-0.021 0.432-0.099 0.656-0.042 0.109-0.078 0.219-0.115 0.328-0.016 0.047 0.042 0.083 0.255 0.146 0.156 0.047 0.385 0.094 0.516 0.109l0.24 0.026-0.026 0.24c-0.026 0.271 0.005 0.557 0.073 0.646 0.042 0.052 0.198 0.073 0.922 0.104 0.547 0.026 1.141 0.083 1.609 0.151 0.406 0.063 0.844 0.115 0.974 0.115 0.219 0.005 0.24-0.005 0.333-0.115zM19.365 28.448c0.021-0.016 0.052-0.297 0.063-0.63 0.042-0.932 0.078-1.068 0.547-2.12 0.385-0.859 0.589-1.661 0.573-2.229l-0.010-0.339-0.146 0.141c-0.302 0.302-0.094-0.172 0.266-0.594 0.271-0.323 0.365-0.5 0.406-0.786 0.021-0.115 0.063-0.172 0.24-0.307 0.672-0.51 1.156-1.156 1.474-1.948 0.073-0.188 0.26-0.828 0.417-1.422 0.292-1.099 0.448-1.573 0.589-1.776 0.052-0.078 0.073-0.094 0.063-0.042-0.083 0.313-0.109 0.443-0.177 0.849-0.042 0.255-0.12 0.755-0.172 1.104-0.099 0.714-0.203 1.172-0.344 1.526l-0.094 0.24 0.25 0.646c0.26 0.661 0.38 1.141 0.401 1.604l0.016 0.26-0.203 0.042c-0.271 0.047-0.505 0.198-0.667 0.417-0.177 0.255-0.276 0.464-0.229 0.51 0.021 0.021 0.276 0.068 0.568 0.104 0.453 0.052 0.625 0.052 1.224 0.016 0.26-0.010 0.516-0.036 0.771-0.073 0.057-0.021 0.115-0.135 0.208-0.432 0.214-0.682 0.255-0.922 0.229-1.401l-0.021-0.422 0.109-0.141c0.255-0.323 0.453-0.906 0.536-1.589 0.099-0.833-0.083-2.578-0.422-4.078-0.161-0.714-0.229-1.141-0.229-1.453v-0.276l-0.255 0.026c-0.917 0.099-2.026 0.073-2.703-0.068-0.37-0.073-1.302-0.349-1.505-0.438l-0.161-0.073-0.021 0.182c-0.016 0.099-0.031 0.198-0.052 0.302-0.031 0.109-0.021 0.135 0.172 0.323 0.24 0.245 0.313 0.37 0.313 0.536 0 0.104-0.057 0.188-0.349 0.49-0.214 0.224-0.484 0.464-0.693 0.599l-0.339 0.229-0.146 0.505c-0.521 1.849-0.62 3.531-0.276 4.734l0.083 0.302-0.167 0.208c-0.625 0.786-0.995 1.385-1.052 1.719-0.010 0.068-0.063 0.286-0.115 0.49-0.135 0.516-0.24 1.271-0.286 2.089-0.031 0.682-0.078 1.37-0.135 2.052l-0.026 0.203 0.26 0.078c0.146 0.047 0.365 0.099 0.49 0.12 0.234 0.036 0.667 0.026 0.734-0.010zM24.422 25.583c0.406-0.026 0.776-0.089 0.849-0.151 0.031-0.021 0.068-0.13 0.078-0.24l0.026-0.198-0.323 0.073c-0.255 0.052-0.51 0.083-0.766 0.104-0.615 0.026-1.234 0.010-1.844-0.052-0.203-0.031-0.203-0.031-0.141 0.234 0.052 0.198 0.063 0.208 0.594 0.245 0.354 0.031 0.849 0.026 1.526-0.016zM24.083 24.677c0.531-0.047 1.193-0.161 1.323-0.229 0.042-0.021 0.078-0.099 0.094-0.188l0.047-0.276 0.026-0.13-0.13 0.026c-0.578 0.12-1.016 0.156-1.891 0.156-0.854 0-0.953-0.005-1.177-0.083-0.083-0.036-0.177-0.057-0.271-0.063-0.036 0.021-0.042 0.318-0.010 0.526 0.021 0.125 0.042 0.146 0.167 0.182 0.396 0.109 1.063 0.135 1.823 0.073zM14.417 19.979c1.333-0.385 3.078-1.516 4.505-2.932 0.464-0.464 0.521-0.526 0.583-0.734l0.083-0.266c0.010-0.021-0.073-0.057-0.182-0.083-0.286-0.068-0.505-0.234-0.505-0.385 0-0.089-0.052-0.177-0.203-0.339-0.245-0.276-0.307-0.396-0.333-0.661l-0.021-0.214-0.292-0.208c-0.167-0.12-0.75-0.443-1.37-0.755-0.469-0.229-0.932-0.479-1.385-0.75-0.521-0.349-0.87-0.766-1.068-1.26-0.036-0.099-0.083-0.182-0.099-0.182-0.042 0-1.214 1.13-1.714 1.661-1.234 1.302-2.083 2.432-2.62 3.479-0.135 0.26-0.281 0.568-0.323 0.682l-0.078 0.208 0.094 0.349c0.057 0.188 0.177 0.495 0.271 0.677 0.328 0.646 0.719 1.036 1.365 1.354 0.693 0.344 1.307 0.464 2.333 0.448 0.552-0.005 0.714-0.021 0.958-0.094zM3.896 15.411c0.875-0.776 2.083-1.625 3.563-2.505 0.969-0.578 4.714-2.453 6.438-3.219 0.313-0.141 0.594-0.271 0.625-0.286 0.031-0.021 0.12-0.245 0.203-0.495 0.365-1.156 0.547-1.385 1.208-1.536 0.083-0.021 0.104-0.047 0.104-0.13 0-0.151 0.104-0.5 0.193-0.656 0.068-0.12 0.068-0.125 0.010-0.109-0.036 0.010-0.255 0.073-0.484 0.141-3.177 0.917-5.953 2.135-8.349 3.656-2.557 1.625-4.031 3.573-4.458 5.906l-0.031 0.172 0.313-0.307c0.167-0.172 0.469-0.453 0.667-0.625zM27.464 15.854c0.255-0.13 0.651-0.729 0.797-1.203 0.042-0.167 0.125-0.323 0.245-0.453 0.385-0.427 0.703-1.203 0.708-1.734 0-0.828-0.469-1.146-1.151-0.792-0.089 0.042-0.161 0.073-0.172 0.063-0.036-0.036 0.156-0.224 0.391-0.37 0.307-0.203 0.365-0.323 0.365-0.755 0-0.365-0.089-0.656-0.297-0.979-0.094-0.141-0.13-0.234-0.115-0.292l0.094-0.349c0.13-0.464 0.083-0.995-0.12-1.333-0.302-0.51-0.672-0.76-1.188-0.802l-0.302-0.021 0.177 0.198c0.526 0.568 0.781 1.281 0.677 1.891-0.052 0.313-0.099 0.375-0.401 0.495l-0.177 0.073 0.021 0.24c0.036 0.391-0.031 0.677-0.281 1.203-0.125 0.266-0.219 0.505-0.208 0.531 0.031 0.089 0.375 0.255 0.646 0.323l0.266 0.063-0.167 0.057c-0.219 0.068-0.266 0.167-0.266 0.526 0 0.328 0.047 0.464 0.286 0.823 0.109 0.156 0.182 0.318 0.193 0.411 0.021 0.146 0.016 0.156-0.104 0.198-0.135 0.036-0.276 0.063-0.417 0.068-0.49 0.031-0.526 0.047-0.745 0.255-0.198 0.188-0.203 0.198-0.203 0.406 0 0.286 0.109 0.865 0.177 0.943 0.089 0.094 0.583 0.339 0.776 0.375 0.167 0.042 0.344 0.021 0.495-0.057zM20.25 15.464c0.318-0.25 0.568-0.5 0.708-0.714 0.089-0.13 0.094-0.156 0.052-0.266-0.073-0.167-0.552-0.599-0.818-0.729-0.177-0.078-0.365-0.135-0.557-0.161l-0.328-0.042-0.203-0.255c-0.422-0.521-0.656-0.927-0.99-1.714-0.292-0.667-0.547-1.057-0.953-1.443-0.167-0.156-0.286-0.286-0.276-0.286 0.021 0 0.219 0.099 0.448 0.219 0.38 0.203 0.427 0.219 0.599 0.193 0.62-0.073 1.167-0.786 1.365-1.786 0.057-0.281 0.172-0.568 0.292-0.74 0.005-0.005 0.245 0.151 0.526 0.354 0.714 0.505 0.87 0.583 1.276 0.599 0.266 0.010 0.417-0.010 0.896-0.125 1.021-0.25 2.125-0.349 2.797-0.26 0.38 0.052 0.927 0.219 1.333 0.411 0.401 0.188 0.479 0.198 0.609 0.083 0.109-0.094 0.109-0.109 0.109-0.458-0.005-0.516-0.193-1.073-0.479-1.406-0.146-0.172-0.557-0.453-0.964-0.667-0.146-0.078-0.292-0.156-0.432-0.234-0.193-0.115-0.411-0.099-1.005 0.057-0.688 0.177-0.87 0.177-1.656-0.026-0.667-0.167-0.708-0.172-1.365-0.068-0.349 0.052-1.224 0.021-1.516-0.057-0.146-0.042-0.292-0.083-0.432-0.135-0.255-0.099-0.698-0.115-1.099-0.042-0.797 0.141-1.401 0.573-1.62 1.161-0.115 0.297-0.099 0.438 0.052 0.531 0.24 0.151 0.557 0.563 0.557 0.724 0 0.010-0.078-0.057-0.167-0.151-0.224-0.234-0.427-0.339-0.667-0.339-0.318 0.010-0.604 0.198-0.734 0.484-0.068 0.182-0.13 0.37-0.177 0.563-0.146 0.531-0.276 0.813-0.552 1.188-0.245 0.339-0.281 0.49-0.193 0.87 0.219 0.958 0.599 1.344 2.187 2.245 0.833 0.474 1.26 0.74 1.573 0.974 0.24 0.177 0.245 0.188 0.224 0.323-0.047 0.313 0.151 0.651 0.542 0.927 0.099 0.068 0.161 0.141 0.161 0.193 0 0.094 0.266 0.224 0.458 0.224 0.109 0 0.193-0.047 0.417-0.219zM26.672 13.708c0.604 0.021 0.635-0.026 0.313-0.401-0.339-0.391-0.432-0.708-0.307-1.057l0.052-0.135-0.214-0.104c-0.073-0.036-0.146-0.073-0.219-0.099-0.036 0.141-0.073 0.276-0.104 0.417-0.078 0.318-0.172 1.141-0.177 1.49 0 0.031 0.052 0.021 0.141-0.036 0.125-0.073 0.188-0.083 0.516-0.073zM24.646 13.677c0.365-0.021 0.74-0.047 0.839-0.063l0.182-0.026 0.021-0.599c0.031-0.854 0.156-1.359 0.526-2.167 0.26-0.573 0.375-1.073 0.318-1.448-0.021-0.161-0.031-0.172-0.25-0.266-0.401-0.161-0.818-0.271-1.245-0.339-0.411-0.057-1.62-0.026-2.073 0.063-0.188 0.031-0.531 0.104-0.76 0.161-0.568 0.13-0.87 0.115-1.302-0.073-0.427-0.188-0.698-0.359-0.953-0.599-0.203-0.188-0.224-0.198-0.276-0.135-0.042 0.047-0.063 0.188-0.078 0.49-0.016 0.464-0.089 0.708-0.292 1.036-0.047 0.068-0.083 0.141-0.115 0.214 0 0.016 0.156 0.198 0.349 0.396 0.667 0.693 0.995 0.87 1.521 0.833 0.172-0.016 0.292-0.010 0.292 0.010 0 0.042-0.339 0.307-0.479 0.38-0.068 0.036-0.083 0.073-0.073 0.151l0.083 0.547c0.047 0.313 0.083 0.458 0.13 0.5 0.125 0.104 0.771 0.438 1.177 0.604 0.531 0.214 0.823 0.292 1.229 0.328 0.5 0.042 0.51 0.042 1.229 0zM20.339 13.104c0.010-0.016-0.026-0.318-0.094-0.667-0.083-0.474-0.13-0.646-0.182-0.693-0.036-0.031-0.229-0.167-0.422-0.307-0.255-0.182-0.495-0.385-0.719-0.599l-0.359-0.354-0.193 0.099-0.203 0.109c0.016 0.083 0.047 0.161 0.083 0.234 0.057 0.125 0.172 0.432 0.255 0.682 0.219 0.651 0.391 0.964 0.823 1.531l0.161 0.214 0.307 0.047c0.172 0.026 0.344 0.063 0.391 0.078 0.073 0.031 0.083 0.016 0.104-0.151 0.010-0.073 0.026-0.151 0.047-0.224zM26.938 6.625c0.266-0.026 0.313-0.063 0.198-0.182-0.073-0.073-0.24-0.078-0.375-0.016-0.089 0.042-0.109 0.031-0.25-0.12-0.146-0.161-0.156-0.167-0.339-0.146-0.167 0.021-0.193 0.016-0.214-0.052-0.068-0.115-0.146-0.214-0.24-0.302-0.12-0.135-0.266-0.24-0.432-0.307-0.323-0.125-0.505-0.109-0.813 0.063-0.891 0.484-0.854 0.479-1.714 0.26-0.802-0.203-1.401-0.411-1.594-0.542-0.161-0.109-0.505-0.229-0.792-0.266-0.214-0.031-0.349 0.016-0.552 0.182l-0.109 0.089 0.099 0.172c0.135 0.24 0.12 0.255-0.083 0.078-0.219-0.182-0.479-0.307-0.646-0.313-0.12 0-0.474 0.156-0.516 0.224-0.016 0.021 0.094 0.047 0.24 0.057 0.151 0.016 0.359 0.068 0.5 0.125 0.365 0.156 0.552 0.208 0.885 0.24 0.365 0.036 1.026-0.005 1.104-0.068 0.042-0.036 0.156-0.042 0.396-0.021 0.318 0.021 0.448 0.052 1.203 0.255 0.438 0.12 0.745 0.109 1.266-0.031 0.24-0.068 0.542-0.135 0.667-0.151 0.214-0.021 0.255-0.010 0.589 0.141 0.531 0.24 0.813 0.391 0.969 0.531 0.156 0.135 0.177 0.135 0.552 0.104zM23.969 5.714l0.318-0.167-0.010-0.323c-0.005-0.224-0.016-0.443-0.026-0.661l-0.026-0.333-0.318 0.245c-0.188 0.146-0.37 0.255-0.448 0.271-0.229 0.042-1.359 0-1.464-0.057-0.141-0.104-0.271-0.219-0.391-0.344l-0.292-0.297-0.005 0.177c0 0.094-0.010 0.255-0.031 0.354-0.026 0.188-0.026 0.193 0.177 0.448 0.109 0.141 0.198 0.266 0.198 0.281 0 0.099 1.505 0.568 1.844 0.573 0.109 0 0.245-0.047 0.474-0.167zM23.365 4.531c0.375-0.073 0.557-0.344 0.698-1.031 0.146-0.74 0.219-1.901 0.151-2.396-0.063-0.448-0.563-0.646-1.516-0.615-0.594 0.021-0.839 0.078-1.042 0.25-0.125 0.104-0.125 0.115-0.182 0.609-0.104 0.948 0.052 2.297 0.323 2.802 0.13 0.245 0.245 0.333 0.484 0.375 0.271 0.047 0.849 0.047 1.083 0.005z" />
    </svg>
  )
}

function CustomFigmaIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-figma-plain" {...props}></i>
  )
}

function CustomSassIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-sass-original" {...props}></i>
  )
}

function CustomTsIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-typescript-plain" {...props}></i>
  )
}

function CustomJsIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-javascript-plain" {...props}></i>
  )
}

function CustomNodejsIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-nodejs-plain-wordmark" {...props}></i>
  )
}

function CustomTailwindIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-tailwindcss-original" {...props}></i>
  )
}

function CustomBulmaIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-bulma-plain" {...props}></i>
  )
}

function CustomBootstrapIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-bootstrap-plain" {...props}></i>
  )
}

function CustomCssIcon(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <i className="devicon-css3-plain" {...props}></i>
  )
}

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
          linkedinCard.querySelector('.linkedin-path-3'),
        ]

        if (circle && paths.every((p) => p)) {
          gsap.set(circle, { opacity: 0 })
          gsap.set(paths[0], { strokeDashoffset: 12 })
          gsap.set(paths[1], { strokeDashoffset: 12 })
          gsap.set(paths[2], { strokeDashoffset: 24 })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: linkedinCard,
              once: true,
              start: 'top 85%',
            },
          })

          tl.to(circle, { opacity: 1, duration: 0.22 })
          paths.forEach((path) => {
            tl.to(path, { strokeDashoffset: 0, duration: 0.32, ease: 'none' }, '+=0.06')
          })
        }
      }

      const instagramCard = containerRef.current?.querySelector('.experience-journey-card--instagram')
      if (instagramCard) {
        const frame = instagramCard.querySelector('.instagram-frame')
        const lens = instagramCard.querySelector('.instagram-lens')
        const dot = instagramCard.querySelector('.instagram-dot')

        if (frame && lens && dot) {
          gsap.set(frame, { strokeDashoffset: 66 })
          gsap.set(lens, { strokeDashoffset: 28 })
          gsap.set(dot, { opacity: 0 })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: instagramCard,
              once: true,
              start: 'top 85%',
            },
          })

          tl.to(frame, { strokeDashoffset: 0, duration: 0.4, ease: 'none' })
            .to(lens, { strokeDashoffset: 0, duration: 0.4, ease: 'none' }, '+=0.06')
            .to(dot, { opacity: 1, duration: 0.16 }, '+=0.06')
        }
      }

      const githubCard = containerRef.current?.querySelector('.experience-journey-card--github')
      if (githubCard) {
        const graph = githubCard.querySelector('.graph')
        if (graph) {
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
      }

      const resumeCard = containerRef.current?.querySelector('.experience-journey-card--resume')
      if (resumeCard) {
        const resumeIcon = resumeCard.querySelector('.experience-journey-card__resume-icon')
        const resumeButton = resumeCard.querySelector('.experience-journey-card__resume-button')

        if (resumeIcon && resumeButton) {
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
      }

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="experience-journey" aria-label="Experience" ref={containerRef}>
      <div className="experience-journey__grid">
        {experienceCards.map((card, cardIndex) => (
          <article className={`experience-journey-card ${card.className}`} key={`${card.type}-${card.brand || cardIndex}`}>
            {card.type === 'quote' ? (
              <>
                <p className="experience-journey-card__quote">"{card.quote}"</p>
                <div className="experience-journey-card__person">
                  <span aria-hidden="true">{card.name ? card.name.charAt(0) : '?'}</span>
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
                          {item.icon === 'custom-html' ? (
                            <CustomHtmlIcon aria-hidden="true" />
                          ) : item.icon === 'custom-css' ? (
                            <CustomCssIcon aria-hidden="true" />
                          ) : item.icon === 'custom-js' ? (
                            <CustomJsIcon aria-hidden="true" />
                          ) : item.icon === 'custom-ts' ? (
                            <CustomTsIcon aria-hidden="true" />
                          ) : item.icon === 'custom-nodejs' ? (
                            <CustomNodejsIcon aria-hidden="true" />
                          ) : item.icon === 'custom-react' ? (
                            <CustomReactIcon aria-hidden="true" />
                          ) : item.icon === 'custom-tailwind' ? (
                            <CustomTailwindIcon aria-hidden="true" />
                          ) : item.icon === 'custom-bulma' ? (
                            <CustomBulmaIcon aria-hidden="true" />
                          ) : item.icon === 'custom-bootstrap' ? (
                            <CustomBootstrapIcon aria-hidden="true" />
                          ) : item.icon === 'custom-openai' ? (
                            <CustomOpenaiIcon aria-hidden="true" />
                          ) : item.icon === 'custom-claudecode' ? (
                            <CustomClaudeCodeIcon aria-hidden="true" />
                          ) : item.icon === 'custom-gsap' ? (
                            <CustomGsapIcon aria-hidden="true" />
                          ) : item.icon === 'custom-sass' ? (
                            <CustomSassIcon aria-hidden="true" />
                          ) : item.icon === 'custom-figma' ? (
                            <CustomFigmaIcon aria-hidden="true" />
                          ) : (
                            <Icon icon={item.icon} aria-hidden="true" />
                          )}
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
                <Icon icon="pepicons-pop:cv" className="experience-journey-card__resume-icon" aria-hidden="true" />
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
