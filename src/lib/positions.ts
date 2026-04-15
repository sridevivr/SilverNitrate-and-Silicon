import type { CanvasPos } from "../data/types";

export interface ScatterPos extends CanvasPos {
  rotate: number;
}

/**
 * Lay exhibits in a generous scatter using deterministic positions.
 * Preserved from the original artifact for any caller that wants the
 * jittery museum-floor-plan look. Room.tsx uses exhibitGrid() instead.
 */
export function exhibitScatter(n: number): ScatterPos[] {
  const positions: ScatterPos[] = [];
  const cols = n <= 3 ? n : Math.ceil(Math.sqrt(n + 1));
  const rows = Math.ceil(n / cols);
  const padX = 16;
  const padY = 18;
  const w = (100 - padX * 2) / cols;
  const h = (60 - padY) / Math.max(rows - 1, 1);
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const offset = r % 2 === 0 ? 0 : w / 4;
    const jitter = ((i * 9301 + 49297) % 233280) / 233280;
    const dx = (jitter - 0.5) * 4;
    positions.push({
      left: `${padX + c * w + w / 2 + offset + dx}%`,
      top: `${padY + 12 + r * h}%`,
      rotate: i % 2 === 0 ? -1.4 : 1.2,
    });
  }
  return positions;
}

/**
 * Clean grid positions for a room's exhibits. Handles 1–8 exhibits
 * with symmetric, centered rows. Rows occupy the lower two-thirds
 * of the canvas so the title panel at the top has room to breathe.
 */
export function exhibitGrid(n: number): CanvasPos[] {
  const cols = n <= 3 ? n : n === 4 ? 2 : n <= 6 ? 3 : 4;
  const rows = Math.ceil(n / cols);
  const xCenter = 50;
  const xSpread = 28; // half-range around xCenter
  const yCenter = 66;
  const ySpread = 16; // half-range around yCenter
  const positions: CanvasPos[] = [];

  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols);
    const itemsInThisRow = Math.min(cols, n - r * cols);
    const c = i % cols;
    // If this row has fewer items than `cols`, center them by offsetting
    // the starting column index by half the difference.
    const startC = (cols - itemsInThisRow) / 2;
    const effectiveC = c + startC;
    const xStep = cols > 1 ? (2 * xSpread) / (cols - 1) : 0;
    const x = cols > 1 ? xCenter - xSpread + effectiveC * xStep : xCenter;
    const yStep = rows > 1 ? (2 * ySpread) / (rows - 1) : 0;
    const y = rows > 1 ? yCenter - ySpread + r * yStep : yCenter;
    positions.push({ left: `${x}%`, top: `${y}%` });
  }
  return positions;
}

/**
 * Position descendants in a radial constellation around a hub point.
 * Angles start at `startAngle` (degrees) and advance clockwise.
 *
 * @param hub         center of the constellation, in canvas percent
 * @param count       number of satellites
 * @param radiusX     horizontal radius in viewport-width percent
 * @param radiusY     vertical radius in viewport-height percent
 * @param startAngle  angle of the first satellite in degrees (0 = east,
 *                    90 = south, -90/270 = north). Defaults to "south"
 *                    so no satellite lands directly above the hub, which
 *                    would make its text label collide with the hub card.
 */
export function descendantConstellation(
  hub: CanvasPos,
  count: number,
  radiusX = 22,
  radiusY = 24,
  startAngle = 90,
): CanvasPos[] {
  const cx = parseFloat(hub.left);
  const cy = parseFloat(hub.top);
  const positions: CanvasPos[] = [];
  const step = count > 0 ? 360 / count : 0;
  for (let i = 0; i < count; i++) {
    const angleRad = ((startAngle + i * step) * Math.PI) / 180;
    positions.push({
      left: `${cx + radiusX * Math.cos(angleRad)}%`,
      top: `${cy + radiusY * Math.sin(angleRad)}%`,
    });
  }
  return positions;
}

/**
 * Picks a starting angle for a descendant constellation so that no
 * satellite ends up directly above the hub (which would make the
 * satellite's label collide with the tall poster card at center).
 *
 *   n = 2  -> 0°   (east / west)
 *   n = 3  -> 90°  (south, upper-left, upper-right)
 *   n = 4  -> 45°  (four diagonals)
 *   n = 5  -> 90°  (south, two sides, two upper diagonals)
 *   n = 6  -> 0°   (east, ne, nw, west, sw, se)
 *   n ≥ 7  -> 90°  (south as the anchor, spread evenly)
 */
export function safeStartAngle(n: number): number {
  switch (n) {
    case 2:
      return 0;
    case 3:
      return 90;
    case 4:
      return 45;
    case 5:
      return 90;
    case 6:
      return 0;
    default:
      return 90;
  }
}

/**
 * Legacy row-below fan layout, preserved for completeness. Room.tsx
 * now uses descendantConstellation instead.
 */
export function descendantLayout(exPos: CanvasPos, n: number): CanvasPos[] {
  const cx = parseFloat(exPos.left);
  const cy = parseFloat(exPos.top);
  const perRow = n <= 4 ? n : Math.ceil(n / 2);
  const rows = Math.ceil(n / perRow);
  const spacingX = 9;
  const spacingY = 13;
  const baseY = cy + 22;
  const flipUp = baseY + (rows - 1) * spacingY > 92;
  const positions: CanvasPos[] = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / perRow);
    const c = i % perRow;
    const inThisRow = Math.min(perRow, n - r * perRow);
    const startX = cx - ((inThisRow - 1) * spacingX) / 2;
    const x = startX + c * spacingX;
    const y = flipUp
      ? cy - 22 - (rows - 1 - r) * spacingY
      : baseY + r * spacingY;
    positions.push({ left: `${x}%`, top: `${y}%` });
  }
  return positions;
}
