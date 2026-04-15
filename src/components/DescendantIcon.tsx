import type { DescendantKind, Palette } from "../data/types";

interface Props {
  kind: DescendantKind;
  name: string;
  palette: Palette;
}

/**
 * A per-kind SVG icon rendered inside a DescendantSatellite circle.
 * Ported from the original Cowork artifact with minor cleanup for
 * circular containers (0 0 140 140 viewBox instead of 140x110).
 */
export function DescendantIcon({ kind, name, palette }: Props) {
  const { accent, ink, tone } = palette;
  const initial = (name || "?").split(/[\s:\/]/)[0].slice(0, 3).toUpperCase();
  const common = {
    viewBox: "0 0 140 140",
    preserveAspectRatio: "xMidYMid meet" as const,
    style: { width: "100%", height: "100%", display: "block" },
  };

  switch (kind) {
    case "person":
      return (
        <svg {...common}>
          <circle cx="70" cy="56" r="22" fill={accent} opacity="0.35" />
          <path d="M 30 120 Q 70 78 110 120 Z" fill={accent} opacity="0.28" />
        </svg>
      );
    case "company":
      return (
        <svg {...common}>
          <rect
            x="20"
            y="52"
            width="100"
            height="38"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
          />
          <text
            x="70"
            y="76"
            textAnchor="middle"
            fontFamily="'Fraunces', serif"
            fontSize="15"
            fill={ink}
            letterSpacing="2"
          >
            {initial}
          </text>
        </svg>
      );
    case "product":
      return (
        <svg {...common}>
          <rect
            x="52"
            y="30"
            width="36"
            height="80"
            rx="6"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
          />
          <rect
            x="58"
            y="38"
            width="24"
            height="54"
            fill={accent}
            opacity="0.22"
          />
          <circle cx="70" cy="102" r="3" fill={accent} />
        </svg>
      );
    case "device":
      return (
        <svg {...common}>
          <rect
            x="28"
            y="44"
            width="84"
            height="54"
            rx="4"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
          />
          <circle cx="70" cy="71" r="10" fill={accent} opacity="0.35" />
          <circle cx="70" cy="71" r="3.5" fill={accent} />
        </svg>
      );
    case "software":
      return (
        <svg {...common}>
          <rect
            x="22"
            y="36"
            width="96"
            height="68"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
          />
          <line
            x1="22"
            y1="52"
            x2="118"
            y2="52"
            stroke={accent}
            strokeOpacity="0.5"
          />
          <circle cx="30" cy="44" r="2" fill={accent} opacity="0.6" />
          <circle cx="38" cy="44" r="2" fill={accent} opacity="0.6" />
          <circle cx="46" cy="44" r="2" fill={accent} opacity="0.6" />
          <rect x="32" y="62" width="40" height="4" fill={accent} opacity="0.35" />
          <rect x="32" y="74" width="60" height="4" fill={accent} opacity="0.35" />
          <rect x="32" y="86" width="30" height="4" fill={accent} opacity="0.35" />
        </svg>
      );
    case "concept":
      return (
        <svg {...common}>
          <g stroke={accent} strokeWidth="1.4" fill="none" opacity="0.95">
            <circle cx="54" cy="70" r="24" />
            <circle cx="86" cy="70" r="24" />
            <circle cx="70" cy="70" r="9" fill={accent} fillOpacity="0.3" />
          </g>
        </svg>
      );
    case "meme":
      return (
        <svg {...common}>
          <path
            d="M 24 32 L 116 32 L 116 82 L 78 82 L 65 98 L 65 82 L 24 82 Z"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
          />
          <text
            x="70"
            y="66"
            textAnchor="middle"
            fontFamily="'Fraunces', serif"
            fontSize="24"
            fontStyle="italic"
            fill={ink}
          >
            "
          </text>
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect
            x="40"
            y="40"
            width="60"
            height="60"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
          />
          <rect x="40" y="40" width="60" height="60" fill={tone} opacity="0.3" />
        </svg>
      );
  }
}
