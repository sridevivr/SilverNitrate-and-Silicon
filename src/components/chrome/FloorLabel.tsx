import type { ReactNode } from "react";
import type { Palette } from "../../data/types";
import { useIsMobile } from "../../lib/useIsMobile";

interface Props {
  palette: Palette;
  kicker: string;
  title: ReactNode;
  whisper?: string;
}

export function FloorLabel({ palette, kicker, title, whisper }: Props) {
  const mobile = useIsMobile();
  return (
    <div
      style={{
        position: mobile ? "relative" : "absolute",
        left: mobile ? 0 : 32,
        top: mobile ? 0 : 92,
        maxWidth: mobile ? "100%" : 380,
        zIndex: 5,
        pointerEvents: "none",
        padding: mobile ? "20px 20px 12px" : 0,
      }}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: mobile ? 9 : 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: palette.accent,
          marginBottom: mobile ? 6 : 10,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 300,
          fontSize: mobile ? 28 : 40,
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
            marginTop: mobile ? 8 : 14,
            fontFamily: '"Fraunces", Georgia, serif',
            fontStyle: "italic",
            fontSize: mobile ? 12 : 13,
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
