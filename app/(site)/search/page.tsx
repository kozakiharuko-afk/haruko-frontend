import { Suspense } from "react";
import SearchResults from "./search-results";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <main className="listing-page">
      <h1>Search Results</h1>
      <p className="muted">Loading results…</p>
    </main>
  );
}
