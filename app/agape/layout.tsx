import { CartProvider } from '@/components/agape/cart/CartContext';
import Header from '@/components/agape/layout/Header';
import { Footer } from '@/components/Footer';
import CartSidebar from '@/components/agape/cart/CartSidebar';

export const metadata = {
  title: {
    default: 'Ágape — Pulseras Católicas de Cristal y Oro | Colombia',
    template: '%s · Ágape',
  },
  description:
    'Compra pulseras católicas artesanales de cristal y baño de oro 18k en Colombia. Joyería religiosa inspirada en los Misterios del Santo Rosario.',
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
