import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mukala.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mukala — AI that mines and trades crypto for you",
    template: "%s · Mukala",
  },
  description:
    "AI that mines and trades crypto for you, run by people who tell you the truth about it — so you can stop watching charts and live your life.",
  applicationName: "Mukala",
  authors: [{ name: "Mukala" }],
  keywords: [
    "crypto AI",
    "automated crypto trading",
    "AI mining",
    "crypto automation",
    "yield",
    "DeFi",
    "passive crypto",
  ],
  openGraph: {
    type: "website",
    siteName: "Mukala",
    url: siteUrl,
    title: "Mukala — AI that mines and trades crypto for you",
    description:
      "Run by people who tell you the truth about it — so you can stop watching charts and live your life.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mukala — The prowl is live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukala — AI that mines and trades crypto for you",
    description:
      "Run by people who tell you the truth about it — so you can stop watching charts and live your life.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
