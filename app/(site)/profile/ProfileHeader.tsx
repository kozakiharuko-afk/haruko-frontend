"use client";

import { FC } from "react";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

type ProfileHeaderProps = {
  username: string;
  avatarUrl?: string;
  roles?: string[];
  lastActive?: string | null;
  memberViews: number;
  isOwner: boolean;
};

const ProfileHeader: FC<ProfileHeaderProps> = ({
  username,
  avatarUrl,
  roles,
  lastActive,
  memberViews,
  isOwner,
}) => {
  const safeRoles = Array.isArray(roles) ? roles : [];
  const router = useRouter();

  return (
    <section className="profile-header">
      <div className="profile-avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${username}'s avatar`} />
        ) : (
          <span className="avatar-fallback">?</span>
        )}
      </div>

      <div className="profile-identity">
        {/* NAME + BADGES */}
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

        {/* META */}
        <div className="profile-meta">
          {lastActive ? (
            <span>Last active: {lastActive}</span>
          ) : (
            <span className="private-meta">
              <Lock size={14} />
              <span>Last active hidden</span>
            </span>
          )}

          <span>Member views: {memberViews}</span>
        </div>

        {/* ACTIONS */}
        {!isOwner && (
          <div className="profile-actions">
            {/* Row 1 */}
            <div className="profile-actions-inline">
              <button className="capsule primary">Follow</button>
              <button className="capsule secondary">Add Friend</button>
              <button className="capsule danger">Block</button>
            </div>

            {/* Row 2 */}
            <button
  className="capsule message full"
  aria-label="Send message"
  title="Send message"
  onClick={() => router.push("/messages")}
>
  <Mail size={18} />
</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;
