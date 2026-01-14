"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenSquare, BellOff } from "lucide-react";

type Conversation = {
  conversationId: string;
  name: string;
  message: string;
  time: string;
  unread?: boolean;
  typing?: boolean;
  muted?: boolean;
};

export default function MessagesInbox() {
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);
  const autoFiltered = useRef(false);
  const lastSelectedIndex = useRef<number | null>(null);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [undoData, setUndoData] = useState<Conversation[] | null>(null);

  const [filter, setFilter] = useState<"all" | "unread" | "muted">(() => {
    if (typeof window === "undefined") return "all";
    return (
      (localStorage.getItem("messages-filter") as
        | "all"
        | "unread"
        | "muted") || "all"
    );
  });

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      conversationId: "brooklyn",
      name: "Brooklyn Simmons",
      message: "typing...",
      time: "3 min ago",
      typing: true,
      muted: true,
    },
    {
      conversationId: "ronald",
      name: "Ronald Richards",
      message: "I wanted to let you know that...",
      time: "2 min ago",
      unread: true,
    },
    {
      conversationId: "kristin",
      name: "Kristin Watson",
      message: "thank you for the reminder!",
      time: "1 min ago",
    },
  ]);

  const totalCount = conversations.length;
  const unreadCount = conversations.filter((c) => c.unread).length;
  const mutedCount = conversations.filter((c) => c.muted).length;

  /* ================= FILTER LOGIC ================= */

  const filtered = conversations.filter((c) => {
    if (filter === "unread") return c.unread;
    if (filter === "muted") return c.muted;
    return true;
  });

  /* ================= EFFECTS ================= */

  useEffect(() => {
    localStorage.setItem("messages-filter", filter);
  }, [filter]);

  useEffect(() => {
    if (unreadCount > 0 && filter === "all" && !autoFiltered.current) {
      setFilter("unread");
      autoFiltered.current = true;
    }
  }, [unreadCount, filter]);

  useEffect(() => {
    const key = `messages-scroll-${filter}`;
    const saved = sessionStorage.getItem(key);
    if (saved && listRef.current) {
      listRef.current.scrollTop = Number(saved);
    }
  }, [filter]);

  /* ================= SELECTION ================= */

  const toggleSelect = (
    id: string,
    index: number,
    shiftKey: boolean
  ) => {
    setSelected((prev) => {
      const next = new Set(prev);

      if (shiftKey && lastSelectedIndex.current !== null) {
        const start = Math.min(lastSelectedIndex.current, index);
        const end = Math.max(lastSelectedIndex.current, index);

        for (let i = start; i <= end; i++) {
          next.add(filtered[i].conversationId);
        }
      } else {
        next.has(id) ? next.delete(id) : next.add(id);
        lastSelectedIndex.current = index;
      }

      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  const selectAllFiltered = () => {
    setSelected((prev) => {
      const ids = filtered.map((c) => c.conversationId);
      const allSelected = ids.every((id) => prev.has(id));
      return allSelected ? new Set() : new Set(ids);
    });
  };

  /* ================= BATCH ACTIONS ================= */

  const markSelectedRead = () => {
    setConversations((prev) =>
      prev.map((c) =>
        selected.has(c.conversationId)
          ? { ...c, unread: false }
          : c
      )
    );
    clearSelection();
  };

  const muteSelected = () => {
    setConversations((prev) =>
      prev.map((c) =>
        selected.has(c.conversationId)
          ? { ...c, muted: true }
          : c
      )
    );
    clearSelection();
  };

  const deleteSelected = () => {
    setConversations((prev) => {
      const removed = prev.filter((c) =>
        selected.has(c.conversationId)
      );

      setUndoData(removed);

      setTimeout(() => {
        setUndoData(null);
      }, 4000);

      return prev.filter(
        (c) => !selected.has(c.conversationId)
      );
    });

    clearSelection();
  };

  const undoDelete = () => {
    if (!undoData) return;

    setConversations((prev) => [
      ...undoData,
      ...prev,
    ]);

    setUndoData(null);
  };

  const clearAllUnread = () => {
    setConversations((prev) =>
      prev.map((c) => ({ ...c, unread: false }))
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="messages-page">
      {/* Header */}
      <div className="messages-header">
        <h1 className="messages-title">Messages</h1>
        <button className="messages-compose-btn">
          <PenSquare size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="messages-search">
        <input placeholder="Search messages" />
      </div>

      {/* Filters */}
      <div className="messages-filter">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All · <span className="filter-count">{totalCount}</span>
        </button>

        <button
          className={filter === "unread" ? "active" : ""}
          onClick={() => setFilter("unread")}
        >
          Unread · <span className="filter-count">{unreadCount}</span>
        </button>

        <button
          className={filter === "muted" ? "active" : ""}
          onClick={() => setFilter("muted")}
        >
          Muted · <span className="filter-count">{mutedCount}</span>
        </button>
      </div>

      {unreadCount > 0 && (
        <button className="clear-unread-btn" onClick={clearAllUnread}>
          Clear all unread
        </button>
      )}

      {selected.size > 0 && (
        <div className="batch-bar">
          <span>{selected.size} selected</span>
          <div className="batch-actions">
            <button onClick={selectAllFiltered}>Select all</button>
            <button onClick={markSelectedRead}>Mark as read</button>
            <button onClick={muteSelected}>Mute</button>
            <button className="danger" onClick={deleteSelected}>
              Delete
            </button>
            <button onClick={clearSelection}>Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      <div
        className="messages-list"
        ref={listRef}
        onScroll={() => {
          const key = `messages-scroll-${filter}`;
          if (listRef.current) {
            sessionStorage.setItem(
              key,
              String(listRef.current.scrollTop)
            );
          }
        }}
      >
        {filtered.map((c, index) => (
          <MessageItem
            key={c.conversationId}
            {...c}
            index={index}
            filter={filter}
            isActive={pathname === `/messages/${c.conversationId}`}
            selectedIds={selected}
            onToggleSelect={toggleSelect}
          />
        ))}
      </div>

      {/* Undo snackbar */}
      {undoData && (
        <div className="undo-snackbar">
          <span>Conversation deleted</span>
          <button onClick={undoDelete}>Undo</button>
        </div>
      )}
    </div>
  );
}

/* ================= MESSAGE ITEM ================= */

function MessageItem({
  conversationId,
  name,
  message,
  time,
  unread,
  typing,
  muted,
  isActive,
  filter,
  index,
  selectedIds,
  onToggleSelect,
}: {
  conversationId: string;
  name: string;
  message: string;
  time: string;
  unread?: boolean;
  typing?: boolean;
  muted?: boolean;
  isActive: boolean;
  filter: "all" | "unread" | "muted";
  index: number;
  selectedIds: Set<string>;
  onToggleSelect: (
    id: string,
    index: number,
    shiftKey: boolean
  ) => void;
}) {
  return (
    <div
      className={`message-item
        ${isActive ? "active" : ""}
        ${muted && filter === "all" ? "muted-row" : ""}
        ${selectedIds.has(conversationId) ? "selected" : ""}
      `}
    >
      <input
  type="checkbox"
  className="message-checkbox"
  checked={selectedIds.has(conversationId)}
  onClick={(e) => {
    e.stopPropagation();
    onToggleSelect(
      conversationId,
      index,
      (e as React.MouseEvent).shiftKey
    );
  }}
  readOnly
/>

      <Link
        href={`/messages/${conversationId}`}
        className="message-link"
      >
        <img src="/avatar.jpg" className="message-avatar" />

        <div className="message-content">
          <div className="message-top">
            <span className="message-name">
              {name}
              {muted && (
                <span className="message-muted">
                  <BellOff size={12} /> Muted
                </span>
              )}
            </span>
            <span className="message-time">{time}</span>
          </div>

          <div className="message-bottom">
            <span className={`message-preview ${typing ? "typing" : ""}`}>
              {message}
            </span>

            {unread && !isActive && !muted && (
              <span className="unread-dot" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
