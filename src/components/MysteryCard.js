import { cardWidth, cardHeight } from './ShipInstallCard.js';

const layout = [
  [0, 0], [1, 0], [2, 0], [3, 0],
  [0, 1], [1, 1], [2, 1],
  [0, 2], [1, 2], [2, 2], [3, 2],
];

const hexW = 34.42;
const hexH = 39.64;
const gap = 1.44;
const hStep = hexW + gap;
const vStep = hexH * 0.75 + gap;
const rowOffset = hStep / 2;
const hex = "16.02,0 32.04,9.25 32.04,27.75 16.02,37 0,27.75 0,9.25";

const padding = 8;
const titleHeight = 14;

export function MysteryCard(svg, { name = "???", color = "#666", index = 0 }) {
  const gradId = `mystery-bg-${index}`;
  const groupX = padding;
  const groupY = titleHeight + padding;

  return svg`
    <g>
      <defs>
        <linearGradient id=${gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color=${color} stop-opacity="0.03" />
          <stop offset="50%" stop-color=${color} stop-opacity="0.08" />
          <stop offset="100%" stop-color=${color} stop-opacity="0.03" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width=${cardWidth} height=${cardHeight}
        fill=${`url(#${gradId})`} />

      <rect x="0.5" y="0.5" width=${cardWidth - 1} height=${cardHeight - 1}
        rx="1" ry="1"
        fill="none" stroke=${color} stroke-width="0.5" stroke-opacity="0.3" />

      <text x=${cardWidth / 2} y=${titleHeight + 2}
        text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="14"
        fill=${color} fill-opacity="0.4" letter-spacing="3">${name}</text>

      <g transform=${`translate(${groupX}, ${groupY})`} opacity="0.15">
        ${layout.map(([col, row]) => svg`
          <polygon
            points=${hex}
            transform=${`translate(${col * hStep + (row % 2 === 1 ? rowOffset : 0)}, ${row * vStep})`}
            fill=${color} stroke="none" />
        `)}
      </g>

      <text x=${cardWidth / 2} y=${cardHeight / 2 + 10}
        text-anchor="middle" dominant-baseline="middle"
        font-family="'Terminess Nerd Font', monospace" font-size="40"
        fill=${color} fill-opacity="0.5">?</text>

      <text x=${cardWidth / 2} y=${cardHeight - 6}
        text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="5"
        fill=${color} fill-opacity="0.4" letter-spacing="1">CLICK TO UNLOCK</text>
    </g>
  `;
}
