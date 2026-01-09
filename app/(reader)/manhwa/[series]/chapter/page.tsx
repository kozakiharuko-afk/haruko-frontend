"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ChapterReaderPage() {
  /* ---------------- State ---------------- */

  const [autoScroll, setAutoScroll] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0.5);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [headerVisible, setHeaderVisible] = useState(true);

  // TEMP chapter boundaries
  const isFirstChapter = false;
  const isLastChapter = false;

  /* ---------------- Theme ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | null;

    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  /* ---------------- Auto-scroll refs ---------------- */

  const scrollRef = useRef<number | null>(null);
  const isUserScrolling = useRef(false);
  const speedRef = useRef(scrollSpeed);

  useEffect(() => {
    speedRef.current = scrollSpeed;
  }, [scrollSpeed]);

  /* ---------------- Auto-scroll logic ---------------- */

  useEffect(() => {
    if (!autoScroll) {
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current);
        scrollRef.current = null;
      }
      return;
    }

    const scrollStep = () => {
      if (isUserScrolling.current) {
        setAutoScroll(false);
        isUserScrolling.current = false;
        return;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        setAutoScroll(false);
        return;
      }

      document.documentElement.scrollTop += speedRef.current;
      scrollRef.current = requestAnimationFrame(scrollStep);
    };

    scrollRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current);
        scrollRef.current = null;
      }
    };
  }, [autoScroll]);

  /* ---------------- Detect manual scroll ---------------- */

  useEffect(() => {
    const onUserScroll = () => {
      if (autoScroll) isUserScrolling.current = true;
    };

    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
    };
  }, [autoScroll]);

  /* ---------------- Scroll helpers ---------------- */

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  /* ---------------- Render ---------------- */

  return (
    <main
      className="reader-page"
      onClick={() => setHeaderVisible((v) => !v)}
    >
      {/* ================= HEADER ================= */}
      <header
        className={`reader-header glass ${
          headerVisible ? "visible" : "hidden"
        }`}
      >
        {/* LEFT */}
        <div className="reader-header-left">
          <Link
            href="/"
            className="reader-logo"
            onClick={(e) => e.stopPropagation()}
          >
            Haruko
          </Link>

          <div className="reader-series">
            <Link
              href="/manhwa/midnight-bloom"
              className="reader-series-cover-link"
              aria-label="Go to series page"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="reader-series-cover" />
            </Link>

            <span className="reader-series-title">
              Midnight Bloom
            </span>
          </div>

          <span className="reader-chapter-title">
            Chapter 24
          </span>
        </div>

        {/* RIGHT */}
        <div
          className="reader-header-right"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Auto-scroll */}
          <button
            className={`reader-toggle ${autoScroll ? "active" : ""}`}
            onClick={() => setAutoScroll((v) => !v)}
          >
            Auto-scroll
          </button>

          {autoScroll && (
            <div className="scroll-speed">
              <span>Speed</span>
              <input
                type="range"
                min="0.2"
                max="1.5"
                step="0.1"
                value={scrollSpeed}
                onChange={(e) =>
                  setScrollSpeed(Number(e.target.value))
                }
              />
            </div>
          )}

          {/* ⬅ Prev */}
          {isFirstChapter ? (
            <span className="reader-nav-btn disabled">
              ← Prev
            </span>
          ) : (
            <Link
              href="/manhwa/midnight-bloom/chapter/23"
              className="reader-nav-btn"
            >
              ← Prev
            </Link>
          )}

          {/* ➡ Next */}
          {isLastChapter ? (
            <span className="reader-nav-btn disabled">
              Next →
            </span>
          ) : (
            <Link
              href="/manhwa/midnight-bloom/chapter/25"
              className="reader-nav-btn"
            >
              Next →
            </Link>
          )}

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      {/* ================= FLOATING SCROLL CONTROLS ================= */}
      <div
        className="reader-scroll-controls"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="scroll-btn"
          aria-label="Scroll to top"
          onClick={scrollToTop}
        >
          ↑
        </button>

        <button
          className="scroll-btn"
          aria-label="Scroll to bottom"
          onClick={scrollToBottom}
        >
          ↓
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <section className="reader-content">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="reader-panel" />
        ))}
      </section>

      {/* ================= ENGAGEMENT ================= */}
      <section
        className="reader-engagement"
        onClick={(e) => e.stopPropagation()}
      >
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

        <button className="action-btn subscribe">
          Subscribe
        </button>
      </section>

      {/* ================= COMMENTS ================= */}
      <section
        className="reader-comments"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Comments (2)</h3>

        <div className="comment-input-row">
          <div className="comment-avatar" />
          <input
            type="text"
            placeholder="Write a comment..."
            className="comment-input"
          />
          <button className="comment-send">
            Send
          </button>
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
      <footer
        className="footer"
        onClick={(e) => e.stopPropagation()}
      >
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
