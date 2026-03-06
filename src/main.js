import { render, html, svg } from 'uhtml';
import './app.css';
import { App, ships, applyMeltdown } from './components/App.js';
import { hexAnnotationRows } from './components/HexAnnotation.js';

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('cifi-state'));
    if (saved) return { generators: saved.generators ?? 1, shipsUnlocked: saved.shipsUnlocked ?? 1, meltdown: saved.meltdown ?? 0.001 };
  } catch {}
  return { generators: 1, shipsUnlocked: 1, meltdown: 0.001 };
}

const state = { ...loadState(), selectedHex: null };

let tooltipEl = null;

function getTooltipEl() {
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'hex-tooltip';
    document.body.appendChild(tooltipEl);
  }
  return tooltipEl;
}

function positionTooltip() {
  const tip = getTooltipEl();
  const sel = state.selectedHex;
  if (!sel) {
    tip.style.display = 'none';
    return;
  }

  const hexEl = document.querySelector(`.cifi-hex[data-ship-id="${sel.ship}"][data-hex-number="${sel.hex}"]`);
  if (!hexEl) { tip.style.display = 'none'; return; }

  const ship = ships.find(s => s.name === sel.ship);
  if (!ship || !ship.makeHexes) { tip.style.display = 'none'; return; }

  const showMeltdown = state.shipsUnlocked >= ships.length;
  const hexes = showMeltdown ? applyMeltdown(ship.makeHexes(state.generators), state.meltdown) : ship.makeHexes(state.generators);
  const hexData = hexes[sel.hex];
  if (!hexData) { tip.style.display = 'none'; return; }

  const rows = hexAnnotationRows({ boosts: hexData.boosts, generator: !!hexData.generator, number: sel.hex, showMeltdown });

  const hexRect = hexEl.getBoundingClientRect();
  const hexCenterX = hexRect.left + hexRect.width / 2;
  const hexCenterY = hexRect.top + hexRect.height / 2;
  const rightSide = hexCenterX < window.innerWidth / 2;

  // scale tooltip relative to rendered hex size (intrinsic height is 37 SVG units)
  const rawScale = hexRect.height / 37;
  const scale = Math.max(1, Math.sqrt(rawScale));
  const fontSize = 14 * scale;
  const padding = 10 * scale;

  tip.style.display = '';
  tip.style.borderColor = ship.color;
  tip.style.fontSize = `${fontSize}px`;
  tip.style.padding = `${padding}px ${padding * 1.4}px`;
  tip.innerHTML = rows.map((row, i) =>
    `<div class="hex-tooltip-row"${i > 0 ? ` style="margin-top:${6 * scale}px"` : ''}>${row.lines.map(l => `<div>${l}</div>`).join('')}</div>`
  ).join('');

  // measure then position
  const tipRect = tip.getBoundingClientRect();
  const gap = 12 * scale;
  let left, top;
  if (rightSide) {
    left = hexRect.right + gap;
  } else {
    left = hexRect.left - tipRect.width - gap;
  }
  top = hexCenterY - tipRect.height / 2;
  // clamp to viewport
  top = Math.max(8, Math.min(window.innerHeight - tipRect.height - 8, top));
  left = Math.max(8, Math.min(window.innerWidth - tipRect.width - 8, left));

  tip.style.left = `${left}px`;
  tip.style.top = `${top}px`;
}

function update() {
  render(document.body, App(html, svg, state));
  positionTooltip();
  const { selectedHex: _, ...persist } = state;
  localStorage.setItem('cifi-state', JSON.stringify(persist));
}

document.addEventListener('input', (e) => {
  if (e.target.id === 'generators') {
    state.generators = Math.max(1, Math.min(8, parseInt(e.target.value) || 1));
    update();
  }
  if (e.target.id === 'meltdown') {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) {
      state.meltdown = Math.min(1.999, val);
      update();
    }
  }
});

function generatorsFromPointer(e) {
  const container = document.querySelector('.power-segments');
  if (!container) return null;
  const segs = [...container.children];
  for (let i = segs.length - 1; i >= 0; i--) {
    const rect = segs[i].getBoundingClientRect();
    if (e.clientX >= rect.left) return i + 1;
  }
  return 1;
}

let dragging = false;

document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.power-segments')) {
    dragging = true;
    e.target.closest('.power-segments').setPointerCapture(e.pointerId);
    state.generators = generatorsFromPointer(e);
    update();
  }
});

document.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const val = generatorsFromPointer(e);
  if (val && val !== state.generators) {
    state.generators = val;
    update();
  }
});

document.addEventListener('pointerup', () => {
  dragging = false;
});

document.addEventListener('click', (e) => {
  const hexEl = e.target.closest('.cifi-hex');
  if (hexEl) {
    const ship = hexEl.dataset.shipId;
    const hex = parseInt(hexEl.dataset.hexNumber);
    if (state.selectedHex?.ship === ship && state.selectedHex?.hex === hex) {
      state.selectedHex = null;
    } else {
      state.selectedHex = { ship, hex };
    }
    update();
    return;
  }
  if (state.selectedHex) {
    state.selectedHex = null;
    update();
    return;
  }
  const step = e.target.closest('.power-step');
  if (step) {
    state.generators = Math.max(1, Math.min(8, state.generators + parseInt(step.dataset.step)));
    update();
    return;
  }
  const mystery = e.target.closest('.mystery-card');
  if (mystery) {
    state.shipsUnlocked = parseInt(mystery.dataset.shipIndex) + 1;
    update();
    return;
  }
  const unlockBtn = e.target.closest('.unlock-ouro-btn');
  if (unlockBtn) {
    state.shipsUnlocked = 8;
    update();
    return;
  }
  const btn = e.target.closest('.ship-btn');
  if (!btn) return;
  const index = parseInt(btn.dataset.shipIndex);
  state.shipsUnlocked = index + 1;
  update();
});

update();
