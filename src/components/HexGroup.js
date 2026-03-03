import { CifiHex } from './CifiHex.js';

const layout = [
  [8, 0, 0], [4, 1, 0], [6, 2, 0], [9, 3, 0],
  [2, 0, 1], [1, 1, 1], [3, 2, 1],
  [10, 0, 2], [7, 1, 2], [5, 2, 2], [11, 3, 2],
];

const visualWidth = 34.42;
const visualHeight = 39.64;
const gap = 1.44;
const hStep = visualWidth + gap;
const vStep = visualHeight * 0.75 + gap;
const rowOffset = hStep / 2;

function hexX(col, row) {
  return col * hStep + (row % 2 === 1 ? rowOffset : 0);
}

function hexY(row) {
  return row * vStep;
}

export function HexGroup(svg, { hexes = {}, x = 0, y = 0, scale = 1 }) {
  return svg`
    <g transform=${`translate(${x}, ${y}) scale(${scale})`}>
      ${layout.map(([number, col, row]) =>
        CifiHex(svg, { number, x: hexX(col, row), y: hexY(row), ...(hexes[number] || {}) })
      )}
    </g>
  `;
}
