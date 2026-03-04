import { ShipInstallCard } from './ShipInstallCard.js';

function makeCradleHexes(generators) {
  return {
    1: { boosts: [["cells", 1]] },
    2: { boosts: [["cells", 1]] },
    3: { boosts: [["cells", 1]] },
    4: { boosts: [["cells", 1]] },
    5: { boosts: [["cells", 1]] },
    6: { boosts: [["cells", 1]] },
    7: { boosts: [["cells", 1]] },
    8: { boosts: [["cells", generators]] },
    9: { boosts: [["cells", 1]] },
    10: { boosts: [["shards", 1]] },
    11: { boosts: [["research", 1]] },
  };
}

function makeZagreusHexes(generators) {
  return {
    1: { boosts: [["cells", 1]] },
    2: { boosts: [["cells", Math.min(generators, 3)]] },
    3: { boosts: [["modpoints", 1]] },
    4: { boosts: [["cells", 1]] },
    5: { boosts: [["cells", 1]] },
    6: { boosts: [["cells", 1]] },
    7: { boosts: [["cells", 1]] },
    8: { boosts: [["cells", generators]] },
    9: { boosts: [["cells", 1]] },
    10: { boosts: [["shards", 1]] },
    11: { boosts: [["research", 1]] },
  };
}

export function App(html, svg, { generators = 8 } = {}) {
  const cradleHexes = makeCradleHexes(generators);
  const zagreusHexes = makeZagreusHexes(generators);
  return html`
    <main>
      <div class="controls">
        <label>
          Generators
          <input id="generators" type="number" min="1" max="8" value=${generators} />
        </label>
      </div>
      <svg viewBox="-2 -2 162 268" xmlns="http://www.w3.org/2000/svg">
        ${ShipInstallCard(svg, { name: "CRADLE", hexes: cradleHexes })}
        ${ShipInstallCard(svg, { name: "ZAGREUS", hexes: zagreusHexes, y: 132 })}
      </svg>
    </main>
  `;
}
