import { Clock3, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { CONTACT, COMPANY, whatsappLink } from "../data/site";
import { Reveal } from "../components/Reveal";

export function FinalCta() {
  return (
    <section id="contato" className="section-pad scroll-mt-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-agro-900 px-5 py-12 sm:px-12 sm:rounded-4xl sm:py-20">
            <div className="absolute inset-0 bg-grid-agro opacity-15" />
            <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-sun-400/25 blur-3xl" />
            <div className="absolute -bottom-28 -left-10 h-80 w-80 rounded-full bg-agro-500/30 blur-3xl" />

            <div className="relative mx-auto max-w-3xl text-center">
              <p className="section-eyebrow bg-white/10 text-agro-200 ring-white/20">
                Vamos conversar
              </p>

              <h2 className="mt-6 text-[1.75rem] leading-tight font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Sua lavoura merece ser tratada com{" "}
                <span className="text-lime-300">precisão de centímetro</span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-agro-100/80 sm:text-lg">
                Conte como é a sua produção — cultura, área e praga — e receba
                uma proposta de pulverização aérea com custo por hectare. Sem
                compromisso.
              </p>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-agro-800 shadow-xl transition hover:bg-agro-50 active:scale-[0.98] sm:w-auto"
                >
                  <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
                  Solicitar orçamento
                </a>
                <a
                  href={CONTACT.emailUrl}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                >
                  <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                  {CONTACT.whatsappDisplay}
                </a>
              </div>

              <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-agro-100/70 sm:mt-10 sm:flex-row sm:gap-7">
                <li className="flex items-center gap-2">
                  <Clock3
                    className="h-4 w-4 text-agro-300"
                    aria-hidden="true"
                  />
                  Resposta no mesmo dia
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 text-agro-300"
                    aria-hidden="true"
                  />
                  {COMPANY.role}: {COMPANY.founder}
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
