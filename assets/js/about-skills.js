function parseTimeToken(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return 0;
  }

  if (trimmed.endsWith("ms")) {
    return Number.parseFloat(trimmed);
  }

  if (trimmed.endsWith("s")) {
    return Number.parseFloat(trimmed) * 1000;
  }

  return 0;
}

function getTransitionMs(element) {
  const computedStyle = window.getComputedStyle(element);
  const durations = computedStyle.transitionDuration.split(",");
  const delays = computedStyle.transitionDelay.split(",");

  return durations.reduce((max, duration, index) => {
    const delay = delays[index] ?? delays[delays.length - 1] ?? "0s";
    const total = parseTimeToken(duration) + parseTimeToken(delay);
    return Math.max(max, total);
  }, 0);
}

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
  }, getTransitionMs(content));
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
