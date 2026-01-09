"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Comments from "./comments";

export default function ChapterReaderPage() {
  /* ---------------- State ---------------- */

  const [autoScroll, setAutoScroll] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);
  const [dislikeCount, setDislikeCount] = useState(3);
  const [subscribed, setSubscribed] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0.5);
  const [headerVisible, setHeaderVisible] = useState(true);

  const isFirstChapter = false;
  const isLastChapter = false;

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

        <div
          className="reader-header-right"
          onClick={(e) => e.stopPropagation()}
        >
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
        </div>
      </header>

      {/* ================= FLOATING SCROLL ================= */}
      <div
        className="reader-scroll-controls"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="scroll-btn" onClick={scrollToTop}>
          ↑
        </button>
        <button className="scroll-btn" onClick={scrollToBottom}>
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
              if (liked) {
                setLiked(false);
                setLikeCount((c) => c - 1);
              } else {
                setLiked(true);
                setLikeCount((c) => c + 1);
                if (disliked) {
                  setDisliked(false);
                  setDislikeCount((c) => c - 1);
                }
              }
            }}
          >
            👍 Like <span className="count">{likeCount}</span>
          </button>

          <button
            className={`action-btn ${disliked ? "active" : ""}`}
            onClick={() => {
              if (disliked) {
                setDisliked(false);
                setDislikeCount((c) => c - 1);
              } else {
                setDisliked(true);
                setDislikeCount((c) => c + 1);
                if (liked) {
                  setLiked(false);
                  setLikeCount((c) => c - 1);
                }
              }
            }}
          >
            👎 Dislike <span className="count">{dislikeCount}</span>
          </button>
        </div>

        <button
          className={`action-btn subscribe ${
            subscribed ? "subscribed" : ""
          }`}
          onClick={() => setSubscribed((v) => !v)}
        >
          {subscribed ? "✓ Subscribed" : "+ Subscribe"}
        </button>
      </section>

      {/* ================= COMMENTS ================= */}
      <Comments />

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
