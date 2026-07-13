import Link from "next/link";

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
    <footer className="border-t border-gray-200 bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className="mb-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
              Studio
            </p>
            <ul className="space-y-2.5">
              {footerNav.agency.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
              Privacy
            </p>
            <ul className="space-y-2.5">
              {footerNav.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
              Address
            </p>
            <address className="not-italic text-sm leading-relaxed text-gray-600">
              19 Mayis Mah. 19 Mayis Cad.
              <br />
              UBM Plaza No:37 Floor 3 Suite 9 Sisli
              <br />
              Istanbul, Turkey
            </address>
          </div>

          <div>
            <p className="mb-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
              Get in Touch
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="tel:+902122136555" className="hover:text-black">
                  Phone: +90 212 213 65 55
                </a>
              </li>
              <li>
                <a href="mailto:job@studio.com" className="hover:text-black">
                  Careers: job@studio.com
                </a>
              </li>
              <li>
                <a href="mailto:contact@studio.com" className="hover:text-black">
                  General: contact@studio.com
                </a>
              </li>
            </ul>

            <p className="mb-4 mt-8 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
              Follow Us
            </p>
            <ul className="space-y-2.5">
              {footerNav.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 transition-colors hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">© Studio 2026 — All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
