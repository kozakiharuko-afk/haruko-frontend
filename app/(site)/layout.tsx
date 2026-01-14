
import SiteHeader from "./SiteHeader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="site-main">{children}</main>
    </>
  );
}
