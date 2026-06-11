import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fundacionnara.org"),
  title: {
    default: "Fundación Nara — Dignidad para el adulto mayor en Colombia",
    template: "%s · Fundación Nara",
  },
  description:
    "Restauramos la dignidad de los adultos mayores abandonados en Colombia. Vivienda, salud y nutrición para quienes el mundo olvidó.",
  keywords: [
    "Fundación Nara",
    "adulto mayor",
    "Colombia",
    "donaciones",
    "Agape",
    "responsabilidad social",
    "Nequi",
    "Daviplata",
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
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-cream">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
