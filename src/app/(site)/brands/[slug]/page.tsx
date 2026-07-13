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
    <main className="bg-white pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <Link
          href="/brands"
          className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
        >
          ← Our Brands
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[29/18] overflow-hidden bg-gray-100">
            <AnimatedVisual
              src={visualForIndex(brandIndex)}
              alt=""
              index={brandIndex}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0"
            />
          </div>

          <div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold uppercase text-black lg:text-5xl">
              {brand.name}
            </h1>
            <ul className="mt-8 space-y-2">
              {brand.services.map((service) => (
                <li key={service} className="text-base text-gray-600">
                  {service}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-gray-500">
              Full project details coming soon to our website.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
