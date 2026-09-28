import { useEffect, useRef, type ReactNode } from "react";

type TiltSurfaceProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "article";
};

/** Decorative depth only: touch, keyboard and reduced-motion stay native. */
export function TiltSurface({ children, className = "", id, as: Tag = "div" }: TiltSurfaceProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      node.style.removeProperty("--tilt-x");
      node.style.removeProperty("--tilt-y");
      node.style.removeProperty("--light-x");
      node.style.removeProperty("--light-y");
      node.removeAttribute("data-tilting");
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        node.style.setProperty("--tilt-x", `${(0.5 - y) * 6}deg`);
        node.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
        node.style.setProperty("--light-x", `${x * 100}%`);
        node.style.setProperty("--light-y", `${y * 100}%`);
        node.setAttribute("data-tilting", "");
      });
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);
    node.addEventListener("pointercancel", reset);
    media.addEventListener("change", reset);
    return () => {
      reset();
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
      node.removeEventListener("pointercancel", reset);
      media.removeEventListener("change", reset);
    };
  }, []);

  return <Tag id={id} ref={ref as never} className={`tilt-surface ${className}`}>{children}</Tag>;
}
