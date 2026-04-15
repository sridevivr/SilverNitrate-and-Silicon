import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import type { Palette } from "../../data/types";

interface Props {
  palette: Palette;
}

interface ToneBits {
  synth: Tone.PolySynth;
  loop: Tone.Loop;
  reverb: Tone.Reverb;
  filter: Tone.Filter;
}

/**
 * Slow ambient chord pad. A reel-to-reel icon in the bottom-right
 * corner toggles it. The synth graph is constructed once on mount
 * and disposed on unmount.
 */
export function Recorder({ palette }: Props) {
  const [on, setOn] = useState(false);
  const bits = useRef<ToneBits | null>(null);

  useEffect(() => {
    const reverb = new Tone.Reverb({ decay: 12, wet: 0.7 }).toDestination();
    const filter = new Tone.Filter(480, "lowpass").connect(reverb);
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 7, decay: 4, sustain: 0.85, release: 9 },
    }).connect(filter);
    synth.volume.value = -22;

    const chords = [
      ["C3", "E3", "G3", "B3"],
      ["A2", "C3", "E3", "G3"],
      ["F2", "A2", "C3", "E3"],
      ["G2", "B2", "D3", "F3"],
    ];
    let i = 0;
    const loop = new Tone.Loop((t) => {
      synth.triggerAttackRelease(chords[i % 4], 8, t);
      i++;
    }, 9);

    bits.current = { synth, loop, reverb, filter };
    return () => {
      loop.dispose();
      synth.dispose();
      reverb.dispose();
      filter.dispose();
      bits.current = null;
    };
  }, []);

  const toggle = async () => {
    if (!bits.current) return;
    await Tone.start();
    const { loop } = bits.current;
    if (on) {
      loop.stop();
      Tone.Transport.stop();
      setOn(false);
    } else {
      loop.start(0);
      Tone.Transport.start();
      setOn(true);
    }
  };

  return (
    <button
      onClick={toggle}
      style={{
        position: "fixed",
        right: 28,
        bottom: 24,
        zIndex: 20,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 6,
      }}
    >
      <svg width="42" height="22" viewBox="0 0 60 34">
        <circle cx="16" cy="17" r="10" fill="none" stroke={palette.dim} />
        <circle cx="16" cy="17" r="2.5" fill={palette.accent} opacity={on ? 1 : 0.4}>
          {on && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 16 17"
              to="360 16 17"
              dur="4s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle cx="44" cy="17" r="10" fill="none" stroke={palette.dim} />
        <circle cx="44" cy="17" r="2.5" fill={palette.accent} opacity={on ? 1 : 0.4}>
          {on && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 44 17"
              to="360 44 17"
              dur="4s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <line x1="26" y1="17" x2="34" y2="17" stroke={palette.dim} />
      </svg>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: palette.dim,
        }}
      >
        {on ? "Room · Breathing" : "Room · Quiet"}
      </div>
    </button>
  );
}
