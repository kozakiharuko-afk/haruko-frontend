"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X, MoreVertical } from "lucide-react";

type PreviewFile = {
  file: File;
  url?: string;
};

export default function ConversationPage() {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<PreviewFile[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // TEMP UI-only status
  const isOnline = true;

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    setMessage("");
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      file,
      url: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const next = [...prev];
      const removed = next.splice(index, 1)[0];
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return next;
    });
  };

  return (
    <div className="chat-page">
      {/* ================= HEADER ================= */}
      <div className="chat-header">
        <div className="chat-user">
          <img src="/avatar.jpg" className="chat-avatar" />

          <div className="chat-user-meta">
            <p className="chat-name">Brooklyn Simmons</p>

            <div className="chat-status-row">
              <span
                className={`status-dot ${
                  isOnline ? "online" : "offline"
                }`}
              />
              <span className="chat-status">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* 3-dot menu */}
        <div className="chat-menu" ref={menuRef}>
          <button
            className="chat-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Conversation options"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="chat-menu-dropdown">
              <button className="chat-menu-item">
                Report
              </button>
              <button className="chat-menu-item">
                Mute
              </button>
              <button className="chat-menu-item">
                Block user
              </button>
              <button className="chat-menu-item danger">
                Delete conversation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= MESSAGES ================= */}
      <div className="chat-messages">
        <div className="chat-date">Today</div>

        <div className="chat-message">
          Hi! Just wanted to check in 😊
        </div>

        <div className="chat-message mine">
          Hey! Sure, what’s up?
        </div>
      </div>

      {/* ================= ATTACHMENT PREVIEWS ================= */}
      {attachments.length > 0 && (
        <div className="chat-attachments">
          {attachments.map((item, i) => (
            <div className="chat-attachment" key={i}>
              {item.url ? (
                <img src={item.url} />
              ) : (
                <div className="chat-file">
                  {item.file.name}
                </div>
              )}

              <button
                className="chat-attachment-remove"
                onClick={() => removeAttachment(i)}
                type="button"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= INPUT ================= */}
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <label className="chat-attach-btn">
          <Paperclip size={16} />
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        <textarea
          className="chat-textarea"
          placeholder="Type a message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <button type="submit" className="chat-send-btn">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
