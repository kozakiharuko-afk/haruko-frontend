"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

/**
 * TEMP UI-only unread logic
 * Replace later with Supabase data
 */
const UNREAD_CONVERSATIONS = [
  "brooklyn",
  "ronald",
];

export function useUnreadMessages() {
  const pathname = usePathname();

  const unreadIds = useMemo(() => {
    // If user is inside messages, mark that convo as read
    const activeId = pathname?.startsWith("/messages/")
      ? pathname.split("/")[2]
      : null;

    return UNREAD_CONVERSATIONS.filter(
      (id) => id !== activeId
    );
  }, [pathname]);

  return {
    unreadCount: unreadIds.length,
    unreadIds,
  };
}
