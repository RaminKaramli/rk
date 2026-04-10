import HomeCanvas from '../components/HomeCanvas'
import HomeHero from '../components/HomeHero'
import NotableWorks from '../components/NotableWorks'
import Preloader from '../components/Preloader'
import SiteShell from '../components/SiteShell'
import StackCardsShowcase from '../components/StackCardsShowcase'
import { usePreloader } from '../hooks/usePreloader'

export default function HomePage() {
  const showPreloader = usePreloader()

  return (
    <SiteShell
      page="home"
      title="RK Project"
      showPreloader={showPreloader}
      preloader={<Preloader visible={showPreloader} />}
    >
      <HomeCanvas />
      <HomeHero />
      <NotableWorks />
      <StackCardsShowcase />
    </SiteShell>
  )
}
