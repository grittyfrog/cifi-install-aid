import { ShipInstallCard, cardWidth, cardHeight } from './ShipInstallCard.js';
import cradleIcon from '../assets/ships/cradle.png.js';
import auxesiaIcon from '../assets/ships/auxesia.png.js';
import zagreusIcon from '../assets/ships/zagreus.png.js';
import hephaestusIcon from '../assets/ships/hephaestus.png.js';
import demeterIcon from '../assets/ships/demeter.png.js';
import koiosIcon from '../assets/ships/koios.png.js';
import zeusIcon from '../assets/ships/zeus.png.js';
import ouroborosIcon from '../assets/ships/ouroboros.png.js';

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

const ships = [
  { id: 'cradle', name: 'CRADLE', color: '#4cc9f0', icon: cradleIcon, makeHexes: makeCradleHexes },
  { id: 'auxesia', name: 'AUXESIA', color: '#e08830', icon: auxesiaIcon, makeHexes: makeAuxesiaHexes },
  { id: 'zagreus', name: 'ZAGREUS', color: '#cc2222', icon: zagreusIcon, makeHexes: makeZagreusHexes },
  { id: 'hephaestus', name: 'HEPHAESTUS', color: '#8bc34a', icon: hephaestusIcon, makeHexes: makeHephaestusHexes },
  { id: 'demeter', name: 'DEMETER', color: '#22c5cc', icon: demeterIcon, makeHexes: makeDemeterHexes },
  { id: 'koios', name: 'KOIOS', color: '#5a8a3a', icon: koiosIcon, makeHexes: makeKoiosHexes },
  { id: 'zeus', name: 'ZEUS', color: '#2e4aad', icon: zeusIcon, makeHexes: makeZeusHexes },
  { id: 'ouroboros', name: 'OUROBOROS', color: '#7b44c2', icon: ouroborosIcon, makeHexes: null },
];

const vb = `0 0 ${cardWidth} ${cardHeight}`;

export function App(html, svg, { generators = 8, shipsUnlocked = 8, meltdown = 0.0001 } = {}) {
  const showMeltdown = shipsUnlocked >= ships.length;
  return html`
    <main>
      <div class="controls">
        <div class="controls-row">
          <div class="ship-selector">
            ${ships.map((ship, i) => html`
              <button
                class=${`ship-btn${i < shipsUnlocked ? ' active' : ''}`}
                data-ship-index=${i}
                style=${i < shipsUnlocked ? `border-color: ${ship.color}80; background: ${ship.color}30` : `border-color: #444; background: ${ship.color}15`}
                title=${ship.name}>
                <img src=${ship.icon} alt=${ship.name} />
              </button>
            `)}
          </div>
          <label>
            Generators
            <input id="generators" type="number" min="1" max="8" value=${generators} />
          </label>
          ${showMeltdown ? html`
            <label>
              Meltdown
              <input id="meltdown" type="number" min="0.0001" step="0.0001" value=${meltdown} />
            </label>
          ` : null}
        </div>
      </div>
      <div class="cards">
        ${ships.slice(0, shipsUnlocked).filter(s => s.makeHexes).map(ship => html`
            <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
              ${ShipInstallCard(svg, { name: ship.name, hexes: ship.makeHexes(generators), color: ship.color })}
            </svg>
        `)}
      </div>
    </main>
  `;
}
