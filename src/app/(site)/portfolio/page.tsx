import type { Metadata } from "next";
import PortfolioStudio from "@/components/PortfolioStudio";
import { PORTFOLIO_WORK } from "@/lib/workMedia";

export const metadata: Metadata = {
  title: "Work: Selected Projects",
  description:
    "Selected branding, motion and campaign work from Bearstow, including brand films, identity systems and recent studio projects.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      <PortfolioStudio items={PORTFOLIO_WORK} />
    </main>
  );
}
