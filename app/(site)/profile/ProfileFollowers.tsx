import Link from "next/link";
import { useState } from "react";

type User = {
  id: number;
  username: string;
  name: string;
  avatar: string;
};

export default function ProfileFollowers({
  followers,
}: {
  followers: User[];
}) {
  const [query, setQuery] = useState("");

  const filtered = followers.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="profile-panel">
      {/* SEARCH */}
      <input
        className="profile-user-search"
        placeholder="Search followers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* LIST */}
      <div className="profile-user-list">
        {filtered.map((user) => (
          <div key={user.id} className="profile-user-row">
            <Link
              href={`/u/${user.username}`}
              className="profile-user-info"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="profile-user-avatar"
              />
              <span className="profile-user-name">
                {user.name}
              </span>
            </Link>

            <button className="profile-user-action danger">
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
