"use client";

import { useState } from "react";
import Link from "next/link";
import { Unlock, Search } from "lucide-react";

type BlockedUser = {
  id: number;
  username: string;
  name: string;
  avatar: string;
};

const MOCK_BLOCKED: BlockedUser[] = [
  {
    id: 1,
    username: "taro",
    name: "Taro",
    avatar: "https://i.pravatar.cc/80?img=21",
  },
  {
    id: 2,
    username: "kai",
    name: "Kai",
    avatar: "https://i.pravatar.cc/80?img=22",
  },
];

export default function ProfileBlocked() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<BlockedUser[]>(MOCK_BLOCKED);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [confirmUnblockId, setConfirmUnblockId] = useState<number | null>(null);

  const filtered = items.filter((u) =>
    u.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function unblock(id: number) {
    setRemovingId(id);

    setTimeout(() => {
      setItems((prev) => prev.filter((u) => u.id !== id));
      setRemovingId(null);
    }, 180);
  }

  return (
    <div className="profile-panel">
      {/* SEARCH */}
      <div className="profile-search">
        <Search className="icon" size={18} />
        <input
          placeholder="Search blocked users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="profile-user-list">
        {filtered.length === 0 ? (
          <p className="muted">You haven't blocked anyone.</p>
        ) : (
          filtered.map((user) => (
            <div
              key={user.id}
              className={`profile-user-row ${
                removingId === user.id ? "removing" : ""
              }`}
            >
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

              <div className="profile-user-actions">
                {/* UNBLOCK */}
                <button
  className="request-action warn"
  title="Unblock user"
  onClick={() => setConfirmUnblockId(user.id)}
>
  <Unlock size={18} />
</button>
              </div>
            </div>
          ))
        )}

        {confirmUnblockId !== null && (
  <div className="modal-backdrop">
    <div className="modal">
      <h3>Unblock this user?</h3>

      <p>
        They will be able to view your profile and interact with you again.
      </p>

      <div className="modal-actions">
        <button
          className="modal-cancel"
          onClick={() => setConfirmUnblockId(null)}
        >
          Cancel
        </button>

        <button
          className="modal-confirm"
          onClick={() => {
            unblock(confirmUnblockId);
            setConfirmUnblockId(null);
          }}
        >
          Unblock
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
