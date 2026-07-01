import React from "react";
import { Inter } from "next/font/google";
import "@packages/ui/src/styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased bg-[#f8fafc] text-slate-900">{children}</body>
    </html>
  );
}
