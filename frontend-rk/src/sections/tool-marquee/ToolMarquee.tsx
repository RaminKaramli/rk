import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

const folderRows = [
  [
    {
      index: '01',
      title: 'Development',
      variant: 'variant-1',
      images: [
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop',
      ],
    },
    {
      index: '02',
      title: 'Motion Design',
      variant: 'variant-2',
      images: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
      ],
    },
  ],
  [
    {
      index: '03',
      title: 'UI & UX',
      variant: 'variant-2',
      images: [
        'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      ],
    },
    {
      index: '04',
      title: 'Graphic Design',
      variant: 'variant-3',
      images: [
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=800&auto=format&fit=crop',
      ],
    },
    {
      index: '05',
      title: '3D Animation',
      variant: 'variant-1',
      images: [
        'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800&auto=format&fit=crop',
      ],
    },
  ],
]

const fanConfig = [
  { rotate: -14, y: -8 },
  { rotate: 0, y: -22 },
  { rotate: 14, y: -8 },
]

export default function ToolMarquee() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const folders = Array.from(section.querySelectorAll<HTMLElement>('.folder-showcase__folder'))

    const cleanups = folders.map((folder) => {
      const images = Array.from(folder.querySelectorAll<HTMLElement>('.folder-showcase__preview-img'))

      const onMouseEnter = () => {
        folders.forEach((item) => {
          if (item !== folder) item.classList.add('folder-showcase__folder--disabled')
        })

        images.forEach((image, index) => {
          const { rotate, y } = fanConfig[index]
          gsap.killTweensOf(image)
          gsap.fromTo(
            image,
            {
              opacity: 0,
              y: 40,
              rotate: 0,
              scale: 0.88,
            },
            {
              opacity: 1,
              y,
              rotate,
              scale: 1,
              duration: 0.55,
              delay: index * 0.07,
              ease: 'back.out(1.6)',
            },
          )
        })
      }

      const onMouseLeave = () => {
        folders.forEach((item) => item.classList.remove('folder-showcase__folder--disabled'))
        images.forEach((image, index) => {
          gsap.killTweensOf(image)
          gsap.to(image, {
            opacity: 0,
            y: 30,
            rotate: 0,
            scale: 0.92,
            duration: 0.28,
            delay: index * 0.03,
            ease: 'power2.inOut',
          })
        })
      }

      folder.addEventListener('mouseenter', onMouseEnter)
      folder.addEventListener('mouseleave', onMouseLeave)

      return () => {
        folder.removeEventListener('mouseenter', onMouseEnter)
        folder.removeEventListener('mouseleave', onMouseLeave)
        gsap.killTweensOf(images)
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  return (
    <section ref={sectionRef} className="folder-showcase" aria-label="Service folders">
      <main className="folder-showcase__folders">
        {folderRows.map((row, rowIndex) => (
          <div className={`folder-showcase__row folder-showcase__row--${rowIndex + 1}`} key={rowIndex}>
            {row.map((folder) => (
              <article
                className={`folder-showcase__folder folder-showcase__folder--${folder.variant}`}
                key={folder.title}
              >
                <div className="folder-showcase__preview" aria-hidden="true">
                  {folder.images.map((image) => (
                    <div className="folder-showcase__preview-img" key={image}>
                      <img src={image} alt="" />
                    </div>
                  ))}
                </div>

                <div className="folder-showcase__wrapper">
                  <div className="folder-showcase__index">
                    <p>{folder.index}</p>
                  </div>

                  <div className="folder-showcase__name">
                    <h2>{folder.title}</h2>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ))}
      </main>
    </section>
  )
}
