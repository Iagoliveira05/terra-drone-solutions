import { TiltSurface } from "../components/TiltSurface";
import { BENEFITS } from "../data/site";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";

export function Benefits() {
  return (
    <section
      id="diferenciais"
      className="section-pad relative scroll-mt-24 overflow-hidden bg-agro-950 text-white"
    >
      <div className="field-perspective" aria-hidden="true"><div /></div>
      <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-sun-500/20 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-agro-600/25 blur-3xl" />

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow bg-agro-900/60 text-agro-200 ring-agro-700">
              Por que escolher a Terra Drone
            </p>
            <h2 className="mt-4 text-[1.75rem] font-extrabold tracking-tight text-white sm:text-4xl">
              Tecnologia que aparece no{" "}
              <span className="text-agro-300">resultado da safra</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-agro-100/75 sm:text-lg">
              Não é enfeite: é reduzir custo por hectare, proteger o solo e
              fazer a lavoura render mais com o mesmo investimento.
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <Reveal as="li" key={benefit.title} delay={index * 70}>
              <TiltSurface className="group h-full rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-agro-400/40 hover:bg-white/10 sm:p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-agro-400/15 text-agro-300 ring-1 ring-agro-400/25 transition group-hover:bg-agro-400/25 group-hover:text-agro-200">
                  <Icon name={benefit.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-agro-100/70">
                  {benefit.description}
                </p>
              </TiltSurface>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
