import { Quote, Star } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { whatsappLink } from "../data/site";

/**
 * Prova social: a empresa é nova (2024), então não publicamos
 * depoimentos inventados. A seção apresenta o que já é verificável
 * e convida o produtor a ser o primeiro caso de sucesso da região.
 */
export function Testimonials() {
  return (
    <section className="section-pad bg-steel-50">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Prova social"
            title={
              <>
                Uma empresa nova, com{" "}
                <span className="text-agro-600">padrão antigo</span>
              </>
            }
            description="Preferimos mostrar trabalho a inventar testemunhos. Estes são os nossos compromissos com quem cultiva na região."
          />
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {[
            {
              title: "Time na região",
              text: "Atendemos Resende, Lorena e o Vale do Paraíba com equipe própria. Se você fala com a gente, quem responde conhece a sua área.",
            },
            {
              title: "Operação documentada",
              text: "Toda aplicação gera registro, mapa e relatório. Rastreabilidade do que foi aplicado, em que área e em que data.",
            },
            {
              title: "Responsável técnico identificado",
              text: "Operação conduzida por Gustavo Pereira Gonçalves, fundador da Terra Drone Solutions. Você fala direto com quem responde.",
            },
          ].map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 90}>
              <div className="card-base relative h-full p-6 sm:p-7">
                <Quote
                  className="absolute top-6 right-6 h-7 w-7 text-agro-100"
                  aria-hidden="true"
                />
                <div
                  className="flex gap-1"
                  aria-label="Compromisso com qualidade"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-agro-500 text-agro-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <h3 className="mt-4 text-base font-bold text-agro-950">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-steel-600">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-8 px-2 text-center text-sm text-steel-500 sm:mt-12">
            Em breve publicamos aqui os depoimentos de quem já fez operação com
            a gente.{" "}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-agro-700 underline underline-offset-4 hover:text-agro-800"
            >
              Seja o primeiro
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
