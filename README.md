# Silver Nitrate & Silicon

A personal, museum-style web experience exploring the relationship between cinema and technology.

It's designed to feel like a **Personal Internet Space** — airy, near-white, content as floating objects, low-contrast type, no busy scrolling. The user explores by clicking, not scrolling. A wing devoted to cinema, as told through its technology.

---

## Thesis

The museum is built around a four-part thesis about how cinema and technology have shaped each other:

1. **Built for the Screen** — cinema forced technology to exist.
2. **Imagined Futures** — cinema imagined futures that arrived.
3. **Cautionary Tales** — cinema taught us fears.
4. **Founder Mythology** — cinema mythologized tech people.

The hall lays these out in four quadrants. Each sub-wing opens into rooms, and each room is a gallery of exhibits — real films or TV shows — each with its own lineage of descendants (products, people, companies, concepts, memes that emerged from it).

**Total content so far:** 4 sub-wings · 11 rooms · 46 exhibits · ~150+ hand-written descendants.

---

## Design vocabulary

These are hard-won taste decisions from the original Cowork session. They should be preserved through every refactor.

- **Aesthetic:** mid-century modern film-archive meets Personal Internet Spaces. Warm ivory hall; each sub-wing shifts palette subtly.
- **Typography:** Fraunces (serif, 300 weight for headlines) + JetBrains Mono (plates/labels, 10px, 0.22em letter-spacing, uppercase).
- **Interactions:** parallax drift on mouse move, staggered fade-ins, long easing curves (~700–900ms), soft shadow lifts on hover.
- **Navigation:** click, don't scroll. Hall → sub-wing → room → exhibit. No modals for exhibit detail — descendants bloom inline around the selected exhibit with thin accent-colored connecting lines (constellation-style).
- **Transitions:** cross-fade both content and palette (~420ms fade out, then page swap, then fade in).
- **Ambient audio:** optional slow chord pad via Tone.js. A small reel-to-reel icon bottom-right toggles it.
- **Decorations:** thin pen-drawing SVG marginalia at ~35% opacity in the palette's dim color. Museum/cozy-home elements in the hall; on-theme elements in each sub-wing.

---

## Palette

| Wing | Background | Ink | Accent | Notes |
|---|---|---|---|---|
| **Hall** | `#f5f2ec` | `#1a1714` | `#b65a3d` | Warm ivory, rust accent |
| **I · Built for the Screen** | `#eef1f2` | `#1a2128` | `#4a7f9e` | Cool slate, engineering blue |
| **II · Imagined Futures** | `#f3eed8` | `#2a2414` | `#a67a2e` | Parchment gold, retrofuturist |
| **III · Cautionary Tales** | `#e6e4df` | `#1f2024` | `#9a4a2c` | Pale grey, warning red-brown |
| **IV · Founder Mythology** | `#efeae2` | `#231e1a` | `#7a4a3f` | Soft taupe, earthen rust |

---

## Tech stack

- **Vite 5** + **React 18** + **TypeScript 5** (strict)
- **Tailwind CSS v3** (arbitrary values enabled; used sparingly — most theming is inline style-prop with palette objects so it can be dynamic per wing)
- **Tone.js 15** for the ambient chord pad (PolySynth → lowpass → reverb, 4 chords, 9s loop)
- Static posters in `public/posters/*.jpg` (42 TMDB posters decoded from base64)

---

## File structure

