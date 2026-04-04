let footerRevealTween = null;

function clearFooterReveal() {
  if (!footerRevealTween) return;
  footerRevealTween.scrollTrigger?.kill(true);
  footerRevealTween.kill();
  footerRevealTween = null;
}

export function initFooterReveal() {
  const footer = document.querySelector(".site-footer");
  const footerContainer = footer?.querySelector(".site-footer__container");
  const mainContent = document.querySelector(".main-content");

  if (!footer || !footerContainer || !mainContent) return;
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  clearFooterReveal();
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(footerContainer, {
    y: "-70%",
  });

  footerRevealTween = gsap.to(footerContainer, {
    y: "0%",
    ease: "none",
    scrollTrigger: {
      trigger: mainContent,
      start: "bottom bottom",
      end: () => `+=${Math.max(footerContainer.offsetHeight, 1)}`,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  ScrollTrigger.refresh();
}
