import { Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { COMPANY, CONTACT, HEADQUARTERS_LABEL, NAV_LINKS, whatsappLink } from "../data/site";
import { Logo } from "../components/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel-200 bg-white">
      <div className="container-page py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12" />
              <span className="flex flex-col leading-none">
                <span className="text-base font-extrabold text-agro-950">
                  Terra Drone
                </span>
                <span className="mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-agro-600 uppercase">
                  Solutions
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-600">
              Pulverização agrícola de precisão e mapeamento aéreo com drones.
              Com sedes em {HEADQUARTERS_LABEL}, atendendo o Vale do Paraíba.
            </p>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <h2 className="text-sm font-bold text-agro-950">Navegação</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-2 text-sm text-steel-600 transition hover:text-agro-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="text-sm font-bold text-agro-950">Contato</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-steel-600">
              <li className="flex items-start gap-3">
                <MessageCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-agro-600"
                  aria-hidden="true"
                />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-agro-700"
                >
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-agro-600"
                  aria-hidden="true"
                />
                <a
                  href={CONTACT.emailUrl}
                  className="break-all transition hover:text-agro-700"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Camera
                  className="mt-0.5 h-4 w-4 shrink-0 text-agro-600"
                  aria-hidden="true"
                />
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-agro-700"
                >
                  @{CONTACT.instagram}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-agro-600"
                  aria-hidden="true"
                />
                <span>
                  Sedes: {HEADQUARTERS_LABEL}
                  <br />
                  {COMPANY.address.street}
                  <br />
                  {COMPANY.address.district} - {COMPANY.address.city}/
                  {COMPANY.address.state}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-agro-600"
                  aria-hidden="true"
                />
                <span>
                  {COMPANY.role}: {COMPANY.founder}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-steel-200 pt-6 text-xs text-steel-500 sm:mt-12 sm:flex-row sm:gap-3">
          <p>
            © {year} {COMPANY.name}. Todos os direitos reservados.
          </p>
          <p>
            Feito com cuidado para quem cultiva a terra. Desde{" "}
            {COMPANY.foundedYear}.
          </p>
        </div>
      </div>
    </footer>
  );
}
