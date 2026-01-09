"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  /* ---------------- Theme ---------------- */

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
        <div className="container header-inner">
          {/* LEFT */}
          <div className="header-left">
            <Link href="/" className="logo">
              Haruko Project
            </Link>

            <input
              className="search"
              type="text"
              placeholder="Search series..."
            />
          </div>

          {/* RIGHT */}
          <div className="header-right">
            <button
              className="icon-btn hamburger"
              onClick={() => setShowMobileMenu((v) => !v)}
            >
              ☰
            </button>

            {/* 🌙 Theme toggle */}
            <button className="icon-btn" onClick={toggleTheme}>
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            {/* 💬 Messages */}
            <button className="icon-btn badge">
              💬
              <span className="badge-count">1</span>
            </button>

            {/* 🔔 Notifications */}
            <button className="icon-btn badge">
              🔔
              <span className="badge-count">2</span>
            </button>

            {/* 👤 Avatar */}
            <div className="avatar">👤</div>
          </div>
        </div>
      </header>

      {/* 📱 Mobile menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <input
            className="search mobile-search"
            placeholder="Search series..."
          />
        </div>
      )}
    </>
  );
}
