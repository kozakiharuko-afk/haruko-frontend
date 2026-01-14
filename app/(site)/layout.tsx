import SiteHeader from "./SiteHeader";
import { UnreadMessagesProvider } from "./messages/UnreadMessagesContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UnreadMessagesProvider>
      <SiteHeader />
      <main className="site-main">
        {children}
      </main>
    </UnreadMessagesProvider>
  );
}
