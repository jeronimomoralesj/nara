'use client';

import SmartImage from '@/components/agape/ui/SmartImage';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/agape/types';
import { finalPrice, formatPrice } from '@/lib/agape/types';
import { useCart } from '@/components/agape/cart/CartContext';
import { DIJES } from '@/lib/agape/customBracelet';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [tipo, setTipo] = useState<'pulsera' | 'collar'>('pulsera');

  const primaryImage = product.images[0] ?? '/agape/brand/pulseras.jpeg';
  const secondaryImage = product.images[1]; // revealed on hover when available
  const soldOut = product.stock < 1;
  const discount = product.discount ?? 0;
  const price = finalPrice(product);

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative overflow-hidden rounded-3xl border border-oro/15 bg-white/80 shadow-card transition-shadow duration-500 hover:shadow-luxe"
    >
      <Link href={`/agape/producto/${product._id}`} className="block">
        {/* Image with zoom + secondary-angle crossfade */}
        <div className="relative aspect-[4/5] overflow-hidden bg-cielo-100">
          <motion.div
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SmartImage
              src={primaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
            {secondaryImage && (
              <motion.div
                initial={false}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <SmartImage
                  src={secondaryImage}
                  alt={`${product.title} — vista alternativa`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Status badges */}
          <span className="absolute right-3 top-3 flex flex-col items-end gap-1.5 sm:right-4 sm:top-4">
            {discount > 0 && (
              <span className="rounded-full bg-oro px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-royal-ink shadow-aura-soft">
                -{discount}%
              </span>
            )}
            {soldOut && (
              <span className="rounded-full bg-royal-ink/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cielo-100">
                Agotado
              </span>
            )}
          </span>

          {/* Hover veil: "Explorar significado" */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-royal-ink/70 via-royal-ink/10 to-transparent pb-6"
          >
            <motion.span
              animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 rounded-full border border-oro/60 bg-cielo-50/90 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-royal backdrop-blur-sm"
            >
              <Eye className="h-3.5 w-3.5" />
              Ver detalle
            </motion.span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="px-3.5 pb-4 pt-3 sm:px-5 sm:pt-4">
          <h3 className="line-clamp-1 font-serif text-base font-semibold text-royal transition-colors duration-300 group-hover:text-oro-deep sm:text-lg">
            {product.title}
          </h3>
          <p className="mt-1 line-clamp-2 hidden text-sm leading-relaxed text-royal/60 sm:block">
            {product.description.length > 100
              ? product.description.slice(0, 100) + '…'
              : product.description}
          </p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 sm:mt-3">
            <span className="font-serif text-lg font-bold text-royal sm:text-xl">
              {formatPrice(price)}
            </span>
            {discount > 0 && (
              <span className="text-xs text-royal/40 line-through sm:text-sm">
                {formatPrice(product.price)}
              </span>
            )}
          </p>
        </div>
      </Link>

      {/* Type toggle + Quick add */}
      <div className="px-3.5 pb-4 sm:px-5 sm:pb-5 space-y-2">
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-oro/20 bg-cielo-100/60 p-1">
          {(['pulsera', 'collar'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={(e) => { e.preventDefault(); setTipo(t); }}
              aria-pressed={tipo === t}
              className={`rounded-xl py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                tipo === t
                  ? 'bg-gradient-to-br from-oro-light to-oro text-royal-ink shadow-aura-soft'
                  : 'text-royal/50 hover:text-royal'
              }`}
            >
              {t === 'pulsera' ? 'Pulsera' : 'Collar'}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={soldOut}
          onClick={() => addItem(product, 1, { tipo, dijeId: tipo === 'collar' ? DIJES[0].id : undefined })}
          className="btn-gold w-full !px-3 !py-2.5 !text-xs disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
        >
          <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="truncate">{soldOut ? 'Agotado' : 'Agregar'}</span>
        </button>
      </div>
    </motion.article>
  );
}
