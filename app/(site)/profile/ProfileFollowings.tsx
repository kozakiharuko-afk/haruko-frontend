import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

type User = {
  id: number;
  username: string;
  name: string;
  avatar: string;
};

export default function ProfileFollowings({
  followings,
}: {
  followings: User[];
}) {
  const [query, setQuery] = useState("");

  const filtered = followings.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="profile-panel">
      {/* SEARCH */}
      <div className="profile-search">
        <Search className="icon" size={14} />
        <input
          placeholder="Search followings..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

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

            <button className="profile-user-action">
              Following
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
