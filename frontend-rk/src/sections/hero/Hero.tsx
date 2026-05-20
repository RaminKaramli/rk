import { useLayoutEffect, useRef } from "react";
import { gsap, Draggable } from "../../lib/gsap";

import { useDocumentTheme } from "../../hooks/useDocumentTheme";
import { media, siteContent } from "../../utils/constants";
import mymacbookImg from "../../assets/images/mymacbook.png";
import mycanonImg from "../../assets/images/mycanon.png";
import mycanonPowerSha3400Img from "../../assets/images/mycanonPowerSha3400.png";
import mycoclearimplantImg from "../../assets/images/mycoclearimplant.png";
import myconverseblueImg from "../../assets/images/myconverseblue.png";

const DRAGGABLE_ITEMS = [
  {
    id: "kuih-lenggang",
    src: mymacbookImg,
    alt: "kuih lenggang",
    className: "",
  },
  {
    id: "kuih-pelita",
    src: mycanonPowerSha3400Img,
    alt: "kuih pelita",
    className: "kuih-pelita",
  },
  {
    id: "kuih-lapis",
    src: mycoclearimplantImg,
    alt: "kuih lapis",
    className: "kuih-lapis",
  },
  {
    id: "seri-muka",
    src: myconverseblueImg,
    alt: "kuih seri muka",
    className: "seri-muka",
  },
  {
    id: "pulut-serunding",
    src: mycanonImg,
    alt: "pulut serunding",
    className: "",
  },
];

type HomeHeroProps = {
  showPreloader: boolean;
};

export default function HomeHero({ showPreloader }: HomeHeroProps) {
  const isDarkTheme = useDocumentTheme();
  const sectionRef = useRef<HTMLElement | null>(null);
  const topCopyRef = useRef<HTMLParagraphElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const nameWrapRef = useRef<HTMLDivElement | null>(null);
  const bottomCopyRef = useRef<HTMLParagraphElement | null>(null);
  const skillPillsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const topCopy = topCopyRef.current;
    const name = nameRef.current;
    const figure = figureRef.current;
    const nameWrap = nameWrapRef.current;
    const bottomCopy = bottomCopyRef.current;
    const skillPills = skillPillsRef.current;

    if (!section || !topCopy || !name || !figure || !nameWrap || !bottomCopy || !skillPills) {
      return;
    }

    const textFadeTargets = [topCopy, bottomCopy];
    const skillPillTargets = Array.from(skillPills.querySelectorAll("p"));
    const draggableElements = Array.from(
      nameWrap.querySelectorAll<HTMLImageElement>(".draggable")
    );

    if (showPreloader) {
      gsap.killTweensOf([...textFadeTargets, figure, ...skillPillTargets, ...draggableElements]);
      gsap.set([name], { opacity: 1 });
      gsap.set(textFadeTargets, { opacity: 0 });
      gsap.set(figure, { opacity: 0 });
      gsap.set(skillPillTargets, { opacity: 0, x: -20 });
      gsap.set(draggableElements, { opacity: 0, scale: 0 });
      return;
    }

    // Layout: distribute draggable items around the perimeter of hero-name-wrap
    const layout = () => {
      const cw = nameWrap.clientWidth;
      const ch = nameWrap.clientHeight;

      draggableElements.forEach((item, index) => {
        const iw = item.offsetWidth || 80;
        const ih = item.offsetHeight || 60;

        const maxX = cw - iw;
        const maxY = ch - ih;

        const totalPerimeter = 2 * (maxX + maxY);
        if (totalPerimeter <= 0) return;

        const segment = totalPerimeter / draggableElements.length;

        let dist = (segment * index) + (Math.random() * (segment * 0.9));
        dist = dist % totalPerimeter;

        let x, y;
        if (dist < maxX) {
          x = dist; y = 0;
        } else if (dist < maxX + maxY) {
          x = maxX; y = dist - maxX;
        } else if (dist < (maxX * 2) + maxY) {
          x = maxX - (dist - (maxX + maxY)); y = maxY;
        } else {
          x = 0; y = maxY - (dist - (maxX * 2 + maxY));
        }

        item.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        item.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
      });
    };

    layout();

    const imageLoadPromises = draggableElements.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    Promise.all(imageLoadPromises).then(() => {
      layout();
    });

    window.addEventListener("resize", layout);

    // Initialize Draggable bounded to hero-name-wrap
    const draggables = Draggable.create(draggableElements, {
      bounds: nameWrap,
      onDragStart: function () {
        gsap.set(this.target, { zIndex: 10 });
      },
      onDragEnd: function () {
        gsap.set(this.target, { zIndex: 5 });
      }
    });

    // Entrance Animation Timeline
    gsap.killTweensOf([...textFadeTargets, figure, ...skillPillTargets, ...draggableElements]);
    gsap.set(name, { opacity: 1 });
    gsap.set(figure, { opacity: 0 });
    gsap.set(textFadeTargets, { opacity: 0 });
    gsap.set(skillPillTargets, { opacity: 0, x: -20 });
    gsap.set(draggableElements, { opacity: 0, scale: 0 });

    gsap
      .timeline()
      .to(topCopy, {
        delay: 0.08,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      })
      .to(figure, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "<")
      .to(bottomCopy, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(skillPillTargets, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
      })
      .to(draggableElements, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
        stagger: 0.1,
      }, "-=0.3");

    return () => {
      window.removeEventListener("resize", layout);
      draggables.forEach((d) => d.kill());
    };
  }, [showPreloader]);

  return (
    <section
      ref={sectionRef}
      id="home-section"
      className="hero-section"
      data-theme={isDarkTheme ? "dark" : "light"}
      style={{
        backgroundColor: isDarkTheme ? "#000000" : "#ffffff",
        color: isDarkTheme ? "#f3f6ff" : "#121212",
      }}
    >
      <div className="hero-middle">
        <p ref={topCopyRef} className="press-text-one">
          {siteContent.heroTopCopy}
        </p>

        <div ref={nameWrapRef} className="hero-name-wrap">
          <h1
            ref={nameRef}
            className="my-name my-name--blend"
            style={{
              fontFamily: "var(--headingnowtrial)",
              letterSpacing: "0.005em",
            }}
          >
            Ramin Karamli
          </h1>

          <div ref={figureRef} className="hero-figure">
            <img
              src={media.heroFigure}
              alt="Person waving while working on a laptop"
              className="hero-figure-image"
            />
          </div>

          {DRAGGABLE_ITEMS.map((item) => (
            <img
              key={item.id}
              src={item.src}
              alt={item.alt}
              className={`draggable ${item.className || ""}`}
            />
          ))}
        </div>

        <p ref={bottomCopyRef} className="press-text-two">
          {siteContent.heroBottomCopy}
        </p>
      </div>

      <div id="left-right-full" className="bottom-row">
        <div ref={skillPillsRef} className="top-left">
          <p>FRONT-END DEVELOPER</p>
          <p>UI/UX DESIGN</p>
        </div>
      </div>
    </section>
  );
}
