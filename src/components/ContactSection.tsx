"use client";

import { useState } from "react";
import { m } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    const subject = encodeURIComponent(
      name ? `Project enquiry — ${name}` : "Project enquiry",
    );
    const body = encodeURIComponent(
      `${message}\n\n—\n${name || "—"}\n${email}`,
    );
    window.location.href = `mailto:hello@bearstow.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="border-t border-white/10 bg-[#1c1c1c] py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#f2f2f2] lg:text-4xl">
            Tell us about your project
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 lg:text-base">
            Brand launch, integrated campaign, or digital transformation — tell
            us your goals. We deliver creative solutions across ATL, BTL, and
            digital channels.
          </p>
          <div className="mt-10 space-y-4 text-sm text-white/55">
            <p>
              <span className="font-semibold text-[#f2f2f2]">Email</span>
              <br />
              <a
                href="mailto:hello@bearstow.com"
                className="transition hover:text-white"
              >
                hello@bearstow.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-[#f2f2f2]">Phone</span>
              <br />
              +90 212 213 65 55
            </p>
            <p>
              <span className="font-semibold text-[#f2f2f2]">Address</span>
              <br />
              19 Mayis Cad. UBM Plaza, Sisli / Istanbul
            </p>
          </div>
        </div>

        <div>
          {submitted ? (
            <p className="text-lg text-[#f2f2f2]">Thank you! We&apos;ll be in touch soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-white/15 bg-transparent py-2 text-sm text-white outline-none focus:border-white/50"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-b border-white/15 bg-transparent py-2 text-sm text-white outline-none focus:border-white/50"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full resize-none border-b border-white/15 bg-transparent py-2 text-sm text-white outline-none focus:border-white/50"
                />
              </div>
              <MagneticButton>
                <button
                  type="submit"
                  className="bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-white/85"
                >
                  Send
                </button>
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
