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

function makeDemeterHexes(generators) {
  return {
    1: { boosts: [["special", "?"]] },
    2: { boosts: [["shards", 1]] },
    3: { boosts: [["cells", 1]] },
    4: { boosts: [["cells", 2]], generator: true },
    5: { boosts: [["cells", 2]], generator: true },
    6: { boosts: [["modpoints", 1]] },
    7: { boosts: [["cells", 2]], generator: true },
    8: { boosts: [["cells", generators]], generator: true },
    9: { boosts: [["cells", 1]] },
    10: { boosts: [["shards", 1]] },
    11: { boosts: [["research", 1]] },
  };
}

function makeKoiosHexes(generators) {
  return {
    1: { boosts: [["cells", 1]] },
    2: { boosts: [["shards", 1]] },
    3: { boosts: [["modpoints", 1]] },
    4: { boosts: [["cells", 2]], generator: true },
    5: { boosts: [["research", 1]] },
    6: { boosts: [["modpoints", 1], ["shards", 1]] },
    7: { boosts: [["cells", Math.min(generators, 6)]], generator: true },
    8: { boosts: [["cells", generators]], generator: true },
    9: { boosts: [["cells", 1]] },
    10: { boosts: [["shards", 1]] },
    11: { boosts: [["research", 1]] },
  };
}

function makeHephaestusHexes(generators) {
  return {
    1: { boosts: [["cells", Math.min(generators, 4)]], generator: true },
    2: { boosts: [["cells", 2 * generators]], generator: true },
    3: { boosts: [["modpoints", 1]] },
    4: { boosts: [["cells", 1]] },
    5: { boosts: [["cells", 1]] },
    6: { boosts: [["modpoints", 1]] },
    7: { boosts: [["cells", 1]], generator: true },
    8: { boosts: [["cells", generators]], generator: true },
    9: { boosts: [["cells", 1]] },
    10: { boosts: [["shards", 1]] },
    11: { boosts: [["research", 1]] },
  };
}

function makeZeusHexes(generators) {
  return {
    1: { boosts: [["cells", 1]] },
    2: { boosts: [["academy_points", 1]] },
    3: { boosts: [["materials", 1]] },
    4: { boosts: [["cells", 1], ["shards", 1]] },
    5: { boosts: [["cells", 1], ["research", 1]] },
    6: { boosts: [["modpoints", 1], ["materials", 1]] },
    7: { boosts: [["cells", Math.min(generators, 6)], ["academy_points", 1]], generator: true },
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
  const demeterHexes = makeDemeterHexes(generators);
  const koiosHexes = makeKoiosHexes(generators);
  const hephaestusHexes = makeHephaestusHexes(generators);
  const zeusHexes = makeZeusHexes(generators);
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
          ${ShipInstallCard(svg, { name: "AUXESIA", hexes: auxesiaHexes, color: "#b87333" })}
        </svg>
        <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
          ${ShipInstallCard(svg, { name: "ZAGREUS", hexes: zagreusHexes, color: "#dc2626" })}
        </svg>
        <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
          ${ShipInstallCard(svg, { name: "HEPHAESTUS", hexes: hephaestusHexes, color: "#22c55e" })}
        </svg>
        <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
          ${ShipInstallCard(svg, { name: "DEMETER", hexes: demeterHexes, color: "#06b6d4" })}
        </svg>
        <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
          ${ShipInstallCard(svg, { name: "KOIOS", hexes: koiosHexes, color: "#8b5cf6" })}
        </svg>
        <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
          ${ShipInstallCard(svg, { name: "ZEUS", hexes: zeusHexes, color: "#eab308" })}
        </svg>
      </div>
    </main>
  `;
}
