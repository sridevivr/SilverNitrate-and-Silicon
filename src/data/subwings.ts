import type { Subwing } from "./types";

// Arranged in quadrants on the hall canvas.
export const SUBWINGS: Subwing[] = [
  {
    // top-left — engineering origin story
    id: "builtForScreen",
    numeral: "I",
    title: "Built for the Screen",
    subtitle: "Technology demanded into being by the camera",
    description:
      "Films have always needed technology that does not yet exist. To get the shot, filmmakers funded research labs, commissioned new cameras, and built rendering infrastructure that later powered entire industries. This wing traces the tools that were born on set and grew far beyond it.",
    pos: { left: "30%", top: "47%" },
    rotate: 0,
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
    subtitle: "The futures cinema pictured, that then arrived",
    description:
      "Before the engineers built it, the screenwriters imagined it. Flip phones, tablets, voice assistants, gesture interfaces, self-driving taxis: each appeared on screen years or decades before it shipped as a product. This wing follows the line from fiction to consumer reality.",
    pos: { left: "70%", top: "47%" },
    rotate: 0,
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
    description:
      "Cinema has been our early warning system for technology's risks. From Skynet to social credit scores, from deepfakes to grief bots, the anxieties that filmmakers embedded in popular culture shaped how we regulated, debated, and sometimes failed to prevent the real thing. This wing collects the prophecies.",
    pos: { left: "30%", top: "80%" },
    rotate: 0,
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
    description:
      "Hollywood observed Silicon Valley and turned its founders into archetypes. The hoodie-clad genius, the relentless visionary, the charismatic fraud: these characters were cast on screen and then echoed in real boardrooms. This wing examines the mythology of tech power.",
    pos: { left: "70%", top: "80%" },
    rotate: 0,
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
