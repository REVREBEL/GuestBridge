import React from "react";
import "@packages/ui/src/styles/global.css";

export const metadata = {
  title: "GuestBridge Operator Console",
  description: "High-density SLA messaging and operator console"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
