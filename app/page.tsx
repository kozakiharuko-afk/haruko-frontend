export default function HomePage() {
  return (
    <main className="home">
      {/* ⭐ Continue Reading */}
      <section>
        <h2>Continue Reading</h2>

        <div className="continue-row">
          {/* Card */}
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

          {/* Card */}
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

          {/* Card */}
          <div className="continue-card">
            <div className="continue-cover">
              <span>Manhwa</span>
            </div>

            <div className="continue-info">
              <h3>Echoes of You</h3>
              <p>Chapter 8</p>

              <div className="progress">
                <div className="progress-bar" style={{ width: "80%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 🆕 Latest Updates */}
<section>
  <h2>Latest Updates</h2>

  <div className="latest-slider">
    <div className="latest-track">
      {/* Item */}
      <div className="latest-card">
        <div className="latest-cover" />
        <h3>Midnight Bloom</h3>
        <p>Chapter 25</p>
      </div>

      <div className="latest-card">
        <div className="latest-cover" />
        <h3>Crimson Ashes</h3>
        <p>Chapter 13</p>
      </div>

      <div className="latest-card">
        <div className="latest-cover" />
        <h3>Echoes of You</h3>
        <p>Chapter 9</p>
      </div>

      <div className="latest-card">
        <div className="latest-cover" />
        <h3>Fallen Petals</h3>
        <p>Chapter 31</p>
      </div>

      <div className="latest-card">
        <div className="latest-cover" />
        <h3>Starlit Cage</h3>
        <p>Chapter 18</p>
      </div>
    </div>
  </div>
</section>
{/* ✨ Newly Released */}
<section>
  <h2>Newly Released</h2>

  <ol className="new-release-list">
    <li>
      <span className="rank">1.</span>
      <div className="release-icon" />
      <span className="release-title">Midnight Bloom</span>
    </li>

    <li>
      <span className="rank">2.</span>
      <div className="release-icon" />
      <span className="release-title">Crimson Ashes</span>
    </li>

    <li>
      <span className="rank">3.</span>
      <div className="release-icon" />
      <span className="release-title">Echoes of You</span>
    </li>

    <li>
      <span className="rank">4.</span>
      <div className="release-icon" />
      <span className="release-title">Falling Sakura</span>
    </li>

    <li>
      <span className="rank">5.</span>
      <div className="release-icon" />
      <span className="release-title">Starlit Cage</span>
    </li>

    <li>
      <span className="rank">6.</span>
      <div className="release-icon" />
      <span className="release-title">Velvet Ashes</span>
    </li>

    <li>
      <span className="rank">7.</span>
      <div className="release-icon" />
      <span className="release-title">Moonlit Silence</span>
    </li>

    <li>
      <span className="rank">8.</span>
      <div className="release-icon" />
      <span className="release-title">Starbound You</span>
    </li>

    <li>
      <span className="rank">9.</span>
      <div className="release-icon" />
      <span className="release-title">Silver Petals</span>
    </li>

    <li>
      <span className="rank">10.</span>
      <div className="release-icon" />
      <span className="release-title">Broken Halo</span>
    </li>
  </ol>
</section>
{/* 🔥 Most Popular */}
<section>
  <h2>Most Popular</h2>

  <ol className="new-release-list">
    <li>
      <span className="rank">1.</span>
      <div className="release-icon" />
      <span className="release-title">Midnight Bloom</span>
    </li>

    <li>
      <span className="rank">2.</span>
      <div className="release-icon" />
      <span className="release-title">Crimson Ashes</span>
    </li>

    <li>
      <span className="rank">3.</span>
      <div className="release-icon" />
      <span className="release-title">Echoes of You</span>
    </li>

    <li>
      <span className="rank">4.</span>
      <div className="release-icon" />
      <span className="release-title">Falling Sakura</span>
    </li>

    <li>
      <span className="rank">5.</span>
      <div className="release-icon" />
      <span className="release-title">Starlit Cage</span>
    </li>

    <li>
      <span className="rank">6.</span>
      <div className="release-icon" />
      <span className="release-title">Velvet Ashes</span>
    </li>

    <li>
      <span className="rank">7.</span>
      <div className="release-icon" />
      <span className="release-title">Moonlit Silence</span>
    </li>

    <li>
      <span className="rank">8.</span>
      <div className="release-icon" />
      <span className="release-title">Starbound You</span>
    </li>

    <li>
      <span className="rank">9.</span>
      <div className="release-icon" />
      <span className="release-title">Silver Petals</span>
    </li>

    <li>
      <span className="rank">10.</span>
      <div className="release-icon" />
      <span className="release-title">Broken Halo</span>
    </li>
  </ol>
</section>
    </main>
  );
}

