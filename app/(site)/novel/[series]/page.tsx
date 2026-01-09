"use client";

import { useState } from "react";

export default function NovelSeriesPage() {
  const [subscribed, setSubscribed] = useState(true);

  return (
    <main className="series-page">
      {/* 📘 Cover */}
      <div className="series-cover">
        <span className="series-tag">Novel</span>
      </div>

      {/* 📖 Title */}
      <h1 className="series-title">
        Midnight Bloom <span>by Haruko</span>
      </h1>

      {/* 🏷️ Tags / Genres */}
      <div className="series-tags glass">
        <span>Romance</span>
        <span>Drama</span>
        <span>Fantasy</span>
        <span>Slice of Life</span>
      </div>

      <hr className="series-divider" />

      {/* 📚 Content */}
      <section className="series-content">
        {/* LEFT — Chapter List */}
        <div className="series-left">
          <div className="chapter-header">
            <h2>Chapter List</h2>

            <select className="chapter-filter">
              <option>All</option>
              <option>English</option>
            </select>
          </div>

          <ol className="chapter-list">
            <li>
              <span className="chapter-title">
                Chapter 25
                <span className="chapter-new">NEW</span>
              </span>

              <div className="chapter-meta">
                <span>2 days ago</span>
                <span>👁 8.2k</span>
                <span>💬 31</span>
              </div>
            </li>

            <li>
              <span className="chapter-title">Chapter 24</span>
              <div className="chapter-meta">
                <span>5 days ago</span>
                <span>👁 7.9k</span>
                <span>💬 28</span>
              </div>
            </li>

            <li>
              <span className="chapter-title">Chapter 23</span>
              <div className="chapter-meta">
                <span>1 week ago</span>
                <span>👁 7.1k</span>
                <span>💬 24</span>
              </div>
            </li>

            <li>
              <span className="chapter-title">Chapter 22</span>
              <div className="chapter-meta">
                <span>2 weeks ago</span>
                <span>👁 6.4k</span>
                <span>💬 19</span>
              </div>
            </li>

            <li>
              <span className="chapter-title">Chapter 21</span>
              <div className="chapter-meta">
                <span>3 weeks ago</span>
                <span>👁 5.8k</span>
                <span>💬 15</span>
              </div>
            </li>
          </ol>
        </div>

        {/* RIGHT — Summary + Subscribe */}
        <aside className="series-right glass">
          <div className="subscribe-box">
            <span className="sub-count">6,947 subscribers</span>

            <button
              className={`subscribe-btn ${subscribed ? "active" : ""}`}
              onClick={() => setSubscribed(!subscribed)}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="series-summary">
            <h3>Summary</h3>
            <p>
              In a quiet city where memories bloom at midnight, two souls find
              themselves bound by fate, secrets, and a love written in ink and
              time.
            </p>
          </div>
        </aside>
      </section>

      {/* 🧾 Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <nav className="footer-links">
            <a href="#">About</a>
            <a href="#">DMCA</a>
            <a href="#">Privacy Rights</a>
            <a href="#">Disclaimer</a>
          </nav>

          <p className="footer-note">
            © {new Date().getFullYear()} Haruko Project. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
