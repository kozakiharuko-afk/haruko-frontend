"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen, BookText } from "lucide-react";

type Series = {
  id: number;
  title: string;
  cover: string;
  genres: string[];
  type: "manhwa" | "novel";
  isPopular?: boolean;
  isNew?: boolean;
  hasNewChapter?: boolean;
};

const allSeries: Series[] = [
  {
    id: 1,
    title: "Midnight Bloom",
    cover: "/covers/midnight-bloom.jpg",
    genres: ["Drama", "Romance"],
    type: "manhwa",
    hasNewChapter: true,
  },
  {
    id: 2,
    title: "Crimson Ashes",
    cover: "/covers/crimson-ashes.jpg",
    genres: ["Fantasy"],
    type: "novel",
  },
  {
    id: 3,
    title: "Echoes of You",
    cover: "/covers/echoes-of-you.jpg",
    genres: ["Romance"],
    type: "manhwa",
    isNew: true,
  },
  {
    id: 4,
    title: "Fallen Petals",
    cover: "/covers/fallen-petals.jpg",
    genres: ["Drama"],
    type: "manhwa",
    isPopular: true,
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
              <div className="series-card-inner">
                <div className="series-cover">
                  <img src={item.cover} alt={item.title} />

                  {/* 📘 Type badge */}
                  <span className="series-type-badge">
                    {item.type === "novel" ? (
                      <BookText size={14} />
                    ) : (
                      <BookOpen size={14} />
                    )}
                  </span>

                  {/* 🔥 Priority badges */}
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

                <div className="series-tags">
                  {item.genres.map(tag => (
                    <span
                      key={tag}
                      className="series-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
