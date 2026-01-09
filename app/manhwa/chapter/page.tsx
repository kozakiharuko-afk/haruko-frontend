"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChapterReaderPage() {
  const [autoScroll, setAutoScroll] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <main className="reader-page">
      {/* ================= HEADER ================= */}
      <header className="reader-header glass">
        {/* LEFT */}
        <div className="reader-header-left">
          <Link href="/" className="reader-logo">
            Haruko
          </Link>

          <div className="reader-series">
            <div className="reader-series-cover" />
            <span className="reader-series-title">Midnight Bloom</span>
          </div>

          <span className="reader-chapter-title">Chapter 24</span>
        </div>

        {/* RIGHT */}
        <div className="reader-header-right">
          <button
            className={`reader-toggle ${autoScroll ? "active" : ""}`}
            onClick={() => setAutoScroll(!autoScroll)}
          >
            Auto-scroll
          </button>

          <button className="reader-nav-btn">← Prev</button>
          <button className="reader-nav-btn">Next →</button>

          <button className="icon-btn">🌙</button>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <section className="reader-content">
        <div className="reader-panel" />
        <div className="reader-panel" />
        <div className="reader-panel" />
        <div className="reader-panel" />
      </section>

      {/* ================= ENGAGEMENT ================= */}
      <section className="reader-engagement">
        <div className="reader-actions">
          <button
            className={`action-btn ${liked ? "active" : ""}`}
            onClick={() => {
              setLiked(!liked);
              if (disliked) setDisliked(false);
            }}
          >
            👍 Like
          </button>

          <button
            className={`action-btn ${disliked ? "active" : ""}`}
            onClick={() => {
              setDisliked(!disliked);
              if (liked) setLiked(false);
            }}
          >
            👎 Dislike
          </button>
        </div>

        <button className="action-btn subscribe">Subscribe</button>
      </section>

      {/* ================= COMMENTS ================= */}
      <section className="reader-comments">
        <h3>Comments (2)</h3>

        <div className="comment-input-row">
          <div className="comment-avatar" />
          <input
            type="text"
            placeholder="Write a comment..."
            className="comment-input"
          />
          <button className="comment-send">Send</button>
        </div>

        <ul className="comment-list">
          <li>
            <strong>UserA</strong>
            <p>This chapter was beautiful 😭</p>
          </li>
          <li>
            <strong>UserB</strong>
            <p>I love the pacing so much</p>
          </li>
        </ul>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-inner">
          <nav className="footer-links">
            <a href="#">About</a>
            <a href="#">DMCA</a>
            <a href="#">Privacy Rights</a>
            <a href="#">Disclaimer</a>
          </nav>
          <p className="footer-note">
            © {new Date().getFullYear()} Haruko Project
          </p>
        </div>
      </footer>
    </main>
  );
}
