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
    </>
  );
}
