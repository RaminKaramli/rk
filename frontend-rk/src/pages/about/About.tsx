import AboutSection from '../../sections/about/About'
import AboutExperienceShowcaseSection from '../../sections/about-experience-showcase/AboutExperienceShowcase'
import AboutExperienceSection from '../../sections/about-experience/AboutExperience'
import AboutLoopGallerySection from '../../sections/about-loop-gallery/AboutLoopGallery'
import SkillsSection from '../../sections/skills/Skills'
import ProjectsSection from '../../sections/projects/Projects'
import Container from '../../components/layout/container/Container'
import HomeCanvas from '../../sections/hero/HomeCanvas'

export default function AboutPage() {
  return (
    <Container page="about" title="About Me | RK Project">
      <HomeCanvas />
      <AboutSection />
      <AboutExperienceShowcaseSection />
      <AboutExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutLoopGallerySection />
    </Container>
  )
}
