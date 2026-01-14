"use client";

import { BookOpen, BookText } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContinueReading() {
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Continue Reading</h2>

        <Link href="/continue" className="section-action">
          View all →
        </Link>
      </div>

      <div className="continue-row">
        {loading ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton continue-skeleton" />
            ))}
          </>
        ) : (
          <>
            {/* Midnight Bloom */}
            <div
              className="continue-hover-wrapper"
              onMouseEnter={() => setHoveredCard("midnight")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="continue-card">
                <div className="continue-cover">
                  <span className="continue-badge">
                    <BookOpen />
                  </span>
                </div>

                <div className="continue-meta">
                  <span className="continue-genre">Manhwa</span>
                  <h3 className="continue-title">Midnight Bloom</h3>
                  <span className="continue-chapter">Chapter 24</span>

                  <div className="continue-progress">
                    <span style={{ width: "65%" }} />
                  </div>
                </div>
              </div>

              {hoveredCard === "midnight" && (
                <div className="continue-hover-float">
                  <img
                    src="/covers/midnight-bloom.jpg"
                    alt="Midnight Bloom"
                    className="hover-cover"
                  />
                  <div className="hover-content">
                    <h4 className="hover-title">Midnight Bloom</h4>
                    <span className="hover-genre">Manhwa · Romance</span>
                    <p className="hover-summary">
                      A tender romance that blossoms under moonlit nights and
                      quiet promises.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Crimson Ashes */}
            <div
              className="continue-hover-wrapper"
              onMouseEnter={() => setHoveredCard("crimson")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="continue-card">
                <div className="continue-cover novel">
                  <span className="continue-badge">
                    <BookText />
                  </span>
                </div>

                <div className="continue-meta">
                  <span className="continue-genre">Novel</span>
                  <h3 className="continue-title">Crimson Ashes</h3>
                  <span className="continue-chapter">Chapter 12</span>

                  <div className="continue-progress">
                    <span style={{ width: "40%" }} />
                  </div>
                </div>
              </div>

              {hoveredCard === "crimson" && (
                <div className="continue-hover-float">
                  <img
                    src="/covers/crimson-ashes.jpg"
                    alt="Crimson Ashes"
                    className="hover-cover"
                  />
                  <div className="hover-content">
                    <h4 className="hover-title">Crimson Ashes</h4>
                    <span className="hover-genre">Novel · Fantasy</span>
                    <p className="hover-summary">
                      A dark fantasy tale of fate, fire, and betrayal.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Echoes of You */}
            <div
              className="continue-hover-wrapper"
              onMouseEnter={() => setHoveredCard("echoes")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="continue-card">
                <div className="continue-cover">
                  <span className="continue-badge">
                    <BookOpen />
                  </span>
                </div>

                <div className="continue-meta">
                  <span className="continue-genre">Manhwa</span>
                  <h3 className="continue-title">Echoes of You</h3>
                  <span className="continue-chapter">Chapter 8</span>

                  <div className="continue-progress">
                    <span style={{ width: "80%" }} />
                  </div>
                </div>
              </div>

              {hoveredCard === "echoes" && (
                <div className="continue-hover-float">
                  <img
                    src="/covers/echoes-of-you.jpg"
                    alt="Echoes of You"
                    className="hover-cover"
                  />
                  <div className="hover-content">
                    <h4 className="hover-title">Echoes of You</h4>
                    <span className="hover-genre">Manhwa · Romance</span>
                    <p className="hover-summary">
                      A quiet love story between two strangers whose lives
                      slowly intertwine under unexpected circumstances.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
