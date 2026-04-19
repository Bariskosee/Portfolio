import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const FAVICON_VERSION = "20260419";

const withVersion = (path: string) => `${path}?v=${FAVICON_VERSION}`;

const EMOJI_FAVICON = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-size="52">👾</text></svg>`
)}`;

export const metadata: Metadata = {
  title: "Barış Köse — Software Engineer",
  description:
    "Building distributed systems and exploring the intersection of AI/ML and scalable infrastructure.",
  icons: {
    shortcut: [{ url: EMOJI_FAVICON, type: "image/svg+xml" }],
    icon: [
      { url: EMOJI_FAVICON, type: "image/svg+xml", sizes: "any" },
      { url: withVersion("/favicon/favicon-96x96.png"), sizes: "96x96", type: "image/png" },
    ],
    apple: [
      {
        url: withVersion("/favicon/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: withVersion("/favicon/site.webmanifest"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
