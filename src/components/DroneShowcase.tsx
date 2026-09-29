import { useEffect, useRef, useState } from "react";
import type { DroneScene } from "./drone/droneScene";

export function DroneShowcase() {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<DroneScene | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  useEffect(() => {
    if (status !== "ready") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || document.hidden || window.scrollY > 40 || (location.hash && location.hash !== "#topo")) return;
    let frame = 0;
    let stopped = false;
    let expectedY = window.scrollY;
    const cancel = () => { stopped = true; clearTimeout(timer); cancelAnimationFrame(frame); };
    const onScroll = () => { if (Math.abs(window.scrollY - expectedY) > 4) cancel(); };
    const timer = window.setTimeout(() => {
      const copy = document.getElementById("hero-copy");
      if (!copy || stopped) return;
      const from = window.scrollY;
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 80;
      const destination = copy.getBoundingClientRect().top + from - headerHeight - 20;
      const start = performance.now();
      const scroll = (now: number) => {
        if (stopped) return;
        const progress = Math.min(1, (now - start) / 2800);
        const ease = progress * progress * (3 - 2 * progress);
        expectedY = from + (destination - from) * ease;
        window.scrollTo({ top: expectedY, behavior: "instant" });
        if (progress < 1) frame = requestAnimationFrame(scroll);
      };
      frame = requestAnimationFrame(scroll);
    }, 1500);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    window.addEventListener("hashchange", cancel);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", cancel);
    document.addEventListener("visibilitychange", cancel);
    preference.addEventListener("change", cancel);
    return () => {
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("hashchange", cancel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", cancel);
      document.removeEventListener("visibilitychange", cancel);
      preference.removeEventListener("change", cancel);
    };
  }, [status]);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let cancelled = false;
    let started = false;
    const fail = () => {
      if (cancelled) return;
      scene.current?.dispose();
      scene.current = null;
      setStatus("unavailable");
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      import("./drone/droneScene").then(({ mountDroneScene }) => {
        if (cancelled) return;
        scene.current = mountDroneScene(node, fail);
        setStatus("ready");
      }).catch(fail);
    }, { rootMargin: "200px" });
    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);
  return (
    <div className="drone-showcase" data-status={status}>
      <div className="drone-showcase-heading"><span /> TECNOLOGIA QUE CULTIVA RESULTADOS</div>
      <div className="drone-stage" role="img" aria-label="Drone agrícola com quatro hélices, tanque e bicos de pulverização. A decolagem acompanha a rolagem da página.">
        {status !== "ready" && <img className="drone-poster" src="/galeria/drone-detalhe-pulverizador.jpg" width="1200" height="900" alt="" decoding="async" />}
        <div ref={host} className="drone-canvas-host" aria-hidden="true" />
        <span className="drone-flight-label" aria-hidden="true">VOO PLANEJADO · APLICAÇÃO PRECISA</span>
      </div>
      <div className="drone-showcase-caption"><span className="drone-scroll-cue">↓ <span>Role e acompanhe o voo</span></span><span>Terra Drone Solutions</span></div>
    </div>
  );
}
