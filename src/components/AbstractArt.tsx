import type { Palette } from "../data/types";

interface Props {
  id: string;
  palette: Palette;
}

/**
 * SVG fallbacks for exhibits without a poster (software kinds) and
 * for generic cases. Each uses the current palette so it reads as
 * part of the wing.
 */
export function AbstractArt({ id, palette }: Props) {
  const a = palette.accent;
  const i = palette.ink;
  const t = palette.tone;
  const common = {
    viewBox: "0 0 300 400",
    preserveAspectRatio: "xMidYMid slice" as const,
    style: { width: "100%", height: "100%", display: "block" },
  };

  if (id === "photoshop") {
    return (
      <svg {...common}>
        <rect width="300" height="400" fill={t} />
        <rect
          x="60"
          y="90"
          width="180"
          height="220"
          fill="none"
          stroke={a}
          strokeWidth="2"
        />
        <path
          d="M 60 310 L 130 220 L 170 260 L 240 160"
          fill="none"
          stroke={a}
          strokeWidth="2"
        />
        <circle cx="215" cy="175" r="12" fill={a} opacity="0.4" />
      </svg>
    );
  }
  if (id === "renderman") {
    return (
      <svg {...common}>
        <rect width="300" height="400" fill={t} />
        <circle
          cx="150"
          cy="200"
          r="90"
          fill="none"
          stroke={a}
          strokeWidth="1.5"
        />
        <circle cx="150" cy="200" r="60" fill={a} opacity="0.22" />
        <circle cx="130" cy="180" r="10" fill={t} />
      </svg>
    );
  }
  if (id === "avid") {
    return (
      <svg {...common}>
        <rect width="300" height="400" fill={t} />
        {[120, 170, 220, 270].map((y, k) => (
          <g key={k}>
            <line x1="30" y1={y} x2="270" y2={y} stroke={a} strokeOpacity="0.22" />
            <rect
              x={50 + k * 16}
              y={y - 10}
              width={120 - k * 12}
              height="20"
              fill={a}
              opacity="0.6"
            />
          </g>
        ))}
      </svg>
    );
  }
  if (id === "nuke") {
    return (
      <svg {...common}>
        <rect width="300" height="400" fill={t} />
        <g stroke={a} strokeWidth="1" fill="none" opacity="0.9">
          {[0, 1, 2, 3].map((k) => (
            <rect
              key={k}
              x={40 + (k % 2) * 120}
              y={80 + Math.floor(k / 2) * 140}
              width="100"
              height="70"
            />
          ))}
          <line x1="140" y1="115" x2="160" y2="115" />
          <line x1="140" y1="255" x2="160" y2="255" />
          <line x1="90" y1="150" x2="90" y2="220" />
          <line x1="210" y1="150" x2="210" y2="220" />
        </g>
      </svg>
    );
  }

  // Generic fallback
  return (
    <svg {...common}>
      <rect width="300" height="400" fill={t} />
      <g opacity="0.8" stroke={a} strokeWidth="0.8" fill="none">
        {Array.from({ length: 9 }).map((_, k) => (
          <rect
            key={k}
            x={40 + k * 14}
            y={40 + k * 18}
            width={220 - k * 28}
            height={320 - k * 36}
          />
        ))}
      </g>
      <circle cx="150" cy="200" r="5" fill={i} />
    </svg>
  );
}
