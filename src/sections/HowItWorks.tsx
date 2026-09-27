import { STEPS, whatsappLink } from "../data/site";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { MessageCircle } from "lucide-react";

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section-pad scroll-mt-24 bg-steel-50"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Como funciona"
            title={
              <>
                Do primeiro contato ao relatório,{" "}
                <span className="text-agro-600">em 4 etapas</span>
              </>
            }
            description="Um processo simples e documentado. Você acompanha tudo pelo WhatsApp e recebe o resultado da operação."
          />
        </Reveal>

        <ol className="relative mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {/* Trilha horizontal apenas no desktop */}
          <span
            className="absolute top-6 right-0 left-0 hidden h-px bg-linear-to-r from-agro-300 via-agro-200 to-agro-300 xl:block"
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 100}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-steel-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-agro-300 hover:shadow-lg sm:p-6">
                {/* Número grande no fundo */}
                <span
                  className="pointer-events-none absolute top-4 right-5 text-5xl font-extrabold text-agro-50 transition group-hover:text-agro-100"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-agro-600 text-white shadow-md shadow-agro-600/25 transition group-hover:bg-agro-700">
                  <Icon name={step.icon} className="h-5.5 w-5.5" />
                </span>

                <h3 className="relative z-10 mt-5 text-base font-bold text-agro-950">
                  {step.title}
                </h3>
                <p className="relative z-10 mt-2.5 mb-5 text-sm leading-relaxed text-steel-600">
                  {step.description}
                </p>

                <span className="relative z-10 mt-auto inline-block self-start rounded-full bg-agro-50 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-agro-700 uppercase ring-1 ring-agro-200">
                  Etapa {step.number}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-agro-200 bg-white p-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-base font-bold text-agro-950">
                Quer começar pela etapa 01?
              </p>
              <p className="mt-1 text-sm text-steel-600">
                Fale com o responsável técnico e receba uma avaliação da sua
                área sem compromisso.
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0"
            >
              <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
              Falar agora
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
