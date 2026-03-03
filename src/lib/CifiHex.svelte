<script>
  let { number = 1, x = 0, y = 0, scale = 1 } = $props();

  // Regular pointy-top hexagon, r=18.5, center at (16.02, 18.5)
  const hex = "16.02,0 32.04,9.25 32.04,27.75 16.02,37 0,27.75 0,9.25";

  // Chevron: the triangle formed by a horizontal divider at y=30
  // intersecting the hex's bottom edges, down to the hex bottom vertex.
  // Left/right x computed from hex edge intersections at y=30.
  const dividerY = 30;
  const chevron = "3.9,30 28.14,30 16.02,37";
</script>

<g transform="translate({x}, {y}) scale({scale})" shape-rendering="geometricPrecision">
  <defs>
    <radialGradient id="hex-gradient-{number}" gradientUnits="objectBoundingBox" cx="0" cy="0" fx="0" fy="0" r="1.4142135623731" spreadMethod="pad">
      <stop stop-color="#414141" offset="0" stop-opacity="1"/>
      <stop stop-color="#3e3e3e" offset="1" stop-opacity="1"/>
    </radialGradient>
  </defs>

  <!-- Hex outline light (outermost border) -->
  <polygon points={hex} fill="none" stroke="#a4a4a4" stroke-width="0.72" stroke-linejoin="miter"
    transform="translate(16.02, 18.5) scale(1.052) translate(-16.02, -18.5)"/>

  <!-- Hex fill -->
  <polygon points={hex} fill="url(#hex-gradient-{number})" fill-rule="evenodd" stroke="none"/>

  <!-- Chevron (rendered before dark outline so the outline borders it) -->
  <polygon points={chevron} fill="#ffffff" fill-opacity="0.698" stroke="none"/>

  <!-- Hex outline dark (sits on top, provides gutter border around chevron) -->
  <polygon points={hex} fill="none" stroke="#1f1f1f" stroke-width="1.44" stroke-linejoin="miter"/>

  <!-- Divider line at hex edge intersections (same color and width as dark outline) -->
  <path fill="none" stroke="#1f1f1f" stroke-width="1.44" stroke-linecap="butt" stroke-linejoin="miter"
    d="M3.9 30L28.14 30"/>

  <!-- Number: black outline (thick) -->
  <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="none" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"
    paint-order="stroke">{number}</text>

  <!-- Number: white outline -->
  <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="none" stroke="#ffffff" stroke-width="0.5" stroke-linejoin="round"
    paint-order="stroke">{number}</text>

  <!-- Number: white fill -->
  <text x="16.02" y="35" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="#ffffff">{number}</text>
</g>
