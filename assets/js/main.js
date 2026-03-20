import { initPreloader } from "./preloader.js";
import { initNavbar } from "./navbar.js";

window.addEventListener("load", () => {
  const run = () => {
    initPreloader();
    initNavbar();
  };

  const readyNow =
    typeof gsap !== "undefined" &&
    typeof SplitText !== "undefined" &&
    typeof window.jQuery !== "undefined";

  if (readyNow) {
    run();
    return;
  }

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    const ready =
      typeof gsap !== "undefined" &&
      typeof SplitText !== "undefined" &&
      typeof window.jQuery !== "undefined";

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
