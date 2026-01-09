"use client";

import { Comment } from "./comments";

type Props = {
  comment: Comment;
  onEdit: () => void;
  onDelete: () => void;
  onLike: () => void;
  onDislike: () => void;
};

export default function CommentActions({
  comment,
  onEdit,
  onDelete,
  onLike,
  onDislike,
}: Props) {
  return (
    <div className="comment-actions">
      <button onClick={onLike}>👍 {comment.likes}</button>
      <button onClick={onDislike}>👎 {comment.dislikes}</button>

      {comment.isMine && (
        <>
          <button onClick={onEdit}>✏️ Edit</button>
          <button onClick={onDelete}>🗑 Delete</button>
        </>
      )}
    </div>
  );
}
