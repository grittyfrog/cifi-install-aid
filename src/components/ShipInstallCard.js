import { HexGroup, layout, hexX as layoutHexX, hexY as layoutHexY } from './HexGroup.js';
import { HexOverlay } from './HexAnnotation.js';
import cellsIcon from '../assets/cells.png.js';

const groupWidth = 142;
const groupHeight = 102;
const padding = 8;
const titleHeight = 14;
export const cardWidth = groupWidth + padding * 2;
export const cardHeight = groupHeight + padding * 2 + titleHeight;

function multiplyCells(hexes, mult) {
  if (mult === 1) return hexes;
  const result = {};
  for (const [num, hex] of Object.entries(hexes)) {
    const newBoosts = hex.boosts.map(([r, v]) =>
      r === 'cells' ? [r, v * mult] : [r, v]
    );
    result[num] = { ...hex, boosts: newBoosts };
  }
  return result;
}

export function ShipInstallCard(svg, { name = "SHIP", hexes = {}, x = 0, y = 0, color = "#3b82f6", selectedHex = null, showGenerators = false, cellMultiplier = 1 }) {
  const appliedHexes = multiplyCells(hexes, cellMultiplier);
  const gradId = `bg-${name}`;
  const glowId = `glow-${name}`;
  return svg`
    <g transform=${`translate(${x}, ${y})`}>
      <defs>
        <linearGradient id=${gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color=${color} stop-opacity="0.05" />
          <stop offset="50%" stop-color=${color} stop-opacity="0.18" />
          <stop offset="100%" stop-color=${color} stop-opacity="0.05" />
        </linearGradient>
        <filter id=${glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
        </filter>
        <filter id=${`title-glow-${name}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      <rect x="0" y="0" width=${cardWidth} height=${cardHeight}
        fill=${`url(#${gradId})`} />

      <rect x="0.5" y="0.5" width=${cardWidth - 1} height=${cardHeight - 1}
        rx="1" ry="1"
        fill="none" stroke=${color} stroke-width="0.5" stroke-opacity="0.6"
        filter=${`url(#${glowId})`} />
      <rect x="0.5" y="0.5" width=${cardWidth - 1} height=${cardHeight - 1}
        rx="1" ry="1"
        fill="none" stroke=${color} stroke-width="0.5" stroke-opacity="0.8" />

      <text x=${cardWidth / 2} y=${titleHeight + 2}
        text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="14"
        fill=${color} fill-opacity="0.5" letter-spacing="3"
        filter=${`url(#title-glow-${name})`}>${name}</text>

      <text x=${cardWidth / 2} y=${titleHeight + 2}
        text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="14"
        fill="none" stroke="#000000" stroke-width="2" stroke-linejoin="round"
        letter-spacing="3">${name}</text>

      <text x=${cardWidth / 2} y=${titleHeight + 2}
        text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="14"
        fill="#ffffff" letter-spacing="3">${name}</text>

      <g class="cell-multiplier-stepper" data-ship-id=${name}>
        <g class="cell-mult-btn" data-ship-id=${name} data-step="-1" style="cursor: pointer">
          <rect x=${cardWidth - 28} y="0" width="12" height="16" fill="transparent" />
          <text x=${cardWidth - 23} y="8" text-anchor="middle" dominant-baseline="central"
            font-family="'Terminess Nerd Font', monospace" font-size="10"
            fill="none" stroke="#000" stroke-width="1.5" stroke-linejoin="round">◂</text>
          <text x=${cardWidth - 23} y="8" text-anchor="middle" dominant-baseline="central"
            font-family="'Terminess Nerd Font', monospace" font-size="10"
            fill="#fff" fill-opacity="0.5">◂</text>
        </g>
        <image href=${cellsIcon} x=${cardWidth - 19} y="4" width="8" height="8" />
        <text x=${cardWidth - 10} y="9" text-anchor="middle" dominant-baseline="central"
          font-family="'Terminess Nerd Font', monospace" font-size="6"
          fill="none" stroke="#000" stroke-width="1.5" stroke-linejoin="round">×${cellMultiplier}</text>
        <text x=${cardWidth - 10} y="9" text-anchor="middle" dominant-baseline="central"
          font-family="'Terminess Nerd Font', monospace" font-size="6"
          fill="#fff">×${cellMultiplier}</text>
        <g class="cell-mult-btn" data-ship-id=${name} data-step="1" style="cursor: pointer">
          <rect x=${cardWidth - 7} y="0" width="7" height="16" fill="transparent" />
          <text x=${cardWidth - 3.5} y="8" text-anchor="middle" dominant-baseline="central"
            font-family="'Terminess Nerd Font', monospace" font-size="10"
            fill="none" stroke="#000" stroke-width="1.5" stroke-linejoin="round">▸</text>
          <text x=${cardWidth - 3.5} y="8" text-anchor="middle" dominant-baseline="central"
            font-family="'Terminess Nerd Font', monospace" font-size="10"
            fill="#fff" fill-opacity="0.5">▸</text>
        </g>
      </g>

      ${HexGroup(svg, { hexes: appliedHexes, x: padding, y: titleHeight + padding, shipId: name, showGenerators })}

      ${selectedHex != null && hexes[selectedHex] ? (() => {
        const entry = layout.find(([n]) => n === selectedHex);
        if (!entry) return null;
        const [, col, row] = entry;
        const hx = padding + layoutHexX(col, row);
        const hy = titleHeight + padding + layoutHexY(row);
        return HexOverlay(svg, {
          hexX: hx, hexY: hy, number: selectedHex,
          color, cardWidth, cardHeight
        });
      })() : null}
    </g>
  `;
}
