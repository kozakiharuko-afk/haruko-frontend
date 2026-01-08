"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          Haruko Project
        </a>

        <input
          className="search"
          type="text"
          placeholder="Search series..."
        />

        <div className="actions">
          <button className="icon-btn" onClick={toggleTheme}>
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <div className="avatar">👤</div>
        </div>
      </header>

      {children}
    </>
  );
}
