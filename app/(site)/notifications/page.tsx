export default function NotificationsPage() {
  return (
    <main className="page">
      <h1>Notifications</h1>

      <ul className="notification-list">
        <li>
          <strong>New chapter released</strong>
          <p>Midnight Bloom — Chapter 25</p>
        </li>

        <li>
          <strong>New reply</strong>
          <p>Someone replied to your comment</p>
        </li>

        <li>
          <strong>Update</strong>
          <p>Crimson Ashes added a new chapter</p>
        </li>
      </ul>
    </main>
  );
}
