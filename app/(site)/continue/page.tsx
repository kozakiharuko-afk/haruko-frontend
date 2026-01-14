import { BookOpen, BookText } from "lucide-react";

export default function ContinueReadingPage() {
  return (
    <main className="listing-page">
      <h1>Continue Reading</h1>

      <div className="continue-row">
        {/* ===== Manhwa ===== */}
        <div className="continue-card">
          <div className="continue-cover">
            <span className="continue-format">
              <BookOpen size={14} />
            </span>
          </div>

          <div className="continue-meta">
            <span className="continue-genre">Romance</span>
            <h3 className="continue-title">Midnight Bloom</h3>
            <p className="continue-chapter">Chapter 24</p>

            <div className="progress">
              <div className="progress-bar" style={{ width: "65%" }} />
            </div>
          </div>
        </div>

        {/* ===== Novel ===== */}
        <div className="continue-card">
          <div className="continue-cover novel">
            <span className="continue-format">
              <BookText size={14} />
            </span>
          </div>

          <div className="continue-meta">
            <span className="continue-genre">Fantasy</span>
            <h3 className="continue-title">Crimson Ashes</h3>
            <p className="continue-chapter">Chapter 12</p>

            <div className="progress">
              <div className="progress-bar" style={{ width: "40%" }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
