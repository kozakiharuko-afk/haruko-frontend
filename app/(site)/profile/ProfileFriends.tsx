"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserMinus, Lock, Search } from "lucide-react";

type Friend = {
  id: number;
  username: string;
  name: string;
  avatar: string;
};

const MOCK_FRIENDS: Friend[] = [
  { id: 1, username: "yuki", name: "Yuki", avatar: "https://i.pravatar.cc/80?img=11" },
  { id: 2, username: "haru", name: "Haru", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: 3, username: "mika", name: "Mika", avatar: "https://i.pravatar.cc/80?img=13" },
  { id: 4, username: "ren", name: "Ren", avatar: "https://i.pravatar.cc/80?img=14" },
];

export default function ProfileFriends({
  friends = [],
}: {
  friends?: Friend[];
}) {
  const [query, setQuery] = useState("");

  const source = friends.length > 0 ? friends : MOCK_FRIENDS;
  const [items, setItems] = useState<Friend[]>(source);

  const [removingId, setRemovingId] = useState<number | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: number;
    type: "unfriend" | "block";
  } | null>(null);

  // ✅ keep items in sync with source
  useEffect(() => {
    setItems(source);
  }, [source]);

  // ✅ FILTER ONCE
  const filtered = items.filter((f) =>
    f.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function removeFriend(id: number, type: "unfriend" | "block") {
    setRemovingId(id);

    setTimeout(() => {
      setItems((prev) => prev.filter((f) => f.id !== id));
      setRemovingId(null);
    }, 180);
  }

  return (
    <div className="profile-panel">
      {/* SEARCH */}
      <div className="profile-search">
        <Search className="icon" size={18} />
        <input
          placeholder="Search friends..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="profile-user-list">
        {filtered.length === 0 ? (
          <p className="muted">No friends found.</p>
        ) : (
          filtered.map((friend) => (
            <div
              key={friend.id}
              className={`profile-user-row ${
                removingId === friend.id ? "removing" : ""
              }`}
            >
              <Link
                href={`/u/${friend.username}`}
                className="profile-user-info"
              >
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="profile-user-avatar"
                />
                <span className="profile-user-name">
                  {friend.name}
                </span>
              </Link>

              <div className="profile-user-actions">
                <button
                  className="profile-user-icon"
                  title="Unfriend"
                  onClick={() =>
                    setConfirmAction({ id: friend.id, type: "unfriend" })
                  }
                >
                  <UserMinus size={18} />
                </button>

                <button
                  className="profile-user-icon danger"
                  title="Block"
                  onClick={() =>
                    setConfirmAction({ id: friend.id, type: "block" })
                  }
                >
                  <Lock size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CONFIRM MODAL */}
      {confirmAction && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>
              {confirmAction.type === "block"
                ? "Block this user?"
                : "Remove friend?"}
            </h3>

            <p>
              {confirmAction.type === "block"
                ? "They will be removed and blocked."
                : "They will be removed from your friends list."}
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </button>

              <button
                className={`modal-confirm ${
                  confirmAction.type === "block" ? "danger" : ""
                }`}
                onClick={() => {
                  removeFriend(confirmAction.id, confirmAction.type);
                  setConfirmAction(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
