export type Language = 'en' | 'az'

export interface TranslationDictionary {
  nav: {
    home: string
    about: string
    works: string
    resume: string
    menuTitle: string
    socials: string
    backToHome: string
  }
  hero: {
    topCopy: string
    roleFrontend: string
    roleWebDesigner: string
    bottomCopy: string
  }
  notableWorks: {
    title: string
    cta: string
    statProjects: string
    statExperience: string
    statSkills: string
  }
  experienceShowcase: {
    heading: string
    company: string
    badge: string
    role: string
    caption: string
    grid: {
      webInterfacesTitle: string
      webInterfacesDesc: string
      ecommerceTitle: string
      ecommerceDesc: string
      responsiveTitle: string
      responsiveDesc: string
      optimizationTitle: string
      optimizationDesc: string
    }
    tools: {
      htmlTitle: string
      htmlCaption: string
      scssTitle: string
      scssCaption: string
      jsTitle: string
      jsCaption: string
      figmaTitle: string
      figmaCaption: string
    }
  }
  experienceJourney: {
    quoteStatement: string
    quoteDescription: string
    resume: string
  }
  about: {
    title: string
    lead: string
    skillsHeading: string
    skillsDescription: string
    educationTitle: string
    educationDescription: string
    experienceHeading: string
    educationHeading: string
  }
  footer: {
    eyebrow: string
    letsTalk: string
    rights: string
  }
}
