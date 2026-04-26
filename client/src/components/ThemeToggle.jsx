import { useEffect, useState } from "react";

const THEMES = ["light", "dark", "coffee"];
const META = {
  light:  { icon: "☀️", next: "Dark" },
  dark:   { icon: "🌙", next: "Coffee" },
  coffee: { icon: "☕", next: "Light" },
};

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function cycle() {
    setTheme((t) => {
      const i = THEMES.indexOf(t);
      return THEMES[(i + 1) % THEMES.length];
    });
  }

  const meta = META[theme] ?? META.light;

  return (
    <button
      type="button"
      className="btn btn-sm btn-ghost rounded-full gap-1.5 font-medium"
      onClick={cycle}
      title={`Switch to ${meta.next}`}
    >
      <span className="text-base leading-none">{meta.icon}</span>
      <span className="hidden sm:inline text-xs">{meta.next}</span>
    </button>
  );
}

export default ThemeToggle;