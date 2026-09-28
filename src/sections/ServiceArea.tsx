import { HEADQUARTERS_LABEL } from "../data/site";
import { ServiceAreaMap } from "../components/ServiceAreaMap";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

export function ServiceArea() {
  return (
    <section id="area" className="section-pad scroll-mt-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Área de atuação"
            title={<>Onde <span className="text-agro-600">atendemos</span></>}
            description={`Nossas sedes ficam em ${HEADQUARTERS_LABEL}.`}
          />
        </Reveal>
        <Reveal className="mt-10 sm:mt-14">
          <ServiceAreaMap />
        </Reveal>
      </div>
    </section>
  );
}
