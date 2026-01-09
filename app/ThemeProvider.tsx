"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ---------------- Types ---------------- */

type Notification = {
  id: number;
  text: string;
};

type DiscordRole = {
  id: string;
  name: "Moderator" | "VIP";
  color: string;
};

type DiscordUser = {
  id: string;
  username: string;
  avatar: string | null;
  roles: DiscordRole[];
};

/* ---------------- Component ---------------- */

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* ---------------- Route Detection ---------------- */

  const pathname = usePathname();
  const isReaderPage = pathname.startsWith("/manhwa/chapter");

  /* ---------------- Theme ---------------- */

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  /* ---------------- Mock Discord User ---------------- */
  // 🔒 Roles kept for future User Page

  const discordUser: DiscordUser = {
    id: "123456789012345678",
    username: "Haruko",
    avatar: "a_5b7d8e9f0abcdef1234567890abcdef",
    roles: [
      { id: "mod", name: "Moderator", color: "#4ea8de" },
      { id: "vip", name: "VIP", color: "#ff8a5b" },
    ],
  };

  const avatarUrl = discordUser.avatar
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
    : null;

  /* ---------------- Notifications ---------------- */

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: "New chapter released: Midnight Bloom" },
    { id: 2, text: "Someone replied to your comment" },
  ]);

  const notificationCount = notifications.length;
  const messageCount = 0;

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  /* ---------------- Dropdown State ---------------- */

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  /* ---------------- Click Outside ---------------- */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setShowAvatarMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Render ---------------- */

  return (
    <>
      {/* 🌐 GLOBAL HEADER (hidden on reader page) */}
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
                {/* ☰ Mobile menu */}
                <button
                  className="icon-btn hamburger"
                  onClick={() => setShowMobileMenu((v) => !v)}
                >
                  ☰
                </button>

                {/* Theme toggle */}
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

                {/* 💬 Messages */}
                <button className="icon-btn badge">
                  💬
                  {messageCount > 0 && (
                    <span className="badge-count">
                      {messageCount}
                    </span>
                  )}
                </button>

                {/* 👤 Avatar */}
                <div className="dropdown-wrapper" ref={avatarRef}>
                  <div
                    className="avatar"
                    onClick={() =>
                      setShowAvatarMenu((v) => !v)
                    }
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={discordUser.username}
                        className="avatar-img"
                      />
                    ) : (
                      "👤"
                    )}
                  </div>

                  {showAvatarMenu && (
                    <div className="dropdown">
                      <ul className="dropdown-list">
                        <li>My Library</li>
                        <li>Activity</li>
                        <li>Settings</li>
                      </ul>
                    </div>
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
                type="text"
                placeholder="Search series..."
              />

              <div className="mobile-actions">
                <button className="icon-btn">🔔 Notifications</button>
                <button className="icon-btn">💬 Messages</button>
                <button className="icon-btn">📚 My Library</button>
                <button className="icon-btn">⚙️ Settings</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* 🧠 Page content */}
      {children}
    </>
  );
}
