'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Gem, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import type { Product } from '@/lib/agape/types';
import { finalPrice, formatPrice } from '@/lib/agape/types';
import { useCart } from '@/components/agape/cart/CartContext';
import { DIJES } from '@/lib/agape/customBracelet';
import { DijeSwatch } from '@/components/agape/personalizar/pulseraArt';

function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-oro/20">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="flex items-center gap-3 font-serif text-lg font-semibold text-royal">
          <span className="text-oro-deep">{icon}</span>
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="h-5 w-5 text-oro-deep" strokeWidth={1.75} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm leading-relaxed text-royal/70">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const tipo = product.productType ?? 'pulsera';
  const [dijeId, setDijeId] = useState(DIJES[0].id);
  const soldOut = product.stock < 1;
  const discount = product.discount ?? 0;
  const price = finalPrice(product);

  return (
    <div className="lg:sticky lg:top-28">
      <p className="section-eyebrow">Pulsera Ágape</p>
      <h1 className="mt-3 text-balance font-serif text-4xl font-bold leading-tight text-royal sm:text-5xl">
        {product.title}
      </h1>
      <div className="mt-5 flex flex-wrap items-baseline gap-3">
        <p className="font-serif text-3xl font-bold text-oro-deep">{formatPrice(price)}</p>
        {discount > 0 && (
          <>
            <p className="text-lg text-royal/40 line-through">{formatPrice(product.price)}</p>
            <span className="rounded-full bg-oro px-3 py-1 text-xs font-bold uppercase tracking-wider text-royal-ink">
              -{discount}%
            </span>
          </>
        )}
      </div>
      <p className="mt-5 leading-relaxed text-royal/70">{product.description}</p>

      {/* Dije picker — collar only */}
      <AnimatePresence initial={false}>
        {tipo === 'collar' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-royal/55">
                Medalla devocional
              </p>
              <div className="grid grid-cols-5 gap-2">
                {DIJES.map((option) => {
                  const selected = dijeId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setDijeId(option.id)}
                      aria-pressed={selected}
                      title={option.name}
                      className="group flex flex-col items-center gap-1.5"
                    >
                      <span
                        className={`relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-b from-white to-cielo-100/70 p-1 transition-all duration-300 ${
                          selected
                            ? 'ring-2 ring-oro ring-offset-2 ring-offset-white shadow-aura-soft'
                            : 'ring-1 ring-royal/10 group-hover:ring-oro/50'
                        }`}
                      >
                        <DijeSwatch id={option.id} />
                        {selected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-oro text-royal-ink shadow-aura-soft"
                          >
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </motion.span>
                        )}
                      </span>
                      <span className="text-center text-[0.55rem] font-medium leading-tight text-royal/60">
                        {option.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quantity + Add to cart */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex w-fit items-center gap-4 rounded-full border border-royal/15 bg-white/70 px-4 py-2.5">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Disminuir cantidad"
            className="rounded-full p-1 text-royal/60 transition-colors hover:text-oro-deep"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-6 text-center font-semibold text-royal">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
            aria-label="Aumentar cantidad"
            className="rounded-full p-1 text-royal/60 transition-colors hover:text-oro-deep"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <motion.div whileTap={{ scale: 0.97 }} className="flex-1">
          <button
            type="button"
            disabled={soldOut}
            onClick={() => addItem(product, quantity, { tipo, dijeId: tipo === 'collar' ? dijeId : undefined })}
            className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
            {soldOut ? 'Agotado' : 'Agregar al carrito'}
          </button>
        </motion.div>
      </div>

      {!soldOut && product.stock <= 5 && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-oro-deep">
          Solo quedan {product.stock} disponibles
        </p>
      )}

      {/* Trust strip */}
      <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-royal/60">
        <span className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-oro-deep" strokeWidth={1.75} />
          Envíos a toda Colombia
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-oro-deep" strokeWidth={1.75} />
          Elaborada a mano con amor
        </span>
      </div>

      {/* Care & materials */}
      <div className="mt-10 border-t border-oro/20">
        <Accordion
          title="Materiales y cuidado"
          icon={<Gem className="h-5 w-5" strokeWidth={1.75} />}
          defaultOpen
        >
          <p>
            Pepitas artesanales ensambladas a mano, con dije de Virgen Milagrosa y
            crucifijo. Pieza artesanal, pensada para el uso diario. Evita el
            contacto prolongado con agua y perfumes para conservar su acabado.
          </p>
        </Accordion>
      </div>
    </div>
  );
}
