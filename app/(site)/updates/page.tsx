import SeriesGrid from "../components/SeriesGrid";

export default function LatestUpdatesPage() {
  return (
    <SeriesGrid
      title="Latest Updates"
      items={[
        {
          id: 1,
          title: "The Price Is Your Everything",
          genre: "Drama",
          views: "3.7M",
          cover: "/covers/1.jpg",
        },
        {
          id: 2,
          title: "This Wasn't in My Adoption Plan",
          genre: "Drama",
          views: "1M",
          cover: "/covers/2.jpg",
        },
      ]}
    />
  );
}
