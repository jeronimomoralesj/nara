import Link from "next/link";
import { Instagram, Facebook, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CopyButton } from "@/components/CopyButton";

const NEQUI = "3106605566";

const navGroups = [
  {
    title: "Navega",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Aliados", href: "/aliados" },
      { label: "Historias", href: "/historias" },
      { label: "Apoyar", href: "/#ayudar" },
    ],
  },
  {
    title: "Ecosistema",
    links: [
      { label: "Tienda Ágape", href: "/agape" },
      { label: "Alianzas PYMEs", href: "/#pymes" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Mail, href: "mailto:contacto@fundacionnara.org", label: "Correo" },
];

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-sand">
      <div className="container-content px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-charcoal-muted">
              Restauramos la dignidad de los adultos mayores abandonados en
              Colombia, una vida a la vez. Vivienda, salud y nutrición para
              quienes el mundo olvidó.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm text-charcoal-muted">
                Dona vía Nequi / Daviplata:
              </span>
              <CopyButton value={NEQUI} label={`${NEQUI}`} />
            </div>

            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal-muted transition-colors hover:border-blue-500 hover:text-blue-500"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:col-start-8">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-charcoal-muted transition-colors hover:text-charcoal"
                        >
                          {link.label}
                          <ArrowUpRight size={13} />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-charcoal-muted transition-colors hover:text-charcoal"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal-muted">
            © 2026 Fundación Nara. Entidad sin ánimo de lucro · Colombia. Todos
            los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-charcoal-muted transition-colors hover:text-charcoal">
              Política de privacidad
            </a>
            <a href="#" className="text-xs text-charcoal-muted transition-colors hover:text-charcoal">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
