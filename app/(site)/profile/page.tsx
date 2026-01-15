"use client";

import { useState } from "react";
import {
  Zap,
  Users,
  UserPlus,
  UserCheck,
  Clock,
  UserX,
  Shield,
} from "lucide-react";

import ProfileHeader from "./ProfileHeader";
import ProfileStatus from "./ProfileStatus";
import ProfileFollowers from "./ProfileFollowers";
import ProfileFollowings from "./ProfileFollowings";
import ProfileFriends from "./ProfileFriends";
import ProfileRequests from "./ProfileRequests";
import ProfileBlocked from "./ProfileBlocked";
import ProfilePrivacy from "./ProfilePrivacy";

type Tab =
  | "status"
  | "followers"
  | "followings"
  | "friends"
  | "requests"
  | "blocked"
  | "privacy";

export default function ProfilePage() {
  const [active, setActive] = useState<Tab>("status");

  const [status, setStatus] = useState("");
  const [statusImage, setStatusImage] = useState<string | null>(null);

  const isOwner = true;

  // ================= MOCK DATA =================

  const followers = [
    { id: 1, username: "akari", name: "Akari", avatar: "https://i.pravatar.cc/80?img=1" },
    { id: 2, username: "ren", name: "Ren", avatar: "https://i.pravatar.cc/80?img=2" },
    { id: 3, username: "mika", name: "Mika", avatar: "https://i.pravatar.cc/80?img=3" },
  ];

  const followings = [
    { id: 4, username: "haru", name: "Haru", avatar: "https://i.pravatar.cc/80?img=4" },
    { id: 5, username: "sora", name: "Sora", avatar: "https://i.pravatar.cc/80?img=5" },
  ];

  const friends = [
    { id: 6, username: "yuki", name: "Yuki", avatar: "https://i.pravatar.cc/80?img=6" },
  ];

  const requests = [
    { id: 7, username: "emi", name: "Emi", avatar: "https://i.pravatar.cc/80?img=7" },
    { id: 8, username: "leo", name: "Leo", avatar: "https://i.pravatar.cc/80?img=8" },
  ];

  const blocked = [
    { id: 9, username: "taro", name: "Taro", avatar: "https://i.pravatar.cc/80?img=9" },
  ];

  // ================= RENDER =================

  return (
    <div className="profile-page">
      <ProfileHeader
        username="south"
        avatarUrl="/avatar.png"
        roles={["VIP"]}
        lastActive="Just now"
        memberViews={123}
      />

      {/* ================= MENU ================= */}
      <div className="profile-menu">
        <button className={active === "status" ? "active" : ""} onClick={() => setActive("status")}>
          <Zap size={18} /> Status
        </button>

        <button className={active === "followers" ? "active" : ""} onClick={() => setActive("followers")}>
          <Users size={18} /> Followers
          <span className="profile-badge-count">{followers.length}</span>
        </button>

        <button className={active === "followings" ? "active" : ""} onClick={() => setActive("followings")}>
          <UserPlus size={18} /> Followings
          <span className="profile-badge-count">{followings.length}</span>
        </button>

        <button className={active === "friends" ? "active" : ""} onClick={() => setActive("friends")}>
          <UserCheck size={18} /> Friends
          <span className="profile-badge-count">{friends.length}</span>
        </button>

        <button className={active === "requests" ? "active" : ""} onClick={() => setActive("requests")}>
          <Clock size={18} /> Friend Requests
          <span className="profile-badge-count">{requests.length}</span>
        </button>

        <button className={active === "blocked" ? "active" : ""} onClick={() => setActive("blocked")}>
          <UserX size={18} /> Blocked Users
          <span className="profile-badge-count">{blocked.length}</span>
        </button>

        <button className={active === "privacy" ? "active" : ""} onClick={() => setActive("privacy")}>
          <Shield size={18} /> Privacy
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="profile-content">
        {active === "status" && (
          <ProfileStatus
            status={status}
            setStatus={setStatus}
            statusImage={statusImage}
            setStatusImage={setStatusImage}
            isOwner={isOwner}
          />
        )}

        {active === "followers" && <ProfileFollowers followers={followers} />}
        {active === "followings" && <ProfileFollowings followings={followings} />}
        {active === "friends" && <ProfileFriends />}
        {active === "requests" && <ProfileRequests />}
        {active === "blocked" && <ProfileBlocked />}
        {active === "privacy" && <ProfilePrivacy />}
      </div>
    </div>
  );
}
