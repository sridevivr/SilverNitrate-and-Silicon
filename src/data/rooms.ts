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
    blurb: "Before computers rendered a single pixel, filmmakers built futures by hand. Motion-control rigs and meticulously detailed miniatures achieved what audiences believed was impossible, and set the foundation for everything digital that followed.",
    pos: { left: "30%", top: "47%" },
    rotate: 0,
    heroArt: "starWars",
  },
  {
    id: "renderFarm",
    subwing: "builtForScreen",
    title: "The Render Farm",
    blurb: "The moment cinema handed the frame to a computer, a new art form was born. From Tron's wireframe geometry to Avatar's alien biosphere, this room traces the escalation of digital imagery and the infrastructure it required.",
    pos: { left: "70%", top: "47%" },
    rotate: 0,
    heroArt: "toyStory",
  },
  {
    id: "virtualSet",
    subwing: "builtForScreen",
    title: "The Virtual Set",
    blurb: "What began as a camera trick became an entire production architecture. LED walls, real-time game engines, and virtual production stages now define how prestige television and blockbuster film are made.",
    pos: { left: "30%", top: "80%" },
    rotate: 0,
    heroArt: "mando",
  },
  {
    id: "escapees",
    subwing: "builtForScreen",
    title: "The Escapees",
    blurb: "Photoshop, RenderMan, Avid, Nuke: each was created to solve a specific problem in film production. Today they power industries far beyond cinema, from advertising to architecture to social media. The tools outgrew the medium that made them.",
    pos: { left: "70%", top: "80%" },
    rotate: 0,
    heroArt: null,
  },

  // Wing II: Imagined Futures — 1×2 row
  {
    id: "imaginedInterfaces",
    subwing: "imaginedFutures",
    title: "Imagined Interfaces",
    blurb: "The screens inside the screen. When Star Trek showed a communicator, Motorola built a flip phone. When Minority Report showed gesture control, its designer founded a company to build it. This room maps the direct lines from fictional interface to shipping product.",
    pos: { left: "35%", top: "70%" },
    rotate: 0,
    heroArt: "odyssey",
  },
  {
    id: "fictionMadeReal",
    subwing: "imaginedFutures",
    title: "Fiction Made Real",
    blurb: "Hoverboards, self-lacing shoes, self-driving taxis, face ID: films like Back to the Future, Total Recall, and Mission: Impossible depicted these technologies years before engineers delivered them. This room tracks what arrived and what is still in progress.",
    pos: { left: "65%", top: "70%" },
    rotate: 0,
    heroArt: "bttf2",
  },

  // Wing III: Cautionary Tales — 1×3 row
  {
    id: "techAnxiety",
    subwing: "cautionaryTales",
    title: "Tech Anxiety",
    blurb: "Every generation's deepest technology fears have been rehearsed on screen first. Skynet, the simulation hypothesis, the social credit dystopia: cinema gave us the vocabulary to argue about AI, surveillance, and control before we needed it.",
    pos: { left: "25%", top: "70%" },
    rotate: 0,
    heroArt: "terminator",
  },
  {
    id: "aiImagination",
    subwing: "cautionaryTales",
    title: "AI Imagination",
    blurb: "How do you picture a mind that does not exist yet? Cinema's attempts, from HAL to Samantha to the Westworld hosts, have become the reference points that AI researchers, product designers, and ethicists reach for when explaining what they are building.",
    pos: { left: "50%", top: "70%" },
    rotate: 0,
    heroArt: "her",
  },
  {
    id: "hackerArchetypes",
    subwing: "cautionaryTales",
    title: "Hacker Archetypes",
    blurb: "The hacker as rebel, as criminal, as savior. From WarGames to Mr. Robot, cinema defined the public image of the technologist: what they look like, how they talk, what motivates them. These portrayals influenced a generation's understanding of computer culture.",
    pos: { left: "75%", top: "70%" },
    rotate: 0,
    heroArt: "hackers",
  },

  // Wing IV: Founder Mythology — 1×2 row
  {
    id: "mythMakers",
    subwing: "founderMythology",
    title: "The Myth-Makers",
    blurb: "Origin stories of Silicon Valley, told by Hollywood. The founder as hero, genius, visionary: and the template that a generation of real founders aspired to embody.",
    pos: { left: "35%", top: "70%" },
    rotate: 0,
    heroArt: "social",
  },
  {
    id: "theFall",
    subwing: "founderMythology",
    title: "The Fall",
    blurb: "When the mythology breaks. Theranos, WeWork, Uber: each rise and collapse was dramatized on screen, turning complex corporate failures into accessible morality plays about ambition and accountability.",
    pos: { left: "65%", top: "70%" },
    rotate: 0,
    heroArt: "dropout",
  },
];
