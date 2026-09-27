import { Check } from "lucide-react";
import { SERVICES } from "../data/site";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

const ACCENTS = {
  agro: {
    tile: "bg-agro-50 text-agro-600 ring-agro-100",
    glow: "group-hover:shadow-agro-600/10",
  },
  sky: {
    tile: "bg-lime-50 text-lime-700 ring-lime-200",
    glow: "group-hover:shadow-lime-600/10",
  },
} as const;

export function Services() {
  return (
    <section id="servicos" className="section-pad scroll-mt-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Serviços"
            title={
              <>
                Serviços com drones{" "}
                <span className="text-agro-600">para o agronegócio</span>
              </>
            }
            description="Do diagnóstico da lavoura ao levantamento do terreno: um drone, várias respostas para o produtor rural."
          />
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {SERVICES.map((service, index) => {
            const accent = ACCENTS[service.accent];
            return (
              <Reveal as="li" key={service.id} delay={index * 80}>
                <article
                  id={service.id}
                  className={`card-base group h-full p-6 sm:p-7 ${accent.glow}`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${accent.tile}`}
                  >
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>

                  <h3 className="mt-5 text-lg font-bold text-agro-950">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-steel-100 pt-5">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-steel-600"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-agro-500"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
