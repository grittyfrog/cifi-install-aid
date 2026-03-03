<script>
  let { number = 1, x = 0, y = 0, scale = 1 } = $props();

  // Regular pointy-top hexagon, r=18.5, center at (16.02, 18.5)
  const hex = "16.02,0 32.04,9.25 32.04,27.75 16.02,37 0,27.75 0,9.25";
</script>

<g transform="translate({x}, {y}) scale({scale})" shape-rendering="geometricPrecision">
  <defs>
    <radialGradient id="hex-gradient-{number}" gradientUnits="objectBoundingBox" cx="0" cy="0" fx="0" fy="0" r="1.4142135623731" spreadMethod="pad">
      <stop stop-color="#414141" offset="0" stop-opacity="1"/>
      <stop stop-color="#3e3e3e" offset="1" stop-opacity="1"/>
    </radialGradient>
  </defs>

  <!-- Hex outline light (slightly larger, sits outside dark outline) -->
  <polygon points={hex} fill="none" stroke="#a4a4a4" stroke-width="0.72" stroke-linejoin="miter"
    transform="translate(16.02, 18.5) scale(1.052) translate(-16.02, -18.5)"/>

  <!-- Hex fill -->
  <polygon points={hex} fill="url(#hex-gradient-{number})" fill-rule="evenodd" stroke="none"/>

  <!-- Hex outline dark -->
  <polygon points={hex} fill="none" stroke="#1f1f1f" stroke-width="1.44" stroke-linejoin="miter"/>

  <!-- Horizontal line spanning chevron top -->
  <path fill="none" stroke="#1f1f1f" stroke-width="0.96" stroke-linecap="butt" stroke-linejoin="miter"
    d="M6.4 28L25.6 28"/>

  <!-- Bottom chevron — symmetric, slopes match hex bottom edges -->
  <polygon points="6.4,28 25.6,28 16.02,33.5" fill="#ffffff" fill-opacity="0.698"
    stroke="#a4a4a4" stroke-width="0.48" stroke-linejoin="miter"/>

  <!-- Number: black outline (thick) -->
  <text x="16.02" y="32.8" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="none" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"
    paint-order="stroke">{number}</text>

  <!-- Number: white outline -->
  <text x="16.02" y="32.8" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="none" stroke="#ffffff" stroke-width="0.5" stroke-linejoin="round"
    paint-order="stroke">{number}</text>

  <!-- Number: white fill -->
  <text x="16.02" y="32.8" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="#ffffff">{number}</text>
</g>
