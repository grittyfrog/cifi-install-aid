<script>
  import CifiHex from './CifiHex.svelte';

  let { hexes = {}, x = 0, y = 0, scale = 1 } = $props();

  // Grid layout: [number, col, row]
  const layout = [
    [8, 0, 0], [4, 1, 0], [6, 2, 0], [9, 3, 0],
    [2, 0, 1], [1, 1, 1], [3, 2, 1],
    [10, 0, 2], [7, 1, 2], [5, 2, 2], [11, 3, 2],
  ];

  // Hex visual footprint including light outline (scaled 1.052 + stroke 0.72):
  // width ~34.42, height ~39.64. Overhang ~1.19 per side beyond base polygon.
  const visualWidth = 34.42;
  const visualHeight = 39.64;
  const gap = 1.44;
  const hStep = visualWidth + gap;
  const vStep = visualHeight * 0.75 + gap;  // 3/4 height for pointy-top tessellation
  const rowOffset = hStep / 2;

  function hexX(col, row) {
    return col * hStep + (row % 2 === 1 ? rowOffset : 0);
  }

  function hexY(row) {
    return row * vStep;
  }
</script>

<g transform="translate({x}, {y}) scale({scale})">
  {#each layout as [number, col, row]}
    <CifiHex
      number={number}
      x={hexX(col, row)}
      y={hexY(row)}
      {...(hexes[number] || {})}
    />
  {/each}
</g>
