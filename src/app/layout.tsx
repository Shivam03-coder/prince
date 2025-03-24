import { type Metadata } from "next";
import "@/styles/globals.css";
import { appfonts } from "@/fonts";
import AppProvider from "@/components/providers/app-providers";
import ClerkAppProvider from "@/components/providers/clerk-app-provider";

export const metadata: Metadata = {
  title: "SMART PLAN MANAGER",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkAppProvider>
      <html lang="en" className={appfonts}>
        <body>
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ClerkAppProvider>
  );
}