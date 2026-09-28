import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Atraso em ms para escalonar a entrada dos itens. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Revela o conteúdo com fade + slide quando o elemento entra na viewport.
 * Usa IntersectionObserver e respeita prefers-reduced-motion via CSS.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;

    // Keep prerendered content readable; only defer elements below the fold.
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    if (node.getBoundingClientRect().top >= window.innerHeight) {
      node.dataset.revealPending = "";
    }
    const revealOnPreferenceChange = () => {
      if (motion.matches) node.removeAttribute("data-reveal-pending");
    };
    motion.addEventListener("change", revealOnPreferenceChange);

    // Elemento já visível no carregamento: evita esperar o scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.removeAttribute("data-reveal-pending");
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      node.removeAttribute("data-reveal-pending");
      motion.removeEventListener("change", revealOnPreferenceChange);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={`${visible ? "animate-reveal" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
