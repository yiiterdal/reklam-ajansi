import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "Studio | New-Generation Communications Agency",
    template: "%s | Studio",
  },
  description:
    "A new-generation advertising agency delivering branding, strategy, digital marketing, web design, and integrated communications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Studio",
    title: "Studio | New-Generation Communications Agency",
    description:
      "Integrated communications across traditional and digital channels — strategy, design, and performance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
