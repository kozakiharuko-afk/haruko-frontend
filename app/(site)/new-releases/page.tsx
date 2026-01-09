import SeriesGrid from "../components/SeriesGrid";

export default function NewReleasesPage() {
  return (
    <SeriesGrid
      title="New Releases"
      items={[
        {
          id: 1,
          title: "Have an Affair With Me",
          genre: "Drama",
          views: "205,200",
          cover: "/covers/affair.jpg",
        },
      ]}
    />
  );
}
