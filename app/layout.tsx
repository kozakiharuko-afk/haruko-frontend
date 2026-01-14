import "./globals.css";
import ThemeProvider from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";

export const metadata = {
  title: "Haruko Project",
  description: "Read Manhwa & Novels on Haruko",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
