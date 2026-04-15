import type { ReactNode } from "react";
import type { Palette } from "../../data/types";

interface Props {
  palette: Palette;
  kicker: string;
  title: ReactNode;
  whisper?: string;
}

export function FloorLabel({ palette, kicker, title, whisper }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: 32,
        top: 92,
        maxWidth: 380,
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: palette.accent,
          marginBottom: 10,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 300,
          fontSize: 40,
          lineHeight: 0.98,
          color: palette.ink,
          letterSpacing: "-0.015em",
        }}
      >
        {title}
      </div>
      {whisper && (
        <div
          style={{
            marginTop: 14,
            fontFamily: '"Fraunces", Georgia, serif',
            fontStyle: "italic",
            fontSize: 13,
            lineHeight: 1.5,
            color: palette.dim,
          }}
        >
          {whisper}
        </div>
      )}
    </div>
  );
}
