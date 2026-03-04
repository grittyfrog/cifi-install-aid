import cellsIcon from '../assets/cells.png.js';
import shardsIcon from '../assets/shards.png.js';
import researchIcon from '../assets/research.png.js';
import modpointsIcon from '../assets/modpoints.png.js';

const resources = {
  cells: { icon: cellsIcon, color: '#50d890', textIcon: true },
  shards: { icon: shardsIcon, color: '#a855f7' },
  research: { icon: researchIcon, color: '#3b82f6' },
  modpoints: { icon: modpointsIcon, color: '#ef4444', iconScale: 0.85 },
};

const cx = 16.02;
const bodyCenter = 19.25;

const hex = "16.02,0 32.04,9.25 32.04,27.75 16.02,37 0,27.75 0,9.25";
const chevron = "3.9,30 28.14,30 16.02,37";

function boostRowWidth(resource, ratio, iconSize, fontSize, gap) {
  const res = resources[resource];
  if (!res) return 0;
  if (res.textIcon) {
    const textChars = `×${ratio}`.length;
    const charW = fontSize * 0.75;
    return iconSize + gap + textChars * charW;
  }
  return iconSize;
}

function renderSingleBoost(svg, [resource, ratio]) {
  const res = resources[resource];
  if (!res) return null;
  if (res.textIcon) {
    const s = 10, fs = 9, gap = 0.5;
    const w = boostRowWidth(resource, ratio, s, fs, gap);
    const startX = cx - w / 2;
    return svg`
      <image href=${res.icon} x=${startX} y=${bodyCenter - s / 2}
        width=${s} height=${s} />
      <text x=${startX + s + gap} y=${bodyCenter}
        dominant-baseline="central"
        font-family="sans-serif" font-size=${fs}
        fill=${res.color}>×${ratio}</text>
    `;
  }
  const s = 20 * (res.iconScale ?? 1);
  const iconCenter = bodyCenter - 2;
  return svg`
    <image href=${res.icon} x=${cx - s / 2} y=${iconCenter - s / 2}
      width=${s} height=${s} />
  `;
}

function renderDoubleBoost(svg, boosts) {
  const allIcons = boosts.every(([r]) => !resources[r]?.textIcon);
  if (allIcons) {
    const baseS = 11, gap = 2;
    const totalW = baseS * 2 + gap;
    const startX = cx - totalW / 2;
    return boosts.map(([resource], i) => {
      const res = resources[resource];
      if (!res) return null;
      const s = baseS * (res.iconScale ?? 1);
      const offset = (baseS - s) / 2;
      return svg`
        <image href=${res.icon} x=${startX + i * (baseS + gap) + offset} y=${bodyCenter - s / 2}
          width=${s} height=${s} />
      `;
    });
  }
  const s = 9, fs = 8, gap = 0.5;
  const rowHeight = s + 2;
  const totalHeight = boosts.length * rowHeight;
  const startY = bodyCenter - totalHeight / 2;
  const maxW = Math.max(...boosts.map(([r, rat]) => boostRowWidth(r, rat, s, fs, gap)));
  return boosts.map(([resource, ratio], i) => {
    const res = resources[resource];
    if (!res) return null;
    const rowY = startY + i * rowHeight;
    const startX = cx - maxW / 2;
    if (res.textIcon) {
      return svg`
        <image href=${res.icon} x=${startX} y=${rowY}
          width=${s} height=${s} />
        <text x=${startX + s + gap} y=${rowY + s / 2}
          dominant-baseline="central"
          font-family="sans-serif" font-size=${fs}
          fill=${res.color}>×${ratio}</text>
      `;
    }
    return svg`
      <image href=${res.icon} x=${cx - s / 2} y=${rowY}
        width=${s} height=${s} />
    `;
  });
}

function renderBoosts(svg, boosts) {
  if (boosts.length === 1) return renderSingleBoost(svg, boosts[0]);
  if (boosts.length === 2) return renderDoubleBoost(svg, boosts);
  return null;
}

export function CifiHex(svg, { number = 1, x = 0, y = 0, scale = 1, boosts = [] }) {
  return svg`
    <g transform=${`translate(${x}, ${y}) scale(${scale})`} shape-rendering="geometricPrecision">
      <defs>
        <radialGradient id=${`hex-gradient-${number}`} gradientUnits="objectBoundingBox" cx="0" cy="0" fx="0" fy="0" r="1.4142135623731" spreadMethod="pad">
          <stop stop-color="#404040" offset="0" stop-opacity="1"/>
          <stop stop-color="#404040" offset="1" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id=${`chevron-gradient-${number}`} x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#a0a0a0" offset="0"/>
          <stop stop-color="#606060" offset="1"/>
        </linearGradient>
      </defs>

      <polygon points=${hex} fill="none" stroke="#a4a4a4" stroke-width="0.72" stroke-linejoin="miter"
        transform="translate(16.02, 18.5) scale(1.052) translate(-16.02, -18.5)"/>

      <polygon points=${hex} fill=${`url(#hex-gradient-${number})`} fill-rule="evenodd" stroke="none"/>

      <polygon points=${chevron} fill=${`url(#chevron-gradient-${number})`} stroke="none"/>

      <polygon points=${hex} fill="none" stroke="#1f1f1f" stroke-width="1.44" stroke-linejoin="miter"/>

      <path fill="none" stroke="#1f1f1f" stroke-width="1.44" stroke-linecap="butt" stroke-linejoin="miter"
        d="M3.9 30L28.14 30"/>

      <polygon points=${hex} fill="#2f4157" stroke="none" style="mix-blend-mode: color"
        transform="translate(16.02, 18.5) scale(1.08) translate(-16.02, -18.5)"/>

      ${renderBoosts(svg, boosts)}

      <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="8"
        fill="none" stroke="#ffffff" stroke-width="1.4" stroke-linejoin="round">${number}</text>

      <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="8"
        fill="none" stroke="#000000" stroke-width="1.0" stroke-linejoin="round">${number}</text>

      <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
        font-family="'Terminess Nerd Font', monospace" font-size="8"
        fill="#ffffff">${number}</text>
    </g>
  `;
}
