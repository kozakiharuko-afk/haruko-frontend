"use client";

import ProfileHeader from "./ProfileHeader";

type ProfileLayoutProps = {
  children: React.ReactNode;
  username: string;
  avatarUrl?: string;
  roles?: string[];
  lastActive?: string | null;
  memberViews: number;
  mode: "owner" | "public";
};

export default function ProfileLayout({
  children,
  username,
  avatarUrl,
  roles,
  lastActive,
  memberViews,
  mode,
}: ProfileLayoutProps) {
  return (
    <div className="profile-page">
      <ProfileHeader
        username={username}
        avatarUrl={avatarUrl}
        roles={roles}
        lastActive={lastActive}
        memberViews={memberViews}
        isOwner={mode === "owner"}
      />

      {/* ✅ Pages control menus */}
      {children}
    </div>
  );
}
