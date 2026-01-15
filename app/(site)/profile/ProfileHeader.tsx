"use client";

import { FC } from "react";

type ProfileHeaderProps = {
  username: string;
  avatarUrl?: string;
  roles?: string[];
  lastActive: string;
  memberViews: number;
};

const ProfileHeader: FC<ProfileHeaderProps> = ({
  username,
  avatarUrl,
  roles,
  lastActive,
  memberViews,
}) => {
  const safeRoles = Array.isArray(roles) ? roles : [];

  return (
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
            {safeRoles.includes("MOD") && (
              <span className="role-badge mod">MOD</span>
            )}
            {safeRoles.includes("VIP") && (
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
  );
};

export default ProfileHeader;
