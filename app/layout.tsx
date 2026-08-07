import type { Metadata } from "next";
import { Fraunces, Geist, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

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

const ogImage = "/opengraph-image";
const twitterImage = "/twitter-image";

const languageBootstrap = `(() => {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  let storedLanguage = null;
  try {
    storedLanguage = window.localStorage.getItem("baris-portfolio-language-v1");
  } catch {}
  const language = queryLanguage === "en" || queryLanguage === "tr"
    ? queryLanguage
    : storedLanguage === "EN" || storedLanguage === "TR"
      ? storedLanguage.toLowerCase()
      : window.navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
  document.documentElement.lang = language;
  if (language === "en") {
    document.documentElement.dataset.languagePending = "true";
    window.setTimeout(() => delete document.documentElement.dataset.languagePending, 1500);
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: twitterImage,
        alt: `${SITE_NAME} portfolio preview`,
      },
    ],
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
      lang="tr"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", fraunces.variable, geistSans.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Script id="language-bootstrap" strategy="beforeInteractive">
          {languageBootstrap}
        </Script>
      </body>
    </html>
  );
}
