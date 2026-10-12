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
      name: 'Ramin Karamli',
      topCopy: 'I use a hearing aid to hear',
      roleFrontend: 'FRONTEND DEVELOPER',
      roleWebDesigner: 'WEB DESIGNER',
      bottomCopy: 'I build websites using HTML, CSS, JavaScript, TypeScript, and React.js',
    },
    notableWorks: {
      title: 'NOTABLE WORKS',
      cta: 'WORKS',
      statProjects: '+Projects',
      statExperience: '+Months',
      statSkills: '+Clients',
    },
    projects: {
      ikili: {
        title: 'İkili İki — Photo & Video Production Equipment Store',
        category: 'E-Commerce • 2 Months Experience',
        description:
          'Modern e-commerce platform developed for ikili2.com during a 2-month professional experience, specializing in photo & video production gear, studio lighting, backdrop systems, audio, and camera accessories with responsive product catalogs.',
      },
      portfolio: {
        title: 'Personal Portfolio',
        category: 'Crafted in 2025',
        description:
          'Personal portfolio website designed and developed in 2025, showcasing selected frontend projects, creative animations, and interactive interfaces.',
      },
      compact: {
        title: 'Compact Brand Website',
        category: 'Brand Experience',
        description:
          'Website designed with a focused two-screen showcase, clear visual hierarchy, and responsive presentation for a compact brand experience.',
      },
      selected: {
        title: 'Selected Portfolio',
        category: 'Selected Portfolio',
        description:
          'Interactive presentation highlighting frontend animation craft, responsive components, and polished UI design.',
      },
      techAria: 'Technologies used',
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
      techStack: 'My Tech Stack',
    },
    about: {
      title: 'ABOUT ME',
      lead:
        'I have a hearing impairment and use a hearing aid. Despite this, I am highly motivated to continuously develop my skills and gain new knowledge in the technology field. I work with HTML, CSS, SCSS, JavaScript, TypeScript, React.js, and Figma. My goal is to gain experience and grow professionally as a Frontend Developer and Web Designer.',
      skillsHeading: 'Skills',
      skillsDescription:
        'Building modern digital experiences with clean development, thoughtful design, and a focus on usability.',
      educationTitle: 'Education',
      educationDescription:
        'I approach each project with a strong sense of clarity and intention, drawing from what I have learned over the past two years while always staying open to learning more.',
      experienceHeading: 'Work Experience',
      educationHeading: 'Education & Training',
      educationEntries: [
        {
          company: 'Evo Academy',
          role: 'Course',
          period: 'May 2025 - Oct 2025',
          description: 'Frontend Development',
        },
        {
          company: 'Odlar Yurdu University',
          role: "Bachelor's Degree",
          period: 'Sept 2021 - Jun 2025',
          description: 'Computer Engineering',
        },
        {
          company: 'Odlar Yurdu College',
          role: 'College Education',
          period: 'Sept 2019 - Jun 2021',
          description: 'Repair and Maintenance of Computer Networks and Computer Hardware',
        },
        {
          company: 'School',
          role: 'Primary School / High School',
          period: 'Sept 2008 - Jun 2019',
          description: 'Sumgait City, No. 6 Complete Secondary School',
        },
      ],
      skillsList: [
        {
          title: 'Development',
          description:
            'Designing intuitive, scalable digital products that solve real user problems and drive meaningful outcomes.',
          tags: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js'],
        },
        {
          title: 'CSS Frameworks & UI',
          description:
            'Building interfaces faster with practical CSS frameworks and UI libraries that help keep layouts clean, responsive, and consistent.',
          tags: ['Tailwind CSS', 'Bootstrap', 'Bulma', 'W3.CSS', 'Uiverse.io'],
        },
        {
          title: 'Libraries',
          description:
            'Building smoother motion, reveal effects, and scroll experiences with libraries that make interfaces feel more dynamic and polished.',
          tags: [
            'GSAP',
            'Swiper.js',
            'React Icons',
            'AOS',
            'ScrollReveal',
            'Lenis',
            'Locomotive Scroll',
            'TAOS',
            'Framer Motion (Currently Learning)',
          ],
        },
        {
          title: 'Design Tools',
          description:
            'Designing visual assets, interface concepts, and presentation-ready layouts with tools that support both product and graphic work.',
          tags: ['Figma', 'CorelDRAW', 'Adobe Photoshop', 'Canva', 'Kittl'],
        },
        {
          title: 'Graphic & Print Design',
          description:
            'Creating print-ready visuals and branded materials that support both presentation, promotion, and business identity needs.',
          tags: [
            'Logo',
            'Business Cards',
            'Invitations',
            'Certificates',
            'Brochures/Flyers',
            'Posters',
            'Menus',
          ],
        },
      ],
    },
    footer: {
      eyebrow: 'HAVE A NEW IDEA?',
      letsTalk: 'GET IN TOUCH',
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
      name: 'Ramin Kərəmli',
      topCopy: 'Eşitmək üçün eşitmə cihazından istifadə edirəm',
      roleFrontend: 'FRONTEND DEVELOPER',
      roleWebDesigner: 'WEB DESIGNER',
      bottomCopy: 'HTML, CSS, JavaScript, TypeScript və React.js ilə veb saytlar hazırlayıram',
    },
    notableWorks: {
      title: 'SEÇİLMİŞ İŞLƏR',
      cta: 'İŞLƏR',
      statProjects: '+Layihələr',
      statExperience: '+Aylar',
      statSkills: '+Müştərilər',
    },
    projects: {
      ikili: {
        title: 'İkili İki — Foto və Video Avadanlıqları Mağazası',
        category: 'E-Ticarət • 2 Aylıq Təcrübə',
        description:
          '2 aylıq peşəkar təcrübə müddətində ikili2.com üçün hazırlanmış, foto və video çəkiliş avadanlıqları, studiya işıqları, fon sistemləri, səs və kamera aksesuarları üzrə ixtisaslaşmış responsiv e-ticarət platforması.',
      },
      portfolio: {
        title: 'Şəxsi Portfolio',
        category: '2025-ci İldə Hazırlanıb',
        description:
          '2025-ci ildə dizayn və inkişaf etdirilmiş, seçilmiş frontend layihələri, kreativ animasiyalar və interaktiv interfeysləri nümayiş etdirən şəxsi portfolio veb saytı.',
      },
      compact: {
        title: 'Kompakt Brend Veb Saytı',
        category: 'Brend Təcrübəsi',
        description:
          'Brend təcrübəsi üçün fokuslanmış iki ekranlı nümayiş, aydın vizual iyerarxiya və responsiv təqdimatla hazırlanmış veb sayt.',
      },
      selected: {
        title: 'Seçilmiş Portfolio',
        category: 'Seçilmiş Portfolio',
        description:
          'Frontend animasiya ustalığı, responsiv komponentlər və cilalanmış UI dizaynını vurğulayan interaktiv təqdimat.',
      },
      techAria: 'İstifadə olunan texnologiyalar',
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
      techStack: 'Texnologiya Stack-im',
    },
    about: {
      title: 'HAQQIMDA',
      lead:
        'Eşitmə məhdudiyyətim var və qulaq aparatından istifadə edirəm. Buna baxmayaraq, texnologiya sahəsində bacarıqlarımı daim inkişaf etdirməyə və yeni biliklər əldə etməyə yüksək motivasiyalıyam. HTML, CSS, SCSS, JavaScript, TypeScript, React.js və Figma ilə işləyirəm. Məqsədim Frontend Developer və Web Designer kimi təcrübə qazanmaq, peşəkar bacarıqlarımı inkişaf etdirmək və karyeramda daim irəliləməkdir.',
      skillsHeading: 'Bacarıqlar',
      skillsDescription:
        'Təmiz proqramlaşdırma, düşünülmüş dizayn və istifadəçi rahatlığı ilə müasir rəqəmsal təcrübələr qururam.',
      educationTitle: 'Təhsil',
      educationDescription:
        'Hər layihəyə aydın baxış və məqsədyönlü yanaşma ilə yanaşır, son iki il ərzində öyrəndiklərimə əsaslanaraq daim yeni biliklər mənimsəyirəm.',
      experienceHeading: 'İş Təcrübəsi',
      educationHeading: 'Təhsil və Kurslar',
      educationEntries: [
        {
          company: 'Evo Akademiyası',
          role: 'Kurs',
          period: 'May 2025 - Okt 2025',
          description: 'Frontend Proqramlaşdırma',
        },
        {
          company: 'Odlar Yurdu Universiteti',
          role: 'Bakalavr Dərəcəsi',
          period: 'Sent 2021 - İyun 2025',
          description: 'Kompüter Mühəndisliyi',
        },
        {
          company: 'Odlar Yurdu Kolleci',
          role: 'Kollec Təhsili',
          period: 'Sent 2019 - İyun 2021',
          description: 'Kompüter Şəbəkələrinin və Kompüter Avadanlıqlarının Təmiri və Servisi',
        },
        {
          company: 'Məktəb',
          role: 'Tam Orta Təhsil',
          period: 'Sent 2008 - İyun 2019',
          description: 'Sumqayıt şəhəri, 6 nömrəli tam orta məktəb',
        },
      ],
      skillsList: [
        {
          title: 'Proqramlaşdırma',
          description:
            'Real istifadəçi ehtiyaclarını qarşılayan, rahat və miqyaslana bilən müasir rəqəmsal məhsulların hazırlanması.',
          tags: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js'],
        },
        {
          title: 'CSS Freymvorkləri və UI',
          description:
            'İnterfeysləri daha sürətli, səliqəli, responsiv və ardıcıl saxlamağa kömək edən müasir CSS freymvorkləri və UI kitabxanaları.',
          tags: ['Tailwind CSS', 'Bootstrap', 'Bulma', 'W3.CSS', 'Uiverse.io'],
        },
        {
          title: 'Kitabxanalar',
          description:
            'İnterfeysləri daha dinamik və axıcı edən zərif animasiyalar, effektlər və skroll təcrübəsi yaradan kitabxanalar.',
          tags: [
            'GSAP',
            'Swiper.js',
            'React Icons',
            'AOS',
            'ScrollReveal',
            'Lenis',
            'Locomotive Scroll',
            'TAOS',
            'Framer Motion (Hazırda öyrənirəm)',
          ],
        },
        {
          title: 'Dizayn Alətləri',
          description:
            'Həm məhsul, həm də qrafik dizayn üçün vizual detallar, interfeys konseptləri və təqdimata hazır dizaynlar hazırlayan alətlər.',
          tags: ['Figma', 'CorelDRAW', 'Adobe Photoshop', 'Canva', 'Kittl'],
        },
        {
          title: 'Qrafik və Çap Dizaynı',
          description:
            'Brend kimliyi, təqdimat və reklam ehtiyaclarını qarşılayan yüksək keyfiyyətli çap və vizual materialların hazırlanması.',
          tags: [
            'Logo',
            'Vizitkartlar',
            'Dəvətnamələr',
            'Sertifikatlar',
            'Flayer və Bukletlər',
            'Posterlər',
            'Menyular',
          ],
        },
      ],
    },
    footer: {
      eyebrow: 'YENİ BİR İDEYANIZ VAR?',
      letsTalk: 'ƏLAQƏ SAXLAYIN',
      rights: '© 2026 Ramin Kərəmli. Bütün hüquqlar qorunur.',
    },
  },
}
