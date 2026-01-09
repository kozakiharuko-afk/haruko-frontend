"use client";

import { useState } from "react";
import { Comment } from "./comments";
import CommentActions from "./comment-actions";

export default function CommentItem({
  comment,
}: {
  comment: Comment;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  return (
    <li className="comment-item">
      <strong>{comment.author}</strong>

      {editing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <p>{comment.text}</p>
      )}

      <CommentActions
        comment={comment}
        onLike={() => {}}
        onDislike={() => {}}
        onEdit={() => setEditing(true)}
        onDelete={() => {}}
      />

      {editing && (
        <button
          onClick={() => {
            setEditing(false);
          }}
        >
          Save
        </button>
      )}
    </li>
  );
}
