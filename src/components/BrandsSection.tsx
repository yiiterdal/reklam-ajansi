import { brands } from "@/lib/brands";
import BrandsGrid from "@/components/BrandsGrid";
import BrandMarquee from "@/components/BrandMarquee";

type BrandsSectionProps = {
  showIntro?: boolean;
  showTitle?: boolean;
  limit?: number;
  showMarquee?: boolean;
  showComingSoon?: boolean;
};

export default function BrandsSection({
  showIntro = true,
  showTitle = true,
  limit,
  showMarquee = true,
  showComingSoon = true,
}: BrandsSectionProps) {
  const displayBrands = limit ? brands.slice(0, limit) : brands;

  return (
    <>
      {showIntro ? (
        <section className="bg-white px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-black sm:text-3xl lg:text-[2rem] lg:leading-[1.35]">
              We are a new-generation communications agency born in the digital age.
              <br className="hidden sm:block" />
              We use every traditional and digital communication method
              <br className="hidden sm:block" />
              to deliver integrated communications.
            </h2>
          </div>
        </section>
      ) : null}

      <section className="bg-white px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          {showTitle ? (
            <h2 className="mb-10 font-[family-name:var(--font-display)] text-3xl font-bold text-black lg:mb-14 lg:text-4xl">
              Our Brands
            </h2>
          ) : null}
          <BrandsGrid brands={displayBrands} />
          {showComingSoon ? (
            <p className="mt-16 text-center font-[family-name:var(--font-display)] text-base font-medium text-black/70 lg:mt-20 lg:text-lg">
              Full project case studies coming soon to our website…
            </p>
          ) : null}
        </div>
      </section>

      {showMarquee ? <BrandMarquee /> : null}
    </>
  );
}
