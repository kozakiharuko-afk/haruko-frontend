"use client";

import { useEffect } from "react";
import { useNotifications } from "./NotificationsContext";
import { BookOpen, Book } from "lucide-react";

/* ================= TYPES (PAGE ONLY) ================= */

type PageNotification = {
  id: number;
  type: "manhwa" | "novel";
  title: string;
  extra: number;
  time: string;
  unread: boolean;
  group: "today" | "earlier";
  covers?: string[];
};

export default function NotificationsPage() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearAll,
  } = useNotifications();

  useEffect(() => {
    markAllAsRead();
  }, [markAllAsRead]);

  const today = notifications
  .filter(n => n.group === "today")
  .map(n => ({
    ...n,
    covers: n.type === "manhwa"
      ? [
          "/covers/1.jpg",
          "/covers/2.jpg",
          "/covers/3.jpg",
          "/covers/4.jpg",
          "/covers/5.jpg",
        ]
      : [],
  }));
  const earlier = notifications.filter(n => n.group === "earlier");

  return (
    <main className="notifications-page">
      {/* HEADER */}
      <div className="notifications-header">
        <h1 className="notifications-title">Notifications</h1>

        {notifications.length > 0 && (
          <button
            className="notifications-clear"
            onClick={clearAll}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="notifications-list">
        {today.length > 0 && (
  <>
    <div className="notifications-section">Today</div>

    {today.map(n => (
      <div key={n.id} className="notification-block">
        {/* Main row */}
        <div
          className={`notification-item ${n.unread ? "unread" : ""}`}
          onClick={() => markAsRead(n.id)}
        >
          <div className={`notif-icon ${n.type}`}>
            {n.type === "manhwa" ? (
              <BookOpen size={18} />
            ) : (
              <Book size={18} />
            )}
          </div>

          <div className="notif-content">
            <div className="notif-top">
              <p className="notif-title">
                <strong>{n.title}</strong>
                {n.extra > 0 && ` and ${n.extra} other`} updated
              </p>
              <span className="notif-time">{n.time}</span>
            </div>
          </div>

          {n.unread && <span className="notif-dot" />}
        </div>

        {/* Covers strip (PAGE ONLY) */}
        {n.covers && n.covers.length > 0 && (
          <div className="notif-covers">
            {n.covers.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="notif-cover"
              />
            ))}
          </div>
        )}
      </div>
    ))}
  </>
)}

        {earlier.length > 0 && (
          <>
            <div className="notifications-section">Earlier</div>

            {earlier.map(n => (
              <div
                key={n.id}
                className="notification-item"
                onClick={() => markAsRead(n.id)}
              >
                <div className={`notif-icon ${n.type}`}>
                  {n.type === "manhwa" ? (
                    <BookOpen size={18} />
                  ) : (
                    <Book size={18} />
                  )}
                </div>

                <div className="notif-content">
                  <div className="notif-top">
                    <p className="notif-title">
                      <strong>{n.title}</strong> updated
                    </p>

                    <span className="notif-time">{n.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {notifications.length === 0 && (
          <div className="notifications-empty">
            You're all caught up.
          </div>
        )}
      </div>
    </main>
  );
}
