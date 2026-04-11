import AboutSection from '../../sections/about/About'
import AboutExperienceSection from '../../sections/about-experience/AboutExperience'
import SkillsSection from '../../sections/skills/Skills'
import ProjectsSection from '../../sections/projects/Projects'
import Container from '../../components/layout/container/Container'

export default function AboutPage() {
  return (
    <Container page="about" title="About Me | RK Project">
      <AboutSection />
      <AboutExperienceSection />
      <ProjectsSection />
      <SkillsSection />
    </Container>
  )
}
