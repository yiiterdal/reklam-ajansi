import Link from "next/link";
import BearLogo from "@/components/BearLogo";

const footerNav = {
  agency: [
    { label: "About", href: "/about" },
    { label: "Our Brands", href: "/brands" },
    { label: "Careers", href: "/contact" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy Summary", href: "#" },
    { label: "Web Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "X", href: "https://x.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 h-64 w-64 rounded-full bg-fuchsia-600/15 blur-[90px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <div className="mb-5">
              <BearLogo variant="horizontal" size={36} className="shrink-0 brightness-0 invert" />
            </div>
            <ul className="space-y-2.5">
              {footerNav.agency.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/65 transition-colors hover:text-violet-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-cream/90">
              Privacy
            </p>
            <ul className="space-y-2.5">
              {footerNav.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/65 transition-colors hover:text-violet-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-cream/90">
              Address
            </p>
            <address className="not-italic text-sm leading-relaxed text-cream/65">
              19 Mayis Mah. 19 Mayis Cad.
              <br />
              UBM Plaza No:37 Floor 3 Suite 9 Sisli
              <br />
              Istanbul, Turkey
            </address>
          </div>

          <div>
            <p className="mb-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-cream/90">
              Get in Touch
            </p>
            <ul className="space-y-2 text-sm text-cream/65">
              <li>
                <a href="tel:+902122136555" className="transition-colors hover:text-violet-200">
                  Phone: +90 212 213 65 55
                </a>
              </li>
              <li>
                <a href="mailto:careers@bearstow.agency" className="transition-colors hover:text-violet-200">
                  Careers: careers@bearstow.agency
                </a>
              </li>
              <li>
                <a href="mailto:hello@bearstow.agency" className="transition-colors hover:text-violet-200">
                  General: hello@bearstow.agency
                </a>
              </li>
            </ul>

            <p className="mb-4 mt-8 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-cream/90">
              Follow Us
            </p>
            <ul className="space-y-2.5">
              {footerNav.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cream/65 transition-colors hover:text-violet-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-sm text-cream/45">
            © Bearstow Agency 2026 — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
