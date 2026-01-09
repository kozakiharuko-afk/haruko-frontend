"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
  /* ---------------- Theme ---------------- */

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

  /* ---------------- Mock Discord User ---------------- */
  // 🔒 Replace with real Discord OAuth data later

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
  const messageCount = 0; // 💬 hidden when 0

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

            {/* 👤 Avatar + Role Badges */}
            <div className="dropdown-wrapper" ref={avatarRef}>
              <div
                className="avatar avatar-with-badges"
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

                <div className="role-badges">
                  {discordUser.roles.map((role) => (
                    <span
                      key={role.id}
                      className="role-badge"
                      style={{ backgroundColor: role.color }}
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
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

      {children}
    </>
  );
}
