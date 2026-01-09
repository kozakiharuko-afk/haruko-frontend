"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ---------------- Types ---------------- */

type Notification = {
  id: number;
  text: string;
};

type DiscordUser = {
  id: string;
  username: string;
  avatar: string | null;
};

/* ---------------- Component ---------------- */

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* ---------------- Route Detection ---------------- */

  const pathname = usePathname();

  // ✅ CORRECT reader detection
  const isReaderPage =
    pathname.startsWith("/manhwa/") &&
    pathname.endsWith("/chapter");

  /* ---------------- Theme ---------------- */

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  /* ---------------- Mock User ---------------- */

  const user: DiscordUser = {
    id: "123",
    username: "Haruko",
    avatar: null,
  };

  /* ---------------- Notifications ---------------- */

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: "New chapter released" },
    { id: 2, text: "Someone replied to your comment" },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);

  /* ---------------- Click Outside ---------------- */

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        // close dropdowns if needed later
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ---------------- Render ---------------- */

  return (
    <>
      {/* 🌐 GLOBAL HEADER — NOT rendered on reader */}
      {!isReaderPage && (
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
                  onClick={() =>
                    setShowMobileMenu((v) => !v)
                  }
                >
                  ☰
                </button>

                <button
                  className="icon-btn"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? "🌙" : "☀️"}
                </button>

                <button className="icon-btn badge">
                  🔔
                  {notifications.length > 0 && (
                    <span className="badge-count">
                      {notifications.length}
                    </span>
                  )}
                </button>

                <div className="avatar">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                    />
                  ) : (
                    "👤"
                  )}
                </div>
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
      )}

      {/* 🧠 Page content */}
      {children}
    </>
  );
}
