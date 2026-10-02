import projectCard from "../assets/images/project1.jpeg"
import projectCardTwo from "../assets/images/project2.jpeg"
import projectCardThree from "../assets/images/project3.jpeg"
import projectCardFour from "../assets/images/project4.jpeg"
import secondProjectOne from "../assets/images/1-120kb.jpeg"
import secondProjectTwo from "../assets/images/2-120kb.jpeg"
import secondProjectThree from "../assets/images/3-120kb.jpeg"
import secondProjectFour from "../assets/images/4-120kb.jpeg"
import type { NotableStatConfig, StackCard } from "../types/project.types"

export const stackCards: StackCard[] = [
  {
    alt: "Modern landing page project preview",
    image: projectCard,
    tags: ["Product", "Web Design", "Branding", "React"],
  },
  {
    alt: "Portfolio layout project preview",
    image: projectCardTwo,
    tags: ["Portfolio", "UI System", "Animation", "TypeScript"],
  },
  {
    alt: "Startup showcase project preview",
    image: projectCardThree,
    tags: ["Startup", "SCSS", "Frontend", "Responsive"],
  },
  {
    alt: "Creative presentation project preview",
    image: projectCardFour,
    tags: ["Creative", "Glassmorphism", "Interaction", "Build"],
  },
]

export const secondProjectCards: StackCard[] = [
  {
    alt: "Creative presentation project preview 1",
    image: secondProjectOne,
    tags: ["E-Commerce", "Mobile", "UI/UX"],
  },
  {
    alt: "Creative presentation project preview 2",
    image: secondProjectTwo,
    tags: ["Product", "Showcase", "Mobile"],
  },
  {
    alt: "Creative presentation project preview 3",
    image: secondProjectThree,
    tags: ["Store", "Catalogue", "Responsive"],
  },
  {
    alt: "Creative presentation project preview 4",
    image: secondProjectFour,
    tags: ["Checkout", "Details", "Design"],
  },
]

export const notableStats: NotableStatConfig[] = [
  { kind: "static", label: "+Projects", minDigits: 1, target: 2 },
  { kind: "static", label: "+Months", minDigits: 1, target: 2 },
  { kind: "static", label: "+Clients", minDigits: 1, target: 5 },
]

export type { NotableStatConfig, StackCard }
