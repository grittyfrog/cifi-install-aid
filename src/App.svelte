<script>
  import cifiHex from './assets/cifi-hex.svg';
</script>

<main>
  <img src={cifiHex} alt="CiFi Hex" class="hex" />
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #1a1a2e;
  }

  .hex {
    width: 200px;
    height: auto;
  }
</style>
