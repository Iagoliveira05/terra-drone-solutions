import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { COMPANY, NAV_LINKS, whatsappLink } from "../data/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  // Fecha o menu ao voltar para o desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-steel-200/80 bg-white/90 backdrop-blur-lg transition-shadow duration-300">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <a
          href="#topo"
          className="flex items-center gap-2.5"
          aria-label={`${COMPANY.name} — início`}
        >
          <Logo className="h-10 w-10 md:h-11 md:w-11" />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-tight text-agro-950 md:text-base">
              Terra Drone
            </span>
            <span className="mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-agro-600 uppercase md:text-[11px]">
              Solutions
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-steel-700 transition hover:bg-agro-50 hover:text-agro-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-agro-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-agro-600/25 transition hover:bg-agro-700 sm:inline-flex"
          >
            Fale no WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-steel-200 bg-white/90 text-agro-900 shadow-sm transition hover:bg-agro-50 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {open && (
        <>
          {/* Overlay */}
          <button
            type="button"
            aria-label="Fechar menu ao tocar fora"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-steel-950/40 backdrop-blur-sm md:hidden"
          />
          <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-steel-200 bg-white pb-4 shadow-2xl md:hidden">
            <nav
              className="container-page flex flex-col pt-3"
              aria-label="Navegação mobile"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-13 items-center rounded-xl px-3 text-base font-semibold text-steel-700 transition hover:bg-agro-50 hover:text-agro-700"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 flex min-h-13 items-center justify-center rounded-xl bg-agro-600 px-4 text-base font-bold text-white shadow-md shadow-agro-600/25"
              >
                Fale no WhatsApp
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
