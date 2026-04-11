import AboutSection from '../../sections/about/About'
import SkillsSection from '../../sections/skills/Skills'
import ProjectsSection from '../../sections/projects/Projects'
import Container from '../../components/layout/container/Container'

export default function AboutPage() {
  return (
    <Container page="about" title="About Me | RK Project">
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
    </Container>
  )
}
