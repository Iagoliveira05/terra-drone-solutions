/**
 * Galeria de operações da Terra Drone Solutions.
 *
 * As imagens em /public/galeria são geradas por `optimize-images.cjs`
 * a partir de src/assets (reencode mozjpeg, sem upscale).
 *
 * A ordem é proposital: dentro de cada par, alterna retrato e paisagem,
 * para que a grade de 2 colunas corte o mínimo possível da imagem.
 */

export type GalleryItem = {
  src: string;
  width: number;
  /** largura / altura do arquivo original, usada para reservar o espaço. */
  ratio: number;
  alt: string;
  title: string;
  caption: string;
  tag: "Pulverização" | "Mapeamento" | "Topografia" | "Atendimento";
};

const g = (
  name: string,
  width: number,
  ratio: number,
  data: Omit<GalleryItem, "src" | "width" | "ratio">,
): GalleryItem => ({
  src: `/galeria/${name}.jpg`,
  width,
  ratio,
  ...data,
});

export const GALLERY: GalleryItem[] = [
  g("drone-pulverizando-milho", 1600, 0.597, {
    alt: "Drone agrícola pulverizando sobre lavoura de milho",
    title: "Pulverização em lavoura de milho",
    caption:
      "Aplicação aérea com bicos antideriva e vazão controlada: a dose certa em cada metro quadrado.",
    tag: "Pulverização",
  }),
  g("drone-encosta-serra", 1179, 1.654, {
    alt: "Drone operando em encosta de terreno com relevo acentuado",
    title: "Encostas e terreno inclinado",
    caption:
      "Onde o maquinário não chega ou deixa marcas, o drone mantém a aplicação uniforme do topo ao pé da encosta.",
    tag: "Pulverização",
  }),
  g("drone-pastagem-vale", 1591, 0.741, {
    alt: "Drone sobrevoando área de pastagem no Vale do Paraíba",
    title: "Pastagem no Vale do Paraíba",
    caption:
      "Aplicação programada sobre grandes extensões, com controle de vazão em tempo real durante todo o voo.",
    tag: "Pulverização",
  }),
  g("tanque-pulverizacao-encosta", 1179, 1.647, {
    alt: "Tanque de pulverização do drone montado sobre a estrutura de braços",
    title: "Sistema de tanques calibrado",
    caption:
      "Tanques e bicos revisados e calibrados antes de cada decolagem, garantindo vazão constante do início ao fim.",
    tag: "Pulverização",
  }),
  g("apresentacao-produtores", 1280, 0.563, {
    alt: "Apresentação técnica do serviço para produtores rurais",
    title: "Apresentação técnica",
    caption:
      "Explicamos cultura, praga, dose e volume de calda em linguagem de campo, sem termos que ninguém entende.",
    tag: "Atendimento",
  }),
  g("drone-estande-evento", 1280, 1.778, {
    alt: "Drone em estande de exposição para produtores do agro",
    title: "Presença no agro da região",
    caption:
      "Também levamos o serviço a eventos e encontros de produtores do Vale do Paraíba e da tríplice fronteira.",
    tag: "Atendimento",
  }),
  g("drone-detalhe-pulverizador", 1280, 0.563, {
    alt: "Detalhe do conjunto de pulverização e bicos do drone",
    title: "Bicos de baixa deriva",
    caption:
      "Bicos antideriva mantêm a calda dentro da área e protegem pomares vizinhos, riachos e nascentes.",
    tag: "Pulverização",
  }),
  g("equipamento-pulverizacao", 1280, 0.563, {
    alt: "Equipamento de pulverização aérea montado em drone agrimodelo",
    title: "Equipamento agrimodelo de trabalho",
    caption:
      "Drone de carga útil preparado para aplicações longas, com autonomia para cobrir a propriedade em poucas horas.",
    tag: "Pulverização",
  }),
  g("atendimento-produtor", 1280, 0.563, {
    alt: "Técnico atendendo produtor rural durante avaliação da propriedade",
    title: "Visita técnica na fazenda",
    caption:
      "A avaliação da área é feita presencialmente, antes de qualquer aplicação.",
    tag: "Atendimento",
  }),
  g("drone-material-divulgacao", 1280, 0.563, {
    alt: "Drone posicionado para apresentação do serviço",
    title: "Nosso equipamento em campo",
    caption:
      "Material próprio de trabalho, apresentado a cada produtor durante a visita técnica de avaliação da área.",
    tag: "Atendimento",
  }),
  g("drone-estande-portao", 1280, 0.563, {
    alt: "Drone em estande de exposição visto pela entrada do evento",
    title: "Tecnologia de perto",
    caption:
      "O produtor conhece a equipe e vê o equipamento funcionando antes de contratar.",
    tag: "Atendimento",
  }),
  g("drone-pastagem-entardecer", 1550, 0.761, {
    alt: "Drone ao entardecer sobre vegetação em área rural",
    title: "Janela de aplicação monitorada",
    caption:
      "Acompanhamos as condições ambientais antes de decolar para aproveitar a janela ideal de cada dia.",
    tag: "Atendimento",
  }),
];

/** Agrupa os itens em slides de N fotos. */
export function toSlides(items: GalleryItem[], perSlide = 2): GalleryItem[][] {
  const slides: GalleryItem[][] = [];
  for (let i = 0; i < items.length; i += perSlide) {
    slides.push(items.slice(i, i + perSlide));
  }
  return slides;
}
