export function initThemeToggle() {
  const body = document.body;
  const btn = document.getElementById("themeToggle");
  if (!body || !btn) return;

  const apply = (isDark) => {
    body.classList.toggle("theme-dark", isDark);
    btn.setAttribute("aria-pressed", String(isDark));
  };

  apply(false);

  btn.addEventListener("click", () => {
    apply(!body.classList.contains("theme-dark"));
  });
}
