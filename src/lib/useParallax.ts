import { useEffect, useState } from "react";

/**
 * Tracks mouse position normalized to [-1, 1] on both axes.
 * RAF-throttled so setState doesn't fire on every mousemove.
 */
export function useParallax() {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let raf: number | null = null;
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setP({ x, y }));
    };
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}
