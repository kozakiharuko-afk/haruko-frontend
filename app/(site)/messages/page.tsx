import Link from "next/link";

export default function MessagesPage() {
  return (
    <div className="messages-empty">
      <div className="messages-empty-content">
        <p className="messages-empty-text">
          Select a conversation to start chatting
        </p>

        <div className="messages-empty-actions">
          <button className="messages-empty-btn primary">
            New conversation
          </button>

          <button className="messages-empty-btn">
            Write a message
          </button>
        </div>
      </div>
    </div>
  );
}
