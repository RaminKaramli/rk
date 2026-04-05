export function initThemeToggle() {
  const STORAGE_KEY = "rk-theme";
  const body = document.body;
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!body || !btn) return;

  const readStoredTheme = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.error("Theme storage read failed", error);
      return null;
    }
  };

  const apply = (isDark) => {
    body.classList.toggle("theme-dark", isDark);
    root.classList.toggle("theme-dark", isDark);
    btn.setAttribute("aria-pressed", String(isDark));

    try {
      window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch (error) {
      console.error("Theme storage write failed", error);
    }
  };

  apply(readStoredTheme() === "dark");

  btn.addEventListener("click", () => {
    apply(!body.classList.contains("theme-dark"));
  });
}
