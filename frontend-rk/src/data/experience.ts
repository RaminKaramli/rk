export type AboutExperienceEntry = {
  company: string
  description: string
  period: string
  role: string
}

export const aboutExperienceIntro = {
  description:
    'I approach each project with a strong sense of clarity and intention, drawing from what I have learned over the past two years while always staying open to learning more.',
  title: 'Education',
}

export const aboutExperienceEntries: AboutExperienceEntry[] = [
  {
    company: 'Evo Academy',
    role: 'Course',
    period: 'May 2025 - Oct 2025',
    description: 'Front-end Development',
  },
  {
    company: 'Odlar Yurdu University',
    role: "Bachelor's Degree",
    period: 'Sept 2021 - June 2025',
    description: 'Computer Engineering',
  },
  {
    company: 'Odlar Yurdu College',
    role: 'College Education',
    period: 'Sept 2019 - June 2021',
    description: 'Repair and Maintenance of Computer Networks and Computer Hardware',
  },
  {
    company: 'School',
    role: 'Primary School / High School',
    period: 'Sept 2008 - June 2019',
    description: 'Sumgait City, No. 6 Complete Secondary School',
  },
]
