import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to start your next project with Studio.",
};

export default function ContactPage() {
  return (
    <main className="bg-white pt-28 lg:pt-36">
      <section className="px-6 pb-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Contact
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-black lg:text-5xl">
            Get in touch
          </h1>
          <p className="mt-5 max-w-xl text-base text-gray-600">
            New project, partnership, or career opportunity — we&apos;re happy to
            help.
          </p>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
