"use client";

import { useRef, useState, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { TimelineActivity } from "./types";
import TimelineActions from "./TimelineActions";
import TimelineComments from "./TimelineComments";
import TimelinePreview from "./TimelinePreview";

export default function TimelineItem({
  activity,
}: {
  activity: TimelineActivity;
}) {
  const isOwner = true; // replace with real auth later
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <div className="timeline-item">
      {/* HEADER */}
      <div className="timeline-item-header">
        <img
          src={activity.actor.avatar}
          alt=""
          className="timeline-avatar"
        />

        <div className="timeline-item-body">
          <span className="timeline-username">
            {activity.actor.username}
          </span>

          {activity.content && (
            <p className="timeline-item-text">
              {activity.content}
            </p>
          )}

          <TimelinePreview activity={activity} />
          <TimelineActions />
        </div>

        {/* MENU (always visible) */}
        <div className="timeline-menu" ref={menuRef}>
          <button
            aria-label="Post options"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div className="timeline-menu-dropdown">
              {isOwner ? (
                <>
                  <button>
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button className="danger">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </>
              ) : (
                <button className="danger">
                  Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* COMMENTS */}
      <TimelineComments activity={activity} />
    </div>
  );
}
