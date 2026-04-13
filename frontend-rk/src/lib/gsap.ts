import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, Draggable)

export { gsap, ScrollTrigger, Draggable }
