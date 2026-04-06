import { initPreloader } from "./preloader.js";
import { initNavbar } from "./navbar.js";
import { initCanvasEffects } from "./canvas-effects.js";
import { initThemeToggle } from "./theme-toggle.js";
import { initStackCards } from "./stack-cards.js";
import { initNotableStats } from "./notable-stats.js";
import { initFooterReveal } from "./footer-reveal.js";
import { initFooterClock } from "./footer-clock.js";
import { initAboutSkills } from "./about-skills.js";

window.addEventListener("load", () => {
  const run = () => {
    initPreloader();
    initNavbar();
    initCanvasEffects();
    initThemeToggle();
    initStackCards();
    initNotableStats();
    initAboutSkills();
    initFooterReveal();
    initFooterClock();
  };

  const readyNow = typeof gsap !== "undefined" && typeof window.jQuery !== "undefined";

  if (readyNow) {
    run();
    return;
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    const ready = typeof gsap !== "undefined" && typeof window.jQuery !== "undefined";

    if (ready) {
      clearInterval(timer);
      run();
      return;
    }
    if (tries > 100) {
      clearInterval(timer);
      run();
    }
  }, 50);
});
