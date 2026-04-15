import { useState } from "react";
import type { CanvasPos, Descendant, Palette } from "../data/types";
import { DescendantIcon } from "./DescendantIcon";

interface Props {
  descendant: Descendant;
  pos: CanvasPos;
  palette: Palette;
  delay: number;
}

/**
 * A satellite in the constellation bloom: a circular icon container
 * surrounded by kind/name/description text. Thin accent border.
 */
export function DescendantSatellite({ descendant, pos, palette, delay }: Props) {
  const [hover, setHover] = useState(false);
  const d = descendant;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        left: pos.left,
        top: pos.top,
        width: 130,
        transform: "translate(-50%, -50%)",
        animation: `riseIn 600ms cubic-bezier(.2,.8,.2,1) ${delay}ms both`,
        zIndex: hover ? 30 : 6,
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          margin: "0 auto",
          borderRadius: "50%",
          border: `1.4px solid ${palette.accent}`,
          background: palette.bg,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hover
            ? `0 10px 22px -10px rgba(0,0,0,0.22)`
            : `0 4px 12px -6px rgba(0,0,0,0.12)`,
          transition: "box-shadow 400ms, transform 400ms",
          transform: hover ? "scale(1.06)" : "scale(1)",
        }}
      >
        <div style={{ width: "82%", height: "82%" }}>
          <DescendantIcon kind={d.kind} name={d.name} palette={palette} />
        </div>
      </div>

      <div
        style={{
          marginTop: 8,
          textAlign: "center",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 8,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: palette.accent,
        }}
      >
        {d.kind}
      </div>
      <div
        style={{
          marginTop: 4,
          textAlign: "center",
          fontFamily: '"Fraunces", Georgia, serif',
          fontSize: 12,
          lineHeight: 1.2,
          color: palette.ink,
        }}
      >
        {d.name}
      </div>
      <div
        style={{
          marginTop: 4,
          textAlign: "center",
          fontFamily: '"Fraunces", Georgia, serif',
          fontStyle: "italic",
          fontSize: 10,
          lineHeight: 1.35,
          color: palette.dim,
        }}
      >
        {d.desc}
      </div>
    </div>
  );
}
