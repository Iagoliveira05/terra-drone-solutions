import { MapPin, Navigation } from "lucide-react";
import { COMPANY, REGIONS } from "../data/site";
import { RegionMapIllustration } from "../components/Illustrations";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

export function ServiceArea() {
  return (
    <section id="area" className="section-pad scroll-mt-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Área de atuação"
            title={
              <>
                Raízes no Vale do Paraíba,{" "}
                <span className="text-agro-600">de três estados</span>
              </>
            }
            description="Operação própria em Resende e Lorena, com deslocamento para toda a tríplice fronteira RJ, SP e MG."
          />
        </Reveal>

        <div className="mt-10 grid items-center gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative mx-auto w-full max-w-xs sm:max-w-md lg:max-w-none">
              <RegionMapIllustration className="w-full rounded-3xl shadow-xl shadow-agro-950/10 ring-1 ring-steel-200" />
              <div className="absolute -top-3 right-0 flex items-center gap-2 rounded-2xl border border-steel-200 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur sm:-right-3 sm:px-4 sm:py-2.5">
                <Navigation className="h-4 w-4 text-agro-600" aria-hidden="true" />
                <span className="text-xs font-bold text-agro-950">
                  Tríplice fronteira
                </span>
              </div>
            </div>
          </Reveal>

          <ul className="space-y-4 sm:space-y-5">
            {REGIONS.map((region, index) => (
              <Reveal as="li" key={region.name} delay={index * 90}>
                <div
                  className={`card-base flex gap-3.5 p-5 sm:gap-4 sm:p-6 ${
                    region.highlight ? "border-agro-200 bg-agro-50/40" : ""
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      region.highlight
                        ? "bg-agro-600 text-white"
                        : "bg-steel-100 text-steel-600"
                    }`}
                  >
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-agro-950">
                        {region.name}
                      </h3>
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-agro-700 ring-1 ring-agro-200">
                        {region.role}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-steel-600">
                      {region.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={120}>
          <p className="mt-8 px-2 text-center text-sm text-steel-500 sm:mt-10">
            Sediada em{" "}
            <strong className="font-semibold text-agro-800">
              {COMPANY.address.city} - {COMPANY.address.state}
            </strong>
            {" · "}Fale com a gente para verificar a viabilidade na sua
            propriedade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
