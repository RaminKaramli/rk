import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import MusicPlayer from "../../components/common/music-player/MusicPlayer";
import { media, siteContent } from "../../utils/constants";

type HomeHeroProps = {
  showPreloader: boolean;
};

export default function HomeHero({ showPreloader }: HomeHeroProps) {
  const topCopyRef = useRef<HTMLParagraphElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const bottomCopyRef = useRef<HTMLParagraphElement | null>(null);
  const skillPillsRef = useRef<HTMLDivElement | null>(null);
  const playerWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const topCopy = topCopyRef.current;
    const name = nameRef.current;
    const figure = figureRef.current;
    const bottomCopy = bottomCopyRef.current;
    const skillPills = skillPillsRef.current;
    const playerWrap = playerWrapRef.current;

    if (!topCopy || !name || !figure || !bottomCopy || !skillPills || !playerWrap) {
      return;
    }

    const textFadeTargets = [topCopy, bottomCopy];
    const instantTargets = [figure, name];
    const skillPillTargets = Array.from(skillPills.querySelectorAll("p"));
    const playerFadeTarget = [playerWrap];

    if (showPreloader) {
      gsap.killTweensOf([...textFadeTargets, ...instantTargets, ...skillPillTargets, ...playerFadeTarget]);
      gsap.set(textFadeTargets, {
        opacity: 0,
      });
      gsap.set(instantTargets, {
        opacity: 1,
      });
      gsap.set(skillPillTargets, {
        opacity: 0,
        x: -20,
      });
      gsap.set(playerFadeTarget, {
        opacity: 0,
        y: 20,
      });
      return;
    }
    gsap.killTweensOf([...textFadeTargets, ...instantTargets, ...skillPillTargets, ...playerFadeTarget]);
    gsap.set(instantTargets, {
      opacity: 1,
    });
    gsap.set(textFadeTargets, {
      opacity: 0,
    });
    gsap.set(skillPillTargets, {
      opacity: 0,
      x: -20,
    });
    gsap.set(playerFadeTarget, {
      opacity: 0,
      y: 20,
    });

    gsap
      .timeline()
      .to(topCopy, {
        delay: 0.08,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      })
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
      .to(playerFadeTarget, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      });
  }, [showPreloader]);

  return (
    <section id="home-section" className="hero-section">
      <div className="hero-middle">
        <p ref={topCopyRef} className="press-text-one">
          {siteContent.heroTopCopy}
        </p>

        <div className="hero-name-wrap">
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

        <div ref={playerWrapRef} className="top-right">
          <MusicPlayer />
        </div>
      </div>
    </section>
  );
}
