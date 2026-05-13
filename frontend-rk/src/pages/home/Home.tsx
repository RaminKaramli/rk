import Preloader from '../../components/common/preloader/Preloader'
import Container from '../../components/layout/container/Container'
import { usePreloader } from '../../hooks/usePreloader'
import ExperienceSection from '../../sections/experience/Experience'
import ExperienceJourneySection from '../../sections/experience-journey/ExperienceJourney'
import HeroSection from '../../sections/hero/Hero'

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
      <ExperienceSection />
      <ExperienceJourneySection />
    </Container>
  )
}
