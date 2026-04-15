import type { Palette } from "../data/types";

type Variant =
  | "hall"
  | "builtForScreen"
  | "imaginedFutures"
  | "cautionaryTales"
  | "founderMythology";

interface Props {
  variant: Variant;
  palette: Palette;
}

/**
 * Thin pen-drawing decorations that sit behind the floating nodes.
 * All strokes use palette.dim at ~35% opacity with no fills — they read
 * as archival marginalia, not hero art. Each piece is absolutely
 * positioned so it lives at the canvas edges, out of the grid's way.
 */
export function Decorations({ variant, palette }: Props) {
  const stroke = palette.dim;
  const opacity = 0.35;
  const common = {
    style: { position: "absolute" as const, pointerEvents: "none" as const },
    stroke,
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
    opacity,
  };

  if (variant === "hall") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Top-right: tall window with light rays */}
        <svg
          {...common}
          width="140"
          height="220"
          viewBox="0 0 140 220"
          style={{ ...common.style, top: 40, right: 40 }}
        >
          <rect x="24" y="14" width="92" height="150" />
          <line x1="70" y1="14" x2="70" y2="164" />
          <line x1="24" y1="89" x2="116" y2="89" />
          <line x1="18" y1="168" x2="122" y2="168" />
          {/* light rays streaming down into the room */}
          <line x1="50" y1="164" x2="18" y2="215" opacity={0.55} />
          <line x1="70" y1="164" x2="52" y2="215" opacity={0.55} />
          <line x1="92" y1="164" x2="96" y2="215" opacity={0.55} />
        </svg>

        {/* Left edge, mid-page: classical column */}
        <svg
          {...common}
          width="70"
          height="360"
          viewBox="0 0 70 360"
          style={{ ...common.style, left: 32, top: "35%" }}
        >
          {/* capital */}
          <rect x="8" y="6" width="54" height="10" />
          <rect x="14" y="16" width="42" height="6" />
          {/* fluted shaft */}
          <line x1="20" y1="24" x2="20" y2="320" />
          <line x1="28" y1="24" x2="28" y2="320" />
          <line x1="36" y1="24" x2="36" y2="320" />
          <line x1="44" y1="24" x2="44" y2="320" />
          <line x1="52" y1="24" x2="52" y2="320" />
          <rect x="14" y="24" width="42" height="296" />
          {/* base */}
          <rect x="10" y="320" width="50" height="8" />
          <rect x="6" y="328" width="58" height="12" />
        </svg>

        {/* Bottom-right: potted plant */}
        <svg
          {...common}
          width="170"
          height="200"
          viewBox="0 0 170 200"
          style={{ ...common.style, right: 40, bottom: 40 }}
        >
          {/* leaves fanning out */}
          <path d="M 85 110 Q 40 72 28 20" />
          <path d="M 85 110 Q 60 60 64 8" />
          <path d="M 85 110 Q 85 55 95 10" />
          <path d="M 85 110 Q 115 58 128 14" />
          <path d="M 85 110 Q 140 80 158 28" />
          {/* small leaf accents */}
          <path d="M 55 50 Q 60 42 52 32" />
          <path d="M 115 50 Q 112 42 120 32" />
          {/* terracotta pot */}
          <path d="M 50 110 L 120 110 L 116 170 L 54 170 Z" />
          <line x1="48" y1="118" x2="122" y2="118" />
        </svg>

        {/* Bottom-left: small leaning picture frame */}
        <svg
          {...common}
          width="130"
          height="100"
          viewBox="0 0 130 100"
          style={{ ...common.style, left: 36, bottom: 36 }}
        >
          <g transform="rotate(-6 65 50)">
            <rect x="14" y="8" width="100" height="74" />
            <rect x="22" y="16" width="84" height="58" />
            <line x1="22" y1="16" x2="106" y2="74" opacity={0.55} />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "builtForScreen") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Top-right: film reel on a stand, film strip curving off */}
        <svg
          {...common}
          width="220"
          height="220"
          viewBox="0 0 220 220"
          style={{ ...common.style, top: 60, right: 30 }}
        >
          <circle cx="100" cy="80" r="60" />
          <circle cx="100" cy="80" r="44" />
          <circle cx="100" cy="80" r="6" />
          <line x1="40" y1="80" x2="160" y2="80" />
          <line x1="100" y1="20" x2="100" y2="140" />
          <line x1="58" y1="38" x2="142" y2="122" />
          <line x1="142" y1="38" x2="58" y2="122" />
          {/* film strip curving off */}
          <path d="M 160 80 Q 200 110 190 180" />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={165 + k * 5} cy={95 + k * 16} r="1.4" />
          ))}
        </svg>

        {/* Bottom-left: clapperboard */}
        <svg
          {...common}
          width="180"
          height="160"
          viewBox="0 0 180 160"
          style={{ ...common.style, left: 36, bottom: 36 }}
        >
          {/* slate */}
          <rect x="14" y="50" width="150" height="95" />
          <line x1="14" y1="78" x2="164" y2="78" />
          <line x1="14" y1="100" x2="164" y2="100" />
          <line x1="14" y1="122" x2="164" y2="122" />
          {/* clap arm */}
          <g transform="rotate(-8 90 50)">
            <rect x="14" y="30" width="150" height="20" />
            <line x1="28" y1="30" x2="36" y2="50" />
            <line x1="48" y1="30" x2="56" y2="50" />
            <line x1="68" y1="30" x2="76" y2="50" />
            <line x1="88" y1="30" x2="96" y2="50" />
            <line x1="108" y1="30" x2="116" y2="50" />
            <line x1="128" y1="30" x2="136" y2="50" />
            <line x1="148" y1="30" x2="156" y2="50" />
          </g>
        </svg>

        {/* Left edge: tripod silhouette */}
        <svg
          {...common}
          width="120"
          height="260"
          viewBox="0 0 120 260"
          style={{ ...common.style, left: 28, top: "28%" }}
        >
          {/* camera head */}
          <rect x="30" y="18" width="60" height="32" />
          <circle cx="60" cy="34" r="10" />
          {/* mount */}
          <line x1="60" y1="50" x2="60" y2="68" />
          {/* three legs */}
          <line x1="60" y1="68" x2="18" y2="240" />
          <line x1="60" y1="68" x2="60" y2="240" />
          <line x1="60" y1="68" x2="102" y2="240" />
          {/* cross braces */}
          <line x1="36" y1="160" x2="84" y2="160" opacity={0.6} />
        </svg>
      </div>
    );
  }

  if (variant === "imaginedFutures") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Top-right: small rocket with exhaust */}
        <svg
          {...common}
          width="140"
          height="260"
          viewBox="0 0 140 260"
          style={{ ...common.style, top: 50, right: 50 }}
        >
          {/* cone */}
          <path d="M 70 14 L 48 70 L 92 70 Z" />
          {/* body */}
          <rect x="48" y="70" width="44" height="100" />
          <line x1="60" y1="70" x2="60" y2="170" />
          <line x1="80" y1="70" x2="80" y2="170" />
          <circle cx="70" cy="110" r="8" />
          {/* fins */}
          <path d="M 48 140 L 28 180 L 48 170 Z" />
          <path d="M 92 140 L 112 180 L 92 170 Z" />
          {/* exhaust plume dots */}
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <circle key={k} cx={60 + (k % 3) * 10} cy={185 + k * 10} r="1.6" />
          ))}
        </svg>

        {/* Bottom-left: vintage CRT television with rabbit-ears */}
        <svg
          {...common}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          style={{ ...common.style, left: 40, bottom: 40 }}
        >
          {/* rabbit-ear antenna */}
          <line x1="80" y1="24" x2="58" y2="2" />
          <line x1="120" y1="24" x2="142" y2="2" />
          <circle cx="58" cy="2" r="2" />
          <circle cx="142" cy="2" r="2" />
          {/* set body */}
          <rect x="20" y="28" width="160" height="120" rx="10" />
          {/* screen */}
          <rect x="34" y="42" width="116" height="92" rx="6" />
          {/* dial knobs */}
          <circle cx="162" cy="62" r="6" />
          <circle cx="162" cy="84" r="6" />
          <line x1="162" y1="56" x2="162" y2="68" />
          <line x1="156" y1="84" x2="168" y2="84" />
          {/* legs */}
          <line x1="40" y1="148" x2="32" y2="176" />
          <line x1="160" y1="148" x2="168" y2="176" />
        </svg>

        {/* Right edge: constellation — dots connected by thin lines */}
        <svg
          {...common}
          width="200"
          height="240"
          viewBox="0 0 200 240"
          style={{ ...common.style, right: 30, top: "38%" }}
        >
          <line x1="30" y1="40" x2="80" y2="90" />
          <line x1="80" y1="90" x2="140" y2="60" />
          <line x1="80" y1="90" x2="120" y2="150" />
          <line x1="120" y1="150" x2="180" y2="130" />
          <line x1="120" y1="150" x2="70" y2="200" />
          {[
            [30, 40],
            [80, 90],
            [140, 60],
            [120, 150],
            [180, 130],
            [70, 200],
          ].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r="2.5" />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === "cautionaryTales") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Top-right: hourglass */}
        <svg
          {...common}
          width="140"
          height="220"
          viewBox="0 0 140 220"
          style={{ ...common.style, top: 60, right: 50 }}
        >
          <line x1="24" y1="14" x2="116" y2="14" />
          <line x1="24" y1="206" x2="116" y2="206" />
          {/* upper triangle */}
          <path d="M 30 14 L 110 14 L 70 110 Z" />
          {/* lower triangle */}
          <path d="M 30 206 L 110 206 L 70 110 Z" />
          {/* sand dot falling */}
          <circle cx="70" cy="130" r="1.8" />
          <circle cx="70" cy="148" r="1.8" />
          <circle cx="70" cy="166" r="1.8" />
          {/* sand piles */}
          <path d="M 52 206 Q 70 180 88 206" />
        </svg>

        {/* Left edge: cracked oval mirror */}
        <svg
          {...common}
          width="160"
          height="300"
          viewBox="0 0 160 300"
          style={{ ...common.style, left: 32, top: "26%" }}
        >
          {/* oval frame */}
          <ellipse cx="80" cy="140" rx="64" ry="110" />
          <ellipse cx="80" cy="140" rx="54" ry="98" />
          {/* zigzag crack through the glass */}
          <path d="M 58 52 L 88 96 L 62 140 L 96 182 L 72 230" />
          {/* support stand */}
          <line x1="80" y1="250" x2="80" y2="280" />
          <line x1="54" y1="280" x2="106" y2="280" />
        </svg>

        {/* Bottom-right: unplugged cable + socket */}
        <svg
          {...common}
          width="220"
          height="160"
          viewBox="0 0 220 160"
          style={{ ...common.style, right: 40, bottom: 40 }}
        >
          {/* wall socket */}
          <rect x="8" y="44" width="52" height="72" rx="4" />
          <circle cx="24" cy="72" r="2.5" />
          <circle cx="44" cy="72" r="2.5" />
          <line x1="34" y1="92" x2="34" y2="104" />
          {/* cable dangling away unplugged */}
          <path d="M 80 80 Q 110 40 150 90 T 200 88" />
          {/* trapezoid plug */}
          <path d="M 196 76 L 216 72 L 216 104 L 196 100 Z" />
          <line x1="196" y1="84" x2="188" y2="84" />
          <line x1="196" y1="92" x2="188" y2="92" />
        </svg>
      </div>
    );
  }

  if (variant === "founderMythology") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Top-right: laurel wreath */}
        <svg
          {...common}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          style={{ ...common.style, top: 60, right: 40 }}
        >
          {/* two curved branches meeting at top */}
          <path d="M 100 24 Q 40 60 44 150" />
          <path d="M 100 24 Q 160 60 156 150" />
          {/* leaves along left branch */}
          {[
            [60, 50],
            [48, 78],
            [42, 106],
            [44, 132],
          ].map(([cx, cy], k) => (
            <ellipse
              key={`l${k}`}
              cx={cx}
              cy={cy}
              rx="8"
              ry="4"
              transform={`rotate(${-40 + k * 10} ${cx} ${cy})`}
            />
          ))}
          {/* leaves along right branch */}
          {[
            [140, 50],
            [152, 78],
            [158, 106],
            [156, 132],
          ].map(([cx, cy], k) => (
            <ellipse
              key={`r${k}`}
              cx={cx}
              cy={cy}
              rx="8"
              ry="4"
              transform={`rotate(${40 - k * 10} ${cx} ${cy})`}
            />
          ))}
          {/* ribbon knot at bottom */}
          <path d="M 80 160 Q 100 178 120 160" />
          <path d="M 88 168 L 68 186" />
          <path d="M 112 168 L 132 186" />
        </svg>

        {/* Bottom-left: trophy cup on pedestal */}
        <svg
          {...common}
          width="180"
          height="240"
          viewBox="0 0 180 240"
          style={{ ...common.style, left: 40, bottom: 40 }}
        >
          {/* bowl */}
          <path d="M 54 28 Q 54 130 90 130 Q 126 130 126 28 Z" />
          {/* rim */}
          <ellipse cx="90" cy="28" rx="36" ry="6" />
          {/* handles */}
          <path d="M 54 46 Q 24 60 54 96" />
          <path d="M 126 46 Q 156 60 126 96" />
          {/* stem */}
          <line x1="78" y1="130" x2="78" y2="170" />
          <line x1="102" y1="130" x2="102" y2="170" />
          <rect x="70" y="170" width="40" height="8" />
          {/* base */}
          <rect x="56" y="178" width="68" height="18" />
          <rect x="46" y="196" width="88" height="10" />
        </svg>

        {/* Right edge: framed portrait silhouette */}
        <svg
          {...common}
          width="150"
          height="220"
          viewBox="0 0 150 220"
          style={{ ...common.style, right: 32, top: "30%" }}
        >
          <rect x="10" y="10" width="130" height="180" />
          <rect x="22" y="22" width="106" height="156" />
          {/* oval head + shoulders silhouette */}
          <ellipse cx="75" cy="86" rx="22" ry="26" />
          <path d="M 36 178 Q 75 116 114 178" />
          {/* label plate */}
          <rect x="50" y="196" width="50" height="12" />
        </svg>
      </div>
    );
  }

  return null;
}
