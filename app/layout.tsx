import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mukala — AI that mines and trades crypto for you",
  description:
    "AI that mines and trades crypto for you, run by people who tell you the truth about it — so you can stop watching charts and live your life.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Mukala — The prowl is live",
    description:
      "AI that mines and trades crypto for you, run by people who tell you the truth.",
    type: "website",
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
