import type { Language, TranslationDictionary } from '../types/i18n.types'

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      works: 'WORKS',
      resume: 'RESUME',
      menuTitle: 'Navigation',
      socials: 'Socials',
      backToHome: 'Back to Home',
    },
    hero: {
      topCopy: 'I use a hearing aid to hear',
      roleFrontend: 'FRONTEND DEVELOPER',
      roleWebDesigner: 'WEB DESIGNER',
      bottomCopy: 'I build websites using HTML, CSS, JavaScript, TypeScript, and React.js',
    },
    notableWorks: {
      title: 'NOTABLE WORKS',
      cta: 'WORKS',
      statProjects: 'Projects Completed',
      statExperience: 'Years Learning & Dev',
      statSkills: 'Core Tech Stack',
    },
    experienceShowcase: {
      heading: 'Experience',
      company: 'NS Studio',
      badge: '2 Months Experience',
      role: 'Junior Frontend Developer',
      caption:
        'Developed modern and responsive web interfaces and improved practical frontend skills over a 2-month learning experience.',
      grid: {
        webInterfacesTitle: 'Web Interfaces',
        webInterfacesDesc: 'Development with HTML, CSS, SCSS & JS based on Figma designs',
        ecommerceTitle: 'ikili2.com Platform',
        ecommerceDesc: 'Front-end development of the e-commerce platform',
        responsiveTitle: 'Responsive Design',
        responsiveDesc: 'Creating responsive and adaptive user interfaces',
        optimizationTitle: 'Optimization',
        optimizationDesc: 'Optimizing performance and improving websites',
      },
      tools: {
        htmlTitle: 'HTML · Structure',
        htmlCaption: 'Created clean and semantic page structure.',
        scssTitle: 'SCSS · Styling',
        scssCaption: 'Built responsive and polished visual layouts.',
        jsTitle: 'JavaScript · Functionality',
        jsCaption: 'Added interactive and dynamic user experience.',
        figmaTitle: 'Figma · Design',
        figmaCaption: 'Designed modern and user-friendly interfaces.',
      },
    },
    experienceJourney: {
      quoteStatement: 'Building modern experiences through frontend development.',
      quoteDescription:
        'Focused on creating clean, responsive, and user-friendly web interfaces with a passion for learning and continuous growth.',
      resume: 'Resume',
    },
    about: {
      title: 'ABOUT ME',
      lead:
        'I have a hearing impairment and use a hearing aid. My goal is to grow professionally, gain experience, and improve my skills in the field of technology. I have experience with HTML, CSS, JavaScript, TypeScript, React.js, Figma, and Git. I am open to learning, responsible, and work well in a team. My aim is to build a professional career in Frontend Development and UI/UX Design.',
      skillsHeading: 'Skills',
      skillsDescription:
        'Building modern digital experiences with clean development, thoughtful design, and a focus on usability.',
      educationTitle: 'Education',
      educationDescription:
        'I approach each project with a strong sense of clarity and intention, drawing from what I have learned over the past two years while always staying open to learning more.',
      experienceHeading: 'Work Experience',
      educationHeading: 'Education & Training',
    },
    footer: {
      eyebrow: 'HAVE A PROJECT IN MIND?',
      letsTalk: "LET'S TALK",
      rights: '© 2026 Ramin Karamli. All rights reserved.',
    },
  },
  az: {
    nav: {
      home: 'ANA SƏHİFƏ',
      about: 'HAQQIMDA',
      works: 'İŞLƏR',
      resume: 'CV',
      menuTitle: 'Naviqasiya',
      socials: 'Sosial Şəbəkələr',
      backToHome: 'Ana Səhifəyə Qayıt',
    },
    hero: {
      topCopy: 'Eşitmək üçün eşitmə cihazından istifadə edirəm',
      roleFrontend: 'FRONTEND DEVELOPER',
      roleWebDesigner: 'VEB DİZAYNER',
      bottomCopy: 'HTML, CSS, JavaScript, TypeScript və React.js ilə veb saytlar hazırlayıram',
    },
    notableWorks: {
      title: 'SEÇİLMİŞ İŞLƏR',
      cta: 'İŞLƏR',
      statProjects: 'Tamamlanmış Layihə',
      statExperience: 'İl Təcrübə və İnkişaf',
      statSkills: 'Əsas Texnologiyalar',
    },
    experienceShowcase: {
      heading: 'Təcrübə',
      company: 'NS Studio',
      badge: '2 Aylıq Təcrübə',
      role: 'Junior Frontend Developer',
      caption:
        '2 aylıq öyrənmə təcrübəsi müddətində müasir və responsiv veb interfeyslər hazırlamış, praktiki frontend bacarıqlarımı təkmilləşdirmişəm.',
      grid: {
        webInterfacesTitle: 'Veb İnterfeyslər',
        webInterfacesDesc: 'Figma dizaynları əsasında HTML, CSS, SCSS və JS ilə interfeyslərin qurulması',
        ecommerceTitle: 'ikili2.com Platforması',
        ecommerceDesc: 'E-ticarət platformasının frontend hissəsinin hazırlanması',
        responsiveTitle: 'Responsiv Dizayn',
        responsiveDesc: 'Responsiv və adaptiv istifadəçi interfeyslərinin yaradılması',
        optimizationTitle: 'Optimizasiya',
        optimizationDesc: 'Veb saytların optimizasiyası və təkmilləşdirilməsi',
      },
      tools: {
        htmlTitle: 'HTML · Struktur',
        htmlCaption: 'Təmiz və semantik səhifə strukturunun qurulması.',
        scssTitle: 'SCSS · Stilləndirmə',
        scssCaption: 'Responsiv və cilalanmış vizual dizaynların yığılması.',
        jsTitle: 'JavaScript · Funksionallıq',
        jsCaption: 'İnteraktiv və dinamik istifadəçi təcrübəsinin əlavəsi.',
        figmaTitle: 'Figma · Dizayn',
        figmaCaption: 'Müasir və istifadəçi dostu interfeyslərin hazırlanması.',
      },
    },
    experienceJourney: {
      quoteStatement: 'Frontend proqramlaşdırma ilə müasir təcrübələr qururam.',
      quoteDescription:
        'Öyrənməyə və daimi inkişafa olan həvəsimlə təmiz, responsiv və istifadəçi dostu veb interfeyslər yaratmağa fokuslanmışam.',
      resume: 'CV',
    },
    about: {
      title: 'HAQQIMDA',
      lead:
        'Eşitmə məhdudiyyətim var və eşitmə cihazından istifadə edirəm. Məqsədim texnologiya sahəsində peşəkar olaraq inkişaf etmək, təcrübə qazanmaq və bacarıqlarımı daha da artırmaqdır. HTML, CSS, JavaScript, TypeScript, React.js, Figma və Git ilə təcrübəm var. Yeni biliklər öyrənməyə açıq, məsuliyyətli və komanda ilə işləməyi bacaran biriyəm. Əsas hədəfim Frontend Proqramlaşdırma və UI/UX Dizayn sahəsində uğurlu karyera qurmaqdır.',
      skillsHeading: 'Bacarıqlar',
      skillsDescription:
        'Təmiz proqramlaşdırma, düşünülmüş dizayn və istifadəçi rahatlığı ilə müasir rəqəmsal təcrübələr qururam.',
      educationTitle: 'Təhsil',
      educationDescription:
        'Hər layihəyə aydın baxış və məqsədyönlü yanaşma ilə yanaşır, son iki il ərzində öyrəndiklərimə əsaslanaraq daim yeni biliklər mənimsəyirəm.',
      experienceHeading: 'İş Təcrübəsi',
      educationHeading: 'Təhsil və Kurslar',
    },
    footer: {
      eyebrow: 'AĞLINIZDA BİR LAYİHƏ VAR?',
      letsTalk: 'DANIŞAQ',
      rights: '© 2026 Ramin Kərəmli. Bütün hüquqlar qorunur.',
    },
  },
}
