import type { Metadata } from "next";
import { AliadosView } from "@/components/aliados/AliadosView";

export const metadata: Metadata = {
  title: "Aliados",
  description:
    "El ecosistema de marcas y empresas que hacen posible la misión de Fundación Nara. Encabezado por Agape, socio fundador.",
};

export default function AliadosPage() {
  return <AliadosView />;
}
