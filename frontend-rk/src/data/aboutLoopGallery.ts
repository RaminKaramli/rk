import imgRk1 from '../assets/images/img-rk1.jpeg'
import imgRk2 from '../assets/images/img-rk2.jpeg'
import imgRk3 from '../assets/images/img-rk3.jpeg'
import imgRk4 from '../assets/images/img-rk4.jpeg'
import imgRk5 from '../assets/images/img-rk5.jpeg'
import imgRk6 from '../assets/images/img-rk6.jpeg'
import imgRk7 from '../assets/images/img-rk7.jpeg'
import imgRk8 from '../assets/images/img-rk8.jpeg'
import imgRk9 from '../assets/images/img-rk9.jpeg'

export type AboutLoopGalleryItem = {
  alt: string
  id: string
  src: string
  type: 'image' | 'video'
}

const itemImg1: AboutLoopGalleryItem = {
  id: 'rk-img-1',
  alt: 'Ramin Karamli portrait 1',
  src: imgRk1,
  type: 'image',
}

const itemImg2: AboutLoopGalleryItem = {
  id: 'rk-img-2',
  alt: 'Ramin Karamli portrait 2',
  src: imgRk2,
  type: 'image',
}

const itemImg3: AboutLoopGalleryItem = {
  id: 'rk-img-3',
  alt: 'Ramin Karamli portrait 3',
  src: imgRk3,
  type: 'image',
}

const itemImg4: AboutLoopGalleryItem = {
  id: 'rk-img-4',
  alt: 'Ramin Karamli portrait 4',
  src: imgRk4,
  type: 'image',
}

const itemImg5: AboutLoopGalleryItem = {
  id: 'rk-img-5',
  alt: 'Ramin Karamli portrait 5',
  src: imgRk5,
  type: 'image',
}

const itemImg6: AboutLoopGalleryItem = {
  id: 'rk-img-6',
  alt: 'Ramin Karamli portrait 6',
  src: imgRk6,
  type: 'image',
}

const itemImg7: AboutLoopGalleryItem = {
  id: 'rk-img-7',
  alt: 'Ramin Karamli portrait 7',
  src: imgRk7,
  type: 'image',
}

const itemImg8: AboutLoopGalleryItem = {
  id: 'rk-img-8',
  alt: 'Ramin Karamli portrait 8',
  src: imgRk8,
  type: 'image',
}

const itemImg9: AboutLoopGalleryItem = {
  id: 'rk-img-9',
  alt: 'Ramin Karamli portrait 9',
  src: imgRk9,
  type: 'image',
}

export const aboutLoopGalleryColumns: AboutLoopGalleryItem[][] = [
  // Sütun 1 (Scrolls UP)
  [itemImg1, itemImg5, itemImg9, itemImg3, itemImg7, itemImg2, itemImg6, itemImg4, itemImg8],
  // Sütun 2 (Scrolls DOWN)
  [itemImg8, itemImg2, itemImg4, itemImg6, itemImg1, itemImg9, itemImg3, itemImg7, itemImg5],
  // Sütun 3 (Scrolls UP)
  [itemImg6, itemImg7, itemImg1, itemImg8, itemImg5, itemImg4, itemImg2, itemImg9, itemImg3],
]
