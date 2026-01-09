"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Notification = {
  id: number;
  text: string;
};

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showNotifications, setShowNotifications] = useState(false);

  // 🔔 Notifications state (REAL behavior now)
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: "New chapter released: Midnight Bloom" },
    { id: 2, text: "Someone replied to your comment" },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);

  const notificationCount = notifications.length;
  const messageCount = 0;

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

  /* ---------------- Click Outside ---------------- */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Notification Actions ---------------- */

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
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
            <button className="icon-btn" onClick={toggleTheme}>
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            {/* 🔔 Notifications */}
            <div className="dropdown-wrapper" ref={notifRef}>
              <button
                className="icon-btn badge"
                onClick={() =>
                  setShowNotifications((v) => !v)
                }
              >
                🔔
                {notificationCount > 0 && (
                  <span className="badge-count">
                    {notificationCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="dropdown">
                  <div className="dropdown-header">
                    <span>Notifications</span>

                    {notifications.length > 0 && (
                      <button
                        className="clear-btn"
                        onClick={clearAll}
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="dropdown-empty">
                      You’re all caught up ✨
                    </div>
                  ) : (
                    <ul className="dropdown-list">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                        >
                          {n.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* 💬 Messages (future) */}
            <button className="icon-btn badge">
              💬
              {messageCount > 0 && (
                <span className="badge-count">
                  {messageCount}
                </span>
              )}
            </button>

            <div className="avatar">👤</div>
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
