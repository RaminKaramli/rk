import Preloader from '../../components/common/preloader/Preloader'
import Container from '../../components/layout/container/Container'
import { usePreloader } from '../../hooks/usePreloader'
import ExperienceSection from '../../sections/experience/Experience'
import HeroSection from '../../sections/hero/Hero'
import ProjectsSection from '../../sections/projects/Projects'

export default function HomePage() {
  const { dismissPreloader, showPreloader } = usePreloader()

  return (
    <Container
      page="home"
      title="RK Project"
      showPreloader={showPreloader}
      preloader={<Preloader visible={showPreloader} onComplete={dismissPreloader} />}
    >
      <HeroSection showPreloader={showPreloader} />
      <ProjectsSection />
      <ExperienceSection />
    </Container>
  )
}
