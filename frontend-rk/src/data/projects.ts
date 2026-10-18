import projectCard from "../assets/images/project-1.jpeg"
import projectCardTwo from "../assets/images/project-2.jpeg"
import projectCardThree from "../assets/images/project-3.jpeg"
import projectCardFour from "../assets/images/project-4.jpeg"
import secondProjectOne from "../assets/images/project-second-1.jpeg"
import secondProjectTwo from "../assets/images/project-second-2.jpeg"
import secondProjectThree from "../assets/images/project-second-3.jpeg"
import secondProjectFour from "../assets/images/project-second-4.jpeg"
import ikiliOne from "../assets/images/project-ikili-1.jpeg"
import ikiliTwo from "../assets/images/project-ikili-2.jpeg"
import ikiliThree from "../assets/images/project-ikili-3.jpeg"
import ikiliFour from "../assets/images/project-ikili-4.jpeg"
import weddingInvitation from "../assets/images/project-wedding-invitation.jpeg"
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

export const ikiliProjectCards: StackCard[] = [
  { alt: "İkili İki e-commerce website preview 1", image: ikiliOne, tags: ["E-Commerce", "Studio Lighting"] },
  { alt: "İkili İki e-commerce website preview 2", image: ikiliTwo, tags: ["E-Commerce", "RGB LED Panels"] },
  { alt: "İkili İki e-commerce website preview 3", image: ikiliThree, tags: ["E-Commerce", "Backdrop Systems"] },
  { alt: "İkili İki e-commerce website preview 4", image: ikiliFour, tags: ["E-Commerce", "Fabric Backdrops"] },
]

export const weddingInvitationCards: StackCard[] = [
  {
    alt: "Digital Wedding Invitation preview",
    image: weddingInvitation,
    tags: ["Digital Invitation", "Interactive", "Mobile", "UI/UX"],
  },
]

export const furnitureProjectCards = ikiliProjectCards

export const notableStats: NotableStatConfig[] = [
  { kind: "static", label: "+Projects", minDigits: 1, target: 2 },
  { kind: "static", label: "+Months", minDigits: 1, target: 2 },
  { kind: "static", label: "+Clients", minDigits: 1, target: 5 },
]

export type { NotableStatConfig, StackCard }
