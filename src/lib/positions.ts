import type { CanvasPos } from "../data/types";

export interface ScatterPos extends CanvasPos {
  rotate: number;
}

/**
 * Lay exhibits in a generous scatter using deterministic positions.
 * Mirrors the original artifact's exhibitScatter.
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
 * Position descendants in a row below the selected exhibit, wrapping above
 * if there's not enough room. Returns array of {left, top} percent strings.
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
