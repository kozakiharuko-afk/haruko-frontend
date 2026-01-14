"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../AuthProvider";

import {
  User,
  Clock,
  Library,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function AvatarMenu() {
  const { session } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= ESC KEY CLOSE ================= */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () =>
      document.removeEventListener("keydown", handleKey);
  }, []);

  const username =
    session?.user?.user_metadata?.username ??
    session?.user?.name ??
    "user";

  return (
    <div className="avatar-wrapper" ref={menuRef}>
      {/* Avatar button */}
      <button
        className="avatar"
        onClick={() => setOpen(v => !v)}
        aria-label="Open user menu"
        aria-expanded={open}
      >
        {session?.user?.user_metadata?.avatar_url ? (
          <img
            src={session.user.user_metadata.avatar_url}
            alt="avatar"
            className="avatar-img"
          />
        ) : (
          <span className="avatar-fallback">?</span>
        )}
      </button>

      {/* Dropdown */}
{open && (
  <div className="avatar-dropdown" role="menu">
    <div className="avatar-header">
      <strong className="avatar-username">
        @{username}
      </strong>
    </div>

    <div className="avatar-actions">
      <Link href="/profile" className="avatar-item">
        <span className="avatar-item-icon">
          <User size={16} />
        </span>
        <span className="avatar-item-label">Profile</span>
        <ChevronRight className="avatar-item-chevron" size={16} />
      </Link>

      <Link href="/timeline" className="avatar-item">
        <span className="avatar-item-icon">
          <Clock size={16} />
        </span>
        <span className="avatar-item-label">Timeline</span>
        <ChevronRight className="avatar-item-chevron" size={16} />
      </Link>

      <Link href="/library" className="avatar-item">
        <span className="avatar-item-icon">
          <Library size={16} />
        </span>
        <span className="avatar-item-label">Library</span>
        <ChevronRight className="avatar-item-chevron" size={16} />
      </Link>

      <button className="avatar-item danger">
        <span className="avatar-item-icon">
          <LogOut size={16} />
        </span>
        <span className="avatar-item-label">Log out</span>
      </button>
    </div>
  </div>
)}
    </div>
  );
}
