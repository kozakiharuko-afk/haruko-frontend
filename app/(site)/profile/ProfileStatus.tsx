"use client";

import { useState } from "react";
import { Pencil, Smile, Image as ImageIcon, X } from "lucide-react";

type Props = {
  status: string;
  setStatus: (v: string) => void;
  statusImage?: string | null;
  setStatusImage?: (v: string | null) => void;
  isOwner: boolean;
};

export default function ProfileStatus({
  status,
  setStatus,
  statusImage,
  setStatusImage,
  isOwner,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(status);
  const [preview, setPreview] = useState<string | null>(statusImage ?? null);

  return (
    <div className="profile-panel">
      {!editing ? (
        <div className="profile-status">
          <div className="profile-status-content">
            {status ? (
              <p className="profile-status-text">{status}</p>
            ) : (
              <p className="muted">No bio yet.</p>
            )}

            {statusImage && (
              <img src={statusImage} className="profile-status-image" />
            )}
          </div>

          {isOwner && (
            <button className="profile-status-edit" onClick={() => setEditing(true)}>
              <Pencil size={16} />
            </button>
          )}
        </div>
      ) : (
        <div className="profile-status-editor">
          <textarea
            className="profile-status-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write your bio…"
            autoFocus
          />

          {preview && (
            <div className="status-image-preview">
              <img src={preview} />
              <button
                className="remove-image"
                onClick={() => {
                  setPreview(null);
                  setStatusImage?.(null);
                }}
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="profile-status-actions">
            <button className="icon-btn" type="button">
              <Smile size={16} />
            </button>

            <label className="icon-btn">
              <ImageIcon size={16} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setPreview(url);
                  setStatusImage?.(url);
                }}
              />
            </label>

            <button
              className="status-save"
              onClick={() => {
                setStatus(draft.trim());
                setEditing(false);
              }}
            >
              Save
            </button>

            <button
              className="status-cancel"
              onClick={() => {
                setDraft(status);
                setPreview(statusImage ?? null);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
