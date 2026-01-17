// app/(site)/timeline/types.ts

export type TimelineVisibility = "public" | "friends" | "private";

export type TimelineActivityType =
  | "status_post"
  | "reading_list_add"
  | "follow_user";

export type TimelineUser = {
  id: string;
  username: string;
  avatar: string;
};

export type TimelineActivity = {
  id: string;
  type: TimelineActivityType;

  actor: TimelineUser;

  content?: string; // status text
  images?: string[]; // image URLs

  visibility: TimelineVisibility;

  target?: {
    type: "series" | "user";
    id: string;
    title?: string;
    cover?: string;
  };

  commentCount: number;
  latestComment?: {
    id: string;
    content: string;
    author: TimelineUser;
  };

  createdAt: string;
  editedAt?: string;
};
