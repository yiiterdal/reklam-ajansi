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
    if (email && message) setSubmitted(true);
  };

  return (
    <section className="border-t border-gray-200 bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-black lg:text-4xl">
            Tell us about your project
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600 lg:text-base">
            Brand launch, integrated campaign, or digital transformation — tell
            us your goals. We deliver creative solutions across ATL, BTL, and
            digital channels.
          </p>
          <div className="mt-10 space-y-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-black">Email</span>
              <br />
              hello@bearstow.agency
            </p>
            <p>
              <span className="font-semibold text-black">Phone</span>
              <br />
              +90 212 213 65 55
            </p>
            <p>
              <span className="font-semibold text-black">Address</span>
              <br />
              19 Mayis Cad. UBM Plaza, Sisli / Istanbul
            </p>
          </div>
        </div>

        <div>
          {submitted ? (
            <p className="text-lg text-black">Thank you! We&apos;ll be in touch soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full resize-none border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black"
                />
              </div>
              <MagneticButton>
                <button
                  type="submit"
                  className="bg-black px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
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
