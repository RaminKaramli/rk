import Preloader from '../../components/common/preloader/Preloader'
import Container from '../../components/layout/container/Container'
import { usePreloader } from '../../hooks/usePreloader'
import ExperienceSection from '../../sections/experience/Experience'
import HomeCanvas from '../../sections/hero/HomeCanvas'
import HeroSection from '../../sections/hero/Hero'
import ProjectsSection from '../../sections/projects/Projects'

export default function HomePage() {
  const showPreloader = usePreloader()

  return (
    <Container
      page="home"
      title="RK Project"
      showPreloader={showPreloader}
      preloader={<Preloader visible={showPreloader} />}
    >
      <HomeCanvas />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
    </Container>
  )
}
