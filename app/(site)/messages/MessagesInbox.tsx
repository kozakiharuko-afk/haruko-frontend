import { PenSquare } from "lucide-react";

export default function MessagesInbox() {
  return (
    <div className="messages-page">
      {/* Header */}
      <div className="messages-header">
        <h1 className="messages-title">Messages</h1>

        <button
          className="messages-compose-btn"
          title="Start a new conversation"
        >
          <PenSquare size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="messages-search">
        <input placeholder="Search messages" />
      </div>

      {/* List */}
      <div className="messages-list">
        <MessageItem
          name="Brooklyn Simmons"
          message="typing..."
          time="3 min ago"
          typing
        />
        <MessageItem
          name="Ronald Richards"
          message="I wanted to let you know that..."
          time="2 min ago"
          unread
        />
        <MessageItem
          name="Kristin Watson"
          message="thank you for the reminder!"
          time="1 min ago"
        />
      </div>
    </div>
  );
}

/* TEMP inline component (unchanged) */
function MessageItem({
  name,
  message,
  time,
  unread,
  typing,
}: {
  name: string;
  message: string;
  time: string;
  unread?: boolean;
  typing?: boolean;
}) {
  return (
    <div className="message-item">
      <img
        src="/avatar.jpg"
        alt=""
        className="message-avatar"
      />

      <div className="message-content">
        <div className="message-top">
          <span className="message-name">{name}</span>
          <span className="message-time">{time}</span>
        </div>

        <div className="message-bottom">
          <span
            className={`message-preview ${typing ? "typing" : ""}`}
          >
            {message}
          </span>

          {unread && <span className="unread-dot" />}
        </div>
      </div>
    </div>
  );
}