```
silver-nitrate-and-silicon/
├── public/
│   └── posters/              # 42 JPGs, keyed by exhibit id (starWars.jpg, etc.)
├── src/
│   ├── App.tsx               # view state machine (hall | subwing | room), palette swap
│   ├── main.tsx              # React entry
│   ├── index.css             # Tailwind + global keyframes (fadeIn, riseIn, drawIn)
│   ├── data/
│   │   ├── types.ts          # Palette, Subwing, Room, Exhibit, Descendant
│   │   ├── palettes.ts       # HALL_PALETTE
│   │   ├── subwings.ts       # 4 sub-wings with palettes + quadrant positions
│   │   ├── rooms.ts          # 11 rooms with per-subwing grid positions
│   │   ├── exhibits.ts       # 46 exhibits with descendants
│   │   └── index.ts          # barrel export
│   ├── lib/
│   │   ├── useParallax.ts    # RAF-throttled mouse-normalized hook
│   │   ├── positions.ts      # exhibitScatter, descendantLayout helpers
│   │   └── posters.ts        # posterSrc() — maps art key → /posters/*.jpg
│   └── components/
│       ├── Hall.tsx          # 4 sub-wing doorways in quadrants
│       ├── Subwing.tsx       # rooms laid out in per-wing grids
│       ├── FloatingNode.tsx  # parallax-drifted, hover-lift card primitive
│       ├── PosterImg.tsx     # poster display with AbstractArt fallback
│       ├── AbstractArt.tsx   # SVG fallbacks for software exhibits
│       ├── Decorations.tsx   # pen-drawing SVG layer (5 variants)
│       ├── ambient/
│       │   └── Recorder.tsx  # Tone.js chord pad toggle (reel-to-reel icon)
│       └── chrome/
│           ├── Wordmark.tsx  # top-left diamond + "SILVER NITRATE · SILICON"
│           ├── FloorLabel.tsx# kicker + title + whisper block
│           └── BackButton.tsx# top-right back navigation
├── build_museum.py           # Original source of truth (Python templating)
├── pull_all_posters.py       # TMDB fetcher (used once; tokens embedded, rotate before publishing)
├── all_posters_b64.json      # Original base64 poster bundle (decoded into public/posters)
├── silver-nitrate-and-silicon.jsx  # Original 2MB Cowork artifact (reference only)
├── HANDOFF.md                # Design context from the original session
└── README.md                 # This file
```

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The dev server hot-reloads on every save.

Scripts:
- `npm run dev` — Vite dev server on :5173
- `npm run build` — type check + production build into `dist/`
- `npm run preview` — serve the built `dist/` for smoke testing
- `npm run typecheck` — `tsc -b --noEmit`

---

## What exists today

### The hall

- Wordmark top-left, title/whisper block below it.
- Four sub-wing cards arranged in a **clean 2×2 quadrant grid** (Built for the Screen, Imagined Futures, Cautionary Tales, Founder Mythology), each with its hero poster and subtitle.
- Pen-drawing decorations: tall window with light rays, classical column, potted plant, leaning picture frame.
- Parallax drift on mouse move. Hover lifts each card with a soft shadow.
- Click a card → cross-fades palette and content into that sub-wing.

### Sub-wing pages

- Each sub-wing page shows its rooms laid out in a clean grid:
  - **Built for the Screen** (4 rooms) → 2×2
  - **Cautionary Tales** (3 rooms) → 1×3 row
  - **Imagined Futures** (2 rooms) → 1×2 row
  - **Founder Mythology** (2 rooms) → 1×2 row
- Smaller room cards (130px) with poster, gallery label, title, and italic blurb.
- On-theme pen-drawing decorations (different per wing):
  - **Built for the Screen**: film reel, clapperboard, camera tripod
  - **Imagined Futures**: vintage rocket, CRT television, constellation chart
  - **Cautionary Tales**: hourglass, cracked mirror, unplugged cable
  - **Founder Mythology**: laurel wreath, trophy cup, framed portrait
- Back button top-right returns to the hall.

### Ambient audio

- Reel-to-reel icon bottom-right toggles a slow Tone.js chord pad:
  PolySynth (sine) → lowpass filter at 480 Hz → reverb (decay 12, wet 0.7) → destination.
- Four chord voicings, 8-second sustain, 9-second loop interval, -22 dB.
- Starts muted; first click resumes the Web Audio context.

### Data

- **4 sub-wings** in `src/data/subwings.ts` with palettes and quadrant positions.
- **11 rooms** in `src/data/rooms.ts` with per-subwing grid positions.
- **46 exhibits** in `src/data/exhibits.ts` with demand / legacy / year / medium and full descendant lists.
- **42 posters** in `public/posters/*.jpg` (TMDB w342, decoded from the original base64 bundle).

---

## What's deferred

