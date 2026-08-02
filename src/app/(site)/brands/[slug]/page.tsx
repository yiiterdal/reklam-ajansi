import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { visualForIndex } from "@/lib/visuals";
import AnimatedVisual from "@/components/AnimatedVisual";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return { title: "Brand not found" };

  return {
    title: brand.name,
    description: `${brand.name} — ${brand.services.join(", ")}`,
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brandIndex = brands.findIndex((b) => b.slug === slug);
  const brand = brandIndex >= 0 ? brands[brandIndex] : undefined;
  if (!brand) notFound();

  return (
    <main className="bg-[#1c1c1c] text-[#f2f2f2]">
      <section className="relative min-h-[70svh] overflow-hidden lg:min-h-[78svh]">
        <div className="absolute inset-0">
          <AnimatedVisual
            src={visualForIndex(brandIndex)}
            alt=""
            index={brandIndex}
            priority
            sizes="100vw"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-black/40" />
        </div>

        <div className="relative mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:min-h-[78svh] lg:px-12 lg:pb-20">
          <Link
            href="/brands"
            className="mb-8 w-fit text-sm font-medium text-white/55 transition hover:text-white"
          >
            ← Our Brands
          </Link>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.5rem)] font-bold uppercase leading-[0.98] tracking-tight text-white">
            {brand.name}
          </h1>
          <ul className="mt-6 flex flex-wrap gap-2">
            {brand.services.map((service) => (
              <li
                key={service}
                className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm text-white/75 ring-1 ring-white/10"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
              Partnership
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">
              We build brand systems, campaigns, and digital surfaces with{" "}
              {brand.name} — work that holds across culture, product, and the
              feed.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3 lg:col-span-5 lg:items-end">
            <Link
              href="/portfolio"
              className="inline-flex w-fit rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/15"
            >
              See related work
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
