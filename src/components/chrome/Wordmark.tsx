import type { Palette } from "../../data/types";

interface Props {
  palette: Palette;
  breadcrumb?: string | null;
}

export function Wordmark({ palette, breadcrumb }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 28,
        left: 32,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        gap: 14,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          border: `1px solid ${palette.ink}`,
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: palette.dim,
        }}
      >
        Silver Nitrate &nbsp;·&nbsp; Silicon{breadcrumb ? `  /  ${breadcrumb}` : ""}
      </div>
    </div>
  );
}
