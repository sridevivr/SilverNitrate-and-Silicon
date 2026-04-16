import type { Palette } from "../../data/types";
import { useIsMobile } from "../../lib/useIsMobile";

interface Props {
  palette: Palette;
  breadcrumb?: string | null;
}

export function Wordmark({ palette, breadcrumb }: Props) {
  const mobile = useIsMobile();
  return (
    <div
      style={{
        position: mobile ? "relative" : "absolute",
        top: mobile ? 0 : 28,
        left: mobile ? 0 : 32,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        gap: mobile ? 8 : 14,
        pointerEvents: "none",
        padding: mobile ? "16px 20px 0" : 0,
      }}
    >
      <div
        style={{
          width: mobile ? 8 : 10,
          height: mobile ? 8 : 10,
          border: `1px solid ${palette.ink}`,
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: mobile ? 8 : 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: palette.dim,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {mobile
          ? breadcrumb || "Silver Nitrate · Silicon"
          : `Silver Nitrate \u00a0·\u00a0 Silicon${breadcrumb ? `  /  ${breadcrumb}` : ""}`}
      </div>
    </div>
  );
}
