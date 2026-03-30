let stackCardsState = null;

function clearStackCards() {
  if (!stackCardsState) return;

  stackCardsState.tl?.scrollTrigger?.kill(true);
  stackCardsState.tl?.kill();
  stackCardsState.cards.forEach((card) => {
    gsap.set(card, { clearProps: "all" });
  });
  gsap.set(stackCardsState.list, { clearProps: "all" });
  stackCardsState = null;
}

export function initStackCards() {
  const section = document.querySelector(".stack-cards-section");
  const list = section?.querySelector(".stack-cards-list");
  const cards = list ? gsap.utils.toArray(".stack-card", list) : [];

  if (!section || !list || !cards.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  clearStackCards();

  if (window.matchMedia("(max-width: 768px)").matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const revealOffset = 36;
  const stepDistance = window.innerHeight * 0.82;

  gsap.set(list, {
    height: window.innerHeight,
  });

  cards.forEach((card, index) => {
    const content = card.querySelector(".stack-card-content");
    const num = card.querySelector(".stack-card-num");

    gsap.set(card, {
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      yPercent: -50,
      y: index === 0 ? 0 : window.innerHeight * 0.9,
      scale: 1,
      opacity: 1,
      zIndex: index + 1,
    });

    gsap.set([content, num], {
      autoAlpha: index === 0 ? 1 : 0,
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: list,
      start: "top top",
      end: `+=${stepDistance * (cards.length - 1)}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  cards.forEach((card, index) => {
    if (index === 0) return;

    tl.to(
      cards.slice(0, index),
      {
        y: (i) => -revealOffset * (index - i),
        scale: (i) => 1 - 0.04 * (index - i),
        opacity: (i) => 1 - 0.12 * (index - i),
        ease: "none",
        duration: 1,
      },
      index - 1,
    )
      .to(
        cards.slice(0, index).map((prevCard) => prevCard.querySelector(".stack-card-content")),
        {
          autoAlpha: 0,
          ease: "none",
          duration: 0.25,
        },
        index - 1,
      )
      .to(
        cards.slice(0, index).map((prevCard) => prevCard.querySelector(".stack-card-num")),
        {
          autoAlpha: 0.12,
          ease: "none",
          duration: 0.25,
        },
        index - 1,
      )
      .to(
        card,
        {
          y: 0,
          ease: "none",
          duration: 1,
        },
        index - 1,
      )
      .to(
        [card.querySelector(".stack-card-content"), card.querySelector(".stack-card-num")],
        {
          autoAlpha: 1,
          ease: "none",
          duration: 0.25,
        },
        index - 0.15,
      );
  });

  stackCardsState = { list, cards, tl };

  const onResize = () => {
    clearStackCards();
    initStackCards();
  };

  window.addEventListener("resize", onResize, { once: true });
}
