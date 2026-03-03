<script>
  import HexGroup from './HexGroup.svelte';

  let { name = "SHIP", hexes = {}, x = 0, y = 0 } = $props();

  // Hex group dimensions (from HexGroup layout calculations)
  const groupWidth = 142;
  const groupHeight = 102;

  const padding = 8;
  const titleHeight = 14;
  const cardWidth = groupWidth + padding * 2;
  const cardHeight = groupHeight + padding * 2 + titleHeight;
</script>

<g transform="translate({x}, {y})">
  <!-- Card border -->
  <rect x="0" y="0" width={cardWidth} height={cardHeight}
    rx="2" ry="2"
    fill="none" stroke="#a4a4a4" stroke-width="1" stroke-linejoin="miter"/>

  <!-- Title -->
  <text x={cardWidth / 2} y={titleHeight}
    text-anchor="middle" dominant-baseline="auto"
    font-family="'Terminess Nerd Font', monospace" font-size="10"
    fill="#a4a4a4" letter-spacing="2">{name}</text>

  <!-- Hex group -->
  <HexGroup hexes={hexes} x={padding} y={titleHeight + padding} />
</g>
