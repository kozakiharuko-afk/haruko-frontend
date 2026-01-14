"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Notification = {
  id: number;
  type: "manhwa" | "novel";
  title: string;
  extra: number;
  time: string;
  unread: boolean;
  group: "today" | "earlier";
};

type NotificationsContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
};

const NotificationsContext =
  createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const unreadCount = useMemo(
    () => notifications.filter(n => n.unread).length,
    [notifications]
  );

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
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used inside NotificationsProvider"
    );
  }
  return ctx;
}
