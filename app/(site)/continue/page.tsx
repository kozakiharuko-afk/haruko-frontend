export default function ContinueReadingPage() {
  return (
    <main className="listing-page">
      <h1>Continue Reading</h1>

      <div className="continue-row">
        <div className="continue-card">
          <div className="continue-cover">
            <span>Manhwa</span>
          </div>

          <div className="continue-info">
            <h3>Midnight Bloom</h3>
            <p>Chapter 24</p>

            <div className="progress">
              <div className="progress-bar" style={{ width: "65%" }} />
            </div>
          </div>
        </div>

        <div className="continue-card">
          <div className="continue-cover novel">
            <span>Novel</span>
          </div>

          <div className="continue-info">
            <h3>Crimson Ashes</h3>
            <p>Chapter 12</p>

            <div className="progress">
              <div className="progress-bar" style={{ width: "40%" }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}