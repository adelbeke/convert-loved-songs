import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { DataProvider } from "@/lib/data/client";

export const metadata: Metadata = {
  title: "Convert Loved Songs",
  description: "Generate Spotify playlist from your loved songs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"min-h-screen min-w-screen"}
        style={{
          fontFamily: "Helvetica Neue",
          background: 'url("./background.png")',
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
        }}
      >
        <DataProvider>
          <AuthProvider>{children}</AuthProvider>
        </DataProvider>
      </body>
    </html>
  );
}
