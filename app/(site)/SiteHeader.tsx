"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../AuthProvider";

import { useUnreadMessages } from "./messages/UnreadMessagesContext";
import SearchBox from "./components/SearchBox";
import NotificationBell from "./components/NotificationBell";
import AvatarMenu from "./components/AvatarMenu";

import { Moon, Sun, MessageCircle } from "lucide-react";

export default function SiteHeader() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { session } = useAuth();
  const { unreadCount } = useUnreadMessages();

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
          {/* LOGO → HOME */}
          <Link href="/" className="logo" aria-label="Go to homepage">
            <img src="/logo/haruko-logo.png" alt="Haruko" />
          </Link>

          {/* SEARCH */}
          <SearchBox />
        </div>

        {/* ================= RIGHT ================= */}
        <div className="header-right">

          {/* Theme toggle */}
          <button
            type="button"
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="toggle-icon">
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </span>
          </button>

          {/* Messages → /messages */}
          <Link
            href="/messages"
            className="icon-btn badge"
            aria-label="Messages"
          >
            <MessageCircle size={18} />
            {unreadCount > 0 && (
              <span className="badge-count">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <NotificationBell />

          {/* Avatar menu */}
          <AvatarMenu />

        </div>
      </div>
    </header>
  );
}
