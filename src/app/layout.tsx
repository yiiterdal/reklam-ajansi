import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a0f24",
};

export const metadata: Metadata = {
  title: {
    default: "Bearstow Agency | New-Generation Communications Agency",
    template: "%s | Bearstow Agency",
  },
  description:
    "A new-generation advertising agency delivering branding, strategy, digital marketing, web design, and integrated communications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bearstow Agency",
    title: "Bearstow Agency | New-Generation Communications Agency",
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
    <html lang="en" className={`${jakarta.variable} ${syne.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
