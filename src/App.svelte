<script>
  import HexGroup from './lib/HexGroup.svelte';

  // Per-hex configuration, keyed by hex number.
  // Currently just number, but will grow to include icons, calculations, etc.
  const hexes = {
    1: {},
    2: {},
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
  <svg viewBox="-5 -5 152 112" xmlns="http://www.w3.org/2000/svg">
    <HexGroup hexes={hexes} scale={1} />
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
