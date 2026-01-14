"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Series = {
  id: number;
  title: string;
  cover: string;
  genre: string;
  views: string;
  type?: "manhwa" | "novel";
  isPopular?: boolean;
  isNew?: boolean;
  hasNewChapter?: boolean;
};

const allSeries: Series[] = [
  {
    id: 1,
    title: "Jinx",
    cover: "/covers/jinx.jpg",
    genre: "Drama · Romance",
    views: "3.7M",
    type: "manhwa",
    isPopular: true,
  },
  {
    id: 2,
    title: "Midnight Bloom",
    cover: "/covers/midnight-bloom.jpg",
    genre: "Romance · Drama",
    views: "2.1M",
    type: "manhwa",
    hasNewChapter: true,
  },
  {
    id: 3,
    title: "Echoes of You",
    cover: "/covers/echoes-of-you.jpg",
    genre: "Romance",
    views: "980K",
    type: "manhwa",
    isNew: true,
  },
  {
    id: 4,
    title: "Crimson Ashes",
    cover: "/covers/crimson-ashes.jpg",
    genre: "Fantasy",
    views: "1.4M",
    type: "novel",
  },
];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const results = query
    ? allSeries.filter(series =>
        series.title.toLowerCase().includes(query)
      )
    : allSeries;

  return (
    <main className="listing-page">
      <h1>Search Results</h1>

      <p className="muted">
        {query ? (
          <>
            Showing results for <strong>“{query}”</strong>
          </>
        ) : (
          <>Showing all series</>
        )}
      </p>

      <div className="series-grid">
        {results.map(item => {
          const slug = item.title
            .toLowerCase()
            .replace(/\s+/g, "-");

          const href =
            item.type === "novel"
              ? `/novel/${slug}`
              : `/manhwa/${slug}`;

          return (
            <Link
              key={item.id}
              href={href}
              className="series-card"
            >
              <div className="series-cover">
                <img src={item.cover} alt={item.title} />

                {item.isPopular && (
                  <span className="series-badge hot">
                    HOT
                  </span>
                )}

                {!item.isPopular && item.hasNewChapter && (
                  <span className="series-badge update">
                    New Chapter
                  </span>
                )}

                {!item.isPopular &&
                  !item.hasNewChapter &&
                  item.isNew && (
                    <span className="series-badge new">
                      NEW
                    </span>
                  )}
              </div>

              <h3 className="series-title">
                {item.title}
              </h3>

              <div className="series-meta">
                <span>{item.genre}</span>
                <span>💚 {item.views}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
