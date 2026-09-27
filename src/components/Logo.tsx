type LogoProps = {
  /** Altura do logo. A largura acompanha a proporção original. */
  className?: string;
  /** Esconde o texto acessível (quando o nome já está ao lado). */
  decorative?: boolean;
};

/**
 * Logo oficial da Terra Drone Solutions.
 * O original (1254px, ~1,2 MB) fica em `src/assets`; as variantes leves
 * em `public/` evitam penalizar o carregamento do header e do rodapé.
 */
export function Logo({
  className = "h-10 w-10",
  decorative = false,
}: LogoProps) {
  return (
    <picture>
      <source srcSet="/logo-400.png" media="(min-width: 640px)" />
      <img
        src="/logo-96.png"
        alt={decorative ? "" : "Terra Drone Solutions"}
        aria-hidden={decorative || undefined}
        width={96}
        height={96}
        decoding="async"
        className={`${className} w-auto object-contain`}
      />
    </picture>
  );
}
