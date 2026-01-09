"use client";

import { useState } from "react";
import { Comment } from "./comments";

export default function CommentActions({
  comment,
  editing,
  onEditToggle,
  onSave,
}: {
  comment: Comment;
  editing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
}) {
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);

  return (
    <div className="comment-actions">
      <button onClick={() => setLikes((l) => l + 1)}>
        👍 {likes}
      </button>

      <button onClick={() => setDislikes((d) => d + 1)}>
        👎 {dislikes}
      </button>

      <button>💬 Reply</button>

      {comment.isMine && (
        <>
          {editing ? (
            <button onClick={onSave}>💾 Save</button>
          ) : (
            <button onClick={onEditToggle}>✏️ Edit</button>
          )}
          <button className="danger">🗑 Delete</button>
        </>
      )}
    </div>
  );
}
