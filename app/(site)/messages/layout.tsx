import MessagesInbox from "./MessagesInbox";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="messages-layout">
      {/* LEFT: Inbox */}
      <aside className="messages-sidebar">
        <MessagesInbox />
      </aside>

      {/* RIGHT: Chat */}
      <main className="messages-chat">
        {children}
      </main>
    </div>
  );
}
