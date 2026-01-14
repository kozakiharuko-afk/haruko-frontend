export default function ConversationPage() {
  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        Chat
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="message theirs">Hello 👋</div>
        <div className="message mine">Hi!</div>
      </div>

      {/* Input */}
      <div className="chat-input">
        <input placeholder="Type a message..." />
      </div>
    </div>
  );
}
