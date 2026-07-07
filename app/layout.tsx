import type { Metadata } from "next";
import { Inter, Fraunces, Titan_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { NaraShell } from "@/components/NaraShell";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

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

const titanOne = Titan_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fundacionnara.org"),
  title: {
    default: "Fundación Nara — Dignidad para el adulto mayor en Colombia",
    template: "%s · Fundación Nara",
  },
  description:
    "Ayudamos a personas vulnerables en Colombia: adultos mayores, personas en la calle y familias en abandono. Donamos mercados y alimentos con el apoyo de Ágape.",
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
    <html lang="es" className={`${inter.variable} ${fraunces.variable} ${titanOne.variable}`}>
      <body className="min-h-screen bg-cream">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FT37WL7Y02"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FT37WL7Y02');
          `}
        </Script>
        <ScrollProgress />
        <NaraShell>
          {children}
        </NaraShell>
      </body>
    </html>
  );
}
