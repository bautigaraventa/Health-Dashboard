import "./globals.css";
import { ReactNode } from "react";

import { Shell } from "@/components/layout";
import { Toaster } from "@/components/ui";
import { ThemeProvider } from "./theme-provider";

export const metadata = {
  title: "Health Dashboard",
  description: "Dashboard and call evaluation tool",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Shell>{children}</Shell>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
