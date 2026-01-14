"use client";

import { useState } from "react";
import { Bell, BookOpen, Book } from "lucide-react";

type Notification = {
  id: number;
  type: "manhwa" | "novel";
  title: string;
  extra: number;
  time: string;
  unread: boolean;
  group: "today" | "earlier";
};

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "manhwa",
      title: "Midnight Bloom",
      extra: 3,
      time: "2h",
      unread: true,
      group: "today",
    },
    {
      id: 2,
      type: "novel",
      title: "Crimson Ashes",
      extra: 1,
      time: "5h",
      unread: true,
      group: "today",
    },
    {
      id: 3,
      type: "manhwa",
      title: "Echoes of You",
      extra: 0,
      time: "Yesterday",
      unread: false,
      group: "earlier",
    },
  ]);

  const notificationCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const clearAll = () => {
    if (isClearing) return;

    setIsClearing(true);
    setShowNotifications(false);

    setTimeout(() => {
      setNotifications([]);
      setIsClearing(false);
    }, 180);
  };

  const todayNotifications = notifications.filter(n => n.group === "today");
  const earlierNotifications = notifications.filter(n => n.group === "earlier");

  return (
    <div className="dropdown-wrapper">
      <button
        className={`icon-btn badge ${
          notificationCount === 0 ? "read" : ""
        }`}
        onClick={() => {
          setShowNotifications(v => {
            const next = !v;
            if (next) markAllAsRead();
            return next;
          });
        }}
      >
        <Bell size={18} />
        {notificationCount > 0 && (
          <span className="badge-count">{notificationCount}</span>
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
              You're all caught up ✨
            </li>
          )}
        </ul>

        <div className="dropdown-footer split">
          <button className="dropdown-action view-all">View All</button>
          <button
            className="dropdown-action clear-all"
            onClick={clearAll}
            disabled={isClearing}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
