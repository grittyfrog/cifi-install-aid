<script>
  import ShipInstallCard from './lib/ShipInstallCard.svelte';

  // Per-hex configuration, keyed by hex number.
  const hexes = {
    1: { boosts: [["cells", 1]] },
    2: { boosts: [["cells", 3], ["cells", 1]] },
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
  };
</script>

<main>
  <svg viewBox="-2 -2 162 136" xmlns="http://www.w3.org/2000/svg">
    <ShipInstallCard name="CRADLE" hexes={hexes} />
  </svg>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #1a1a2e;
  }

  svg {
    width: 100%;
    max-width: 1000px;
    height: auto;
  }
</style>
