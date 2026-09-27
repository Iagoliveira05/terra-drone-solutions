/**
 * Municípios citados no site; malhas simplificadas do IBGE consultadas em 2026-09-27.
 * Raio: distância máxima do centro aos vértices, arredondada para cima + 1 km.
 * Resende/Lorena usam referências urbanas; demais centros são o meio da caixa
 * delimitadora municipal. Não são bases físicas nem raios comerciais confirmados.
 * Furnas e cidades sob consulta não estão incluídas.
 */
export const SERVICE_LOCATIONS = [
  {
    "id": "resende",
    "name": "Resende - RJ",
    "role": "Sede",
    "latitude": -22.4705,
    "longitude": -44.4509,
    "radiusKm": 39,
    "color": "#2f5d18",
    "ibgeId": 3304201,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3304201?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "lorena",
    "name": "Lorena - SP",
    "role": "Sede",
    "latitude": -22.7272,
    "longitude": -45.12,
    "radiusKm": 29,
    "color": "#0369a1",
    "ibgeId": 3527207,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3527207?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "guaratingueta",
    "name": "Guaratinguetá - SP",
    "role": "Atendimento regional",
    "latitude": -22.8134,
    "longitude": -45.2342,
    "radiusKm": 27,
    "color": "#0369a1",
    "ibgeId": 3518404,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3518404?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "cruzeiro",
    "name": "Cruzeiro - SP",
    "role": "Atendimento regional",
    "latitude": -22.5607,
    "longitude": -45.013450000000006,
    "radiusKm": 16,
    "color": "#0369a1",
    "ibgeId": 3513405,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3513405?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "pirai",
    "name": "Piraí - RJ",
    "role": "Atendimento regional",
    "latitude": -22.66115,
    "longitude": -43.929249999999996,
    "radiusKm": 22,
    "color": "#2f5d18",
    "ibgeId": 3304003,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3304003?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "barra-mansa",
    "name": "Barra Mansa - RJ",
    "role": "Atendimento regional",
    "latitude": -22.48535,
    "longitude": -44.17385,
    "radiusKm": 27,
    "color": "#2f5d18",
    "ibgeId": 3300407,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3300407?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "volta-redonda",
    "name": "Volta Redonda - RJ",
    "role": "Atendimento regional",
    "latitude": -22.52345,
    "longitude": -44.080799999999996,
    "radiusKm": 17,
    "color": "#2f5d18",
    "ibgeId": 3306305,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3306305?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "pindamonhangaba",
    "name": "Pindamonhangaba - SP",
    "role": "Atendimento regional",
    "latitude": -22.88745,
    "longitude": -45.488600000000005,
    "radiusKm": 26,
    "color": "#0369a1",
    "ibgeId": 3538006,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3538006?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "taubate",
    "name": "Taubaté - SP",
    "role": "Atendimento regional",
    "latitude": -23.0863,
    "longitude": -45.50964999999999,
    "radiusKm": 27,
    "color": "#0369a1",
    "ibgeId": 3554102,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3554102?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "jacarei",
    "name": "Jacareí - SP",
    "role": "Atendimento regional",
    "latitude": -23.30035,
    "longitude": -45.9697,
    "radiusKm": 20,
    "color": "#0369a1",
    "ibgeId": 3524402,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3524402?formato=application/vnd.geo%2Bjson&qualidade=minima"
  },
  {
    "id": "jaguariuna",
    "name": "Jaguariúna - SP",
    "role": "Atendimento regional",
    "latitude": -22.679499999999997,
    "longitude": -47.0169,
    "radiusKm": 13,
    "color": "#0369a1",
    "ibgeId": 3524709,
    "sourceUrl": "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3524709?formato=application/vnd.geo%2Bjson&qualidade=minima"
  }
] as const;

export function locationMapsUrl(name: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ", Brasil")}`;
}
