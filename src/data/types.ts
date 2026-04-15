export interface Palette {
  bg: string;
  ink: string;
  dim: string;
  faint: string;
  accent: string;
  tone: string;
}

export interface CanvasPos {
  left: string;
  top: string;
}

export interface Subwing {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  pos: CanvasPos;
  rotate: number;
  palette: Palette;
  heroArt: string;
}

export interface Room {
  id: string;
  subwing: string;
  title: string;
  blurb: string;
  pos: CanvasPos;
  rotate: number;
  heroArt: string | null;
}

export type DescendantKind =
  | "person"
  | "company"
  | "product"
  | "software"
  | "concept"
  | "meme"
  | "device";

export interface Descendant {
  kind: DescendantKind;
  name: string;
  desc: string;
}

export interface Exhibit {
  id: string;
  room: string;
  title: string;
  year: string;
  medium: string;
  demand: string;
  legacy: string;
  art: string;
  descendants: Descendant[];
}
