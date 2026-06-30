import React from "react";
import "@packages/ui/src/styles/global.css";

export const metadata = {
  title: "GuestBridge Guest Portal",
  description: "Boutique guest arrival and verification portal"
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
