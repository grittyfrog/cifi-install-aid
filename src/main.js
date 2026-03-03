import { render, html, svg } from 'uhtml';
import './app.css';
import { App } from './components/App.js';

function update() {
  render(document.body, App(html, svg));
}

update();
