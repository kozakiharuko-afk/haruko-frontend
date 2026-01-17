// app/(site)/timeline/TimelineFeed.tsx

import TimelineItem from "./TimelineItem";
import { TimelineActivity } from "./types";

const mockData: TimelineActivity[] = [
  {
    id: "1",
    type: "status_post",
    actor: {
      id: "u1",
      username: "haruko",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    content: "Finally started Solo Leveling and wow… 😭",
    images: [],
    visibility: "public",
    commentCount: 3,
    latestComment: {
      id: "c1",
      content: "This arc goes CRAZY",
      author: {
        id: "u2",
        username: "jinwoo",
        avatar: "",
      },
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "reading_list_add",
    actor: {
      id: "u3",
      username: "ari",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
    visibility: "public",
    target: {
      type: "series",
      id: "s1",
      title: "Solo Leveling",
      cover: "https://picsum.photos/80/120",
    },
    commentCount: 0,
    createdAt: new Date().toISOString(),
  },
];

export default function TimelineFeed() {
  return (
    <div className="timeline-feed">
      {mockData.map((activity) => (
        <TimelineItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
