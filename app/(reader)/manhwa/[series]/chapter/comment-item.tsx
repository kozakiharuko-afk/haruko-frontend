"use client";

import CommentActions from "./comment-actions";
import { Comment } from "./comments";

export default function CommentItem({
  comment,
}: {
  comment: Comment;
}) {
  return (
    <li className="comment-item">
      <strong>{comment.author}</strong>
      <p>{comment.text}</p>

      <CommentActions comment={comment} />
    </li>
  );
}
