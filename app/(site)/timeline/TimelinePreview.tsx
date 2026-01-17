// app/(site)/timeline/TimelinePreview.tsx

import { TimelineActivity } from "./types";

export default function TimelinePreview({
  activity,
}: {
  activity: TimelineActivity;
}) {
  if (!activity.target) return null;

  return (
    <div className="timeline-preview">
      {activity.target.cover && (
        <img
          src={activity.target.cover}
          alt=""
          className="timeline-preview-image"
        />
      )}

      {activity.target.title && (
        <div className="timeline-preview-title">
          {activity.target.title}
        </div>
      )}
    </div>
  );
}
