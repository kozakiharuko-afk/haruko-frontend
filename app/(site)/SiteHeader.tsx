"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  {/* 🌙 Theme toggle (hook later) */}
  <button className="icon-btn">🌙</button>

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
