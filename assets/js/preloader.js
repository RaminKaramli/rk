export function initPreloader() {
  const overlay = document.querySelector(".loading-overlay");
  const bar = document.querySelector(".loading-bar");
  const content = document.querySelector(".main-content");

  if (!overlay || !bar || !content) return;
  if (typeof gsap === "undefined") {
    overlay.style.display = "none";
    content.style.visibility = "visible";
    content.style.opacity = "1";
    return;
  }

  const barDuration = 3;
  const overlayFadeDuration = 0.6;

  gsap.to(bar, {
    width: "100%",
    duration: barDuration,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: overlayFadeDuration,
        onComplete: () => {
          overlay.style.display = "none";
          gsap.to(content, { autoAlpha: 1, duration: 0.8 });
        },
      });
    },
  });
}
