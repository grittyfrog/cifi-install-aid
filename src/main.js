import { render, html, svg } from 'uhtml';
import './app.css';
import { App } from './components/App.js';

const state = { generators: 8 };

function update() {
  render(document.body, App(html, svg, state));
}

document.addEventListener('input', (e) => {
  if (e.target.id === 'generators') {
    state.generators = Math.max(1, Math.min(8, parseInt(e.target.value) || 1));
    update();
  }
});

update();
