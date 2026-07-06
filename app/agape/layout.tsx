import { CartProvider } from '@/components/agape/cart/CartContext';
import Header from '@/components/agape/layout/Header';
import { Footer } from '@/components/Footer';
import CartSidebar from '@/components/agape/cart/CartSidebar';

export const metadata = {
  title: {
    default: 'Ágape — Pulseras y Collares Artesanales | Colombia',
    template: '%s · Ágape',
  },
  description:
    'Compra pulseras y collares católicos artesanales hechos a mano en Colombia. Pepitas de colores, Virgen Milagrosa y crucifijo. Cada compra dona mercados a personas vulnerables.',
};

export default function AgapeLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col font-sans bg-cielo-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  );
}
