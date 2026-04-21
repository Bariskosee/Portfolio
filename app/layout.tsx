import type { Metadata } from "next";
import { Fraunces, Geist, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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

const FAVICON_VERSION = "20260420";

const withVersion = (path: string) => `${path}?v=${FAVICON_VERSION}`;

const BASE_URL = "https://bariskose.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Barış Köse — Software Engineer",
  description:
    "Software engineering student building distributed systems and exploring the intersection of AI/ML and scalable infrastructure.",
  keywords: [
    "Barış Köse",
    "software engineer",
    "distributed systems",
    "AI/ML",
    "backend",
    "Python",
    "FastAPI",
    "Kafka",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Barış Köse", url: BASE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Barış Köse",
    title: "Barış Köse — Software Engineer",
    description:
      "Software engineering student building distributed systems and exploring the intersection of AI/ML and scalable infrastructure.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Barış Köse — Software Engineer",
    description:
      "Software engineering student building distributed systems and exploring the intersection of AI/ML and scalable infrastructure.",
  },
  icons: {
    shortcut: [{ url: withVersion("/favicon/favicon-96x96.png"), type: "image/png" }],
    icon: [
      {
        url: withVersion("/favicon/favicon-96x96.png"),
        sizes: "96x96",
        type: "image/png",
      },
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
      className={cn("h-full", "antialiased", fraunces.variable, geistSans.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
