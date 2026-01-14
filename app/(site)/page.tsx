"use client";

import Link from "next/link";
import ContinueReading from "./components/ContinueReading";
import LatestUpdates from "./components/LatestUpdates";
import NewReleases from "./components/NewReleases";
import MostPopular from "./components/MostPopular";

export default function HomePage() {
  return (
    <main className="home">
      {/* ⭐ Continue Reading */}
      <ContinueReading />

      {/* 🔥 Latest Updates */}
      <LatestUpdates />

      {/* 🆕 New Releases */}
      <NewReleases />

      {/* ⭐ Most Popular */}
      <MostPopular />

      {/* 🧾 Footer */}
<footer className="site-footer">
  <nav className="footer-links">
    <Link href="/about">About</Link>
    <Link href="/dmca">DMCA</Link>
    <Link href="/privacy">Privacy Rights</Link>
    <Link href="/disclaimer">Disclaimer</Link>
  </nav>

  <p className="footer-copy">
    © {new Date().getFullYear()} Haruko. All rights reserved.
  </p>
</footer>
    </main>
  );
}