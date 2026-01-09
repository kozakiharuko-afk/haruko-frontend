type Series = {
  id: number;
  title: string;
  genre: string;
  views: string;
  cover: string;
};

export default function SeriesGrid({
  title,
  items,
}: {
  title: string;
  items: Series[];
}) {
  return (
    <main className="listing-page">
      <h1 className="listing-title">{title}</h1>

      <div className="series-grid">
        {items.map((item) => (
          <div key={item.id} className="series-card">
            <span className="rank">{item.id}</span>

            <div className="series-cover">
              <img src={item.cover} alt={item.title} />
            </div>

            <h3 className="series-title">{item.title}</h3>

            <div className="series-meta">
              <span>{item.genre}</span>
              <span className="views">💚 {item.views}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
