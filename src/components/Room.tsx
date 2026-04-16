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
import { DescendantIcon } from "./DescendantIcon";
import { useIsMobile } from "../lib/useIsMobile";

interface Props {
  roomId: string;
  palette: Palette;
}

const HUB: CanvasPos = { left: "50%", top: "54%" };

export function Room({ roomId, palette }: Props) {
  const exhibits: Exhibit[] = Object.values(EXHIBITS).filter(
    (e) => e.room === roomId,
  );
  const positions = exhibitGrid(exhibits.length);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mobile = useIsMobile();

  const selected = selectedId
    ? exhibits.find((e) => e.id === selectedId) ?? null
    : null;

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

  // ───────── MOBILE LAYOUT ─────────
  if (mobile) {
    // Mobile selected: full-width detail + vertical descendant list
    if (selected) {
      return (
        <div style={{ padding: "0 20px 32px" }}>
          <div
            onClick={() => setSelectedId(null)}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "start",
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 100,
                flexShrink: 0,
                aspectRatio: "2 / 3",
                overflow: "hidden",
                boxShadow: "0 12px 24px -10px rgba(0,0,0,.3)",
              }}
            >
              <PosterImg artKey={selected.art} palette={palette} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 8.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: palette.accent,
                  marginBottom: 6,
                }}
              >
                {selected.year} · {selected.medium.split(" · ")[0]}
              </div>
              <div
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: 20,
                  lineHeight: 1.15,
                  color: palette.ink,
                  marginBottom: 8,
                }}
              >
                {selected.title}
              </div>
              <div
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontStyle: "italic",
                  fontSize: 12,
                  lineHeight: 1.45,
                  color: palette.dim,
                }}
              >
                {selected.demand}
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: palette.accent,
              marginBottom: 14,
              paddingTop: 14,
              borderTop: `1px solid ${palette.faint}`,
            }}
          >
            Descendants
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {selected.descendants.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: "50%",
                    border: `1.4px solid ${palette.accent}`,
                    background: palette.bg,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "78%", height: "78%" }}>
                    <DescendantIcon
                      kind={d.kind}
                      name={d.name}
                      palette={palette}
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 7.5,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: palette.accent,
                      marginBottom: 2,
                    }}
                  >
                    {d.kind}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontSize: 13,
                      lineHeight: 1.2,
                      color: palette.ink,
                      marginBottom: 3,
                    }}
                  >
                    {d.name}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontStyle: "italic",
                      fontSize: 11,
                      lineHeight: 1.35,
                      color: palette.dim,
                    }}
                  >
                    {d.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSelectedId(null)}
            style={{
              marginTop: 24,
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: palette.dim,
            }}
          >
            ← Back to exhibits
          </button>
        </div>
      );
    }

    // Mobile unselected: 2-col grid of exhibit posters
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          padding: "0 20px 32px",
        }}
      >
        {exhibits.map((ex) => (
          <div
            key={ex.id}
            onClick={() => toggle(ex.id)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                aspectRatio: "2 / 3",
                overflow: "hidden",
                boxShadow: "0 8px 18px -8px rgba(0,0,0,.28)",
              }}
            >
              <PosterImg artKey={ex.art} palette={palette} />
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 11,
                lineHeight: 1.2,
                color: palette.ink,
              }}
            >
              {ex.title}
            </div>
            <div
              style={{
                marginTop: 3,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: palette.accent,
              }}
            >
              {ex.year}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ───────── DESKTOP LAYOUT (unchanged) ─────────
  return (
    <>
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
