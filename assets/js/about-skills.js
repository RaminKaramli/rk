const TRANSITION_MS = 320;

function openItem(item, reducedMotion) {
  const trigger = item.querySelector(".about-skills-item__trigger");
  const content = item.querySelector(".about-skills-item__content");

  if (!trigger || !content || item.classList.contains("about-skills-item--open")) {
    return;
  }

  item.classList.add("about-skills-item--open");
  trigger.setAttribute("aria-expanded", "true");
  content.hidden = false;

  if (reducedMotion) {
    content.style.height = "auto";
    return;
  }

  content.style.height = "0px";
  content.getBoundingClientRect();
  content.style.height = `${content.scrollHeight}px`;
  window.setTimeout(() => {
    if (item.classList.contains("about-skills-item--open")) {
      content.style.height = "auto";
    }
  }, TRANSITION_MS);
}

function closeItem(item, reducedMotion) {
  const trigger = item.querySelector(".about-skills-item__trigger");
  const content = item.querySelector(".about-skills-item__content");

  if (!trigger || !content || !item.classList.contains("about-skills-item--open")) {
    return;
  }

  item.classList.remove("about-skills-item--open");
  trigger.setAttribute("aria-expanded", "false");

  if (reducedMotion) {
    content.style.height = "0px";
    content.hidden = true;
    return;
  }

  content.style.height = `${content.scrollHeight}px`;
  content.getBoundingClientRect();
  content.style.height = "0px";

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== "height") {
      return;
    }
    content.hidden = true;
    content.removeEventListener("transitionend", handleTransitionEnd);
  };

  content.addEventListener("transitionend", handleTransitionEnd);
}

export function initAboutSkills() {
  const accordion = document.querySelector("[data-about-skills]");

  if (!accordion) {
    return;
  }

  const items = Array.from(accordion.querySelectorAll("[data-accordion-item]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  items.forEach((item) => {
    const trigger = item.querySelector(".about-skills-item__trigger");

    if (!trigger) {
      return;
    }

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("about-skills-item--open");

      items.forEach((otherItem) => {
        if (otherItem !== item) {
          closeItem(otherItem, reducedMotion);
        }
      });

      if (isOpen) {
        closeItem(item, reducedMotion);
        return;
      }

      openItem(item, reducedMotion);
    });
  });
}
