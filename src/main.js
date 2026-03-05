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

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ship-btn');
  if (!btn) return;
  const index = parseInt(btn.dataset.shipIndex);
  state.shipsUnlocked = index + 1;
  update();
});

update();
