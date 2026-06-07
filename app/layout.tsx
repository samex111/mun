import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMJ MUN — Shri Seth Mangilalji Sahu International Model United Nations",
  description:
    "India's premier platform for diplomacy, leadership & global engagement. Partnering with leading educational institutions to build future diplomats, negotiators & global leaders.",
  keywords: [
    "Model United Nations",
    "MUN India",
    "SMJ MUN",
    "diplomacy",
    "leadership",
    "student conferences",
    "international relations",
  ],
  openGraph: {
    title: "SMJ MUN — India's Premier Platform for Diplomacy & Leadership",
    description:
      "Partnering with leading educational institutions to build future diplomats, negotiators & global leaders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
