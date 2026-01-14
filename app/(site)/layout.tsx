import SiteHeader from "./SiteHeader";
import { UnreadMessagesProvider } from "./messages/UnreadMessagesContext";
import { NotificationsProvider } from "./notifications/NotificationsContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UnreadMessagesProvider>
      <NotificationsProvider>
        <SiteHeader />
        <main className="site-main">
          {children}
        </main>
      </NotificationsProvider>
    </UnreadMessagesProvider>
  );
}
