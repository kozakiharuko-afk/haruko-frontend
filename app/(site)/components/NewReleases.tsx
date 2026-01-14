"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NewRelease = {
  id: number;
  title: string;
  time: string;
  cover: string;
};

const releases: NewRelease[] = [
  {
    id: 1,
    title: "Balboy Tactics",
    time: "9 hours ago",
    cover: "/covers/balboy-tactics.jpg",
  },
  {
    id: 2,
    title: "Into the Rose Garden",
    time: "9 hours ago",
    cover: "/covers/into-the-rose-garden.jpg",
  },
  {
    id: 3,
    title: "Diamond Dust",
    time: "10 hours ago",
    cover: "/covers/diamond-dust.jpg",
  },
  {
    id: 4,
    title: "Love is an Illusion!",
    time: "10 hours ago",
    cover: "/covers/love-is-an-illusion.jpg",
  },
  {
    id: 5,
    title: "Blossoms of the White Night",
    time: "10 hours ago",
    cover: "/covers/blossoms-white-night.jpg",
  },
  {
    id: 6,
    title: "FlashLight",
    time: "10 hours ago",
    cover: "/covers/flashlight.jpg",
  },
  {
    id: 7,
    title: "The Pizza Delivery Man and the Gold Palace",
    time: "10 hours ago",
    cover: "/covers/pizza-delivery.jpg",
  },
  {
    id: 8,
    title: "Kiss Me If You Can",
    time: "10 hours ago",
    cover: "/covers/kiss-me-if-you-can.jpg",
  },
  {
    id: 9,
    title: "Jinx",
    time: "18 hours ago",
    cover: "/covers/jinx.jpg",
  },
  {
    id: 10,
    title: "Problematic Student Patrol",
    time: "Yesterday",
    cover: "/covers/problematic-student.jpg",
  },
];

export default function NewReleases() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      {/* ✅ Section header */}
      <div className="section-header">
        <h2 className="section-title">New Releases</h2>

        <Link href="/new-releases" className="section-action">
          View all →
        </Link>
      </div>

      {/* ✅ Grid */}
      <div className="new-releases-grid">
        {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton new-release-skeleton" />
            ))}
          </>
        ) : (
          <>
            {releases.map((item) => (
              <div key={item.id} className="new-release-item">
                <div className="new-release-cover">
                  <img src={item.cover} alt={item.title} />
                </div>

                <div className="new-release-meta">
                  <h3 className="new-release-title">{item.title}</h3>
                  <span className="new-release-time">{item.time}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
