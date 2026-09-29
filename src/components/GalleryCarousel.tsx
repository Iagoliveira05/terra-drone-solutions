import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, type GalleryItem } from "../data/gallery";

const AUTOPLAY_MS = 6500;

/**
 * Galeria responsiva da Terra Drone Solutions.
 *
 * 1 foto por slide no mobile e 2 no desktop. A decisão é tomada por
 * media query (e não por CSS) porque muda a própria lógica do agrupamento:
 * com uma foto os slides são as imagens; com duas, são pares.
 *
 * As setas ficam nas laterais da grade no desktop, fora do box da foto,
 * para não cobrir as etiquetas. No mobile descem para baixo da foto em
 * par compacto: dividi-las nas laterais custaria ~90px de largura útil e
 * deixaria cada foto com ~110px, apertado demais.
 */
export function GalleryCarousel() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [navigationVersion, setNavigationVersion] = useState(0);
  const autoplayTimer = useRef<number | undefined>(undefined);

  const resetAutoplay = useCallback(() => {
    window.clearTimeout(autoplayTimer.current);
    setNavigationVersion((version) => version + 1);
  }, []);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsDesktop(e.matches);
    apply(mq);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const perSlide = isDesktop ? 2 : 1;
  const count = Math.ceil(GALLERY.length / perSlide);
  const index = Math.min(i, count - 1);

  const go = useCallback(
    (dir: 1 | -1) => {
      resetAutoplay();
      setI((cur) => {
        const safe = Math.min(cur, count - 1);
        return (safe + dir + count) % count;
      });
    },
    [count, resetAutoplay],
  );

  // Prepare only the next slide when the gallery is near the viewport.
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const nextStart = ((index + 1) % count) * perSlide;
      GALLERY.slice(nextStart, nextStart + perSlide).forEach((item) => {
        const img = new Image();
        img.src = item.src;
      });
      observer.disconnect();
    }, { rootMargin: "200px" });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, [index, count, perSlide]);

  useEffect(() => {
    if (count <= 1) return;

    // Cada slide recebe o tempo completo, inclusive apos navegacao manual.
    autoplayTimer.current = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(autoplayTimer.current);
  }, [count, go, navigationVersion]);

  // O índice é derivado e sempre fica dentro do intervalo válido: ao
  // rotar a tela, `count` muda e `i` é recortado sem provocar render
  // extra nem efeito colateral.
  const start = index * perSlide;
  const current = GALLERY.slice(start, start + perSlide);

  const arrow = (dir: 1 | -1, label: string) => (
    <button
      type="button"
      onClick={() => go(dir)}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-steel-200 bg-white text-steel-700 shadow-sm transition hover:border-agro-300 hover:bg-agro-50 hover:text-agro-700 active:scale-95 sm:h-10 sm:w-10"
    >
      {dir === -1 ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );

  return (
    <div ref={galleryRef}>
      {isDesktop ? (
        <div className="flex items-center gap-4">
          {arrow(-1, "Fotos anteriores")}
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-4">
            {current.map((item) => (
              <Slide key={item.src} item={item} />
            ))}
          </div>
          {arrow(1, "Próximas fotos")}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1">
            {current.map((item) => (
              <Slide key={item.src} item={item} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            {arrow(-1, "Foto anterior")}
            {arrow(1, "Próxima foto")}
          </div>
        </div>
      )}

      {/* Legenda do slide */}
      <p className="mt-4 min-h-16 text-sm leading-relaxed text-steel-600 sm:mt-5 sm:min-h-12 sm:text-base">
        {current[0].caption}
      </p>

      {/* Paginação compacta: 12 indicadores não caberiam em 390px.
          Mostra apenas vizinho do atual, com total ao lado. */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:mt-5">
        <ul className="flex items-center gap-0.5">
          {Array.from({ length: count })
            .map((_s, n) => n)
            .filter(
              (n) =>
                n === 0 ||
                n === count - 1 ||
                n === index - 1 ||
                n === index ||
                n === index + 1,
            )
            .map((n) => (
              <li key={n} className="flex items-center">
                {(n === index - 1 || n === index + 1) && n !== 0 && (
                  <span
                    className="px-0.5 text-xs text-steel-400"
                    aria-hidden="true"
                  >
                    …
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    resetAutoplay();
                    setI(n);
                  }}
                  aria-label={`Ir para a foto ${n + 1}`}
                  aria-current={n === index}
                  className="flex h-11 w-11 items-center justify-center sm:h-10 sm:w-8"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${
                      n === index ? "w-6 bg-agro-600" : "w-2.5 bg-steel-300"
                    }`}
                  />
                </button>
              </li>
            ))}
        </ul>
        <span className="text-xs font-semibold text-steel-500 tabular-nums">
          {index + 1} / {count}
        </span>
      </div>
    </div>
  );
}

function Slide({ item }: { item: GalleryItem }) {
  return (
    <figure className="group relative overflow-hidden rounded-2xl bg-agro-950 shadow-lg ring-1 ring-white/60 sm:rounded-3xl">
      <img
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={Math.round(item.width / item.ratio)}
        decoding="async"
        loading="lazy"
        style={{ objectPosition: item.objectPosition }}
        className="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-agro-950/95 via-agro-950/55 to-transparent p-3 sm:p-5">
        <h3 className="mt-1.5 text-sm leading-tight font-bold text-white sm:text-base">
          {item.title}
        </h3>
      </figcaption>
    </figure>
  );
}
