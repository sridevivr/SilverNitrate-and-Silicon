import type { Subwing } from "./types";

// Arranged in quadrants on the hall canvas.
export const SUBWINGS: Subwing[] = [
  {
    // top-left — engineering origin story
    id: "builtForScreen",
    numeral: "I",
    title: "Built for the Screen",
    subtitle: "Technology demanded into being by the camera",
    pos: { left: "24%", top: "32%" },
    rotate: -1.8,
    palette: {
      bg: "#eef1f2",
      ink: "#1a2128",
      dim: "#7d8891",
      faint: "#c8d0d5",
      accent: "#4a7f9e",
      tone: "#e3e8eb",
    },
    heroArt: "jurassic",
  },
  {
    // top-right — optimistic cultural
    id: "imaginedFutures",
    numeral: "II",
    title: "Imagined Futures",
    subtitle: "The futures cinema pictured — that then arrived",
    pos: { left: "74%", top: "30%" },
    rotate: 1.4,
    palette: {
      bg: "#f3eed8",
      ink: "#2a2414",
      dim: "#8c8364",
      faint: "#ddd2a8",
      accent: "#a67a2e",
      tone: "#e9e0c0",
    },
    heroArt: "starTrek",
  },
  {
    // bottom-left — fear cultural
    id: "cautionaryTales",
    numeral: "III",
    title: "Cautionary Tales",
    subtitle: "The fears cinema planted, then we grew",
    pos: { left: "26%", top: "70%" },
    rotate: 1.2,
    palette: {
      bg: "#e6e4df",
      ink: "#1f2024",
      dim: "#7a7c80",
      faint: "#bec0c3",
      accent: "#9a4a2c",
      tone: "#d5d3cf",
    },
    heroArt: "terminator",
  },
  {
    // bottom-right — mythology cultural
    id: "founderMythology",
    numeral: "IV",
    title: "Founder Mythology",
    subtitle: "The stories we told ourselves about tech power",
    pos: { left: "72%", top: "70%" },
    rotate: -1.5,
    palette: {
      bg: "#efeae2",
      ink: "#231e1a",
      dim: "#887a6e",
      faint: "#ccc0b3",
      accent: "#7a4a3f",
      tone: "#e0d7c8",
    },
    heroArt: "social",
  },
];
