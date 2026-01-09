export default function ProfilePage() {
  return (
    <main className="page">
      <h1>Your Profile</h1>

      <div className="profile-card">
        <div className="avatar large">👤</div>

        <h2>Haruko</h2>
        <p className="muted">Joined January 2026</p>

        <div className="profile-stats">
          <span>📚 Following: 12</span>
          <span>💬 Comments: 84</span>
          <span>❤️ Likes: 230</span>
        </div>
      </div>
    </main>
  );
}
