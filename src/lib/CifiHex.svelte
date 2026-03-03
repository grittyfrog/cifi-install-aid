<script>
  let { number = 1, x = 0, y = 0, scale = 1 } = $props();
</script>

<g transform="translate({x}, {y}) scale({scale})">
  <defs>
    <radialGradient id="hex-gradient-{number}" gradientUnits="objectBoundingBox" cx="0" cy="0" fx="0" fy="0" r="1.4142135623731" spreadMethod="pad">
      <stop stop-color="#414141" offset="0" stop-opacity="1"/>
      <stop stop-color="#3e3e3e" offset="1" stop-opacity="1"/>
    </radialGradient>
  </defs>

  <!-- Hex fill -->
  <path fill="url(#hex-gradient-{number})" fill-rule="evenodd"
    transform="matrix(0.951433 0 0 0.951433 1.482 1.273)"
    d="M15.795 0L0.045 9.135L0 27.72L15.975 36.675L31.455 27.585L31.41 9.135Z"/>

  <!-- Hex outline dark -->
  <path fill="none" stroke="#1f1f1f" stroke-width="1.44" stroke-linecap="square" stroke-linejoin="bevel"
    transform="matrix(0.951433 0 0 0.951433 1.482 1.273)"
    d="M15.795 0L0.045 9.135L0 27.72L15.975 36.675L31.455 27.585L31.41 9.135Z"/>

  <!-- Hex outline light -->
  <path fill="none" stroke="#a4a4a4" stroke-width="0.72" stroke-linecap="square" stroke-linejoin="bevel"
    transform="matrix(1.000674 0 0 1.000674 0.690 0.645)"
    d="M15.795 0L0.045 9.135L0 27.72L15.975 36.675L31.455 27.585L31.41 9.135Z"/>

  <!-- Horizontal line -->
  <path fill="none" stroke="#1f1f1f" stroke-width="0.96" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="2"
    transform="translate(5.88, 29.52)"
    d="M21.6 0L0 0"/>

  <!-- Bottom chevron -->
  <path fill="#ffffff" fill-opacity="0.698" fill-rule="evenodd"
    stroke="#a4a4a4" stroke-width="0.48" stroke-linecap="square" stroke-linejoin="bevel"
    transform="translate(7.08, 30.24)"
    d="M0 0L18.72 0L9.6 4.8Z"/>

  <!-- Number: black outline (thick) -->
  <text x="16.68" y="34.5" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="none" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"
    paint-order="stroke">{number}</text>

  <!-- Number: white outline -->
  <text x="16.68" y="34.5" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="none" stroke="#ffffff" stroke-width="0.5" stroke-linejoin="round"
    paint-order="stroke">{number}</text>

  <!-- Number: white fill -->
  <text x="16.68" y="34.5" text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="8"
    fill="#ffffff">{number}</text>
</g>
