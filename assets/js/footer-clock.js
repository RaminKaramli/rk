const TIME_LOCALE = "en-US";

const formatFooterClock = (date, timeZone) => {
  const timeFormatter = new Intl.DateTimeFormat(TIME_LOCALE, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone,
  });

  const dateFormatter = new Intl.DateTimeFormat(TIME_LOCALE, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  });

  return `${timeFormatter.format(date)} • ${dateFormatter.format(date)}`;
};

export const initFooterClock = () => {
  const clock = document.getElementById("footerClock");

  if (!clock) return;

  const timeZone = clock.dataset.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const render = () => {
    clock.textContent = formatFooterClock(new Date(), timeZone);
  };

  render();
  window.setInterval(render, 1000);
};
