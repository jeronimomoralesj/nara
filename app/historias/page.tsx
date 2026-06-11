import type { Metadata } from "next";
import { HistoriasView } from "@/components/historias/HistoriasView";

export const metadata: Metadata = {
  title: "Historias",
  description:
    "Crónicas de dignidad recuperada, informes de transparencia y las voces detrás de Fundación Nara.",
};

export default function HistoriasPage() {
  return <HistoriasView />;
}
