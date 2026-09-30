import type { Metadata } from "next";
import NewsJournal from "@/components/NewsJournal";

export const metadata: Metadata = {
  title: "News: Journal from the den",
  description:
    "Launches, process notes and side projects from Bearstow. What we're making, and what we learn while making it.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <main className="bg-white">
      <NewsJournal />
    </main>
  );
}
