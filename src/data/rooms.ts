import type { Room } from "./types";

// Positions are absolute on the canvas (not relative) for simplicity.
// Rooms appear when their subwing is open; collapse when closed.
export const ROOMS: Room[] = [
  // Wing I: Built for the Screen (4 rooms scattered on its own page)
  {
    id: "motionControl",
    subwing: "builtForScreen",
    title: "Motion Control & Miniatures",
    blurb: "The pre-digital craft — cameras and models doing the work.",
    pos: { left: "22%", top: "42%" },
    rotate: -1.5,
    heroArt: "starWars",
  },
  {
    id: "renderFarm",
    subwing: "builtForScreen",
    title: "The Render Farm",
    blurb: "Computation becomes an artistic medium.",
    pos: { left: "48%", top: "56%" },
    rotate: 0.8,
    heroArt: "toyStory",
  },
  {
    id: "virtualSet",
    subwing: "builtForScreen",
    title: "The Virtual Set",
    blurb: "Impossible spaces, made real on stage.",
    pos: { left: "74%", top: "42%" },
    rotate: -0.8,
    heroArt: "mando",
  },
  {
    id: "escapees",
    subwing: "builtForScreen",
    title: "The Escapees",
    blurb: "Tools that left cinema to remake the world.",
    pos: { left: "50%", top: "78%" },
    rotate: 1.0,
    heroArt: null,
  },

  // Wing II: Imagined Futures (2 rooms)
  {
    id: "imaginedInterfaces",
    subwing: "imaginedFutures",
    title: "Imagined Interfaces",
    blurb: "Screens that taught the real world how to look.",
    pos: { left: "34%", top: "48%" },
    rotate: -1.2,
    heroArt: "odyssey",
  },
  {
    id: "fictionMadeReal",
    subwing: "imaginedFutures",
    title: "Fiction Made Real",
    blurb: "Screen tech that manufacturers later actually built.",
    pos: { left: "64%", top: "54%" },
    rotate: 1.0,
    heroArt: "bttf2",
  },

  // Wing III: Cautionary Tales (3 rooms)
  {
    id: "techAnxiety",
    subwing: "cautionaryTales",
    title: "Tech Anxiety",
    blurb: "The fears fiction planted, then we grew.",
    pos: { left: "22%", top: "48%" },
    rotate: -1.3,
    heroArt: "terminator",
  },
  {
    id: "aiImagination",
    subwing: "cautionaryTales",
    title: "AI Imagination",
    blurb: "How we picture artificial minds.",
    pos: { left: "50%", top: "58%" },
    rotate: 0.9,
    heroArt: "her",
  },
  {
    id: "hackerArchetypes",
    subwing: "cautionaryTales",
    title: "Hacker Archetypes",
    blurb: "Who we think techies are, and why.",
    pos: { left: "76%", top: "46%" },
    rotate: -0.8,
    heroArt: "hackers",
  },

  // Wing IV: Founder Mythology (2 rooms — split by angle)
  {
    id: "mythMakers",
    subwing: "founderMythology",
    title: "The Myth-Makers",
    blurb: "Origin stories. The founder as hero, genius, visionary.",
    pos: { left: "32%", top: "48%" },
    rotate: -1.2,
    heroArt: "social",
  },
  {
    id: "theFall",
    subwing: "founderMythology",
    title: "The Fall",
    blurb: "When the mythology breaks — disgrace, indictment, collapse.",
    pos: { left: "66%", top: "54%" },
    rotate: 1.2,
    heroArt: "dropout",
  },
];
