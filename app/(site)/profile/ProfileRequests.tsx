"use client";

import { useState } from "react";
import Link from "next/link";
import { UserCheck, UserX, Search } from "lucide-react";

type Request = {
  id: number;
  username: string;
  name: string;
  avatar: string;
};

const MOCK_REQUESTS: Request[] = [
  { id: 1, username: "yuki", name: "Yuki", avatar: "https://i.pravatar.cc/80?img=11" },
  { id: 2, username: "haru", name: "Haru", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: 3, username: "mika", name: "Mika", avatar: "https://i.pravatar.cc/80?img=13" },
];

export default function ProfileRequests({
  requests,
  setRequests,
}: {
  requests: Request[];
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
}) {

  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Request[]>(requests);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [acceptingId, setAcceptingId] = useState<number | null>(null);

  const filtered = items.filter((r) =>
    r.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  /* ================= ACTIONS ================= */

  function accept(id: number) {
    setAcceptingId(id);
    setRemovingId(id);

    setTimeout(() => {
      setItems((prev) => prev.filter((r) => r.id !== id));
      setAcceptingId(null);
      setRemovingId(null);
    }, 600);
  }

  function decline(id: number) {
    setRemovingId(id);

    setTimeout(() => {
      setItems((prev) => prev.filter((r) => r.id !== id));
      setRemovingId(null);
    }, 180);
  }

  /* ================= RENDER ================= */

  return (
    <div className="profile-panel">
      {/* SEARCH */}
      <div className="profile-search">
        <Search className="icon" size={18} />
        <input
          placeholder="Search requests..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="profile-user-list">
        {filtered.length === 0 ? (
          <p className="muted">No friend requests right now.</p>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className={`profile-user-row ${
                removingId === req.id ? "removing" : ""
              }`}
            >
              <Link
                href={`/u/${req.username}`}
                className="profile-user-info"
              >
                <img
                  src={req.avatar}
                  alt={req.name}
                  className="profile-user-avatar"
                />
                <span className="profile-user-name">
                  {req.name}
                </span>
              </Link>

              <div className="profile-user-actions">
                {/* ACCEPT */}
                <button
                  className="request-action accept"
                  disabled={acceptingId === req.id}
                  onClick={() => accept(req.id)}
                >
                  {acceptingId === req.id ? (
                    <span className="spinner" />
                  ) : (
                    <UserCheck size={18} />
                  )}
                </button>

                {/* DECLINE */}
                {acceptingId !== req.id && (
                  <button
                    className="request-action decline"
                    onClick={() => decline(req.id)}
                  >
                    <UserX size={18} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
