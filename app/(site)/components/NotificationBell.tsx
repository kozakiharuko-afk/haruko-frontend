"use client";

import Link from "next/link";
import { useNotifications } from "@/app/(site)/notifications/NotificationsContext";
import { useState } from "react";
import { Bell, BookOpen, Book } from "lucide-react";

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
  } = useNotifications();

  /* ================= GROUPS ================= */

  const todayNotifications = notifications.filter(n => n.group === "today");
  const earlierNotifications = notifications.filter(n => n.group === "earlier");

  /* ================= RENDER ================= */

  return (
    <div className="dropdown-wrapper">
      <button
        className={`icon-btn badge ${unreadCount === 0 ? "read" : ""}`}
        onClick={() => {
          setShowNotifications(v => !v);
          markAllAsRead();
        }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="badge-count">{unreadCount}</span>
        )}
      </button>

      <div
        className={`dropdown notifications ${
          showNotifications ? "open" : ""
        }`}
      >
        <div className="dropdown-header">Notifications</div>

        <ul className={`dropdown-list ${isClearing ? "collapsing" : ""}`}>
          {todayNotifications.length > 0 && (
            <>
              <li className="dropdown-section">Today</li>
              {todayNotifications.map(n => (
                <li
                  key={n.id}
                  className={`notification-item ${n.unread ? "unread" : ""}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className={`notif-icon ${n.type}`}>
                    {n.type === "manhwa" ? (
                      <BookOpen size={16} />
                    ) : (
                      <Book size={16} />
                    )}
                  </div>

                  <div className="notif-content">
                    <p>
                      <strong>{n.title}</strong>
                      {n.extra > 0 && ` and ${n.extra} other`} updated
                    </p>
                    <span className="notif-time">{n.time}</span>
                  </div>

                  {n.unread && <span className="notif-dot" />}
                </li>
              ))}
            </>
          )}

          {earlierNotifications.length > 0 && (
            <>
              <li className="dropdown-section">Earlier</li>
              {earlierNotifications.map(n => (
                <li
                  key={n.id}
                  className="notification-item"
                  onClick={() => markAsRead(n.id)}
                >
                  <div className={`notif-icon ${n.type}`}>
                    {n.type === "manhwa" ? (
                      <BookOpen size={16} />
                    ) : (
                      <Book size={16} />
                    )}
                  </div>

                  <div className="notif-content">
                    <p><strong>{n.title}</strong> updated</p>
                    <span className="notif-time">{n.time}</span>
                  </div>
                </li>
              ))}
            </>
          )}

          {notifications.length === 0 && (
            <li className="dropdown-empty">
              You're all caught up.
            </li>
          )}
        </ul>

        <div className="dropdown-footer split">
          <Link
            href="/notifications"
            className="dropdown-action view-all"
            onClick={() => setShowNotifications(false)}
          >
            View All
          </Link>

          <button
            className="dropdown-action clear-all"
            onClick={() => {
              if (isClearing) return;
              setIsClearing(true);
              setShowNotifications(false);
              setTimeout(() => {
                clearAll();
                setIsClearing(false);
              }, 180);
            }}
            disabled={isClearing}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
