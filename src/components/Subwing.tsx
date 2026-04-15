import type { Palette, Room, Subwing as SubwingType } from "../data/types";
import { ROOMS } from "../data/rooms";
import { FloatingNode } from "./FloatingNode";
import { PosterImg } from "./PosterImg";

interface Props {
  subwing: SubwingType;
  palette: Palette;
  onEnterRoom: (id: string) => void;
}

/**
 * Sub-wing page: the rooms that belong to this sub-wing, laid out in a
 * clean grid per the positions in src/data/rooms.ts.
 */
export function Subwing({ subwing, palette, onEnterRoom }: Props) {
  const rooms: Room[] = ROOMS.filter((r) => r.subwing === subwing.id);
  // 4-room 2x2 grids are vertically crowded — use smaller cards so
  // the subtitle under the bottom row still fits in the viewport.
  const cardSize = rooms.length >= 4 ? 120 : 130;
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
                }}
              >
                {r.blurb}
              </div>
            </div>
          )}
        </FloatingNode>
      ))}
    </>
  );
}
