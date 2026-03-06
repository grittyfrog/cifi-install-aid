const cx = 16.02;
const bodyCenter = 19.25;
const numberY = 35;
const hexPoints = "16.02,0 32.04,9.25 32.04,27.75 16.02,37 0,27.75 0,9.25";

const textIconResources = new Set(['cells']);

function boostLabel(resource, ratio) {
  if (resource === 'cells') {
    if (ratio === 1) return ['Increases Cell Output'];
    return [
      'Increases cell output.',
      `1 point here is worth ${ratio} points`,
      'in a 1x cell node.',
    ];
  }
  if (resource === 'shards') return ['Increases Shards'];
  if (resource === 'research') return ['Increases Research'];
  if (resource === 'modpoints') return ['Increases MP'];
  if (resource === 'materials') return ['Increases Materials'];
  if (resource === 'academy_points') return ['Increases AP'];
  if (resource === 'special') return [`Special effect: ${ratio}`];
  return [resource];
}

function boostHalfWidth(boosts) {
  if (boosts.length === 1) {
    const [resource, ratio] = boosts[0];
    if (resource === 'special') {
      return `${ratio}`.length * 16 * 0.3;
    }
    if (textIconResources.has(resource)) {
      const baseIcon = 10, baseFont = 9, gap = 0.5;
      const charW = baseFont * 0.75;
      const baseWidth = baseIcon + gap + `×${ratio}`.length * charW;
      const maxWidth = 26;
      const sc = baseWidth <= maxWidth ? 1 : maxWidth / baseWidth;
      return (baseIcon * sc + gap + `×${ratio}`.length * (baseFont * sc * 0.75)) / 2;
    }
    return 10;
  }
  if (boosts.length === 2) {
    const allIcons = boosts.every(([r]) => !textIconResources.has(r) && r !== 'special');
    if (allIcons) return (13 * 2 + 2) / 2;
    const s = 9, fs = 8, gap = 0.5;
    const maxW = Math.max(...boosts.map(([r, rat]) => {
      if (textIconResources.has(r)) return s + gap + `×${rat}`.length * fs * 0.75;
      return s;
    }));
    return maxW / 2;
  }
  return 10;
}

export function hexAnnotationRows({ boosts, generator, number, showMeltdown = false }) {
  const rows = [];
  const bHW = boostHalfWidth(boosts);
  const boostSpread = boosts.length > 1 ? 5 : 0;
  const boostStartY = bodyCenter - (boosts.length - 1) * boostSpread / 2;
  for (let i = 0; i < boosts.length; i++) {
    const [resource, ratio] = boosts[i];
    rows.push({
      lines: boostLabel(resource, ratio),
      srcX: cx,
      srcY: boostStartY + i * boostSpread,
      halfW: bHW,
    });
  }
  if (generator && showMeltdown) {
    rows.push({
      lines: ['Uses generators', '(affected by meltdown)'],
      srcX: cx,
      srcY: bodyCenter + 7,
      halfW: 9,
    });
  }
  return rows;
}

export function HexOverlay(svg, { hexX, hexY, number, color, cardWidth, cardHeight }) {
  const maskId = `hex-mask-${number}`;
  return svg`
    <g>
      <defs>
        <mask id=${maskId}>
          <rect x="0" y="0" width=${cardWidth} height=${cardHeight} fill="white" />
          <polygon points=${hexPoints} fill="black"
            transform=${`translate(${hexX}, ${hexY}) translate(16.02, 18.5) scale(1.12) translate(-16.02, -18.5)`} />
        </mask>
      </defs>

      <rect x="0" y="0" width=${cardWidth} height=${cardHeight}
        fill="#000" opacity="0.85" mask=${`url(#${maskId})`} />

      <polygon points=${hexPoints} fill="none" stroke=${color} stroke-width="1" stroke-opacity="0.8"
        transform=${`translate(${hexX}, ${hexY}) translate(16.02, 18.5) scale(1.15) translate(-16.02, -18.5)`} />
    </g>
  `;
}
