"use client";

import { useState } from "react";
import { TimelineActivity } from "./types";

type Comment = {
  id: string;
  author: string;
  content: string;
  isAuthor: boolean;
  isNew?: boolean;
};

export default function TimelineComments({
  activity,
}: {
  activity: TimelineActivity;
}) {
  const [open, setOpen] = useState(false);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      author: "ari",
      content: "This arc is insane",
      isAuthor: false,
    },
    {
      id: "c2",
      author: "haruko",
      content: "This arc broke me",
      isAuthor: true,
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const startEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditText(comment.content);
    setMenuOpenId(null);
  };

  const saveEdit = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, content: editText } : c
      )
    );
    setEditingId(null);
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  if (comments.length === 0) return null;

  return (
    <div className="timeline-comments">
      {/* DIVIDER */}
      <div className="timeline-divider" />

      {/* COMMENT INPUT (always visible) */}
      <div className="timeline-comment-input">
        <input
          placeholder="Write a comment…"
          type="text"
        />
      </div>

      {/* COLLAPSED STATE */}
      {!open && (
        <div className="timeline-comments-collapsed">
          <button
            className="timeline-comments-toggle"
            onClick={() => setOpen(true)}
          >
            View all comments ({comments.length})
          </button>
        </div>
      )}

      {/* EXPANDED COMMENTS */}
      {open && (
        <div className="timeline-comments-expanded open">
          {comments.map((comment) => {
            const isEditing = editingId === comment.id;

            return (
              <div
                key={comment.id}
                className={`timeline-comment ${
                  comment.isAuthor
                    ? "comment--author"
                    : "comment--other"
                } ${comment.isNew ? "is-new" : ""}`}
              >
                {/* HEADER */}
                <div className="comment-header">
                  <span className="comment-username">
                    {comment.author}
                  </span>

                  {comment.isAuthor && (
                    <button
                      className="comment-menu-btn"
                      onClick={() =>
                        setMenuOpenId(
                          menuOpenId === comment.id
                            ? null
                            : comment.id
                        )
                      }
                    >
                      ⋯
                    </button>
                  )}

                  {menuOpenId === comment.id && (
                    <div className="comment-menu-dropdown">
                      <button
                        onClick={() => startEdit(comment)}
                      >
                        Edit
                      </button>
                      <button
                        className="danger"
                        onClick={() =>
                          deleteComment(comment.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* BODY */}
                {isEditing ? (
                  <div className="comment-edit">
                    <textarea
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                      rows={2}
                      autoFocus
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey
                        ) {
                          e.preventDefault();
                          saveEdit(comment.id);
                        }

                        if (e.key === "Escape") {
                          e.preventDefault();
                          cancelEdit();
                        }
                      }}
                    />

                    <div className="comment-edit-actions">
                      <button
                        onClick={() =>
                          saveEdit(comment.id)
                        }
                      >
                        Save
                      </button>
                      <button onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="comment-text">
                    {comment.content}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
