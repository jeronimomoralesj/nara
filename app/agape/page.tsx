import Image from 'next/image';
import BrandBanner from '@/components/agape/home/BrandBanner';
import MarketplaceShop from '@/components/agape/shop/MarketplaceShop';
import MisterioDelDia from '@/components/agape/home/MisterioDelDia';
import RosaryGuide from '@/components/agape/home/RosaryGuide';
import JsonLd from '@/components/agape/seo/JsonLd';
import { fetchProducts } from '@/lib/agape/products';
import { itemListJsonLd } from '@/lib/agape/seo';

export const revalidate = 120; // keep the storefront fresh

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <>
      <JsonLd data={itemListJsonLd(products)} />
      <BrandBanner />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <MarketplaceShop products={products} />
      </div>
      <MisterioDelDia />
      <RosaryGuide />

      {/* Real product gallery — show shoppers what the bracelets actually look like */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-oro-deep sm:text-xs">
            Hechas a mano con amor
          </p>
          <h2 className="mx-auto mt-3 max-w-lg font-serif text-3xl font-bold text-royal sm:text-4xl">
            Así lucen nuestras pulseras
          </h2>
          <div className="gold-divider mt-5" />
          <p className="mx-auto mt-4 max-w-md text-sm text-royal/65 sm:text-base">
            Cada pieza es única — ensamblada a mano, pieza por pieza, como una oración hecha solo para ti.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl shadow-luxe">
          <Image
            src="/agape/brand/pulseras-variedad.png"
            alt="Colección de pulseras Ágape artesanales en distintos colores con la Virgen Milagrosa y crucifijo"
            width={1200}
            height={900}
            className="h-auto w-full object-cover"
            priority={false}
          />
        </div>
      </section>
    </>
  );
}
