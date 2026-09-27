/**
 * Dados centralizados da landing page.
 * Alterar aqui reflete em todas as seções (contato, serviços, área, etc.).
 */

export const COMPANY = {
  name: "Terra Drone Solutions",
  shortName: "Terra Drone",
  foundedYear: 2024,
  founder: "Gustavo Pereira Gonçalves",
  role: "Responsável técnico",
  address: {
    street: "Rua Luiz Pistarini, 30 — Sala 211",
    district: "Campos Elíseos",
    city: "Resende",
    state: "RJ",
    zip: "27700-000",
  },
} as const;

/** Número apenas com dígitos, formato internacional (Brasil). */
export const WHATSAPP_NUMBER = "5521995329024";

export type ContactSubject =
  | "orcamento"
  | "servicos"
  | "mapeamento"
  | "contato";

const SUBJECTS: Record<ContactSubject, string> = {
  orcamento: "Solicitação de orçamento",
  servicos: "Dúvida sobre serviços",
  mapeamento: "Mapeamento aéreo / NDVI",
  contato: "Contato pelo site",
};

/**
 * Monta o link do WhatsApp com mensagem pré-preenchida.
 * Sem backend: o "formulário" apenas redireciona para o WhatsApp.
 */
export function whatsappLink(
  subject: ContactSubject = "orcamento",
  extra?: string,
): string {
  const base = `Olá, ${COMPANY.name}! Vim pelo site e gostaria de falar sobre: ${SUBJECTS[subject]}.`;
  const message = extra ? `${base}\n\n${extra}` : base;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CONTACT = {
  whatsappDisplay: "(21) 99532-9024",
  email: "terradronesolutions@gmail.com",
  instagram: "terradronesolutions",
  instagramUrl: "https://instagram.com/terradronesolutions",
  emailUrl: "mailto:terradronesolutions@gmail.com",
} as const;

export type IconName =
  | "spray"
  | "bug"
  | "scan"
  | "ruler"
  | "target"
  | "wallet"
  | "leaf"
  | "gauge"
  | "shield"
  | "mountain"
  | "message"
  | "map"
  | "report";

export type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: IconName;
  accent: "agro" | "sky";
};

export const SERVICES: Service[] = [
  {
    id: "pulverizacao",
    title: "Pulverização de precisão",
    description:
      "Aplicação aérea de defensivos e fertilizantes com bicos de baixa deriva, calibrados area a area.",
    bullets: [
      "Bicos antideriva: o vento não desloca a calda",
      "Dose certa, sem superdosagem",
    ],
    icon: "spray",
    accent: "agro",
  },
  {
    id: "pragas",
    title: "Controle de pragas",
    description:
      "Monitoramento e aplicação direcionada contra pragas, fungos e ervas daninhas em lavouras de grãos, café, frutas e pasto.",
    bullets: [
      "Alvos específicos, menos resíduo no meio ambiente",
      "Menos re-aplicação significa menos custo",
    ],
    icon: "bug",
    accent: "sky",
  },
  {
    id: "mapeamento",
    title: "Mapeamento e monitoramento",
    description:
      "Voo com sensores multiespectrais, imagens áreas e índices NDVI para saber exatamente onde a lavoura está fraquecendo.",
    bullets: [
      "NDVI e mapas de zoneamento agrícola",
      "Relatório com layer de corte por talhão",
    ],
    icon: "scan",
    accent: "sky",
  },
  {
    id: "topografia",
    title: "Topografia e cartografia",
    description:
      "Levantamento topográfico, volumetria de barragens e curvas de nível para plantio direto, com precisão centimétrica.",
    bullets: [
      "Nuvem de pontos georreferenciada",
      "Curvas de nível e cadastro ambiental rural (CAR)",
    ],
    icon: "ruler",
    accent: "agro",
  },
];

export type Benefit = {
  title: string;
  description: string;
  icon: IconName;
};

export const BENEFITS: Benefit[] = [
  {
    title: "Precisão milimétrica",
    description:
      "Sistema GPS/RTK e controle de vazão por bico: cada metro quadrado recebe a dose planejada.",
    icon: "target",
  },
  {
    title: "Economia de insumos",
    description:
      "Sem superdosagem e sem áreas reprocessadas. Você compra menos produto e aproveita cada litro de calda.",
    icon: "wallet",
  },
  {
    title: "Menos deriva",
    description:
      "Voo baixo e bicos antideriva mantêm a aplicação dentro da área e preservam pomares, riachos e nascentes.",
    icon: "leaf",
  },
  {
    title: "Rapidez operacional",
    description:
      "Até 60 a 80 hectares por dia. A janela de aplicação deixa de ser um gargalo para a safra.",
    icon: "gauge",
  },
  {
    title: "Segurança do trabalhador",
    description:
      "O operador deixa de entrar na área e fica exposto ao agrotóxico. O trabalho de solo é eliminado.",
    icon: "shield",
  },
  {
    title: "Áreas de difícil acesso",
    description:
      "Terreno inclinado, sulcos erosivos ou área alagada: o drone alcança onde o maquinário não entra.",
    icon: "mountain",
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
  icon: IconName;
};

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Contato e visita técnica",
    description:
      "Você fala com a gente no WhatsApp, entendemos a cultura e a praga, e agendamos a visita para avaliar a área.",
    icon: "message",
  },
  {
    number: "02",
    title: "Mapeamento da área",
    description:
      "Levantamos o terreno por via aérea, definimos o zoneamento e calculamos exatamente a dose e o volume de calda.",
    icon: "map",
  },
  {
    number: "03",
    title: "Execução da pulverização",
    description:
      "Voo programado sobre rotas calculadas, com controle de vazão em tempo real e registro de toda a operação.",
    icon: "spray",
  },
  {
    number: "04",
    title: "Relatório de resultados",
    description:
      "Você recebe o relatório com imagens, mapa de aplicação e o que foi aplicado — tudo documentado para a sua gestão.",
    icon: "report",
  },
];

export type Region = {
  name: string;
  role: string;
  description: string;
  highlight?: boolean;
};

export const REGIONS: Region[] = [
  {
    name: "Resende - RJ",
    role: "Sede",
    description:
      "Base de operação e atendimento técnico. Pulverização, NDVI e topografia em todo o município e arredores.",
    highlight: true,
  },
  {
    name: "Lorena - SP",
    role: "Polo regional",
    description:
      "Atendimento no Vale do Paraíba paulista, com deslocamento rápido a fazendas de Guaratinguetá e Cruzeiro.",
    highlight: true,
  },
  {
    name: "Vale do Paraíba (tríplice fronteira)",
    role: "RJ / SP / MG",
    description:
      "Cobertura contínua na tríplice fronteira: Jaguariúna, Piraí, Barra Mansa, Volta Redonda, Pindamonhangaba, Taubaté, Jacareí e região de Furnas.",
    highlight: true,
  },
  {
    name: "Demais municípios da região",
    role: "Sob consulta",
    description:
      "Atendemos também Aprekodiga, Barra do Piraí, Valença, Itaguaí e cidades vizinhas. Fale com a gente e verificamos a viabilidade.",
  },
];

export const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Galeria", href: "#galeria" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Área de atuação", href: "#area" },
  { label: "Contato", href: "#contato" },
] as const;

export const STATS = [
  { value: "60-80 ha", label: "por dia de operação" },
  { value: "Até 80%", label: "de redução de deriva" },
  { value: "100%", label: "da operação registrada" },
  { value: "3 estados", label: "RJ / SP / MG" },
] as const;
