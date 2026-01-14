"use client";

import { ReactNode } from "react";
import { useHoverPreview } from "../hooks/useHoverPreview";

type ContinueCardProps = {
  id: string;
  icon: ReactNode;
  coverClass?: string;
  genre: string;
  title: string;
  chapter: string;
  progress: string;
  hoverTitle: string;
  hoverGenre: string;
  hoverSummary: string;
  hoverImage: string;
};

export default function ContinueCard({
  id,
  icon,
  coverClass,
  genre,
  title,
  chapter,
  progress,
  hoverTitle,
  hoverGenre,
  hoverSummary,
  hoverImage,
}: ContinueCardProps) {
  const {
    wrapperRef,
    isHovered,
    flipLeft,
    onMouseEnter,
    onMouseLeave,
  } = useHoverPreview();

  return (
    <div
      ref={wrapperRef}
      className="continue-hover-wrapper"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="continue-card">
        <div className={`continue-cover ${coverClass ?? ""}`}>
          <span className="continue-badge">{icon}</span>
        </div>

        <div className="continue-meta">
          <span className="continue-genre">{genre}</span>
          <h3 className="continue-title">{title}</h3>
          <span className="continue-chapter">{chapter}</span>

          <div className="continue-progress">
            <span style={{ width: progress }} />
          </div>
        </div>
      </div>

      {isHovered && (
        <div
          className={`continue-hover-float ${
            flipLeft ? "flip-left" : ""
          }`}
        >
          <img
            src={hoverImage}
            alt={hoverTitle}
            className="hover-cover"
          />

          <div className="hover-content">
            <h4 className="hover-title">{hoverTitle}</h4>
            <span className="hover-genre">{hoverGenre}</span>
            <p className="hover-summary">{hoverSummary}</p>
          </div>
        </div>
      )}
    </div>
  );
}
