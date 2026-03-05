import { render, html, svg } from 'uhtml';
import './app.css';
import { App } from './components/App.js';

const state = { generators: 8, shipsUnlocked: 8, meltdown: 0.0001 };

function update() {
  render(document.body, App(html, svg, state));
}

document.addEventListener('input', (e) => {
  if (e.target.id === 'generators') {
    state.generators = Math.max(1, Math.min(8, parseInt(e.target.value) || 1));
    update();
  }
  if (e.target.id === 'meltdown') {
    state.meltdown = Math.max(0.0001, parseFloat(e.target.value) || 0.0001);
    update();
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
  const step = e.target.closest('.power-step');
  if (step) {
    state.generators = Math.max(1, Math.min(8, state.generators + parseInt(step.dataset.step)));
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
