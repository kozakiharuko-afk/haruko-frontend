"use client";

console.log("Novel reader loaded");

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Comments from "../../../manhwa/[series]/chapter/comments";

export default function NovelChapterReaderPage() {
  /* ---------------- State ---------------- */

  const [autoScroll, setAutoScroll] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(82);
  const [dislikeCount, setDislikeCount] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0.3); // slower for text
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [headerVisible, setHeaderVisible] = useState(true);

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
      className="reader-page novel"
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
              href="/novel/midnight-bloom"
              className="reader-series-cover-link"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="reader-series-cover novel-cover" />
            </Link>

            <span className="reader-series-title">
              Midnight Bloom
            </span>
          </div>

          <span className="reader-chapter-title">
            Chapter 25
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
                min="0.1"
                max="1"
                step="0.05"
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
              href="/novel/midnight-bloom/chapter/24"
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
              href="/novel/midnight-bloom/chapter/26"
              className="reader-nav-btn"
            >
              Next →
            </Link>
          )}

          <button
            className="icon-btn"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
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
      <section className="reader-content novel-content">
        <p>
          The city was quiet when the clock struck midnight. Streetlights
          flickered softly, stretching shadows across the empty road.
        </p>

        <p>
          Hana stopped beneath the old cherry tree, her breath slow and
          measured. She had walked this path countless times before, yet
          tonight the air felt heavier—alive with memory.
        </p>

        <p>
          Somewhere in the distance, a train passed, its echo fading into
          silence. Time moved forward, indifferent, while her heart lingered
          behind.
        </p>

        <p>
          When the petals finally fell, she understood that some stories were
          never meant to end—only to wait.
        </p>
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
      <Comments />

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