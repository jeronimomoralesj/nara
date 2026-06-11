import { Instagram, Facebook, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const AGAPE_URL = "https://agape-rust.vercel.app";

const navGroups = [
  {
    title: "Fundación",
    links: [
      { label: "Nuestra misión", href: "#mision" },
      { label: "Cómo ayudar", href: "#ayudar" },
      { label: "Visión futura", href: "#vision" },
    ],
  },
  {
    title: "Aliados",
    links: [
      { label: "Agape", href: AGAPE_URL, external: true },
      { label: "Alianzas PYMEs", href: "#vision" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Mail, href: "mailto:contacto@fundacionnara.org", label: "Correo" },
];

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-charcoal/10 bg-alabaster">
      <div className="container-content px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal-muted">
              Restaurando la dignidad de los adultos mayores abandonados en
              Colombia, una vida a la vez.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal-muted transition-colors hover:border-terracotta-500 hover:text-terracotta-500"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:col-start-8">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={
                          "external" in link && link.external
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          "external" in link && link.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-sm text-charcoal-muted transition-colors hover:text-charcoal"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal-muted">
            © {year} Fundación Nara. Entidad sin ánimo de lucro · Colombia.
            Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-charcoal-muted transition-colors hover:text-charcoal"
            >
              Política de privacidad
            </a>
            <a
              href="#"
              className="text-xs text-charcoal-muted transition-colors hover:text-charcoal"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
