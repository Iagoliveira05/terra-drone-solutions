import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { COMPANY, STATS, whatsappLink } from "../data/site";
import { Reveal } from "../components/Reveal";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-24"
    >
      {/* Fundo */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-agro-50 via-lime-50 to-white" />
      <div className="bg-grid-agro absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -top-24 -left-24 -z-10 h-80 w-80 rounded-full bg-agro-200/40 blur-3xl" />
      <div className="absolute top-10 right-0 -z-10 h-96 w-96 rounded-full bg-sun-200/40 blur-3xl" />

      <div className="container-page grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="section-eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Agricultura de precisão · Resende - RJ
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-5 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-agro-950 sm:mt-6 sm:text-5xl md:text-6xl">
              Pulverização com{" "}
              <span className="relative whitespace-nowrap">
                <span className="bg-linear-to-r from-agro-600 to-lime-500 bg-clip-text text-transparent">
                  drones
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-agro-300"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C50 3 150 3 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              no Vale do Paraíba.
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-steel-600 sm:text-lg">
              Menos deriva, menos desperdício de insumo e mais produtividade por
              hectare. A{" "}
              <strong className="font-semibold text-agro-800">
                {COMPANY.name}
              </strong>{" "}
              aplica defensivos e fertilizantes por via aérea com rotas
              calculadas e controle de vazão em tempo real — sem expor o
              trabalhador e alcança áreas onde o maquinário não entra.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
                Solicitar orçamento no WhatsApp
              </a>
              <a href="#servicos" className="btn-secondary w-full sm:w-auto">
                Ver serviços
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <dl className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-steel-200 pt-6 sm:mt-12 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-6 sm:pt-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-lg font-extrabold text-agro-800 sm:text-2xl">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-xs leading-snug text-steel-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative order-last lg:order-none">
          <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
            <div className="absolute -inset-3 -z-10 rounded-4xl bg-linear-to-br from-agro-200/50 to-sun-200/50 blur-2xl sm:-inset-4" />
            <img
              src="/galeria/drone-pulverizando-milho.jpg"
              width={1600}
              height={2679}
              alt="Drone agrícola pulverizando sobre uma lavoura de milho"
              fetchPriority="high"
              decoding="async"
              className="aspect-4/3 w-full rounded-3xl object-cover shadow-2xl shadow-agro-950/15 ring-1 ring-white sm:aspect-auto sm:rounded-4xl"
            />

            {/* Selo flutuante */}
            <div className="animate-float absolute -bottom-4 left-3 flex items-center gap-2.5 rounded-2xl border border-steel-200 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur sm:-bottom-5 sm:left-6 sm:gap-3 sm:px-4 sm:py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-agro-50 text-agro-600">
                <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-agro-950">
                  Bicos antideriva
                </p>
                <p className="text-xs text-steel-500">
                  Aplicação dentro da área
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
