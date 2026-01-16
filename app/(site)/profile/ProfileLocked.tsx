"use client";

type ProfileLockedProps = {
  message: string;
};

export default function ProfileLocked({ message }: ProfileLockedProps) {
  return (
    <div className="profile-locked">
      <p className="profile-locked-message">
        {message}
      </p>
    </div>
  );
}
