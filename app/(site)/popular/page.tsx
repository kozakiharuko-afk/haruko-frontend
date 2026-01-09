import SeriesGrid from "../components/SeriesGrid";

export default function MostPopularPage() {
  return (
    <SeriesGrid
      title="Most Popular"
      items={[
        {
          id: 1,
          title: "Lookism",
          genre: "Drama",
          views: "57.8M",
          cover: "/covers/lookism.jpg",
        },
        {
          id: 2,
          title: "I Love Yoo",
          genre: "Drama",
          views: "39.3M",
          cover: "/covers/iloveyoo.jpg",
        },
      ]}
    />
  );
}
