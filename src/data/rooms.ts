import type { Room } from "./types";

// Positions are laid out as a clean grid per subwing.
// Wing I (4 rooms) → 2×2. Wings II & IV (2 rooms each) → 1×2 row.
// Wing III (3 rooms) → 1×3 row.
// No rotations; the quadrant layout carries the order.
export const ROOMS: Room[] = [
  // Wing I: Built for the Screen — 2×2 grid
  {
    id: "motionControl",
    subwing: "builtForScreen",
    title: "Motion Control & Miniatures",
    blurb: "The pre-digital craft — cameras and models doing the work.",
    pos: { left: "30%", top: "58%" },
    rotate: 0,
    heroArt: "starWars",
  },
  {
    id: "renderFarm",
    subwing: "builtForScreen",
    title: "The Render Farm",
    blurb: "Computation becomes an artistic medium.",
    pos: { left: "70%", top: "58%" },
    rotate: 0,
    heroArt: "toyStory",
  },
  {
    id: "virtualSet",
    subwing: "builtForScreen",
    title: "The Virtual Set",
    blurb: "Impossible spaces, made real on stage.",
    pos: { left: "30%", top: "85%" },
    rotate: 0,
    heroArt: "mando",
  },
  {
    id: "escapees",
    subwing: "builtForScreen",
    title: "The Escapees",
    blurb: "Tools that left cinema to remake the world.",
    pos: { left: "70%", top: "85%" },
    rotate: 0,
    heroArt: null,
  },

  // Wing II: Imagined Futures — 1×2 row
  {
    id: "imaginedInterfaces",
    subwing: "imaginedFutures",
    title: "Imagined Interfaces",
    blurb: "Screens that taught the real world how to look.",
    pos: { left: "35%", top: "70%" },
    rotate: 0,
    heroArt: "odyssey",
  },
  {
    id: "fictionMadeReal",
    subwing: "imaginedFutures",
    title: "Fiction Made Real",
    blurb: "Screen tech that manufacturers later actually built.",
    pos: { left: "65%", top: "70%" },
    rotate: 0,
    heroArt: "bttf2",
  },

  // Wing III: Cautionary Tales — 1×3 row
  {
    id: "techAnxiety",
    subwing: "cautionaryTales",
    title: "Tech Anxiety",
    blurb: "The fears fiction planted, then we grew.",
    pos: { left: "25%", top: "70%" },
    rotate: 0,
    heroArt: "terminator",
  },
  {
    id: "aiImagination",
    subwing: "cautionaryTales",
    title: "AI Imagination",
    blurb: "How we picture artificial minds.",
    pos: { left: "50%", top: "70%" },
    rotate: 0,
    heroArt: "her",
  },
  {
    id: "hackerArchetypes",
    subwing: "cautionaryTales",
    title: "Hacker Archetypes",
    blurb: "Who we think techies are, and why.",
    pos: { left: "75%", top: "70%" },
    rotate: 0,
    heroArt: "hackers",
  },

  // Wing IV: Founder Mythology — 1×2 row
  {
    id: "mythMakers",
    subwing: "founderMythology",
    title: "The Myth-Makers",
    blurb: "Origin stories. The founder as hero, genius, visionary.",
    pos: { left: "35%", top: "70%" },
    rotate: 0,
    heroArt: "social",
  },
  {
    id: "theFall",
    subwing: "founderMythology",
    title: "The Fall",
    blurb: "When the mythology breaks — disgrace, indictment, collapse.",
    pos: { left: "65%", top: "70%" },
    rotate: 0,
    heroArt: "dropout",
  },
];
