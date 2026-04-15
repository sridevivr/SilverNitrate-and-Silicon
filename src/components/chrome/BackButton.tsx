import type { Palette } from "../../data/types";

interface Props {
  palette: Palette;
  onClick: () => void;
  label: string;
}

export function BackButton({ palette, onClick, label }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: 26,
        right: 32,
        zIndex: 6,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 4,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: palette.dim,
      }}
    >
      ← {label}
    </button>
  );
}
