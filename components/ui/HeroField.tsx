"use client";

import { useEffect, useRef } from "react";

const GAP = 28; // grid pitch, px
const R = 150; // cursor influence radius, px

// Drafting-paper grid behind the hero. Points near the cursor lean away and warm to amber.
// Draws only while the pointer moves; idle otherwise. Static under reduced motion or touch.
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let pts: [number, number][] = [];
    const m = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
    let raf = 0;
    let visible = true;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const [px, py] of pts) {
        const dx = px - m.x;
        const dy = py - m.y;
        const d = Math.hypot(dx, dy) || 1;
        const k = d < R ? 1 - d / R : 0;
        const e = k * k * (3 - 2 * k);
        const s = 1.2 + e * 1.8;
        const x = px + (dx / d) * e * 9;
        const y = py + (dy / d) * e * 9;
        ctx.fillStyle = e > 0.02 ? `rgba(255,176,0,${0.2 + 0.7 * e})` : "rgba(232,230,223,0.16)";
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) pts.push([x, y]);
      draw();
    };

    const loop = () => {
      m.x += (m.tx - m.x) * 0.2;
      m.y += (m.ty - m.y) * 0.2;
      draw();
      raf = Math.abs(m.tx - m.x) + Math.abs(m.ty - m.y) > 0.5 && visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      m.tx = e.clientX - r.left;
      m.ty = e.clientY - r.top;
      if (m.x < -1e3) {
        m.x = m.tx;
        m.y = m.ty;
      }
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      m.x = m.y = m.tx = m.ty = -1e4;
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(host);
    if (!still) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_60%_40%,black_35%,transparent_80%)]"
    />
  );
}
