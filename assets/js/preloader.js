export function initPreloader() {
  const STORAGE_KEY = "rk-preloader-seen";
  const body = document.body;
  const root = document.documentElement;
  const overlay = document.querySelector(".loading-overlay");
  const bar = document.querySelector(".loading-bar");
  const content = document.querySelector(".main-content");
  const revealContent = () => {
    overlay?.style.setProperty("display", "none");
    content?.style.setProperty("visibility", "visible");
    content?.style.setProperty("opacity", "1");
    body?.classList.remove("is-preloading");
  };

  if (!overlay || !bar || !content) {
    body?.classList.remove("is-preloading");
    return;
  }

  if (root.classList.contains("skip-preloader")) {
    revealContent();
    return;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  } catch (error) {
    console.error("Preloader storage write failed", error);
  }

  if (typeof gsap === "undefined") {
    revealContent();
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
          body?.classList.remove("is-preloading");
          overlay.style.display = "none";
          gsap.to(content, { autoAlpha: 1, duration: 0.8 });
        },
      });
    },
  });
}
