"use client";

import { useState } from "react";
import CommentItem from "./comment-item";

/* ---------------- Types ---------------- */

export type Comment = {
  id: number;
  author: string;
  text: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
  isMine?: boolean;
};

/* ---------------- Component ---------------- */

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "UserA",
      text: "This chapter was beautiful 😭",
      likes: 12,
      dislikes: 0,
      isMine: true,
    },
    {
      id: 2,
      author: "UserB",
      text: "I love the pacing so much",
      likes: 8,
      dislikes: 1,
    },
  ]);

  const addComment = (text: string) => {
    if (!text.trim()) return;

    setComments((prev) => [
      {
        id: Date.now(),
        author: "You",
        text,
        likes: 0,
        dislikes: 0,
        isMine: true,
      },
      ...prev,
    ]);
  };

  return (
    <section className="reader-comments">
      {/* ================= HEADER ================= */}
      <div className="comments-header">
        <h2 className="comments-title">COMMENTS</h2>
        <span className="comments-count">
          {comments.length}
        </span>
      </div>

      {/* ================= INPUT ================= */}
      <CommentInput onSubmit={addComment} />

      {/* ================= SORT (future-ready) ================= */}
      <div className="comments-sort">
        <button className="sort-btn active">
          Newest
        </button>
        <button className="sort-btn">
          Popular
        </button>
      </div>

      {/* ================= LIST ================= */}
      <ul className="comment-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
          />
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Comment Input ---------------- */

function CommentInput({
  onSubmit,
}: {
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="comment-input-row">
      <div className="comment-avatar" />

      <input
        className="comment-input"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="comment-send"
        onClick={() => {
          onSubmit(text);
          setText("");
        }}
      >
        Send
      </button>
    </div>
  );
}
