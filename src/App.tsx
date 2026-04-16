import { useState } from "react";
import type { Palette } from "./data/types";
import { HALL_PALETTE } from "./data/palettes";
import { SUBWINGS } from "./data/subwings";
import { ROOMS } from "./data/rooms";
import { EXHIBITS } from "./data/exhibits";
import { Hall } from "./components/Hall";
import { Subwing } from "./components/Subwing";
import { Room } from "./components/Room";
import { Decorations } from "./components/Decorations";
import { Wordmark } from "./components/chrome/Wordmark";
import { FloorLabel } from "./components/chrome/FloorLabel";
import { BackButton } from "./components/chrome/BackButton";
import { Recorder } from "./components/ambient/Recorder";
import { useIsMobile } from "./lib/useIsMobile";

type View =
  | { type: "hall" }
  | { type: "subwing"; id: string }
  | { type: "room"; subwing: string; id: string };

function paletteFor(view: View): Palette {
  if (view.type === "hall") return HALL_PALETTE;
  const subwingId = view.type === "subwing" ? view.id : view.subwing;
  const sw = SUBWINGS.find((s) => s.id === subwingId);
  return sw ? sw.palette : HALL_PALETTE;
}

type DecorationVariant = React.ComponentProps<typeof Decorations>["variant"];
function decorationVariant(view: View): DecorationVariant {
  if (view.type === "hall") return "hall";
  const subwingId = view.type === "subwing" ? view.id : view.subwing;
  return (subwingId as DecorationVariant) ?? "hall";
}

export default function App() {
  const [view, setView] = useState<View>({ type: "hall" });
  const [fading, setFading] = useState(false);
  const mobile = useIsMobile();

  const go = (next: View) => {
    setFading(true);
    setTimeout(() => {
      setView(next);
      setTimeout(() => setFading(false), 50);
    }, 420);
  };

  const palette = paletteFor(view);

  let breadcrumb: string | null = null;
  let kicker = "";
  let title: React.ReactNode = "";
  let whisper = "";
  let backLabel: string | null = null;
  let backTo: View | null = null;

  if (view.type === "hall") {
    kicker = "Wing · Cinema & Technology";
    title = (
      <>
        Silver Nitrate
        <br />
        &nbsp;&amp; Silicon
      </>
    );
    whisper =
      "A wing devoted to cinema, as told through its technology. Four doorways open from this hall — click to enter.";
  } else if (view.type === "subwing") {
    const sw = SUBWINGS.find((s) => s.id === view.id)!;
    breadcrumb = sw.title;
    kicker = `Sub-Wing ${sw.numeral}`;
    title = sw.title;
    whisper = sw.subtitle + ". Click any room to enter.";
    backLabel = "Hall";
    backTo = { type: "hall" };
  } else if (view.type === "room") {
    const sw = SUBWINGS.find((s) => s.id === view.subwing)!;
    const room = ROOMS.find((r) => r.id === view.id)!;
    const exCount = Object.values(EXHIBITS).filter(
      (e) => e.room === room.id,
    ).length;
    breadcrumb = mobile ? room.title : `${sw.title} / ${room.title}`;
    kicker = `Gallery · ${exCount} exhibits`;
    title = room.title;
    whisper = room.blurb + " Click any exhibit to see what it produced.";
    backLabel = sw.title;
    backTo = { type: "subwing", id: view.subwing };
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        height: mobile ? "auto" : "100vh",
        width: "100vw",
        background: palette.bg,
        color: palette.ink,
        position: "relative",
        overflow: mobile ? "auto" : "hidden",
        transition: "background 1100ms ease, color 1100ms ease",
        fontFamily: '"Fraunces", Georgia, serif',
      }}
    >
      <Wordmark palette={palette} breadcrumb={breadcrumb} />
      <FloorLabel
        palette={palette}
        kicker={kicker}
        title={title}
        whisper={whisper}
      />
      {backTo && backLabel && (
        <BackButton
          palette={palette}
          onClick={() => go(backTo!)}
          label={backLabel}
        />
      )}

      <div
        style={{
          position: mobile ? "relative" : "absolute",
          inset: mobile ? undefined : 0,
          opacity: fading ? 0 : 1,
          transition: "opacity 420ms ease",
        }}
      >
        {!mobile && (
          <Decorations variant={decorationVariant(view)} palette={palette} />
        )}

        {view.type === "hall" && (
          <Hall
            palette={palette}
            onEnterSubwing={(id) => go({ type: "subwing", id })}
          />
        )}

        {view.type === "subwing" &&
          (() => {
            const sw = SUBWINGS.find((s) => s.id === view.id)!;
            return (
              <Subwing
                subwing={sw}
                palette={palette}
                onEnterRoom={(id) =>
                  go({ type: "room", subwing: view.id, id })
                }
              />
            );
          })()}

        {view.type === "room" && (
          <Room roomId={view.id} palette={palette} />
        )}
      </div>

      <Recorder palette={palette} />
    </div>
  );
}
