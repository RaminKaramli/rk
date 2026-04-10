import AboutShowcase from '../components/AboutShowcase'
import AboutSkillsAccordion from '../components/AboutSkillsAccordion'
import NotableWorks from '../components/NotableWorks'
import SiteShell from '../components/SiteShell'

export default function AboutPage() {
  return (
    <SiteShell page="about" title="About Me | RK Project">
      <AboutShowcase />
      <NotableWorks />
      <AboutSkillsAccordion />
    </SiteShell>
  )
}
