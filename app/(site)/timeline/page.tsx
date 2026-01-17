// app/(site)/timeline/page.tsx

import TimelineFeed from "./TimelineFeed";
import TimelineComposer from "./TimelineComposer";

export default function TimelinePage() {
  return (
    <div className="timeline-page">
      <TimelineComposer />
      <TimelineFeed />
    </div>
  );
}
