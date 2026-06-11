import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fundación Nara — Dignidad para el adulto mayor en Colombia",
  description:
    "Fundación Nara restaura la dignidad de los adultos mayores abandonados en Colombia. Vivienda, salud y nutrición para quienes el mundo olvidó.",
  keywords: [
    "Fundación Nara",
    "adulto mayor",
    "Colombia",
    "donaciones",
    "Agape",
    "responsabilidad social",
  ],
  openGraph: {
    title: "Fundación Nara — Dignidad para el adulto mayor en Colombia",
    description:
      "Restauramos la dignidad de los adultos mayores abandonados en Colombia.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
