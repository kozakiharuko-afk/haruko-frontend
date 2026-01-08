type ContinueItem = {
  title: string;
  chapter: string;
};

type SeriesItem = {
  title: string;
};

const continueReading: ContinueItem[] = [
  { title: "Midnight Bloom", chapter: "Chapter 12" },
  { title: "Ashes of Spring", chapter: "Chapter 4" },
];

const latestUpdates: SeriesItem[] = [
  { title: "Crimson Veil" },
  { title: "Moonbound" },
  { title: "Silent Petals" },
];

const mostPopular: SeriesItem[] = [
  { title: "Falling Star" },
  { title: "Obsidian Heart" },
  { title: "White Nocturne" },
];

const newlyReleased: SeriesItem[] = [
  { title: "Peach Moon" },
  { title: "Velvet Dusk" },
];

export default function Home() {
  return (
    <main className="home">
      {/* Continue Reading */}
      <section>
        <h2>Continue Reading</h2>
        <div className="continue-list">
          {continueReading.map((item) => (
            <div key={item.title} className="continue-card">
              <strong>{item.title}</strong>
              <span>{item.chapter}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Updates */}
      <section>
        <h2>Latest Updates</h2>
        <div className="card-row">
          {latestUpdates.map((item) => (
            <div key={item.title} className="card">
              {item.title}
            </div>
          ))}
        </div>
      </section>

      {/* Most Popular */}
      <section>
        <h2>Most Popular</h2>
        <ul className="list">
          {mostPopular.map((item, index) => (
            <li key={item.title}>
              <span className="rank">{index + 1}</span>
              {item.title}
            </li>
          ))}
        </ul>
      </section>

      {/* Newly Released */}
      <section>
        <h2>Newly Released</h2>
        <div className="card-row">
          {newlyReleased.map((item) => (
            <div key={item.title} className="card">
              {item.title}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
