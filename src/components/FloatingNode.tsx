import { useState, type ReactNode } from "react";
import type { CanvasPos } from "../data/types";
import { useParallax } from "../lib/useParallax";

interface Props {
  pos: CanvasPos;
  size?: number;
  rotate?: number;
  depth?: number;
  visible: boolean;
  delay?: number;
  onClick?: () => void;
  children: (state: { hover: boolean }) => ReactNode;
}

/**
 * A content-as-object card placed absolutely on the canvas.
 * Drifts with parallax, lifts on hover, fades in with a delay.
 */
export function FloatingNode({
  pos,
  size = 160,
  rotate = 0,
  depth = 1,
  visible,
  delay = 0,
  onClick,
  children,
}: Props) {
  const [hover, setHover] = useState(false);
  const par = useParallax();
  const dx = par.x * 8 * depth;
  const dy = par.y * 8 * depth;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        left: pos.left,
        top: pos.top,
        width: size,
        transform:
          `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) ` +
          `rotate(${rotate}deg) ` +
          `${hover && visible ? "scale(1.04) translateY(-4px)" : ""}`,
        transition: `transform 800ms cubic-bezier(.2,.8,.2,1), opacity 650ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
        cursor: visible ? "pointer" : "default",
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
      }}
    >
      {children({ hover })}
    </div>
  );
}
