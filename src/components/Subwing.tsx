import type { Palette, Room, Subwing as SubwingType } from "../data/types";
import { ROOMS } from "../data/rooms";
import { FloatingNode } from "./FloatingNode";
import { PosterImg } from "./PosterImg";
import { useIsMobile } from "../lib/useIsMobile";

interface Props {
  subwing: SubwingType;
  palette: Palette;
  onEnterRoom: (id: string) => void;
}

export function Subwing({ subwing, palette, onEnterRoom }: Props) {
  const rooms: Room[] = ROOMS.filter((r) => r.subwing === subwing.id);
  const mobile = useIsMobile();
  const cardSize = rooms.length >= 4 ? 120 : 130;

  if (mobile) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          padding: "0 20px 32px",
        }}
      >
        {rooms.map((r) => (
          <div
            key={r.id}
            onClick={() => onEnterRoom(r.id)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                aspectRatio: "4 / 5",
                overflow: "hidden",
                boxShadow: "0 10px 22px -12px rgba(0,0,0,.22)",
              }}
            >
              <PosterImg
                artKey={r.heroArt ?? "escapees"}
                palette={palette}
                tint={0.06}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 8,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: palette.accent,
                marginBottom: 3,
              }}
            >
              Gallery
            </div>
            <div
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 13,
                lineHeight: 1.2,
                color: palette.ink,
              }}
            >
              {r.title}
            </div>
            <div
              style={{
                marginTop: 3,
                fontFamily: '"Fraunces", Georgia, serif',
                fontStyle: "italic",
                fontSize: 10,
                lineHeight: 1.3,
                color: palette.dim,
              }}
            >
              {r.blurb}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {rooms.map((r, idx) => (
        <FloatingNode
          key={r.id}
          pos={r.pos}
          size={cardSize}
          rotate={0}
          depth={0.8}
          visible
          delay={idx * 80}
          onClick={() => onEnterRoom(r.id)}
        >
          {() => (
            <div>
              <div
                style={{
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  boxShadow: "0 12px 26px -14px rgba(0,0,0,.25)",
                }}
              >
                <PosterImg
                  artKey={r.heroArt ?? "escapees"}
                  palette={palette}
                  tint={0.06}
                />
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: palette.accent,
                  marginBottom: 4,
                }}
              >
                Gallery
              </div>
              <div
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: 13,
                  lineHeight: 1.2,
                  color: palette.ink,
                }}
              >
                {r.title}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontStyle: "italic",
                  fontSize: 10.5,
                  lineHeight: 1.35,
                  color: palette.dim,
                  maxHeight: 42,
                  overflow: "hidden",
                }}
              >
                {r.blurb.split(". ")[0] + "."}
              </div>
            </div>
          )}
        </FloatingNode>
      ))}
    </>
  );
}
