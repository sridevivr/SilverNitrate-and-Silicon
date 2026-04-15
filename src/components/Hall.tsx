import type { Palette, Subwing } from "../data/types";
import { SUBWINGS } from "../data/subwings";
import { FloatingNode } from "./FloatingNode";
import { PosterImg } from "./PosterImg";

interface Props {
  palette: Palette;
  onEnterSubwing: (id: string) => void;
}

/**
 * The hall — four sub-wing doorways in quadrants on a single canvas.
 * Clicking a doorway hands control back to the parent view state.
 */
export function Hall({ palette, onEnterSubwing }: Props) {
  return (
    <>
      {SUBWINGS.map((sw: Subwing, idx: number) => (
        <FloatingNode
          key={sw.id}
          pos={sw.pos}
          size={148}
          rotate={sw.rotate}
          depth={1.0}
          visible
          delay={idx * 80}
          onClick={() => onEnterSubwing(sw.id)}
        >
          {() => (
            <div>
              <div
                style={{
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  boxShadow: "0 14px 30px -14px rgba(0,0,0,.22)",
                }}
              >
                <PosterImg artKey={sw.heroArt} palette={sw.palette} tint={0.1} />
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: palette.accent,
                  marginBottom: 5,
                }}
              >
                Sub-Wing · {sw.numeral}
              </div>
              <div
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 400,
                  fontSize: 17,
                  lineHeight: 1.15,
                  color: palette.ink,
                  marginBottom: 4,
                }}
              >
                {sw.title}
              </div>
              <div
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontStyle: "italic",
                  fontSize: 11.5,
                  lineHeight: 1.35,
                  color: palette.dim,
                }}
              >
                {sw.subtitle}
              </div>
            </div>
          )}
        </FloatingNode>
      ))}
    </>
  );
}
