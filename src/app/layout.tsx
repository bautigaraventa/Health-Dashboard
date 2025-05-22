import "./globals.css";
import { Shell } from "@/components/layout/shell";
import { ThemeProvider } from "./theme-provider";

export const metadata = {
  title: "Health Dashboard",
  description: "Dashboard and call evaluation tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
