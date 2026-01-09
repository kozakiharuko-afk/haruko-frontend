export default function SearchPage() {
  return (
    <main className="listing-page">
      <h1>Search Results</h1>

      <p className="muted">
        Showing results for <strong>“Midnight Bloom”</strong>
      </p>

      <div className="series-grid">
        {/* Reuse SeriesGrid later */}
        <div className="series-card">
          <div className="series-cover" />
          <h3 className="series-title">Midnight Bloom</h3>
          <div className="series-meta">
            <span>Drama</span>
            <span>💚 3.7M</span>
          </div>
        </div>
      </div>
    </main>
  );
}
