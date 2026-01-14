"use client";

import { createContext, useContext, useState } from "react";

type UnreadMessagesContextType = {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
};

const UnreadMessagesContext =
  createContext<UnreadMessagesContextType | undefined>(undefined);

export function UnreadMessagesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <UnreadMessagesContext.Provider
      value={{ unreadCount, setUnreadCount }}
    >
      {children}
    </UnreadMessagesContext.Provider>
  );
}

export function useUnreadMessages() {
  const ctx = useContext(UnreadMessagesContext);
  if (!ctx) {
    throw new Error(
      "useUnreadMessages must be used inside UnreadMessagesProvider"
    );
  }
  return ctx;
}
