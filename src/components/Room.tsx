import { Fragment, useState } from "react";
import type { CanvasPos, Exhibit, Palette } from "../data/types";
import { EXHIBITS } from "../data/exhibits";
import { exhibitGrid, descendantConstellation } from "../lib/positions";
import { PosterImg } from "./PosterImg";
import { DescendantSatellite } from "./DescendantSatellite";

interface Props {
  roomId: string;
  palette: Palette;
}

// Fixed hub position when an exhibit is selected. Satellites bloom
// around this point so the constellation is always centered in the
// available canvas regardless of the exhibit's original grid slot.
const HUB: CanvasPos = { left: "50%", top: "56%" };

export function Room({ roomId, palette }: Props) {
  const exhibits: Exhibit[] = Object.values(EXHIBITS).filter(
    (e) => e.room === roomId,
  );
  const positions = exhibitGrid(exhibits.length);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? exhibits.find((e) => e.id === selectedId) ?? null
    : null;

  // Constellation positions computed fresh each render — only used
  // when an exhibit is selected.
  const satellitePositions = selected
    ? descendantConstellation(HUB, selected.descendants.length, 22, 24)
    : [];

  const cx = parseFloat(HUB.left);
  const cy = parseFloat(HUB.top);

  const toggle = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Click-anywhere backdrop to deselect (sits below cards) */}
      {selected && (
        <div
          onClick={() => setSelectedId(null)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            cursor: "default",
          }}
        />
      )}

      {/* Exhibit cards: grid in neutral state, one centered in constellation mode */}
      {exhibits.map((ex, idx) => {
        const gridPos = positions[idx];
        const isSel = selectedId === ex.id;
        const isDim = selectedId !== null && !isSel;
        const pos = isSel ? HUB : gridPos;
        const size = isSel ? 148 : 104;
        return (
          <div
            key={ex.id}
            onClick={(e) => {
              e.stopPropagation();
              toggle(ex.id);
            }}
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              width: size,
              transform: "translate(-50%, -50%)",
              transition:
                "left 700ms cubic-bezier(.2,.8,.2,1), " +
                "top 700ms cubic-bezier(.2,.8,.2,1), " +
                "width 700ms cubic-bezier(.2,.8,.2,1), " +
                "opacity 500ms ease",
              opacity: isDim ? 0 : 1,
              pointerEvents: isDim ? "none" : "auto",
              cursor: "pointer",
              zIndex: isSel ? 20 : 5,
            }}
          >
            <div
              style={{
                aspectRatio: "2 / 3",
                overflow: "hidden",
                boxShadow: isSel
                  ? "0 22px 44px -16px rgba(0,0,0,.38)"
                  : "0 10px 22px -12px rgba(0,0,0,.28)",
                transition: "box-shadow 500ms",
              }}
            >
              <PosterImg artKey={ex.art} palette={palette} />
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: isSel ? 15 : 11,
                lineHeight: 1.2,
                color: palette.ink,
                textAlign: "center",
                transition: "font-size 500ms",
              }}
            >
              {ex.title}
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 8.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: palette.accent,
                textAlign: "center",
              }}
            >
              {ex.year} · {ex.medium.split(" · ")[0]}
            </div>
          </div>
        );
      })}

      {/* Constellation lines + satellites (only when something's selected) */}
      {selected && (
        <Fragment>
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 3,
              overflow: "visible",
            }}
          >
            {satellitePositions.map((p, i) => (
              <line
                key={i}
                x1={`${cx}%`}
                y1={`${cy}%`}
                x2={p.left}
                y2={p.top}
                stroke={palette.accent}
                strokeWidth="0.9"
                strokeOpacity="0.55"
                strokeDasharray="600"
                strokeDashoffset="600"
                style={{
                  animation: `drawIn 900ms cubic-bezier(.2,.8,.2,1) ${
                    i * 90 + 220
                  }ms forwards`,
                }}
              />
            ))}
            <circle
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="3"
              fill={palette.accent}
              opacity="0.85"
              style={{ animation: "fadeIn 400ms ease 120ms both" }}
            />
          </svg>

          {selected.descendants.map((d, i) => (
            <DescendantSatellite
              key={`${selected.id}-${i}`}
              descendant={d}
              pos={satellitePositions[i]}
              palette={palette}
              delay={i * 90 + 320}
            />
          ))}
        </Fragment>
      )}
    </>
  );
}