- **Room view** (`src/components/Room.tsx`) — exhibits scattered inside a room with inline detail bloom on click. Data and `exhibitScatter` helper are already in place.
- **Exhibit detail bloom** (`src/components/DescendantSatellite.tsx`) — constellation-style descendants around the selected exhibit with thin accent-colored connecting lines drawn via SVG. `descendantLayout` helper is ready in `src/lib/positions.ts`.
- **Real descendant imagery** — currently descendants will render as stylized SVG icons per kind (person/company/product/device/software/concept/meme). The goal is real images: Wikipedia/Wikimedia for public figures, curated SVGs/sourced imagery for products.
- **Mobile layout** — currently desktop-only (absolute percentages don't translate). Will need a separate stacked vertical variant with tap-to-expand.
- **Search / directory view** — jump-to-any-exhibit index if the museum grows.
- **Second wing** — the whole structure is designed to scale. Candidate next wings: *Cinema → Fashion*, *Music → Technology*, *Cinema → Architecture*.

---

## Session log

### Session 1 — Port from Cowork artifact to Vite project

Commit: `6ab2a58` on `claude/port-to-vite-3E0cn`.

- Starting state: a single ~2 MB `silver-nitrate-and-silicon.jsx` with posters inlined as base64 data URIs, generated by `build_museum.py` from Python data literals.
- Scaffolded a proper Vite + React + TypeScript + Tailwind project.
- Decoded `all_posters_b64.json` → 42 real JPGs in `public/posters/`. JS bundle dropped from ~2 MB to ~400 KB (~113 KB gzipped).
- Ported the Python data (SUBWINGS, ROOMS, EXHIBITS with descendants) into typed TypeScript modules under `src/data/`.
- Split the monolithic artifact into components:
  - `Hall.tsx` — the 4 sub-wing doorways
  - `FloatingNode.tsx` — parallax card primitive
  - `PosterImg.tsx` + `AbstractArt.tsx` — poster display with SVG fallback
  - `chrome/{Wordmark, FloorLabel, BackButton}.tsx` — page chrome
  - `ambient/Recorder.tsx` — Tone.js toggle
- Extracted helpers into `src/lib/`: `useParallax`, `exhibitScatter`, `descendantLayout`, `posterSrc`.
- Wired an `App.tsx` view state machine (`hall | subwing | room`) with 420 ms palette cross-fades.
- **Milestone:** Hall renders with all four sub-wing doorways, entry palette, parallax drift, Fraunces + JetBrains Mono typography, and the Tone.js ambient pad. Sub-wing view was stubbed as a "coming soon" placeholder.

### Session 2 — Layout cleanup, decorations, Subwing view

Commit: `eaf3bba` on `claude/port-to-vite-3E0cn`.

User feedback: hall layout felt haphazard, text was in the wrong place, page felt empty, sub-wing view was still a placeholder.

- **Hall layout:** sub-wing cards moved from rotated scatter (24%/74% × 32%/70%, rotations ±1.8°) to a clean 2×2 quadrant grid (30%/70% × 55%/82%), no rotations. Cards resized 180 → 160 to make room for decorations.
- **Title position:** `FloorLabel` moved from `bottom-left` to `top-left` (below the wordmark).
- **Decorations:** new `Decorations.tsx` component with 5 variants (hall + one per sub-wing). Thin line sketches in `palette.dim` at ~35% opacity, no fills. Absolutely positioned at canvas edges, `pointer-events: none`.
- **Sub-wing view:** replaced the placeholder with a real `Subwing.tsx` component. Rooms lay out in per-wing grids (2×2 for 4, 1×3 for 3, 1×2 for 2), 130 px cards.
- **Rooms data:** `src/data/rooms.ts` rewritten with clean grid positions per sub-wing, all rotations zeroed.
- **App.tsx:** decorations rendered in every view; sub-wing route connects to the new component; room view now shows a "coming in the next session" placeholder.

Bundle: 413 KB JS / 116 KB gzipped (+12 KB vs session 1 for the two new components).

---

## Content notes

- The data in `src/data/exhibits.ts` was auto-generated from `build_museum.py` at the time of the port. If you add new exhibits or descendants, the canonical way is still to edit the Python and re-generate, or edit the TypeScript directly — just keep them in sync.
- One exhibit (`matrixTa`, in the Tech Anxiety room) shares its poster with the `matrix` key in the Virtual Set room. Both poster files exist in `public/posters/` as separate JPGs.
- The TMDB API token in `pull_all_posters.py` is embedded in the file and got committed in the initial push. It's a read-only scope token; rotate it before making the repo public.

---

## Branch

All work lives on **`claude/port-to-vite-3E0cn`**. The `main` branch still holds the original Cowork source artifacts and `HANDOFF.md`.
