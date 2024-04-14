import { useEffect, useState } from "react";

export default function useThemeButton() {
  const initialTheme = localStorage.getItem("theme");

  const [theme, setTheme] = useState(initialTheme ? initialTheme : "dark");

  useEffect(() => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
  }, []);

  function toggle() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.querySelector("body")?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  return { theme, toggle };
}
