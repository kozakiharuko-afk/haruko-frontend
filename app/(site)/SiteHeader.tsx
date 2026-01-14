"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../AuthProvider";

import SearchBox from "./components/SearchBox";
import NotificationBell from "./components/NotificationBell";
import AvatarMenu from "./components/AvatarMenu";

import { Moon, Sun, MessageCircle } from "lucide-react";

export default function SiteHeader() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { session } = useAuth();

  /* ================= THEME ================= */

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
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <header className="header">
      <div className="header-inner">

        {/* ================= LEFT ================= */}
        <div className="header-left">
          <Link href="/" className="logo">
            <img src="/logo/haruko-logo.png" alt="Haruko" />
          </Link>

          <SearchBox />
        </div>

        {/* ================= RIGHT ================= */}
        <div className="header-right">

          {/* Theme toggle */}
          <button
  className={`theme-toggle ${theme}`}
  onClick={toggleTheme}
  aria-label="Toggle theme"
>
  <span className="toggle-icon">
    {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
  </span>
</button>

          {/* Messages */}
          <button className="icon-btn badge">
            <MessageCircle size={18} />
            <span className="badge-count">1</span>
          </button>

          {/* Notifications */}
          <NotificationBell />

          {/* Avatar */}
          <AvatarMenu />

        </div>
      </div>
    </header>
  );
}