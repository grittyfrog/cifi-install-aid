import { ShipInstallCard, cardWidth, cardHeight } from './ShipInstallCard.js';
import { MysteryCard } from './MysteryCard.js';
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

export const ships = [
  { id: 'cradle', name: 'CRADLE', color: '#4cc9f0', icon: cradleIcon, makeHexes: makeCradleHexes },
  { id: 'auxesia', name: 'AUXESIA', color: '#e08830', icon: auxesiaIcon, makeHexes: makeAuxesiaHexes },
  { id: 'zagreus', name: 'ZAGREUS', color: '#cc2222', icon: zagreusIcon, makeHexes: makeZagreusHexes },
  { id: 'hephaestus', name: 'HEPHAESTUS', color: '#8bc34a', icon: hephaestusIcon, makeHexes: makeHephaestusHexes },
  { id: 'demeter', name: 'DEMETER', color: '#22c5cc', icon: demeterIcon, makeHexes: makeDemeterHexes },
  { id: 'koios', name: 'KOIOS', color: '#5a8a3a', icon: koiosIcon, makeHexes: makeKoiosHexes },
  { id: 'zeus', name: 'ZEUS', color: '#2e4aad', icon: zeusIcon, makeHexes: makeZeusHexes },
  { id: 'ouroboros', name: 'OUROBOROS', color: '#7b44c2', icon: ouroborosIcon, makeHexes: null },
];

export function applyMeltdown(hexes, meltdown) {
  const effective = {};
  for (const [num, hex] of Object.entries(hexes)) {
    const cellBoost = hex.boosts.find(([r]) => r === 'cells');
    if (cellBoost) {
      effective[num] = hex.generator ? cellBoost[1] * meltdown : cellBoost[1];
    }
  }
  const values = Object.values(effective);
  if (values.length === 0) return hexes;
  const min = Math.min(...values);
  if (min === 0) return hexes;
  const result = {};
  for (const [num, hex] of Object.entries(hexes)) {
    const cellIdx = hex.boosts.findIndex(([r]) => r === 'cells');
    if (cellIdx >= 0 && effective[num] !== undefined) {
      const newBoosts = [...hex.boosts];
      newBoosts[cellIdx] = ['cells', Math.max(1, Math.round(effective[num] / min))];
      result[num] = { ...hex, boosts: newBoosts };
    } else {
      result[num] = hex;
    }
  }
  return result;
}

const vb = `0 0 ${cardWidth} ${cardHeight}`;

export function App(html, svg, { generators = 1, shipsUnlocked = 1, meltdown = 0.001, selectedHex = null } = {}) {
  const showMeltdown = shipsUnlocked >= ships.length;
  return html`
    <main>
      <div class="controls">
        <div class="controls-row">
          <div class="power-bar">
            <span class="power-label">Ships<small>click latest unlocked</small></span>
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
          </div>
          <div class="input-group">
            <div class="power-bar">
              <span class="power-label">Gen<small>unlocked</small></span>
              <div class="power-segments">
                ${[1,2,3,4,5,6,7,8].map(n => html`
                  <div class=${`power-seg${n <= generators ? ' on' : ''}`}></div>
                `)}
              </div>
              <button class="power-step" data-step="-1">−</button>
              <button class="power-step" data-step="+1">+</button>
              <input id="generators" type="number" min="1" max="8" value=${generators} />
            </div>
            ${showMeltdown ? html`
              <div class="power-bar">
                <span class="power-label">Meltdown</span>
                <input id="meltdown" type="text" inputmode="decimal" maxlength="5" value=${meltdown} />
              </div>
            ` : html`
              <button class="power-bar locked unlock-ouro-btn">
                <span class="power-label">Unlock Ouroboros</span>
              </button>
            `}
          </div>
        </div>
      </div>
      <div class="cards">
        ${ships.filter(s => s.makeHexes).map(ship => {
          const idx = ships.indexOf(ship);
          if (idx < shipsUnlocked) {
            return html`
              <svg viewBox=${vb} xmlns="http://www.w3.org/2000/svg">
                ${ShipInstallCard(svg, {
                  name: ship.name,
                  hexes: showMeltdown ? applyMeltdown(ship.makeHexes(generators), meltdown) : ship.makeHexes(generators),
                  color: ship.color,
                  selectedHex: selectedHex?.ship === ship.name ? selectedHex.hex : null
                })}
              </svg>`;
          }
          return html`
            <svg class="mystery-card" viewBox=${vb} xmlns="http://www.w3.org/2000/svg"
              data-ship-index=${idx}>
              ${MysteryCard(svg, { name: ship.name, color: ship.color, index: idx })}
            </svg>`;
        })}
      </div>
    </main>
  `;
}
