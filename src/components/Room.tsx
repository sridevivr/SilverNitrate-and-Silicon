import { useState } from "react";
import type { CanvasPos, Exhibit, Palette } from "../data/types";
import { EXHIBITS } from "../data/exhibits";
import {
  exhibitGrid,
  descendantConstellation,
  safeStartAngle,
} from "../lib/positions";
import { PosterImg } from "./PosterImg";
import { DescendantSatellite } from "./DescendantSatellite";

interface Props {
  roomId: string;
  palette: Palette;
}

// Hub position when an exhibit is selected. Sitting slightly above
// dead center gives the bottom satellite more room for its label.
const HUB: CanvasPos = { left: "50%", top: "54%" };

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
  // when an exhibit is selected. Starting angle depends on count so
  // no satellite lands directly above the hub poster. Radius is a
  // touch larger than "visually round" to give each label a clean
  // corridor outside the poster footprint.
  const satellitePositions = selected
    ? descendantConstellation(
        HUB,
        selected.descendants.length,
        24,
        26,
        safeStartAngle(selected.descendants.length),
      )
    : [];

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
        const size = isSel ? 132 : 104;
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
                position: "relative",
                aspectRatio: "2 / 3",
                overflow: "hidden",
                boxShadow: isSel
                  ? "0 22px 44px -16px rgba(0,0,0,.38)"
                  : "0 10px 22px -12px rgba(0,0,0,.28)",
                transition: "box-shadow 500ms",
              }}
            >
              <PosterImg artKey={ex.art} palette={palette} />

              {/* When selected, render year + title as a caption strip
                  overlaid on the bottom of the poster so the card
                  footprint stays equal to the poster itself — no extra
                  text below to push into the constellation. */}
              {isSel && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "8px 10px 9px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.55) 60%, rgba(0,0,0,0))",
                    color: "#f5f2ec",
                    textAlign: "center",
                    animation: "fadeIn 400ms ease 200ms both",
                  }}
                >
                  <div
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 7.5,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      opacity: 0.85,
                      marginBottom: 3,
                    }}
                  >
                    {ex.year} · {ex.medium.split(" · ")[0]}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontSize: 13,
                      lineHeight: 1.15,
                      fontWeight: 400,
                    }}
                  >
                    {ex.title}
                  </div>
                </div>
              )}
            </div>

            {/* Grid-state label below the poster. Hidden when selected
                so the constellation layout has clean vertical space. */}
            {!isSel && (
              <>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontSize: 11,
                    lineHeight: 1.2,
                    color: palette.ink,
                    textAlign: "center",
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
              </>
            )}
          </div>
        );
      })}

      {/* Satellites bloom radially around the selected exhibit.
          Lines were removed per user feedback — the clean orbital
          layout is enough to communicate the relationship. */}
      {selected &&
        selected.descendants.map((d, i) => (
          <DescendantSatellite
            key={`${selected.id}-${i}`}
            descendant={d}
            pos={satellitePositions[i]}
            palette={palette}
            delay={i * 90 + 220}
          />
        ))}
    </>
  );
}
