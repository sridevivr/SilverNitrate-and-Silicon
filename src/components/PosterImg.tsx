import type { Palette } from "../data/types";
import { posterSrc } from "../lib/posters";
import { AbstractArt } from "./AbstractArt";

interface Props {
  artKey: string | null | undefined;
  palette: Palette;
  /** Optional accent-colored overlay blend. 0 = none. */
  tint?: number;
}

export function PosterImg({ artKey, palette, tint = 0 }: Props) {
  const src = posterSrc(artKey);
  if (!src) return <AbstractArt id={artKey ?? "unknown"} palette={palette} />;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: palette.tone,
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "saturate(0.9) contrast(0.97)",
        }}
      />
      {tint > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: palette.accent,
            mixBlendMode: "multiply",
            opacity: tint,
          }}
        />
      )}
    </div>
  );
}
