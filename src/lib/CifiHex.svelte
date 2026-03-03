<script>
  import cellsIcon from '../assets/cells.png?inline';

  let { number = 1, x = 0, y = 0, scale = 1, boosts = [] } = $props();

  const resources = {
    cells: { icon: cellsIcon, color: '#50d890', textIcon: true },
  };

  const cx = 16.02;
  const bodyCenter = 19.25;

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

  // Regular pointy-top hexagon, r=18.5, center at (16.02, 18.5)
  const hex = "16.02,0 32.04,9.25 32.04,27.75 16.02,37 0,27.75 0,9.25";

  // Chevron: the triangle formed by a horizontal divider at y=30
  // intersecting the hex's bottom edges, down to the hex bottom vertex.
  const chevron = "3.9,30 28.14,30 16.02,37";

  // Inner chevron: inset 0.5 units perpendicular from each edge for thin border.
  const chevronInner = "5.77,30.5 26.27,30.5 16.02,36.42";
</script>

<g transform="translate({x}, {y}) scale({scale})" shape-rendering="geometricPrecision">
  <defs>
    <radialGradient id="hex-gradient-{number}" gradientUnits="objectBoundingBox" cx="0" cy="0" fx="0" fy="0" r="1.4142135623731" spreadMethod="pad">
      <stop stop-color="#404040" offset="0" stop-opacity="1"/>
      <stop stop-color="#404040" offset="1" stop-opacity="1"/>
    </radialGradient>

    <!-- Chevron inner gradient: lighter than fill, closer to border color -->
    <linearGradient id="chevron-gradient-{number}" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#a0a0a0" offset="0"/>
      <stop stop-color="#606060" offset="1"/>
    </linearGradient>
  </defs>

  <!-- Hex outline light (outermost border) -->
  <polygon points={hex} fill="none" stroke="#a4a4a4" stroke-width="0.72" stroke-linejoin="miter"
    transform="translate(16.02, 18.5) scale(1.052) translate(-16.02, -18.5)"/>

  <!-- Hex fill -->
  <polygon points={hex} fill="url(#hex-gradient-{number})" fill-rule="evenodd" stroke="none"/>

  <!-- Chevron fill (extends to hex edges, gutter provided by dark outline on top) -->
  <polygon points={chevron} fill="url(#chevron-gradient-{number})" stroke="none"/>

  <!-- Hex outline dark (sits on top, provides gutter border around chevron) -->
  <polygon points={hex} fill="none" stroke="#1f1f1f" stroke-width="1.44" stroke-linejoin="miter"/>

  <!-- Divider line at hex edge intersections (same color and width as dark outline) -->
  <path fill="none" stroke="#1f1f1f" stroke-width="1.44" stroke-linecap="butt" stroke-linejoin="miter"
    d="M3.9 30L28.14 30"/>

  <!-- Color tint overlay (multiply blend, like a Krita color mask) -->
  <polygon points={hex} fill="#2f4157" stroke="none" style="mix-blend-mode: color"
    transform="translate(16.02, 18.5) scale(1.08) translate(-16.02, -18.5)"/>

  <!-- Resource boost indicators -->
  {#if boosts.length === 1}
    {@const [resource, ratio] = boosts[0]}
    {@const res = resources[resource]}
    {#if res}
      {#if res.textIcon}
        {@const s = 10}
        {@const fs = 9}
        {@const gap = 0.5}
        {@const w = boostRowWidth(resource, ratio, s, fs, gap)}
        {@const startX = cx - w / 2}
        <image href={res.icon} x={startX} y={bodyCenter - s / 2}
          width={s} height={s} />
        <text x={startX + s + gap} y={bodyCenter}
          dominant-baseline="central"
          font-family="sans-serif" font-size={fs}
          fill={res.color}>×{ratio}</text>
      {:else}
        {@const s = 16}
        <image href={res.icon} x={cx - s / 2} y={bodyCenter - s / 2}
          width={s} height={s} />
      {/if}
    {/if}
  {:else if boosts.length === 2}
    {@const allIcons = boosts.every(([r]) => !resources[r]?.textIcon)}
    {#if allIcons}
      {@const s = 11}
      {@const gap = 2}
      {@const totalW = s * 2 + gap}
      {@const startX = cx - totalW / 2}
      {#each boosts as [resource], i}
        {@const res = resources[resource]}
        {#if res}
          <image href={res.icon} x={startX + i * (s + gap)} y={bodyCenter - s / 2}
            width={s} height={s} />
        {/if}
      {/each}
    {:else}
      {@const s = 9}
      {@const fs = 8}
      {@const gap = 0.5}
      {@const rowHeight = s + 2}
      {@const totalHeight = boosts.length * rowHeight}
      {@const startY = bodyCenter - totalHeight / 2}
      {@const maxW = Math.max(...boosts.map(([r, rat]) => boostRowWidth(r, rat, s, fs, gap)))}
      {#each boosts as [resource, ratio], i}
        {@const res = resources[resource]}
        {@const rowY = startY + i * rowHeight}
        {@const rowW = boostRowWidth(resource, ratio, s, fs, gap)}
        {@const startX = cx - maxW / 2}
        {#if res}
          {#if res.textIcon}
            <image href={res.icon} x={startX} y={rowY}
              width={s} height={s} />
            <text x={startX + s + gap} y={rowY + s / 2}
              dominant-baseline="central"
              font-family="sans-serif" font-size={fs}
              fill={res.color}>×{ratio}</text>
          {:else}
            {@const iconStartX = cx - s / 2}
            <image href={res.icon} x={iconStartX} y={rowY}
              width={s} height={s} />
          {/if}
        {/if}
      {/each}
    {/if}
  {/if}

  <!-- Number: white outline (outermost) -->
  <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="none" stroke="#ffffff" stroke-width="1.4" stroke-linejoin="round">{number}</text>

  <!-- Number: black outline (middle) -->
  <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="none" stroke="#000000" stroke-width="1.0" stroke-linejoin="round">{number}</text>

  <!-- Number: white fill (innermost) -->
  <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="#ffffff">{number}</text>
</g>
