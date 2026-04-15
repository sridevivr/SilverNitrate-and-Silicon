/**
 * Maps an art key (e.g. "starWars") to its poster path under /public/posters/.
 * Returns null if no poster exists for the key — the component should render
 * an AbstractArt fallback in that case.
 */
const POSTER_KEYS = new Set<string>([
  "starWars",
  "odyssey",
  "bladeRunner",
  "tron",
  "abyss",
  "terminator2",
  "jurassic",
  "toyStory",
  "benjaminButton",
  "avatar",
  "matrix",
  "gravity",
  "mando",
  "starTrek",
  "minority",
  "her",
  "ironMan",
  "blackPanther",
  "terminator",
  "warGames",
  "matrixTa",
  "blackMirror",
  "m3gan",
  "exMachina",
  "westworld",
  "afterYang",
  "beRightBack",
  "social",
  "sv",
  "steveJobs",
  "dropout",
  "weCrashed",
  "superPumped",
  "piratesSv",
  "air",
  "bttf2",
  "totalRecall",
  "missionImpossible",
  "hackers",
  "sneakers",
  "theNet",
  "mrRobot",
]);

export function posterSrc(artKey: string | null | undefined): string | null {
  if (!artKey) return null;
  if (!POSTER_KEYS.has(artKey)) return null;
  return `/posters/${artKey}.jpg`;
}
