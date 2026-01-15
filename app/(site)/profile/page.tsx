"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../AuthProvider";
import {
  Activity,
  Users,
  UserPlus,
  UserCheck,
  Clock,
  UserX,
  Shield,
  Pencil,
} from "lucide-react";

type Tab =
  | "status"
  | "followers"
  | "followings"
  | "friends"
  | "requests"
  | "blocked"
  | "privacy";

type Visibility = "public" | "friends";

export default function ProfilePage() {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("status");

  const username =
    session?.user?.user_metadata?.username ??
    session?.user?.user_metadata?.full_name ??
    session?.user?.email?.split("@")[0] ??
    "user";

  const avatarUrl = session?.user?.user_metadata?.avatar_url;

  const roles: Array<"MOD" | "VIP"> =
    session?.user?.user_metadata?.roles ?? [];

  const lastActive = "11 days ago";
  const memberViews = 1001;

  const isOwner = true;
  const isFriend = true;

  /* ================= COUNTS (MOCK) ================= */

  const followerCount = 12;
  const followingCount = 5;
  const friendRequestCount = 2;
  const blockedCount = 1;

  /* ================= FOLLOW LIST SEARCH ================= */

  const [followersSearch, setFollowersSearch] = useState("");
  const [followingsSearch, setFollowingsSearch] = useState("");

  const followers = [
    { id: 1, username: "akari", name: "Akari", avatar: "/avatar/1.png" },
    { id: 2, username: "ren", name: "Ren", avatar: "/avatar/2.png" },
  ];

  const followings = [
    { id: 3, username: "sora", name: "Sora", avatar: "/avatar/3.png" },
    { id: 4, username: "mika", name: "Mika", avatar: "/avatar/4.png" },
  ];

  const filteredFollowers = followers.filter(user =>
    user.name.toLowerCase().includes(followersSearch.toLowerCase()) ||
    user.username.toLowerCase().includes(followersSearch.toLowerCase())
  );

  const filteredFollowings = followings.filter(user =>
    user.name.toLowerCase().includes(followingsSearch.toLowerCase()) ||
    user.username.toLowerCase().includes(followingsSearch.toLowerCase())
  );

  /* ================= STATUS ================= */

  const [status, setStatus] = useState("");
  const [draftStatus, setDraftStatus] = useState("");
  const [editingStatus, setEditingStatus] = useState(false);
  const [visibility] = useState<Visibility>("public");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const startEditStatus = () => {
    setDraftStatus(status);
    setEditingStatus(true);
  };

  const saveStatus = () => {
    setStatus(draftStatus.trim());
    setLastUpdated(new Date());
    setEditingStatus(false);
  };

  const canViewStatus =
    visibility === "public" || isOwner || isFriend;

  /* ================= BADGE ================= */

  const Badge = ({ count }: { count: number }) =>
    count > 0 ? (
      <span className="profile-badge-count">{count}</span>
    ) : null;

  return (
    <main className="profile-page">
      {/* ================= PROFILE HEADER ================= */}
      <section className="profile-header">
        <div className="profile-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" />
          ) : (
            <span className="avatar-fallback">?</span>
          )}
        </div>

        <div className="profile-identity">
          <div className="profile-name-row">
            <h1>@{username}</h1>

            <div className="profile-badges">
              {roles.includes("MOD") && (
                <span className="role-badge mod">MOD</span>
              )}
              {roles.includes("VIP") && (
                <span className="role-badge vip">VIP</span>
              )}
            </div>
          </div>

          <div className="profile-meta">
            <span>Last active: {lastActive}</span>
            <span>Member views: {memberViews}</span>
          </div>
        </div>
      </section>

      {/* ================= PROFILE MENU ================= */}
      <nav className="profile-menu">
        <button
          className={activeTab === "status" ? "active" : ""}
          onClick={() => setActiveTab("status")}
        >
          <Activity size={16} /> Status
        </button>

        <button
          className={activeTab === "followers" ? "active" : ""}
          onClick={() => setActiveTab("followers")}
        >
          <Users size={16} /> Followers
          <Badge count={followerCount} />
        </button>

        <button
          className={activeTab === "followings" ? "active" : ""}
          onClick={() => setActiveTab("followings")}
        >
          <UserCheck size={16} /> Followings
          <Badge count={followingCount} />
        </button>

        <button
          className={activeTab === "friends" ? "active" : ""}
          onClick={() => setActiveTab("friends")}
        >
          <UserPlus size={16} /> Friends
        </button>

        {isOwner && (
          <>
            <button
              className={activeTab === "requests" ? "active" : ""}
              onClick={() => setActiveTab("requests")}
            >
              <Clock size={16} /> Friend Requests
              <Badge count={friendRequestCount} />
            </button>

            <button
              className={activeTab === "blocked" ? "active" : ""}
              onClick={() => setActiveTab("blocked")}
            >
              <UserX size={16} /> Blocked Users
              <Badge count={blockedCount} />
            </button>

            <button
              className={activeTab === "privacy" ? "active" : ""}
              onClick={() => setActiveTab("privacy")}
            >
              <Shield size={16} /> Privacy Settings
            </button>
          </>
        )}
      </nav>

      {/* ================= PROFILE CONTENT ================= */}
      <section className="profile-content">
        {/* STATUS */}
        {activeTab === "status" && (
          <div className="profile-panel">
            {canViewStatus && (
              <div
                className={`profile-status ${
                  isOwner ? "editable" : ""
                }`}
                onClick={() => isOwner && startEditStatus()}
              >
                <span>
                  {status || (
                    <span className="muted">
                      No status set.
                    </span>
                  )}
                </span>

                {isOwner && (
                  <button
                    className="profile-status-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditStatus();
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                )}
              </div>
            )}

            {lastUpdated && (
              <div className="status-timestamp">
                Last updated · {lastUpdated.toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* FOLLOWERS */}
        {activeTab === "followers" && (
          <div className="profile-panel">
            <input
              className="profile-user-search"
              placeholder="Search followers…"
              value={followersSearch}
              onChange={(e) => setFollowersSearch(e.target.value)}
            />

            {followers.length === 0 && (
              <div className="profile-empty">
                You don’t have any followers yet.
              </div>
            )}

            {followers.length > 0 &&
              filteredFollowers.length === 0 && (
                <div className="profile-empty">
                  No users match your search.
                </div>
              )}

            <div className="profile-user-list">
              {filteredFollowers.map(user => (
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
        )}

        {/* FOLLOWINGS */}
        {activeTab === "followings" && (
          <div className="profile-panel">
            <input
              className="profile-user-search"
              placeholder="Search followings…"
              value={followingsSearch}
              onChange={(e) =>
                setFollowingsSearch(e.target.value)
              }
            />

            {followings.length === 0 && (
              <div className="profile-empty">
                You’re not following anyone yet.
              </div>
            )}

            {followings.length > 0 &&
              filteredFollowings.length === 0 && (
                <div className="profile-empty">
                  No users match your search.
                </div>
              )}

            <div className="profile-user-list">
              {filteredFollowings.map(user => (
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
        )}

        {activeTab === "friends" && (
          <div className="profile-panel">
            <p className="muted">No friends yet.</p>
          </div>
        )}

        {activeTab === "requests" && isOwner && (
          <div className="profile-panel">
            <p className="muted">
              {friendRequestCount} pending requests
            </p>
          </div>
        )}

        {activeTab === "blocked" && isOwner && (
          <div className="profile-panel">
            <p className="muted">
              {blockedCount} blocked users
            </p>
          </div>
        )}

        {activeTab === "privacy" && isOwner && (
          <div className="profile-panel">
            <p className="muted">
              Privacy settings will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
