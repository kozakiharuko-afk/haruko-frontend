"use client";

import { useEffect, useState } from "react";

/* ---------------- Component ---------------- */

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | null;

    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle(
      "light",
      next === "light"
    );
  };

  return (
    <div data-theme={theme}>
      {children}
    </div>
  );
}
