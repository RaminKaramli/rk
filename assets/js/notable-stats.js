function formatStatValue(value, minDigits) {
  return String(value).padStart(minDigits, "0");
}

function parseIsoLocalDate(isoDate) {
  if (!isoDate) return null;
  const parts = isoDate.split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) return null;

  const [year, month, day] = parts;
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }
  return parsed;
}

function getElapsedMonthsSince(startDate, nowDate = new Date()) {
  let months =
    (nowDate.getFullYear() - startDate.getFullYear()) * 12 +
    (nowDate.getMonth() - startDate.getMonth());

  if (nowDate.getDate() < startDate.getDate()) {
    months -= 1;
  }

  return Math.max(0, months);
}

function resolveCounterConfig(element) {
  const counterType = element.dataset.counter;

  if (counterType === "months-since") {
    const startDate = parseIsoLocalDate(element.dataset.startDate);
    const monthLabel = element.dataset.monthLabel || "+Months";
    const yearLabel = element.dataset.yearLabel || "+Years";
    const monthMinDigits = Number(element.dataset.minDigits) || 2;
    const yearMinDigits = Number(element.dataset.yearMinDigits) || 1;

    if (!startDate) {
      return { target: 0, minDigits: monthMinDigits, label: monthLabel };
    }

    const elapsedMonths = getElapsedMonthsSince(startDate);

    if (elapsedMonths >= 12) {
      return {
        target: Math.floor(elapsedMonths / 12),
        minDigits: yearMinDigits,
        label: yearLabel,
      };
    }

    return {
      target: elapsedMonths,
      minDigits: monthMinDigits,
      label: monthLabel,
    };
  }

  return {
    target: Number(element.dataset.target) || 0,
    minDigits: Number(element.dataset.minDigits) || 2,
    label: null,
  };
}

function animateStatNumber(element, target, minDigits, duration = 1400) {
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    element.textContent = formatStatValue(current, minDigits);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = formatStatValue(target, minDigits);
    }
  };

  requestAnimationFrame(tick);
}

export function initNotableStats() {
  const section = document.querySelector(".notable-works-section");
  if (!section) return;

  const statElements = [...section.querySelectorAll(".js-stat-number")];
  if (!statElements.length) return;

  const runAnimation = () => {
    if (section.dataset.statsAnimated === "true") return;
    section.dataset.statsAnimated = "true";

    statElements.forEach((element) => {
      const counter = resolveCounterConfig(element);
      const statItem = element.closest(".notable-stat");
      const labelElement = statItem?.querySelector(".notable-stat__label");

      if (counter.label && labelElement) {
        labelElement.textContent = counter.label;
      }

      animateStatNumber(element, counter.target, counter.minDigits);
    });
  };

  if (!("IntersectionObserver" in window)) {
    runAnimation();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runAnimation();
        observer.disconnect();
      });
    },
    { threshold: 0.35 },
  );

  observer.observe(section);
}
