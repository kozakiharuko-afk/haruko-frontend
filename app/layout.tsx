import "./globals.css";
import ThemeProvider from "./ThemeProvider";

export const metadata = {
  title: "Haruko Project",
  description: "Manhwa & Novel Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
