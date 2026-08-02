import type { Metadata } from "next";
import ContactStudio from "@/components/ContactStudio";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to start your next project with Bearstow Agency.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#1c1c1c]">
      <ContactStudio />
    </main>
  );
}
