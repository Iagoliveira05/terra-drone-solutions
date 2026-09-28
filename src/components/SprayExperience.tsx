import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Drop = { x: number; y: number; vx: number; vy: number; size: number; life: number; maxLife: number };

/** A short, decorative spraying pass. Never captures input or blocks the page. */
export function SprayExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isHomeVisible = () => {
      const hero = document.getElementById("topo");
      if (!hero || document.hidden || preference.matches) return false;
      if (window.location.hash && window.location.hash !== "#topo") return false;
      const bounds = hero.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > window.innerHeight * .5;
    };
    const start = () => { if (isHomeVisible()) setPlaying(true); };
    const frame = requestAnimationFrame(start);
    const interval = window.setInterval(start, 60_000);
    const stop = () => setPlaying(false);
    const stopOutsideHome = () => { if (!isHomeVisible()) stop(); };
    preference.addEventListener("change", stop);
    document.addEventListener("visibilitychange", stopOutsideHome);
    window.addEventListener("scroll", stopOutsideHome, { passive: true });
    window.addEventListener("hashchange", stopOutsideHome);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
      preference.removeEventListener("change", stop);
      document.removeEventListener("visibilitychange", stopOutsideHome);
      window.removeEventListener("scroll", stopOutsideHome);
      window.removeEventListener("hashchange", stopOutsideHome);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let last = 0;
    let elapsed = 0;
    let emission = 0;
    const drops: Drop[] = [];
    const resize = () => {
      const hero = document.getElementById("topo");
      width = hero?.clientWidth ?? window.innerWidth;
      height = Math.min(hero?.clientHeight ?? window.innerHeight, window.innerHeight);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, .05) : 0;
      last = now;
      elapsed += dt;
      ctx.clearRect(0, 0, width, height);
      const mobile = width < 640;
      const progress = Math.min(elapsed / 4.8, 1);
      const x = -100 + (width + 200) * progress;
      const y = (mobile ? 115 : 140) + Math.sin(progress * Math.PI * 2) * 22;
      const scale = mobile ? .65 : 1;
      const fade = Math.min(1, elapsed * 3, Math.max(0, (7 - elapsed) / 1.2));

      // Two broad spray fans beneath the nozzles, followed by falling droplets.
      if (elapsed < 4.8) {
        for (const side of [-1, 1]) {
          const nozzle = x + side * 35 * scale;
          const mist = ctx.createLinearGradient(nozzle, y + 15, nozzle, y + 240);
          mist.addColorStop(0, "rgba(94,179,151,.22)");
          mist.addColorStop(1, "rgba(94,179,151,0)");
          ctx.globalAlpha = fade;
          ctx.fillStyle = mist;
          ctx.beginPath();
          ctx.moveTo(nozzle, y + 15);
          ctx.lineTo(nozzle - 90 * scale, y + 240);
          ctx.lineTo(nozzle + 90 * scale, y + 240);
          ctx.closePath();
          ctx.fill();
        }
        emission += dt * (mobile ? 38 : 75);
        while (emission >= 1 && drops.length < 240) {
          emission--;
          const life = 1.8 + Math.random() * 1.1;
          drops.push({ x: x + (Math.random() > .5 ? 35 : -35) * scale, y: y + 22,
            vx: (Math.random() - .5) * 115, vy: 95 + Math.random() * 120,
            size: 1.6 + Math.random() * 3.2, life, maxLife: life });
        }
      }
      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i];
        drop.life -= dt;
        if (drop.life <= 0 || drop.y > height + 20) { drops.splice(i, 1); continue; }
        drop.x += drop.vx * dt;
        drop.y += drop.vy * dt;
        drop.vy += 70 * dt;
        ctx.globalAlpha = Math.min(1, drop.life / .6) * fade * .58;
        ctx.fillStyle = i % 3 ? "#338c79" : "#84b956";
        ctx.beginPath();
        ctx.ellipse(drop.x, drop.y, drop.size * .55, drop.size * 1.5, -.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e4fff4";
        ctx.beginPath();
        ctx.ellipse(drop.x - drop.size * .15, drop.y, drop.size * .15, drop.size * .7, -.15, 0, Math.PI * 2);
        ctx.fill();
      }

      if (elapsed < 4.8) {
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.rotate(Math.sin(elapsed * 2) * .035);
        ctx.lineCap = "round";
        // Arms, tank, landing gear and four spinning rotors.
        ctx.strokeStyle = "#253b30";
        ctx.lineWidth = 6;
        for (const side of [-1, 1]) {
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(side * 56, -20); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(side * 43, 12); ctx.stroke();
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(side * 16, 9); ctx.lineTo(side * 24, 32); ctx.lineTo(side * 38, 32); ctx.stroke();
          ctx.lineWidth = 6;
          for (const [rx, ry] of [[side * 56, -24], [side * 43, 8]]) {
            ctx.fillStyle = "rgba(39,74,25,.12)";
            ctx.beginPath(); ctx.ellipse(rx, ry, 27, 7, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = "#527343"; ctx.lineWidth = 2;
            const spin = Math.cos(elapsed * 85 + rx) * 25;
            ctx.beginPath(); ctx.moveTo(rx - spin, ry - 3); ctx.lineTo(rx + spin, ry + 3); ctx.stroke();
            ctx.strokeStyle = "#253b30"; ctx.lineWidth = 6;
          }
        }
        ctx.fillStyle = "#f2f8ec";
        ctx.beginPath(); ctx.roundRect(-16, -5, 32, 28, [5, 5, 10, 10]); ctx.fill();
        ctx.fillStyle = "#3a781b";
        ctx.beginPath(); ctx.roundRect(-23, -13, 46, 18, 7); ctx.fill();
        ctx.fillStyle = "#bef264"; ctx.fillRect(-9, -10, 18, 4);
        ctx.fillStyle = "#f99807"; ctx.fillRect(-3, 12, 6, 5);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (elapsed < 7) frame = requestAnimationFrame(draw);
      else setPlaying(false);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, width, height);
    };
  }, [playing]);

  const hero = playing ? document.getElementById("topo") : null;
  return hero ? createPortal(<canvas ref={canvasRef} className="spray-canvas" aria-hidden="true" />, hero) : null;
}
