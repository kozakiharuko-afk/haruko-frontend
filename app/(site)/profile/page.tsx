"use client";

import { useAuth } from "../../AuthProvider";

export default function ProfilePage() {
  const { session } = useAuth();

  const username =
    session?.user?.user_metadata?.username ??
    session?.user?.user_metadata?.full_name ??
    session?.user?.email?.split("@")[0] ??
    "user";

  const avatarUrl = session?.user?.user_metadata?.avatar_url;

  const joined = session?.user?.created_at
    ? new Date(session.user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="page">
      <h1>Your Profile</h1>

      <div className="profile-card">
        <div className="avatar large">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="avatar-img"
            />
          ) : (
            <span className="avatar-fallback">?</span>
          )}
        </div>

        <h2>@{username}</h2>
        {joined && (
          <p className="muted">Joined {joined}</p>
        )}

        <div className="profile-stats">
          <span>📚 Following: —</span>
          <span>💬 Comments: —</span>
          <span>❤️ Likes: —</span>
        </div>
      </div>
    </main>
  );
}
