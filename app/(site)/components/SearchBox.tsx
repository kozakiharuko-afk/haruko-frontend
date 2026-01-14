"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Search, Clock } from "lucide-react";

/* ================= FUZZY MATCH ================= */

const fuzzyMatch = (text: string, query: string) => {
  const t = text.toLowerCase();
  const q = query.toLowerCase();

  let ti = 0;
  let score = 0;

  for (let qi = 0; qi < q.length; qi++) {
    const char = q[qi];
    const found = t.indexOf(char, ti);

    if (found === -1) return null;

    score += found === ti ? 2 : 1; // reward consecutive matches
    ti = found + 1;
  }

  return score;
};

/* ================= TEXT HIGHLIGHT HELPER ================= */

const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;

  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, "ig");

  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="search-highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

/* ================= COMPONENT ================= */

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);

  /* ================= SEARCH HELPERS ================= */

  const saveRecent = (value: string) => {
    setRecentSearches(prev => {
      const next = [value, ...prev.filter(v => v !== value)];
      return next.slice(0, 5);
    });
  };

  const goToResult = (item: { title: string; type?: string }) => {
    const slug = item.title.toLowerCase().replace(/\s+/g, "-");

    router.push(
      item.type === "novel"
        ? `/novel/${slug}`
        : `/manhwa/${slug}`
    );
  };

  const goToSearchResults = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    saveRecent(trimmed);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    closeSearch();
  };

  const closeSearch = () => {
    setResults([]);
    setActiveIndex(-1);
    setIsKeyboardNav(false);
  };

  /* ================= LIVE SEARCH ================= */

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      const baseResults = [
        { id: 1, title: "Midnight Bloom", type: "manhwa" },
        { id: 2, title: "Crimson Ashes", type: "novel" },
        { id: 3, title: "Echoes of You", type: "manhwa" },
      ];

      const scored = baseResults
        .map(item => ({
          ...item,
          score: fuzzyMatch(item.title, trimmed),
        }))
        .filter(item => item.score !== null)
        .sort((a, b) => b.score! - a.score!);

      setResults(scored);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  /* ================= CLOSE ON ROUTE CHANGE ================= */

  useEffect(() => {
    closeSearch();
    setQuery(""); // 👈 adjustment
  }, [pathname]);

  /* ================= RECENT SEARCHES ================= */

  useEffect(() => {
    const saved = localStorage.getItem("haruko:recent-searches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "haruko:recent-searches",
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`search-container ${
        isKeyboardNav ? "keyboard-nav" : ""
      }`}
      ref={searchRef}
    >
      <input
        className="search"
        type="text"
        placeholder="Search series..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={(e) => {
          setIsKeyboardNav(true);

          switch (e.key) {
            case "ArrowDown":
              if (!results.length) return;
              e.preventDefault();
              setActiveIndex(i =>
                i < results.length - 1 ? i + 1 : 0
              );
              break;

            case "ArrowUp":
              if (!results.length) return;
              e.preventDefault();
              setActiveIndex(i =>
                i > 0 ? i - 1 : results.length - 1
              );
              break;

            case "Enter":
              e.preventDefault();

              if (activeIndex >= 0 && results[activeIndex]) {
                const selected = results[activeIndex];
                saveRecent(selected.title);
                goToResult(selected);
                closeSearch();
              } else {
                goToSearchResults();
              }
              break;

            case "Escape":
              closeSearch();
              break;
          }
        }}
      />

      {(results.length > 0 || recentSearches.length > 0) && (
        <div
          className="search-dropdown"
          onMouseEnter={() => setIsKeyboardNav(false)}
          onMouseLeave={() => {
            if (!isKeyboardNav) {
              setActiveIndex(-1);
            }
          }}
        >
          {results.length > 0 &&
            results.map((r, index) => (
              <div
                key={r.id}
                className={`search-result ${
                  index === activeIndex ? "active" : ""
                }`}
                onMouseMove={() => setIsKeyboardNav(false)}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  saveRecent(r.title);
                  goToResult(r);
                  closeSearch();
                }}
              >
                <div className="search-row">
                  <Search size={14} />
                  <span>{highlightMatch(r.title, query)}</span>
                </div>
              </div>
            ))}

          {results.length === 0 &&
            recentSearches.length > 0 &&
            recentSearches.map(term => (
              <div
                key={term}
                className="search-result recent"
                onClick={() => {
                  saveRecent(term);
                  router.push(
                    `/search?q=${encodeURIComponent(term)}`
                  );
                  closeSearch();
                }}
              >
                <div className="search-row">
                  <Clock size={14} />
                  <span>{highlightMatch(term, query)}</span>
                </div>
              </div>
            ))}

          {results.length === 0 && recentSearches.length === 0 && (
            <div className="search-empty">
              No recent searches
            </div>
          )}

          <div className="search-footer">
            <button
              className="search-footer-btn clear"
              onClick={() => {
                setRecentSearches([]);
                closeSearch();
              }}
            >
              Clear recent
            </button>

            <button
              className="search-footer-btn close"
              onClick={closeSearch}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
