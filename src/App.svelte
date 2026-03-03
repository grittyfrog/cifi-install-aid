<script>
  import CifiHex from './lib/CifiHex.svelte';
</script>

<main>
  <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    {#each [1, 2, 3, 4, 5] as num, i}
      <CifiHex number={num} x={40 + i * 60} y={40} scale={2} />
    {/each}
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
    max-width: 800px;
    height: auto;
  }
</style>
