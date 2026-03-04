import { ShipInstallCard, cardWidth, cardHeight } from './ShipInstallCard.js';

function makeCradleHexes(generators) {
  return {
    1: { boosts: [["cells", 1]] },
    2: { boosts: [["cells", 1]], generator: true },
    3: { boosts: [["cells", 1]], generator: true },
    4: { boosts: [["cells", 1]], generator: true },
    5: { boosts: [["cells", 1]], generator: true },
    6: { boosts: [["cells", 1]], generator: true },
    7: { boosts: [["cells", 1]], generator: true },
    8: { boosts: [["cells", generators]], generator: true },
    9: { boosts: [["cells", 1]] },
    10: { boosts: [["shards", 1]] },
    11: { boosts: [["research", 1]] },
  };
}

function makeAuxesiaHexes(generators) {
  return {
    1: { boosts: [["cells", 1]] },
    2: { boosts: [["cells", 1]], generator: true },
    3: { boosts: [["cells", 1]], generator: true },
    4: { boosts: [["cells", 1]], generator: true },
    5: { boosts: [["cells", 1]], generator: true },
    6: { boosts: [["cells", 1]], generator: true },
    7: { boosts: [["cells", 1]], generator: true },
    8: { boosts: [["cells", generators]], generator: true },
    9: { boosts: [["cells", 1]] },
    10: { boosts: [["shards", 1]] },
    11: { boosts: [["research", 1]] },
  };
}

function makeZagreusHexes(generators) {
  return {
    1: { boosts: [["cells", 1]] },
    2: { boosts: [["cells", Math.min(generators, 3)]], generator: true },
    3: { boosts: [["modpoints", 1]] },
    4: { boosts: [["cells", 1]], generator: true },
    5: { boosts: [["cells", 1]], generator: true },
    6: { boosts: [["cells", 1]], generator: true },
    7: { boosts: [["cells", 1]], generator: true },
    8: { boosts: [["cells", generators]], generator: true },
    9: { boosts: [["cells", 1]] },
    10: { boosts: [["shards", 1]] },
    11: { boosts: [["research", 1]] },
  };
}

const vb = `0 0 ${cardWidth} ${cardHeight}`;

export function App(html, svg, { generators = 8 } = {}) {
  const cradleHexes = makeCradleHexes(generators);
  const auxesiaHexes = makeAuxesiaHexes(generators);
  const zagreusHexes = makeZagreusHexes(generators);
  return html`
    <main>
      <div class="controls">
        <label>
          Generators
          <input id="generators" type="number" min="1" max="8" value=${generators} />
        </label>
      </div>
      <div class="cards">
        <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
          ${ShipInstallCard(svg, { name: "CRADLE", hexes: cradleHexes, color: "#3b82f6" })}
        </svg>
        <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
          ${ShipInstallCard(svg, { name: "AUXESIA", hexes: auxesiaHexes, color: "#22c55e" })}
        </svg>
        <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
          ${ShipInstallCard(svg, { name: "ZAGREUS", hexes: zagreusHexes, color: "#dc2626" })}
        </svg>
      </div>
    </main>
  `;
}
