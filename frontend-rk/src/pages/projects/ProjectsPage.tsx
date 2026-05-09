import Container from '../../components/layout/container/Container'
import ProjectsSection from '../../sections/projects/Projects'
import StackCardsShowcase from '../../sections/experience/Experience'

export default function ProjectsPage() {
  return (
    <Container page="home" title="Projects | RK Project">
      <ProjectsSection showSeparator={false} />
      <StackCardsShowcase singleColumn />
    </Container>
  )
}
