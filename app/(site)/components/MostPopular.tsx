"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PopularSeries = {
  id: number;
  title: string;
  genre: string;
  cover: string;
};

const popular: PopularSeries[] = [
  { id: 1, title: "Jinx", genre: "Drama · Romance", cover: "/covers/jinx.jpg" },
  { id: 2, title: "Love is an Illusion!", genre: "Comedy · Romance", cover: "/covers/love-is-an-illusion.jpg" },
  { id: 3, title: "The Pizza Delivery Man and the Gold Palace", genre: "Drama · Slice of Life", cover: "/covers/pizza-delivery.jpg" },
  { id: 4, title: "Kiss Me If You Can", genre: "Romance · Comedy", cover: "/covers/kiss-me-if-you-can.jpg" },
  { id: 5, title: "Diamond Dust", genre: "Drama", cover: "/covers/diamond-dust.jpg" },
  { id: 6, title: "Problematic Student Patrol", genre: "Action · School", cover: "/covers/problematic-student.jpg" },
  { id: 7, title: "Into the Rose Garden", genre: "Romance · Drama", cover: "/covers/into-the-rose-garden.jpg" },
  { id: 8, title: "Blossoms of the White Night", genre: "Fantasy · Romance", cover: "/covers/blossoms-white-night.jpg" },
  { id: 9, title: "FlashLight", genre: "Psychological", cover: "/covers/flashlight.jpg" },
  { id: 10, title: "Balboy Tactics", genre: "Action · Thriller", cover: "/covers/balboy-tactics.jpg" },
];

export default function MostPopular() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">Most Popular</h2>

        <Link href="/popular" className="section-action">
          View all →
        </Link>
      </div>

      {/* Grid */}
      <div className="new-releases-grid">
        {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton new-release-skeleton" />
            ))}
          </>
        ) : (
          <>
            {popular.map((item, i) => (
              <div
                key={item.id}
                className="new-release-item"
                data-rank={i + 1}
              >
                <div className="new-release-cover">
                  <img src={item.cover} alt={item.title} />
                </div>

                <div className="new-release-meta">
                  {/* 🔝 Top badges */}
                  <div className="popular-badges">
                    <span className="popular-rank">{i + 1}</span>

                    {i < 3 && (
                      <span className="popular-trending">
                        ↑ Trending
                      </span>
                    )}
                  </div>

                  <h3 className="new-release-title">{item.title}</h3>
                  <span className="new-release-genre">{item.genre}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
