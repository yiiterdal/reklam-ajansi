import type { Metadata } from "next";
import PortfolioStudio from "@/components/PortfolioStudio";
import { PORTFOLIO_WORK } from "@/lib/workMedia";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected motion, brand films, and campaign loops from Bearstow — including Tatra House and recent studio work.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      <PortfolioStudio items={PORTFOLIO_WORK} />
    </main>
  );
}
