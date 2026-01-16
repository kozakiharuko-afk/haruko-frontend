"use client";

import { useState } from "react";
import {
  Zap,
  Users,
  UserPlus,
  UserCheck,
  Lock,
} from "lucide-react";

import ProfileLayout from "../../profile/ProfileLayout";
import ProfileLocked from "../../profile/ProfileLocked";
import ProfileStatus from "../../profile/ProfileStatus";
import ProfileFollowers from "../../profile/ProfileFollowers";
import ProfileFollowings from "../../profile/ProfileFollowings";
import ProfileFriends from "../../profile/ProfileFriends";

type Tab =
  | "status"
  | "followers"
  | "followings"
  | "friends";

type PageProps = {
  params: {
    username: string;
  };
};

export default function PublicUserProfilePage({ params }: PageProps) {
  const [active, setActive] = useState<Tab>("status");

  // PUBLIC PROFILE → ALWAYS NOT OWNER
  const isOwner = false;

  const { username } = params;

// ================= PRIVACY (MOCK) =================
const privacy = {
  followers: "private",   // "public" | "private"
  followings: "public",
  friends: "private",
};

  // ================= MOCK DATA =================
  const followers = [
    { id: 1, username: "akari", name: "Akari", avatar: "https://i.pravatar.cc/80?img=1" },
    { id: 2, username: "ren", name: "Ren", avatar: "https://i.pravatar.cc/80?img=2" },
  ];

  const followings = [
    { id: 3, username: "haru", name: "Haru", avatar: "https://i.pravatar.cc/80?img=3" },
  ];

  const friends = [
    { id: 4, username: "yuki", name: "Yuki", avatar: "https://i.pravatar.cc/80?img=4" },
  ];

  return (
    <ProfileLayout
      mode="public"
      username={username}
      avatarUrl="/avatar.png"
      roles={["VIP"]}
      lastActive="Just now"   // later: null if private
      memberViews={123}
    >
      {/* ================= MENU ================= */}
      <div className="profile-menu">
  <button
    className={active === "status" ? "active" : ""}
    onClick={() => setActive("status")}
  >
    <Zap size={18} /> Status
  </button>

  <button
  className={active === "followers" ? "active" : ""}
  onClick={() => setActive("followers")}
>
  <Users size={18} /> Followers

  {privacy.followers === "private" && (
    <Lock size={14} className="menu-lock" />
  )}
</button>

  <button
  className={active === "followings" ? "active" : ""}
  onClick={() => setActive("followings")}
>
  <UserPlus size={18} /> Followings

  {privacy.followings === "private" && (
    <Lock size={14} className="menu-lock" />
  )}
</button>

  <button
  className={active === "friends" ? "active" : ""}
  onClick={() => setActive("friends")}
>
  <UserCheck size={18} /> Friends

  {privacy.friends === "private" && (
    <Lock size={14} className="menu-lock" />
  )}
</button>
</div>

      {/* ================= CONTENT ================= */}
      <div className="profile-content">
        {active === "status" && (
          <ProfileStatus
            status="Hello! This is my status 👋"
            statusImage={null}
            isOwner={isOwner}
          />
        )}

        {active === "followers" && (
  privacy.followers === "public" ? (
    <ProfileFollowers followers={followers} />
  ) : (
    <ProfileLocked message="Only this user can see their followers." />
  )
)}

        {active === "followings" && (
  privacy.followings === "public" ? (
    <ProfileFollowings followings={followings} />
  ) : (
    <ProfileLocked message="Only this user can see their followings." />
  )
)}

        {active === "friends" && (
  privacy.friends === "public" ? (
    <ProfileFriends friends={friends} />
  ) : (
    <ProfileLocked message="Only this user can see their friends." />
  )
)}
      </div>
    </ProfileLayout>
  );
}
