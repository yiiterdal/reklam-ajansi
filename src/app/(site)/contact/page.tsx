import type { Metadata } from "next";
import ContactStudio from "@/components/ContactStudio";

export const metadata: Metadata = {
  title: "Contact: Start a Project",
  description:
    "Tell us about your brand, website or campaign. Get in touch with Bearstow at hello@bearstow.com and start your next project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactStudio />
    </main>
  );
}
