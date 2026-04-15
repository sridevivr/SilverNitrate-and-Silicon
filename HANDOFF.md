# Silver Nitrate & Silicon — Handoff to Claude Code

This folder contains everything you need to continue the project in a Claude Code session.

## What this project is

A personal, museum-style web experience exploring the relationship between cinema and technology. It's designed to feel like a "Personal Internet Space" — airy, near-white, content as floating objects, low-contrast type, no busy scrolling. The user explores by clicking, not by scrolling.

## Current structure (2 wings of content, 1 built so far)

The built wing is **"Silver Nitrate & Silicon"** — cinema viewed through its technology.

Organized as:
- **Hall** (entry) — four sub-wing doorways arranged in 2×2 quadrants.
- **Sub-wings** (4): Built for the Screen · Imagined Futures · Cautionary Tales · Founder Mythology.
- **Rooms** (11): see `build_museum.py` for the full taxonomy.
- **Exhibits** (46): each is a real film or TV show with year, medium, demand (the problem it posed), legacy (the solution and its ripple), and a list of "descendants" — the real-world products, people, companies, concepts, and memes that emerged from it.

## Design vocabulary (hard-won, please preserve)

- **Aesthetic**: mid-century modern film-archive meets Personal Internet Spaces. Warm ivory hall; each sub-wing shifts palette subtly.
- **Typography**: Fraunces (serif, 300 weight for headlines) + JetBrains Mono (for plates/labels, 10px, 0.22em letter-spacing, uppercase).
- **Interactions**: parallax drift on mouse move, staggered fade-ins, long easing curves (~700-900ms), soft shadow lifts on hover.
- **Sub-wing transitions**: cross-fade both content and palette (~420ms fade out, then page swap, then fade in).
- **Exhibit detail**: click an exhibit and its descendants bloom on the page around it with thin accent-colored lines drawn from the exhibit to each satellite — constellation-style. No modal.
- **Ambient audio**: optional slow chord pad via Tone.js (small reel-to-reel icon bottom-right toggles it).

## Files in this bundle

| File | What it is |
|---|---|
| `silver-nitrate-and-silicon.jsx` | Current working artifact, ~2MB (posters are base64-embedded). Renders as-is in a React environment. |
| `build_museum.py` | The source of truth. Defines SUBWINGS, ROOMS, EXHIBITS (with descendants), and generates the .jsx by templating. Edit data here, rerun, and the .jsx regenerates. |
| `pull_all_posters.py` | TMDB poster fetcher — pulls w342 posters for all ~42 film/TV exhibits and base64-encodes them. Uses a TMDB API token (read-only, embedded in the script; rotate if concerned). |
| `all_posters_b64.json` | The current poster set (1.9MB of base64 data URIs). |

## Priority work for session 1 in Claude Code

1. **Scaffold a proper Vite + React project.** TypeScript optional. Tailwind with arbitrary-value support (Cowork's artifact system restricts this). Git init.

2. **Split the monolithic .jsx into components:**
   - `src/components/Hall.tsx`, `Subwing.tsx`, `Room.tsx`
   - `src/components/FloatingNode.tsx`, `DescendantSatellite.tsx`, `ExhibitPoster.tsx`
   - `src/components/ambient/Recorder.tsx` (the Tone.js pad)
   - `src/components/chrome/Wordmark.tsx`, `FloorLabel.tsx`, `BackButton.tsx`
   - `src/lib/positions.ts` (descendantLayout, exhibitScatter, etc.)
   - `src/data/` — split the data from `build_museum.py` into TypeScript files: `subwings.ts`, `rooms.ts`, `exhibits.ts`.

3. **Move posters out of base64 into `/public/posters/`.**
   - Convert `all_posters_b64.json` → 42 actual .jpg files.
   - In components, reference by path: `/posters/starWars.jpg`.
   - File size drops from 2MB to <100KB for the shipped JS.

4. **Set up a proper image pipeline for descendants.**
   - Currently descendants use stylized SVG icons. The goal is real imagery.
   - Strategy: Wikipedia/Wikimedia Commons for public figures (Zuckerberg, Holmes, Jobs, Kalanick, Neumann). For products and logos, a mix of SVG reproductions and sourced imagery. See `build_museum.py` for all descendant names.
   - Keep the stylized SVG as fallback for concept/meme kinds.

5. **Confirm the current experience renders.** Hall → click sub-wing → click room → click exhibit → descendants bloom with connecting lines.

## Priorities for later sessions

- **Mobile layout.** Currently desktop-only. Probably needs a separate simpler flow (stack sub-wings vertically, use tap-to-expand for descendants).
- **New wings.** The whole museum is designed to grow. Possible next wings: *Cinema → Fashion*, *Music → Technology*, *Cinema → Architecture*. The wing/sub-wing/room/exhibit/descendant structure scales cleanly.
- **Polish animations.** The transitions are good but could be more filmic — subtle crossfades like a match cut between wings.
- **Search / index.** If the museum grows, a small "directory" view that lets you jump to any exhibit might be useful.

## Things to NOT lose

- **The descendants data** in `build_museum.py` — this is the unique product value. Real-world lineages for every exhibit, hand-written.
- **The 4-wing thesis**: (1) cinema forced technology to exist, (2) cinema imagined futures that arrived, (3) cinema taught us fears, (4) cinema mythologized tech people. The hall quadrant layout reinforces this; don't collapse it.
- **Personal Internet Spaces aesthetic principles**: lots of whitespace, content-as-objects, non-linear navigation, minimal low-contrast type, media revealed gradually. These are the north stars.

## Starter prompt for Claude Code

Paste this into a fresh Claude Code session to bootstrap:

> I'm continuing a project called "Silver Nitrate & Silicon" — a museum-style web experience about cinema and technology. A previous session built it as a single 2MB React artifact; I'd like to port it to a proper Vite + React + Tailwind project.
>
> Read HANDOFF.md in this folder for the full design context. The current state lives in silver-nitrate-and-silicon.jsx; the source of truth for data/structure is build_museum.py.
>
> For this session, please:
> 1. Scaffold a new Vite + React + TypeScript + Tailwind project in the current folder.
> 2. Convert all_posters_b64.json into actual .jpg files under /public/posters/.
> 3. Port the data from build_museum.py into TypeScript modules under src/data/.
> 4. Split the artifact into proper components under src/components/.
> 5. Get the hall rendering, with all 4 sub-wing doorways and the entry palette.
>
> Preserve the Fraunces + JetBrains Mono typography, the palette per wing, the floating-object layout, the parallax drift, and the Tone.js ambient pad. Don't change the taste decisions from the previous session — just move the code to a better home.
