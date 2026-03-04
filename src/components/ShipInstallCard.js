import { HexGroup } from './HexGroup.js';

const groupWidth = 142;
const groupHeight = 102;
const padding = 8;
const titleHeight = 14;
export const cardWidth = groupWidth + padding * 2;
export const cardHeight = groupHeight + padding * 2 + titleHeight;

export function ShipInstallCard(svg, { name = "SHIP", hexes = {}, x = 0, y = 0, color = "#3b82f6" }) {
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

      <text x=${cardWidth / 2} y=${titleHeight}
        text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="10"
        fill="#a4a4a4" letter-spacing="2">${name}</text>

      ${HexGroup(svg, { hexes, x: padding, y: titleHeight + padding })}
    </g>
  `;
}
