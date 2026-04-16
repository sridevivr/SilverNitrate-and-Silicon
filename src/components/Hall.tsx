import type { Palette, Subwing } from "../data/types";
import { SUBWINGS } from "../data/subwings";
import { FloatingNode } from "./FloatingNode";
import { PosterImg } from "./PosterImg";
import { useIsMobile } from "../lib/useIsMobile";

interface Props {
  palette: Palette;
  onEnterSubwing: (id: string) => void;
}

export function Hall({ palette, onEnterSubwing }: Props) {
  const mobile = useIsMobile();

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
        {SUBWINGS.map((sw: Subwing) => (
          <div
            key={sw.id}
            onClick={() => onEnterSubwing(sw.id)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                aspectRatio: "4 / 5",
                overflow: "hidden",
                boxShadow: "0 10px 22px -12px rgba(0,0,0,.22)",
              }}
            >
              <PosterImg artKey={sw.heroArt} palette={sw.palette} tint={0.1} />
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
              Sub-Wing · {sw.numeral}
            </div>
            <div
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.15,
                color: palette.ink,
                marginBottom: 3,
              }}
            >
              {sw.title}
            </div>
            <div
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontStyle: "italic",
                fontSize: 10,
                lineHeight: 1.3,
                color: palette.dim,
              }}
            >
              {sw.subtitle}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {SUBWINGS.map((sw: Subwing, idx: number) => (
        <FloatingNode
          key={sw.id}
          pos={sw.pos}
          size={120}
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
