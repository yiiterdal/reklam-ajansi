"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-sm text-accent-light">Thank you! We&apos;ll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 border-b border-cream/20 bg-transparent px-1 py-2 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-cream/50"
      />
      <button
        type="submit"
        className="px-3 py-2 text-sm text-cream/70 transition-colors hover:text-cream"
        aria-label="Subscribe"
      >
        →
      </button>
    </form>
  );
}
