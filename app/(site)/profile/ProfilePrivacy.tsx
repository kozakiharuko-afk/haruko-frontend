"use client";

import { useState } from "react";
import {
  Clock,
  Activity,
  MessageCircle,
  BookOpen,
  Users,
  UserPlus,
  UserCheck,
  Shield,
  UserX,
  Zap,
  Lock,
} from "lucide-react";

type Visibility = "private" | "friends" | "public";

function VisibilityPill({
  value,
  onChange,
}: {
  value: Visibility;
  onChange: (v: Visibility) => void;
}) {
  return (
    <div className="privacy-pill">
      <button
        className={value === "private" ? "active" : ""}
        onClick={() => onChange("private")}
      >
        Only Me
      </button>
      <button
        className={value === "friends" ? "active" : ""}
        onClick={() => onChange("friends")}
      >
        Friends
      </button>
      <button
        className={value === "public" ? "active" : ""}
        onClick={() => onChange("public")}
      >
        Public
      </button>
    </div>
  );
}

export default function ProfilePrivacy() {
  const [privacy, setPrivacy] = useState({
    lastActive: "friends" as Visibility,
    activity: "friends" as Visibility,
    messages: "friends" as Visibility,
    readingList: "friends" as Visibility,
    followersCount: "public" as Visibility,
    followingCount: "public" as Visibility,
  });

  return (
    <div className="profile-panel profile-privacy">
      <h3 className="privacy-title">Profile Privacy</h3>

      {/* ===== VISIBILITY CONTROLLED ===== */}

      <PrivacyRow
        icon={<Clock />}
        title="Last Active"
        desc="Shows when you were last active"
      >
        <VisibilityPill
          value={privacy.lastActive}
          onChange={(v) =>
            setPrivacy({ ...privacy, lastActive: v })
          }
        />
      </PrivacyRow>

      <PrivacyRow
        icon={<Activity />}
        title="Activity"
        desc="Shows your actions like comments, follows, and library updates"
      >
        <VisibilityPill
          value={privacy.activity}
          onChange={(v) =>
            setPrivacy({ ...privacy, activity: v })
          }
        />
      </PrivacyRow>

      <PrivacyRow
        icon={<MessageCircle />}
        title="Messages"
        desc="Controls who can message you"
      >
        <VisibilityPill
          value={privacy.messages}
          onChange={(v) =>
            setPrivacy({ ...privacy, messages: v })
          }
        />
      </PrivacyRow>

      <PrivacyRow
        icon={<BookOpen />}
        title="Reading List"
        desc="Controls who can see your reading list"
      >
        <VisibilityPill
          value={privacy.readingList}
          onChange={(v) =>
            setPrivacy({ ...privacy, readingList: v })
          }
        />
      </PrivacyRow>

      <PrivacyRow
        icon={<Users />}
        title="Followers Count"
        desc="Displays the number of your followers"
      >
        <VisibilityPill
          value={privacy.followersCount}
          onChange={(v) =>
            setPrivacy({ ...privacy, followersCount: v })
          }
        />
      </PrivacyRow>

      <PrivacyRow
        icon={<UserPlus />}
        title="Following Count"
        desc="Displays how many users you follow"
      >
        <VisibilityPill
          value={privacy.followingCount}
          onChange={(v) =>
            setPrivacy({ ...privacy, followingCount: v })
          }
        />
      </PrivacyRow>

      {/* ===== ALWAYS PUBLIC ===== */}

      <div className="privacy-row static">
        <div className="privacy-left">
          <Zap className="privacy-icon accent" />
          <div>
            <p>Status</p>
            <span className="muted">Your status is always public</span>
          </div>
        </div>
      </div>

      {/* ===== LOCKED / USER ONLY ===== */}

      <LockedRow
        icon={<UserCheck />}
        title="Friend Requests"
        desc="Only visible to you"
      />

      <LockedRow
        icon={<Shield />}
        title="Privacy Settings"
        desc="Privacy controls are always private"
      />

      <LockedRow
        icon={<UserX />}
        title="Blocklist"
        desc="Your blocked users are hidden from others"
      />

      <p className="privacy-saved muted">
        Changes are saved automatically
      </p>
    </div>
  );
}

/* ===== Small helpers (pure UI) ===== */

function PrivacyRow({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="privacy-row">
      <div className="privacy-left">
        <span className="privacy-icon">{icon}</span>
        <div>
          <p>{title}</p>
          <span className="muted">{desc}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function LockedRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="privacy-row locked">
      <div className="privacy-left">
        <span className="privacy-icon">{icon}</span>
        <div>
          <p>{title}</p>
          <span className="muted">{desc}</span>
        </div>
      </div>
      <Lock size={16} />
    </div>
  );
}
