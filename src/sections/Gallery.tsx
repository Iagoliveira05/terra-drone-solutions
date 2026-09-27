import { Images } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { GalleryCarousel } from "../components/GalleryCarousel";

export function Gallery() {
  return (
    <section id="galeria" className="section-pad scroll-mt-24 bg-steel-50">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Galeria"
            title={<>Trabalho de campo</>}
            description="Operações reais na região: pulverização em lavouras, encostas e pastagens, e a equipe que atende cada produtor."
          />
        </Reveal>

        <Reveal delay={110} className="mt-9 sm:mt-12">
          <GalleryCarousel />
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-7 flex flex-col items-center justify-center gap-2 text-center text-sm text-steel-500 sm:mt-8 sm:flex-row sm:gap-1.5">
            <Images className="h-4 w-4 text-agro-500" aria-hidden="true" />
            Mais imagens no Instagram
            <a
              href="https://instagram.com/terradronesolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-agro-700 underline underline-offset-4 hover:text-agro-800"
            >
              @terradronesolutions
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
