// app/(site)/timeline/TimelineActions.tsx

import {
  MessageCircle,
  Repeat2,
  Flag,
  EyeOff,
} from "lucide-react";

export default function TimelineActions() {
  return (
    <div className="timeline-actions">
  <button aria-label="Comment">
    <MessageCircle size={18} />
  </button>
  <button aria-label="Repost">
    <Repeat2 size={18} />
  </button>
  <button aria-label="Save">
    <Flag size={18} />
  </button>
  <button aria-label="Hide">
    <EyeOff size={18} />
  </button>
</div>
  );
}
