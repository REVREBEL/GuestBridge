import React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "@packages/ui/src/styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#fdfbf7] text-slate-900">{children}</body>
    </html>
  );
}
