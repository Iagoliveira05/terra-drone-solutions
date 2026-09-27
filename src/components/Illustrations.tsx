/** Ilustração vetorial do mapa da tríplice fronteira RJ/SP/MG. */

type IllustrationProps = {
  className?: string;
};

/** Cores espelhadas do tema Tailwind em `index.css` (escala agro/lime/sun/soil). */
export function RegionMapIllustration({ className = "" }: IllustrationProps) {
  const cities = [
    { name: "Resende", x: 168, y: 96, primary: true },
    { name: "Lorena", x: 108, y: 214, primary: true },
    { name: "Piraí", x: 92, y: 66 },
    { name: "Volta Redonda", x: 206, y: 128 },
    { name: "Taubaté", x: 168, y: 300 },
    { name: "Pindamonhangaba", x: 176, y: 244 },
    { name: "Jacareí", x: 224, y: 336 },
    { name: "Cruzeiro", x: 62, y: 276 },
    { name: "Barra Mansa", x: 236, y: 168 },
    { name: "Furnas", x: 118, y: 152 },
  ];

  return (
    <svg
      viewBox="0 0 340 400"
      className={className}
      role="img"
      aria-label="Mapa estilizado do Vale do Paraíba na tríplice fronteira RJ, SP e MG"
    >
      <defs>
        <linearGradient id="tdsMapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7fee7" />
          <stop offset="100%" stopColor="#e2efd3" />
        </linearGradient>
        <radialGradient id="tdsRadar" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#a3e635" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="340" height="400" rx="24" fill="url(#tdsMapBg)" />

      {/* RJ */}
      <path
        d="M150 8 C 96 26, 44 74, 38 132 C 32 190, 58 232, 96 262 C 128 288, 138 330, 176 352 C 214 374, 262 356, 280 314 C 300 268, 300 214, 292 168 C 284 122, 296 82, 262 44 C 232 10, 196 -8, 150 8 Z"
        fill="#b2d096"
        stroke="#82b263"
        strokeWidth="2"
        opacity="0.75"
      />
      {/* SP */}
      <path
        d="M40 178 C 20 200, 14 240, 30 272 C 46 304, 76 312, 100 300 C 120 290, 126 258, 114 234 C 100 208, 62 156, 40 178 Z"
        fill="#fef1c6"
        stroke="#ffb920"
        strokeWidth="2"
        opacity="0.85"
      />
      {/* MG */}
      <path
        d="M214 236 C 252 232, 296 254, 314 292 C 330 326, 320 364, 290 380 C 260 396, 222 384, 210 356 C 198 328, 186 240, 214 236 Z"
        fill="#e3d1ba"
        stroke="#cfb18c"
        strokeWidth="2"
        opacity="0.75"
      />

      {/* Tríplice fronteira */}
      <path
        d="M46 196 C 78 178, 104 168, 138 178 C 176 190, 204 220, 232 254"
        fill="none"
        stroke="#2f5d18"
        strokeWidth="2.5"
        strokeDasharray="7 7"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Radar de cobertura */}
      <circle cx="168" cy="96" r="120" fill="url(#tdsRadar)" />
      <circle
        cx="168"
        cy="96"
        r="88"
        fill="none"
        stroke="#84cc16"
        strokeWidth="1.2"
        opacity="0.5"
        strokeDasharray="4 6"
      />
      <circle
        cx="168"
        cy="96"
        r="56"
        fill="none"
        stroke="#84cc16"
        strokeWidth="1.2"
        opacity="0.45"
        strokeDasharray="4 6"
      />

      {/* Linhas de relevo */}
      <g
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        opacity="0.65"
        strokeLinecap="round"
      >
        <path d="M60 120 C 100 112, 140 118, 200 106" />
        <path d="M78 244 C 128 232, 168 240, 232 228" />
        <path d="M120 306 C 160 296, 196 302, 246 292" />
      </g>

      {/* Cidades */}
      {cities.map((c) => (
        <g key={c.name}>
          {c.primary && (
            <circle
              cx={c.x}
              cy={c.y}
              r="14"
              fill={c.name === "Resende" ? "#36701c" : "#f99807"}
              opacity="0.22"
            />
          )}
          <circle
            cx={c.x}
            cy={c.y}
            r={c.primary ? 6 : 3.5}
            fill={c.primary ? "#0f1f0b" : "#5d6678"}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <text
            x={c.x + 10}
            y={c.y + 4}
            fontSize={c.primary ? 11 : 9.5}
            fontWeight={c.primary ? 700 : 500}
            fill={c.primary ? "#1f3c18" : "#5d6678"}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {c.name}
          </text>
        </g>
      ))}

      {/* Legenda dos estados */}
      <g
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="10"
        fontWeight="700"
      >
        <circle cx="34" cy="374" r="5" fill="#fef1c6" />
        <text x="44" y="378" fill="#5d6678">
          SP
        </text>
        <circle cx="76" cy="374" r="5" fill="#b2d096" />
        <text x="86" y="378" fill="#5d6678">
          RJ
        </text>
        <circle cx="118" cy="374" r="5" fill="#e3d1ba" />
        <text x="128" y="378" fill="#5d6678">
          MG
        </text>
      </g>
    </svg>
  );
}
