import { ShipInstallCard } from './ShipInstallCard.js';

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

export function App(html, svg) {
  return html`
    <main>
      <svg viewBox="-2 -2 162 136" xmlns="http://www.w3.org/2000/svg">
        ${ShipInstallCard(svg, { name: "CRADLE", hexes })}
      </svg>
    </main>
  `;
}
