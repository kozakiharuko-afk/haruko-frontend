"use client";

import { useRef, useState, useEffect } from "react";
import { BookOpen, BookText } from "lucide-react";

const items = [
  {
    id: "1",
    title: "Midnight Bloom",
    chapter: "Ch. 25",
    icon: <BookOpen />,
  },
  {
    id: "2",
    title: "Crimson Ashes",
    chapter: "Ch. 13",
    icon: <BookText />,
  },
  {
    id: "3",
    title: "Echoes of You",
    chapter: "Ch. 9",
    icon: <BookOpen />,
  },
  {
    id: "4",
    title: "Fallen Petals",
    chapter: "Ch. 31",
    icon: <BookOpen />,
  },
];

export default function LatestUpdates() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Latest Updates</h2>
        <a className="section-action" href="/updates">
          View all →
        </a>
      </div>

      <div
        ref={dockRef}
        className="dock"
        onMouseMove={loading ? undefined : (e) => setMouseX(e.clientX)}
        onMouseLeave={loading ? undefined : () => setMouseX(null)}
      >
        {loading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="dock-item">
                <div className="skeleton dock-skeleton" />
              </div>
            ))}
          </>
        ) : (
          <>
            {items.map((item) => (
              <DockItem key={item.id} mouseX={mouseX}>
                <div className="continue-card">
                  <div className="continue-cover">
                    <span className="continue-badge">{item.icon}</span>
                  </div>

                  <div className="continue-meta">
                    <h3 className="continue-title">{item.title}</h3>
                    <span className="continue-chapter">{item.chapter}</span>
                  </div>
                </div>
              </DockItem>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Dock item with physics              */
/* ---------------------------------- */

function DockItem({
  children,
  mouseX,
}: {
  children: React.ReactNode;
  mouseX: number | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  let scale = 1;

  if (mouseX !== null && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);

    // Gaussian falloff (THIS is the magic)
    const maxScale = 1.45;
    const falloff = 140;

    scale =
      1 +
      (maxScale - 1) *
        Math.exp(-(distance * distance) / (2 * falloff * falloff));
  }

  return (
    <div
      ref={ref}
      className="dock-item"
      style={{
        transform: `scale(${scale}) translateY(${(scale - 1) * -20}px)`,
      }}
    >
      {children}
    </div>
  );
}
